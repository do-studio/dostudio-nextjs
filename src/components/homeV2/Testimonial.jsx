"use client";

import { motion } from "framer-motion";
import { EASE_OUT, MaskedWords, VIEWPORT } from "./motion";

const QUOTE =
  "“We have been working with Do Studio for our advertising and digital marketing needs, and they have consistently exceeded our expectations.”";

export default function Testimonial() {
  return (
    <section className="mx-auto w-[89.5%] max-w-[1718px] pt-[clamp(3.5rem,8.49vw,10.19rem)]">
      <motion.figure
        initial={{ opacity: 0, scale: 0.94, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="relative flex flex-col gap-10 rounded-[clamp(1rem,1.6vw,1.9rem)] bg-[#f6f561] pb-[clamp(2rem,3.49vw,4.19rem)] pl-[clamp(1.5rem,5.47vw,6.56rem)] pr-[clamp(1.5rem,5.05vw,6.06rem)] pt-[clamp(2rem,4.58vw,5.5rem)] md:block md:min-h-[clamp(20rem,41.53vw,49.84rem)]"
      >
        <blockquote className="max-w-[min(952px,49.58vw)] text-[clamp(1.5rem,3.75vw,4.5rem)] font-medium leading-[1.389] text-[#3e3e3e]">
          <MaskedWords text={QUOTE} delay={0.25} stagger={0.035} />
        </blockquote>
        {/* In the design the author block overlaps the quote's last line box, so it's pinned to the corner. */}
        <motion.figcaption
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: 0.9 }}
          className="self-end md:absolute md:bottom-[clamp(2rem,3.49vw,4.19rem)] md:right-[clamp(1.5rem,5.05vw,6.06rem)] md:w-[min(364px,18.96vw)]"
        >
          <p className="text-[clamp(1.5rem,3.333vw,4rem)] font-semibold leading-[1.1] text-[#3e3e3e]">
            Ar. Siraj
          </p>
          <p className="mt-[clamp(0.25rem,0.5vw,0.6rem)] text-[clamp(0.875rem,1.667vw,2rem)] leading-[1.094] text-[#3e3e3e]">
            Founder and Chief Architect
            <br />
            of Sacred Saga
          </p>
        </motion.figcaption>
      </motion.figure>
    </section>
  );
}
