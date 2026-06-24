"use client";

import React, { useState } from 'react'
import { wrk1, wrk2, wrk3, wrk4, wrk5, WRK1, WRK2 } from "../../../../public/images";
import Image from "next/image";

const THUMBNAIL_URL = "https://cdn.sanity.io/images/0hjyj1bs/production/0d28e89f73a2a367aac1e118ea01b5e57351d50b-2910x1642.webp";
const VIDEO_URL = "https://cdn.sanity.io/files/0hjyj1bs/production/ab59f30ca814b5219de9031294041f1f0fc2bbe1.mp4";

const ourWorks3 = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (
        <div className='w-11/12 xl:w-10/12 mx-auto flex flex-col gap-1 xl:gap-5'>
            {/* Top larger rectangle */}


            {/* Bottom three squares */}
            <div className='grid grid-cols-3 gap-1 xl:gap-5'>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://cdn.sanity.io/images/0hjyj1bs/production/26263b2fb09094b6ea0e74a98e205f52db4ab6fc-3143x2200.webp'} alt='Best advertising agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://cdn.sanity.io/images/0hjyj1bs/production/12c8481a2db6f7d046a7d8b714dd2c6dc63b3ab5-1080x1080.jpg'} alt='Digital marketing agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://cdn.sanity.io/images/0hjyj1bs/production/cca6d0d67136baa99ea68e1cf4a09f96b9d41f0e-2235x2235.webp'} alt='Branding company in calicut' />
                </div>
            </div>
            <div className='w-full aspect-[4/2] relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                {/* Thumbnail shown while video loads */}
                <Image
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, 100vw"
                    src={THUMBNAIL_URL}
                    alt="Do Studio showreel thumbnail"
                    priority
                    style={{
                        position: 'absolute',
                        zIndex: 1,
                        opacity: videoLoaded ? 0 : 1,
                        transition: 'opacity 0.5s ease-in-out',
                        pointerEvents: 'none',
                    }}
                />
                <video className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    loop
                    muted
                    poster={THUMBNAIL_URL}
                    onCanPlay={() => setVideoLoaded(true)}
                >
                    <source src={VIDEO_URL} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

export default ourWorks3