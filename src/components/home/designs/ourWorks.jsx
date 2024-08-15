"use client";
import React, { useRef, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { wrk1, wrk2, wrk3, wrk4, wrk5 ,WRK1,WRK2} from "../../../../public/images";
import Image from "next/image";
import Marquee from "react-fast-marquee";

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
    <>
    <div className="overflow-hidden relative py-10 xl:py-20" ref={scrollContainerRef}>
      <Marquee className="flex bg-white -mt-72 pb-20 z-10">
            <div className="mx-20 relative h-[300px] rounded-2xl shadow-2xl overflow-hidden px-28 mt-[600px]">
                  <Image className="object-cover" placeholder="blur" fill src={wrk1}/>
            </div>
            <div className="mx-20 relative h-[300px] rounded-2xl shadow-2xl overflow-hidden px-28 ">
                  <Image className="object-cover" placeholder="blur" fill src={wrk2}/>
            </div>
            <div className="mx-20 relative h-[300px] rounded-2xl shadow-2xl overflow-hidden px-28 mt-[600px]">
                  <Image className="object-cover" placeholder="blur" fill src={wrk3}/>
            </div>
            <div className="mx-20 relative h-[300px] rounded-2xl shadow-2xl overflow-hidden px-28 ">
                  <Image className="object-cover" placeholder="blur" fill src={wrk4}/>
            </div>
        </Marquee>
        {/*  */}
        <h1 className="absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] text-7xl xl:text-[150px] text-[#2d2d2d]  w-full text-center font-black z-20 uppercase">works</h1>
    </div>
    
    </>
  );
};

export default InfiniteScroll;
