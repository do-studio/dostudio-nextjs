"use client"
import Image from "next/image";
import React from "react";
import { wrk1, wrk2, wrk3, wrk4, wrk5 } from "../../../../public/images";
import Link from "next/link";

const Ourworks = [
  {
    image:wrk1,
    title:`Heading`,
    url:`#`,
    color:'green'
  },
  {
    image:wrk2,
    title:`Heading`,
    url:`#`,
    color:'green'
  },
  {
    image:wrk3,
    title:`Heading`,
    url:`#`,
    color:'green'
  },
  {
    image:wrk4,
    title:`Heading`,
    url:`#`,
    color:'green'
  },
  {
    image:wrk5,
    title:`Heading`,
    url:`#`,
    color:'green'
  },
  {
    image:wrk1,
    title:`Heading`,
    url:`#`,
    color:'green'
  },
]

const Whatwedo = () => {
  return (
    <section className={`bg-white py-10`}>
      <h1 className="text-4xl md:text-7xl xl:text-9xl  font-extrabold  pb-10 text-black text-center">What We DO</h1>
      <main className="w-11/12 mx-auto  md:w-full  grid grid-cols-2 md:grid-cols-3 xl:flex lg:flex-row">

          <Link  href={'#'} className={`before:bg-[#b6ff62] flex-1 hover:flex-[1.8] wrk-card h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-full wrk-border group`}>
            <Image fill className=" group-hover:xl:scale-125 duration-200"  placeholder="blur"  src={wrk1} alt="image url" />
            <div className="wrk-overlay">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium absolute bottom-16 -ml-5 lg:bottom-24 xl:bottom-[100px] xl:-ml-8 -rotate-90">Branding</h1>
            </div>
            {/* <span class="one-a"></span>
            <span className="two-a"></span>
            <span className="three-a"></span>
            <span className="four-a"></span> */}
          </Link>
          
          <Link  href={'#'} className={`before:bg-[#2f89ff] flex-1 hover:flex-[1.8] wrk-card h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-full wrk-border group`}>
            <Image fill className=" group-hover:xl:scale-125 duration-200"  placeholder="blur" src={wrk2} alt="image url" />
            <div className="wrk-overlay">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium absolute bottom-20 -ml-8 lg:bottom-32 xl:bottom-[130px] xl:-ml-12 -rotate-90">Web Design</h1>
            </div>
            {/* <span class="one-a"></span>
            <span className="two-a"></span>
            <span className="three-a"></span>
            <span className="four-a"></span> */}
          </Link>

          <Link  href={'#'} className={`before:bg-[#ff7070] flex-1 hover:flex-[1.8] wrk-card h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-full wrk-border group`}>
            <Image fill className=" group-hover:xl:scale-125 duration-200"  placeholder="blur" src={wrk3} alt="image url" />
            <div className="wrk-overlay">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium absolute bottom-[6.5rem] -ml-14 lg:-ml-20 lg:bottom-44 xl:bottom-[170px] xl:-ml-24 -rotate-90">Digital Marketing</h1>
            </div>
            {/* <span class="one-a"></span>
            <span className="two-a"></span>
            <span className="three-a"></span>
            <span className="four-a"></span> */}
          </Link>

          <Link  href={'#'} className={`before:bg-[#eeff6c] flex-1 hover:flex-[1.8] wrk-card h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-full wrk-border group`}>
            <Image fill className=" group-hover:xl:scale-125 duration-200"  placeholder="blur" src={wrk4} alt="image url" />
            <div className="wrk-overlay">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium absolute bottom-20 -ml-8 lg:bottom-32 xl:bottom-[120px] xl:-ml-10 -rotate-90">Photoshoot</h1>
            </div>
            {/* <span class="one-a"></span>
            <span className="two-a"></span>
            <span className="three-a"></span>
            <span className="four-a"></span> */}
          </Link>

          <Link  href={'#'} className={`before:bg-[#7cfff6] flex-1 hover:flex-[1.8] wrk-card h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-full wrk-border group`}>
            <Image fill className=" group-hover:xl:scale-125 duration-200"  placeholder="blur" src={wrk5} alt="image url" />
            <div className="wrk-overlay">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium absolute bottom-24 -ml-12 lg:-ml-20 lg:bottom-44 xl:bottom-[160px] xl:-ml-24 -rotate-90">Package Design</h1>
            </div>
            {/* <span class="one-a"></span>
            <span className="two-a"></span>
            <span className="three-a"></span>
            <span className="four-a"></span> */}
          </Link>

          <Link  href={'#'} className={`before:bg-[#ffbf6c] flex-1 hover:flex-[1.8] wrk-card h-[250px] md:h-[350px] lg:h-[450px] xl:h-[500px] w-full wrk-border group`}>
            <Image fill className=" group-hover:xl:scale-125 duration-200"  placeholder="blur" src={wrk1} alt="image url" />
            <div className="wrk-overlay">
              <h1 className="text-xl md:text-2xl lg:text-4xl font-medium absolute bottom-20 -ml-8 lg:bottom-32 xl:bottom-[130px] xl:-ml-12 -rotate-90">Print Design</h1>
            </div>
            {/* <span class="one-a"></span>
            <span className="two-a"></span>
            <span className="three-a"></span>
            <span className="four-a"></span> */}
          </Link>
  
      </main>
    </section>
  );
};

export default Whatwedo;
