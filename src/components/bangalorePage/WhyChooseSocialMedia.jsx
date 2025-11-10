"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useRef, useLayoutEffect, useState } from "react";

export default function WhyChooseDoStudio({ heading, description, image, points, buttonText, buttonLink }) {

  const rightRef = useRef(null);
  const [rightHeight, setRightHeight] = useState("auto");

  // Dynamically match image height to right content height
  useLayoutEffect(() => {
    if (rightRef.current) {
      setRightHeight(`${rightRef.current.scrollHeight}px`);
    }

    // Update on resize
    const handleResize = () => {
      if (rightRef.current) {
        setRightHeight(`${rightRef.current.scrollHeight}px`);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className="w-full bg-white py-20 px-6 md:px-12 lg:px-20">
      {/* Section Heading */}
      <div className=" mx-auto text-center mb-20">
        <h2 className="text-5xl xl:text-7xl font-black text-black uppercase">
          {heading}
        </h2>
        <p className="text-gray-500 mt-4 md:max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col md:flex-row items-start gap-10 max-w-7xl mx-auto">
        {/* Left Image */}
        <div
          className="relative w-full md:w-1/2 rounded-2xl overflow-hidden shadow-lg transition-all duration-500"
          style={{ height: rightHeight }}
        >
          <Image
            src={image}
            alt="Why Choose Do Studio"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right Content */}
        <div ref={rightRef} className="w-full md:w-1/2 flex flex-col gap-6">
          {points?.map((point, i) => (
            <motion.div
              key={point.i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-shrink-0">
                  <span className="text-2xl md:text-3xl font-bold text-primarygreen">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2 group-hover:text-primarygreen transition">
                    {point.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {point.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Contact Button */}
          <div className="mt-8 flex justify-center md:justify-start">
            <a
              href={buttonLink}
              className="bg-primarygreen text-gray-900 font-medium px-8 py-3 rounded-full hover:bg-primarygreenhvr transition-all duration-300 shadow-md"
            >
              <span>{buttonText}</span>

            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
