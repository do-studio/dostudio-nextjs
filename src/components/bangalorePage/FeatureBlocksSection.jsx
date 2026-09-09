"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";

export default function FeatureBlocksSection({ title, description, blocks }) {
  if (!title && (!blocks || blocks.length === 0)) return null;

  return (
    <section className="w-11/12 xl:w-10/12 mx-auto py-16 xl:py-20">
      <div className="text-center max-w-3xl mx-auto mb-12">
        {title && (
          <h2 className="text-3xl md:text-5xl font-black uppercase text-black">
            {title}
          </h2>
        )}
        {description && (
          <p className="text-gray-500 mt-4 text-base md:text-lg leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12">
        {blocks?.map((block, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-[#f9f9f9] rounded-2xl p-7 md:p-9"
          >
            {block.subtitle && (
              <h3 className="text-xl md:text-2xl font-bold text-black mb-3">
                {block.subtitle}
              </h3>
            )}
            {block.description && (
              <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6">
                {block.description}
              </p>
            )}
            {block.points && block.points.length > 0 && (
              <ul className="space-y-3">
                {block.points.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 h-5 w-5 rounded-full bg-primarygreen flex items-center justify-center">
                      <FiCheck className="text-black text-xs" />
                    </span>
                    <span className="text-sm md:text-base text-black">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
