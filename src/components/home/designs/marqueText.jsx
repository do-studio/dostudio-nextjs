"use client"
import Marquee from "react-fast-marquee";
import {doicnwh,doicnbl,doicn} from '../../../../public/images/index'
import Image from "next/image";
const MarqueText = () => {
  return (
    <div className="grid grid-cols-4 place-items-center overflow-hidden">
           <Marquee
            speed={200}
             className="col-span-3 overflow-hidden py-10 xl:py-20">
              <p className="font-medium text-5xl xl:text-[150px] m-0">Let your brand stand out from the crowd. </p>
            </Marquee>
            <div className="grid place-items-center h-full overflow-hidden">
              <video
                        className="aspect-video -mt-5 xl:-mt-20"
                        autoPlay
                        loop
                        muted
                        playsInline
                    >
                        <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723785713/Do%20Studio%20Website/Horizontal_1_uagnv4.webm' type="video/mp4" />
                        <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723785713/Do%20Studio%20Website/Horizontal_1_uagnv4.webm' type="video/mp4" />
              </video>
            </div>
    </div>
  )
}

export default MarqueText