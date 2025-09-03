import Image from "next/image";
import Link from "next/link";
import FadeUp from "../../components/motions/fadeUp";
import { client } from "../../../utils/sanity";

export const metadata = {
  title: "Creative Insights & Digital Marketing Blogs from Do Studio",
  description:
    "Digital marketing strategies and tips from Do Studio. Learn how to improve your SEO, social media, and more.",
};

// Server-side fetch with pagination
async function getBlogs(page = 1, limit = 6) {
  const start = (page - 1) * limit;
  const end = start + limit;

  const query = `{
    "blogs": *[_type == "blog" && !(_id in path("drafts.**"))] 
      | order(createdAt desc) [${start}...${end}]{
        _id,
        title,
        slug,
        altText,
        image{asset->{url}},
        createdAt
      },
    "total": count(*[_type == "blog" && !(_id in path("drafts.**"))])
  }`;

  return client.fetch(query);
}

export default async function Blogs({ searchParams }) {
  const page = Number(searchParams.page) || 1;
  const limit = 16;

  const { blogs, total } = await getBlogs(page, limit);
  const totalPages = Math.ceil(total / limit);

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-9/12 mx-auto pt-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-8">
        {blogs.map((data, i) => (
          <Link href={`/blogs/${data.slug.current}`} key={data._id}>
            <FadeUp
              duration={0.6} // slightly longer for smoothness
              delay={0.1 * i} // stagger effect
              initial={{ opacity: 0, y: 40, scale: 0.95 }} // start slightly lower and smaller
              animate={{ opacity: 1, y: 0, scale: 1 }} // animate to normal
              exit={{ opacity: 0, y: 20, scale: 0.95 }} // optional exit animation
              transition={{ ease: "easeOut" }}
            >
              <div className="space-y-4 group overflow-hidden rounded-xl">
                <div className="relative h-[350px] xl:h-[500px] w-full overflow-hidden rounded-xl">
                  <Image
                    src={data.image.asset.url}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 group-hover:rotate-2 transition-transform duration-500"
                    loading="lazy"
                    alt={data.altText || data.title}
                  />
                </div>
                <h1 className="text-xl font-semibold capitalize group-hover:underline duration-300">
                  {data.title}
                </h1>
              </div>
            </FadeUp>
          </Link>

        ))}
      </div>

      {/* Pagination Buttons */}
      <div className="flex justify-center items-center space-x-3 my-10">
        {/* Previous Button */}
        {page > 1 ? (
          <Link
            href={`/blogs?page=${page - 1}`}
            className="px-5 py-2 rounded-lg transition-colors duration-300 bg-primarygreen text-black hover:bg-primarygreenhvr"
          >
            Previous
          </Link>
        ) : (
          <span className="px-5 py-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed">
            Previous
          </span>
        )}

        {/* Current Page */}
        <span className="px-4 py-2 bg-black text-primarygreen rounded-lg font-medium">
          {page}
        </span>

        {/* Next Button */}
        {page < totalPages ? (
          <Link
            href={`/blogs?page=${page + 1}`}
            className="px-5 py-2 rounded-lg transition-colors duration-300 bg-primarygreen text-black hover:bg-primarygreenhvr"
          >
            Next
          </Link>
        ) : (
          <span className="px-5 py-2 rounded-lg bg-gray-300 text-gray-500 cursor-not-allowed">
            Next
          </span>
        )}
      </div>

    </main>
  );
}
