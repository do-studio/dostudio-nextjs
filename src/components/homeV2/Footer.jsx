"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { EASE_OUT } from "./motion";

const PAGES = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
  { label: "Blogs", href: "/blogs" },
];

const WORKS = [
  { label: "Branding", href: "/our-works/branding" },
  { label: "Creative Posters", href: "/our-works/creative-posters" },
  { label: "Motion Creatives", href: "/our-works/motion-creatives" },
  { label: "Web Design", href: "/our-works/web-design" },
  { label: "Package Design", href: "/our-works/package-design" },
  { label: "Print Design", href: "/our-works/print-design" },
  { label: "Production", href: "/our-works/production" },
];

const headingClass = "text-[clamp(1rem,1.578vw,1.89rem)] font-medium uppercase leading-[1.32] text-white";
const linkClass =
  "inline-block text-[clamp(0.95rem,1.536vw,1.84rem)] leading-[1.356] text-white/85 transition-[color,transform] duration-300 hover:translate-x-1.5 hover:text-[#f6f561]";

const column = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT } },
};

function LinkColumn({ title, links }) {
  return (
    <motion.div variants={column}>
      <h3 className={headingClass}>{title}</h3>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href} className={linkClass}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1e] pb-[clamp(2.5rem,4.375vw,5.25rem)] pt-[clamp(2.5rem,5.73vw,6.875rem)]">
      <div className="mx-auto grid w-[89.5%] max-w-[1718px] grid-cols-1 gap-10 md:grid-cols-[47.6%_1fr]">
        {/* The clipping wrapper triggers the reveal: the logo itself starts fully clipped, so it can never be "in view". */}
        <motion.div
          className="overflow-hidden md:-ml-[0.35%]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <Link href="/" aria-label="Do Studio home" className="block">
            <motion.div
              variants={{ hidden: { y: "100%" }, show: { y: "0%" } }}
              transition={{ duration: 1.1, ease: EASE_OUT }}
            >
              <Image
                src="/images/home2/logo-white.svg"
                alt="Do Studio"
                width={787}
                height={465}
                className="h-auto w-[60%] md:w-[96%]"
              />
            </motion.div>
          </Link>
        </motion.div>

        <motion.div
          className="flex flex-col justify-between gap-10 md:pt-[0.73vw]"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.2 }}
        >
          <motion.div
            className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-[28.8%_30.7%_1fr]"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
          >
            <LinkColumn title="Pages" links={PAGES} />
            <LinkColumn title="Our Works" links={WORKS} />
            <motion.div className="col-span-2 sm:col-span-1" variants={column}>
              <h3 className={headingClass}>Office Address</h3>
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[clamp(0.95rem,1.536vw,1.84rem)] leading-[1.356] text-white/85 transition-colors duration-300 hover:text-[#f6f561]"
              >
                1st Floor, Ramaswami Complex
                <br />
                Cherooty Rd, Behind Basics,
                <br />
                Kozhikode, Kerala,
                <br />
                India - 673001
              </a>
              <div className="mb-[clamp(0.6rem,0.73vw,0.875rem)] mt-[clamp(0.6rem,0.78vw,0.94rem)] h-px w-full max-w-[313px] bg-white/40" />
              <motion.a
                href="tel:+919746155541"
                initial="rest"
                whileHover="ring"
                className="flex w-fit items-center gap-[clamp(0.4rem,0.36vw,0.45rem)] text-[clamp(0.95rem,1.65vw,1.98rem)] text-white"
              >
                <motion.span
                  variants={{ rest: { rotate: 0 }, ring: { rotate: [0, -16, 14, -10, 8, 0], transition: { duration: 0.6 } } }}
                  className="flex h-[clamp(1.75rem,1.98vw,2.375rem)] w-[clamp(1.75rem,1.98vw,2.375rem)] shrink-0 items-center justify-center rounded-full border border-white"
                >
                  <Image
                    src="/images/home2/icon-phone.svg"
                    alt=""
                    width={24}
                    height={24}
                    className="h-[63%] w-[63%] invert"
                  />
                </motion.span>
                +91 97461 55541
              </motion.a>
            </motion.div>
          </motion.div>
          <motion.div
            className="h-px w-full origin-left bg-white/40"
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1, transition: { duration: 1, ease: EASE_OUT } } }}
          />
        </motion.div>
      </div>
    </footer>
  );
}
