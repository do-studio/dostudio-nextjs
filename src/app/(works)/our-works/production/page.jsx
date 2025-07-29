"use client";
import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import { client } from "../../../../../utils/sanity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Production = () => {
  const [productionVideos, setProductionVideos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [clickedIndex, setClickedIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const playerRefs = useRef([]);

  // Check if device is mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  // Fetch production videos from Sanity
  const getStaticProps = async () => {
    const query = `*[_type == "production"] | order(orderRank) {
      _id,
      title,
      thumbnail {
        asset->{ url }
      },
      altText,
      ratio,
      video {
        asset->{ url }
      }
    }`;
    const videos = await client.fetch(query);
    return { props: { videos }, revalidate: 60 };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { props } = await getStaticProps();
        setProductionVideos(props.videos);
      } catch (error) {
        console.error("Error fetching production videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // Set document title and meta description
  useEffect(() => {
    document.title = "Production Videos | Do Studio";
    const descriptionContent =
      "Do Studio is a leading creative agency in Calicut offering creative services, branding, web design, graphic design, and more: View our portfolio.";
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", descriptionContent);
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", descriptionContent);
      document.head.appendChild(newMetaDescription);
    }
  }, []);

  // Handle video click on mobile
  const handleVideoClick = (index) => {
    if (clickedIndex === index) {
      // Clicked on the same video - pause it
      if (playerRefs.current[index]) {
        playerRefs.current[index].getInternalPlayer().pause();
      }
      setClickedIndex(null);
    } else {
      // Clicked on a different video
      if (clickedIndex !== null && playerRefs.current[clickedIndex]) {
        playerRefs.current[clickedIndex].getInternalPlayer().pause();
      }
      setClickedIndex(index);
    }
  };

  return (
    <main className="min-h-screen w-full bg-white pt-32 md:text-4xl text-black font-light">
      <div className="w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5">
        <h1 className="pb-1 font-medium">Videos</h1>
      </div>

      <div className="w-11/12 xl:w-9/12 mx-auto pt-4 py-20 grid grid-cols-3 gap-0">
        {isLoading ? (
          Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[9/16] w-full" />
          ))
        ) : productionVideos.length > 0 ? (
          productionVideos.map((data, i) => {
            const isWide = data.ratio?.replace(/\s/g, "") === "16/9";
            const isPlaying = isMobile ? clickedIndex === i : hoveredIndex === i;

            return (
              <div
                key={data._id || i}
                className={`relative group ${isWide ? "col-span-3" : ""}`}
                onMouseEnter={!isMobile ? () => setHoveredIndex(i) : undefined}
                onMouseLeave={!isMobile ? () => setHoveredIndex(null) : undefined}
                onClick={isMobile ? () => handleVideoClick(i) : undefined}
              >
                <div
                  className="relative w-full bg-black duration-150"
                  style={{ aspectRatio: data.ratio || "9/16" }}
                >
                  <ReactPlayer
                    ref={(el) => (playerRefs.current[i] = el)}
                    url={data.video.asset.url}
                    playing={isPlaying}
                    loop={true}
                    muted={isMobile ? false : !isPlaying} // <--- Updated here
                    controls={false}
                    playsinline={true}
                    width="100%"
                    height="100%"
                    className="object-fill"
                    onEnded={() => {
                      if (isMobile) setClickedIndex(null);
                    }}
                  />

                  {(!isPlaying || (isMobile && clickedIndex !== i)) && (
                    <img
                      src={
                        data.thumbnail?.asset?.url ||
                        "https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp"
                      }
                      alt={data.altText || "Video thumbnail"}
                      className="absolute top-0 left-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })
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
