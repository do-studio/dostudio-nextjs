'use client';

import Link from 'next/link';
import { useRef, useEffect, useState } from 'react';
// Adjust this import path if your file structure is different
import SmartAutoPlayVideo from './SmartAutoPlayVideo';

const VideoProductionServices = ({ videos }) => {
    const scrollContainerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let animationFrameId;
        let currentScroll = container.scrollLeft;

        const scroll = () => {
            if (!isHovered && container) {
                const maxScroll = container.scrollWidth - container.clientWidth;
                if (currentScroll < maxScroll - 1) {
                    currentScroll += 2; // Auto-scroll speed
                    container.scrollLeft = currentScroll;
                }
            } else if (container) {
                currentScroll = container.scrollLeft;
            }
            animationFrameId = requestAnimationFrame(scroll);
        };

        animationFrameId = requestAnimationFrame(scroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isHovered]);

    if (!videos || videos.length === 0) return null;

    return (
        <div className="w-full overflow-hidden py-16 bg-white">
            <div className="w-full mx-auto">
                <div
                    ref={scrollContainerRef}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onTouchStart={() => setIsHovered(true)}
                    onTouchEnd={() => setIsHovered(false)}
                    // Height is locked here so landscape/portrait videos size themselves correctly
                    className="flex overflow-x-auto gap-6 sm:gap-8 md:gap-12 pb-12 pt-4 px-4 h-[45vh] md:h-[75vh] min-h-[500px] max-h-[800px] [&::-webkit-scrollbar]:hidden"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    <div className="flex-none w-2 md:w-8 lg:w-16"></div>

                    {videos?.map((video, i) => {
                        // Determine if it's landscape based on your data structure
                        const isLandscape = video.type === 'landscape';

                        return (
                            <div
                                key={i}
                                // Width is auto so it stretches based on the child's aspect ratio
                                className="relative flex-none h-full w-auto rounded-3xl overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] transition-transform duration-700 hover:scale-[1.02] bg-gray-900 group"
                            >
                                <SmartAutoPlayVideo
                                    videoSrc={video.src || video}
                                    thumbnailSrc={video.thumb}
                                    isLandscape={isLandscape}
                                />
                            </div>
                        );
                    })}

                    {/* Premium Liquid Fill "See More" Button */}
                    <div className="flex-none flex items-center justify-center w-[60vw] sm:w-[40vw] md:w-[30vw] lg:w-[20vw]">

                        <Link
                            href="/our-works/production"
                            // 1. Added 'relative' and 'overflow-hidden'. Removed the hover:bg class.
                            className="group relative flex flex-col items-center justify-center gap-4 w-full max-w-[220px] h-full rounded-[2.5rem] border border-gray-200 bg-black overflow-hidden transition-all duration-500 shadow-lg hover:shadow-2xl hover:border-primarygreen"
                        >
                            {/* 2. The Expanding Background */}
                            {/* This invisible circle sits exactly behind the button. On hover, it scales up 25x to fill the card. */}
                            <div className="absolute top-[47%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-primarygreen rounded-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] scale-0 group-hover:scale-[25] z-0"></div>



                            {/* 3. The Inner Button */}
                            {/* Added 'relative z-10' so it stays above the expanding background */}
                            <div className="relative z-10 w-16 h-16 rounded-full bg-primarygreen text-black flex items-center justify-center group-hover:scale-110 group-hover:bg-black group-hover:text-white transition-all duration-500 shadow-md">
                                <svg className="w-7 h-7 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                                </svg>
                            </div>


                            {/* 4. The Text */}
                            {/* Added 'relative z-10' to keep it visible, and a slight delay for a smoother color swap */}
                            <span className="relative z-10 text-lg font-semibold text-white group-hover:text-black transition-colors duration-300 delay-100">
                                See More
                            </span>
                        </Link>
                    </div>
                    <div className="flex-none w-2 md:w-8 lg:w-16"></div>
                </div>
            </div>
        </div>
    );
};

export default VideoProductionServices;