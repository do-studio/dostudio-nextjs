"use client";
import React from "react";
import Marquee from "react-fast-marquee";

const movingText = [
  {
    word: `BRANDING`,
  },
  {
    word: `BUSINESS CARD`,
  },
  {
    word: `MARKETING`,
  },
  {
    word: `POSTER`,
  },
  {
    word: `PACKAGE DESIGN`,
  },
  {
    word: `PHOTOSHOOT`,
  },
  {
    word: `PRINT DESIGN`,
  },
  {
    word: `BRANDING`,
  },
  {
    word: `BUSINESS CARD`,
  },
  {
    word: `MARKETING`,
  },
  {
    word: `POSTER`,
  },
  {
    word: `PACKAGE DESIGN`,
  },
  {
    word: `PHOTOSHOOT`,
  },
  {
    word: `PRINT DESIGN`,
  },
  {
    word: `BRANDING`,
  },
  {
    word: `BUSINESS CARD`,
  },
  {
    word: `MARKETING`,
  },
  {
    word: `POSTER`,
  },
  {
    word: `PACKAGE DESIGN`,
  },
  {
    word: `PHOTOSHOOT`,
  },
  {
    word: `PRINT DESIGN`,
  },
];

const Movingwords = () => {
  return (
    <Marquee speed={150} pauseOnHover={true}>
      {movingText?.map((text, i) => (
        <div key={i} className="mx-5 xl:mx-10 py-3 xl:py-5">
          <h3 className="text-base xl:text-lg font-semibold">{text.word}</h3>
        </div>
      ))}
    </Marquee>
  );
};

export default Movingwords;
