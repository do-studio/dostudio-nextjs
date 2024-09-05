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
  OurWOrks,
  OurWOrk2,
  WorkWithUs
} from "../components";
import { Suspense } from "react";
import Head from "next/head";


export default function Home() {
  return (
    <>
      <Head>
				<title>My website</title>
				<meta name="description">
					This text will appear in the description section of search engine results.
				</meta>
			</Head>
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
      <Suspense fallback={<p>Loading data...</p>}>
        {/* <OurWOrks /> */}
        <OurWOrk2/>
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        <ClientSlide />
      </Suspense>

      {/* <AnimatPara/> */}
      <Suspense fallback={<p>Loading data...</p>}>
        <Testimonials />
      </Suspense>
      {/* <Clients/> */}
      <Suspense fallback={<p>Loading data...</p>}>
        <WorkWithUs />
      </Suspense>
      {/* <GetinTouch/>
      <MovingWords/> */}
    </main>
    </>
  );
}
