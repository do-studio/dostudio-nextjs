import React from 'react'
import {Banner, Service,About,Testimonials,Ourworks,Clients} from '../../components/home2'

const page = () => {
  return (
    <section>
      <Banner/>
      <About/>
      <Service/>
      <Ourworks/>
      <Clients/>
      <Testimonials/>
    </section>
  )
}

export default page
