"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { client } from "../../../../../../utils/sanity";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';
import imageUrlBuilder from '@sanity/image-url';
import Head from "next/head";

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const SKELETON_COUNT = 1;

const BrandingInnerPage = ({ params }) => {
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      setLoading(true);
      try {
        const query = `
          *[_type == "branding" && slug.current == $slug][0]{
            title,
            slug,
            coverimage{
              asset
            },
            innerImages[]{
              asset,
              "metadata": asset->metadata,
              alt
            }
          }
        `;
        const data = await client.fetch(query, { slug: params.id });
        setBrand(data);
      } catch (error) {
        setBrand(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [params.id]);



  if (loading) {
    return (
      <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20 space-y-10">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <Skeleton
            key={i}
            height={1000}
            style={{ maxWidth: "100%", borderRadius: "6px" }}
          />
        ))}
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20">
        <h1 className="text-2xl font-medium">Brand not found</h1>
      </div>
    );
  }



  return (
    <>
      <Head>
        <title>
          Branding | Boost Brand Visibility
        </title>
        <meta
          name="description"
          content=""
        />
       
        <meta property="og:url" content="https://dostudio.co.in" />
       
      </Head>
      <main className="xl:min-h-screen w-full">
        <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20 space-y-0">
          {Array.isArray(brand.innerImages) && brand.innerImages.length > 0 ? (
            brand.innerImages.map((image, i) => {
              const width = image.metadata?.dimensions?.width || 1200;
              const height = image.metadata?.dimensions?.height || 800;
              const imageUrl = urlFor(image.asset)
                .width(width)
                .auto('format')
                .url();

              return (
                <div key={i} className="relative w-full max-w-5xl mx-auto  overflow-hidden " style={{ maxWidth: '100%', aspectRatio: `${width} / ${height}` }}>
                  <Image
                    src={imageUrl}
                    alt={image.alt || `${brand.title} image ${i + 1}`}
                    width={width}
                    height={height}
                    sizes="(max-width: 768px) 100vw, 1200px"
                    className="object-cover"
                    priority={i === 0}
                    quality={100}
                  />
                </div>
              );
            })
          ) : (
            <div className="text-lg text-gray-500">No images found for this brand.</div>
          )}
        </div>
      </main>
    </>

  );
};

export default BrandingInnerPage;
