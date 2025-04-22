import React from 'react'
import { wrk1, wrk2, wrk3, wrk4, wrk5, WRK1, WRK2 } from "../../../../public/images";
import Image from "next/image";

const ourWorks3 = () => {
    return (
        <div className='w-11/12 xl:w-10/12 mx-auto flex flex-col gap-1 xl:gap-5'>
        {/* Top larger rectangle */}
      
        
        {/* Bottom three squares */}
        <div className='grid grid-cols-3 gap-1 xl:gap-5'>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <Image className="object-cover" fill src={'https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745321363/RC__odnquq.webp'} alt='Best advertising agency in Calicut' />
            </div>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <Image className="object-cover" fill src={'https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745324138/pack_mockup_ptplau.webp'} alt='Digital marketing agency in Calicut' />
            </div>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <Image className="object-cover" fill src={'https://res.cloudinary.com/ddv3f8yl2/image/upload/v1745327746/pack_3_cxqkhz.webp'} alt='Branding company in calicut' />
            </div>
        </div>
        <div className='w-full aspect-[4/2] relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
            <video className="w-full h-full object-cover"
                autoPlay
                playsInline
                loop
                muted
            >
                <source src={`https://res.cloudinary.com/ddv3f8yl2/video/upload/v1745320563/AO_TECH_CAMPAIGN_Theatre_AD_fgjqwk.mp4`} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        </div>
    </div>
    )
}

export default ourWorks3