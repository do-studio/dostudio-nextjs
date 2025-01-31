"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { banners } from '../../constant/data';
import ReactPlayer from 'react-player';
import Image from 'next/image';


const Banner = () => {

  const [currentVideo, setCurrentVideo] = useState('');
  const [currentPoster, setCurrentPoster] = useState('');
  const videoRef = useRef(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  useEffect(() => {
    const getCurrentVideo = () => {
      const currentTime = new Date().getHours();
      const isMobile = window.innerWidth <= 468;
      // const isMobile = true;

      // URLs for desktop and mobile videos
      const videos = {
        desktop: {
          morning: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786915/Do%20Studio%20Website/new%20web%20banner/DOSTUDIO_WEBSITE_PROMO_GM_kz2lsn.mp4',
          afternoon: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786916/Do%20Studio%20Website/new%20web%20banner/DO__STUDIO_WEBSITE_PROMO_GA_iwkb18.mp4',
          evening: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786916/Do%20Studio%20Website/new%20web%20banner/DOSTUDIO_WEBSITE_PROMO_GE_crccqv.mp4',
          night: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786915/Do%20Studio%20Website/new%20web%20banner/DOSTUDIO_WEBSITE_PROMO_NS_rbkkbk.mp4',
        },
        mobile: {
          morning: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786857/Do%20Studio%20Website/new%20web%20banner/Do_Studio_M2_VERTICAL_GM_c6xzx7.mp4',
          afternoon: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786846/Do%20Studio%20Website/new%20web%20banner/Do_Studio_M2_VERTICAL_GA_dms43c.mp4',
          evening: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786846/Do%20Studio%20Website/new%20web%20banner/Do_Studio_M2_VERTICAL_GE_pkr7s6.mp4',
          night: 'https://res.cloudinary.com/djswkzoth/video/upload/v1723786857/Do%20Studio%20Website/new%20web%20banner/Do_Studio_M2_VERTICAL_NS_aaviyn.mp4',
        },
      };

      const posters = {
        desktop: 'https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/desk_poster_yklfya_a7kqzc.webp',
        mobile: 'https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp',
      };

      let videoPath = '';
      let posterPath = '';

      if (currentTime >= 5 && currentTime < 12) {
        videoPath = isMobile ? videos.mobile.morning : videos.desktop.morning;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      } else if (currentTime >= 12 && currentTime < 16) {
        videoPath = isMobile ? videos.mobile.afternoon : videos.desktop.afternoon;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      } else if (currentTime >= 16 && currentTime < 20) {
        videoPath = isMobile ? videos.mobile.evening : videos.desktop.evening;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      } else {
        videoPath = isMobile ? videos.mobile.night : videos.desktop.night;
        posterPath = isMobile ? posters.mobile : posters.desktop;
      }

      handlePlay()
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
      <section className='grid grid-cols-1 pt-16 min-h-[calc(100vh-4rem)] '   >
        {currentVideo ? (
          <div className='p-3 min-h-[calc(100vh-4rem)] 2xl:h-[calc(100vh-4rem)]'>
            <div className=' w-full h-full   bg-black z-50 overflow-hidden   rounded-3xl xl:rounded-[3rem]'>
              <ReactPlayer
                url={currentVideo}
                playing={true} // Autoplay
                loop={true}
                muted={true}
                playsinline={true}

                controls={false}
                width="100%"
                height="100%"
                className="object-fill"
                style={{ objectFit: "fill" }}
                config={{
                  file: {
                    attributes: {
                      poster: currentPoster,
                    },
                  },
                }}
              />
            </div>
          </div>
        )
          :
          <div className='relative aspect-video'>
            <Image src={currentPoster} height="100vh" width="100%" />
          </div>
        }
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

