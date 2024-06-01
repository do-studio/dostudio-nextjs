
import Image from 'next/image'
import {serviceBg} from '../../../public/images'
import Link from 'next/link';
import { notFound } from 'next/navigation';


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}

const Services =  async () => {
  const servicedata =  await getData()

  return (
    
    <main className='min-h-screen w-full bg-white'>
      <div  className='pt-40 text-center flex flex-col gap-y-5'>
          <h1  className='text-4xl lg:text-6xl font-bold'>Our Services</h1>
          <p  data-aos-delay="100" className='text-base lg:text-xl font-medium px-4'>Do Studio is your dedicated partner in the dynamic world of marketing.<br/>
          Our experts offer tailored services to elevate your brand and drive your success.</p>
          <Image className='w-full aspect-video md:aspect-[21/8] object-cover' placeholder='blur' src={serviceBg} alt='do stuio service'/>
      </div>
      {/* services */}
      <div className='w-11/12 xl:w-10/12 mx-auto py-5'>
        
          <div >
            {servicedata.data?.map(data=>(
              <div  className='w-full relative py-12 border-b-2 last:border-none space-y-10' key={data.id}>
                  <div className='grid grid-cols-1 md:grid-cols-2'>
                    <h1 className='text-3xl xl:text-5xl font-semibold uppercase'>{data.attributes.title}</h1>
                    <p className='text-base capitalize'>{data.attributes.shortcn}</p>
                  </div>
                  <div className='w-full flex justify-end items-center gap-1'>
                  <Link href={`/services/${data.id}`} className='w-fit text-xl capitalize hover:underline font-light'>learn more</Link>
                  </div>
              </div>
            ))}
          </div>
      </div>
    </main>
  )
}

export default Services