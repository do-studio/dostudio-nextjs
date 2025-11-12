"use client";

import { FaArrowRight } from "react-icons/fa";

export default function SocialMediaServices({ services }) {

    return (
        <section className="bg-white py-20 px-6 md:px-20 text-center relative overflow-hidden">
            {/* Background gradient */}
            {/* <div className="absolute right-0 bottom-0 w-1/3 h-1/3 bg-yellow-200 opacity-30 blur-3xl rounded-full"></div> */}

            {/* Title */}
            <div className="relative z-10">
                {/* <p className="text-gray-500 text-sm tracking-wide mb-2">Services</p> */}
                <h2 className="text-5xl xl:text-6xl font-bold text-black uppercase">
                    {services.heading}  <br />
                    <span className="text-primarygreen">  {services.highlight}</span>
                </h2>
                <p className="text-gray-500 mt-4 md:max-w-3xl mx-auto">
                   {services.description}
                </p>
            </div>d

            {/* Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mt-16 relative z-10">
                {services?.services?.map((service, i) => (
                    <div
                        key={i}
                        className="flex flex-col items-start justify-between text-left group"
                    >
                        {/* Number Badge */}
                        <div className="flex items-center space-x-3">
                            <span className="bg-primarygreen text-black font-bold text-lg rounded-full px-4 py-1">
                                {i + 1}
                            </span>
                        </div>

                        {/* Divider */}
                        <div className="w-full h-[2px] bg-black mt-3 mb-5"></div>

                        {/* Title */}
                        <p className="text-2xl font-semibold text-gray-800 leading-snug min-h-[60px]">
                            {service.title}
                        </p>

                        <p>
                            {service.desc}
                        </p>

                        {/* Explore link */}
                        <a
                            href="#"
                            className="mt-4 flex items-center text-black font-semibold hover:text-yellow-400 transition-all"
                        >
                            EXPLORE
                            <FaArrowRight className="ml-2 text-black group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
