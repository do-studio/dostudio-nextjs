"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../../../../components/motions/fadeUp";
import { client } from "../../../../../utils/sanity";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const SKELETON_COUNT = 6; // Show 6 skeleton "cards" during loading, matches your 2-col grid

const Branding = () => {
  const [brandingData, setBrandingData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch branding data from Sanity
  const fetchBrandingData = async () => {
    setLoading(true);
    try {
      const query = `
        *[_type == "branding"] | order(orderRank) {
          _id,
          title,
          slug,
          thumbnail { asset->{ url } },
          innerImages { asset->{ url } }
        }
      `;
      const data = await client.fetch(query);
      setBrandingData(data);
    } catch (error) {
      setBrandingData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchBrandingData(); }, []);

  useEffect(() => {
    // Set title
    document.title = "Branding Company in Calicut | Brand Identity Design Services";
    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Discover how Do Studio can transform your brand. Our team delivers best branding solutions, including logo design, brand strategy."
      );
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute(
        "content",
        "Discover how Do Studio can transform your brand. Our team delivers best branding solutions, including logo design, brand strategy."
      );
      document.head.appendChild(newMetaDescription);
    }
  }, []);

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-9/12 mx-auto pt-20 xl:pt-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        {loading ? (
          // Responsive and visually accurate skeletons:
          Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <div className="space-y-2" key={i}>
              <div className="relative aspect-square w-full">
                <Skeleton
                  containerClassName="w-full h-full"
                  style={{ width: "100%", height: "100%" }}
                  className="w-full h-full"
                />
              </div>
              <Skeleton height={20} width={140} style={{ marginTop: 8 }} />
            </div>
          ))
        ) : brandingData?.length > 0 ? (
          brandingData.map((data, i) => (
            <Link
              className="space-y-2"
              href={`/our-works/branding/${data.slug?.current || data.slug}`}
              key={data._id || data.slug}
            >
              <FadeUp duration={0.5} delay={0.1 * i}>
                <div className="relative group">
                  <div className="relative aspect-square w-full">
                    <Image
                      loading="lazy"
                      src={data.thumbnail.asset?.url}
                      fill={true}
                      className="object-cover"
                      alt={data.title}
                    />
                  </div>
                </div>
              </FadeUp>
            </Link>
          ))
        ) : (
          <div className="text-left text-2xl font-medium animate-bounce">
            No branding projects found.
          </div>
        )}
      </div>
    </main>
  );
};

export default Branding;
