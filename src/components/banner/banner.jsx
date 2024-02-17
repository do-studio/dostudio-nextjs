"use client";
// src/Banner.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  
const banners = [
  {
    bgcolor: 'bg-black',
    color: 'text-white',
    titles: [`${getGreeting()}`],
    duration: 2500, // in milliseconds
  },
  {
    bgcolor: 'bg-white',
    color: 'text-black',
    titles: ["we are", "DO STUDIO"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-black',
    color: 'text-white',
    titles: ["we do", "BRANDING"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-white',
    color: 'text-black',
    titles: ["we do", "BRANDING"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-black',
    color: 'text-white',
    titles:  ["we do", "WEBSITES"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-white',
    color: 'text-black',
    titles: ["we do", "PHOTOSHOOTS"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-black',
    color: 'text-white',
    titles:  ["we do", "VIDEO PRODUCTION"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-white',
    color: 'text-black',
    titles: ["we do", "PACKAGE DESIGNS"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-black',
    color: 'text-white',
    titles: ["we do", "PRINT DESIGNS"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-white',
    color: 'text-black',
    titles: ["we do", "SOCIAL MEDIA"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-black',
    color: 'text-white',
    titles: ["we do", "GENUINE CLIENT", "RELATIONSHIPS"],
    duration: 1200,
  },
  {
    bgcolor: 'bg-white',
    color: 'text-black',
    titles: ["we do", "COOL S**T"],
    duration: 1200,
  },
  
];

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, banners[index].duration);

    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <motion.div
      className={`w-full h-screen flex text-center items-center justify-center ${banners[index].bgcolor}`}
      transition={{ ease: 'easeOut', duration: 0.5 }}
    >
      <AnimatePresence mode='wait'>
        <motion.div
          key={index}
          className="text-4xl text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {banners[index].titles.map((title, idx) => (
            <motion.div
            className={`${banners[index].color} ${idx === 0 ? 'text-6xl' : 'text-8xl'} font-bold`}
              key={idx}
              initial={{
                opacity: 0,
                y: 20,
                transitionDelay: (idx + index * banners[index].titles.length) * 0.2,
              }}
              animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeIn", delay: 0.1 }}
            >
              {title}
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default Banner;
