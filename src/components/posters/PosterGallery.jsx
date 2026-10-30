"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SiteNav from "../homeV2/SiteNav";

// An endless wall of posters you drag, scroll or arrow-key through, in the style of garcy.studio/#/projects.
//
// Built to stay light: only the cells inside the screen (plus one ring around it) exist, the page animates with
// transform + opacity only, the frame loop runs just while something is moving, and there's no blur or blend mode.
// Cells are positioned straight on the DOM from the animation loop (no React render per frame); React only re-renders
// when a new column or row of posters comes into range.

const CELL_RATIO = 1.25; // 4:5 poster cell
const GAP = 12; // px between cards (in the middle of the screen; the curve widens it towards the edges)
const EASE = 0.16; // how quickly the wall catches up with the pointer (0-1 per frame)
const CURVE = 0.2; // concave lens: how much bigger the cards get towards the screen edges (0 = flat)
const LENS = 0.24; // zoom under the cursor: how far it pushes the nearby cards apart
const LENS_REACH = 1.5; // size of the zoomed area, in card widths

const IMG = (url, w) => `${url}?w=${w}&auto=format`;
const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const mod = (n, m) => ((n % m) + m) % m;
const clean = (s) => (s || "").trim();

// The perspective transform that stretches a w×h box onto any four corners (top-left, top-right, bottom-right,
// bottom-left), as a CSS matrix3d for an element with transform-origin 0 0. This is what lets each card bend to the
// curved surface instead of just being scaled or rotated.
function quadMatrix([[x0, y0], [x1, y1], [x2, y2], [x3, y3]], w, h) {
  const dx1 = x1 - x2, dx2 = x3 - x2, dx3 = x0 - x1 + x2 - x3;
  const dy1 = y1 - y2, dy2 = y3 - y2, dy3 = y0 - y1 + y2 - y3;
  const den = dx1 * dy2 - dx2 * dy1 || 1e-9;
  const g = (dx3 * dy2 - dx2 * dy3) / den;
  const k = (dx1 * dy3 - dx3 * dy1) / den;
  const a = x1 - x0 + g * x1, b = x3 - x0 + k * x3;
  const d = y1 - y0 + g * y1, e = y3 - y0 + k * y3;
  return `matrix3d(${a / w},${d / w},0,${g / w},${b / h},${e / h},0,${k / h},0,0,1,0,${x0},${y0},0,1)`;
}

// Cards are built this many columns/rows beyond the screen edge, so their images are already loaded by the time
// they slide into view (nothing blank or dark shows while dragging).
const OVERSCAN = 2;

// Columns follow the screen width. When the browser is zoomed far out the screen gets huge in CSS pixels, so the cards
// are capped at MAX_COLS columns (and the number of cards built stays small) instead of growing without limit.
const MAX_COLS = 8;
function columnsFor(width) {
  if (width < 640) return 3;
  if (width < 1024) return 4;
  return Math.min(MAX_COLS, Math.max(5, Math.round(width / 300)));
}

