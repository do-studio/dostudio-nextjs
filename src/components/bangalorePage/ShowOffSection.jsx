"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ShowOffSection({
  title,
  content,
  highlight,
  cards,
  ctaHeading = "Ready to grow your brand?",
  ctaDescription = "Reach out to our team today to get a customized strategy tailored for your business goals.",
  ctaLink = "/contact",
  ctaButtonText = "Contact",
}) {
  if (!title && (!cards || cards.length === 0)) return null;

  // Helper to render content with highlighted text
  const renderContent = () => {
    if (!content) return null;
    if (!highlight || !content.includes(highlight)) {
      return content;
    }
    const parts = content.split(highlight);
    return (
      <>
        {parts[0]}
        <span className="text-yellow-400 font-semibold">{highlight}</span>
        {parts[1]}
      </>
    );
  };

  return (
    <section className="w-full bg-black text-white py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          {title && (
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4">
              {title}
            </h2>
          )}
          {content && (
            <p className="text-gray-300 text-lg md:text-xl font-normal max-w-4xl leading-relaxed">
              {content}
            </p>
          )}
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards?.map((card, index) => (
            <motion.div
              key={card.id || index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-[#141414] hover:bg-[#1a1a1a] border border-neutral-800/80 rounded-2xl md:rounded-3xl p-7 flex flex-col justify-between min-h-[210px] transition-all duration-300 hover:border-neutral-700 hover:shadow-xl group"
            >
              {/* Top Section */}
              <div>

                  <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-none">
                    {card.value}
                  </span>
              </div>

              {/* Bottom Section */}
              <div className="mt-8">

                  <div className="text-gray-300 text-lg font-medium leading-snug">
                    {card.line1}
                    {card.line2 && <div>{card.line2}</div>}
                  </div>

              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 md:mt-16 bg-[#141414] border border-neutral-800/80 rounded-3xl p-8 md:p-10 lg:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-neutral-700 transition-all duration-300"
        >
          <div className="max-w-2xl">
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white tracking-tight mb-3">
              {ctaHeading}
            </h3>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed">
              {ctaDescription}
            </p>
          </div>

          <div className="flex-shrink-0 pt-2 md:pt-0">
            <Link
              href={ctaLink}
              className="inline-flex items-center gap-3 group"
            >
              <div className="bg-white text-black font-semibold px-7 py-3.5 rounded-full group-hover:bg-gray-100 transition-all duration-300 text-lg shadow-md">
                {ctaButtonText} us
              </div>
              <div className="bg-white text-black w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center  transition-all duration-300 shadow-md flex-shrink-0">
                <svg
                  className="w-6 h-6 text-black transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
