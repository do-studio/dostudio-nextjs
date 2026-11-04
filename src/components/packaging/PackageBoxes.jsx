"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SiteNav from "../homeV2/SiteNav";
import Footer from "../homeV2/Footer";
import MediaFrame from "../videos/MediaFrame";

// Package designs as real boxes. Every design is a little 3D box on a light "table": its picture is the front, and it has
// a visible side and top, painted in the picture's own colour. Hover a box and it turns towards your pointer so you can
// look around it; click one to see the design large.
//
// Light by design: plain CSS 3D (no WebGL), nothing runs until you hover a box, and pictures are sized by the image CDN.

const EASE = [0.22, 1, 0.36, 1];
const clean = (s) => (s || "").trim();
const img = (url, w) => `${url}?w=${w}&auto=format`;
const mod = (n, m) => ((n % m) + m) % m;
const REST = { x: -9, y: -18 }; // the pose a box rests in: turned a little so its side and top show

function PackBox({ design, index, onOpen }) {
  const ratio = design.width && design.height ? design.width / design.height : 1;
  const edge = design.color || "#d8d2c4";

  // Turn the box towards the pointer, and swing its shadow with it. The numbers are set on the button, which both the box and
  // its shadow read, so only styles on this one element change, and only while the pointer moves over it.
  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--ry", `${(REST.y + px * 34).toFixed(1)}deg`);
    el.style.setProperty("--rx", `${(REST.x - py * 26).toFixed(1)}deg`);
    el.style.setProperty("--sx", px.toFixed(3));
    el.style.setProperty("--sy", py.toFixed(3));
  };
  const onLeave = (e) => {
    const el = e.currentTarget;
    el.style.setProperty("--ry", `${REST.y}deg`);
    el.style.setProperty("--rx", `${REST.x}deg`);
    el.style.setProperty("--sx", "0");
    el.style.setProperty("--sy", "0");
  };

  return (
    <motion.li
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.8, ease: EASE }}
      className="mb-[clamp(2rem,4.5vw,5rem)] break-inside-avoid"
    >
      <button
        type="button"
        onClick={() => onOpen(index)}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        aria-label={clean(design.altText) || "Open package design"}
        className="group relative block w-full [--rx:-9deg] [--ry:-18deg] [--sx:0] [--sy:0] [perspective:1100px]"
      >
        {/* The box. */}
        <div
          className="relative w-full transition-transform duration-300 ease-out [--d:clamp(1.1rem,2.6vw,2.6rem)] [transform-style:preserve-3d] [transform:rotateX(var(--rx))_rotateY(var(--ry))]"
          style={{ aspectRatio: ratio }}
        >
          {/* Front: the design. */}
          <div className="absolute inset-0 overflow-hidden rounded-[3px] [transform:translateZ(calc(var(--d)/2))]" style={{ backgroundColor: edge }}>
            <Image
              src={img(design.url, 900)}
              alt={clean(design.altText) || "Package design"}
              fill
              sizes="(min-width: 768px) 30vw, 46vw"
              unoptimized
              className="object-cover"
            />
            {/* A soft sheen across the front, like a glossy carton. */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/25 via-transparent to-black/10" />
          </div>
          {/* The other five faces, each centred on the edge of the front face and turned 90 degrees, so the box is solid. */}
          <div
            className="absolute top-0 h-full [transform:rotateY(90deg)]"
            style={{ left: "calc(100% - var(--d) / 2)", width: "var(--d)", backgroundColor: edge, filter: "brightness(0.8)" }}
          />
          <div
            className="absolute top-0 h-full [transform:rotateY(-90deg)]"
            style={{ left: "calc(var(--d) / -2)", width: "var(--d)", backgroundColor: edge, filter: "brightness(0.72)" }}
          />
          <div
            className="absolute left-0 w-full [transform:rotateX(90deg)]"
            style={{ top: "calc(var(--d) / -2)", height: "var(--d)", backgroundColor: edge, filter: "brightness(1.12)" }}
          />
          <div
            className="absolute left-0 w-full [transform:rotateX(-90deg)]"
            style={{ top: "calc(100% - var(--d) / 2)", height: "var(--d)", backgroundColor: edge, filter: "brightness(0.65)" }}
          />
          <div className="absolute inset-0 [transform:translateZ(calc(var(--d)/-2))_rotateY(180deg)]" style={{ backgroundColor: edge, filter: "brightness(0.7)" }} />
        </div>
        {/* Shadow on the table. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-[0.9rem] left-[6%] right-[2%] h-5 bg-[radial-gradient(closest-side,rgba(28,28,30,0.34),transparent)] transition-transform duration-300 ease-out [transform:translateX(calc(var(--sx)_*_26%))_translateY(calc(var(--sy)_*_7px))_scaleX(calc(1_+_var(--sx)_*_var(--sx)_*_0.7))]"
        />
      </button>
    </motion.li>
  );
}

export default function PackageBoxes({ designs }) {
  const count = designs.length;
  const [open, setOpen] = useState(null);

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
      <SiteNav onLight />

      <header className="mx-auto w-[89.5%] max-w-[1718px] pb-[clamp(2.5rem,5vw,6rem)] pt-[clamp(7rem,13vw,13rem)]">
        <h1 className="overflow-hidden text-[clamp(3.5rem,13vw,16rem)] font-bold uppercase leading-[0.88] tracking-[-0.05em]">
          <motion.span className="block" initial={{ y: "105%" }} animate={{ y: "0%" }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
            Unboxed
            <span className="text-[#ff5a3c]">.</span>
          </motion.span>
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-[clamp(1.5rem,2.5vw,3rem)] max-w-[min(560px,90%)] text-[clamp(1rem,1.35vw,1.6rem)] leading-[1.45] text-[#1c1c1e]/65"
        >
          Package design by Do Studio in Calicut. Hover a box to look around it, click to open the design.
        </motion.p>
      </header>

      <section aria-label="Package designs" className="mx-auto w-[89.5%] max-w-[1718px] pb-[clamp(3rem,6vw,7rem)]">
        {/* Paper-like columns; boxes keep their own proportions. */}
        <ul className="columns-2 gap-x-[clamp(1.5rem,4.5vw,5.5rem)] md:columns-3">
          {designs.map((d, i) => (
            <PackBox key={d._id} design={d} index={i} onOpen={setOpen} />
          ))}
        </ul>
        {!count && <p className="py-24 text-center text-2xl text-[#1c1c1e]/60">No package designs found.</p>}
      </section>

      <section className="mx-auto w-[89.5%] max-w-[1718px] pb-[clamp(4rem,9vw,10rem)] text-center">
        <p className="text-[clamp(0.85rem,1vw,1.15rem)] font-medium uppercase tracking-[0.18em] text-[#1c1c1e]/50">Need a pack that sells?</p>
        <Link
          href="/contact"
          className="group mt-4 inline-flex items-center gap-[0.25em] text-[clamp(2.4rem,7vw,8.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] transition-colors hover:text-[#ff5a3c]"
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
