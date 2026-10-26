"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { EASE_OUT } from "./motion";

// Card size and spacing follow the Figma logo cards (290×121, 30px column gap, 45px row gap at 1920px).
export default function ClientsGrid({ logos }) {
  return (
    <motion.ul
      className="mt-[clamp(2rem,5.63vw,6.75rem)] grid grid-cols-2 gap-x-[clamp(0.75rem,1.56vw,1.875rem)] gap-y-[clamp(0.75rem,2.34vw,2.8rem)] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: 0.04 }}
    >
      {logos.map((item) => (
        <motion.li
          key={item._id}
          variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <div className="flex aspect-[290/121] items-center justify-center overflow-hidden rounded-[clamp(0.6rem,0.7vw,0.85rem)] bg-white px-[8%] shadow-[0_4px_24px_rgba(0,0,0,0.08)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_10px_28px_rgba(0,0,0,0.14)]">
            {/* The Sanity logo images carry a lot of blank border (the mark averages ~32% of the image height),
                so the image box is 1.4× the card height and the card crops the empty margins.
                1.4× is the most that keeps every current logo uncut (the tallest, "T & T", clips at 1.5×). 
                */}
            <div className="relative h-[140%] w-full shrink-0">
              <Image
                src={item.image.asset.url}
                alt={item.image.alt || item.title || "Client logo"}
                fill
                sizes="(min-width: 1024px) 15vw, (min-width: 768px) 22vw, 45vw"
                className="object-contain"
              />
            </div>
          </div>
        </motion.li>
      ))}
    </motion.ul>
  );
}
