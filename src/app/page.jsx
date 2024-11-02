"use client";
import React, { useEffect } from "react";
import dynamic from "next/dynamic";
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



const DynamicBanner = dynamic(()=> import('../components/home/banner/banner'));
const DynamicMarqueeText = dynamic(()=> import('../components/home/designs/marqueText'));
const DynamicAbout = dynamic(()=> import('../components/home/about/index'));
const DynamicService = dynamic(()=> import('../components/home/designs/whatwedo'));
const DynamicOurwork2 = dynamic(()=> import('../components/home/designs/ourWorks2'));
const DynamicClients = dynamic(()=> import('../components/home/designs/clients'));
const DynamicTestimonials = dynamic(()=> import('../components/home/designs/Testimonials'));
const DynamicWorkwithUs = dynamic(()=> import('../components/home/designs/workWithUs'));


export default function Home() {
  return (
    <>

    <main>
      <Suspense fallback={<p>Loading data...</p>}>
        <DynamicBanner />
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        <DynamicMarqueeText />
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        <DynamicAbout />
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        <DynamicService />
      </Suspense>
      <Suspense fallback={<p>Loading data...</p>}>
        {/* <OurWOrks /> */}
        <DynamicOurwork2/>
      </Suspense>
      <Suspense >
        <DynamicClients />
      </Suspense>
      {/* <AnimatPara/> */}
      <Suspense fallback={<p>Loading data...</p>}>
        <DynamicTestimonials />
      </Suspense>
      {/* <Clients/> */}
      <Suspense fallback={<p>Loading data...</p>}>
        <DynamicWorkwithUs />
      </Suspense>
      {/* <GetinTouch/>
      <MovingWords/> */}
    </main>
    </>
  );
}
