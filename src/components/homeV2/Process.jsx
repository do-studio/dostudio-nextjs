"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionPill from "./SectionPill";
import { EASE_OUT } from "./motion";
import StrategyCall from "./StrategyCall";

// Each description is split where the Figma design breaks the line (desktop only).
const STEPS = [
  {
    title: "Discover",
    desc: [
      "We start with a free strategy call to understand your business, audience, competitors and goals and figure",
      "out honestly whether we're the right fit.",
    ],
  },
  {
    title: "Research & Strategy",
    desc: [
      "We research your market and competitors in Calicut and beyond, then build a strategy with clear channels, timelines,",
      "budget and success metrics before any creative work starts.",
    ],
  },
  {
    title: "Design & Create",
    desc: [
      "Our in-house team builds the campaigns, brand assets, website or packaging whatever the strategy calls for with",
      "strategy and creative teams working together, not in silos.",
    ],
  },
  {
    title: "Launch",
    desc: [
      "Campaigns go live, websites go live, packaging goes to print. We handle the rollout so nothing slips between",
      "planning and execution.",
    ],
  },
  {
    title: "Track, Report & Optimise",
    desc: [
      "We track performance against the goals set in step 2, send clear monthly reports, and adjust the strategy",
      "based on real data not guesswork.",
    ],
  },
];

export default function Process() {
  return (
    <section className="mx-auto w-[89.5%] max-w-[1718px] pt-[clamp(4rem,8.7vw,10.44rem)]">
      <SectionPill>Our Process</SectionPill>

      <ol className="mt-[clamp(2rem,4.48vw,5.375rem)]">
        {STEPS.map((step) => (
          <motion.li
            key={step.title}
            className="group relative flex items-start justify-between gap-6 pb-[clamp(1rem,1.46vw,1.75rem)] pt-[clamp(1.25rem,2.6vw,3.125rem)] first:pt-0"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.div
              className="min-w-0 flex-1"
              variants={{ hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.7, ease: EASE_OUT }}
            >
              <h3 className="text-[clamp(1.125rem,1.875vw,2.25rem)] font-bold leading-[1.444] text-[#1c1c1e]">
                {step.title}
              </h3>
              <p className="mt-[clamp(0.25rem,0.31vw,0.375rem)] text-[clamp(0.95rem,1.667vw,2rem)] leading-[1.344] text-[#1c1c1e]">
                {step.desc[0]} <br className="hidden md:block" />
                {step.desc[1]}
              </p>
            </motion.div>
            <motion.div
              className="mt-[clamp(0.5rem,1.35vw,1.625rem)] shrink-0 md:mr-[4.07%]"
              variants={{ hidden: { opacity: 0, scale: 0, rotate: -90 }, show: { opacity: 1, scale: 1, rotate: 0 } }}
              transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.2 }}
            >
              <Image
                src="/images/home2/process-arrow.svg"
                alt=""
                width={72}
                height={70}
                className="h-auto w-[clamp(2.5rem,3.75vw,4.5rem)] transition-transform duration-300 group-hover:rotate-45"
              />
            </motion.div>
            {/* Divider draws in from the left. */}
            <motion.span
              aria-hidden="true"
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-[#8e8e8e]"
              variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
              transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.1 }}
            />
          </motion.li>
        ))}
      </ol>
      <StrategyCall name=" Start Your Project" href="/contact" />

    </section>
  );
}
