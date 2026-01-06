"use client"

import Link from 'next/link';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Navigation } from 'swiper/modules';

export default function WorkSlider({ works, link }) {

    if (!works || works.length === 0) {
        return null;
    }

    return (
        <section className="bg-white py-12 md:py-24 overflow-hidden">
            <div className="w-11/12 xl:w-10/12 mx-auto flex items-center justify-between mb-10">
                <h4 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight uppercase text-black">
                    Works
                </h4>

                {/* 🔥 Button to Visit All Branding Works Page */}
                <Link
                    href={link}
                    className="
    relative overflow-hidden 
    text-sm md:text-base font-medium 
    bg-primarygreen text-black 
    py-3 px-6 rounded-full
    transition-all duration-500
    group
  "
                >
                    <span
                        className="
      absolute inset-0 
      bg-black 
      translate-x-[-100%] 
      group-hover:translate-x-0
      transition-transform duration-500 
    "
                    ></span>

                    <span
                        className="
      relative z-10 
      transition-colors duration-500 
      group-hover:text-white
    "
                    >
                        View All Works →
                    </span>
                </Link>

            </div>

            <div className="relative pb-20">
                <Swiper
                    modules={[Navigation]}
                    className="work-swiper"
                    spaceBetween={40}
                    slidesPerView={'auto'}
                    centeredSlides={false}
                    navigation={{
                        prevEl: '.swiper-button-prev-custom',
                        nextEl: '.swiper-button-next-custom',
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 1.5,
                            spaceBetween: 30,
                        },
                        1024: {
                            slidesPerView: 2.5,
                            spaceBetween: 50,
                        },
                    }}
                >
                    {works.map((item, id) => (
                        <SwiperSlide
                            key={id}
                            className="!w-[85vw] md:!w-[45vw] lg:!w-[40vw] pb-12"
                        >
                            <Link href={item.link} className="block group">
                                <div className="relative aspect-square rounded-xl shadow-xl overflow-hidden">
                                    <Image
                                        src={item.image}
                                        alt={`work${id}`}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                        sizes="85vw"
                                        priority={id === 1}
                                    />
                                </div>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>

                <div className="absolute right-8 bottom-8 z-10 flex space-x-4">
                    <button className="swiper-button-prev-custom text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                        &larr;
                    </button>
                    <button className="swiper-button-next-custom text-white bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors">
                        &rarr;
                    </button>
                </div>
            </div>
        </section>
    );
}
