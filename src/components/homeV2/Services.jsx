"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { GoArrowUpRight } from "react-icons/go";
import { PiChartBarBold } from "react-icons/pi";
import { LuPencilRuler } from "react-icons/lu";
import SectionPill from "./SectionPill";
import { EASE_OUT, Reveal } from "./motion";

const iconClass =
  "h-[clamp(2.25rem,3.7vw,4.44rem)] w-[clamp(2.25rem,3.7vw,4.44rem)] transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110";

const SERVICES = [
  { title: ["BRANDING"], href: "/services/branding-agency-in-calicut", icon: "/images/home2/icon-branding.svg" },
  { title: ["DIGITAL", "MARKETING"], href: "/services/digital-marketing-agency-in-calicut", Icon: PiChartBarBold },
  { title: ["WEBSITE", "DEVELOPMENT"], href: "/services/web-development-company-in-calicut", icon: "/images/home2/icon-web.svg" },
  { title: ["PRODUCTION"], href: "/our-works/production", icon: "/images/home2/icon-production.svg" },
  { title: ["PRINT", "DESIGN"], href: "/our-works/print-design", Icon: LuPencilRuler },
  { title: ["PACKAGE", "DESIGN"], href: "/our-works/package-design", icon: "/images/home2/icon-package.svg" },
];

export default function Services() {
  return (
    <section className="mx-auto w-[89.5%] max-w-[1718px] pt-[clamp(4rem,10.63vw,12.75rem)]">
      <SectionPill variant="shadow">Our Services</SectionPill>
      <Reveal
        as="p"
        delay={0.1}
        className="mt-[clamp(1.25rem,1.82vw,2.19rem)] text-[clamp(1rem,1.875vw,2.25rem)] leading-[1.361] text-[#1c1c1e]"
      >
        Our expert team guides you from strategy to launch. We combine digital marketing (SEO, social
        media and PPC) with branding, production, web development, packaging and print, so every
        touchpoint looks and performs like one brand.
      </Reveal>

      <motion.div
        className="mt-[clamp(2rem,3.7vw,4.44rem)] grid grid-cols-1 gap-x-[2.9%] gap-y-[clamp(1.25rem,2.05vw,2.47rem)] sm:grid-cols-2 lg:grid-cols-3"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ staggerChildren: 0.08 }}
      >
        {SERVICES.map(({ title, href, icon, Icon }) => (
          // Entrance transform lives on the wrapper so the card's CSS hover/press transforms don't fight it.
          <motion.div
            key={href}
            variants={{
              hidden: { opacity: 0, y: 50, rotate: -3 },
              show: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.7, ease: EASE_OUT } },
            }}
          >
            <Link
              href={href}
              className="group relative flex aspect-[539/242] flex-col justify-between rounded-[clamp(0.9rem,1vw,1.2rem)] border-[1.67px] border-[#1c1c1e] bg-[#ffa8f4] pb-[clamp(0.9rem,1.56vw,1.875rem)] pl-[clamp(1rem,2.08vw,2.5rem)] pr-[clamp(0.9rem,1.35vw,1.625rem)] pt-[clamp(0.9rem,1.25vw,1.5rem)] [--s:clamp(6px,0.65vw,12px)] shadow-[var(--s)_var(--s)_0px_0px_#000] transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-[calc(var(--s)*0.4)] hover:-translate-y-[calc(var(--s)*0.4)] hover:shadow-[calc(var(--s)*1.4)_calc(var(--s)*1.4)_0px_0px_#000] active:translate-x-[var(--s)] active:translate-y-[var(--s)] active:shadow-[0px_0px_0px_0px_#000] active:duration-75"
            >
              <div className="flex items-start justify-between">
                {icon ? (
                  <Image src={icon} alt="" width={71} height={71} className={iconClass} />
                ) : (
                  <Icon className={`${iconClass} text-black`} />
                )}
                <span className="flex h-[clamp(2.25rem,3.49vw,4.19rem)] w-[clamp(2.25rem,3.49vw,4.19rem)] items-center justify-center rounded-full bg-white text-[clamp(1.1rem,1.6vw,1.9rem)] text-black transition-transform duration-300 group-hover:rotate-45">
                  <GoArrowUpRight />
                </span>
              </div>
              <h3 className="pl-[0.26vw] text-[clamp(1.25rem,2.5vw,3rem)] font-bold uppercase leading-[0.9375] text-[#1c1c1e]">
                {title.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h3>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
