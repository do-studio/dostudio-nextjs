import Link from 'next/link'
import React from 'react'

const workWithUs = () => {
  return (
    <section className='relative'>
    <div className='absolute right-0 -top-28 xl:-top-[42%]'>
      <video
                      className="h-40 w-40 xl:h-60 xl:w-60 bg-transparent"
                      autoPlay
                      loop
                      muted
                      playsInline
                  >
                      <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723785309/Do%20Studio%20Website/Vertical_1_utwcx9.webm' type="video/mp4" />
                      <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723110687/Do%20Studio%20Website/DO_STUDIO_LOGO_3-1_pevafw.mov' type="video/mp4" />
                  </video>
    </div>
    <section className='bg-white w-11/12 xl:w-10/12 mx-auto py-10 xl:py-20 flex flex-col gap-5'>
        <h1 className='text-5xl xl:text-7xl font-black text-black'>READY TO WORK<br/> WITH US ?</h1>
        <p className='xl:w-10/12'>Go beyond typical with Do Studio, the <b>Best advertising agency in Calicut</b>. You’re not just choosing a campaign, you’re selecting a partner who understands your brand and has an interest in crafting genuine, meaningful and connecting stories.</p>
        <Link className='bg-primarygreen text-black shadow-2xl hover:shadow-xl duration-200 shadow-gray-500 py-4 uppercase font-semibold rounded-full px-10 w-fit' href={'/contact'}>get started</Link>
    </section>
    </section>
  )
}

export default workWithUs