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

  useEffect(() => {
    // Set title
    document.title = "Print Designing Company in Calicut | Boost Brand Visibility";

    // Set meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image.");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", "Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image.");
      document.head.appendChild(newMetaDescription);
    }

    // Set Open Graph meta tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Print Designing Company in Calicut | Boost Brand Visibility");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.setAttribute("content", "Print Designing Company in Calicut | Boost Brand Visibility");
      document.head.appendChild(newOgTitle);
    }

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.setAttribute("content", "Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image.");
      document.head.appendChild(newOgDescription);
    }

    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      const newOgUrl = document.createElement("meta");
      newOgUrl.setAttribute("property", "og:url");
      newOgUrl.setAttribute("content", "https://dostudio.co.in");
      document.head.appendChild(newOgUrl);
    }

    // Set Twitter meta tags
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", "Print Designing Company in Calicut | Boost Brand Visibility");
    } else {
      const newTwitterTitle = document.createElement("meta");
      newTwitterTitle.setAttribute("name", "twitter:title");
      newTwitterTitle.setAttribute("content", "Print Designing Company in Calicut | Boost Brand Visibility");
      document.head.appendChild(newTwitterTitle);
    }

    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", "Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image.");
    } else {
      const newTwitterDescription = document.createElement("meta");
      newTwitterDescription.setAttribute("name", "twitter:description");
      newTwitterDescription.setAttribute("content", "Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image.");
      document.head.appendChild(newTwitterDescription);
    }

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      const newTwitterCard = document.createElement("meta");
      newTwitterCard.setAttribute("name", "twitter:card");
      newTwitterCard.setAttribute("content", "summary_large_image");
      document.head.appendChild(newTwitterCard);
    }
  }, []);
  

  return (
    <>
      
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
