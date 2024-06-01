import React from 'react';
import { notFound } from 'next/navigation';
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

async function getData(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/services?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store"}
  );

  if (!res.ok) {
    return notFound();
  }
 
  return res.json();
}

const ServiceInnerpage = async ({ params }) => {
  const data = await getData(params.id);
  // console.log(data.data);
  const content = data.data[0].attributes.content;

  return (
    <main className='min-h-screen w-full bg-white'>
      <div className='w-11/12 xl:w-10/12 mx-auto pt-32 py-20'>
        <div className='prose prose-headings:text-black prose-h1:leading-tight prose-h4:text-3xl prose-h4:font-normal prose-h5:text-xl prose-h4:m-0 prose-h4:mb-2 prose-h5:m-0 prose-p:m-0 prose-h5:font-medium prose-h1:text-5xl prose-h1:m-0 prose-h1:mb-7 prose-p:text-base prose-h1:font-semibold prose-p:text-black'>
          <BlocksRenderer content={content} />
        </div>
      </div>
    </main>
  );
}

export default ServiceInnerpage;
