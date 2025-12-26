"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { imgarrw } from '../../../../public/images/index';
import { HiArrowSmallDown } from "react-icons/hi2";
import Link from 'next/link';

const Aboutus = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Truncated text
  const truncatedText =
    "As a Best digital marketing agency in Calicut, we are proud to deliver great results in branding and advertising. While we are known as the best advertising agency in Calicut, we also offer many digital marketing services like SEO, social media marketing, PPC ads, content marketing, and website development.";

  // Full text
  const fullText =
    "As a Best digital marketing agency in Calicut, we are proud to deliver great results in branding and advertising. While we are known as the best advertising agency in Calicut, we also offer many digital marketing services like SEO, social media marketing, PPC ads, content marketing, and website development. Our team creates strategies that fit your business needs to make sure every campaign works well. Our services aren’t just limited to Calicut, we’ve expanded our reach to other areas and even globally. This global experience helps us bring new ideas and effective strategies to help your business grow. Whether you're a local startup or a global business, we are here to help you attract more customers and succeed in the long term with our digital marketing services.";

  return (
    <main className='bg-white text-black xl:py-10 flex items-center relative overflow-hidden'>
      <div className='w-11/12 xl:w-9/12 mx-auto text-lg xl:text-4xl space-y-4 xl:font-light xl:leading-normal'>
        <h1 className='text-gray-600 md:text-justify text-2xl xl:text-5xl'>
          <span className='font-medium text-black'>Digital Marketing Agency in Calicut</span>
        </h1>
        <p className='text-gray-600 text-sm md:text-base text-justify'>
          {isExpanded ? fullText : truncatedText}
          {!isExpanded && (
            <button
              onClick={() => setIsExpanded(true)}
              className="text-gray-600 hover:text-gray-700 font-medium ml-2"
            >
              Read More
            </button>
          )}
        </p>
        <div className="md:hidden py-7 flex justify-center">


          <Link className="bg-primarygreen text-black px-8 py-4 rounded-full " href="/our-works">Our Works</Link>
        </div>

        <a className='hidden md:block' href="#serivesect">
          <div className='relative flex justify-end'>
            <motion.div
              animate={{ rotate: 360 }} // Rotate 360 degrees
              transition={{
                repeat: Infinity, // Loop the animation
                ease: "linear", // Linear easing for smooth continuous rotation
                duration: 30, // Rotation duration in seconds
              }}
              className="relative h-32 w-32 rounded-full"
            >
              <Image
                layout="fill" // This ensures the image will fill its parent container
                className="object-cover"
                src={imgarrw}
                alt="Advertising agency in Calicut"
              />
            </motion.div>
            <HiArrowSmallDown className='absolute top-[30%] right-10 text-white text-5xl' />
          </div>
        </a>
      </div>
    </main>
  );
};

export default Aboutus;