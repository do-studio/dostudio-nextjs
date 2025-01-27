"use client";
import Image from "next/image";
import React from "react";
import {
  wrk1,
  wrk2,
  wrk3,
  wrk4,
  wrk5,
  WRK1,
  WRK2,
} from "../../../../public/images";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
const OurService = [
  {
    id: 1,
    title: `Illustration`,
    link: ``,
    img: wrk1,
  },
  {
    id: 2,
    title: `Brand Design`,
    link: ``,
    img: wrk2,
  },
  {
    id: 3,
    title: `UI/UX Design`,
    link: ``,
    img: wrk3,
  },
  {
    id: 4,
    title: `Graphic Design`,
    link: ``,
    img: wrk4,
  },
  {
    id: 5,
    title: `Web Development`,
    link: ``,
    img: wrk5,
  },
  {
    id: 1,
    title: `Illustration`,
    link: ``,
    img: wrk1,
  },
];

const ban1 =
  "https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4";

const Whatwedo = () => {
  return (
    <section className="py-10 xl:py-20" id="serivesect">
      <div className="w-11/12 xl:w-8/12 mx-auto text-center flex flex-col gap-0 pb-14 items-center">
        <h2 className="font-black text-4xl xl:text-8xl uppercase">
          our Services
        </h2>
        <p className="text-gray-600 text-justify md:text-center">
          We provide businesses with an expert team that guides them through
          establishing online marketing strategy. Our areas of expertise include{" "}
          <b>Digital marketing services in Calicut</b>, branding, production,
          website development, package design, and printing design.
        </p>
      </div>
      <div className="bg-black text-white w-11/12 overflow-hidden rounded-3xl xl:rounded-[3rem] p-8 sm:p-10 mx-auto grid grid-cols-1 xl:grid-cols-3 gap-5 xl:gap-10 relative">
        <div className="z-20 flex flex-col h-full justify-center gap-3 xl:gap-10 xl:text-right">
          {[
            {
              title: "branding",
              description:
                "Our branding services are designed to create a strong, memorable identity for your business.",
              link: "/our-works/branding",
            },
            {
              title: "digital marketing",
              description:
                "We specialize in SEO, social media marketing, content creation, and more, ensuring your business reaches its target audience effectively and drives meaningful engagement.",
              link: "/our-works/creatives",
            },
            {
              title: "website development",
              description:
                "We specialize in creating custom websites that are visually engaging and functionally robust.",
              link: "/our-works/web-design",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="relative group flex flex-col gap-1 xl:gap-3 uppercase transform transition-all duration-300 hover:scale-105"
            >
              <Link href={service.link}>
                <p className="text-xl md:text-3xl xl:text-5xl font-black hover:text-primarygreen">
                  {service.title}
                </p>
                <p className="text-[10px] sm:text-xs capitalize text-gray-300 text-justify xl:text-right font-extralight">
                  {service.description}
                </p>
                <span className="absolute right-0 -bottom-8 text-xs xl:text-sm text-gray-200  p-1  rounded-xl  flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                  Explore{" "}
                  <span className="material-icons">
                    <MdKeyboardDoubleArrowRight />
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
        <div className="opacity-40 xl:opacity-100 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] z-10 xl:relative xl:flex justify-center items-center">
          <video
            className="h-full w-full xl:aspect-square"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src="https://res.cloudinary.com/djswkzoth/video/upload/v1724923136/Do%20Studio%20Website/WhatsApp_Video_2024-08-26_at_11.26.40_940f4270_qahxvn.mp4"
              type="video/mp4"
            />
          </video>
        </div>
        <div className="z-20 flex flex-col h-full justify-center gap-3 xl:gap-10 text-left">
          {[
            {
              title: "production",
              description:
                "A team of dedicated people focusing on delivering top-quality service, ensuring every project is executed with precision and efficiency.",
              link: "",
            },
            {
              title: "print design",
              description:
                "We help design all your marketing materials, ensuring a consistent look and feel across all print items.",
              link: "our-works/print-design",
            },
            {
              title: "package design",
              description:
                "We blend creativity with strategic thinking to ensure your packaging not only stands out on the shelf but also resonates with your target audience, driving sales and brand loyalty.",
              link: "our-works/package-design",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="relative group flex flex-col gap-1 xl:gap-3 uppercase transform transition-all duration-300 hover:scale-105"
            >
              <Link href={service.link}>
                <p className="text-xl md:text-3xl xl:text-5xl font-black hover:text-primarygreen">
                  {service.title}
                </p>
                <p className="text-[10px] sm:text-xs capitalize text-gray-300 text-justify xl:text-left font-extralight">
                  {service.description}
                </p>
                <span className="absolute left-0 -bottom-8 text-xs xl:text-sm text-gray-200  p-1  rounded-xl  flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:cursor-pointer">
                  Explore{" "}
                  <span className="material-icons">
                    <MdKeyboardDoubleArrowRight />
                  </span>
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whatwedo;

{
  /* <h2 className="text-6xl font-normal">production</h2>
<p className="text-xs capitalize text-gray-00">Comprehensive Company Services</p> */
}
