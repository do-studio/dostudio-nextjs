import React from "react";
import {
  wrk1,
  wrk2,
  wrk3,
  wrk4,
  wrk5,
  WRK1,
  BrandingCardImage,
  servicewebbg, DigitalMarketingCardPhoto
} from "../../../../public/images/index";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../../../components/motions/fadeUp";
import Head from "next/head";

// export const metadata = {
//   title: "Digital Marketing Services in Calicut: Branding, Website",
//   description:
//     "We specialize in SEO, social media marketing, content marketing, and website development to help your business thrive online.",
//   metadataBase: new URL("https://dostudio.co.in"), // Set the base domain
//   keywords:
//     "Digital Marketing Agency in Calicut, Digital marketing services in Calicut, socialmedia agency in kozhikode, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, creative agency in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut",
//   openGraph: {
//     title: "Digital Marketing Services in Calicut: Branding, Website",
//     description:
//       "We specialize in SEO, social media marketing, content marketing, and website development to help your business thrive online.",
//     url: `https://dostudio.co.in/services`,

//     type: "article",
//   },
// };

const serviceData = [
  {
    id: 1,
    title: "branding",
    img: BrandingCardImage,
    alt: `Creative marketing agency in Calicut`,
    url: `/our-works/branding`,
  },
  {
    id: 2,
    title: "creatives",
    img: DigitalMarketingCardPhoto,
    alt: `Best digital marketing agency in Calicut`,
    url: `/our-works/creatives`,
  },
  {
    id: 3,
    title: "web design",
    img: servicewebbg,
    alt: `SEO company in calicut`,
    url: `/our-works/web-design`,
  },
  {
    id: 4,
    title: "package design",
    img: wrk3,
    alt: `Socialmedia marketing agency in Calicut`,
    url: `/our-works/package-design`,
  },
  {
      id: 5,
      title: "print design",
      img: wrk1,
      alt: ``,
      url: `/our-works/print-design`,
    },
    {
      id: 6,
      title: "Production",
      img: wrk4,
      alt: ``,
      url: `/our-works/production`,
    },
];

const page = () => {
  return (
    <>
      <section className="w-11/12 xl:w-10/12 mx-auto min-h-screen pt-32 py-20">
        <h1 className=" h-full w-full text-4xl sm:text-5xl xl:text-7xl text-center font-black capitalize">
          our Works
        </h1>
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-2 md:gap-5 xl:gap-10 pt-10">
          {serviceData?.map((data, i) => (
            <FadeUp duration={0.3} delay={0.2 * i} key={i}>
              <Link
                href={data.url}
                className="bg-gray-100 h-full rounded-2xl shadow-lg hover:shadow-xl duration-200 border p-2 md:p-5 flex flex-col justify-between gap-3 xl:gap-5"
              >
                <div className="flex flex-col gap-3 xl:gap-5">
                  <p className="text-xs md:text-xl xl:text-3xl bg-primarygreen w-fit p-1.5 md:p-2 rounded-md font-bold md:font-black">
                    0{data.id}
                  </p>
                  <h4 className="text-xs md:text-2xl uppercase font-bold">{data.title}</h4>
                </div>
              
                <div className="relative w-full aspect-square rounded-md overflow-hidden">
                  <Image
                    className="object-cover"
                    placeholder="blur"
                    fill
                    src={data.img}
                  />
                </div>
              </Link>
            </FadeUp>
          ))}
        </div>
      </section>
    </>
  );
};

export default page;
