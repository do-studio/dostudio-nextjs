"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import SiteNav from "../homeV2/SiteNav";

// Production videos on one long roll of film in a dark room with a grid floor, in the spirit of jesperlandberg.com.
// Each frame keeps its video's own shape. At rest the roll curves gently around you; scroll and it changes shape with
// your speed: it tightens, flexes and ripples like loose film. Only the frame in front plays (with sound).
//
// Kept light for ordinary laptops: one WebGL canvas that only draws when something changes (frameloop "demand"), one
// bent-plane geometry shared by frames of one shape, only the frames near the front exist, and a single video plays at a time.

// Every frame is 1 unit tall; its width is the video's own width / height, so each video keeps its real shape.
const GAP = 0.07; // space between frames
const WIDEST = 16 / 9; // the widest frame, used to keep it inside the screen
const RADIUS = 3.4; // how tightly the strip curves around the viewer (smaller = more curve)
const CORNER = 0.035; // rounded corner radius
const WINDOW = 4; // frames built either side of the one in front (the rest are off screen anyway)
const EASE = 0.12; // how quickly the strip catches up with the pointer (0-1 per frame)
const FOV = 35;
const WAVE_MAX = 0.6; // how far the frames swing in and out at full speed
const SETTLE = 100; // ms the strip must be heading for a frame before its video starts

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
// How sharp to draw. The picture is limited by how many pixels the GPU fills per frame, not by the screen's pixel
// density, so a small screen (a phone) can be drawn at 2-3x per pixel cheaply while a big laptop screen stays at 1x.
// `budget` is the most pixels to fill; ordinary laptops get a smaller one than strong machines, and a machine that
// lags gets it cut again.
function qualityFor(budget) {
  const css = Math.max(1, window.innerWidth * window.innerHeight);
  const dpr = clamp(Math.sqrt(budget / css), 1, Math.min(window.devicePixelRatio || 1, 2));
  return { dpr: Math.round(dpr * 100) / 100, aa: css * dpr * dpr < 1.6e6 };
}
const BUDGET_MODEST = 1.4e6; // 4 cores or fewer, or little memory
const BUDGET_STRONG = 2.6e6;
const clean = (s) => (s || "").trim();
// Thumbnails come from the image CDN already sized to the frame (about 900px on the long side, never more).
const THUMB = (url, ratio) => {
  const w = ratio >= 1 ? 900 : Math.round(900 * ratio);
  return `${url}?w=${w}&h=${Math.round(w / ratio)}&fit=crop&auto=format`;
};
const parseRatio = (r) => {
  const [a, b] = (r || "9/16").replace(/\s/g, "").split("/").map(Number);
  return a > 0 && b > 0 ? a / b : 9 / 16;
};
// Where each frame sits along the strip: its width and its centre (the strip starts at 0 and frames follow with GAP).
function layoutOf(videos) {
  let x = 0;
  return videos.map((v) => {
    const w = parseRatio(v.ratio);
    const frame = { w, c: x + w / 2 };
    x += w + GAP;
    return frame;
  });
}

const VERTEX = /* glsl */ `
  uniform float uCenter;
  uniform float uOffset;
  uniform float uRadius;
  uniform float uBend;
  uniform float uWave;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Distance along the film from the middle of the screen, wrapped onto a curve that bows towards the viewer.
    float u = uCenter + position.x - uOffset;
    float a = u / uRadius;
    vec3 p = vec3(uRadius * sin(a), position.y, uRadius * (1.0 - cos(a)));
    // The film flexes with the motion: the ends trail behind and the middle leans the way it's pulled.
    p.z -= abs(uBend) * a * a * 0.9;
    p.z += uBend * a * 0.35;
    // And a wave runs down it, so it bends in and out like a loose roll of film. The faster it's scrolled, the
    // bigger the wave, and the more it ripples along the edges.
    float w = u * 2.3;
    p.z += uWave * sin(w);
    p.y += uWave * 0.16 * position.y * sin(w + 1.3);
    p.x += uWave * 0.05 * cos(w);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uIsVideo;
  uniform float uTexAspect;
  uniform vec2 uSize;
  uniform float uCorner;
  varying vec2 vUv;
  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    vec2 p = (vUv - 0.5) * uSize;
    float d = roundedBox(p, uSize * 0.5, uCorner);
    float edge = fwidth(d);
    float alpha = 1.0 - smoothstep(-edge, edge, d);
    // Fill the frame with the picture (crop, don't squash).
    float frameAspect = uSize.x / uSize.y;
    vec2 uv = vUv;
    if (uTexAspect > frameAspect) uv.x = (uv.x - 0.5) * frameAspect / uTexAspect + 0.5;
    else uv.y = (uv.y - 0.5) * uTexAspect / frameAspect + 0.5;
    vec3 col = uHasMap > 0.5 ? texture2D(uMap, uv).rgb : vec3(0.015);
    // Video frames arrive as plain sRGB values (not decoded by the GPU like the thumbnails are), so decode them here;
    // otherwise they get brightened twice and look washed out.
    if (uIsVideo > 0.5) col = mix(col / 12.92, pow((col + 0.055) / 1.055, vec3(2.4)), step(0.04045, col));
    gl_FragColor = vec4(col, alpha);
    #include <colorspace_fragment>
  }
`;

