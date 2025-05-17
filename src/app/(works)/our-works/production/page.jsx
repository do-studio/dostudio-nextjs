"use client";
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player';

const productionVideos = [
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745220582/Gava_01_amnzgo.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745220293/gava_01_d6xjyv.webp",
    height: "9/16"
  },
  {
    id: 2,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745220577/d_arc_kpi5l4.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745220294/d-arc_lm05qs.webp",
    height: "9/16"
  },
  {
    id: 3,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745220574/Crescent_xfxkzj.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745220294/crescent_kgz0rf.webp",
    height: "9/16"
  },
  {
    id: 4,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743839096/WhatsApp_Video_2025-04-05_at_12.38.10_41d364fc_mnzgdl.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_125340_mhsvra.webp",
    height: "9/16"
  },
  {
    id: 5,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838572/VID-20250405-WA0007_ixht97.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_124537_ifowx8.webp",
    height: "9/16"
  },
  {
    id: 6,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838570/VID-20250405-WA0002_rwwhlx.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_125146_cbntbi.webp",
    height: "9/16"
  },


];

const Production = () => {
  const [playingIndex, setPlayingIndex] = useState(null);
  const [videoProgress, setVideoProgress] = useState({});
  const [hoveredVideos, setHoveredVideos] = useState(new Set());

  const handleProgress = (progress, index) => {
    setVideoProgress((prev) => ({
      ...prev,
      [index]: progress.playedSeconds,
    }));
  };

  const handleHover = (index) => {
    setPlayingIndex(index);
    setHoveredVideos((prev) => new Set(prev).add(index));
  };

  return (
    <main className='min-h-screen w-full bg-white pt-32 md:text-4xl text-black font-light'>
      <div className='w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5'>
        <h1 className='pb-1 font-medium'>Videos</h1>
      </div>

      <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20 grid grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-0'>
        {productionVideos.length > 0 ? (
          productionVideos.map((data, i) => (
            <div
              className="relative group"
              key={data.id}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={() => setPlayingIndex(null)}
            >
              <div
                className="relative w-full break-inside-avoid-column bg-black duration-150"
                style={{ aspectRatio: data.height || "9/16" }}
              >
                {hoveredVideos.has(i) || playingIndex === i ? (
                  <ReactPlayer
                    url={`${data.videourl}?tr=orig&ik-cors=force`}
                    playing={playingIndex === i}
                    loop={true}
                    muted={false}
                    playsinline={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    className="object-fill"
                    style={{ objectFit: "fill" }}
                    onProgress={(progress) => handleProgress(progress, i)}
                    startTime={videoProgress[i] || 0}
                  />
                ) : (
                  <img
                    src={data.videothump || 'https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp'}
                    alt="Video thumbnail"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-left text-2xl font-medium animate-bounce">
            No videos found.
          </div>
        )}
      </div>
    </main>
  );
};

export default Production;