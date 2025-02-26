"use client";
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import ReactPlayer from 'react-player';

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/productions?&populate=*`,
    { next: { revalidate: 60 } }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const Production = () => {
  const [workdata, setWorkdata] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playingIndex, setPlayingIndex] = useState(null); // Track which video is playing
  const [videoProgress, setVideoProgress] = useState({}); // Track the progress of videos
  const [hoveredVideos, setHoveredVideos] = useState(new Set()); // Track which videos have been hovered

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getData();
      const sorted = data.data?.sort(
        (a, b) => a.attributes.order - b.attributes.order
    );
      setWorkdata(sorted);
      setIsLoading(false);
    };
    fetchData();
  }, []);


  const handleProgress = (progress, index) => {
    setVideoProgress((prev) => ({
      ...prev,
      [index]: progress.playedSeconds, // Store the current video progress in seconds
    }));
  };

  const handleHover = (index) => {
    setPlayingIndex(index); // Start playing the video
    setHoveredVideos((prev) => new Set(prev).add(index)); // Mark the video as hovered
  };

  return (
    <main className='min-h-screen w-full bg-white pt-32 md:text-4xl text-black font-light'>
      <div className='w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5'>
        <h1 className='pb-1 font-medium'>Videos</h1>
      </div>

      <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20 grid grid-cols-2 md:grid-cols-3 gap-x-0 gap-y-0'>
        {isLoading ? (
          <Skeleton style={{ aspectRatio: "9/16" }} count={9} />
        ) : workdata && workdata.length > 0 ? (
          workdata.map((data, i) => (
            <div
              className="relative group"
              key={i}
              onMouseEnter={() => handleHover(i)} // Hover to start playing
              onMouseLeave={() => setPlayingIndex(null)} // Stop video when hover ends
            >
              <div
                className="relative w-full break-inside-avoid-column bg-black duration-150"
                style={{ aspectRatio: data.attributes.height || "9/16" }}
              >
                {hoveredVideos.has(i) || playingIndex === i ? (
                  <ReactPlayer
                    url={`${data?.attributes?.videourl}?tr=orig&ik-cors=force`}
                    playing={playingIndex === i} // Play only when hovered
                    loop={true}
                    muted={false}
                    playsinline={true}
                    controls={false}
                    width="100%"
                    height="100%"
                    className="object-fill"
                    style={{ objectFit: "fill" }}
                    onProgress={(progress) => handleProgress(progress, i)} // Track video progress
                    startTime={videoProgress[i] || 0} // Start from last position
                  />
                ) : (
                  <img
                    src={`${data?.attributes?.videothump ?? 'https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp'}`} // Thumbnail at 10 seconds
                    alt="Thumbnail"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-left text-2xl font-medium animate-bounce">
            No data found.
          </div>
        )}
      </div>
    </main>
  );
};

export default Production;