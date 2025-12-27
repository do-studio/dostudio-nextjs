import { notFound } from "next/navigation";
import { PortableText } from '@portabletext/react';

import Image from "next/image";
import Link from "next/link";
import { createClient } from "@sanity/client";
import { client } from "../../../../utils/sanity";
import ContactForm from "../../../components/home/designs/ContactForm";


// Fetch blog data
async function getData(slug) {
  // We updated the query to look inside 'content' 
  // and expand the image assets if they exist inside the text.
  const query = `*[_type == "blog" && slug.current == $slug][0]{
    ...,
    image{
      asset->{
        url
      }
    },
    content[]{
      ...,
      _type == "image" => {
        ...,
        asset->{
          url,
          metadata {
            dimensions
          }
        }
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

  // Define components for the Rich Text Editor
  const ptComponents = {
    // 1. Handling Content Blocks (Headings, Paragraphs)
    block: {
      normal: ({ children }) => {
        const isEmpty = !children || (Array.isArray(children) && children.every(child => !child || child === ''));
        if (isEmpty) return <div className="h-4 mb-2" />;
        return <p className="mb-6 leading-relaxed text-black">{children}</p>;
      },
      h1: ({ children }) => <h1 className="text-4xl font-bold mt-10 mb-4 text-black">{children}</h1>,
      h2: ({ children }) => <h2 className="text-3xl font-bold mt-10 mb-4 text-black">{children}</h2>,
      h3: ({ children }) => <h3 className="text-2xl font-semibold mt-8 mb-3 text-black">{children}</h3>,
      h4: ({ children }) => <h4 className="text-xl font-semibold mt-8 mb-3 text-black">{children}</h4>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-primarygreen pl-4 italic text-gray-700 my-6">
          {children}
        </blockquote>
      ),
    },

    // 2. Handling Lists (Bullets, Numbers)
    list: {
      bullet: ({ children }) => <ul className="list-disc ml-8 mb-6 text-black space-y-2">{children}</ul>,
      number: ({ children }) => <ol className="list-decimal ml-8 mb-6 text-black space-y-2">{children}</ol>,
    },
    listItem: {
      bullet: ({ children }) => <li>{children}</li>,
      number: ({ children }) => <li>{children}</li>,
    },

    // 3. Handling Marks (Bold, Italic, Links)
    marks: {
      strong: ({ children }) => <strong className="font-bold text-black">{children}</strong>,
      em: ({ children }) => <em className="italic text-gray-800">{children}</em>,
      link: ({ value, children }) => {
        const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
        return (
          <a
            href={value?.href}
            target={target}
            rel={target === '_blank' ? 'noindex nofollow' : undefined}
            className="text-blue-600 hover:underline font-medium"
          >
            {children}
          </a>
        );
      },
    },

    // 4. Handling Custom Types (Images inside the text)
    types: {
      image: ({ value }) => {
        if (!value?.asset?.url) {
          return null;
        }
        return (
          <div className="relative w-full h-[400px] my-10 rounded-lg overflow-hidden">
            <Image
              src={value.asset.url}
              alt={value.alt || 'Blog Image'}
              fill
              className="object-cover"
            />
          </div>
        );
      },
      // 👇 ADD THIS TABLE HANDLER
      table: ({ value }) => {
        // Safety check
        if (!value || !value.rows || value.rows.length === 0) {
          return null;
        }

        const [headRow, ...bodyRows] = value.rows;

        return (
          <div className="my-8 w-full overflow-hidden rounded-lg border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                {/* Header: Clean Gray Background with Dark Text */}
                <thead>
                  <tr className="bg-gray-300 border-b border-gray-200">
                    {headRow.cells.map((cell, i) => (
                      <th
                        key={i}
                        className="px-6 py-4 font-semibold text-gray-900 uppercase tracking-wider text-xs"
                      >
                        {cell}
                      </th>
                    ))}
                  </tr>
                </thead>

                {/* Body: White background with subtle dividers */}
                <tbody className="bg-white divide-y divide-gray-200">
                  {bodyRows.map((row) => (
                    <tr
                      key={row._key}
                      className="hover:bg-gray-50 transition-colors duration-150"
                    >
                      {row.cells.map((cell, i) => (
                        <td
                          key={i}
                          className="px-6 py-4 text-gray-700 whitespace-pre-wrap leading-relaxed"
                        >
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      },
    },



  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-10/12 mx-auto pt-24 py-20">

        {/* Main Cover Image */}
        <div className="relative h-[500px] w-full mb-10">
          {blog.image?.asset?.url && (
            <Image
              src={blog.image.asset.url}
              fill={true}
              className="object-cover"
              alt={blog.altText || "Blog Cover"}
              loading="lazy"
            />
          )}
        </div>

        {/* Rich Text Content */}
        {/* I removed the 'prose' class here because we are manually styling the components inside ptComponents. 
            This gives you more control. */}
        <div className="w-full mx-auto">
          {blog.content && (
            <PortableText
              value={blog.content}
              components={ptComponents}
            />
          )}
        </div>
        <div className="w-full flex flex-col justify-center items-center mt-20">
          <h2 className="text-2xl md:text-4xl font-bold -mb-14 z-10 text-black uppercase">Get in touch</h2>
        <ContactForm width='1/2' />
        </div>
        {/* Footer Button */}
        {/* <div className="w-full flex justify-center items-center mt-10">
          <Link
            href="/"
            className="bg-primarygreen text-black shadow-lg hover:shadow-xl duration-200 shadow-gray-200 py-4 uppercase font-semibold rounded-full px-10 w-fit"
          >
            Explore more
          </Link>
        </div> */}
      </div>
    </main>
  );
};

export default BlogDetails;