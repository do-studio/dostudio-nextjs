"use client";
import React, { useEffect } from "react";
import {
  Banner,
  ClientSlide,
  MarqueeText,
  AnimatPara,
  About,
  Whatwedo,
  Clients,
  Testimonials,
  MovingWords,
  GetinTouch,
} from "../components";
import { Suspense } from "react";
export default function Home() {
  return (
    <main>
      <Suspense fallback={<p>Loading data...</p>}>
        <Banner />
      </Suspense>

      <Suspense fallback={<p>Loading data...</p>}>
        <MarqueeText />
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        <About />
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        <Whatwedo />
      </Suspense>

      {/* <AnimatPara/> */}
      <Suspense fallback={<p>Loading data...</p>}>
        <Testimonials />
      </Suspense>
      {/* <Clients/> */}
      <Suspense fallback={<p>Loading data...</p>}>
        <ClientSlide />
      </Suspense>
      {/* <GetinTouch/>
      <MovingWords/> */}
    </main>
  );
}
