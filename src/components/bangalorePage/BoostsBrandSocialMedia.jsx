"use client";

import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

export default function BoostsBrandSocialMedia({ heading, highlight, description, buttonText, buttonLink }) {
  return (
    <section className="w-full bg-black text-white py-24 px-6 md:px-16 lg:px-32">
      <div className="max-w-6xl mx-auto relative">
     
        {/* Testimonial / Main Heading */}
        <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-10 uppercase">
          {heading}
          <span className="text-primarygreen ">{highlight}</span>
        </h2>

        {/* Description */}
        <p className="text-gray-300 text-lg md:text-xl max-w-4xl leading-relaxed mb-10">
          {description}
        </p>

        {/* CTA Button */}
        <div className="mt-6">
          <a
            href={buttonLink} // <-- replace with your WhatsApp number
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primarygreen text-black font-medium px-8 py-4 rounded-full hover:bg-primarygreenhvr transition-all duration-300"
          >
            {buttonText}
          </a>
        </div>

     
      </div>
    </section>
  );
}