export default function PosterGallery({ posters }) {
  const count = posters.length;
  const stageRef = useRef(null);
  const cellEls = useRef(new Map());
  const pos = useRef({ x: 0, y: 0 }); // where the wall is now
  const target = useRef({ x: 0, y: 0 }); // where it's heading
  const dims = useRef({ W: 0, H: 0, cw: 0, ch: 0, cols: 4, left: 0, top: 0 });
  const rangeRef = useRef("");
  const raf = useRef(0);
  const lastTime = useRef(0);
  const reduceMotion = useRef(false);
  const lowEnd = useRef(false); // 4 cores or fewer: skip the cursor zoom, keep the curve
  const viewerOpen = useRef(false);
  // The zoom under the cursor (mouse only): where it is (relative to the screen centre) and how strong (0-1).
  const cursor = useRef({ x: 0, y: 0 });
  const cursorTarget = useRef({ x: 0, y: 0 });
  const lens = useRef(0);
  const lensTarget = useRef(0);

  const [size, setSize] = useState(null);
  const [range, setRange] = useState(null); // { c0, c1, r0, r1 }
  const [open, setOpen] = useState(null); // index of the poster in the viewer

  viewerOpen.current = open !== null;

  // Where a point of the flat wall lands on screen. Like looking through a concave lens, everything is pushed out
  // from the centre, more the further out it is, so the cards grow towards the edges and the rows curve. Around the
  // cursor the cards are pushed apart a little more, which zooms into the area under it.
  const warp = useCallback((px, py) => {
    const { W, H, cw } = dims.current;
    const hx = W / 2;
    const hy = H / 2;
    let dx = px - hx;
    let dy = py - hy;
    const grow = 1 + CURVE * ((dx / hx) ** 2 + (dy / hy) ** 2);
    dx *= grow;
    dy *= grow;
    if (lens.current > 0.001) {
      const ox = dx - cursor.current.x;
      const oy = dy - cursor.current.y;
      const reach = cw * LENS_REACH;
      const push = LENS * lens.current * Math.exp(-(ox * ox + oy * oy) / (reach * reach));
      dx += ox * push;
      dy += oy * push;
    }
    return [hx + dx, hy + dy];
  }, []);

  // Positions one card: its four corners go through the lens, and the card is stretched onto them.
  const place = useCallback(
    (cell, c, r) => {
      const { cw, ch, W, H } = dims.current;
      const sx = c * cw - pos.current.x;
      const sy = r * ch - pos.current.y;
      // The ring of cards just outside the screen stays loaded and decoded but isn't painted or moved, which keeps the
      // per-frame work to the cards you can actually see.
      const near = sx > -cw && sx < W && sy > -ch && sy < H;
      if (near === cell.hidden) {
        cell.hidden = !near;
        cell.el.style.visibility = near ? "visible" : "hidden";
      }
      if (!near) return;
      const g = GAP / 2;
      const corners = [
        warp(sx + g, sy + g),
        warp(sx + cw - g, sy + g),
        warp(sx + cw - g, sy + ch - g),
        warp(sx + g, sy + ch - g),
      ];
      cell.el.style.transform = quadMatrix(corners, cw - GAP, ch - GAP);
    },
    [warp]
  );

  const apply = useCallback(() => {
    const { W, cw, ch, H } = dims.current;
    if (!W) return;
    const { x, y } = pos.current;
    const next = {
      c0: Math.floor(x / cw) - OVERSCAN,
      c1: Math.floor((x + W) / cw) + OVERSCAN,
      r0: Math.floor(y / ch) - OVERSCAN,
      r1: Math.floor((y + H) / ch) + OVERSCAN,
    };
    const key = `${next.c0},${next.c1},${next.r0},${next.r1}`;
    if (key !== rangeRef.current) {
      rangeRef.current = key;
      setRange(next);
    }
    cellEls.current.forEach((cell) => place(cell, cell.c, cell.r));
  }, [place]);

  const tick = useCallback(
    (now) => {
      raf.current = 0;
      const dt = Math.min(now - lastTime.current, 50) || 16;
      lastTime.current = now;
      const k = 1 - Math.pow(1 - EASE, dt / 16.67);
      const p = pos.current;
      const t = target.current;
      p.x += (t.x - p.x) * k;
      p.y += (t.y - p.y) * k;
      const moving = Math.abs(t.x - p.x) > 0.1 || Math.abs(t.y - p.y) > 0.1;
      if (!moving) {
        p.x = t.x;
        p.y = t.y;
      }
      // The zoom glides after the cursor, and eases off while the wall is moving fast.
      const cur = cursor.current;
      const ct = cursorTarget.current;
      const kc = 1 - Math.pow(0.88, dt / 16.67);
      cur.x += (ct.x - cur.x) * kc;
      cur.y += (ct.y - cur.y) * kc;
      const calm = 1 / (1 + (Math.abs(t.x - p.x) + Math.abs(t.y - p.y)) / 40);
      const want = lensTarget.current * calm;
      lens.current += (want - lens.current) * (1 - Math.pow(0.9, dt / 16.67));
      const zooming = Math.abs(ct.x - cur.x) + Math.abs(ct.y - cur.y) > 0.1 || Math.abs(want - lens.current) > 0.001;
      if (!zooming) {
        cur.x = ct.x;
        cur.y = ct.y;
        lens.current = want;
      }
      apply();
      if (moving || zooming) raf.current = requestAnimationFrame(tick);
    },
    [apply]
  );

  // The loop only runs while the wall or the zoom is moving.
  const kick = useCallback(() => {
    if (raf.current) return;
    lastTime.current = performance.now();
    raf.current = requestAnimationFrame(tick);
  }, [tick]);

  const nudge = useCallback(
    (dx, dy) => {
      target.current.x += dx;
      target.current.y += dy;
      kick();
    },
    [kick]
  );

  const reset = useCallback(() => {
    target.current = { x: 0, y: 0 };
    kick();
  }, [kick]);

  // Screen size → number of columns and cell size.
  useEffect(() => {
    const stage = stageRef.current;
    reduceMotion.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    lowEnd.current = (navigator.hardwareConcurrency || 8) <= 4;
    const measure = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const { left, top } = stage.getBoundingClientRect();
      const cols = columnsFor(W);
      const cw = W / cols;
      dims.current = { W, H, cw, ch: cw * CELL_RATIO, cols, left, top };
      setSize(dims.current);
      apply();
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [apply]);

  // Drag (mouse, touch, pen) with a little throw when you let go. A mouse hovering over the wall zooms the area under it.
  useEffect(() => {
    const stage = stageRef.current;
    let down = null;

    const hover = (e) => {
      if (reduceMotion.current || lowEnd.current || e.pointerType !== "mouse" || viewerOpen.current) return;
      const { W, H, left, top } = dims.current;
      cursorTarget.current = { x: e.clientX - left - W / 2, y: e.clientY - top - H / 2 };
      // Coming in fresh, the zoom starts right under the cursor instead of sliding over from where it last was.
      if (lens.current < 0.01) cursor.current = { ...cursorTarget.current };
      lensTarget.current = 1;
      kick();
    };
    const onLeave = () => {
      lensTarget.current = 0;
      kick();
    };

    const onDown = (e) => {
      if (viewerOpen.current || (e.pointerType === "mouse" && e.button !== 0)) return;
      try {
        stage.setPointerCapture(e.pointerId);
      } catch {
        // the pointer already ended; the drag still works without capture
      }
      lensTarget.current = 0; // no zoom while dragging
      down = {
        id: e.pointerId,
        x: e.clientX,
        y: e.clientY,
        t: performance.now(),
        moved: 0,
        vx: 0,
        vy: 0,
        poster: e.target.closest?.("[data-poster]")?.dataset.poster ?? null,
      };
      stage.dataset.dragging = "true";
    };
    const onMove = (e) => {
      if (!down) return hover(e);
      if (e.pointerId !== down.id) return;
      const now = performance.now();
      const dx = e.clientX - down.x;
      const dy = e.clientY - down.y;
      const dt = Math.max(now - down.t, 1);
      down.vx = down.vx * 0.6 + (dx / dt) * 0.4;
      down.vy = down.vy * 0.6 + (dy / dt) * 0.4;
      down.x = e.clientX;
      down.y = e.clientY;
      down.t = now;
      down.moved += Math.abs(dx) + Math.abs(dy);
      nudge(-dx, -dy);
    };
    const onUp = (e) => {
      if (!down || e.pointerId !== down.id) return;
      const opening = down.moved < 8 && down.poster !== null && e.type === "pointerup";
      if (opening) {
        setOpen(Number(down.poster));
      } else if (performance.now() - down.t < 80) {
        // Keep the momentum of a flick: throw the wall a little further.
        nudge(-down.vx * 260, -down.vy * 260);
      }
      down = null;
      delete stage.dataset.dragging;
      if (e.type === "pointerup" && !opening) hover(e);
    };
    // Scrolling or a two-finger swipe moves the wall too.
    const onWheel = (e) => {
      // Ctrl + wheel (or a pinch) is the browser zooming the page: leave it alone.
      if (viewerOpen.current || e.ctrlKey) return;
      e.preventDefault();
      const unit = e.deltaMode === 1 ? 32 : 1;
      nudge(e.deltaX * unit, e.deltaY * unit);
    };

    stage.addEventListener("pointerdown", onDown);
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerup", onUp);
    stage.addEventListener("pointercancel", onUp);
    stage.addEventListener("pointerleave", onLeave);
    stage.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      stage.removeEventListener("pointerdown", onDown);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerup", onUp);
      stage.removeEventListener("pointercancel", onUp);
      stage.removeEventListener("pointerleave", onLeave);
      stage.removeEventListener("wheel", onWheel);
    };
  }, [nudge, kick]);

  // The poster closest to the middle of the screen (what Enter opens).
  const centerPoster = useCallback(() => {
    const { W, H, cw, ch, cols } = dims.current;
    const c = Math.floor((pos.current.x + W / 2) / cw);
    const r = Math.floor((pos.current.y + H / 2) / ch);
    return mod(c + (cols + 3) * r, count);
  }, [count]);

  // Keyboard: arrows move the wall, Home resets it, Enter opens the centre poster. Inside the viewer the arrows page through posters.
  useEffect(() => {
    if (!count) return;
    const onKey = (e) => {
      if (open !== null) {
        if (e.key === "Escape") setOpen(null);
        else if (e.key === "ArrowRight") setOpen((i) => mod(i + 1, count));
        else if (e.key === "ArrowLeft") setOpen((i) => mod(i - 1, count));
        return;
      }
      const { cw, ch } = dims.current;
      if (e.key === "ArrowLeft") nudge(-cw, 0);
      else if (e.key === "ArrowRight") nudge(cw, 0);
      else if (e.key === "ArrowUp") nudge(0, -ch);
      else if (e.key === "ArrowDown") nudge(0, ch);
      else if (e.key === "Home") reset();
      else if (e.key === "Enter") setOpen(centerPoster());
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, nudge, reset, centerPoster]);

  // Ask the image CDN for about the pixels the card needs, no more (the sources are 1080px wide).
  const imgWidth = size ? clamp(Math.ceil((size.cw * Math.min(window.devicePixelRatio || 1, 1.5)) / 120) * 120, 360, 1080) : 480;
  const cells = [];
  if (size && range && count) {
    const stride = size.cols + 3; // the next row starts this many posters on, so neighbours never repeat on screen
    for (let r = range.r0; r <= range.r1; r++) {
      for (let c = range.c0; c <= range.c1; c++) {
        const i = mod(c + stride * r, count);
        const p = posters[i];
        const cover = !p.ratio || p.ratio === "4/5";
        const id = `${c},${r}`;
        cells.push(
          <div
            key={id}
            ref={(el) => {
              if (el) {
                const cell = { el, c, r, hidden: false };
                // Decode the image now, off screen, so it is ready to paint the moment the card slides into view.
                el.querySelector("img")?.decode?.().catch(() => {});
                cellEls.current.set(id, cell);
                place(cell, c, r);
              } else {
                cellEls.current.delete(id);
              }
            }}
            // Card-sized (the gap is left between the corners place() computes), stretched from its top-left corner.
            className="absolute left-0 top-0 origin-top-left"
            style={{ width: size.cw - GAP, height: size.ch - GAP }}
          >
            <div
              data-poster={i}
              className="absolute inset-0 overflow-hidden rounded-[clamp(14px,1.6vw,28px)] bg-[#161616]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={IMG(p.src, imgWidth)}
                alt={clean(p.alt) || clean(p.title) || "Creative poster"}
                draggable={false}
                className={`h-full w-full select-none ${cover ? "object-cover" : "object-contain"}`}
              />
            </div>
          </div>
        );
      }
    }
  }

  const poster = open !== null ? posters[open] : null;

  return (
    <>
      {/* The wall. Each card carries its own perspective (matrix3d from place()), so no perspective is set here. */}
      <div
        ref={stageRef}
        className="absolute inset-1 cursor-grab touch-none select-none overflow-clip rounded-[clamp(16px,1.9vw,30px)] bg-[#0c0c0c] data-[dragging=true]:cursor-grabbing"
      >
        {cells}
        {!count && (
          <p className="absolute inset-0 flex items-center justify-center text-2xl font-medium text-white/70">
            No posters found.
          </p>
        )}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.5)_100%)]" />
      </div>

      <SiteNav />
      <h1 className="sr-only">Creative Posters</h1>

      {/* Titles for search engines and screen readers (the wall itself is drawn from whatever is on screen). */}
      <ul className="sr-only">
        {posters.map((p) => (
          <li key={p._id}>{clean(p.title) || "Creative poster"}</li>
        ))}
      </ul>

      <AnimatePresence>
        {poster && (
          <motion.div
            key="viewer"
            className="fixed inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/90 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
            aria-label={clean(poster.title) || "Poster"}
          >
            <motion.img
              key={poster._id}
              src={IMG(poster.src, 1600)}
              alt={clean(poster.alt) || clean(poster.title) || "Creative poster"}
              className="max-h-[80svh] max-w-full rounded-[clamp(14px,1.6vw,26px)] object-contain"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            />
            <div className="flex items-center gap-6 text-sm" onClick={(e) => e.stopPropagation()}>
              <button
                type="button"
                aria-label="Previous poster"
                onClick={() => setOpen((i) => mod(i - 1, count))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-lg transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e]"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next poster"
                onClick={() => setOpen((i) => mod(i + 1, count))}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1c1c1e] text-lg transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e]"
              >
                →
              </button>
            </div>
            <button
              type="button"
              aria-label="Close"
              onClick={() => setOpen(null)}
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
