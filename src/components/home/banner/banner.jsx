"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {banners} from '../../constant/data';

const bandesk = 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4'
const banmob = 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4'

const Banner = () => {

  const [currentVideo, setCurrentVideo] = useState('');
  const [currentPoster, setCurrentPoster] = useState('');

  useEffect(() => {
    const getCurrentVideo = () => {
      const currentTime = new Date().getHours();
      const isMobile = window.innerWidth <= 468;

      // URLs for desktop and mobile videos
      const videos = {
        desktop: {
          morning: 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4',
          afternoon: 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4',
          evening: 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4',
          night: 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4',
        },
        mobile: {
          morning: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4',
          afternoon: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4',
          evening: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4',
          night: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4',
        },
      };

      const posters = {
        desktop: 'https://via.placeholder.com/1920x1080?text=Desktop+Poster',
        mobile: 'https://via.placeholder.com/768x1024?text=Mobile+Poster',
      };

      let videoPath = '';
      let posterPath = '';

      if (currentTime >= 5 && currentTime < 12) {
        videoPath = isMobile ? videos.mobile.morning : videos.desktop.morning;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      } else if (currentTime >= 12 && currentTime < 17) {
        videoPath = isMobile ? videos.mobile.afternoon : videos.desktop.afternoon;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      } else if (currentTime >= 17 && currentTime < 20) {
        videoPath = isMobile ? videos.mobile.evening : videos.desktop.evening;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      } else {
        videoPath = isMobile ? videos.mobile.night : videos.desktop.night;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      }

      return { videoPath, posterPath };
    };

    const { videoPath, posterPath } = getCurrentVideo();
    setCurrentVideo(videoPath);
    setCurrentPoster(posterPath);

    // Update video and poster if window is resized
    const handleResize = () => {
      const { videoPath, posterPath } = getCurrentVideo();
      setCurrentVideo(videoPath);
      setCurrentPoster(posterPath);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
    <section className=''>
    {currentVideo && (
        <video className="w-full h-full h-full bg-black object-cover" poster='https://via.placeholder.com/1920x1080?text=Desktop+Poster' autoPlay loop muted>
          <source src={currentVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
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

