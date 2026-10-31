"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// The "do" logo mouse pointer, drawn as a small element that follows the mouse so it can react to clicks: it squeezes
// when the button goes down and pops back out when it's released. Home page only, and only on devices with a real
// mouse (not touch); every other page keeps the default cursor.
// It costs almost nothing: one fixed element, moved with a transform on pointer events, with no frame loop.
const WIDTH = 45; // px, the 2x cursor image drawn at its natural size
const HEIGHT = 34;

export default function CursorPop() {
  const enabled = usePathname() === "/";
  const moverRef = useRef(null);
  const popRef = useRef(null);

  useEffect(() => {
    if (!enabled || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const mover = moverRef.current;
    const pop = popRef.current;
    const root = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shown = false;
    let overText = false;

    const setVisible = (v) => {
      mover.style.opacity = v ? "1" : "0";
    };
    // Over text fields the normal text cursor is the useful one, so the logo steps aside there.
    const isTextTarget = (t) => !!t?.closest?.('input, textarea, select, [contenteditable="true"]');

    const onMove = (e) => {
      if (e.pointerType && e.pointerType !== "mouse") return;
      if (!shown) {
        shown = true;
        root.classList.add("has-custom-cursor");
      }
      const text = isTextTarget(e.target);
      if (text !== overText) {
        overText = text;
        root.classList.toggle("cursor-over-text", text);
      }
      mover.style.transform = `translate3d(${e.clientX - WIDTH / 2}px, ${e.clientY - HEIGHT / 2}px, 0)`;
      setVisible(!text);
    };
    const onDown = (e) => {
      if (e.pointerType !== "mouse" || reduce) return;
      pop.getAnimations().forEach((a) => a.cancel());
      pop.animate([{ transform: "scale(1)" }, { transform: "scale(0.7)" }], { duration: 90, easing: "ease-out", fill: "forwards" });
    };
    const onUp = (e) => {
      if (e.pointerType !== "mouse" || reduce) return;
      // Pop: spring out past full size, then settle.
      pop.getAnimations().forEach((a) => a.cancel());
      pop.animate(
        [
          { transform: "scale(0.7)", offset: 0 },
          { transform: "scale(1.45)", offset: 0.45 },
          { transform: "scale(0.94)", offset: 0.75 },
          { transform: "scale(1)", offset: 1 },
        ],
        { duration: 380, easing: "cubic-bezier(0.22, 1, 0.36, 1)" }
      );
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => !overText && shown && setVisible(true);

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);
    return () => {
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      root.classList.remove("has-custom-cursor", "cursor-over-text");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={moverRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[2147483647] opacity-0"
      style={{ width: WIDTH, height: HEIGHT, willChange: "transform" }}
    >
      <div ref={popRef} className="h-full w-full">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/cursor-do@2x.png" alt="" width={WIDTH} height={HEIGHT} draggable={false} className="h-full w-full select-none" />
      </div>
    </div>
  );
}
