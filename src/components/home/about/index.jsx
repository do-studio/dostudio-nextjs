import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";
import {imgarrw} from '../../../../public/images/index'
const Aboutus = () => {
  return (
    <main className='bg-white text-black py-10 xl:py-20 flex items-center relative overflow-hidden'>
      <div className='w-11/12 xl:w-9/12 mx-auto text-lg xl:text-5xl space-y-10 xl:font-light xl:leading-normal'>
          <h2 className='text-gray-600'>DO Studio is an <span className='font-medium text-black'>Creative Marketing Agency</span> in Calicut that specializes in providing branding and <span className='font-medium text-black'>design services</span>. The team at DO Studio Creative Marketing Agency firmly <span className='font-medium text-black'>believes</span> that <span className='font-medium text-black'>branding</span> is a powerful tool that can be used to effectively communicate stories, build connections with audiences, and <span className='font-medium text-black'>inspire action</span>.</h2>
          <motion.div 
           animate={{ rotate: 360 }} // Rotate 360 degrees
           transition={{
             repeat: Infinity, // Loop the animation
             ease: "linear", // Linear easing for smooth continuous rotation
             duration: 30, // Rotation duration in seconds
           }}
           className='relative h-32 w-32 bg-black rounded-full float-right'>
            <Image fill className='object-cover' src={imgarrw}/>
          </motion.div>
      </div>
    </main>
  )
}

export default Aboutus