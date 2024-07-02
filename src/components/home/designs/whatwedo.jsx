"use client"
import Image from "next/image";
import React from "react";
import { wrk1, wrk2, wrk3, wrk4, wrk5 ,WRK1,WRK2} from "../../../../public/images";
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
    <section className={`bg-white`}>
      <h1 className="text-4xl md:text-7xl xl:text-9xl  font-extrabold  pb-10 text-black text-center">What We DO</h1>
      <div className="grid grid-cols-2">
      <Image className='h-40 xl:h-96' placeholder="blur" src={WRK1} alt="sa"/>
      <Image className='h-40 xl:h-96' placeholder="blur" src={WRK2} alt="sa"/>
      <Image className='h-40 xl:h-96' placeholder="blur" src={WRK2} alt="sa"/>
      <Image className='h-40 xl:h-96' placeholder="blur" src={WRK1} alt="sa"/>
      </div>
    </section>
  );
};

export default Whatwedo;
