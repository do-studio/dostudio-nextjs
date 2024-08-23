import Image from 'next/image'
import Link from 'next/link';
import { notFound } from 'next/navigation';


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/print-designs?&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}


const PrintDesign = async () => {
  const workdata =  await getData()

  
  // Sort the data by the order field (replace 'order' with the correct field name)
  const sortedData = workdata.data?.sort((a, b) => a.attributes.order - b.attributes.order);
 

  return (
    <main className='min-h-screen w-full bg-white'>
        <div className='w-11/12 xl:w-10/12 mx-auto pt-32 py-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10'>
        {sortedData && sortedData.length > 0 ? (
          sortedData?.map((data,i)=>(
              <div className='relative group bg-[#dcdcde]' key={i}>
                  <div className='relative aspect-video w-full'>
                      <Image src={data.attributes.image.data.attributes.url}  fill={true} className='object-cover'  loading='lazy'  alt="wrk1"/>
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

export default PrintDesign