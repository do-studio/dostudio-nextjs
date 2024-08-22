import Image from 'next/image'
import React from 'react'
import { motion } from "framer-motion";
import {imgarrw} from '../../../../public/images/index';
import { HiArrowSmallDown } from "react-icons/hi2";

const Aboutus = () => {
  return (
    <main className='bg-white text-black py-10 xl:py-20 flex items-center relative overflow-hidden'>
      <div className='w-11/12 xl:w-9/12 mx-auto text-lg xl:text-4xl space-y-10 xl:font-light xl:leading-normal'>
          <h2 className='text-gray-600'>Being the leading <span className='font-medium text-black'>Advertising agency in Calicut</span>, we take an added advantage in preparing outstandingly and achieving exceptional results in branding and advertising. We stand at the frontline as the <span className='font-medium text-black'>best Advertising agency in Calicut</span> but extend further to the forefront of digital marketing services. We don't just have our reach limited to Calicut; we have been able to establish certain milestones that span across regions showing our commitment to excellence at a bigger scale.</h2>
          <div className='relative flex justify-end'>
            <motion.div 
            animate={{ rotate: 360 }} // Rotate 360 degrees
            transition={{
              repeat: Infinity, // Loop the animation
              ease: "linear", // Linear easing for smooth continuous rotation
              duration: 30, // Rotation duration in seconds
            }}
            className='relative h-32 w-32 rounded-full'>
              <Image fill className='object-cover' src={imgarrw}/>
            </motion.div>
            <HiArrowSmallDown className='absolute top-[30%] right-10 text-white text-5xl'/>
          </div>
      </div>
    </main>
  )
}

export default Aboutus