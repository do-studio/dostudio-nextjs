"use client";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { client } from "../../../../../utils/sanity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Production = () => {
  const [productionVideos, setProductionVideos] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null); // desktop
  const [clickedIndex, setClickedIndex] = useState(null); // mobile
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Detect Mobile
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch videos
  useEffect(() => {
    const fetchData = async () => {
      try {
        const query = `*[_type == "production"] | order(orderRank) {
          _id,
          title,
          thumbnail { asset->{ url } },
          altText,
          ratio,
          video { asset->{ url } }
        }`;
        const videos = await client.fetch(query);
        setProductionVideos(videos);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  // SEO
  useEffect(() => {
    document.title = "Production Videos | Do Studio";
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
    <main className="min-h-screen w-full bg-white pt-20 xl:pt-32 text-black font-light">
      <div className="w-full flex justify-center p-5 uppercase">
        <h1 className="font-medium">Videos</h1>
      </div>

      <div className="w-11/12 xl:w-9/12 mx-auto py-20 grid grid-cols-3 gap-0">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <Skeleton key={i} className="aspect-[9/16] w-full" />
          ))
        ) : productionVideos.length > 0 ? (
          productionVideos.map((data, i) => {
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
                  {/* VIDEO */}
                  {shouldPlay && (
                    <ReactPlayer
                      url={data.video.asset.url}
                      playing
                      loop
                      muted={false} // VERY IMPORTANT for Android
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
                        data.thumbnail?.asset?.url ??
                        "https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp"
                      }
                      alt={data.altText || "Video thumbnail"}
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

export default Production;
