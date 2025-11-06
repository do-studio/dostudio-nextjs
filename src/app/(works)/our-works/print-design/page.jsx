"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import FadeUp from "../../../../components/motions/fadeUp";
import Head from "next/head";
import { client } from "../../../../../utils/sanity";
import { MdOutlineClose } from "react-icons/md";

const PrintDesign = () => {
  const [printData, setPrintData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);
  const lightboxRef = useRef(null);

  // Fetch print design data from Sanity
  useEffect(() => {
    const fetchPrintDesignData = async () => {
      setLoading(true);
      try {
        const query = `
          *[_type == "printDesign"] | order(orderRank) {
            _id,
            images[]{
              asset->{
                url
              }
            },
          }
        `;
        const data = await client.fetch(query);
        setPrintData(data);
      } catch (error) {
        console.error("Error fetching print design data:", error);
        setPrintData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchPrintDesignData();
  }, []);

  const handleImageClick = (url) => setLightboxImage(url);
  const handleCloseLightbox = () => setLightboxImage(null);
  const handleOverlayClick = (e) => {
    if (e.target === lightboxRef.current) handleCloseLightbox();
  };

  return (
    <>
      <Head>
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
        <meta
          name="twitter:title"
          content="Print Designing Company in Calicut | Boost Brand Visibility"
        />
        <meta
          name="twitter:description"
          content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image."
        />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20">
          {loading ? (
            <div className="text-center text-lg text-gray-500 py-20">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
              {printData.map((item) =>
                (item.images || []).map((imageObj, imgIdx) => (
                  <FadeUp
                    duration={0.3}
                    delay={0.1 * imgIdx}
                    key={`${item._id}_${imgIdx}`}
                  >
                    <div className="relative group ">
                      <div
                        className="relative aspect-video w-full cursor-pointer"
                        onClick={() => handleImageClick(imageObj.asset.url)}
                      >
                        <Image
                          src={imageObj.asset.url}
                          fill={true}
                          className="object-cover rounded-xl"
                          loading="lazy"
                          alt="Print Design"
                        />
                      </div>
                    </div>
                  </FadeUp>
                ))
              )}
            </div>
          )}
        </div>

        {lightboxImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
            ref={lightboxRef}
            onClick={handleOverlayClick}
          >
            <div className="relative">
              <button
                onClick={handleCloseLightbox}
                className="absolute top-2 right-2 text-black bg-white w-8 h-8 grid place-items-center rounded-full text-sm font-bold"
              >
                <MdOutlineClose />
              </button>
              <Image
                src={lightboxImage}
                width={800}
                height={600}
                className="object-contain"
                alt="Print design lightbox view"
              />
            </div>
          </div>
        )}
      </main>
    </>
  );
};

export default PrintDesign;
