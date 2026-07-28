"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { client } from "../../../utils/sanity";

export default function InstagramSection({
  title = "Creative Content, Real Results",
  description = "A look at the high-converting social media creatives we’ve crafted for brands.",
  instagramUrl = "https://www.instagram.com/dostudio.agency/",
  buttonText = "Connect to Instagram",
  posts: propPosts,
}) {
  const [posts, setPosts] = useState(propPosts || []);
  const [loading, setLoading] = useState(!propPosts || propPosts.length === 0);

  // Fetch Instagram feed from Sanity if not passed via props
  useEffect(() => {
    if (!propPosts || propPosts.length === 0) {
      const fetchSanityPosts = async () => {
        try {
          const query = `*[_type == "instagramFeed"] | order(orderRank) [0...3] {
            _id,
            title,
            instagramLink,
            altText,
            ratio,
          }`;
          const data = await client.fetch(query);
          if (data && data.length > 0) {
            setPosts(data);
          }
        } catch (error) {
          console.error("Error fetching Instagram posts from Sanity:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchSanityPosts();
    } else {
      setPosts(propPosts);
      setLoading(false);
    }
  }, [propPosts]);

  // Load Instagram embed script for permalinks
  useEffect(() => {
    if (typeof window !== "undefined") {
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
  }, [posts]);

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight mb-4">
              {title}
            </h2>
            <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed">
              {description}
            </p>
          </motion.div>

          {/* Connect to Instagram Button */}
         
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <motion.div
                key={post._id || post.id || index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 bg-gray-50 group flex flex-col justify-between"
              >
                {post.instagramLink ? (
                  <div className="w-full relative overflow-hidden flex items-center justify-center p-2">
                    <blockquote
                      className="instagram-media w-full"
                      data-instgrm-permalink={post.instagramLink}
                      data-instgrm-version="14"
                      style={{
                        background: "transparent",
                        border: 0,
                        margin: 0,
                        width: "100%",
                      }}
                    ></blockquote>
                  </div>
                ) : post.image ? (
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block relative aspect-square w-full overflow-hidden"
                  >
                    <Image
                      src={post.image}
                      alt={post.title || `Instagram Post ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="bg-white/90 text-black px-4 py-2 rounded-full font-medium flex items-center gap-2 text-sm shadow-md">
                        <FaInstagram className="text-pink-600 text-lg" />
                        <span>View on Instagram</span>
                      </div>
                    </div>
                  </a>
                ) : null}

                {post.title && (
                  <div className="p-4 bg-white border-t border-gray-100">
                    <p className="text-sm font-medium text-gray-800 line-clamp-1">
                      {post.title}
                    </p>
                  </div>
                )}
              </motion.div>
            ))
          ) : (
            /* Fallback post cards if loading or empty */
            [1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-900 text-white rounded-2xl p-8 flex flex-col justify-between min-h-[320px] relative overflow-hidden group hover:shadow-2xl transition-all duration-300"
              >
                <div className="absolute -right-6 -top-6 text-gray-800 text-9xl font-black opacity-30 select-none group-hover:scale-110 transition-transform">
                  <FaInstagram />
                </div>
                <div className="relative z-10">
                  <span className="text-xs uppercase tracking-widest text-primarygreen font-semibold">
                    Creative Showcase #{item}
                  </span>
                  <h3 className="text-2xl font-bold mt-3 mb-2 text-white">
                    High-Converting Creative
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Crafted for maximum engagement and brand performance across Instagram & Meta platforms.
                  </p>
                </div>
                <div className="relative z-10 mt-8">
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primarygreen hover:text-white transition-colors"
                  >
                    <span>View Post</span>
                    <span>→</span>
                  </a>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
