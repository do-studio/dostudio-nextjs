"use client"
import Image from "next/image";
import React from "react";
import { wrk1, wrk2, wrk3, wrk4, wrk5 ,WRK1,WRK2} from "../../../../public/images";
import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
const OurService = [
  {
    id:1,
    title:`Illustration`,
    link:``,
    img:wrk1
  },
  {
    id:2,
    title:`Brand Design`,
    link:``,
    img:wrk2
  },
  {
    id:3,
    title:`UI/UX Design`,
    link:``,
    img:wrk3
  },
  {
    id:4,
    title:`Graphic Design`,
    link:``,
    img:wrk4
  },
  {
    id:5,
    title:`Web Development`,
    link:``,
    img:wrk5
  },
  {
    id:1,
    title:`Illustration`,
    link:``,
    img:wrk1
  },
]

const ban1 = 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4'


const Whatwedo = () => {
  return (
    <section className='py-10 xl:py-20'>
      <div className="bg-black text-white  w-11/12  overflow-hidden rounded-[3rem] p-8 sm:p-10 mx-auto grid grid-cols-2 xl:grid-cols-3 gap-10">
          <div className="flex flex-col gap-10 md:text-right">
            <div className="flex flex-col gap-1 xl:gap-3 uppercase">
              <h2 className="text-lg sm:text-xl md:text-3xl xl:text-5xl font-black">branding</h2>
              <p className="text-[10px] sm:text-xs capitalize text-gray-300 font-extralight">Lorem ipsum dolor sit amet<br className="hidden md:block"/> consectetur adipisicing elit. Ab, quod.</p>
            </div>
            <div className="flex flex-col gap-1 xl:gap-3 uppercase">
              <h2 className="text-lg sm:text-xl md:text-3xl xl:text-5xl font-black">digital<br className="hidden md:block"/> marketing</h2>
              <p className="text-[10px] sm:text-xs capitalize text-gray-300 font-extralight">Lorem ipsum dolor sit amet<br className="hidden md:block"/> consectetur adipisicing elit. Ab, quod.</p>
            </div>
            <div className="flex flex-col gap-1 xl:gap-3 uppercase">
              <h2 className="text-lg sm:text-xl md:text-3xl xl:text-5xl font-black">website development</h2>
              <p className="text-[10px] sm:text-xs capitalize text-gray-300 font-extralight">Lorem ipsum dolor sit amet<br className="hidden md:block"/> consectetur adipisicing elit. Ab, quod.</p>
            </div>
          </div>
          <div className="hidden md:flex justify-center items-center">
              <video
                    className="aspect-square"
                    autoPlay
                    loop
                    muted
                    playsInline
                >
                    <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723110687/Do%20Studio%20Website/DO_STUDIO_LOGO_3-1_pevafw.mov' type="video/mp4" />
                    <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723110686/Do%20Studio%20Website/DO_STUDIO_LOGO_webm_piqdkl.webm' type="video/mp4" />
                </video>
          </div>
          <div className="flex flex-col gap-10 text-left">
            <div className="flex flex-col gap-1 xl:gap-3 uppercase">
              <h2 className="text-lg sm:text-xl md:text-3xl xl:text-5xl font-black">production</h2>
              <p className="text-[10px] sm:text-xs capitalize text-gray-300 font-extralight">Lorem ipsum dolor sit amet<br className="hidden md:block"/> consectetur adipisicing elit. Ab, quod.</p>
            </div>
            <div className="flex flex-col gap-1 xl:gap-3 uppercase">
              <h2 className="text-lg sm:text-xl md:text-3xl xl:text-5xl font-black">print<br className="hidden md:block"/> design</h2>
              <p className="text-[10px] sm:text-xs capitalize text-gray-300 font-extralight">Lorem ipsum dolor sit amet<br className="hidden md:block"/> consectetur adipisicing elit. Ab, quod.</p>
            </div>
            <div className="flex flex-col gap-1 xl:gap-3 uppercase">
              <h2 className="text-lg sm:text-xl md:text-3xl xl:text-5xl font-black">package<br className="hidden md:block"/> design</h2>
              <p className="text-[10px] sm:text-xs capitalize text-gray-300 font-extralight">Lorem ipsum dolor sit amet<br/> consectetur adipisicing elit. Ab, quod.</p>
            </div>
          </div>
      </div>

      
    </section>
  );
};

export default Whatwedo;


{/* <h2 className="text-6xl font-normal">production</h2>
<p className="text-xs capitalize text-gray-00">Comprehensive Company Services</p> */}