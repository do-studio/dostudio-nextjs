"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { GoArrowLeft, GoArrowRight } from "react-icons/go";
import { EASE_OUT } from "./motion";
import PaperSheet from "./PaperSheet";

const TESTIMONIALS = [
  {
    name: "Ar. Siraj",
    role: "Founder and Chief Architect of Sacred Saga",
    link: "https://sacred-saga.com",
    title: "Professionals in advertising and Digital marketing",
    quote:
      "We have been working with Do Studio for our advertising and digital marketing needs, and they have consistently exceeded our expectations.",
  },
  {
    name: "Haroon Rasheed",
    role: "Founder of Mywork",
    link: "https://mywork.company",
    title: "Creative Marketing Agency In Calicut.",
    quote:
      "Do Studio is hands down the best creative marketing agency in Calicut. Their creativity and strategic approach have helped us achieve remarkable results in our marketing campaigns.",
  },
  {
    name: "Neshma Abdurrahman",
    role: "Founder of Design Dialects",
    link: "https://designdialects.com",
    title: "Creative Marketing Agency in Calicut",
    quote:
      "Their out-of-the-box ideas and innovative campaigns have helped us stand out in a crowded market, generating significant brand awareness. Do Studio is a truly creative marketing agency in Calicut.",
  },
  {
    name: "MC Nasar",
    role: "Chairman and Managing director of MCKKutty",
    link: "https://mckkutty.com",
    title: "Do Studio Is Good",
    quote:
      "Do Studio is good. They have consistently delivered exceptional designs and marketing solutions that have exceeded our expectations. We highly recommend their services.",
  },
  {
    name: "Arshad",
    role: "Founder of Baleni",
    link: "https://baleni.in",
    title: "Dedicated Agency for marketing",
    quote:
      "Do Studio is a dedicated agency for marketing. They go above and beyond to understand our goals and objectives, delivering tailored solutions that have yielded fantastic results. Their commitment is truly commendable.",
  },
  {
    name: "Shanab",
    role: "Founder of Plum stories",
    link: "https://plumstories.com",
    title: "Best Marketing Agency in Calicut",
    quote:
      "Do studio is one of Calicut's best marketing agency. Engaging with such positive and skilled people has been a beautiful experience.",
  },
];

const COLORS = ["#f6f561", "#ffa8f4"];
const AUTOPLAY_MS = 6000;

// Every card is the same size, so longer quotes get a smaller font. At 1920px the quote area is 952px wide and has
// ~585px of height; this keeps the text inside that, capped at the design's 72px (which Ar. Siraj's quote uses).
function quoteFontSize(text) {
  const px = Math.min(72, Math.sqrt(801900 / (text.length + 2)) * 0.8);
  return `clamp(1.25rem, ${(px / 19.2).toFixed(3)}vw, ${(px / 16).toFixed(3)}rem)`;
}

// --- Paper flight ------------------------------------------------------------------------------------------------
// The flying sheet is drawn by PaperSheet (a flexible, strip-built copy of the card). These are its timings, and the
// lighter "back of the paper" colour shown when a sheet curls over.
const OUT_DURATION = 2.2; // peel + blow away to the left
const IN_DURATION = 1.6; // blow back in from the left and settle flat
const PAPER_BACK = { "#f6f561": "#fbfab8", "#ffa8f4": "#ffd8fa" };

// --- Card poses (the real cards on the wall) ---------------------------------------------------------------------
const TOP = { rotate: 0, scale: 1, opacity: 1, zIndex: 2 };
const UNDER = { rotate: 3, scale: 0.97, opacity: 1, zIndex: 1 };

