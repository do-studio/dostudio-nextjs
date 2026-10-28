"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { EASE_OUT } from "./motion";

const GREETINGS = {
  morning: "Good Morning",
  afternoon: "Good Afternoon",
  evening: "Good Evening",
  night: "Hello Night Owl",
};

// How long the greeting stays before "Scroll down to see more" takes over.
const GREETING_HOLD = 3.2;

// Letters rise into place out of a soft blur, one after another, and lift away the same way.
const LETTER = {
  hidden: { y: "0.5em", opacity: 0, filter: "blur(10px)" },
  show: (i) => ({
    y: "0em",
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: EASE_OUT, delay: i * 0.04 },
  }),
  exit: (i) => ({
    y: "-0.4em",
    opacity: 0,
    filter: "blur(10px)",
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

// Greeting for the time of day → "Scroll down to see more", which then stays.
export default function HeroGreeting({ period, ready, delay = 0 }) {
  const [phase, setPhase] = useState("idle");
  // Where the text was on screen when it started to fall (null while it sits in the hero).
  const [fallRect, setFallRect] = useState(null);
  const boxRef = useRef(null);
  const fallRectRef = useRef(null);

  useEffect(() => {
    if (!ready || !period) return;
    const greet = setTimeout(() => setPhase("greet"), delay * 1000);
    const scroll = setTimeout(() => setPhase("scroll"), (delay + GREETING_HOLD) * 1000);
    return () => {
      clearTimeout(greet);
      clearTimeout(scroll);
    };
  }, [ready, period, delay]);

  // The words fall as soon as the page starts scrolling, and come back at the very top.
  // When they fall, the text is pinned to the screen where it was (position: fixed), so it drops across the
  // whole screen and off the bottom edge, instead of scrolling away with the hero and being cut off by it.
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => {
    const shouldFall = v > 40;
    if (shouldFall === !!fallRectRef.current) return;
    fallRectRef.current = shouldFall ? boxRef.current.getBoundingClientRect() : null;
    setFallRect(fallRectRef.current);
  });
  const falling = phase === "scroll" && fallRect;

  return (
    <div className="pointer-events-none absolute inset-0">
      <div
        ref={boxRef}
        className={
          falling
            ? // Inverts against whatever it falls over, so the white words stay visible on the yellow/white sections below.
              "fixed z-50 flex justify-center text-center mix-blend-difference"
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
export function HeroBackdrop() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 40, damping: 18 });
  const sy = useSpring(my, { stiffness: 40, damping: 18 });
  const ix = useTransform(sx, (v) => -v * 1.5);
  const iy = useTransform(sy, (v) => -v * 1.5);

  useEffect(() => {
    const move = (e) => {
      mx.set((e.clientX / window.innerWidth - 0.5) * 80);
      my.set((e.clientY / window.innerHeight - 0.5) * 80);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [mx, my]);

  const blob = "absolute rounded-full blur-[110px] will-change-transform";

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden bg-[#121212]">
      <motion.div className="absolute inset-0" style={{ x: sx, y: sy }}>
        <motion.div
          className={`${blob} -left-[12%] -top-[20%] h-[48vw] w-[48vw] bg-[#f6f561] opacity-[0.38]`}
          animate={{ x: ["0%", "18%", "-6%", "0%"], y: ["0%", "12%", "22%", "0%"], scale: [1, 1.15, 0.9, 1] }}
          transition={{ duration: 18, ease: "easeInOut", repeat: Infinity }}
        />
        <motion.div
          className={`${blob} -bottom-[25%] -right-[14%] h-[55vw] w-[55vw] bg-[#ffa8f4] opacity-[0.42]`}
          animate={{ x: ["0%", "-16%", "8%", "0%"], y: ["0%", "-14%", "-4%", "0%"], scale: [1, 0.88, 1.12, 1] }}
          transition={{ duration: 21, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
      <motion.div className="absolute inset-0" style={{ x: ix, y: iy }}>
        <motion.div
          className={`${blob} left-[38%] top-[30%] h-[26vw] w-[26vw] bg-white opacity-[0.1]`}
          animate={{ x: ["0%", "-40%", "30%", "0%"], y: ["0%", "25%", "-20%", "0%"] }}
          transition={{ duration: 16, ease: "easeInOut", repeat: Infinity }}
        />
      </motion.div>
      <div
        className="absolute inset-0 opacity-[0.14] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)]" />
    </div>
  );
}
