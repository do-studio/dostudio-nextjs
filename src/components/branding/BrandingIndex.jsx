"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import SiteNav from "../homeV2/SiteNav";
import Footer from "../homeV2/Footer";

// The branding works as a brand index: a large typographic list of every brand, with a sticky preview beside it that
// reveals the brand's artwork as you hover a name or scroll past it. On phones each brand is a card with its picture.
//
// Kept light: plain DOM and CSS transforms (no WebGL), one preview image animating at a time, images resized by the
// CDN to the size they're shown at, and the next/previous brands' pictures fetched ahead so the reveal never waits.

const EASE = [0.22, 1, 0.36, 1];
const clean = (s) => (s || "").trim();
const pad = (n) => String(n + 1).padStart(2, "0");
const SANITY_IMG = (url, w, h) => `${url}?w=${w}${h ? `&h=${h}&fit=crop&crop=top` : ""}&auto=format`;
const caseStudy = (slug) => `/our-works/branding/${slug}`;

export default function BrandingIndex({ brands }) {
  const count = brands.length;
  const [scrollIdx, setScrollIdx] = useState(0); // the brand in the middle of the screen
  const [hoverIdx, setHoverIdx] = useState(null); // the brand under the pointer (wins while hovering)
  const active = hoverIdx ?? scrollIdx;
  const rowRefs = useRef([]);

  // As the list scrolls, the row passing through the middle of the screen becomes the active brand.
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setScrollIdx(Number(e.target.dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    rowRefs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, [count]);

  // Fetch the neighbours' pictures ahead of time, so moving to them shows the artwork straight away.
  useEffect(() => {
    [active - 1, active + 1, active + 2].forEach((i) => {
      const b = brands[i];
      if (b) new window.Image().src = SANITY_IMG(b.thumb, 1100);
    });
  }, [active, brands]);

  const brand = brands[active];

  return (
    <>
      <SiteNav />

      {/* Intro */}
      <header className="mx-auto w-[89.5%] max-w-[1718px] pb-[clamp(2.5rem,5vw,6rem)] pt-[clamp(7rem,13vw,13rem)]">
        <h1 className="overflow-hidden text-[clamp(3rem,9.5vw,11.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
          <motion.span
            className="block"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          >
            Brands we&apos;ve
          </motion.span>
        </h1>
        <p className="overflow-hidden text-[clamp(3rem,9.5vw,11.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]" aria-hidden="true">
          <motion.span
            className="flex items-center gap-[0.15em]"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1, ease: EASE, delay: 0.2 }}
          >
            built
            <span className="inline-block rounded-full bg-[#ffa8f4] px-[0.3em] pb-[0.04em] text-[0.42em] leading-[1.25] tracking-[-0.02em] text-[#1c1c1e]">
              identity
            </span>
          </motion.span>
        </p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-[clamp(1.5rem,2.5vw,3rem)] max-w-[min(640px,90%)] text-[clamp(1rem,1.35vw,1.6rem)] leading-[1.45] text-white/65"
        >
          Names, logos, packaging and complete brand systems, crafted by Do Studio in Calicut. <span className="max-md:hidden">Hover a name to see the work; click to open the project.</span>
          <span className="md:hidden">Tap a brand to open the project.</span>
        </motion.p>
      </header>

      <section className="mx-auto grid w-[89.5%] max-w-[1718px] grid-cols-1 gap-x-[4vw] md:grid-cols-[1.15fr_1fr]">
        {/* The index */}
        <ol onMouseLeave={() => setHoverIdx(null)} className="grid grid-cols-2 gap-x-[clamp(0.6rem,3vw,1rem)] gap-y-[clamp(1.25rem,6vw,2rem)] md:block md:border-t md:border-white/15">
          {brands.map((b, i) => {
            const isActive = i === active;
            return (
              <li key={b._id} ref={(el) => (rowRefs.current[i] = el)} data-index={i} className="md:border-b md:border-white/15">
                <Link
                  href={caseStudy(b.slug)}
                  onMouseEnter={() => setHoverIdx(i)}
                  onFocus={() => setHoverIdx(i)}
                  className="group block outline-none md:py-[clamp(1rem,1.6vw,1.9rem)]"
                >
                  {/* Phones: the picture sits in the card itself. */}
                  <div className="relative aspect-square overflow-hidden rounded-[clamp(12px,3.5vw,18px)] bg-[#f3f3ef] md:hidden">
                    <Image
                      src={SANITY_IMG(b.thumb, 800)}
                      alt={clean(b.altText) || clean(b.title)}
                      fill
                      sizes="45vw"
                      unoptimized
                      className="object-cover"
                    />
                  </div>
                  <div className="flex items-baseline gap-[clamp(0.75rem,1.5vw,2rem)] max-md:hidden">
                    <span
                      className={`w-[2.2em] shrink-0 text-[clamp(0.8rem,0.95vw,1.1rem)] font-medium tabular-nums transition-colors duration-300 max-md:w-auto max-md:text-[0.7rem] ${
                        isActive ? "text-[#f6f561]" : "text-white/35"
                      }`}
                    >
                      {pad(i)}
                    </span>
                    <span
                      className={`flex-1 text-[clamp(1.9rem,4.6vw,5.6rem)] font-bold uppercase leading-[0.95] tracking-[-0.035em] max-md:!text-white max-md:text-[clamp(0.95rem,4.6vw,1.3rem)] max-md:leading-[1.05] transition-[color,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:group-hover:translate-x-[0.35em] ${
                        isActive ? "text-white md:translate-x-[0.35em]" : "text-white/30 group-focus-visible:text-white"
                      }`}
                    >
                      {clean(b.title)}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`hidden shrink-0 text-[clamp(1.2rem,2vw,2.4rem)] transition-[opacity,transform] duration-500 md:inline ${
                        isActive ? "translate-x-0 opacity-100 text-[#f6f561]" : "-translate-x-3 opacity-0"
                      }`}
                    >
                      ↗
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>

        {/* The preview: stays in view while the list scrolls past it (desktop only). */}
        <aside className="relative hidden md:block">
          <div className="sticky top-[13vh] h-[74vh]">
            {/* Light card behind the pictures: some are transparent PNGs of dark logos. */}
            {brand && (
              <div className="flex h-full flex-col">
                <div className="relative flex-1 overflow-hidden rounded-[clamp(18px,1.8vw,30px)] bg-[#f3f3ef]">
                  <AnimatePresence initial={false}>
                    <motion.div
                      key={brand._id}
                      className="absolute inset-0"
                      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
                      animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
                      exit={{ opacity: 0, transition: { duration: 0.3, delay: 0.45 } }}
                      transition={{ duration: 0.75, ease: EASE }}
                    >
                      <motion.div
                        className="absolute inset-0"
                        initial={{ scale: 1.12 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 1.1, ease: EASE }}
                      >
                        <Image
                          src={SANITY_IMG(brand.thumb, 1100)}
                          alt={clean(brand.altText) || clean(brand.title)}
                          fill
                          sizes="40vw"
                          unoptimized
                          priority={active === 0}
                          className="object-cover"
                        />
                      </motion.div>
                    </motion.div>
                  </AnimatePresence>

                  <Link
                    href={caseStudy(brand.slug)}
                    className="absolute bottom-[clamp(0.9rem,1.4vw,1.6rem)] right-[clamp(0.9rem,1.4vw,1.6rem)] z-10 flex items-center gap-2 rounded-full bg-white px-[clamp(1rem,1.2vw,1.4rem)] py-[clamp(0.55rem,0.7vw,0.8rem)] text-[clamp(0.85rem,1vw,1.15rem)] font-bold text-black shadow-md transition-colors hover:bg-[#f6f561]"
                  >
                    View project <span aria-hidden="true">→</span>
                  </Link>
                </div>

                {/* A glimpse of the case study pages. */}
                {brand.inner?.length > 0 && (
                  <div className="mt-[clamp(0.6rem,0.8vw,1rem)] grid grid-cols-4 gap-[clamp(0.6rem,0.8vw,1rem)]">
                    {brand.inner.slice(0, 4).map((src, k) => (
                      <motion.div
                        key={`${brand._id}-${k}`}
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: EASE, delay: 0.15 + k * 0.06 }}
                        className="relative aspect-[4/3] overflow-hidden rounded-[clamp(10px,1vw,16px)] bg-[#161616]"
                      >
                        <Image src={SANITY_IMG(src, 360, 270)} alt="" fill sizes="10vw" unoptimized className="object-cover" />
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </aside>
      </section>

      {/* Closing call to action */}
      <section className="mx-auto w-[89.5%] max-w-[1718px] py-[clamp(4rem,9vw,10rem)] text-center">
        <p className="text-[clamp(0.85rem,1vw,1.15rem)] font-medium uppercase tracking-[0.18em] text-white/50">Your brand next?</p>
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
    </>
  );
}