// One frame of the strip.
function Panel({ video, frame, mode, soundRef, audioRef, shared, geometry }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const uniforms = useMemo(
    () => ({
      uCenter: { value: frame.c },
      uOffset: shared.uOffset,
      uRadius: shared.uRadius,
      uBend: shared.uBend,
      uWave: shared.uWave,
      uMap: { value: null },
      uHasMap: { value: 0 },
      uIsVideo: { value: 0 },
      uTexAspect: { value: frame.w },
      uSize: { value: new THREE.Vector2(frame.w, 1) },
      uCorner: { value: CORNER },
    }),
    [frame, shared]
  );
  const thumbRef = useRef(null);

  // Thumbnail.
  useEffect(() => {
    let alive = true;
    new THREE.TextureLoader().setCrossOrigin("anonymous").load(THUMB(video.thumb, frame.w), (t) => {
      if (!alive) return t.dispose();
      thumbRef.current = t;
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(2, gl.capabilities.getMaxAnisotropy());
      if (!uniforms.uMap.value) {
        uniforms.uMap.value = t;
        uniforms.uTexAspect.value = frame.w;
        uniforms.uHasMap.value = 1;
      }
      invalidate();
    });
    return () => {
      alive = false;
      thumbRef.current?.dispose();
      thumbRef.current = null;
    };
  }, [video.thumb, frame, uniforms, invalidate, gl]);

  // The video element. The frame in front plays it; the frames either side keep one loaded but paused ("warm"), so that
  // when the strip reaches them they start at once instead of waiting for a large file to download.
  const elRef = useRef(null);
  const wanted = mode !== "off";
  useEffect(() => {
    if (!wanted) return;
    const el = document.createElement("video");
    el.crossOrigin = "anonymous";
    el.src = video.src;
    el.muted = true;
    el.loop = true;
    el.playsInline = true;
    el.preload = "auto";
    elRef.current = el;
    return () => {
      el.pause();
      el.removeAttribute("src");
      el.load();
      elRef.current = null;
    };
  }, [wanted, video.src]);

  // Playing: show the video on the frame; the thumbnail stays until the first video frame is ready.
  const playing = mode === "play";
  useEffect(() => {
    const el = elRef.current;
    if (!playing || !el) return;
    const tex = new THREE.VideoTexture(el);
    tex.colorSpace = THREE.NoColorSpace; // decoded in the shader
    let stopped = false;
    let handle = 0;
    const redraw = () => {
      if (stopped) return;
      invalidate();
      handle = el.requestVideoFrameCallback ? el.requestVideoFrameCallback(redraw) : setTimeout(redraw, 33);
    };
    const show = () => {
      if (stopped) return;
      uniforms.uMap.value = tex;
      uniforms.uTexAspect.value = (el.videoWidth || 16) / (el.videoHeight || 9);
      uniforms.uHasMap.value = 1;
      uniforms.uIsVideo.value = 1;
      redraw();
    };
    el.addEventListener("playing", show, { once: true });
    audioRef.current = el;
    // Switching tabs or minimising the window pauses the video; coming back resumes it.
    const onVisibility = () => {
      if (document.hidden) el.pause();
      else el.play().catch(() => {});
    };
    document.addEventListener("visibilitychange", onVisibility);
    // Browsers only allow sound after the visitor has interacted with the page; if it's refused, play muted and let
    // the first tap or key press switch the sound on.
    el.muted = !soundRef.current;
    if (document.hidden) el.pause();
    else
      el.play().catch(() => {
        if (stopped) return;
        el.muted = true;
        el.play().catch(() => {});
      });
    return () => {
      stopped = true;
      document.removeEventListener("visibilitychange", onVisibility);
      el.removeEventListener("playing", show);
      if (audioRef.current === el) audioRef.current = null;
      if (el.cancelVideoFrameCallback && handle) el.cancelVideoFrameCallback(handle);
      else clearTimeout(handle);
      el.pause();
      // Back to the thumbnail.
      if (uniforms.uMap.value === tex) {
        uniforms.uMap.value = thumbRef.current;
        uniforms.uTexAspect.value = frame.w;
        uniforms.uHasMap.value = thumbRef.current ? 1 : 0;
        uniforms.uIsVideo.value = 0;
      }
      tex.dispose();
      invalidate();
    };
  }, [playing, wanted, frame, uniforms, invalidate, soundRef, audioRef]);

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial vertexShader={VERTEX} fragmentShader={FRAGMENT} uniforms={uniforms} transparent />
    </mesh>
  );
}

