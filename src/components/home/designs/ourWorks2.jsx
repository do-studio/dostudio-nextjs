import React from 'react'
import { wrk1, wrk2, wrk3, wrk4, wrk5, WRK1, WRK2 } from "../../../../public/images";
import Image from "next/image";

const ourWorks2 = () => {
    return (
        <div className='w-11/12 xl:w-10/12 mx-auto grid grid-cols-3 gap-1 xl:gap-5 '>
            <div className='grid grid-cols-1 gap-1 xl:gap-5'>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740463699/AO_LOGO_ANIMATION_WHITE_k3l4y4_kpt0id.gif'} alt='Best advertising agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740465057/eras_bbq_cashew_fb1253009f_tzpzld.webp'} alt='Digital marketing agency in Calicut' />
                </div>
            </div>
            <div>
                <div className='h-full relative bg-[#b3ed00] grid place-items-center rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <video className="w-full h-full  object-contain"
                        autoPlay
                        playsInline
                        loop
                        muted
                    >
                        <source src={`https://res.cloudinary.com/djswkzoth/video/upload/v1724413866/Do%20Studio%20Website/homebg_b5bawb.mp4?c_limit=3000&cache=true`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 xl:gap-5'>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://res.cloudinary.com/ddv3f8yl2/image/upload/v1740464660/PEEKAY_HOARDING_NOV_MOCKUP_0_cjynmt_aslgbn.webp'} alt='Branding company in calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://res.cloudinary.com/djswkzoth/image/upload/v1740474072/Billboard_Mockup_2_0c64f46e34.webp'} alt='Website developement company in Calicut' />
                </div>
            </div>
        </div>
    )
}

export default ourWorks2