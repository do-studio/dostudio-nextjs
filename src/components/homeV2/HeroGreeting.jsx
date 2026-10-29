"use client";

import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useMotionValue, useMotionValueEvent, useScroll, useSpring } from "framer-motion";
import { EASE_OUT } from "./motion";

const GREETINGS = {
  morning: "Good Morning",
  afternoon: "Good Afternoon",
  evening: "Good Evening",
  night: "Hello Night Owl",
};

// How long the greeting stays before "Scroll down to see more" takes over.
const GREETING_HOLD = 3.2;

// Letters rise into place and fade in one after another, and lift away the same way. (Opacity + transform only: those
// are the cheap properties; animating a blur filter per letter stutters on modest laptops.)
const LETTER = {
  hidden: { y: "0.5em", opacity: 0 },
  show: (i) => ({
    y: "0em",
    opacity: 1,
    transition: { duration: 0.8, ease: EASE_OUT, delay: i * 0.04 },
  }),
  exit: (i) => ({
    y: "-0.4em",
    opacity: 0,
    transition: { duration: 0.5, ease: [0.55, 0, 1, 0.45], delay: i * 0.02 },
  }),
};

function Greeting({ text }) {
  const words = text.split(" ");
  const offsets = words.map((_, wi) => words.slice(0, wi).join("").length);

  return (
    <motion.p
      className="text-[clamp(3rem,10vw,12rem)] font-bold leading-[0.95] tracking-[-0.03em] text-white"
      initial="hidden"
      animate="show"
      exit="exit"
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wi) => (
        <Fragment key={wi}>
          <span aria-hidden="true" className={`inline-block whitespace-nowrap ${wi > 0 ? "text-[#f6f561]" : ""}`}>
            {[...word].map((ch, ci) => (
              <motion.span key={ci} custom={offsets[wi] + ci} variants={LETTER} className="inline-block will-change-transform">
                {ch}
              </motion.span>
            ))}
          </span>
          {wi < words.length - 1 && " "}
        </Fragment>
      ))}
    </motion.p>
  );
}

// Once the page is scrolled, each word loses its grip at a slightly different moment, hops, tips over
// and drops out of the hero, accelerating like it's under gravity. Scrolling back to the top brings them back up.
const FALL = [
  { rotate: -38, x: -6, delay: 0.05 },
  { rotate: 24, x: 4, delay: 0 },
  { rotate: -16, x: -3, delay: 0.14 },
  { rotate: 34, x: 5, delay: 0.09 },
  { rotate: -26, x: 2, delay: 0.18 },
];
const GRAVITY = {
  show: (i) => ({ x: "0vw", y: "0vh", rotate: 0, transition: { duration: 0.9, ease: EASE_OUT, delay: i * 0.06 } }),
  fall: (i) => {
    const f = FALL[i];
    return {
      x: ["0vw", `${f.x * 0.2}vw`, `${f.x * 1.5}vw`],
      y: ["0vh", "-3vh", "140vh"],
      rotate: [0, f.rotate * 0.15, f.rotate * 2.4],
      transition: { duration: 1.3, times: [0, 0.16, 1], ease: ["easeOut", [0.5, 0, 0.9, 0.45]], delay: f.delay },
    };
  },
};

function Falling({ i, children }) {
  return (
    <motion.span custom={i} variants={GRAVITY} className="inline-block align-bottom will-change-transform">
      {children}
    </motion.span>
  );
}

// Words rise from behind a mask, one after another (the mask sits inside the falling wrapper so it doesn't clip the fall).
function Word({ i, children }) {
  return (
    <Falling i={i}>
      <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
        <motion.span
          className="inline-block"
          // "fall" must keep the word shown; without it the word drops back into its mask instead of falling.
          variants={{
            hidden: { y: "110%" },
            show: { y: "0%", transition: { duration: 0.85, ease: EASE_OUT, delay: 0.1 + i * 0.08 } },
            fall: { y: "0%" },
          }}
        >
          {children}
        </motion.span>
      </span>
    </Falling>
  );
}

function ScrollPrompt({ fallen }) {
  return (
    <motion.p
      className="text-[clamp(2.75rem,8vw,10rem)] font-bold leading-[1.02] tracking-[-0.03em] text-white"
      initial="hidden"
      animate={fallen ? "fall" : "show"}
    >
      <span className="block">
        <Word i={0}>Scroll</Word> <Word i={1}>down</Word>
      </span>
      <span className="block">
        <Word i={2}>to</Word> <Word i={3}>see</Word>{" "}
        <Falling i={4}>
          <motion.span
            className="inline-block rounded-full bg-[#ffa8f4] px-[0.32em] pb-[0.06em] text-[#1c1c1e]"
            variants={{
              hidden: { opacity: 0, scale: 0.85 },
              show: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.5 } },
              fall: { opacity: 1, scale: 1 },
            }}
          >
            more
          </motion.span>
        </Falling>
      </span>
    </motion.p>
  );
}

// How far from the top of the screen (px) the text's top edge is when it breaks off.
const BREAK_AT = 20;

