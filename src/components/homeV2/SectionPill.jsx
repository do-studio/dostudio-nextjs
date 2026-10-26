"use client";

import { motion } from "framer-motion";
import { SPRING, VIEWPORT } from "./motion";

const VARIANTS = {
  outline: "border-[1.67px] border-black bg-transparent",
  shadow: "border-[1.67px] border-[#1c1c1e] bg-[#f6f561]",
  plain: "bg-[#f6f561]",
};

const SHADOW_ON = "6.685px 6.685px 0px 0px #000";
const SHADOW_OFF = "0px 0px 0px 0px #000";

// Sizes are the 1920px Figma frame values expressed in vw (px / 19.2), capped at the design size.
export default function SectionPill({ children, variant = "plain", as = "h2" }) {
  const Tag = motion[as];
  const hasShadow = variant === "shadow";
  return (
    <Tag
      initial={{ opacity: 0, scale: 0.6, rotate: -6, boxShadow: hasShadow ? SHADOW_OFF : undefined }}
      whileInView={{ opacity: 1, scale: 1, rotate: 0, boxShadow: hasShadow ? SHADOW_ON : undefined }}
      viewport={VIEWPORT}
      transition={{ ...SPRING, boxShadow: { delay: 0.25, duration: 0.25, ease: "easeOut" } }}
      className={`inline-flex origin-left items-center rounded-full px-[clamp(1.25rem,2.34vw,2.8rem)] py-[clamp(0.25rem,0.47vw,0.5625rem)] text-[clamp(1.5rem,2.78vw,3.34rem)] font-bold leading-[1.444] text-[#1c1c1e] ${VARIANTS[variant]}`}
    >
      {children}
    </Tag>
  );
}
