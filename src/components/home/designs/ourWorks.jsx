"use client";
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const InfiniteScroll = () => {
  const scrollContainerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const scrollWidth = scrollContainer.scrollWidth / 2;

    // Start auto-scrolling
    controls.start({
      x: [0, -scrollWidth],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 30, // Adjust the duration to control the speed
        },
      },
    });

    return () => controls.stop();
  }, [controls]);

  return (
    <div className="overflow-hidden whitespace-nowrap" ref={scrollContainerRef}>
      <motion.div className="flex gap-[500px]" animate={controls}>
        <div className="p-4 bg-red-500">
          <h1 className="text-xl font-bold">Title 1</h1>
          <h2 className="text-lg text-gray-500">Subtitle 1</h2>
        </div>
        <div className="p-4 bg-blue-500">
          <h1 className="text-xl font-bold">Title 2</h1>
          <h2 className="text-lg text-gray-500">Subtitle 2</h2>
        </div>
        <div className="p-4 bg-red-500">
          <h1 className="text-xl font-bold">Title 3</h1>
          <h2 className="text-lg text-gray-500">Subtitle 3</h2>
        </div>
        <div className="p-4 bg-blue-500">
          <h1 className="text-xl font-bold">Title 4</h1>
          <h2 className="text-lg text-gray-500">Subtitle 4</h2>
        </div>
        <div className="p-4 bg-red-500">
          <h1 className="text-xl font-bold">Title 5</h1>
          <h2 className="text-lg text-gray-500">Subtitle 5</h2>
        </div>
        <div className="p-4 bg-blue-500">
          <h1 className="text-xl font-bold">Title 6</h1>
          <h2 className="text-lg text-gray-500">Subtitle 6</h2>
        </div>

        {/* Duplicate the content to ensure seamless scrolling */}
        <div className="p-4 bg-red-500">
          <h1 className="text-xl font-bold">Title 1</h1>
          <h2 className="text-lg text-gray-500">Subtitle 1</h2>
        </div>
        <div className="p-4 bg-blue-500">
          <h1 className="text-xl font-bold">Title 2</h1>
          <h2 className="text-lg text-gray-500">Subtitle 2</h2>
        </div>
        <div className="p-4 bg-red-500">
          <h1 className="text-xl font-bold">Title 3</h1>
          <h2 className="text-lg text-gray-500">Subtitle 3</h2>
        </div>
        <div className="p-4 bg-blue-500">
          <h1 className="text-xl font-bold">Title 4</h1>
          <h2 className="text-lg text-gray-500">Subtitle 4</h2>
        </div>
        <div className="p-4 bg-red-500">
          <h1 className="text-xl font-bold">Title 5</h1>
          <h2 className="text-lg text-gray-500">Subtitle 5</h2>
        </div>
        <div className="p-4 bg-blue-500">
          <h1 className="text-xl font-bold">Title 6</h1>
          <h2 className="text-lg text-gray-500">Subtitle 6</h2>
        </div>
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