// `custom` is { dir, paper }: paper is false for visitors who prefer reduced motion, who get simple fades instead.
const cardVariants = {
  top: ({ dir, paper }) => ({
    ...TOP,
    transition:
      dir < 0 && paper
        ? // The paper copy is flying in; the real card appears the moment it lands.
          { default: { duration: 0 }, opacity: { delay: IN_DURATION, duration: 0 } }
        : { duration: paper ? 0.8 : 0.5, ease: EASE_OUT, delay: paper ? 0.5 : 0 },
  }),
  under: { ...UNDER, transition: { duration: 0.6, ease: EASE_OUT } },
  enterUnder: { ...UNDER, rotate: 8, scale: 0.9, opacity: 0 }, // a new card slipping in underneath
  enterTop: { ...TOP, opacity: 0 },
  exit: ({ dir, paper }) =>
    dir > 0
      ? // Going forward the paper copy takes over from the real card instantly, at the same spot.
        { opacity: 0, transition: { duration: paper ? 0 : 0.5 } }
      : // Going back, the card that was underneath quietly drops out of the stack.
        { opacity: 0, scale: 0.9, rotate: 6, zIndex: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

function Card({ t, index, total, hidden = false }) {
  const color = COLORS[index % COLORS.length];
  return (
    <figure
      aria-hidden={hidden || undefined}
      style={{ backgroundColor: color }}
      className="relative flex h-full flex-col rounded-[clamp(1rem,1.6vw,1.9rem)] pb-[clamp(2rem,3vw,3.6rem)] pl-[clamp(1.5rem,4.6vw,5.5rem)] pr-[clamp(1.5rem,4.3vw,5.2rem)] pt-[clamp(2rem,3.8vw,4.6rem)] md:min-h-[clamp(20rem,37.5vw,45rem)]"
    >
      <h3 className="mb-[clamp(0.75rem,1.15vw,1.4rem)] max-w-[min(952px,49.58vw)] text-[clamp(0.75rem,1.25vw,1.5rem)] font-semibold uppercase leading-[1.3] tracking-[0.02em] text-[#1c1c1e]/60 max-md:max-w-none">
        {t.title}
      </h3>
      <blockquote
        style={{ fontSize: quoteFontSize(t.quote) }}
        className="max-w-[min(952px,49.58vw)] font-medium leading-[1.389] text-[#3e3e3e] max-md:max-w-none"
      >
        “{t.quote}”
      </blockquote>
      {/* Pinned to the bottom-right corner as in the design; the quote column stays clear of it. */}
      <figcaption className="mt-8 self-end md:absolute md:bottom-[clamp(2rem,3vw,3.6rem)] md:right-[clamp(1.5rem,4.3vw,5.2rem)] md:mt-0 md:w-[min(364px,18.96vw)]">
        <a
          href={t.link}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={hidden ? -1 : undefined}
          className="text-[clamp(1.4rem,2.8vw,3.4rem)] font-semibold leading-[1.1] text-[#3e3e3e] decoration-2 underline-offset-[0.15em] hover:underline"
        >
          {t.name}
        </a>
        <p className="mt-[clamp(0.25rem,0.5vw,0.6rem)] text-[clamp(0.8rem,1.4vw,1.7rem)] leading-[1.15] text-[#3e3e3e]">
          {t.role}
        </p>
      </figcaption>
      <span className="sr-only">
        Testimonial {index + 1} of {total}
      </span>
    </figure>
  );
}

export default function Testimonial() {
  const total = TESTIMONIALS.length;
  const [{ index, direction }, setState] = useState({ index: 0, direction: 1 });
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [announcement, setAnnouncement] = useState("");
  // The paper sheet currently in the air (null when the stack is still).
  const [flying, setFlying] = useState(null);
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const indexRef = useRef(index);
  const flyingRef = useRef(false);
  indexRef.current = index;
  const inView = useInView(sectionRef, { amount: 0.35 });
  const reduce = useReducedMotion();
  const custom = useMemo(() => ({ dir: direction, paper: !reduce }), [direction, reduce]);

  const go = useCallback(
    (dir, fromUser = false) => {
      if (flyingRef.current) return; // let the current sheet finish first
      const current = indexRef.current;
      const next = (current + dir + total) % total;
      const grid = gridRef.current;
      if (!reduce && grid) {
        const figure = grid.querySelector("figure");
        flyingRef.current = true;
        setFlying({
          key: Date.now(),
          // Forward: the current card blows away. Back: the previous card blows in.
          index: dir > 0 ? current : next,
          direction: dir > 0 ? "out" : "in",
          width: grid.offsetWidth,
          height: grid.offsetHeight,
          radius: parseFloat(getComputedStyle(figure).borderTopLeftRadius) || 16,
        });
      }
      if (fromUser) setAnnouncement(`Testimonial ${next + 1} of ${total}: ${TESTIMONIALS[next].name}`);
      setState({ index: next, direction: dir });
    },
    [total, reduce]
  );

  const landed = useCallback(() => {
    flyingRef.current = false;
    setFlying(null);
  }, []);

  // Auto-advance, paused while the visitor hovers, uses the keyboard here, has scrolled away, or a sheet is mid-air.
  const paused = hovered || focused || !inView || reduce || !!flying;
  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, go]);

  const underIndex = (index + 1) % total;

  return (
    <section
      ref={sectionRef}
      aria-roledescription="carousel"
      aria-label="Client testimonials"
      className="mx-auto w-[89.5%] max-w-[1718px] pt-[clamp(3.5rem,8.49vw,10.19rem)]"
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setFocused(false);
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="relative"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* All cards share one grid cell. Invisible copies of every testimonial size the stack to the tallest,
            so the page never jumps as cards change. */}
        <div ref={gridRef} className="grid [&>*]:[grid-area:1/1]">
          {TESTIMONIALS.map((t, i) => (
            <div key={`sizer-${i}`} className="pointer-events-none invisible" aria-hidden="true">
              <Card t={t} index={i} total={total} hidden />
            </div>
          ))}

          <AnimatePresence initial={false} custom={custom}>
            <motion.div
              key={underIndex}
              custom={custom}
              variants={cardVariants}
              initial="enterUnder"
              animate="under"
              exit="exit"
              aria-hidden="true"
            >
              <Card t={TESTIMONIALS[underIndex]} index={underIndex} total={total} hidden />
            </motion.div>
            <motion.div
              key={index}
              custom={custom}
              variants={cardVariants}
              initial="enterTop"
              animate="top"
              exit="exit"
              role="group"
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${total}`}
            >
              <Card t={TESTIMONIALS[index]} index={index} total={total} />
            </motion.div>
          </AnimatePresence>

          {/* The flexible paper copy that peels off and blows away (or blows back in). */}
          {flying && (
            <PaperSheet
              key={flying.key}
              width={flying.width}
              height={flying.height}
              radius={flying.radius}
              direction={flying.direction}
              duration={flying.direction === "out" ? OUT_DURATION : IN_DURATION}
              backColor={PAPER_BACK[COLORS[flying.index % COLORS.length]]}
              renderFace={() => <Card t={TESTIMONIALS[flying.index]} index={flying.index} total={total} hidden />}
              onDone={landed}
            />
          )}
        </div>

        {/* Controls: below the stack on phones, overlaid on the card's bottom-left corner from tablet up. */}
        <div className="z-10 mt-5 flex items-center gap-3 md:absolute md:bottom-[clamp(2rem,3vw,3.6rem)] md:left-[clamp(1.5rem,4.6vw,5.5rem)] md:mt-0">
          {[
            { dir: -1, label: "Previous testimonial", Icon: GoArrowLeft },
            { dir: 1, label: "Next testimonial", Icon: GoArrowRight },
          ].map(({ dir, label, Icon }) => (
            <button
              key={dir}
              type="button"
              onClick={() => go(dir, true)}
              aria-label={label}
              className="flex h-[clamp(2.75rem,3.75vw,4.5rem)] w-[clamp(2.75rem,3.75vw,4.5rem)] items-center justify-center rounded-full border-[1.67px] border-[#1c1c1e] bg-white text-[clamp(1.1rem,1.6vw,1.9rem)] text-[#1c1c1e] shadow-[4px_4px_0px_0px_#000] transition-[transform,box-shadow] duration-150 hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[6px_6px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none"
            >
              <Icon />
            </button>
          ))}
          <span className="ml-2 text-[clamp(0.9rem,1.25vw,1.5rem)] font-semibold tabular-nums text-[#1c1c1e]">
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
        </div>

        <p className="sr-only" aria-live="polite">
          {announcement}
        </p>
      </motion.div>
    </section>
  );
}
