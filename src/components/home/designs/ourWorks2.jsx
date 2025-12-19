import React from 'react'
import { wrk1, wrk2, wrk3, wrk4, wrk5, WRK1, WRK2 } from "../../../../public/images";
import Image from "next/image";

const ourWorks2 = () => {
    return (
        <div className='w-11/12 xl:w-10/12 mx-auto grid grid-cols-3 gap-1 xl:gap-5 '>
            <div className='grid grid-cols-1 gap-1 xl:gap-5'>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <video className="w-full h-full  object-contain"
                        autoPlay
                        playsInline
                        loop
                        muted
                    >
                        <source src={`https://cdn.sanity.io/files/0hjyj1bs/production/7cec8e027fe325232f1536246aebeed6bbd87653.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    {/* <Image className="object-cover" fill src={'https://cdn.sanity.io/images/0hjyj1bs/production/cb890df9c3750946a2c153b88c22c169b4471f0a-400x225.gif'} alt='Best advertising agency in Calicut' /> */}
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://cdn.sanity.io/images/0hjyj1bs/production/0f732a7997f27af7177330acca91aace62fefcf2-3000x3000.webp'} alt='Digital marketing agency in Calicut' />
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
                        <source src={`https://cdn.sanity.io/files/0hjyj1bs/production/82985bdb3ff8d01b8a72ce841e0a991fb8597aff.mp4`} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
            <div className='grid grid-cols-1 gap-1 xl:gap-5'>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://cdn.sanity.io/images/0hjyj1bs/production/5e5e4f2360f829430e8f4f5be64f43c4ed235d95-4000x4000.webp'} alt='Branding company in calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill src={'https://cdn.sanity.io/images/0hjyj1bs/production/949746ea727de4852ba1ae904ab8411444bdd408-3840x2560.webp'} alt='Website developement company in Calicut' />
                </div>
            </div>
        </div>
    )
}

export default ourWorks2