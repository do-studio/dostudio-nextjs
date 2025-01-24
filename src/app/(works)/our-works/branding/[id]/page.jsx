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


// Dynamic metadata generation
export async function generateMetadata({ params }) {
  const data = await getData(params.id);

  if (!data?.data.length) {
    return {
      title: "Branding Not Found - Do Studio",
      description: "The requested brand could not be found.",
    };
  }

  const brand = data.data[0].attributes;
  console.log(brand);

  return {
    title: brand.metatitle || "Default Branding Title",
    description: brand.metadesc || "Default brand description.",
    keywords:
      brand.metakeywords || "digital marketing, SEO, branding, marketing blogs",
    metadataBase: new URL("https://dostudio.co.in"), // Base domain
    alternates: {
      canonical: `https://dostudio.co.in/brand/${params.id}`,
    },
   
    openGraph: {
      title: brand.metatitle || "Default Branding Title",
      description: brand.metadesc || "Default brand description.",
      url: `https://dostudio.co.in/brand/${params.id}`,
      images: [
        {
          url: brand.image?.data?.attributes?.url || "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: brand || "Do Studio Branding",
        },
      ],
      type: "article",
    },
  };
}

const Innerpage = async ({ params }) => {
  const data = await getData(params.id);
  let result = data.data[0];
  // console.log(result.attributes.mockups.data);
  return (
    <>
      
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
