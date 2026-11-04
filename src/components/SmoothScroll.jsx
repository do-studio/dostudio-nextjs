"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "@studio-freight/lenis";

// Smooth (eased) mouse-wheel and keyboard scrolling for the whole site, using Lenis. Touch screens keep their native
// scrolling, which is already smooth. Skipped for visitors who prefer reduced motion, and on the full-screen gallery
// pages, which run their own wheel handling and have no page scroll.
const OWN_SCROLL_ROUTES = ["/our-works/creative-posters", "/our-works/production", "/our-works/motion-creatives", "/package-design-3"];

// The loop only runs while the page is moving (and for a few frames after), so an idle page costs nothing.
const IDLE_FRAMES = 20;

export default function SmoothScroll() {
  const pathname = usePathname();
  const enabled = !OWN_SCROLL_ROUTES.includes(pathname);

  useEffect(() => {
    if (!enabled || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    let raf = 0;
    let idle = 0;
    const tick = (time) => {
      lenis.raf(time);
      idle = lenis.isScrolling ? 0 : idle + 1;
      raf = idle < IDLE_FRAMES ? requestAnimationFrame(tick) : 0;
    };
    const wake = () => {
      idle = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const events = ["wheel", "keydown", "scroll", "resize"];
    events.forEach((e) => window.addEventListener(e, wake, { passive: true }));

    // Links to a place on the same page (#contact) glide there instead of jumping.
    const onClick = (e) => {
      const link = e.target.closest?.('a[href^="#"]');
      const id = link?.getAttribute("href");
      if (!id || id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target);
      wake();
    };
    document.addEventListener("click", onClick);

    // A new page opens at the top.
    lenis.scrollTo(0, { immediate: true });

    return () => {
      events.forEach((e) => window.removeEventListener(e, wake));
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, [enabled, pathname]);

  return null;
}
