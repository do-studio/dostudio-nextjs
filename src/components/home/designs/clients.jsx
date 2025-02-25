"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ClientsData } from "../../constant/data";
import Image from "next/image";

const Clients = () => {
  const [displayedImages, setDisplayedImages] = useState(5);

  const loadMoreImages = () => {
    setDisplayedImages((prevCount) => prevCount + ClientsData.length);
  };
  const loadLessImages = () => {
    setDisplayedImages(5);
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  };

  return (
    <div className="bg-white py-10 xl:py-20">
      <h3 className="text-4xl md:text-7xl xl:text-8xl uppercase font-extrabold text-black text-center">
        Our clients
      </h3>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={imageVariants}
          transition={{ duration: 0.3 }}
          className="grid place-items-center grid-cols-4 md:grid-cols-5 gap-3"
        >
          {ClientsData.slice(0, displayedImages).map((image, index) => (
            <motion.div
              key={index}
              className="w-fit h-auto"
              variants={imageVariants}
            >
              <Image
                className="h-16 w-16 md:h-32 md:w-32 xl:h-48 xl:w-48 object-contain grayscale hover:grayscale-0 duration-200 cursor-pointer"
                placeholder="blur"
                src={image.clt}
                alt={`Client image ${index + 1}`} // Added unique alt for each image
                width={1080}  // Set width for responsive images
                height={1080} // Set height for responsive images
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw" // Responsive sizing
                loading="lazy"  // Lazy loading
                decoding="async"  // Async decoding for faster rendering
              />
            </motion.div>
          ))}

        </motion.div>
        {displayedImages < ClientsData.length ? (
          <div className="w-full h-full flex justify-center mt-5">
            <button onClick={loadMoreImages} className="btn-21 "><span>Load More</span></button>
          </div>
        ) :
          (

            null
          )
        }
      </div>
    </div>
  );
};

export default Clients;
