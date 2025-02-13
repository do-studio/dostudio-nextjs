import Link from 'next/link'
import React from 'react'
import ContactForm from './ContactForm'

const workWithUs = () => {
  return (
    <section className='relative flex justify-center'>
      <section className='bg-white w-full xl:w-full mx-auto text-center py-10 xl:py-20 flex flex-col gap-5'>
        <h4 className='text-5xl xl:text-7xl font-black text-black'>READY TO WORK<br /> WITH US ?</h4>
        <p className='xl:w-10/12 w-full mx-auto px-5'>Go beyond typical with Do Studio, the <b>Best advertising agency in Calicut</b>. You’re not just choosing a campaign, you’re selecting a partner who understands your brand and has an interest in crafting genuine, meaningful and connecting stories.</p>
        <ContactForm width='1/2' />

      </section>
    </section>
  )
}

export default workWithUs