"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const getGreeting = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  } else if (hour >= 12 && hour < 18) {
    return "Good Afternoon";
  } else {
    return "Good Evening";
  }
};

const Homebanner = () => {
  const bgcolors = [
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
  ];
  const colors = [
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
    "#000",
    "#fff",
  ];
  const timsec = [
    "2000",
    "500",
    "500",
    "500",
    "500",
    "500",
    "500",
    "500",
    "500",
    "500",
    "1000",
    "500",
  ];
  const titles = [
    [`${getGreeting()}`],
    ["we are", "DO STUDIO"],
    ["we do", "BRANDING"],
    ["we do", "DIGITAL MARKETING"],
    ["we do", "WEBSITES"],
    ["we do", "PHOTOSHOOTS"],
    ["we do", "VIDEO PRODUCTION"],
    ["we do", "PACKAGE DESIGNS"],
    ["we do", "PRINT DESIGNS"],
    ["we do", "SOCIAL MEDIA"],
    ["we do", "GENUINE CLIENT", "RELATIONSHIPS"],
    ["we do", "COOL S**T"],
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % colors.length);
    }, timsec[index]);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className=" text-center h-screen flex flex-col justify-center align-middle w-full transition-all ease-in-out"
      style={{ backgroundColor: bgcolors[index] }}
    >
      <AnimatePresence mode="wait">
        <motion.h1
          key={titles[index][0]}
          className="text-4xl lg:text-7xl font-bold"
          style={{ color: colors[index] }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { delay: 0.1 } }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.1 }}
        >
          {titles[index][0]}
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.h1
          key={titles[index][1]}
          className="text-4xl lg:text-7xl font-extrabold"
          style={{ color: colors[index] }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { delay: 0.1 } }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.2 }}
        >
          {titles[index][1]}
        </motion.h1>
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <motion.h1
          key={titles[index][2]}
          className="text-4xl lg:text-7xl font-extrabold"
          style={{ color: colors[index] }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20, transition: { delay: 0.1 } }}
          transition={{ duration: 0.5, ease: "easeIn", delay: 0.3 }}
        >
          {titles[index][2]}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export default Homebanner;
