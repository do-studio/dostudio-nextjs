"use client";

import { Fragment } from "react";
import { MotionConfig, motion } from "framer-motion";

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
