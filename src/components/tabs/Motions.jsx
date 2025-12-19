"use client";

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { client } from "../../../utils/sanity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Motions = () => {
  const [motionVideos, setMotionVideos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // desktop
  const [clickedIndex, setClickedIndex] = useState(null); // mobile
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Fetch motion videos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "motion"] | order(orderRank){
          _id,
          title,
          ratio,
          image {
            alt,
            asset->{ url }
          },
          video {
            asset->{ url }
          }
        }`;
        const motions = await client.fetch(query);
        setMotionVideos(motions);
      } catch (error) {
        console.error("Error fetching motion videos:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // SEO
  useEffect(() => {
    document.title = "Motion Videos | Do Studio";
    const description =
      "Do Studio is a leading creative agency in Calicut offering creative services, branding, web design, graphic design, and more.";
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, []);

  return (
    <main className="min-h-screen w-full bg-white text-black font-light">
      <div className="w-11/12 xl:w-9/12 mx-auto py-20 grid grid-cols-3 gap-0">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[9/16] w-full" />
          ))
        ) : motionVideos.length > 0 ? (
          motionVideos.map((data, i) => {
            const isWide = data.ratio?.replace(/\s/g, "") === "16/9";

            // PLAY LOGIC
            const isDesktopPlaying = !isMobile && hoveredIndex === i;
            const isMobilePlaying = isMobile && clickedIndex === i;
            const shouldPlay = isDesktopPlaying || isMobilePlaying;

            return (
              <div
                key={data._id}
                className={`relative ${isWide ? "col-span-3" : ""}`}
                onMouseEnter={() => !isMobile && setHoveredIndex(i)}
                onMouseLeave={() => !isMobile && setHoveredIndex(null)}
                onClick={() => {
                  if (!isMobile) return;
                  setClickedIndex((prev) => (prev === i ? null : i));
                }}
              >
                <div
                  className="relative w-full bg-black overflow-hidden"
                  style={{ aspectRatio: data.ratio || "9/16" }}
                >
                  {/* VIDEO – only mounted when playing */}
                  {shouldPlay && (
                    <ReactPlayer
                      url={data.video.asset.url}
                      playing
                      loop
                      muted={false} // CRITICAL for Android
                      controls={false}
                      playsinline
                      width="100%"
                      height="100%"
                      className="absolute inset-0"
                    />
                  )}

                  {/* THUMBNAIL */}
                  {!shouldPlay && (
                    <img
                      src={
                        data.image?.asset?.url ??
                        "https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp"
                      }
                      alt={data.image?.alt || "Video thumbnail"}
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-2xl font-medium">No videos found.</div>
        )}
      </div>
    </main>
  );
};

export default Motions;
