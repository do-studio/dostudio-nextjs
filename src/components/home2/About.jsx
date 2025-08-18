import React from "react";
import { arrow1,arrow2 } from "../../../public/images/elements/index";
import Image from "next/image";

const About = () => {
  return (
    <section className="bg-white text-black overflow-hidden">
      <div className="w-11/12 mx-auto xl:w-10/12 grid grid-cols-1 md:grid-cols-2 gap-20 py-10 xl:pb-20 relative">
      {/*  */}
        <Image className="absolute left-20 -top-5 xl:top-20 w-32 h-32 xl:w-60 xl:h-60" src={arrow1} alt=""/>
        <Image className="absolute right-0 xl:left-0 top-80 xl:top-auto xl:bottom-0 w-32 h-32 xl:w-60 xl:h-60" src={arrow2} alt=""/>
      {/*  */}
      {/*  */}
      <div className="opacity-70 absolute -right-1/2 top-40 xl:-top-20 w-full h-full object-contain">
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
        <div className=" xl:py-40">
          <h4 className="text-lg uppercase pb-10">about us</h4>
          <div className="bg-gray-300 aspect-video rounded-[2rem] shadow-md xl:-rotate-6"></div>
        </div>
        <div className="flex flex-col gap-3 justify-center font-semibold relative">

          <h3 className="text-3xl xl:text-6xl">ONE YEAR OF</h3>
          <h3 className="text-primarygreen text-3xl xl:text-7xl">
            AWARD
            <br />
            WINNING
          </h3>
          <h3 className="text-3xl xl:text-6xl">EXCELLENCE</h3>
          <p className="font-normal">
            exceptional commitment to pushing the boundaries of creativity and
            innovation in the industry.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
