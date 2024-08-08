"use client";
import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { IoArrowBack ,IoArrowForward } from "react-icons/io5";

import {
  MdKeyboardDoubleArrowLeft,
  MdKeyboardDoubleArrowRight,
} from "react-icons/md";
import { PiQuotesFill } from "react-icons/pi";
import {TestimonialData} from '../../constant/data';

import { getData } from './lib/testimonialApi';



const Testimonials = async () => {
  const [_, setInit] = useState();
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  // const testimonialdataapi = await getData();
 

  return (
    <div className="bg-black text-white">

    <div className="py-10 relative h-full w-12/12 xl:w-10/12 mx-auto overflow-hidden">
    {/* <h1 className="text-4xl md:text-5xl  font-semibold pb-10 text-left">
         Testimonials
      </h1> */}
      <Swiper
        slidesPerView={1}
        loop={true}
        spaceBetween={10}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 60,
          },
        }}
        onInit={() => setInit(true)}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper z-10 w-[90%] mx-auto xl:w-full"
      >
        {/* swiper content */}
        
        {TestimonialData?.map((data,i)=>(
            <SwiperSlide className="text-left space-y-4 relative" key={i}>
                {/* <h3 className="text-2xl xl:text-3xl font-medium">{data.title}</h3> */}
                <div className="relative py-10">
                  <PiQuotesFill className="text-primarygreen text-4xl absolute top-0 left-0 rotate-180"/>
                  <PiQuotesFill className="text-primarygreen text-4xl absolute bottom-0 right-0"/>
                  <p className="text-base xl:text-6xl font-black">{data.descrption}</p>
                </div>
                <p className="text-base">{data.name}</p>
                <a href={data.link} target="_blank"><p className="text-xs">{data.design}</p></a>
            </SwiperSlide>
        ))}
        {/* swiper content */}
      </Swiper>
      {/* Navigations */}
      {/* <div className="hidden w-full xl:flex gap-10 z-20">
        <button className="bg-white text-black w-10 h-10 grid place-items-center rounded-full" ref={prevRef}>
          <IoArrowBack className="text-2xl" />
        </button>
        <button className="bg-white text-black w-10 h-10 grid place-items-center rounded-full" ref={nextRef}>
          <IoArrowForward className="text-2xl" />
        </button>
      </div> */}
    </div>
    
    </div>
  );
};

export default Testimonials;
