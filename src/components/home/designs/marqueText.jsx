"use client"
import Marquee from "react-fast-marquee";
import {doicnwh,doicnbl,doicn} from '../../../../public/images/index'
import Image from "next/image";
const MarqueText = () => {
  return (
    <div className="grid grid-cols-4">
           <Marquee
            speed={200}
             className="col-span-3 overflow-hidden py-10 xl:py-[50px]">
              <p className="font-medium text-7xl xl:text-[150px] m-0">Let your brand stand out from the crowd. </p>
            </Marquee>
            <div className="relative ">
                <Image className="object-cover"  fill={true} src={doicn}></Image>
            </div>
    </div>
  )
}

export default MarqueText