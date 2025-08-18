import React from "react";
import { misc1, misc2, misc3, star1 } from "../../../public/images/elements";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const TestimonialData = [
  {
    name: `Haroon Rasheed`,
    design: `Founder of Mywork`,
    link: `https://mywork.company`,
    title: `Creative Marketing Agency In Calicut.`,
    descrption: `Do Studio is hands down the best creative marketing agency in Calicut. Their creativity and strategic approach
    have helped us achieve remarkable results in our marketing campaigns.`,
    bg:`#aa98f3`
  },
  {
    name: `Neshma Abdurrahman`,
    design: `Founder of Design Dialects`,
    link: `https://designdialects.com`,
    title: `Creative Marketing Agency in Calicut`,
    descrption: `Their out-of-the-box ideas and innovative campaigns have helped us stand out in a crowded market, generating significant brand awareness.Do Studio is a truly creative marketing agency in Calicut.`,
    bg:`#3098fb`
  },
  {
    name: `MC Nasar`,
    design: `Chairman and Managing director of MCKKutty`,
    link: `https://mckkutty.com`,
    title: `Do Studio Is Good`,
    descrption: `Do Studio is good. They have consistently delivered exceptional designs and marketing solutions that have exceeded our expectations. We highly recommend their services.`,
    bg:`#f398c1`
  },
  {
    name: `Arshad`,
    design: `Founder of Baleni`,
    link: `https://baleni.in`,
    title: `Dedicated Agency for marketing`,
    descrption: `Do Studio is a dedicated agency for marketing. They go above and beyond to understand our goals and objectives, delivering tailored solutions that have yielded fantastic results. Their commitment is truly commendable.`,
    bg:`#aa98f3`
  },
  {
    name: `Ar. Siraj`,
    design: `Founder and Chief Architect of Sacred Saga`,
    link: `https://sacred-saga.com`,
    title: `Professionals in advertising and Digital marketing`,
    descrption: `We have been working with Do Studio for our advertising and digital marketing needs, and they have consistently exceeded our expectations.`,
      bg:`#3098fb`
  },
  {
    name: `Shanab`,
    design: `Founder of Plum stories`,
    link: `https://plumstories.com`,
    title: `Best Marketing Agency in Calicut`,
    descrption: `Do studio is one of Calicut's best marketing agency. Engaging with such positive and skilled people has been a beautiful experience.`,
  bg:`#f398c1`
  },
];

const Testimonials = () => {
  return (
    <section className="bg-mainclr2 text-white py-60 relative overflow-hidden">
      {/*  */}
      <Image
        className="absolute -left-20 top-0 w-32 h-32 xl:w-80 xl:h-80"
        src={star1}
        alt=""
      />
    <div className="opacity-30 absolute -right-60 top-32 w-full h-full object-contain">
        <video className="scale-125 md:scale-100 w-full h-full" autoPlay loop muted playsInline>
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
      <div className="w-11/2 xl:w-10/12 mx-auto">
        <h4 className="text-lg uppercase pt-10">Testimonials</h4>
        <h2 className="text-primarygreen text-3xl xl:text-7xl font-semibold">
          CLIENT
          <br />
          EXPERIENCES
        </h2>
      </div>
      {/* Testimonials */}
    <div className="mt-10">
        <Marquee pauseOnHover speed={50}>
          {TestimonialData.map((dt, i) => (
            <div
              className="mt-5 text-black font-medium mx-3 w-[300px] xl:w-[600px] relative rounded-3xl"
              key={i}
              style={{ backgroundColor: dt.bg }} // Dynamic background color here
            >
              <div className="duration-200 flex flex-col gap-4 p-10 rounded-3xl bg-opacity-90">
                <p className="xl:text-lg">{dt.descrption}</p>
                <p className="text-[10px] italic xl:text-sm">
                  {dt.name} /{" "}
                  <a
                    href={dt.link}
                    className="text-[10px] xl:text-xs underline"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {dt.design}
                  </a>
                </p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>
      {/* Testimonials */}
    </section>
  );
};

export default Testimonials;
