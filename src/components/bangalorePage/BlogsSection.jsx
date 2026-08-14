import React from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../motions/fadeUp";
import { client } from "../../../utils/sanity";

async function getLatestBlogs(limit = 6) {
  const query = `*[_type == "blog" && !(_id in path("drafts.**"))]
    | order(createdAt desc) [0...${limit}]{
      _id,
      title,
      slug,
      altText,
      image{asset->{url}},
      createdAt
    }`;

  try {
    return await client.fetch(query);
  } catch (err) {
    console.error("Error fetching blogs for blogs section:", err);
    return [];
  }
}

export default async function BlogsSection({
  title = "Latest from Our Blog",
  description,
  limit = 6,
  buttonText = "View All Blogs",
  buttonLink = "/blogs",
}) {
  const blogs = await getLatestBlogs(limit);

  if (!blogs || blogs.length === 0) return null;

  return (
    <section className="w-full bg-white text-black py-20 px-6 md:px-12 lg:px-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-black uppercase tracking-tight mb-4">
            {title}
          </h2>
          {description && (
            <p className="text-gray-600 text-lg md:text-xl font-normal leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, i) => (
            <Link href={`/blogs/${blog.slug?.current}`} key={blog._id}>
              <FadeUp duration={0.6} delay={0.1 * i}>
                <div className="space-y-4 group overflow-hidden rounded-xl h-full">
                  <div className="relative h-[240px] md:h-[280px] w-full overflow-hidden rounded-xl bg-gray-100">
                    {blog.image?.asset?.url && (
                      <Image
                        src={blog.image.asset.url}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                        loading="lazy"
                        alt={blog.altText || blog.title}
                      />
                    )}
                  </div>
                  <h3 className="text-xl font-semibold capitalize group-hover:underline duration-300">
                    {blog.title}
                  </h3>
                </div>
              </FadeUp>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center">
          <Link
            href={buttonLink}
            className="inline-flex items-center gap-3 bg-white text-gray-900 border border-gray-300 font-semibold px-8 py-3.5 rounded-full hover:bg-gray-50 hover:shadow-md hover:border-gray-400 transition-all duration-300 group"
          >
            <span>{buttonText}</span>
            <span className="text-gray-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
