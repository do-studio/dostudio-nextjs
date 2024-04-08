"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import Marquee from "react-fast-marquee";

const AnimatePara = () => {
    // const leftText1 = useRef(null);
    // const RightText2 = useRef(null);
    // const slider = useRef(null);
    // let xPercent = 0;
    // let direction = 1;

    // const animation = () => {
    //   if(xPercent <= -100){
    //     xPercent = 0;
    //   }
    //   if(xPercent > 0){
    //     xPercent = -100;
    //   }
    //   gsap.set(leftText1.current, {xPercent:xPercent})
    //   gsap.set(RightText2.current, {xPercent:xPercent})
    //   xPercent += 0.1 * direction;
    //   requestAnimationFrame(animation)

    // }

    // useEffect(() =>{
    //   gsap.registerPlugin(ScrollTrigger)
    //     requestAnimationFrame(animation)
  
    //     gsap.to(slider.current,{
    //       scrollTrigger:{
    //         trigger:document.documentElement,
    //         start:0,
    //         end:window.innerHeight,
    //         scrub:0.25,
    //         onUpdate: e => direction = e.direction * -1
    //       },
    //       x:"-=200px",
    //     })

        
    // },[])


  return (

       <div>
            {/* <div className="relative  overflow-hidden h-32 xl:h-60 ">
                <div className="absolute bg-mainbg  py-10 xl:py-[50px]">
                    <div className="motionpara relative whitespace-nowrap flex text-black" ref={slider}>
                        <p ref={leftText1} className=" font-medium text-7xl xl:text-[170px] m-0">Let your brand stand out from the crowd.</p>
                        <p ref={RightText2} className=" font-medium text-7xl xl:text-[170px] m-0">Let your brand stand out from the crowd.</p>
                    </div>
                </div>
            </div> */}

            <Marquee
            speed={200}
             className="overflow-hidden py-10 xl:py-[50px]">
              <p className="font-medium text-7xl xl:text-[170px] m-0">Let your brand stand out from the crowd. </p>
            </Marquee>
        
       </div>

  )
}

export default AnimatePara