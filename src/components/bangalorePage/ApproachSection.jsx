"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const ApproachItem = ({ index, title, desc }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#f4f4f5] rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
      >
        <span className="text-sm md:text-base font-medium text-black">
          {index}. {title}
        </span>
        <FiChevronDown
          className={`shrink-0 text-lg transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      <div
        className={`px-5 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-screen opacity-100 pb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
      </div>
    </div>
  );
};

export default function ApproachSection({ title, description, steps }) {
  if (!title && (!steps || steps.length === 0)) return null;

  const mid = Math.ceil((steps?.length || 0) / 2);
  const leftSteps = steps?.slice(0, mid) || [];
  const rightSteps = steps?.slice(mid) || [];

  return (
    <section className="w-11/12 xl:w-10/12 mx-auto py-16 xl:py-20">
      <div className="text-center max-w-3xl mx-auto mb-10">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
        <div className="flex flex-col gap-3">
          {leftSteps.map((step, i) => (
            <ApproachItem key={i} index={i + 1} title={step.title} desc={step.desc} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {rightSteps.map((step, i) => (
            <ApproachItem
              key={i}
              index={mid + i + 1}
              title={step.title}
              desc={step.desc}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
