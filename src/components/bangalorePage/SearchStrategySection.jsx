"use client";

import React from "react";
import { motion } from "framer-motion";

export default function SearchStrategySection({
  title,
  heading,
  description,
  columns,
  rowLabels,
  footNote,
}) {
  if (!columns || columns.length === 0) return null;

  const rowCount = Math.max(...columns.map((col) => col.points?.length || 0));
  const hasLabels = Array.isArray(rowLabels) && rowLabels.length > 0;

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
          {heading && (
            <h3 className="text-xl md:text-2xl font-semibold text-primarygreen mb-3">
              {heading}
            </h3>
          )}
          {description && (
            <p className="text-gray-300 text-lg md:text-xl font-normal max-w-4xl leading-relaxed">
              {description}
            </p>
          )}
        </motion.div>

        {/* Comparison table — scrolls horizontally on small screens */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="overflow-x-auto rounded-2xl border border-neutral-800 [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <table className="w-full min-w-[720px] border-collapse text-left">
            <thead>
              <tr className="bg-primarygreen text-black">
                {hasLabels && (
                  <th
                    scope="col"
                    className="px-6 py-5 text-sm md:text-base font-bold uppercase tracking-wide border-r border-black/15 w-[18%]"
                  >
                    Approach
                  </th>
                )}
                {columns.map((col, index) => (
                  <th
                    key={`head-${index}`}
                    scope="col"
                    className="px-6 py-5 text-base md:text-lg font-bold leading-snug border-r border-black/15 last:border-r-0"
                  >
                    {col.title}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowCount }).map((_, rowIndex) => (
                <tr
                  key={`row-${rowIndex}`}
                  className="border-t border-neutral-800 bg-[#0d0d0d] even:bg-[#141414] hover:bg-[#1a1a1a] transition-colors duration-300"
                >
                  {hasLabels && (
                    <th
                      scope="row"
                      className="px-6 py-5 align-top text-xs md:text-sm font-semibold uppercase tracking-widest text-primarygreen border-r border-neutral-800"
                    >
                      {rowLabels[rowIndex]}
                    </th>
                  )}
                  {columns.map((col, colIndex) => (
                    <td
                      key={`cell-${rowIndex}-${colIndex}`}
                      className="px-6 py-5 align-top text-base md:text-lg text-gray-200 leading-snug border-r border-neutral-800 last:border-r-0"
                    >
                      {col.points?.[rowIndex]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Closing note */}
        {footNote && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 md:mt-16 text-gray-300 text-lg md:text-xl leading-relaxed max-w-5xl"
          >
            {footNote}
          </motion.p>
        )}
      </div>
    </section>
  );
}
