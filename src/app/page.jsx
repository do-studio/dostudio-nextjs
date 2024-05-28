"use client"
import React, { useEffect } from 'react';
import {Banner,ClientSlide,MarqueeText,AnimatPara,About,Whatwedo,Clients,Testimonials,MovingWords,GetinTouch} from '../components'

export default function Home() {
 
  return (
    <main>
      <Banner/>
      <MarqueeText/>
      <About/>
      <Whatwedo/>
      {/* <AnimatPara/> */}
      <Testimonials/>
      {/* <Clients/> */}
      <ClientSlide/>
      {/* <GetinTouch/>
      <MovingWords/> */}
    </main>
  );
}
