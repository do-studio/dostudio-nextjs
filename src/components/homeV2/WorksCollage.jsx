"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import SectionPill from "./SectionPill";
import { EASE_OUT, Reveal, SPRING } from "./motion";

// Tile positions are % of the 1718×1226 collage in the Figma frame.
// `slot` indexes into the `media` array from Works.jsx. The two `color` tiles are the design's yellow/pink
// accents: they show work when Sanity has some for their slot (with the colour behind it while loading),
// and fall back to the flat colour block otherwise.
const TILES = [
  { l: "0%", t: "0%", w: "23.645%", h: "51.65%", slot: 0, fallback: "/images/home2/work-1.png" },
  { l: "0%", t: "53.65%", w: "23.645%", h: "46.35%", slot: 1, fallback: "/images/home2/work-2.png" },
  { l: "25.073%", t: "0%", w: "24.002%", h: "29.23%", slot: 7, color: "#f6f561" },
  { l: "50.503%", t: "0%", w: "24.002%", h: "29.23%", slot: 2, fallback: "/images/home2/work-4.png" },
  { l: "25.087%", t: "31.24%", w: "49.418%", h: "42.25%", slot: 3, fallback: "/images/home2/work-8.png", sizes: "50vw" },
  { l: "75.934%", t: "0%", w: "24.066%", h: "51.65%", slot: 4, fallback: "/images/home2/work-9.png" },
  { l: "75.934%", t: "53.65%", w: "24.066%", h: "19.82%", slot: 5, fallback: "/images/home2/work-5.png" },
  { l: "25.073%", t: "75.48%", w: "24.788%", h: "24.52%", slot: 8, color: "#ffa8f4" },
  { l: "51.289%", t: "75.48%", w: "48.711%", h: "24.52%", slot: 6, fallback: "/images/home2/work-7.png", sizes: "50vw" },
];

const photoVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.94 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.8, ease: EASE_OUT } },
};
const colorVariants = {
  hidden: { opacity: 0, scale: 0.3, rotate: -10 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: SPRING },
};

// Sanity's image CDN resizes on the fly; video posters skip next/image, so size them here.
const sanityThumb = (url, w = 1000) => (url?.includes("cdn.sanity.io/images") ? `${url}?w=${w}&auto=format` : url);

// Loads and plays only while on screen, pauses when scrolled away. Reduced-motion users get the poster only.
function VideoMedia({ src, poster, title }) {
  const ref = useRef(null);
  const inView = useRef(false);
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          setLoad(true);
          if (video.getAttribute("src")) video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(video);
    return () => io.disconnect();
  }, [reduce]);

  // First play happens once the src is attached, and only if the tile is still on screen.
  useEffect(() => {
    if (load && inView.current) ref.current?.play().catch(() => {});
  }, [load]);

  return (
    <video
      ref={ref}
      src={load ? src : undefined}
      poster={sanityThumb(poster)}
      muted
      loop
      playsInline
      preload="none"
      aria-label={title}
      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
    />
  );
}

function TileMedia({ item, fallback, sizes }) {
  if (item?.kind === "video") return <VideoMedia src={item.src} poster={item.poster} title={item.title} />;
  if (item?.kind === "website") {
    // Tall full-page screenshot: shows the top of the site, then scrolls to the bottom on hover.
    return (
      <Image
        src={item.src}
        alt={item.title}
        fill
        sizes={`(min-width: 768px) ${sizes || "25vw"}, 50vw`}
        className="object-cover object-top transition-[object-position] duration-[6000ms] ease-in-out group-hover:object-bottom motion-reduce:transition-none"
      />
    );
  }
  return (
    <Image
      src={item?.src || fallback}
      alt={item?.title || "Do Studio work"}
      fill
      sizes={`(min-width: 768px) ${sizes || "25vw"}, 50vw`}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
    />
  );
}

export default function WorksCollage({ media }) {
  return (
    <section className="mx-auto w-[89.5%] max-w-[1718px] pt-[clamp(3rem,5.16vw,6.19rem)]">
      <div className="flex flex-col items-start gap-5 md:flex-row md:justify-between">
        <SectionPill variant="outline">WORKS</SectionPill>
        <Reveal
          as="p"
          delay={0.15}
          className="text-[clamp(1rem,1.875vw,2.25rem)] md:max-w-[min(806px,41.98vw)] leading-[1.361] text-[#3e3e3e] md:w-[46.9%]"
        >
          Our areas of expertise include Digital marketing services in Calicut, branding, production.
        </Reveal>
      </div>

      <motion.div
        className="relative mt-[clamp(2rem,3.59vw,4.31rem)] aspect-[1718/1226]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ staggerChildren: 0.09 }}
      >
        {TILES.map((tile, i) => {
          const item = media[tile.slot];
          const position = { "--l": tile.l, "--t": tile.t, "--w": tile.w, "--h": tile.h };
          // Same layout at every screen size: each tile is placed by its Figma position as a % of the collage.
          const box =
            "absolute left-[var(--l)] top-[var(--t)] h-[var(--h)] w-[var(--w)] overflow-hidden rounded-[clamp(0.5rem,2.05vw,2.45rem)]";

          if (tile.color && !item) {
            return (
              <motion.div
                key={i}
                variants={colorVariants}
                whileHover={{ rotate: -3, scale: 1.03, transition: SPRING }}
                style={{ ...position, backgroundColor: tile.color }}
                className={box}
              />
            );
          }

          return (
            <motion.div
              key={i}
              variants={photoVariants}
              style={{ ...position, backgroundColor: tile.color }}
              className={`${box} transition-shadow duration-300 hover:shadow-[8px_8px_0px_0px_#000]`}
            >
              <Link
                href={item?.href || "/our-works"}
                aria-label={item ? `${item.category}: ${item.title}` : "Our works"}
                className="group absolute inset-0 block"
              >
                <TileMedia item={item} fallback={tile.fallback} sizes={tile.sizes} />
              </Link>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
}
