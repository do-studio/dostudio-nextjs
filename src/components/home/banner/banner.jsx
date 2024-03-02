"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {banners} from '../../constant/data'

const Banner = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, banners[index].duration);
    return () => clearInterval(intervalId);
  }, [index]);

  return (
    <>
    <motion.div
      className={`w-full h-screen flex text-center items-center transition-all duration-100 justify-center ${banners[index].bgcolor}`}
      transition={{ ease: 'easeInOut', duration: 0.3 }}
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
            className={`${banners[index].color} ${idx === 0 ? 'text-3xl sm:text-3xl lg:text-6xl' : 'text-3xl sm:text-4xl lg:text-8xl'} font-bold`}
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

    </>
  );
};

export default Banner;
