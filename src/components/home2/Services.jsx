import Link from "next/link";
import React from "react";
import { arrow,star1 } from "../../../public/images/elements";
import Image from "next/image";

const servicesData = [
  {
    title: "BRANDING",
    description:
      "BORROW OUR MINDS, VALIDATE YOUR IDEAS, SEE IF WEBFLOW IS THE RIGHT FIT",
    alignRight: false,
  },
  {
    title: "DIGITAL MARKETING",
    description: "CREATIVE AND USER-CENTRIC DESIGNS TO ELEVATE YOUR BRAND",
    alignRight: true,
  },
  {
    title: "WEBSITE DEVELOPMENT",
    description: "FULL-STACK DEVELOPMENT FOR SCALABLE WEB APPLICATIONS",
    alignRight: false,
  },
  {
    title: "PACKAGE DESIGN",
    description: "STRATEGIC MARKETING TO BOOST YOUR ONLINE PRESENCE",
    alignRight: true,
  },
  {
    title: "PRODUCTION",
    description: "RELIABLE CUSTOMER SUPPORT TO ENSURE YOUR SUCCESS",
    alignRight: false,
  },
  {
    title: "PRINT DESIGN",
    description: "STRATEGIC MARKETING TO BOOST YOUR ONLINE PRESENCE",
    alignRight: true,
  },
];

const Services = () => {
  return (
    <section className="bg-mainclr2 text-white relative overflow-hidden">
      {/*  */}
        <Image className="absolute left-10 bottom-0 w-32 h-32 xl:w-80 xl:h-80" src={star1} alt=""/>
      <div className="opacity-50 absolute -left-[40%] top-40 xl:top-0 w-full h-full object-contain">
        <video
          className="scale-125 md:scale-100 w-full h-full"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://cdn.sanity.io/files/0hjyj1bs/production/c46de572f19d14352ffab2b8a6921493eefe003f.webm"
            type="video/mp4"
          />
          <source
            src="https://cdn.sanity.io/files/0hjyj1bs/production/6c063fce7879c1bfa8d01dcb4d8505125aead1e3.mov"
            type="video/mp4"
          />
        </video>
      </div>
      {/*  */}
      <div className="w-11/12  mx-auto xl:w-10/12 py-10 xl:py-40 relative z-10">
        <h4 className="text-lg uppercase text-right">our services</h4>
        <div className="space-y-10 xl:space-y-5">
          {servicesData.map(({ title, description, alignRight }, index) => (
            <div
              key={index}
              className={`w-full flex flex-col gap-3 ${
                alignRight ? "items-end text-right" : ""
              }`}
            >
              <h2 className="text-4xl xl:text-6xl font-semibold">{title}</h2>
              <p className="w-[3 0%]">{description}</p>
              <Link
                className="group bg-primarygreen text-black px-5 py-3 rounded-full flex gap-2 items-center w-fit"
                href="/"
              >
                <p className="text-xs font-semibold">Learn more</p>
                <div className="relative w-6 h-6">
                  <Image
                    className="scale-75 group-hover:scale-100 duration-200 object-contain"
                    fill
                    src={arrow}
                    alt=""
                  />
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
