import React from 'react';
import {testimage} from '../../../public/images/index'
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Link from 'next/link';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blogs?&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}

const Blogs = async () => {
  const blogdata =  await getData()
  // console.log(blogdata.data);
  return (
    <main className='min-h-screen w-full bg-white'>
      <div className='w-11/12 xl:w-9/12 mx-auto pt-32 py-20 grid grid-cols-2 gap-8'>
      {blogdata.data && blogdata.data.length > 0 ? (
       blogdata.data?.map(data=>(
        <Link href={`/blogs/${data.attributes.slug}`} key={data.attributes.id}>
            <div className='space-y-5 group'>
              <div className='relative h-[500px] w-full space-y-3'>
                <Image id="lightgallery" src={data.attributes.image.data.attributes.url}  fill={true} className='object-cover'  alt="wrk1"/>
              </div>     
              <h1 className='text-2xl font-medium group-hover:underline duration-300 pr-5'>{data.attributes.title}</h1>  
            </div>
        </Link>
     ))
     ) : (
       <div className='text-left text-2xl font-medium animate-bounce'>
         No data found.
       </div>
    )}
      </div>
    </main>
  )
}

export default Blogs