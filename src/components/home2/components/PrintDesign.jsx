"use client";
import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { arrow } from "../../../../public/images/elements";
import Image from "next/image";

const PrintData = [
  {
    id: 1,
    title: "Innovative Design",
    button: "Explore",
    image:
      "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: 2,
    title: "Creative Branding",
    button: "Learn More",
    image:
      "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: 3,
    title: "Modern Identity",
    button: "Get Started",
    image:
      "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: 4,
    title: "Strategic Marketing",
    button: "Discover",
    image:
      "https://images.pexels.com/photos/3183199/pexels-photo-3183199.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
  {
    id: 5,
    title: "Creative Solutions",
    button: "Join Now",
    image:
      "https://images.pexels.com/photos/3182780/pexels-photo-3182780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  },
];

const PrintDesign = () => {
  const [hoveredId, setHoveredId] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  return (
    <div className="w-full overflow-hidden">
      <h2 className="text-4xl font-semibold uppercase">Package Design</h2>
      <p className="pb-5 text-gray-600 w-[60%]">
        we take pride in our ability to transform brands into visual
        masterpieces that resonate with audiences worldwide.
      </p>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        spaceBetween={10}
        slidesPerView={3}
        breakpoints={{
          320: { slidesPerView: 1 },
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        modules={[Autoplay]}
        autoplay={{
          delay: 1500,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
      >
        {PrintData.map((item) => (
          <SwiperSlide key={item.id}>
            <div
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              className="relative cursor-pointer w-full border rounded-3xl overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-[9/16] object-cover"
              />
              <div
                className={`absolute bg-white rounded-t-3xl bottom-0 left-0 right-0  p-4 transition-transform duration-300 ${
                  hoveredId === item.id ? "translate-y-0" : "translate-y-full"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {item.title}
                </h3>
                <button className="mt-2 text-xs capitalize px-5 py-2 rounded-full w-fit  bg-[#AFFE00] transition">
                  {item.button.toLowerCase()}
                </button>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

     {/* Custom Pagination with arrows on both sides */}
      <div className="flex justify-center items-center mt-5 gap-5">
        {/* Left arrow */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Previous slide"
          className="scale-x-[-1]"
        >
          <Image className="object-contain w-full h-full" src={arrow} alt="" />
        </button>

        {/* Pagination dots */}
        <div className="flex items-center gap-2">
          {PrintData.map((item, index) => (
            <button
              key={item.id}
              className={`rounded-full transition duration-200 ${
                index === activeIndex
                  ? "bg-[#AFFE00] w-4 h-2"
                  : "bg-gray-300 w-2 h-2 hover:bg-gray-400"
              }`}
              onClick={() => swiperRef.current?.slideToLoop(index)}
              aria-label={`Go to slide ${index + 1}`}
              title={item.title}
            />
          ))}
        </div>

        {/* Right arrow */}
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Next slide"
          className=""
        >
          <Image className="object-contain w-full h-full" src={arrow} alt="" />
        </button>
      </div>
      {/* Custom Pagination with arrows on both sides */}

    </div>
  );
};

export default PrintDesign;
