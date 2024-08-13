"use client"
import Marquee from "react-fast-marquee";
import {doicnwh,doicnbl,doicn} from '../../../../public/images/index'
import Image from "next/image";
const MarqueText = () => {
  return (
    <div className="grid grid-cols-4 place-items-center overflow-hidden">
           <Marquee
            speed={200}
             className="col-span-3 overflow-hidden py-10 xl:py-[50px]">
              <p className="font-medium text-7xl xl:text-[150px] m-0">Let your brand stand out from the crowd. </p>
            </Marquee>
            <div className="relative h-10 w-20 xl:h-48 xl:w-72">
                <Image className="object-cover" placeholder="blur"  fill={true} src={doicn}></Image>
            </div>
    </div>
  )
}

export default MarqueText