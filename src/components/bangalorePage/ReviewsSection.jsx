"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function ReviewsSection({
  title = "Real Stories, Real Results",
  description = "See how we’ve helped brands grow through our client reviews",
  rating: propRating = "4.8",
  totalReviews: propTotal = "100+",
  gmbUrl: propGmbUrl = "https://share.google/2qPhjmmyeXHxWn6Vz",
  reviews: propReviews,
}) {
  const [reviews, setReviews] = useState(propReviews || []);
  const [rating, setRating] = useState(propRating);
  const [totalReviews, setTotalReviews] = useState(propTotal);
  const [gmbUrl, setGmbUrl] = useState(propGmbUrl);
  const [loading, setLoading] = useState(!propReviews || propReviews.length === 0);

  // Fetch real-time GMB reviews from API endpoint
  useEffect(() => {
    if (!propReviews || propReviews.length === 0) {
      const fetchGmbReviews = async () => {
        try {
          const res = await fetch("/api/gmb-reviews");
          if (res.ok) {
            const data = await res.json();
            if (data.reviews && data.reviews.length > 0) {
              setReviews(data.reviews);
            }
            if (data.rating) setRating(data.rating);
            if (data.totalReviews) setTotalReviews(data.totalReviews);
            if (data.gmbUrl) setGmbUrl(data.gmbUrl);
          }
        } catch (err) {
          console.error("Error fetching GMB real-time reviews:", err);
        } finally {
          setLoading(false);
        }
      };

      fetchGmbReviews();
    } else {
      setReviews(propReviews);
      setLoading(false);
    }
  }, [propReviews]);

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-14 gap-6">
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

          {/* Clickable GMB Rating Summary Badge */}
          <motion.a
            href={gmbUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 bg-gray-50 border border-gray-200 rounded-2xl p-4 md:px-6 shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-300 flex-shrink-0 group"
          >
            <div className="w-10 h-10 flex items-center justify-center flex-shrink-0">
              <svg className="w-8 h-8 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-gray-900">{rating}</span>
                <div className="flex text-yellow-400 text-sm">
                  {"★".repeat(5)}
                </div>
              </div>
              <p className="text-xs text-gray-500 font-medium group-hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>Verified GMB Reviews ({totalReviews})</span>
                <span>↗</span>
              </p>
            </div>
          </motion.a>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews && reviews.length > 0
            ? reviews.map((item, index) => (
                <motion.a
                  key={item.id || item._id || index}
                  href={item.url || gmbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-3xl p-7 flex flex-col justify-between hover:shadow-xl hover:border-gray-300 transition-all duration-300 group relative block"
                >
                  {/* Top part: Rating Stars & Google G Logo Tag */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex text-yellow-400 text-base">
                        {"★".repeat(item.rating || 5)}
                      </div>
                      <svg className="w-5 h-5 opacity-80 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>

                    <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6 font-normal line-clamp-4">
                      &ldquo;{item.review}&rdquo;
                    </p>
                  </div>

                  {/* Bottom part: Author details & Avatar */}
                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {item.photo ? (
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-9 h-9 rounded-full object-cover border border-gray-200"
                        />
                      ) : (
                        <div className="w-9 h-9 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center text-sm">
                          {item.name ? item.name.charAt(0) : "G"}
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-900 group-hover:text-primarygreen transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-xs text-gray-400 font-medium">
                          {item.role || "Verified GMB Reviewer"}
                        </p>
                      </div>
                    </div>

                    {item.date && (
                      <span className="text-[11px] text-gray-400 font-normal">
                        {item.date}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))
            : [1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-gray-100 animate-pulse rounded-3xl p-7 min-h-[220px]"
                ></div>
              ))}
        </div>

        {/* View on GMB Navigation Button */}
        <div className="mt-12 text-center">
          <a
            href={gmbUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-white text-gray-900 border border-gray-300 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
          >
            <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>View All Reviews on Google</span>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
