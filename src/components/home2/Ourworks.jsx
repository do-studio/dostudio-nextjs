"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Branding,
  Creative,
  WebDesign,
  PackageDesign,
  PrintDEsign,
  Production,
} from "../home2/components";
import Image from "next/image";
import { arrow2 } from "../../../public/images/elements";

const tabs = [
  { key: "Branding", content: <Branding /> },
  { key: "Creative", content: <Creative /> },
  { key: "Web Design", content: <WebDesign /> },
  { key: "Package Design", content: <PackageDesign /> },
  { key: "Print Design", content: <PrintDEsign /> },
  { key: "Production", content: <Production /> },
];

const buttonVariants = {
  initial: { scale: 1, opacity: 0.8 },
  hover: { scale: 1, opacity: 1 },
  tap: { scale: 1 },
  active: { scale: 1, opacity: 1, fontWeight: "bold" },
};

const contentVariants = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, x: -20, transition: { duration: 0.3 } },
};

const Ourworks = () => {
   const [activeTab, setActiveTab] = useState("Branding");

  useEffect(() => {
    const tabKeys = tabs.map((tab) => tab.key);
    let currentIndex = tabKeys.indexOf(activeTab);

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % tabKeys.length;
      setActiveTab(tabKeys[currentIndex]);
    }, 5000); // switch tab every 5 seconds

    // clear interval on unmount
    return () => clearInterval(interval);
  }, [activeTab]);

  return (
    <section>
      <div className="px-5 xl:pl-32 py-10 xl:py-20 relative h-full overflow-hidden">
        {/*  */}
        <div className="opacity-50 absolute -left-[40%] top-40  w-full h-full object-contain">
        <video
          className="scale-125 md:scale-100 w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
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
        {/*  */}

        <h4 className="text-lg uppercase pb-10">FEATURED WORK</h4>
        <div className="grid grid-cols-1 md:grid-cols-4">
          <div className="bg-transparent  h-auto flex flex-row flex-wrap divide-x-2 md:divide-x-0 xl:flex-col gap-3">
            {tabs.map((tab) => (
              <motion.button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                animate={activeTab === tab.key ? "active" : "initial"}
                className={`text-black text-left uppercase rounded px-2 md:px-0 pb-2 cursor-pointer select-none`}
              >
                {tab.key}
              </motion.button>
            ))}
          </div>
          <div className="bg-transparent min-h-[86vh] overflow-hidden md:col-span-3 text-black">
            <AnimatePresence mode="wait">
              {tabs
                .filter((tab) => tab.key === activeTab)
                .map((tab) => (
                  <motion.div
                    key={tab.key}
                    variants={contentVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className=""
                  >
                    {tab.content}
                  </motion.div>
                ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Ourworks;
