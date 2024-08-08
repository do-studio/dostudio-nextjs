"use client"
import React, { useRef, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const InfiniteScroll = () => {
  const scrollContainerRef = useRef(null);
  const [items, setItems] = useState(Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`));
  const controls = useAnimation();

  const duplicateItems = () => {
    setItems((prevItems) => [...prevItems, ...prevItems]);
  };

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;

    // Start auto-scrolling
    controls.start({
      x: [0, -scrollContainer.scrollWidth / 2],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          ease: "linear",
          duration: 20,
        },
      },
    });

    // Duplicate items to ensure infinite scrolling
    duplicateItems();

    return () => controls.stop();
  }, [controls]);

  return (
    <div className="overflow-hidden whitespace-nowrap" ref={scrollContainerRef}>
      <motion.div className="flex" animate={controls}>
        {items.map((item, index) => (
          <div
            key={index}
            className="flex-none w-48 h-48 m-4 bg-blue-500 text-white flex items-center justify-center"
          >
            {item}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteScroll;
