"use client";

import React, { useEffect, useState } from "react";
import { client } from "../../../../../utils/sanity";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Production = () => {
  const [productionVideos, setProductionVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Proper fetch function
  const fetchVideos = async () => {
    const query = `*[_type == "instagramFeed"] | order(orderRank) {
      _id,
      title,
      instagramLink,
      altText,
      ratio,
    }`;

    return await client.fetch(query);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videos = await fetchVideos();
        setProductionVideos(videos);
      } catch (error) {
        console.error("Error fetching production videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // ✅ Call embed script after videos render
  useEffect(() => {
    if (!loading && typeof window !== "undefined") {
      if (window.instgrm) {
        window.instgrm.Embeds.process();
      } else {
        const script = document.createElement("script");
        script.src = "https://www.instagram.com/embed.js";
        script.async = true;
        script.onload = () => window.instgrm?.Embeds.process();
        document.body.appendChild(script);
      }
    }
  }, [loading, productionVideos]);

  // ✅ Custom CSS to hide unwanted Instagram elements
  useEffect(() => {
    const addCustomStyles = () => {
      if (typeof document !== "undefined") {
        const styleId = "instagram-custom-styles";
        
        // Remove existing style if it exists
        const existingStyle = document.getElementById(styleId);
        if (existingStyle) {
          existingStyle.remove();
        }

        const style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          /* Hide Instagram branding and unwanted elements */
          .instagram-media .instagram-media-header {
            display: none !important;
          }
          
          .instagram-media .instagram-media-footer {
            display: none !important;
          }
          
          .instagram-media .instagram-media-caption {
            display: none !important;
          }
          
          .instagram-media .instagram-media-actions {
            display: none !important;
          }
          
          .instagram-media .instagram-media-likes {
            display: none !important;
          }
          
          .instagram-media .instagram-media-comments {
            display: none !important;
          }
          
          .instagram-media .instagram-media-timestamp {
            display: none !important;
          }
          
          .instagram-media .instagram-media-username {
            display: none !important;
          }
          
          .instagram-media .instagram-media-verified {
            display: none !important;
          }
          
          /* Keep only the video/image content */
          .instagram-media {
            min-width: 326px !important;
            border-radius: 12px !important;
            box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
            overflow: hidden !important;
            background: transparent !important;
            border: none !important;
          }
          
          .instagram-media iframe {
            border-radius: 12px !important;
          }
          
          /* Alternative approach - hide Instagram logo and branding */
          .instagram-media a[href*="instagram.com"]:not([href*="/p/"]):not([href*="/reel/"]) {
            display: none !important;
          }
          
          /* Hide "View on Instagram" text */
          .instagram-media p:last-child {
            display: none !important;
          }
          
          /* Responsive adjustments */
          @media (max-width: 768px) {
            .instagram-media {
              min-width: 100% !important;
              max-width: 100% !important;
            }
          }
        `;
        
        document.head.appendChild(style);
      }
    };

    addCustomStyles();
    
    // Re-apply styles when Instagram embeds load
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          addCustomStyles();
        }
      });
    });

    if (typeof document !== "undefined") {
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }

    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen w-full bg-white pt-32 md:text-4xl text-black font-light">
      <div className="w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5">
        <h1 className="pb-1 font-medium">Our Productions</h1>
      </div>

      <div className="w-11/12 xl:w-9/12 mx-auto pt-4 py-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
        {loading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative w-full">
              <Skeleton height={650} className="w-full rounded-lg" />
            </div>
          ))
        ) : productionVideos.length > 0 ? (
          productionVideos.map((data) => (
            <div
              key={data._id}
              className="relative w-full bg-transparent duration-150 hover:scale-105 transition-transform"
              style={{ aspectRatio: data.ratio || "9/16" }}
            >
              <blockquote
                className="instagram-media"
                data-instgrm-permalink={data.instagramLink}
                data-instgrm-version="14"
                style={{
                  background: "transparent",
                  border: 0,
                  margin: 0,
                  width: "100%",
                  height: "100%",
                }}
              ></blockquote>
              
              {/* Optional overlay for your branding */}
              {data.title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
                  <h3 className="text-white text-sm font-medium">{data.title}</h3>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-2xl font-medium animate-bounce">
            No videos found.
          </div>
        )}
      </div>
    </main>
  );
};

export default Production;