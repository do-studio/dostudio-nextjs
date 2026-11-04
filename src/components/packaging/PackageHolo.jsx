"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { AnimatePresence, motion } from "framer-motion";
import SiteNav from "../homeV2/SiteNav";
import MediaFrame from "../videos/MediaFrame";

// Package designs as a ring of cards. Every design is a plain card standing on a turntable around you; the one in front is
// bright and the rest fall back into the dark. Drag, scroll or use the arrow keys to turn the ring; click the card in
// front to open it large.
//
// Kept as light as a WebGL page can be: one canvas that only draws while something moves (frameloop "demand"), 28 small
// cards sharing one geometry, 512px pictures, and a pixel budget that drops by itself on slow machines.

const RING = 9; // radius of the ring of panels
const CARD = 2.1; // panel size (square)
const FOV = 35;
const EASE = 0.1; // how quickly the ring catches up with the pointer (0-1 per frame)
const TAU = Math.PI * 2;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mod = (n, m) => ((n % m) + m) % m;
const clean = (s) => (s || "").trim();
const THUMB = (url) => `${url}?w=512&auto=format`;
const colorOf = (css) => {
  const c = new THREE.Color();
  try {
    c.set(css || "#888888");
  } catch {
    c.set("#888888");
  }
  return c;
};

const VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const FRAGMENT = /* glsl */ `
  uniform sampler2D uMap;
  uniform float uHasMap;
  uniform float uTexAspect;
  uniform float uFront;
  uniform vec3 uTint;
  varying vec2 vUv;
  float roundedBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  void main() {
    float d = roundedBox(vUv - 0.5, vec2(0.5), 0.07);
    float aa = fwidth(d);
    float inside = 1.0 - smoothstep(-aa, aa, d);

    // The picture fills the card with its whole shape kept (nothing cropped); the card behind it is the picture's own colour.
    vec2 imgSize = uTexAspect > 1.0 ? vec2(1.0, 1.0 / uTexAspect) : vec2(uTexAspect, 1.0);
    vec2 q = (vUv - 0.5) / imgSize + 0.5;
    vec3 col = uTint;
    if (uHasMap > 0.5 && q.x > 0.0 && q.x < 1.0 && q.y > 0.0 && q.y < 1.0) col = texture2D(uMap, q).rgb;

    // Cards away from the front are darkened.
    gl_FragColor = vec4(col * mix(0.35, 1.0, uFront), inside);
    #include <colorspace_fragment>
  }
`;

// One card on the ring.
function Panel({ index, count, design, rot, geometry, meshes }) {
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);
  const meshRef = useRef(null);
  const uniforms = useMemo(
    () => ({
      uMap: { value: null },
      uHasMap: { value: 0 },
      uTexAspect: { value: 1 },
      uFront: { value: 0 },
      uTint: { value: colorOf(design.color) },
    }),
    [design.color]
  );

  useEffect(() => {
    const list = meshes.current;
    list[index] = meshRef.current;
    return () => {
      list[index] = null;
    };
  }, [index, meshes]);

  useEffect(() => {
    let alive = true;
    let tex;
    new THREE.TextureLoader().setCrossOrigin("anonymous").load(THUMB(design.url), (t) => {
      if (!alive) return t.dispose();
      tex = t;
      t.colorSpace = THREE.SRGBColorSpace;
      t.anisotropy = Math.min(2, gl.capabilities.getMaxAnisotropy());
      uniforms.uMap.value = t;
      uniforms.uTexAspect.value = t.image.width / t.image.height;
      uniforms.uHasMap.value = 1;
      invalidate();
    });
    return () => {
      alive = false;
      tex?.dispose();
    };
  }, [design.url, uniforms, invalidate, gl]);

  // Sit on the ring at this card's angle, facing outwards; the one in front is bright.
  useFrame(() => {
    const a = (index / count) * TAU - rot.angle;
    const m = meshRef.current;
    const r = rot.radius;
    m.position.set(Math.sin(a) * r, 0, Math.cos(a) * r);
    m.rotation.y = a;
    uniforms.uFront.value = THREE.MathUtils.smoothstep(Math.cos(a), 0.55, 1);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial vertexShader={VERTEX} fragmentShader={FRAGMENT} uniforms={uniforms} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  );
}

