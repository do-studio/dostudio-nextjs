import React from "react";
import Image from "next/image";

import FadeUp from "../../../../../components/motions/fadeUp";
import Head from "next/head";

async function getData(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/brandings?filters[slug][$eq]=${slug}&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const Innerpage = async ({ params }) => {
  const data = await getData(params.id);
  let result = data.data[0];
  // console.log(result.attributes.mockups.data);
  return (
    <>
      <Head>
        <link
          rel="canonical"
          href={`https://dostudio.co.in/our-works/branding/${params.id}`}
        />
      </Head>
      <main className=" xl:min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-10/12 mx-auto pt-32 py-20">
          {/* <h1 className='text-4xl font-black uppercase text-center pb-5'>{result.attributes.title}</h1> */}
          {result.attributes.mockup.data.map((img, i) => (
            <div className="relative aspect-video" key={i}>
              <FadeUp duration={0.2}>
                <Image
                  src={img.attributes.url}
                  loading="lazy"
                  fill
                  className="object-cover"
                  alt="wrk1"
                />
              </FadeUp>
            </div>
          ))}
        </div>
      </main>
    </>
  );
};

export default Innerpage;
