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
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://cdn.sanity.io/images/0hjyj1bs/production/eaff9bdd2cee8ffb211f182b8fffcbc4e5ff1bd5-2528x2250.webp'} alt='Best advertising agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://cdn.sanity.io/images/0hjyj1bs/production/398b92390f82d7b2ed950ad27114130d0e480ecb-2048x2048.webp'} alt='Digital marketing agency in Calicut' />
                </div>
                <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                    <Image className="object-cover" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" src={'https://cdn.sanity.io/images/0hjyj1bs/production/cca6d0d67136baa99ea68e1cf4a09f96b9d41f0e-2235x2235.webp'} alt='Branding company in calicut' />
                </div>
            </div>
            <div className='w-full aspect-[4/2] relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <video className="w-full h-full object-cover"
                    autoPlay
                    playsInline
                    loop
                    muted
                >
                    <source src={`https://cdn.sanity.io/files/0hjyj1bs/production/c12967a6e9df620f33867dc43a2e94ce2c2b6d5d.mp4`} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
        </div>
    )
}

export default ourWorks3