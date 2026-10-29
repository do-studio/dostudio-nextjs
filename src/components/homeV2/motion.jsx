"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import { MotionConfig, motion, useInView, useReducedMotion } from "framer-motion";

// Snappy overshoot that suits the hard-shadow, sticker-like style of this page.
export const EASE_OUT = [0.22, 1, 0.36, 1];
export const SPRING = { type: "spring", stiffness: 260, damping: 20 };
export const VIEWPORT = { once: true, amount: 0.25 };

export function MotionProvider({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export function Reveal({ children, delay = 0, y = 32, x = 0, className, as = "div", amount = 0.25, ...rest }) {
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Splits text into words that rise from behind a mask, one after another.
// Words stay real text separated by real spaces, so wrapping, SEO and screen readers are unaffected.
export function MaskedWords({ text, className, delay = 0, stagger = 0.06, immediate = false }) {
  const words = text.split(" ");
  const trigger = immediate ? { animate: "show" } : { whileInView: "show", viewport: VIEWPORT };
  return (
    <span className={className}>
      <motion.span
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => (
          <Fragment key={i}>
            <span className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
              <motion.span
                className="inline-block"
                variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                transition={{ duration: 0.75, ease: EASE_OUT }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 && " "}
          </Fragment>
        ))}
      </motion.span>
    </span>
  );
}

// Types the text out, character by character, when it scrolls into view.
// The whole text is in the page from the start (the untyped part is just transparent), so the layout never jumps and
// search engines / screen readers get all of it. Commas and full stops get a short pause, like real typing.
export function TypedText({ text, as = "p", className, delay = 0, speed = 11 }) {
  const Tag = as;
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [count, setCount] = useState(0);
  const [caret, setCaret] = useState(true);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setCount(text.length);
      setCaret(false);
      return;
    }
    // When each character appears, in ms after the start.
    const stamps = [];
    let t = 0;
    for (const ch of text) {
      stamps.push(t);
      t += speed + (ch === "," ? 90 : ch === "." ? 260 : 0);
    }
    const start = performance.now() + delay * 1000;
    let shown = 0;
    let raf;
    let hide;
    const tick = (now) => {
      const elapsed = now - start;
      let n = shown;
      while (n < stamps.length && stamps[n] <= elapsed) n++;
      if (n !== shown) {
        shown = n;
        setCount(n);
      }
      if (n < stamps.length) raf = requestAnimationFrame(tick);
      else hide = setTimeout(() => setCaret(false), 1400);
    };
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(hide);
    };
  }, [inView, reduce, text, delay, speed]);

  return (
    <Tag ref={ref} className={className}>
      {text.slice(0, count)}
      {caret && inView && (
        // Zero-width wrapper so the caret never pushes the text around.
        <span aria-hidden="true" className="relative inline-block w-0 align-baseline">
          <motion.span
            className="absolute left-[0.06em] top-[-0.95em] block h-[1em] w-[0.07em] bg-current"
            animate={{ opacity: [1, 1, 0, 0] }}
            transition={{ duration: 1, times: [0, 0.5, 0.5, 1], repeat: Infinity }}
          />
        </span>
      )}
      <span className="select-none text-transparent">{text.slice(count)}</span>
    </Tag>
  );
}
