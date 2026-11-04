"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import SiteNav from "../homeV2/SiteNav";
import Footer from "../homeV2/Footer";
import MediaFrame from "../videos/MediaFrame";

// Package designs on store shelves. Scroll down and the page holds still while three shelves slide sideways in opposite
// directions, so the packs parade past like walking down a supermarket aisle. Hover a pack to lift it off the shelf,
// click to see it large.
//
// Light by design: the shelves are moved by scroll position with a transform (no re-rendering), pictures are small
// (the shelf shows them about 200px tall), and nothing runs while the page is still.

const EASE = [0.22, 1, 0.36, 1];
const SHELVES = 3;
const clean = (s) => (s || "").trim();
const img = (url, w) => `${url}?w=${w}&auto=format`;
const mod = (n, m) => ((n % m) + m) % m;

// One shelf: a row of packs standing on a plank, slid sideways by the page's scroll progress.
function Shelf({ items, progress, direction, reduce, onOpen }) {
  const rowRef = useRef(null);
  const travel = useRef(0); // how far the row has to slide to show every pack
  useEffect(() => {
    const row = rowRef.current;
    if (!row || reduce) return;
    const measure = () => {
      travel.current = Math.max(0, row.scrollWidth - row.parentElement.clientWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(row);
    ro.observe(row.parentElement);
    return () => ro.disconnect();
  }, [reduce, items]);

  // direction 1 slides the row to the left as you scroll; -1 to the right.
  const x = useTransform(progress, (v) => (direction > 0 ? -travel.current * v : -travel.current * (1 - v)));

  return (
    <div className={`relative ${reduce ? "overflow-x-auto" : "overflow-hidden"}`}>
      <motion.div
        ref={rowRef}
        style={reduce ? undefined : { x }}
        className="flex w-max items-end gap-[clamp(1.5rem,3.2vw,4rem)] px-[5.25%] pb-[clamp(0.6rem,1vh,1rem)] will-change-transform"
      >
        {items.map(({ design: d, index }) => {
          const ratio = d.width && d.height ? d.width / d.height : 1;
          return (
            <button
              key={d._id}
              type="button"
              onClick={() => onOpen(index)}
              aria-label={clean(d.altText) || "Open package design"}
              className="group relative shrink-0 outline-none"
              style={{ height: "var(--tile)", aspectRatio: ratio }}
            >
              {/* The pack lifts a little when you point at it. */}
              <span className="absolute inset-0 block overflow-hidden rounded-[clamp(6px,0.7vw,12px)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-3 group-hover:scale-[1.05] group-focus-visible:-translate-y-3 group-focus-visible:scale-[1.05]" style={{ backgroundColor: d.color }}>
                <Image
                  src={img(d.url, 520)}
                  alt={clean(d.altText) || "Package design"}
                  fill
                  sizes="20vh"
                  unoptimized
                  loading="eager"
                  className="object-cover"
                />
              </span>
              {/* Its shadow on the plank grows as the pack lifts. */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-[0.55rem] left-[8%] right-[8%] h-3 bg-[radial-gradient(closest-side,rgba(0,0,0,0.6),transparent)] transition-[transform,opacity] duration-500 group-hover:scale-90 group-hover:opacity-60"
              />
            </button>
          );
        })}
      </motion.div>
      {/* The plank. */}
      <div aria-hidden="true" className="pointer-events-none h-[clamp(5px,0.8vh,9px)] bg-gradient-to-r from-[#f6f561]/10 via-[#f6f561]/55 to-[#f6f561]/10" />
      <div aria-hidden="true" className="pointer-events-none h-[clamp(8px,1.4vh,16px)] bg-gradient-to-b from-white/[0.07] to-transparent" />
    </div>
  );
}

export default function PackageShelves({ designs }) {
  const count = designs.length;
  const reduce = useReducedMotion();
  const trackRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const [open, setOpen] = useState(null);

  // Deal the designs onto the shelves one by one, so each shelf gets a mix of shapes, in the order from Sanity.
  const shelves = useMemo(() => {
    const rows = Array.from({ length: SHELVES }, () => []);
    designs.forEach((d, index) => rows[index % SHELVES].push({ design: d, index }));
    return rows;
  }, [designs]);

  const close = useCallback(() => setOpen(null), []);
  useEffect(() => {
    if (open === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") setOpen((i) => mod(i + 1, count));
      else if (e.key === "ArrowLeft") setOpen((i) => mod(i - 1, count));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, count, close]);

  const current = open !== null ? designs[open] : null;
  const currentRatio = current && current.width && current.height ? `${current.width}/${current.height}` : "1/1";

  return (
    <>
      <SiteNav />

      <header className="mx-auto w-[89.5%] max-w-[1718px] pb-[clamp(2rem,4vw,5rem)] pt-[clamp(7rem,13vw,13rem)]">
        <h1 className="overflow-hidden text-[clamp(3rem,10.5vw,13rem)] font-bold uppercase leading-[0.9] tracking-[-0.045em]">
          <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
            Shelf-ready
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-[clamp(1.25rem,2vw,2.5rem)] max-w-[min(560px,90%)] text-[clamp(1rem,1.35vw,1.6rem)] leading-[1.45] text-white/65"
        >
          Package design by Do Studio in Calicut. Scroll to walk down the aisle; click a pack to open it.
        </motion.p>
      </header>

      {/* The aisle: a tall track, with the shelves held on screen while it scrolls past. */}
      <section ref={trackRef} aria-label="Package designs" className={reduce ? "" : "h-[320vh]"}>
        <div className={reduce ? "" : "sticky top-0 flex h-screen flex-col justify-center"}>
          <div className="flex flex-col gap-[clamp(1rem,3vh,2.5rem)] [--tile:clamp(7.5rem,21vh,17rem)]">
            {shelves.map((items, s) => (
              <Shelf key={s} items={items} progress={scrollYProgress} direction={s % 2 === 0 ? 1 : -1} reduce={reduce} onOpen={setOpen} />
            ))}
          </div>
        </div>
        {!count && <p className="py-24 text-center text-2xl text-white/70">No package designs found.</p>}
      </section>

      <section className="mx-auto w-[89.5%] max-w-[1718px] py-[clamp(4rem,9vw,10rem)] text-center">
        <p className="text-[clamp(0.85rem,1vw,1.15rem)] font-medium uppercase tracking-[0.18em] text-white/50">Need a pack that sells?</p>
        <Link
          href="/contact"
          className="group mt-4 inline-flex items-center gap-[0.25em] text-[clamp(2.4rem,7vw,8.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] transition-colors hover:text-[#f6f561]"
        >
          Let&apos;s talk
          <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-2 group-hover:-rotate-45">
            →
          </span>
        </Link>
      </section>

      <Footer />

      <AnimatePresence>
        {current && (
          <motion.div
            key="viewer"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-[#0c0c0c]/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={clean(current.altText) || "Package design"}
          >
            <motion.div
              key={current._id}
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <MediaFrame kind="image" src={img(current.url, 1600)} alt={clean(current.altText) || "Package design"} ratio={currentRatio} radius="clamp(8px,1vw,16px)" maxHeight="80svh" />
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
              onClick={close}
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
