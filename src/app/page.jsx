"use client";
import React from "react";
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

const DynamicOurwork3 = dynamic(() =>
  import("../components/home/designs/ourWorks3")
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
const ContactButton = dynamic(() =>
  import("../components/home/designs/ContactButton")
);

export default function Home() {

  useEffect(() => {
    // Set dynamic title
    document.title = "Digital Marketing Agency in Calicut, Branding Agency Calicut";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.");
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "Branding agency in calicut, Advertising agency in Calicut, Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, performance marketing company in calicut");
    } else {
      const newMetaKeywords = document.createElement("meta");
      newMetaKeywords.setAttribute("name", "keywords");
      newMetaKeywords.setAttribute("content", "Branding agency in calicut, Advertising agency in Calicut, Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, performance marketing company in calicut");
      document.head.appendChild(newMetaKeywords);
    }

    // Set link for favicon and apple-touch-icon
    const linkFavicon = document.querySelector('link[rel="icon"]');
    if (!linkFavicon) {
      const newLinkFavicon = document.createElement("link");
      newLinkFavicon.setAttribute("rel", "icon");
      newLinkFavicon.setAttribute("href", "/src/app/favicon.ico");
      document.head.appendChild(newLinkFavicon);
    }

    const linkAppleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]');
    if (!linkAppleTouchIcon) {
      const newLinkAppleTouchIcon = document.createElement("link");
      newLinkAppleTouchIcon.setAttribute("rel", "apple-touch-icon");
      newLinkAppleTouchIcon.setAttribute("href", "/src/app/apple-touch-icon.png?v=4");
      document.head.appendChild(newLinkAppleTouchIcon);
    }

    // Set meta robots
    const metaRobots = document.querySelector('meta[name="robots"]');
    if (metaRobots) {
      metaRobots.setAttribute("content", "index, follow");
    } else {
      const newMetaRobots = document.createElement("meta");
      newMetaRobots.setAttribute("name", "robots");
      newMetaRobots.setAttribute("content", "index, follow");
      document.head.appendChild(newMetaRobots);
    }

    // Set OpenGraph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Digital Marketing Agency in Calicut, Branding Agency Calicut");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.setAttribute("content", "Digital Marketing Agency in Calicut, Branding Agency Calicut");
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.setAttribute("content", "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.");
      document.head.appendChild(newOgDescription);
    }

    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) {
      ogImage.setAttribute("content", "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png");
    } else {
      const newOgImage = document.createElement("meta");
      newOgImage.setAttribute("property", "og:image");
      newOgImage.setAttribute("content", "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png");
      document.head.appendChild(newOgImage);
    }

    // Set Twitter tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", "Digital Marketing Agency in Calicut, Branding Agency Calicut");
    } else {
      const newTwitterTitle = document.createElement("meta");
      newTwitterTitle.setAttribute("name", "twitter:title");
      newTwitterTitle.setAttribute("content", "Digital Marketing Agency in Calicut, Branding Agency Calicut");
      document.head.appendChild(newTwitterTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.");
    } else {
      const newTwitterDescription = document.createElement("meta");
      newTwitterDescription.setAttribute("name", "twitter:description");
      newTwitterDescription.setAttribute("content", "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.");
      document.head.appendChild(newTwitterDescription);
    }

    const twitterImage = document.querySelector('meta[name="twitter:image"]');
    if (twitterImage) {
      twitterImage.setAttribute("content", "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png");
    } else {
      const newTwitterImage = document.createElement("meta");
      newTwitterImage.setAttribute("name", "twitter:image");
      newTwitterImage.setAttribute("content", "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png");
      document.head.appendChild(newTwitterImage);
    }
  }, []);

  return (
    <>
      <Head>
        <title>
          Digital Marketing Agency in Calicut, Branding Agency Calicut
        </title>

        <meta
          name="description"
          content="Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM."
        />

        <meta
          name="keywords"
          content="Branding agency in calicut, Advertising agency in Calicut, Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, performance marketing company in calicut"
        />

        <link rel="icon" href="/src/app/favicon.ico" />
        <link rel="apple-touch-icon" href="/src/app/apple-touch-icon.png?v=4" />
        <link rel="shortcut icon" href="/src/app/apple-touch-icon.png" />

        <meta name="robots" content="index, follow" />

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
      </Head>


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
          {/* <OurWOrks /> */}
          <DynamicOurwork3 />
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
          <div className="bg-white relative" id="contact-form">
            <img
              className=" w-60 xl:h-full xl:w-full absolute top-[50%] left-[50%] -translate-x-[50%] object-contain -translate-y-[50%] opacity-5 z-10"
              src={LogoDO.src}
              alt=""
            />
            <DynamicWorkwithUs />
          </div>
        </Suspense>
        {/* <Suspense fallback={<p>Loading data...</p>}>
          <ContactButton />
        </Suspense> */}
        {/* <GetinTouch/>
      <MovingWords/> */}
      </main>
    </>
  );
}
