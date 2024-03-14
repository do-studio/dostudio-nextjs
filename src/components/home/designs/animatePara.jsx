"use client"
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import {ScrollTrigger} from 'gsap/ScrollTrigger'

const AnimatePara = () => {
    const firstText = useRef(null);
    const secondText = useRef(null);
    const slider = useRef(null);
    let xPercent = 0;
    let direction = 1;
  
    useEffect(() =>{
      gsap.registerPlugin(ScrollTrigger)
        requestAnimationFrame(animation)
  
        gsap.to(slider.current,{
          scrollTrigger:{
            trigger:document.documentElement,
            start:0,
            end:window.innerHeight,
            scrub:0.25,
            onUpdate: e => direction = e.direction * -1
          },
          x:"-=200px",
        })
    },[])
    const animation = () => {
      if(xPercent <= -100){
        xPercent = 0;
      }
      if(xPercent > 0){
        xPercent = -100;
      }
      gsap.set(firstText.current,{xPercent:xPercent})
      gsap.set(secondText.current,{xPercent:xPercent})
      xPercent += 0.1 * direction;
      requestAnimationFrame(animation)
    }
  return (

       <div>
            <div className="relative  overflow-hidden h-32 xl:h-60 ">
                <div className="absolute bg-mainbg  py-10 xl:py-[50px]">
                    <div className="motionpara relative whitespace-nowrap flex text-black" ref={slider}>
                        <p ref={firstText} className=" font-medium text-7xl xl:text-[170px] m-0">Let your brand stand out from the crowd.</p>
                        <p ref={secondText} className=" font-medium text-7xl xl:text-[170px] m-0">Let your brand stand out from the crowd.</p>
                    </div>
                </div>
            </div>
       </div>

  )
}

export default AnimatePara