// Moves the strip towards its target, keeps the camera framing the front frame, and reports which frame is in front.
function Rig({ motionRef, shared, frames, onActive, onHeading, onSlow, reduceMotion }) {
  const { camera, size, invalidate } = useThree();
  const last = useRef(0);
  const timing = useRef({ sum: 0, n: 0 });
  const lastHead = useRef(0);

  useEffect(() => {
    // Fit one frame to about 56% of the height, and the widest frame never wider than 86% of the screen.
    const t = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const aspect = size.width / size.height;
    const D = Math.max(1 / 0.56 / (2 * t), WIDEST / 0.86 / (2 * t * aspect));
    camera.position.set(0, 0.12, D);
    camera.lookAt(0, -0.04, 0);
    camera.updateProjectionMatrix();
    motionRef.current.pxPerUnit = size.height / (2 * D * t);
    motionRef.current.invalidate = invalidate;
    invalidate();
  }, [camera, size, invalidate, motionRef]);

  useFrame((_, delta) => {
    const m = motionRef.current;
    const dt = Math.min(delta, 0.05);
    const k = reduceMotion ? 1 : 1 - Math.pow(1 - EASE, dt * 60);
    const before = shared.uOffset.value;
    let next = before + (m.target - before) * k;
    if (Math.abs(m.target - next) < 0.0005) next = m.target;
    shared.uOffset.value = next;
    const velocity = (next - before) / Math.max(dt, 1 / 120);
    const bend = reduceMotion ? 0 : clamp(velocity * 0.05, -0.35, 0.35);
    shared.uBend.value += (bend - shared.uBend.value) * 0.2;
    if (Math.abs(shared.uBend.value) < 0.0005) shared.uBend.value = 0;
    // The ribbon wave grows with speed and rolls out slowly once the strip stops.
    const wave = reduceMotion ? 0 : clamp(velocity * 0.085, -WAVE_MAX, WAVE_MAX);
    shared.uWave.value += (wave - shared.uWave.value) * (Math.abs(wave) > Math.abs(shared.uWave.value) ? 0.22 : 0.07);
    if (Math.abs(shared.uWave.value) < 0.001) shared.uWave.value = 0;
    // The roll winds tighter the faster it moves, and relaxes again as it slows.
    const tight = reduceMotion ? 0 : Math.min(1, Math.abs(shared.uWave.value) / WAVE_MAX);
    shared.uRadius.value += (RADIUS * (1 - 0.3 * tight) - shared.uRadius.value) * 0.15;

    // The frame in front is the one whose centre is nearest the middle of the screen.
    let active = last.current;
    for (let i = Math.max(0, active - 1); i <= Math.min(frames.length - 1, active + 1); i++) {
      if (Math.abs(frames[i].c - next) < Math.abs(frames[active].c - next)) active = i;
    }
    if (active !== last.current) {
      last.current = active;
      onActive(active);
    }
    // The frame the strip is heading for (where it will stop). Its video starts loading now, while the strip is still
    // sliding in, so it is already playing by the time the frame arrives in the middle.
    let head = lastHead.current;
    for (let i = 0; i < frames.length; i++) if (Math.abs(frames[i].c - m.target) < Math.abs(frames[head].c - m.target)) head = i;
    if (head !== lastHead.current) {
      lastHead.current = head;
      onHeading(head);
    }
    // Watch how long frames take while the strip is moving; if the machine is struggling, ask for a lighter picture.
    if (next !== m.target) {
      const t = timing.current;
      if (delta < 0.2) {
        t.sum += delta;
        t.n += 1;
      }
      if (t.n >= 40) {
        if (t.sum / t.n > 0.026) onSlow();
        t.sum = 0;
        t.n = 0;
      }
    }
    if (next !== m.target || shared.uBend.value !== 0 || shared.uWave.value !== 0 || Math.abs(shared.uRadius.value - RADIUS) > 0.002) invalidate();
  });
  return null;
}

