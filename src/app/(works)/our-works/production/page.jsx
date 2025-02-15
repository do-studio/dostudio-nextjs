"use client"
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
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

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await getData();
      setWorkdata(data.data);
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const sortedData = workdata?.sort((a, b) => a.attributes.order - b.attributes.order);

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
              onMouseEnter={() => setPlayingIndex(i)}
              onMouseLeave={() => setPlayingIndex(null)}
            >
              <div
                className="relative w-full break-inside-avoid-column"
                style={{ aspectRatio: data.attributes.height || "9/16" }}
              >
                <ReactPlayer
                  url={`${data?.attributes?.videourl}`}

                  // url={`https://ik.imagekit.io/ekomrfja9e/Snapinst.app_video_.mp4?tr=orig`}
                  playing={playingIndex === i} // Play only when hovered
                  loop={true}
                  muted={false}
                  playsinline={true}
                  controls={false}
                  width="100%"
                  height="100%"
                  className="object-fill"
                  style={{ objectFit: "fill" }}
                />
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
