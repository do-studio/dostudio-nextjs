import React from "react";
import Marquee from "react-fast-marquee";
import { ClientsData } from "../../constant/data";
import Image from "next/image";

const Clientslider = () => {
  return (
    <div className="w-12/12 xl:w-10/12 mx-auto py-20">
        <h1 className="text-4xl md:text-7xl xl:text-9xl  font-extrabold pb-10 text-black text-center">
         Our clients
        </h1>
      <Marquee speed={100}>
        {ClientsData?.map((data,i) => (
          <Image
          key={i}
            className="h-16 w-16 md:h-32 md:w-32 xl:h-48 xl:w-48 object-contain grayscale hover:grayscale-0 duration-200 cursor-pointer"
            placeholder="blur"
            src={data.clt}
            alt="sa"
          />
        ))}
      </Marquee>
      <div className="grid place-items-center mt-5">
        <button className="btn-21"><span>Load More</span></button>
      </div>
    </div>
  );
};

export default Clientslider;
