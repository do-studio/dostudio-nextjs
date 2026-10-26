"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SPRING } from "./motion";

// Client component so the (server-rendered) intro section can use an animated button.
export default function StrategyCall({
  name = "Get a Free Strategy Call",
  link = "#contact",
  href,
  className = "",
  ...props
}) {
  const targetLink = href || link;

  return (
    <motion.a
      href={targetLink}
      initial={{ opacity: 0, scale: 0.6, x: -20 }}
      whileInView={{ opacity: 1, scale: 1, x: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={SPRING}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.95 }}
      className={`group mt-[clamp(1.25rem,2vw,2.4rem)] flex w-fit origin-left items-center gap-1 ${className}`.trim()}
      {...props}
    >
      <span className="flex h-[clamp(2.75rem,3.75vw,4.5rem)] items-center rounded-full bg-[#1c1c1e] px-[clamp(1.25rem,2.24vw,2.69rem)] text-[clamp(1rem,1.906vw,2.29rem)] font-medium text-white">
        {name}
      </span>
      <Image
        src="/images/home2/process-arrow.svg"
        alt=""
        width={72}
        height={70}
        className="h-auto w-[clamp(2.75rem,3.75vw,4.5rem)] transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45"
      />
    </motion.a>
  );
}
