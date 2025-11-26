import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react';

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@sanity/client";
import { client } from "../../../../utils/sanity";

// Fetch blog data
async function getData(slug) {



  const query = `*[_type == "blog" && slug.current == $slug][0]{
    ...,
    image{
      asset->{
        url
      }
    }
  }`;



  const data = await client.fetch(query, { slug });


  if (!data) {
    return notFound();
  }
  return { data: [{ attributes: data }] };
}

// Dynamic metadata generation
export async function generateMetadata({ params }) {
  const data = await getData(params.id);

  if (!data?.data.length) {
    return {
      title: "Blog Not Found - Do Studio",
      description: "The requested blog could not be found.",
    };
  }

  const blog = data.data[0].attributes;

  return {
    title: blog.metatitle || "Default Blog Title",
    description: blog.metadescription || "Default blog description.",
    keywords:
      blog.metakeywords || "digital marketing, SEO, branding, marketing blogs",
    metadataBase: new URL("https://dostudio.co.in"), // Base domain


    openGraph: {
      title: blog.metatitle || "Default Blog Title",
      description: blog.metadescription || "Default blog description.",
      url: `https://dostudio.co.in/blogs/${params.id}`,
      images: [
        {
          url: blog.image?.asset?.url || "/default-og-image.jpg",
          width: 1200,
          height: 630,
          alt: blog.altText || "Do Studio Blog",
        },
      ],
      type: "article",
    },
  };
}



// Blog details component
const BlogDetails = async ({ params }) => {
  const data = await getData(params.id);
  const blog = data?.data[0]?.attributes;
  const content = blog?.content;
  // if (!blog) return <p>Loading blog...</p>;

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-10/12 mx-auto pt-24 py-20">
        <div className="relative h-[500px] w-full mb-10">
          <Image
            src={blog.image?.asset?.url}
            fill={true}
            className="object-cover"
            alt={blog.altText}
            loading="lazy"
          />
        </div>
        <div className="prose prose-headings:text-black prose-li:text-black prose-blockquote:text-black prose-strong:text-black prose-a:text-blue-500 prose-h1:leading-tight prose-h4:text-3xl prose-a:no-underline prose-h4:font-normal prose-h5:text-xl prose-h4:m-0 prose-h4:mb-2 prose-h5:m-0 prose-p:m-0 prose-h5:font-medium prose-h1:text-3xl prose-h1:m-0 prose-h1:mb-7 prose-p:text-base prose-h1:font-semibold prose-p:text-black whitespace-pre-line">
          {blog.content && (
            <PortableText
              value={blog.content}
              components={{
                block: {
                  normal: ({ children }) => {
                    // Check if the block is empty
                    const isEmpty =
                      !children ||
                      (Array.isArray(children) && children.every(child => !child || child === ''));

                    // If empty, render a spacer div instead
                    if (isEmpty) {
                      return <div className="h-4 mb-2" />;  // Adjust h-4 for desired spacing
                    }

                    return (
                      <p className="mb-6 whitespace-pre-line leading-relaxed text-black">
                        {children}
                      </p>
                    );
                  },
                  h2: ({ children }) => (
                    <h2 className="mt-10 mb-4 text-2xl font-bold text-black">
                      {children}
                    </h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="mt-8 mb-3 text-xl font-semibold text-black">
                      {children}
                    </h3>
                  ),
                  h4: ({ children }) => (
                    <h3 className="mt-8 mb-3 text-xl font-semibold text-black">
                      {children}
                    </h3>
                  ),
                  h5: ({ children }) => (
                    <h3 className="mt-8 mb-3 text-xl font-semibold text-black">
                      {children}
                    </h3>
                  ),
                  h6: ({ children }) => (
                    <h3 className="mt-8 mb-3 text-xl font-semibold text-black">
                      {children}
                    </h3>
                  ),
                },
              }}
            />
          )}
        </div>
        <div className="w-full flex justify-center items-center mt-10">
          <Link
            href="/"
            className="bg-primarygreen text-black shadow-lg hover:shadow-xl duration-200 shadow-gray-200 py-4 uppercase font-semibold rounded-full px-10 w-fit"
          >
            Explore more
          </Link>
        </div>
      </div>
    </main>
  );
};

export default BlogDetails;
