import React from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import DynamicPopupform from "../components/home/designs/popUpform";

const DynamicBanner = dynamic(() => import("../components/home/banner/banner"));
const DynamicMarqueeText = dynamic(() => import("../components/home/designs/marqueText"));
const DynamicAbout = dynamic(() => import("../components/home/about/index"));
const DynamicService = dynamic(() => import("../components/home/designs/whatwedo"));
const DynamicOurwork2 = dynamic(() => import("../components/home/designs/ourWorks2"));
const DynamicOurwork3 = dynamic(() => import("../components/home/designs/ourWorks3"));
const DynamicClients = dynamic(() => import("../components/home/designs/clients"));
const DynamicTestimonials = dynamic(() => import("../components/home/designs/Testimonials"));
const DynamicWorkwithUs = dynamic(() => import("../components/home/designs/workWithUs"));
const DynamicFaq = dynamic(() => import("../components/home/faq/faq"));
const OurWorksHorizontal = dynamic(() => import("../components/home/designs/ourWorksHorizontal"));



export const metadata = {
  title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
  description:
    "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.",
  keywords:
    "Branding agency in calicut, Advertising agency in Calicut, Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, performance marketing company in calicut",
  openGraph: {
    type: "website",
    url: "https://dostudio.co.in",
    title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
    description:
      "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.",
    images: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png",
        width: 1200,
        height: 630,
        alt: "Do Studio - Digital Marketing and Branding Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
    description:
      "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.",
    images: [
      "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png",
    ],
  },
};


export default function Home() {




  return (


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

        {/* <Suspense fallback={<p>Loading data...</p>}>
         <OurWorksHorizontal />
      </Suspense> */}

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

        <DynamicWorkwithUs />
      </Suspense>
      {/* <Suspense fallback={<p>Loading data...</p>}>
          <ContactButton />
        </Suspense> */}
      {/* <GetinTouch/>
      <MovingWords/> */}
    </main>

  );
}