// Moves the ring, frames the camera, and reports which card is in front.
function Rig({ state, rot, count, reduceMotion, onActive, onSlow }) {
  const { camera, size, invalidate } = useThree();
  const lastActive = useRef(0);
  const timing = useRef({ sum: 0, n: 0 });

  useEffect(() => {
    const t = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
    const aspect = size.width / size.height;
    // The front panel takes about 52% of the height (and never more than 70% of the width).
    const D = Math.max(CARD / (0.52 * 2 * t), CARD / (0.7 * 2 * t * aspect));
    camera.position.set(0, 1.0, RING + D);
    camera.lookAt(0, 0.05, RING);
    camera.updateProjectionMatrix();
    state.current.pxPerRad = size.height / (2 * D * t) / RING; // rough drag-to-spin ratio
    state.current.invalidate = invalidate;
    invalidate();
  }, [camera, size, invalidate, state]);

  useFrame((_, delta) => {
    const s = state.current;
    const dt = Math.min(delta, 0.05);
    const k = reduceMotion ? 1 : 1 - Math.pow(1 - EASE, dt * 60);
    const before = rot.angle;
    let next = before + (s.target - before) * k;
    if (Math.abs(s.target - next) < 0.0004) next = s.target;
    rot.angle = next;
    const active = mod(Math.round(next / ((1 / count) * TAU)), count);
    if (active !== lastActive.current) {
      lastActive.current = active;
      onActive(active);
    }
    if (next !== s.target) {
      invalidate();
      // Watch how long frames take while the ring moves; if the machine is struggling, ask for a lighter picture.
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
  });
  return null;
}

// Lets the page ask which panel is under a point on the screen.
function Picker({ pick, meshes }) {
  const { camera, size } = useThree();
  useEffect(() => {
    const ray = new THREE.Raycaster();
    const v = new THREE.Vector2();
    pick.current = (x, y) => {
      v.set((x / size.width) * 2 - 1, -(y / size.height) * 2 + 1);
      ray.setFromCamera(v, camera);
      const hit = ray.intersectObjects(meshes.current.filter(Boolean), false)[0];
      return hit ? meshes.current.indexOf(hit.object) : -1;
    };
    return () => {
      pick.current = null;
    };
  }, [camera, size, meshes, pick]);
  return null;
}

export default function PackageHolo({ designs }) {
  const count = designs.length;
  const step = count ? TAU / count : 1;
  const rootRef = useRef(null);
  const state = useRef({ target: 0, pxPerRad: 60, invalidate: () => {} });
  const rot = useMemo(() => ({ angle: 0, radius: RING }), []);
  const meshes = useRef([]);
  const pick = useRef(null);
  const snapTimer = useRef(0);
  const activeRef = useRef(0);
  const viewerOpen = useRef(false);
  const geometry = useMemo(() => new THREE.PlaneGeometry(CARD, CARD), []);
  useEffect(() => () => geometry.dispose(), [geometry]);

  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [quality, setQuality] = useState(null);
  const budget = useRef(1.4e6);
  viewerOpen.current = open !== null;

  // Picture sharpness by pixel budget, as on the video pages: small screens (phones) get full sharpness cheaply, and a
  // machine that lags gets a lower budget by itself.
  const qualityFor = useCallback(() => {
    const css = Math.max(1, window.innerWidth * window.innerHeight);
    const dpr = clamp(Math.sqrt(budget.current / css), 1, Math.min(window.devicePixelRatio || 1, 2));
    return { dpr: Math.round(dpr * 100) / 100, aa: css * dpr * dpr < 1.6e6 };
  }, []);
  useEffect(() => {
    setReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const modest = (navigator.hardwareConcurrency || 4) <= 4 || (navigator.deviceMemory || 8) <= 4;
    budget.current = modest ? 1.4e6 : 2.6e6;
    const update = () => setQuality((q) => {
      const n = qualityFor();
      return q && q.dpr === n.dpr && q.aa === n.aa ? q : n;
    });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [qualityFor]);
  const stepDown = useCallback(() => {
    if (budget.current <= 0.85e6) return;
    budget.current *= 0.6;
    setQuality(qualityFor());
  }, [qualityFor]);

  const onActive = useCallback((i) => {
    activeRef.current = i;
    setActive(i);
  }, []);

  const push = useCallback(
    (dRad, settleAfter = 160) => {
      const s = state.current;
      s.target += dRad;
      clearTimeout(snapTimer.current);
      snapTimer.current = setTimeout(() => {
        s.target = Math.round(s.target / step) * step;
        s.invalidate();
      }, settleAfter);
      s.invalidate();
    },
    [step]
  );
  const goTo = useCallback(
    (i) => {
      // The shortest way round to panel i.
      const s = state.current;
      const here = Math.round(s.target / step);
      const diff = mod(i - here + count / 2, count) - count / 2;
      clearTimeout(snapTimer.current);
      s.target = (here + diff) * step;
      s.invalidate();
    },
    [step, count]
  );
  const nudge = useCallback((dir) => goTo(Math.round(state.current.target / step) + dir), [goTo, step]);

  // Drag, wheel and tap.
  useEffect(() => {
    const root = rootRef.current;
    let down = null;
    const onDown = (e) => {
      if (viewerOpen.current || (e.pointerType === "mouse" && e.button !== 0)) return;
      try {
        root.setPointerCapture(e.pointerId);
      } catch {
        // dragging still works without capture
      }
      down = { id: e.pointerId, x: e.clientX, t: performance.now(), moved: 0, vx: 0 };
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
      push(-dx * 0.0042, 420);
    };
    const onUp = (e) => {
      if (!down || e.pointerId !== down.id) return;
      if (down.moved < 8 && e.type === "pointerup") {
        const rect = root.getBoundingClientRect();
        const hit = pick.current ? pick.current(e.clientX - rect.left, e.clientY - rect.top) : -1;
        if (hit >= 0) {
          if (hit === activeRef.current) setOpen(hit);
          else goTo(hit);
        }
      } else if (performance.now() - down.t < 80) {
        push(-down.vx * 1.0, 180); // keep the momentum of a flick
      } else {
        push(0, 60);
      }
      down = null;
      delete root.dataset.dragging;
    };
    const onWheel = (e) => {
      if (viewerOpen.current || e.ctrlKey) return;
      e.preventDefault();
      const d = (Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY) * (e.deltaMode === 1 ? 32 : 1);
      push(d * 0.0026, 150);
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
  }, [push, goTo]);

  // Keys.
  useEffect(() => {
    const onKey = (e) => {
      if (open !== null) {
        if (e.key === "Escape") setOpen(null);
        else if (e.key === "ArrowRight") setOpen((i) => mod(i + 1, count));
        else if (e.key === "ArrowLeft") setOpen((i) => mod(i - 1, count));
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") nudge(1);
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") nudge(-1);
      else if (e.key === "Enter") setOpen(activeRef.current);
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, nudge]);

  const current = open !== null ? designs[open] : null;
  const currentRatio = current && current.width && current.height ? `${current.width}/${current.height}` : "1/1";

  return (
    <>
      <div
        ref={rootRef}
        className="absolute inset-0 cursor-grab touch-none select-none overflow-hidden bg-[#0c0c0c] data-[dragging=true]:cursor-grabbing"
      >
        {count > 0 && quality && (
          <Canvas
            frameloop="demand"
            dpr={quality.dpr}
            gl={{ antialias: quality.aa, alpha: true, stencil: false }}
            camera={{ fov: FOV, near: 0.1, far: 80, position: [0, 1, 20] }}
          >
            <Rig state={state} rot={rot} count={count} reduceMotion={reduceMotion} onActive={onActive} onSlow={stepDown} />
            <Picker pick={pick} meshes={meshes} />
            {designs.map((d, i) => (
              <Panel key={d._id} index={i} count={count} design={d} rot={rot} geometry={geometry} meshes={meshes} />
            ))}
          </Canvas>
        )}
        {!count && <p className="absolute inset-0 flex items-center justify-center text-xl text-white/70">No package designs found.</p>}
      </div>

      <SiteNav />
      <h1 className="sr-only">Package Design</h1>

      <div className="absolute inset-x-0 bottom-[clamp(1.25rem,3vh,2.25rem)] z-10 flex items-end justify-center gap-[clamp(0.6rem,1.5vw,1.5rem)] px-[4.65%]">
        <button
          type="button"
          aria-label="Previous design"
          onClick={() => nudge(-1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 text-lg text-white transition-colors hover:border-[#f6f561] hover:bg-[#f6f561] hover:text-[#1c1c1e]"
        >
          ←
        </button>
        <div className="flex h-10 items-end gap-[3px] overflow-hidden" role="tablist" aria-label="Package designs">
          {designs.map((d, i) => (
            <button
              key={d._id}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Show design ${i + 1}`}
              onClick={() => goTo(i)}
              className={`w-[3px] shrink-0 rounded-full transition-[height,background-color,box-shadow] duration-300 ${
                i === active ? "h-9 bg-[#f6f561] shadow-[0_0_12px_#f6f561]" : Math.abs(mod(i - active + count / 2, count) - count / 2) === 1 ? "h-5 bg-white/55" : "h-3 bg-white/25 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next design"
          onClick={() => nudge(1)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/30 text-lg text-white transition-colors hover:border-[#f6f561] hover:bg-[#f6f561] hover:text-[#1c1c1e]"
        >
          →
        </button>
      </div>

      <ul className="sr-only">
        {designs.map((d) => (
          <li key={d._id}>{clean(d.altText) || "Package design"}</li>
        ))}
      </ul>

      <AnimatePresence>
        {current && (
          <motion.div
            key="viewer"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#04040a]/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={clean(current.altText) || "Package design"}
          >
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <MediaFrame kind="image" src={`${current.url}?w=1600&auto=format`} alt={clean(current.altText) || "Package design"} ratio={currentRatio} radius="clamp(8px,1vw,16px)" maxHeight="80svh" />
            </motion.div>
            <div className="flex items-center gap-6" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                aria-label="Previous design"
                onClick={() => setOpen((i) => mod(i - 1, count))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-lg text-white transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e]"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next design"
                onClick={() => setOpen((i) => mod(i + 1, count))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-lg text-white transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e]"
              >
                →
              </button>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-lg text-white transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e] md:right-7 md:top-7"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
