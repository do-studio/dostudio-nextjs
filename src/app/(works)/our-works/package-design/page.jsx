import Image from 'next/image'
import Link from 'next/link';
import { notFound } from 'next/navigation';


async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/works?filters[category][$eq]=package-design&populate=*`,
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
    <main className='min-h-screen w-full bg-whit'>
     

      
        <div className='w-11/12 xl:w-9/12 mx-auto pt-32 py-20 grid grid-cols-1 md:grid-cols-2 gap-0'>
        {workdata.data && workdata.data.length > 0 ? (
          workdata.data?.map(data=>(
            <Link href={`/our-works/package-design/${data.attributes.slug}`} >
              <div className='relative group' key={data.id}>
                  <div className='z-20 absolute top-0 left-0 w-full h-full bg-[#00000087] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer'>
                    <h3 className='text-white grid place-items-center h-full w-full text-3xl font-medium capitalize'>{data.attributes.title}</h3>
                  </div>
                  <div className='relative h-80 md:h-96 lg:h-[450px] xl:h-[550px] w-full'>
                      <Image src={data.attributes.coverimage.data.attributes.url}  fill={true} className='object-cover '  alt="wrk1"/>
                  </div>
                  
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

export default PackageDesign