'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';

const SmartAutoPlayVideo = ({ videoSrc, thumbnailSrc, isLandscape = false }) => {
    const videoRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;
        const containerElement = containerRef.current;
        if (!videoElement || !containerElement) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    // 1. When near screen, load and play
                    if (!videoElement.src || videoElement.src === window.location.href) {
                        videoElement.src = videoElement.getAttribute('data-src');
                        videoElement.play().catch(() => {});
                    }
                } else {
                    // 2. When leaving screen, flush from memory completely
                    videoElement.pause();
                    videoElement.removeAttribute('src'); 
                    videoElement.load(); 
                }
            },
            { 
                rootMargin: '0px 400px 0px 400px', 
                threshold: 0 
            }
        );

        observer.observe(containerElement);

        return () => {
            if (containerElement) observer.unobserve(containerElement);
        };
    }, []);

    return (
        <div 
            ref={containerRef} 
            // Swaps between 16:9 (Landscape) and 9:16 (Portrait) based on the prop
            className={`relative h-full bg-black transform-gpu ${isLandscape ? 'aspect-video' : 'aspect-[9/16]'}`}
        >
            {thumbnailSrc && (
                <Image 
                    src={thumbnailSrc} 
                    alt="Video thumbnail" 
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 30vw"
                    className="object-cover"
                />
            )}

            <video
                ref={videoRef}
                data-src={videoSrc}
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-cover z-10 will-change-[auto]"
                style={{ WebkitTransform: 'translateZ(0)' }}
            />
        </div>
    );
};

export default SmartAutoPlayVideo;