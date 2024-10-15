import React from 'react';
import { wrk1, wrk2, wrk3, wrk4, wrk5 ,WRK1,servicewebbg} from "../../../../public/images/index";
import Image from "next/image";
import Link from 'next/link';
import FadeUp from '../../../components/motions/fadeUp';
import { Metadata } from 'next';

export const metadata = {
    title: 'Services',
    description: 'My description',

  }
  
const serviceData=[
    {
        id:1,
        title:'branding',
        desc:'Our branding services are designed to enable your business to rise to prominence with an extremely powerful, unforgettable identity speaking for itself to your target audience.',
        img:wrk1,
        alt:`Creative marketing agency in Calicut`,
        url:`/services/branding-agency-in-calicut`
    },
    {
        id:2,
        title:'Digital marketing',
        desc:'Our services in digital marketing are structured to give your brand the needed online presence and drive measurable results.', 
        img:wrk2,
        alt:`Best digital marketing agency in Calicut`,
        url:`/services/digital-marketing-agency-in-calicut`
    },
    {
        id:6,
        title:'Website Development',
        desc:'Our website development services are focused on developing visually appealing, user-friendly, responsive websites that bring about customer engagement and ultimately meet business goals.', 
        img:servicewebbg,
        alt:`SEO company in calicut`,
        url:`/services/web-development-company-in-calicut`
    },
    {
        id:3,
        title:'package design',
        desc:'Our package design services combine creativity with functionality to create visually appealing and practical packaging that will help brand your product.', 
        img:wrk3,
        alt:`Socialmedia marketing agency in Calicut`,
        url:`#`
    },
    {
        id:4,
        title:'Production',
        desc:`From concept to the final product, we're driven by detailed planning and seamless execution. Every work we produce is exceptional and sets high expectations in results that customers appreciate.`, 
        img:wrk4,
        alt:``,
        url:`#`
    },
    {
        id:5,
        title:'print design',
        desc:'We blend creativity with strategic thinking to ensure your packaging not only stands out on the shelf but also resonates with your target audience, driving sales and brand loyalty.', 
        img:wrk5,
        alt:``,
        url:`#`
    },
]

const page = () => {
  return (
    <section className='w-11/12 xl:w-10/12 mx-auto min-h-screen pt-32 py-20'>
      
               <h1 className=' h-full w-full text-4xl sm:text-5xl xl:text-7xl text-center font-black capitalize'>our services</h1>
               <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 pt-10'>
                {serviceData?.map((data,i)=>(
                <FadeUp duration={0.3} delay={0.2 * i} key={i}>
                    <Link href={data.url} className='bg-gray-100 h-full rounded-2xl shadow-lg hover:shadow-xl duration-200 border p-5 flex flex-col justify-between gap-3 xl:gap-5' >
                      <div className='flex flex-col gap-3 xl:gap-5'>
                        <p className='text-3xl bg-primarygreen w-fit p-2 rounded-md font-black'>0{data.id}</p>
                        <h4 className='text-2xl uppercase font-bold'>{data.title}</h4>
                      </div>
                        <p className='text-sm'>{data.desc}</p>
                        <div className='relative w-full h-80 rounded-md overflow-hidden'>
                            <Image className="object-cover" placeholder="blur" fill src={data.img}/>
                        </div>
                    </Link>
                    </FadeUp>
                ))}
               </div>
    </section>
  )
}

export default page