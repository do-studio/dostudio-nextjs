import Link from 'next/link'
import React from 'react'

const workWithUs = () => {
  return (
    <section className='bg-white w-11/12 xl:w-10/12 mx-auto py-10 xl:py-20 flex flex-col gap-5'>
        <h1 className='text-5xl xl:text-7xl font-black text-black'>READY TO WORK<br/> WITH US ?</h1>
        <Link className='bg-primarygreen text-black shadow-2xl hover:shadow-xl duration-200 shadow-gray-500 py-4 uppercase font-semibold rounded-full px-10 w-fit' href={'/'}>get started</Link>
    </section>
  )
}

export default workWithUs