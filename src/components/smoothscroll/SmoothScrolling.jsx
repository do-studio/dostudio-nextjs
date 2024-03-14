"use client"
import { ReactLenis } from '@studio-freight/react-lenis'

function SmoothScroll({children}) {


  return (
    <ReactLenis root options={{lerp:0.001,duration:1.5,smoothWheel:true,syncTouch:true}}>
        {children}
    </ReactLenis>
  )
}

export default SmoothScroll;