import Image from 'next/image'
import Link from 'next/link';
import { notFound } from 'next/navigation';
import FadeUp from '../../../../components/motions/fadeUp';

async function getData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/brandings?&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound()
  }
 
  return res.json()
}


const Branding = async () => {
  const workdata =  await getData()

  const sortedData = workdata.data?.sort((a, b) => a.attributes.order - b.attributes.order);
 

  return (
    <main className='min-h-screen w-full bg-white'>
        <div className='w-11/12 xl:w-9/12 mx-auto pt-32 py-20 grid grid-cols-1 md:grid-cols-2 gap-10'>
        {sortedData && sortedData.length > 0 ? (
          sortedData?.map((data,i)=>(
            <Link className='space-y-2' href={`/our-works/branding/${data.attributes.slug}`} key={i}>
              <FadeUp duration={0.5} delay={0.5 * 1}>
              <div className='relative group' >
                  {/* <div className='z-20 absolute top-0 left-0 w-full h-full bg-[#00000087] opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer'>
                    <h3 className='text-white grid place-items-center h-full w-full text-3xl font-medium capitalize'>{data.attributes.title}</h3>
                  </div> */}
                  <div className='relative h-80 md:h-96 lg:h-[450px] xl:h-[550px] w-full'>
                      <Image loading='lazy' src={data.attributes.coverimage.data.attributes.url}   fill={true}  className='object-cover '  alt="wrk1"/>
                  </div>
              </div>
                {/* <h3 className='text-black font-black text-left text-3xl xl:text-5xl uppercase'>{data.attributes.title}</h3> */}
            </FadeUp>
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

export default Branding