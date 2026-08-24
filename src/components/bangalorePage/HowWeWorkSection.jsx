"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaRegUserCircle,
  FaChartBar,
  FaExpandArrowsAlt,
  FaCheckCircle,
} from "react-icons/fa";

const iconMap = {
  user: FaRegUserCircle,
  chart: FaChartBar,
  scale: FaExpandArrowsAlt,
  check: FaCheckCircle,
};

export default function HowWeWorkSection({ title, description, cards }) {
  if (!title && (!cards || cards.length === 0)) return null;

  return (
    <section className="bg-[#f4f2ee] py-20 px-6 md:px-12 lg:px-20">
      <div className="max-w-7xl mx-auto text-center">
        {title && (
          <h2 className="text-3xl md:text-5xl font-bold text-black tracking-tight">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-gray-500 text-base md:text-lg mt-5 max-w-2xl mx-auto leading-relaxed">
            {description}
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-14 text-left">
          {cards?.map((card, index) => {
            const Icon = iconMap[card.icon] || FaCheckCircle;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-7 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <Icon className="text-2xl text-black mb-6" />
                <p className="text-lg md:text-xl font-bold text-black leading-snug">
                  {card.title}
                </p>
                {card.desc && (
                  <p className="text-gray-500 text-sm mt-3 leading-relaxed">
                    {card.desc}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
