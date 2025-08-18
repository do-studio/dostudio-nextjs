'use client'
import React, { useState, useEffect } from "react";
import { arrow } from "../../../public/images/elements/index";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const headings = [
  "Website Development",
  "UI/UX Design",
  "SEO Optimization",
  "Content Strategy",
  "Brand Identity"
];

const Banner = () => {
  const [currentHeading, setCurrentHeading] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeading((prev) => (prev + 1) % headings.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  // Variants with fade up, fade down, and fade up pattern
  // enter: fades in at y=0 from y=-20 (fade up) or y=20 (fade down)
  // exit: fades out moving opposite direction
  const headingVariants = {
    fadeUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      exit: { opacity: 0, y: -20, transition: { duration: 0.5, ease: "easeIn" } },
    },
    fadeDown: {
      initial: { opacity: 0, y: -20 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
      exit: { opacity: 0, y: 20, transition: { duration: 0.5, ease: "easeIn" } },
    },
  };

  // Determine which variant to use for each heading index to create the cycle fadeUp, fadeDown, fadeUp...
  const variantCycle = ["fadeUp", "fadeDown", "fadeUp"];

  // Calculate the variant key for current heading index
  const currentVariant = variantCycle[currentHeading % variantCycle.length];

  return (
    <div className="bg-mainclr2 min-h-screen grid place-items-center text-white w-full relative overflow-hidden">
      <div className="opacity-80 absolute left-0 top-0 w-full h-full object-contain">
        <video className="scale-125 md:scale-100 w-full h-full" autoPlay loop muted playsInline>
          <source
            src="https://cdn.sanity.io/files/0hjyj1bs/production/c46de572f19d14352ffab2b8a6921493eefe003f.webm"
            type="video/mp4"
          />
          <source
            src="https://cdn.sanity.io/files/0hjyj1bs/production/6c063fce7879c1bfa8d01dcb4d8505125aead1e3.mov"
            type="video/mp4"
          />
        </video>
      </div>

      <div className="space-y-5 uppercase relative z-10 w-[90%] xl:w-[60%]">
        <div className="flex flex-col gap-0 items-start">
          <p className="text-sm xl:text-xl font-extralight">WE ARE</p>
          <h1 className="text-5xl xl:text-7xl font-semibold">Digital</h1>
          <h1 className="text-5xl xl:text-7xl font-semibold">Marketing Agency</h1>
        </div>

        <div className="flex flex-col gap-0 md:items-end">
          <p className="text-sm xl:text-xl font-extralight">WE DO</p>
          <div className="perspective-600 flex items-end" style={{ transformOrigin: "center bottom" }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={currentHeading}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={headingVariants[currentVariant]}
              >
                <h1 className="text-5xl xl:text-7xl font-semibold">
                  {headings[currentHeading]}
                </h1>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center items-center pt-5">
          <Link
            className="group bg-primarygreen text-black px-5 capitalize py-3 rounded-full flex gap-2 items-center w-fit"
            href="/"
          >
            <p className="text-sm">get in touch</p>
            <div className="relative w-6 h-6">
              <Image
                className="scale-95 group-hover:scale-125 duration-200 object-contain"
                fill
                src={arrow}
                alt=""
              />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
