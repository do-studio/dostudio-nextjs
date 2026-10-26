"use client";

import { createContext, useContext, useEffect, useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { DOT, DOT_PATH, LETTER_PATHS, LOGO_VIEWBOX } from "./logoPaths";

// `ready` flips to true when the intro starts lifting away, so the hero can animate in underneath it.
// Defaults to true so components still animate if they're rendered without the intro.
const IntroContext = createContext({ ready: true, setReady: () => {} });

// With `enabled={false}` the page starts "ready", so the hero animates in straight away without the intro.
export function IntroProvider({ children, enabled = true }) {
  const [ready, setReady] = useState(!enabled);
  return <IntroContext.Provider value={{ ready, setReady }}>{children}</IntroContext.Provider>;
}

export const useIntroReady = () => useContext(IntroContext).ready;

const YELLOW = "#f6f561";
const START = 0.25; // pause on the empty screen before the drop
const BOUNCE = 1.5; // full drop + bounces
const IMPACT = START + BOUNCE * 0.42; // first time the ball hits the ground
const SETTLED = START + BOUNCE;
const EXIT_AT = (SETTLED + 0.55) * 1000; // ms
const EXIT_EASE = [0.76, 0, 0.24, 1];

// Keyframes share these times: fall, bounce up, fall, smaller bounce, ...
const TIMES = [0, 0.42, 0.58, 0.72, 0.82, 0.9, 0.95, 1];
const FALL_RISE = ["easeIn", "easeOut", "easeIn", "easeOut", "easeIn", "easeOut", "easeIn"];

export default function IntroLoader() {
  const { setReady } = useContext(IntroContext);
  const reduce = useReducedMotion();
  const [show, setShow] = useState(true);
  // The ball and ripple only render after hydration; server HTML is just the dark panel.
  const [mounted, setMounted] = useState(false);
  // Framer applies SVG start values a frame late, so keep the ball hidden until its animation is running.
  const [ballStarted, setBallStarted] = useState(false);
  const clipId = useId().replace(/:/g, "");

  useEffect(() => {
    setMounted(true);
    // Browsers pause animations in background tabs, so only start the exit countdown once the page is visible.
    let timer;
    const startCountdown = () => {
      if (timer || document.hidden) return;
      timer = setTimeout(() => {
        setShow(false);
        setReady(true);
      }, reduce ? 500 : EXIT_AT);
    };
    startCountdown();
    document.addEventListener("visibilitychange", startCountdown);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", startCountdown);
    };
  }, [reduce, setReady]);

  useEffect(() => {
    if (!show) return;
    const html = document.documentElement;
    const prev = html.style.overflow;
    html.style.overflow = "hidden";
    return () => {
      html.style.overflow = prev;
    };
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          id="intro-overlay"
          aria-hidden="true"
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[#1c1c1e]"
          initial={{ y: "0%", opacity: 1 }}
          exit={reduce ? { opacity: 0, transition: { duration: 0.4 } } : { y: "-100%", transition: { duration: 0.9, ease: EXIT_EASE } }}
        >
          {/* Without JS the overlay would never leave, so hide it. */}
          <noscript>
            <style>{"#intro-overlay{display:none!important}"}</style>
          </noscript>

          <motion.svg
            viewBox={LOGO_VIEWBOX}
            overflow="visible"
            className="h-auto w-[clamp(180px,30vw,460px)]"
            exit={reduce ? undefined : { y: 120, opacity: 0, transition: { duration: 0.7, ease: EXIT_EASE } }}
          >
            <defs>
              <clipPath id={clipId}>
                <motion.circle
                  cx={DOT.cx}
                  cy={DOT.cy}
                  initial={{ r: reduce ? 140 : 0 }}
                  animate={{ r: mounted ? 140 : reduce ? 140 : 0 }}
                  transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: reduce ? 0 : IMPACT }}
                />
              </clipPath>
            </defs>

            {/* Letters, revealed by a circle that grows out of the ball's landing spot. */}
            <g clipPath={`url(#${clipId})`}>
              {LETTER_PATHS.map((d, i) => (
                <path key={i} d={d} fill="white" />
              ))}
            </g>

            {mounted && !reduce && (
              // Impact ripple. Keyframes start at 0 so it stays invisible while waiting for its delay.
              <motion.circle
                cx={DOT.cx}
                cy={DOT.cy}
                fill="none"
                stroke={YELLOW}
                strokeWidth={0.8}
                initial={{ r: DOT.r, opacity: 0 }}
                animate={{ r: [DOT.r, DOT.r, 26], opacity: [0, 0.9, 0] }}
                transition={{ duration: 0.7, times: [0, 0.02, 1], ease: "easeOut", delay: IMPACT }}
              />
            )}

            {mounted && (
              // The ball: drops in, bounces with squash & stretch, then turns white like the logo's full stop.
              // y is in viewBox units; 260 starts the ball above the screen even at the smallest logo size.
              <motion.path
                d={DOT_PATH}
                style={{ originX: 0.5, originY: 1, visibility: ballStarted || reduce ? "visible" : "hidden" }}
                onAnimationStart={() => setBallStarted(true)}
                initial={reduce ? { fill: "#ffffff" } : { y: -260, scaleX: 0.85, scaleY: 1.2, fill: YELLOW }}
                animate={
                  reduce
                    ? { fill: "#ffffff" }
                    : {
                        y: [-260, 0, -24, 0, -8, 0, -2, 0],
                        scaleX: [0.85, 1.35, 0.92, 1.18, 0.98, 1.06, 1, 1],
                        scaleY: [1.2, 0.68, 1.08, 0.84, 1.02, 0.95, 1, 1],
                        fill: "#ffffff",
                      }
                }
                transition={{
                  y: { duration: BOUNCE, times: TIMES, ease: FALL_RISE, delay: START },
                  scaleX: { duration: BOUNCE, times: TIMES, delay: START },
                  scaleY: { duration: BOUNCE, times: TIMES, delay: START },
                  fill: { duration: 0.35, delay: reduce ? 0 : SETTLED },
                }}
              />
            )}
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
