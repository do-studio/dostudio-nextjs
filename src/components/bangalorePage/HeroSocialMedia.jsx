"use client";

import { FaArrowRight } from "react-icons/fa";

export default function HeroSection({
    title,
    highlight,
    description,
    buttonText = "Contact Now",
    buttonLink = "#",
    image,
}) {
    return (
        <section
            className="relative min-h-screen flex flex-col items-center justify-center text-center px-6"
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/60"></div>

            {/* Hero Content */}
            <div className="relative z-10 flex flex-col items-center text-center max-w-5xl">
                <h2 className="text-4xl md:text-5xl xl:text-7xl font-black text-white leading-tight uppercase">
                    {title}
                    {highlight && (
                        <>
                            <br />
                            <span className="text-primarygreen">{highlight}</span>
                        </>
                    )}
                </h2>

                {description && (
                    <p className="text-gray-200 mt-6 text-lg md:text-xl max-w-3xl">
                        {description}
                    </p>
                )}

                {buttonText && (
                    <a
                        href={buttonLink}
                        className="mt-8 bg-primarygreen text-gray-900 font-semibold px-6 py-3 rounded-full flex items-center space-x-2 hover:bg-primarygreenhvr transition"
                    >
                        <span>{buttonText}</span>
                        <FaArrowRight />
                    </a>
                )}
            </div>
        </section>
    );
}