// Greeting for the time of day → "Scroll down to see more", which then stays.
export default function HeroGreeting({ period, ready, delay = 0 }) {
  const [phase, setPhase] = useState("idle");
  // Where the text was on screen when it started to fall (null while it sits in the hero).
  const [fallRect, setFallRect] = useState(null);
  const [tabVisible, setTabVisible] = useState(true);
  const boxRef = useRef(null);
  const fallRectRef = useRef(null);
  // Page position (not screen position) of the text's top edge at the moment it broke off.
  const docTopRef = useRef(0);
  // How much of the sequence has played, so it can pick up where it stopped.
  const elapsedRef = useRef(0);

  useEffect(() => {
    const sync = () => setTabVisible(document.visibilityState !== "hidden");
    sync();
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  // The text scrolls up with the page like anything else. The moment it reaches the top of the screen it breaks off
  // and falls; scrolling back up until it's clear of the top edge again brings the words back.
  // When they fall, the text is pinned to the screen where it was (position: fixed), so it drops across the
  // whole screen and off the bottom edge, instead of scrolling away with the hero and being cut off by it.
  const syncFall = useCallback((v) => {
    const box = boxRef.current;
    if (!box) return;
    if (!fallRectRef.current) {
      const rect = box.getBoundingClientRect();
      if (rect.top > BREAK_AT) return;
      docTopRef.current = rect.top + v;
      fallRectRef.current = rect;
      setFallRect(rect);
    } else if (docTopRef.current - v > BREAK_AT) {
      fallRectRef.current = null;
      setFallRect(null);
    }
  }, []);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", syncFall);
  // The page can open already scrolled (restored position, anchor link) without any scroll event.
  useEffect(() => syncFall(window.scrollY), [syncFall]);
  const falling = phase === "scroll" && fallRect;

  // The greeting → "Scroll down" sequence only runs while the text is still on screen (before it breaks off).
  // Scrolled away (or in another tab), the clock stops where it is and carries on from there when they come back,
  // so nothing plays unseen in the background and then drops in over a lower section.
  const active = ready && !!period && !fallRect && tabVisible;
  useEffect(() => {
    if (!active) return;
    const began = performance.now();
    const steps = [
      ["greet", delay * 1000],
      ["scroll", (delay + GREETING_HOLD) * 1000],
    ];
    const timers = steps
      .filter(([, at]) => at > elapsedRef.current)
      .map(([name, at]) => setTimeout(() => setPhase(name), at - elapsedRef.current));
    // Steps whose time has already come (the clock was paused after they fired) are set straight away.
    steps.filter(([, at]) => at <= elapsedRef.current).forEach(([name]) => setPhase(name));
    return () => {
      elapsedRef.current += performance.now() - began;
      timers.forEach(clearTimeout);
    };
  }, [active, delay]);

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        ref={boxRef}
        className={
          falling
            ? // A hard dark shadow keeps the white words readable over the yellow/white sections below (cheap, unlike a blend mode).
              "fixed z-50 flex justify-center text-center [text-shadow:0.045em_0.045em_0_#1c1c1e]"
            : "absolute inset-x-[5%] top-[42%] z-[5] flex -translate-y-1/2 justify-center text-center"
        }
        // After a big scroll jump the text would already be above the screen, so it starts falling from the top edge instead.
        style={falling ? { top: Math.max(fallRect.top, 16), left: fallRect.left, width: fallRect.width } : undefined}
      >
        <AnimatePresence mode="wait">
          {phase === "greet" && <Greeting key="greet" text={GREETINGS[period]} />}
          {phase === "scroll" && <ScrollPrompt key="scroll" fallen={!!fallRect} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Replaces the hero video: slow-drifting brand colour glows that lean towards the cursor, with film grain on top.
// Built to stay smooth on modest laptops: the glows are plain radial gradients (no blur filter to re-draw), they drift with
// CSS transform keyframes (run on the compositor, so a busy main thread can't make them stutter), there's no blend mode,
// and the drift is paused whenever the hero is scrolled off screen.
const BACKDROP_CSS = `
@keyframes hero-drift-a { 0%,100% { transform: translate3d(0,0,0) scale(1) } 33% { transform: translate3d(9vw,5vw,0) scale(1.15) } 66% { transform: translate3d(-3vw,10vw,0) scale(0.9) } }
@keyframes hero-drift-b { 0%,100% { transform: translate3d(0,0,0) scale(1) } 33% { transform: translate3d(-9vw,-6vw,0) scale(0.9) } 66% { transform: translate3d(4vw,-2vw,0) scale(1.12) } }
@keyframes hero-drift-c { 0%,100% { transform: translate3d(0,0,0) } 33% { transform: translate3d(-10vw,6vw,0) } 66% { transform: translate3d(8vw,-5vw,0) } }
.hero-glow { position: absolute; border-radius: 9999px; will-change: transform; animation-timing-function: ease-in-out; animation-iteration-count: infinite; }
.hero-backdrop[data-paused=true] .hero-glow { animation-play-state: paused; }
@media (prefers-reduced-motion: reduce) { .hero-glow { animation: none !important; } }
`;

export function HeroBackdrop() {
  const ref = useRef(null);
  const inView = useInView(ref);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });

  useEffect(() => {
    // Mouse-following needs a fine pointer; skip it on touch screens.
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 80);
      my.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  return (
    <div ref={ref} aria-hidden="true" data-paused={!inView} className="hero-backdrop absolute inset-0 overflow-hidden bg-[#121212]">
      <style>{BACKDROP_CSS}</style>
      <motion.div className="absolute inset-0" style={{ x: sx, y: sy }}>
        <div
          className="hero-glow -left-[22%] -top-[40%] h-[78vw] w-[78vw]"
          style={{ background: "radial-gradient(closest-side, rgba(246,245,97,0.42), rgba(246,245,97,0.16) 55%, transparent)", animationName: "hero-drift-a", animationDuration: "18s" }}
        />
        <div
          className="hero-glow -bottom-[45%] -right-[28%] h-[88vw] w-[88vw]"
          style={{ background: "radial-gradient(closest-side, rgba(255,168,244,0.46), rgba(255,168,244,0.18) 55%, transparent)", animationName: "hero-drift-b", animationDuration: "21s" }}
        />
        <div
          className="hero-glow left-[26%] top-[14%] h-[42vw] w-[42vw]"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,0.12), transparent)", animationName: "hero-drift-c", animationDuration: "16s" }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
