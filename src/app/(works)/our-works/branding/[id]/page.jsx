import React from 'react';
import Image from 'next/image';



async function getData(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brandings?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}



const Innerpage = async ({params}) => {
  const data = await getData(params.id);
  let result = data.data[0]
  // console.log(result.attributes.mockups.data);
  return (
    <main className=' xl:min-h-screen w-full bg-white'>
        <div className='w-11/12 xl:w-10/12 mx-auto pt-32 py-20'>
          <h1 className='text-4xl font-normal capitalize text-center pb-5'>{result.attributes.title}</h1>
            {result.attributes.mockup.data.map((img,i)=>(
              <div className='relative h-60 md:h-96 lg:h-[650px] w-full' key={i}>
                  <Image src={img.attributes.url}  fill={true} className='object-cover'  alt="wrk1"/>
              </div>
            ))}
        </div>
    </main>
  )
}

export default Innerpage