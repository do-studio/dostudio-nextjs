import React from 'react'
import { wrk1, wrk2, wrk3, wrk4, wrk5 ,WRK1,WRK2} from "../../../../public/images";
import Image from "next/image";

const ourWorks2 = () => {
  return (
    <div className='w-11/12 xl:w-10/12 mx-auto grid grid-cols-3 gap-1 xl:gap-5 '>
        <div className='grid grid-cols-1 gap-1 xl:gap-5'>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
            <Image className="object-cover" fill src={'https://res.cloudinary.com/djswkzoth/image/upload/v1723643685/Untitled_3_ea53cc9f92.gif'}/> 
            </div>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <Image className="object-cover"  fill src={'https://res.cloudinary.com/djswkzoth/image/upload/v1724307336/eras_bbq_cashew_fb1253009f.webp'}/>
            </div>
        </div>
        <div>
            <div className='h-full relative bg-[#b3ed00] grid place-items-center rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
            <video className="w-full h-full  object-contain" autoPlay loop muted>
                    <source src={'https://res.cloudinary.com/djswkzoth/video/upload/v1724335136/Do%20Studio%20Website/homebg_zhmwmc.mp4'} type="video/mp4" />
                    Your browser does not support the video tag.
            </video>
            </div>
        </div>
        <div className='grid grid-cols-1 gap-1 xl:gap-5'>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
                <Image className="object-cover" fill src={'https://res.cloudinary.com/djswkzoth/image/upload/v1724307353/Box_de97efa345.webp'}/>
            </div>
            <div className='aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200'>
            <Image className="object-cover"  fill src={'https://res.cloudinary.com/djswkzoth/image/upload/v1723893754/gifmaker_me_3_e8ab6b9966.gif'}/>
            </div>
        </div>
    </div>
  )
}

export default ourWorks2