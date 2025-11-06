"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeUp from "../../../../components/motions/fadeUp";
import { client } from "../../../../../utils/sanity"; 
import { MdOutlineClose } from "react-icons/md";

const PackageDesign = () => {
  const [packageData, setpackageData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Lightbox states
  const [lightboxImage, setLightboxImage] = useState(null);
  const lightboxRef = useRef(null);

  // Fetch package data from Sanity
  const fetchPackageData = async () => {
    setLoading(true);
    try {
      const query = `
        *[_type == "packageDesign"] | order(orderRank) {
          _id,
          image {
            asset->{
              url
            },
            alt
          },
        }
      `;
      const data = await client.fetch(query);
      setpackageData(data);
    } catch (error) {
      console.error("Error fetching branding:", error);
      setpackageData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackageData();
  }, []);

  useEffect(() => {
    // Set title
    document.title = "Package Designing Company in Calicut, Package Design Service";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales."
      );
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute(
        "content",
        "Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales."
      );
      document.head.appendChild(newMetaDescription);
    }
  }, []);

  // Lightbox handlers
  const handleImageClick = (url) => setLightboxImage(url);
  const handleCloseLightbox = () => setLightboxImage(null);
  const handleOverlayClick = (e) => {
    if (e.target === lightboxRef.current) handleCloseLightbox();
  };

  return (
    <main className="min-h-screen w-full bg-white">
      <div className="w-11/12 xl:w-9/12 mx-auto pt-20 xl:pt-24 py-20 grid grid-cols-2 gap-0 xl:gap-10">
        {loading ? (
          <div className="text-2xl font-semibold text-gray-500 col-span-2 flex items-center justify-center">
            Loading...
          </div>
        ) : packageData.length > 0 ? (
          packageData.map((data, i) => (
            <FadeUp duration={0.3} delay={0.1 * i} key={data._id}>
              <div className="relative group">
                <div
                  className="relative aspect-square w-full cursor-pointer"
                  onClick={() => handleImageClick(data.image.asset.url)}
                >
                  <Image
                    src={data.image.asset.url}
                    fill={true}
                    className="object-cover rounded-xl"
                    loading="lazy"
                    alt={data.image.alt || "Package Design"}
                  />
                </div>
              </div>
            </FadeUp>
          ))
        ) : (
          <div className="text-left text-2xl font-medium animate-bounce col-span-2">
            No package designs found.
          </div>
        )}
      </div>

      {/* Lightbox overlay */}
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
             <MdOutlineClose/>
            </button>
            <Image
              src={lightboxImage}
              width={800}
              height={600}
              className="object-contain"
              alt="Package design lightbox view"
            />
          </div>
        </div>
      )}
    </main>
  );
};

export default PackageDesign;
