"use client";
import { useLayoutEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function useGsapAnimations() {
  useLayoutEffect(() => {
    // Hero fade-in
    gsap.from(".hero-section", {
      opacity: 0,
      y: 50,
      duration: 1.5,
      ease: "power3.out",
    });

    // Scroll-based reveal for sections
    gsap.utils.toArray(".reveal-section").forEach((section) => {
      gsap.fromTo(
        section.querySelectorAll(".reveal-child"),
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 40%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Parallax image movement
    gsap.utils.toArray(".parallax-image").forEach((img) => {
      gsap.to(img, {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: img,
          scrub: true,
        },
      });
    });

    // Smooth fade for footer or last section
    gsap.from(".footer-section", {
      opacity: 0,
      y: 100,
      scrollTrigger: {
        trigger: ".footer-section",
        start: "top 90%",
      },
    });
  }, []);
}
