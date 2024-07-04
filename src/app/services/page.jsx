import Image from "next/image";
import { serviceBg } from "../../../public/images";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CgArrowLongRight } from "react-icons/cg";

async function getData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/services?populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const Services = async () => {
  const servicedata = await getData();

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-10/12 mx-auto pt-20 py-20">
        <div className="text-center pb-10">
          <h1 className="text-4xl lg:text-6xl font-bold">Our Services</h1>
          <p className="text-base lg:text-xl font-normal px-4">
            Do Studio is your dedicated partner in the dynamic world of
            marketing.
            <br />
            Our experts offer tailored services to elevate your brand and drive
            your success.
          </p>
        </div>
        <div className=" grid grid-cols-1 gap-5 xl:gap-10 xl:grid-cols-3">
          <div className="flex flex-col justify-center">
            {servicedata.data?.map((data) => (
              <div
                className="w-full relative py-3 xl:py-4 border-b last:border-none group"
                key={data.id}
              >
                <Link href={`/services/${data.attributes.slug}`}>
                  <h1 className="text-lg xl:text-xl font-normal uppercase">
                    {data.attributes.title}
                  </h1>
                </Link>
                <CgArrowLongRight className="text-2xl text-primarygreen xl:text-4xl absolute right-10 md:right-0 top-[20%] opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-2 transition-all duration-300" />
              </div>
            ))}
          </div>
          <div className="md:col-span-2 overflow-hidden rounded-[3rem] xl:rounded-full">
            <Image
              className="w-full aspect-video object-cover hover:scale-110 duration-200"
              placeholder="blur"
              src={serviceBg}
              alt="do studio service"
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Services;

{
  /* <main className='min-h-screen w-full bg-white'>
<div className='pt-40 text-center flex flex-col gap-y-5'>
  <h1 className='text-4xl lg:text-6xl font-bold'>Our Services</h1>
  <p data-aos-delay="100" className='text-base lg:text-xl font-medium px-4'>
    Do Studio is your dedicated partner in the dynamic world of marketing.<br />
    Our experts offer tailored services to elevate your brand and drive your success.
  </p>
  <Image className='w-full aspect-video md:aspect-[21/8] object-cover' placeholder='blur' src={serviceBg} alt='do studio service' />
</div>


<div className='w-11/12 xl:w-10/12 mx-auto py-5'>
  <div>
    {servicedata.data?.map(data => (
      <div className='w-full relative py-12 border-b-2 last:border-none space-y-10' key={data.id}>
        <div className='grid grid-cols-1 md:grid-cols-2'>
          <h1 className='text-3xl xl:text-5xl font-semibold uppercase'>{data.attributes.title}</h1>
          <p className='text-base capitalize'>{data.attributes.shortcn}</p>
        </div>
        <div className='w-full flex justify-end items-center gap-1'>
          <Link href={`/services/${data.attributes.slug}`} className='w-fit text-xl capitalize hover:underline font-light'>learn more</Link>
        </div>
      </div>
    ))}
  </div>
</div>
</main> */
}
