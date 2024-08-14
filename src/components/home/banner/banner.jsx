"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {banners} from '../../constant/data';

const bandesk = 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4'
const banmob = 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4'

const Banner = () => {

  const [currentVideo, setCurrentVideo] = useState('');

  const isMobile = () => window.innerWidth <= 768;

  const getVideoForTime = () => {
    const currentTime = new Date().getHours();
    const mobile = isMobile();

    if (currentTime >= 5 && currentTime < 12) {
      return mobile ? banmob : bandesk;
    } else if (currentTime >= 12 && currentTime < 17) {
      return mobile ? banmob : bandesk;
    } else if (currentTime >= 17 && currentTime < 20) {
      return mobile ? banmob : bandesk;
    } else {
      return mobile ? banmob : bandesk;
    }
  };

  useEffect(() => {
    const updateVideo = () => setCurrentVideo(getVideoForTime());
    updateVideo();

    // Update the video if the window is resized (especially for orientation changes on mobile)
    window.addEventListener('resize', updateVideo);

    return () => window.removeEventListener('resize', updateVideo);
  }, []);

  return (
    <>
    <section className=''>
        <video className="hidden md:block  w-full h-full" autoPlay muted loop>
                <source  src={bandesk}  type="video/mp4" />
        </video>
        <video className="block md:hidden w-full h-full" autoPlay muted loop>
                <source  src={banmob}  type="video/mp4" />
        </video>
    </section>
    </>
  );
};

export default Banner;
// https://chatgpt.com/share/fed672df-6ebb-419b-ad94-883ba67bb2ff

// make a banner video in react with 4 videos based on time Good morning,good afternoon,good afternoon and goodnight  use diffrent video for mobile device so total 8 videos


// import React, { useEffect, useState } from 'react';

// const BannerVideo = () => {
//   const [currentVideo, setCurrentVideo] = useState('');

//   const isMobile = () => window.innerWidth <= 768;

//   const getVideoForTime = () => {
//     const currentTime = new Date().getHours();
//     const mobile = isMobile();

//     if (currentTime >= 5 && currentTime < 12) {
//       return mobile ? 'morning-mobile.mp4' : 'morning-desktop.mp4';
//     } else if (currentTime >= 12 && currentTime < 17) {
//       return mobile ? 'afternoon-mobile.mp4' : 'afternoon-desktop.mp4';
//     } else if (currentTime >= 17 && currentTime < 20) {
//       return mobile ? 'evening-mobile.mp4' : 'evening-desktop.mp4';
//     } else {
//       return mobile ? 'night-mobile.mp4' : 'night-desktop.mp4';
//     }
//   };

//   useEffect(() => {
//     const updateVideo = () => setCurrentVideo(getVideoForTime());
//     updateVideo();

//     // Update the video if the window is resized (especially for orientation changes on mobile)
//     window.addEventListener('resize', updateVideo);

//     return () => window.removeEventListener('resize', updateVideo);
//   }, []);

//   return (
//     <div className="h-screen w-full">
//       {currentVideo && (
//         <video className="w-full h-full object-cover" autoPlay loop muted>
//           <source src={require(`../assets/${currentVideo}`)} type="video/mp4" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//     </div>
//   );
// };

// export default BannerVideo;