export default function VideoWall({ videos }) {
  const count = videos.length;
  const rootRef = useRef(null);
  // The strip starts with the first frame in the middle of the screen.
  const start = videos[0] ? parseRatio(videos[0].ratio) / 2 : 0;
  const motionRef = useRef({ target: start, pxPerUnit: 400, invalidate: () => {} });
  const activeRef = useRef(0);
  const snapTimer = useRef(0);
  const modalOpen = useRef(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  // Picture quality, chosen once the page is on the client: ordinary laptops (4 cores or fewer, or little memory) draw at
  // normal resolution without edge smoothing; stronger machines get a sharper picture. It steps down by itself if it lags.
  const [quality, setQuality] = useState(null);
  const budget = useRef(BUDGET_MODEST);
  const [active, setActive] = useState(0);
  const [heading, setHeading] = useState(0); // the frame the strip is heading for
  const [settled, setSettled] = useState(0); // the same, once it has stayed put for a moment: this one plays
  const audioRef = useRef(null); // the video element that is playing
  const soundRef = useRef(true); // sound is always on; the browser may hold it back until the first touch or key press
  const [modal, setModal] = useState(null);

  modalOpen.current = modal !== null;

  const shared = useMemo(() => ({ uOffset: { value: start }, uRadius: { value: RADIUS }, uBend: { value: 0 }, uWave: { value: 0 } }), [start]);
  const frames = useMemo(() => layoutOf(videos), [videos]);
  // One bent-plane geometry per frame shape (most videos share one of two or three shapes).
  const geometries = useMemo(() => new Map(), []);
  const geometryFor = (w) => {
    const key = w.toFixed(3);
    if (!geometries.has(key)) geometries.set(key, new THREE.PlaneGeometry(w, 1, Math.max(8, Math.round(w * 30)), 1));
    return geometries.get(key);
  };
  useEffect(() => () => geometries.forEach((g) => g.dispose()), [geometries]);

  // The frame whose centre is nearest to a point on the strip.
  const nearest = useCallback(
    (x) => {
      let best = 0;
      for (let i = 1; i < frames.length; i++) if (Math.abs(frames[i].c - x) < Math.abs(frames[best].c - x)) best = i;
      return best;
    },
    [frames]
  );

  useEffect(() => {
    const t = setTimeout(() => setSettled(heading), SETTLE);
    return () => clearTimeout(t);
  }, [heading]);

  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const modest = (navigator.hardwareConcurrency || 4) <= 4 || (navigator.deviceMemory || 8) <= 4;
    // iPhones hide their core count (it reads as 4), so judge them by their small screen instead: the budget below
    // already gives a phone full sharpness.
    budget.current = modest ? BUDGET_MODEST : BUDGET_STRONG;
    const update = () => setQuality((q) => {
      const next = qualityFor(budget.current);
      return q && q.dpr === next.dpr && q.aa === next.aa ? q : next;
    });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  // If frames are slow, cut the pixel budget (once) and redraw lighter.
  const stepDown = useCallback(() => {
    if (budget.current <= BUDGET_MODEST * 0.6) return;
    budget.current = Math.max(BUDGET_MODEST * 0.6, budget.current * 0.6);
    setQuality(qualityFor(budget.current));
  }, []);

  const onActive = useCallback(
    (i) => {
      const c = clamp(i, 0, count - 1);
      activeRef.current = c;
      setActive(c);
    },
    [count]
  );

  // Moves the strip by `du` world units, then settles on the nearest frame once it stops being pushed.
  const push = useCallback(
    (du, settleAfter = 140) => {
      const m = motionRef.current;
      m.target = clamp(m.target + du, frames[0].c, frames[count - 1].c);
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        m.target = frames[nearest(m.target)].c;
        m.invalidate();
      }, settleAfter);
      m.invalidate();
    },
    [count, frames, nearest]
  );

  const goTo = useCallback(
    (i) => {
      clearTimeout(snapTimer.current);
      motionRef.current.target = frames[clamp(i, 0, count - 1)].c;
      motionRef.current.invalidate();
    },
    [count, frames]
  );

  // If the browser started the video muted because the visitor hadn't interacted yet, their first touch or key press
  // (a gesture, so it's allowed) turns the sound on.
  const wakeSound = useCallback(() => {
    const el = audioRef.current;
    if (soundRef.current && el && el.muted) {
      el.muted = false;
    }
  }, []);

  // Next / previous count from where the strip is heading, so quick repeated presses add up.
  const step = useCallback((dir) => goTo(nearest(motionRef.current.target) + dir), [goTo, nearest]);

  // Drag (mouse, touch, pen) and wheel. A tap opens the frame in front, or brings a side frame to the front.
  useEffect(() => {
    const root = rootRef.current;
    let down = null;

    const onDown = (e) => {
      if (modalOpen.current || (e.pointerType === "mouse" && e.button !== 0)) return;
      wakeSound();
      try {
        root.setPointerCapture(e.pointerId);
      } catch {
        // the pointer already ended; dragging still works without capture
      }
      down = { id: e.pointerId, x: e.clientX, moved: 0, vx: 0, t: performance.now() };
      root.dataset.dragging = "true";
    };
    const onMove = (e) => {
      if (!down || e.pointerId !== down.id) return;
      const now = performance.now();
      const dx = e.clientX - down.x;
      down.vx = down.vx * 0.6 + (dx / Math.max(now - down.t, 1)) * 0.4;
      down.x = e.clientX;
      down.t = now;
      down.moved += Math.abs(dx);
      push(-dx / motionRef.current.pxPerUnit, 400);
    };
    const onUp = (e) => {
      if (!down || e.pointerId !== down.id) return;
      if (down.moved < 8 && e.type === "pointerup") {
        // Which frame was tapped: its distance from the middle of the screen, in frames.
        const rect = root.getBoundingClientRect();
        const u = (e.clientX - rect.left - rect.width / 2) / motionRef.current.pxPerUnit;
        const hit = nearest(motionRef.current.target + u);
        const inFront = Math.abs(motionRef.current.target + u - frames[hit].c) < frames[hit].w / 2;
        if (hit === activeRef.current && inFront) setModal(activeRef.current);
        else goTo(hit);
      } else if (performance.now() - down.t < 80) {
        push((-down.vx * 240) / motionRef.current.pxPerUnit, 160); // keep the momentum of a flick
      } else {
        push(0, 60);
      }
      down = null;
      delete root.dataset.dragging;
    };
    const onWheel = (e) => {
      if (modalOpen.current || e.ctrlKey) return;
      e.preventDefault();
      const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * (e.deltaMode === 1 ? 32 : 1);
      push(d / motionRef.current.pxPerUnit, 160);
    };

    root.addEventListener("pointerdown", onDown);
    root.addEventListener("pointermove", onMove);
    root.addEventListener("pointerup", onUp);
    root.addEventListener("pointercancel", onUp);
    root.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      root.removeEventListener("pointerdown", onDown);
      root.removeEventListener("pointermove", onMove);
      root.removeEventListener("pointerup", onUp);
      root.removeEventListener("pointercancel", onUp);
      root.removeEventListener("wheel", onWheel);
      clearTimeout(snapTimer.current);
    };
  }, [push, goTo, nearest, frames, wakeSound]);

  useEffect(() => {
    const onKey = (e) => {
      wakeSound();
      if (modal !== null) {
        if (e.key === "Escape") setModal(null);
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") step(1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") step(-1);
      else if (e.key === "Home") goTo(0);
      else if (e.key === "Enter") setModal(activeRef.current);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [modal, goTo, step, wakeSound]);

  const from = Math.max(0, active - WINDOW);
  const to = Math.min(count - 1, active + WINDOW);
  const panels = [];
  for (let i = from; i <= to; i++) {
    panels.push(
      <Panel key={videos[i]._id} video={videos[i]} frame={frames[i]} mode={i === settled ? (modal === null ? "play" : "warm") : Math.abs(i - settled) === 1 ? "warm" : "off"} soundRef={soundRef} audioRef={audioRef} shared={shared} geometry={geometryFor(frames[i].w)} />
    );
  }

  const current = videos[modal ?? -1];

  return (
    <>
      <div ref={rootRef} className="absolute inset-0 cursor-grab touch-none select-none bg-black data-[dragging=true]:cursor-grabbing">
        {count > 0 && quality && (
          <Canvas
            frameloop="demand"
            dpr={quality.dpr}
            gl={{ antialias: quality.aa, stencil: false }}
            camera={{ fov: FOV, near: 0.1, far: 60, position: [0, 0.12, 3] }}
          >
            <color attach="background" args={["#000000"]} />
            <fog attach="fog" args={["#000000", 4, 16]} />
            <gridHelper args={[40, 40, "#3a3a3a", "#262626"]} position={[0, -0.72, 0]} />
            <Rig motionRef={motionRef} shared={shared} frames={frames} onActive={onActive} onHeading={setHeading} onSlow={stepDown} reduceMotion={reduceMotion} />
            {panels}
          </Canvas>
        )}
        {!count && <p className="absolute inset-0 flex items-center justify-center text-xl text-white/70">No videos found.</p>}
      </div>

      <SiteNav />
      <h1 className="sr-only">Production Videos</h1>

      {/* Same look as the "Enquire Now" button and nav links on the home page: grotesque type, white text with no background, yellow on hover. */}
      <footer className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-[clamp(0.5rem,1vw,1.25rem)] px-[4.65%] pb-[clamp(0.75rem,1.5vw,1.75rem)] text-white">
        <button type="button" aria-label="Previous video" onClick={() => step(-1)} className="pointer-events-auto flex h-[clamp(2rem,2.2vw,2.6rem)] items-center gap-1.5 rounded-full px-[clamp(0.5rem,0.8vw,1rem)] text-[clamp(0.8rem,1vw,1.15rem)] font-semibold text-white transition-[color,transform] duration-200 hover:text-[#f6f561] active:scale-95">
          <span aria-hidden="true">←</span> Prev
        </button>
        <span className="min-w-[3.5rem] text-center text-[clamp(0.8rem,1vw,1.15rem)] font-medium tracking-[-0.005em]">
          {String(active + 1).padStart(2, "0")} <span className="text-white/50">/ {String(count).padStart(2, "0")}</span>
        </span>
        <button type="button" aria-label="Next video" onClick={() => step(1)} className="pointer-events-auto flex h-[clamp(2rem,2.2vw,2.6rem)] items-center gap-1.5 rounded-full px-[clamp(0.5rem,0.8vw,1rem)] text-[clamp(0.8rem,1vw,1.15rem)] font-semibold text-white transition-[color,transform] duration-200 hover:text-[#f6f561] active:scale-95">
          Next <span aria-hidden="true">→</span>
        </button>
      </footer>

      <ul className="sr-only">
        {videos.map((v) => (
          <li key={v._id}>{clean(v.title) || clean(v.altText) || "Production video"}</li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            key="modal"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-black/95 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setModal(null)}
            role="dialog"
            aria-modal="true"
            aria-label={clean(current.title) || "Video"}
          >
            <video
              key={current._id}
              src={current.src}
              poster={`${current.thumb}?w=1200&auto=format`}
              autoPlay
              controls
              loop
              playsInline
              onClick={(e) => e.stopPropagation()}
              className="max-h-[82svh] max-w-full rounded-[clamp(10px,1.2vw,22px)] bg-black"
              style={{ aspectRatio: parseRatio(current.ratio) }}
            />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/80">{clean(current.title) || clean(current.altText)}</p>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setModal(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-lg transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e] md:right-7 md:top-7"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
