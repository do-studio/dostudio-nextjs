import Image from 'next/image'
import React from 'react';
import {serviceBg} from '../../../public/images'

const Services = () => {
  return (
    <main className='min-h-screen w-full bg-white'>
      <div className='pt-40 text-center flex flex-col gap-y-5'>
          <h1 className='text-4xl lg:text-6xl font-bold'>Our Services</h1>
          <p className='text-base lg:text-xl font-medium px-4'>Do Studio is your dedicated partner in the dynamic world of marketing.<br/>
          Our experts offer tailored services to elevate your brand and drive your success.</p>
          <Image className='w-full aspect-video md:aspect-[21/8] object-cover' placeholder='blur' src={serviceBg} alt='do stuio service'/>
      </div>
      {/* services */}
      <div className='w-11/12 xl:w-10/12 mx-auto'>

      </div>
    </main>
  )
}

export default Services