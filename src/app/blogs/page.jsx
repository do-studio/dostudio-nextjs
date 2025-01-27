import React from "react";
import { testimage } from "../../../public/images/index";
import Image from "next/image";
import { notFound } from "next/navigation";
import Link from "next/link";
import FadeUp from "../../components/motions/fadeUp";
import Head from "next/head";
import axios from "axios";

export const metadata = {
  title: "Creative Insights & Digital Marketing Blogs from Do Studio",
  description:
    "Digital marketing strategies and tips from Do Studio. Learn how to improve your SEO, social media, and more to achieve your business goals.",
  metadataBase: new URL("https://dostudio.co.in"), // Set the base domain
  keywords:
    "Advertising agency in Calicut, marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, creative agency in calicut, digital agency in calicut",
  openGraph: {
    title: "Creative Insights & Digital Marketing Blogs from Do Studio",
    description:
      "Digital marketing strategies and tips from Do Studio. Learn how to improve your SEO, social media, and more to achieve your business goals.",
    url: `https://dostudio.co.in/blogs`,

    type: "article",
  },
};

async function getData() {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/api/blogs?&populate=*`,
    { cache: "no-store" }
  );

  if (!res.status) {
    return notFound();
  }

  // return res.json()
  return res.data;
}

const Blogs = async () => {
  const blogdata = await getData();
  console.log(blogdata);
  return (
    <>
      <Head>
        <link rel="canonical" href="https://dostudio.co.in/blogs" />
      </Head>

      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-9/12 mx-auto pt-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogdata.data && blogdata.data.length > 0 ? (
            blogdata.data?.reverse().map((data, i) => (
              <Link href={`/blogs/${data.attributes.slug}`} key={i}>
                <FadeUp duration={0.3} delay={0.2 * i}>
                  <div className="space-y-2 group">
                    <div className="relative overflow-hidden  h-[350px] xl:h-[500px] w-full space-y-3">
                      <Image
                        id="lightgallery"
                        src={data.attributes.image.data.attributes.url}
                        fill={true}
                        className="object-cover grayscale hover:grayscale-0 group-hover:scale-125 group-hover:rotate-6 duration-300"
                        loading="lazy"
                        alt={data.attributes.title}
                      />
                    </div>
                    <h1 className="text-xl font-medium capitalize group-hover:underline duration-300 pr-5">
                      {data.attributes.title}
                    </h1>
                  </div>
                </FadeUp>
              </Link>
            ))
          ) : (
            <div className="text-left text-2xl font-medium animate-bounce">
              No data found.
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default Blogs;
