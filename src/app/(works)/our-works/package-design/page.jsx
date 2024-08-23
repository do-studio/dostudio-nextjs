import Image from 'next/image'
import Link from 'next/link';
import { notFound } from 'next/navigation';


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/package-designs?&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}


const PackageDesign = async () => {
  const workdata =  await getData()
 

  return (
    <main className='min-h-screen w-full bg-white'>
     

     <div className='w-11/12 xl:w-9/12 mx-auto pt-32 py-20 grid grid-cols-2 gap-0 xl:gap-10'>
        {workdata.data && workdata.data.length > 0 ? (
          workdata.data?.map((data,i)=>(
   
              <div className='relative group' key={i}>
                
                  <div className='relative aspect-square w-full'>
                      <Image src={data.attributes.image.data.attributes.url}  fill={true} className='object-cover ' loading='lazy'   alt="wrk1"/>
                  </div>
                  
              </div>

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

export default PackageDesign