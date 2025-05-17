import Image from 'next/image'
import React, { useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import ReactPlayer from 'react-player';

const motionVideos = [
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745217528/Lulu_-_kuttippada_-_compressed_mte3qc.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745217712/lulu_-_kuttipada_xsv2dd.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745217527/Stckr_xtnftp.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745217711/stackr_-_eid_mxay93.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1739852981/PK_JAN_MP1_cdncu1.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740982785/Screenshot_2025-03-03_114848_qf4jxx.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740639122/imamom_v1jnai.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740639238/Screenshot_2025-02-27_122226_qga3iw.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1740480985/STAKR_FEB_M2_qzex2s.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740481007/Screenshot_2025-02-25_162448_fzypwi.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1739854124/PK_JAN_MP2_cmpinc.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1739853579/Screenshot_2025-02-18_100909_tqb8rz.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1739853404/C.Builders_JUNE_MP1_v2_nfwjuq.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1739853580/Screenshot_2025-02-18_100838_zfotpy.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1739853404/NCARE_JUNE_MP2_szx92n.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1739853974/Screenshot_2025-02-18_101543_eyateh.png",
    height: "9/16"
  },
  {
    id: 1,
    url: "https://res.cloudinary.com/ddv3f8yl2/video/upload/v1739853403/PK_DEC_MP2_hsiwij.mp4",
    videothump: "https://res.cloudinary.com/ddv3f8yl2/image/upload/v1739853579/Screenshot_2025-02-18_100811_xo4bdn.png",
    height: "9/16"
  },



];

const Motions = () => {
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
    <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20 columns-3 gap-x-0 gap-y-0'>
      {motionVideos.length > 0 ? (
        motionVideos.map((data, i) => (
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
                  url={`${data.url}?tr=orig&ik-cors=force`}
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
  )
}

export default Motions;