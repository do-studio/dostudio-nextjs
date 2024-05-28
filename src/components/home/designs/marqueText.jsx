"use client"
import Marquee from "react-fast-marquee";

const MarqueText = () => {
  return (
    <div>
           <Marquee
            speed={200}
             className="overflow-hidden py-10 xl:py-[50px]">
              <p className="font-medium text-7xl xl:text-[170px] m-0">Let your brand stand out from the crowd. </p>
            </Marquee>
    </div>
  )
}

export default MarqueText