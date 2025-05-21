"use client";
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player';

const productionVideos = [
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745220577/d_arc_kpi5l4.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745220294/d-arc_lm05qs.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745220574/Crescent_xfxkzj.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745220294/crescent_kgz0rf.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743839096/WhatsApp_Video_2025-04-05_at_12.38.10_41d364fc_mnzgdl.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_125340_mhsvra.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838572/VID-20250405-WA0007_ixht97.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_124537_ifowx8.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838570/VID-20250405-WA0002_rwwhlx.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_125146_cbntbi.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838562/VID-20250405-WA0006_wdv8zl.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_124832_qmtkww.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838560/VID-20250405-WA0004_ctuvqs.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_124941_qip5yn.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1743838559/VID-20250405-WA0003_ocfo80.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1743838692/Screenshot_2025-04-05_125040_ncs0er.webp",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1741170371/kurikkal_auliww.webm",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1744270039/WhatsApp_Image_2025-04-10_at_12.46.12_f4dcb4f1_d2ymuy.jpg",
    height: "9/16"
  },
  // {
  //   id: 1,
  //   videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1741170194/plum_bts_T_Draft_sgk0h6.webm",
  //   videothump: "",
  //   height: "9/16"
  // },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1741170119/hungryll_zinger_wrap_01_nppdr0.webm",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1744270038/WhatsApp_Image_2025-04-10_at_12.46.12_ca91dba0_v5zupz.jpg",
    height: "9/16"
  },
  // {
  //   id: 1,
  //   videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1741169951/hungryll_01_D1_mwsnxg.webm",
  //   videothump: "",
  //   height: "9/16"
  // },
  // {
  //   id: 1,
  //   videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1741169807/Plumstories_Founders_Trial_Draft_v5h4jv.webm",
  //   videothump: "",
  //   height: "9/16"
  // },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740639610/kurikkal2_opke3b.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740639613/Screenshot_2025-02-27_122951_cnmprk.png",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740488841/tyndis_out_01_v2_1_uqzfmw.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740488847/Screenshot_2025-02-25_183323_dtrkr8.png",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740487626/aeropress_i1utgw.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740487809/Screenshot_2025-02-25_181657_smga7h.png",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740487313/CRESCENT_SABYASACHI_WALLPAPER_tgnje9.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740487540/Screenshot_2025-02-25_181320_bfszwr.png",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740487197/Peekay_compressed_a6hhcp.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740488353/Screenshot_2025-02-25_181037_holay4.png",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740482832/matchastrawberry_01_l1k3up.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740483038/Screenshot_2025-02-25_170017_m1ma2m.png",
    height: "9/16"
  },
  {
    id: 1,
    videourl: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740482090/onecity_apartment_4_compressed_wlalub.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740482911/Screenshot_2025-02-25_165646_byiq1m.png",
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

      <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20 columns-3 gap-x-0 gap-y-0'>
        {productionVideos.length > 0 ? (
          productionVideos.map((data, i) => (
            <div
              className="relative group break-inside-avoid-column"
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