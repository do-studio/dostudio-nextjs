"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import FadeUp from "../../../../components/motions/fadeUp";
import Head from "next/head";
import { Helmet } from "react-helmet";

async function fetchData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/print-designs?&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PrintDesign = () => {
  const [data, setData] = useState([]);
  const [lightboxImage, setLightboxImage] = useState(null);
  const lightboxRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const workdata = await fetchData();
        const sortedData = workdata.data?.sort(
          (a, b) => a.attributes.order - b.attributes.order
        );
        setData(sortedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    getData();
  }, []);

  const handleImageClick = (url) => {
    setLightboxImage(url);
  };

  const handleCloseLightbox = () => {
    setLightboxImage(null);
  };

  const handleOverlayClick = (e) => {
    if (e.target === lightboxRef.current) {
      handleCloseLightbox();
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Print Designing Company in Calicut | Boost Brand Visibility
        </title>
        <meta
          name="description"
          content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image."
        />

        <meta
          property="og:title"
          content="Print Designing Company in Calicut | Boost Brand Visibility"
        />
        <meta
          property="og:description"
          content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image."
        />
        <meta property="og:url" content="https://dostudio.co.in" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Print Designing Company in Calicut | Boost Brand Visibility"
        />
        <meta
          name="twitter:description"
          content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image."
        />
      </Helmet>
      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {data && data.length > 0 ? (
            data.map((item, i) => (
              <FadeUp duration={0.3} delay={0.1 * i} key={i}>
                <div className="relative group bg-[#dcdcde]">
                  <div
                    className="relative aspect-video w-full cursor-pointer"
                    onClick={() =>
                      handleImageClick(
                        item.attributes.image.data.attributes.url
                      )
                    }
                  >
                    <Image
                      src={item.attributes.image.data.attributes.url}
                      fill={true}
                      className="object-cover"
                      loading="lazy"
                      alt="wrk1"
                    />
                  </div>
                </div>
              </FadeUp>
            ))
          ) : (
            <div className="text-left text-2xl font-medium animate-bounce">
              No data found.
            </div>
          )}
        </div>

        {/* Lightbox */}
        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            ref={lightboxRef}
            onClick={handleOverlayClick}
          >
            <div className="relative">
              <button
                onClick={handleCloseLightbox}
                className="absolute top-2 right-2 text-white text-2xl font-bold"
              >
                &times;
              </button>
              <Image
                src={lightboxImage}
                width={800}
                height={600}
                className="object-contain"
                alt="Lightbox image"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PrintDesign;
