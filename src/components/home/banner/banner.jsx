import Image from "next/image";

// Utility: pick video/poster based on time + user-agent
function getVideoAndPoster(userAgent) {
  const hour = new Date().getHours();
  const isMobile = /mobile/i.test(userAgent);

  const videos = {
    desktop: {
      morning: "https://cdn.sanity.io/files/0hjyj1bs/production/dc1231794d63ee6e1b4726db3e4fffed5289073d.mp4",
      afternoon: "https://cdn.sanity.io/files/0hjyj1bs/production/da32ae8ab95dbb1386bec495a67dbfad3aa870ef.mp4",
      evening: "https://cdn.sanity.io/files/0hjyj1bs/production/e804ee795468b9968c281e2d8c74efed84d3d907.mp4",
      night: "https://cdn.sanity.io/files/0hjyj1bs/production/b91c2374f2a75daf8846dc686133157827465c95.mp4",
    },
    mobile: {
      morning: "https://cdn.sanity.io/files/0hjyj1bs/production/9f84a43ec5f8b176138ce5a103ffc556693987d1.mp4",
      afternoon: "https://cdn.sanity.io/files/0hjyj1bs/production/b944218c4430cae525e036475a7ac95cfd2e80d1.mp4",
      evening: "https://cdn.sanity.io/files/0hjyj1bs/production/453bd5b7a50e9ea7039a410a07b0a62af6c33d61.mp4",
      night: "https://cdn.sanity.io/files/0hjyj1bs/production/1527c3cbd4190d6dfe036738c88dc98e8c0a7193.mp4",
    },
  };

  const posters = {
    desktop: "https://cdn.sanity.io/images/0hjyj1bs/production/850db6d8114080e1ba31af3bde27865d5b64b17d-1920x1080.webp",
    mobile: "https://cdn.sanity.io/images/0hjyj1bs/production/514c02bf80817ecc72b756477618d10f11b04e3d-1080x1920.webp",
  };

  let period = "night";
  if (hour >= 5 && hour < 12) period = "morning";
  else if (hour >= 12 && hour < 16) period = "afternoon";
  else if (hour >= 16 && hour < 20) period = "evening";

  const device = isMobile ? "mobile" : "desktop";

  return {
    video: videos[device][period],
    poster: posters[device],
  };
}

export default function Banner({ userAgent }) {
  const { video, poster } = getVideoAndPoster(userAgent);

  return (
    <section className="grid grid-cols-1 pt-16 min-h-[calc(100vh-4rem)] z-[999999999]">
      <div className="p-3 min-h-[calc(100vh-4rem)] 2xl:h-[calc(100vh-4rem)]">
        <div className="w-full h-full bg-black z-50 overflow-hidden rounded-3xl xl:rounded-[3rem]">
          <video
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}






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
//       return mobile ? 'morning-mobile.mp4?c_limit=3000&cache=true' : 'morning-desktop.mp4?c_limit=3000&cache=true';
//     } else if (currentTime >= 12 && currentTime < 17) {
//       return mobile ? 'afternoon-mobile.mp4?c_limit=3000&cache=true' : 'afternoon-desktop.mp4?c_limit=3000&cache=true';
//     } else if (currentTime >= 17 && currentTime < 20) {
//       return mobile ? 'evening-mobile.mp4?c_limit=3000&cache=true' : 'evening-desktop.mp4?c_limit=3000&cache=true';
//     } else {
//       return mobile ? 'night-mobile.mp4?c_limit=3000&cache=true' : 'night-desktop.mp4?c_limit=3000&cache=true';
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
//           <source src={require(`../assets/${currentVideo}`)} type="video/mp4?c_limit=3000&cache=true" />
//           Your browser does not support the video tag.
//         </video>
//       )}
//     </div>
//   );
// };

// export default BannerVideo;

