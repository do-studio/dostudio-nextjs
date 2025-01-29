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
  WorkWithUs,
} from "../components";
import { Suspense } from "react";
import Head from "next/head";
import DynamicPopupform from "../components/home/designs/popUpform";
import { Helmet } from "react-helmet";
import { LogoDO } from "../../public/images";

const DynamicBanner = dynamic(() => import("../components/home/banner/banner"));
const DynamicMarqueeText = dynamic(() =>
  import("../components/home/designs/marqueText")
);
const DynamicAbout = dynamic(() => import("../components/home/about/index"));
const DynamicService = dynamic(() =>
  import("../components/home/designs/whatwedo")
);
const DynamicOurwork2 = dynamic(() =>
  import("../components/home/designs/ourWorks2")
);
const DynamicClients = dynamic(() =>
  import("../components/home/designs/clients")
);
const DynamicTestimonials = dynamic(() =>
  import("../components/home/designs/Testimonials")
);
const DynamicWorkwithUs = dynamic(() =>
  import("../components/home/designs/workWithUs")
);
const DynamicFaq = dynamic(() =>
  import("../components/home/faq/faq")
);

const ContactForm = dynamic(() =>
  import("../components/home/designs/ContactForm")
);

export default function Home() {
  return (
    <>
      <Helmet>
        {/* Meta Title */}
        <title>
          Digital Marketing Agency in Calicut, Branding Agency Calicut
        </title>

        {/* Meta Description */}
        <meta
          name="description"
          content="Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM."
        />

        {/* Meta Keywords */}
        <meta
          name="keywords"
          content="Branding agency in calicut, Advertising agency in Calicut, Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, performance marketing company in calicut"
        />

        {/* Favicon and Icons */}
        <link rel="icon" href="/src/app/favicon.ico" />
        <link rel="apple-touch-icon" href="/src/app/apple-touch-icon.png?v=4" />
        <link rel="shortcut icon" href="/src/app/apple-touch-icon.png" />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://dostudio.co.in" />
        <meta
          property="og:title"
          content="Digital Marketing Agency in Calicut, Branding Agency Calicut"
        />
        <meta
          property="og:description"
          content="Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png"
        />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta
          property="og:image:alt"
          content="Do Studio - Digital Marketing and Branding Agency"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Digital Marketing Agency in Calicut, Branding Agency Calicut"
        />
        <meta
          name="twitter:description"
          content="Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM."
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png"
        />
      </Helmet>
      <main>
        <DynamicPopupform />
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
          <DynamicOurwork2 />
        </Suspense>
        <Suspense>
          <DynamicClients />
        </Suspense>
        {/* <AnimatPara/> */}
        <Suspense fallback={<p>Loading data...</p>}>
          <DynamicTestimonials />
        </Suspense>
        {/* Faq section */}
        <Suspense fallback={<p>Loading data...</p>}>
          <DynamicFaq />
        </Suspense>
        {/* <Clients/> */}
        <Suspense fallback={<p>Loading data...</p>}>
          <div className="bg-white relative">
            <img
              className=" w-60 xl:h-full xl:w-full absolute top-[50%] left-[50%] -translate-x-[50%] object-contain -translate-y-[50%] opacity-5 z-10"
              src={LogoDO.src}
              alt=""
            />
            <DynamicWorkwithUs />
          </div>
        </Suspense>
        {/* <GetinTouch/>
      <MovingWords/> */}
      </main>
    </>
  );
}
