import React from 'react';
import {testimage} from "../../../../../../public/images/index";
import Image from 'next/image';

async function getData(id) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/works/${id}?filters[category][$eq]=branding&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}



const Innerpage = async ({params}) => {
  const data = await getData(params.id)
  // console.log(data);
  return (
    <main className=' min-h-screen w-full bg-white'>
        <div className='w-11/12 xl:w-10/12 mx-auto pt-32 py-20 space-y-10'>
          <h1 className='text-4xl font-bold capitalize text-center'>title heading</h1>
          <div className='relative h-[550px] w-full'>
              <Image src={testimage}  fill={true} className='object-cover'  alt="wrk1"/>
          </div>
        </div>
    </main>
  )
}

export default Innerpage