"use client";

import { useEffect, useRef } from "react";

// A flexible sheet of paper blown off a wall by wind coming from the right.
// CSS can't bend an element, so the sheet is built from thin vertical strips, each hinged to its left neighbour
// (nested, with transform-origin on the left edge). Giving each strip a small rotateY makes the whole sheet curve:
// curl concentrated at the free right edge looks like a peeling corner, and a travelling sine wave looks like wind ripples.

// 64 strips keeps every joint under ~10° at the tightest curl, so the sheet reads as a smooth, floppy curve rather than creases.
const STRIPS = 64;
const clamp01 = (x) => Math.min(1, Math.max(0, x));
const smooth = (a, b, x) => {
  const t = clamp01((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);

// Curl is weighted towards the right edge (∝ position^1.6), so the free corner bends most and the left stays flatter.
const CURL_WEIGHTS = (() => {
  const raw = Array.from({ length: STRIPS }, (_, i) => ((i + 1) / STRIPS) ** 1.6);
  const sum = raw.reduce((a, b) => a + b, 0);
  return raw.map((v) => v / sum);
})();

export default function PaperSheet({ width, height, direction = "out", duration, backColor, radius, renderFace, onDone }) {
  const sheetRef = useRef(null);
  const shadowRef = useRef(null);
  const stripRefs = useRef([]);
  const shadeRefs = useRef([]);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;

  useEffect(() => {
    // p: 0 = flat on the wall, 1 = blown away. "in" plays the same path backwards.
    const apply = (p, t) => {
      const peel = smooth(0, 0.38, p); // right edge peeling off the wall
      const fly = smooth(0.3, 1, p); // whole sheet released and carried off to the left
      const totalCurl = -165 * peel * (1 - 0.4 * fly); // degrees of curl along the sheet, folding the right side back
      const waveAmp = 50 * peel * (1 - 0.45 * smooth(0.8, 1, p)); // wind ripples (kept up while the sheet flies)
      const release = -22 * fly; // once free, the left part bends too

      let cumulative = 0;
      for (let i = 0; i < STRIPS; i++) {
        const s = (i + 0.5) / STRIPS;
        // Ripple travels right → left (direction of the wind) and grows towards the free edge.
        // A second, shorter wave on top gives the small wobbles of thin paper.
        const rippleBase = (waveAmp * (0.3 + s) * 2.2) / STRIPS;
        const ripple =
          rippleBase * Math.sin(2 * Math.PI * (1.9 * t + 1.1 * s)) +
          rippleBase * 0.5 * Math.sin(2 * Math.PI * (3.1 * t + 2.6 * s));
        const angle = totalCurl * CURL_WEIGHTS[i] + ripple + (release * (1 - s)) / STRIPS * 2;
        cumulative += angle;
        const strip = stripRefs.current[i];
        if (strip) strip.style.transform = `rotateY(${angle.toFixed(3)}deg)`;
        // Parts turned away from the light get darker.
        const shade = shadeRefs.current[i];
        if (shade) shade.style.opacity = Math.min(0.6, 0.55 * (1 - Math.cos((cumulative * Math.PI) / 180))).toFixed(3);
      }

      const x = -Math.pow(fly, 1.5) * 1.35 * width;
      const y = -fly * 0.22 * height + Math.sin(t * 3) * 6 * fly;
      const z = 60 * peel;
      const rotZ = -14 * fly;
      const rotX = -8 * peel * (1 - fly) - 6 * fly;
      const scale = 1 - 0.15 * fly;
      const opacity = 1 - smooth(0.78, 1, p);
      if (sheetRef.current) {
        sheetRef.current.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateZ(${rotZ.toFixed(2)}deg) rotateX(${rotX.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        sheetRef.current.style.opacity = opacity.toFixed(3);
      }
      // Soft shadow on the wall (the next testimonial) while the sheet is lifting off.
      if (shadowRef.current) {
        shadowRef.current.style.opacity = (0.32 * peel * (1 - smooth(0.4, 0.9, p))).toFixed(3);
        shadowRef.current.style.transform = `translateX(${(-fly * 0.3 * width).toFixed(1)}px) scaleX(${(1 - 0.35 * peel).toFixed(3)})`;
      }
    };

    const total = duration * 1000;
    const start = performance.now();
    let raf;
    const frame = (now) => {
      const raw = clamp01((now - start) / total);
      const p = direction === "out" ? raw : 1 - easeOutCubic(raw);
      apply(p, (now - start) / 1000);
      if (raw < 1) raf = requestAnimationFrame(frame);
      else doneRef.current?.();
    };
    apply(direction === "out" ? 0 : 1, 0);
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [direction, duration, width, height]);

  const stripW = width / STRIPS;

  // Build the nested strips from the right edge inwards: each strip contains its right-hand neighbour.
  let strip = null;
  for (let i = STRIPS - 1; i >= 0; i--) {
    const first = i === 0;
    const last = i === STRIPS - 1;
    const corners = {
      borderTopLeftRadius: first ? radius : 0,
      borderBottomLeftRadius: first ? radius : 0,
      borderTopRightRadius: last ? radius : 0,
      borderBottomRightRadius: last ? radius : 0,
    };
    const child = strip;
    strip = (
      <div
        key={i}
        ref={(el) => (stripRefs.current[i] = el)}
        style={{
          position: "absolute",
          top: 0,
          left: first ? 0 : "100%",
          width: stripW,
          height,
          transformOrigin: "0% 50%",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Front: this strip's slice of the card (1px wider to hide seams between strips). */}
        <div style={{ position: "absolute", inset: 0, width: stripW + 1, overflow: "hidden", backfaceVisibility: "hidden", ...corners }}>
          <div style={{ position: "absolute", top: 0, left: -i * stripW, width, height }}>{renderFace()}</div>
          <span
            ref={(el) => (shadeRefs.current[i] = el)}
            style={{ position: "absolute", inset: 0, background: "#000", opacity: 0, pointerEvents: "none" }}
          />
        </div>
        {/* Back: plain paper, seen when the sheet curls over. */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            width: stripW + 1,
            background: `linear-gradient(90deg, ${backColor}, rgba(0,0,0,0.06)), ${backColor}`,
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            ...corners,
          }}
        />
        {child}
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      style={{ position: "relative", width, height, perspective: 2200, pointerEvents: "none", zIndex: 5 }}
    >
      <div
        ref={shadowRef}
        style={{
          position: "absolute",
          inset: "4% 2% 0 2%",
          borderRadius: radius,
          background: "#000",
          filter: "blur(28px)",
          opacity: 0,
          transformOrigin: "0% 50%",
        }}
      />
      <div ref={sheetRef} style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d", transformOrigin: "0% 50%" }}>
        {strip}
      </div>
    </div>
  );
}
