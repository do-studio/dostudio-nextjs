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
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://res.cloudinary.com/dzbc1oqbq/image/upload/v1751694774/RC__gwub3x.webp'} alt='Best advertising agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://res.cloudinary.com/dzbc1oqbq/image/upload/v1751695662/lulu-thudarum_kfgkdm.webp'} alt='Digital marketing agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={' https://res.cloudinary.com/dzbc1oqbq/image/upload/v1751695097/PEEKAY_HOARDING_NOV_MOCKUP_0_agaesy.webp'} alt='Branding company in calicut' />
                </div>
            </div>
            <div className='w-full aspect-[4/2] relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <video className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    loop
                    muted
                >
                    <source src={`https://res.cloudinary.com/dzbc1oqbq/video/upload/v1751694816/AO_TECH_CAMPAIGN_Theatre_AD_fgjqwk_fkhjhx.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

export default ourWorks3