"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import FadeUp from "../../../../components/motions/fadeUp";
import Head from "next/head";

const printDesignsData = [
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1745833026/PEEKAY_BROUCHER_MOCKUP_a2ac16b067.webp",
      alt: "Print Design 1"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976934/Billboard_Mockup_2_0c64f46e34_f36407a4a9.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976931/medium_Billboard_Mockup_1_d42b0e7070_3706ad8057.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974816/large_print_11_f09d17ddb0_82fe52ebaa.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974814/print_10_51664aa010_bfdc50a5c5.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974813/print_07_e2d228c0dc_415d122a31.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974813/large_print_09_fc4d0ec873_e158628b44.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974813/large_print_08_1eca5449d8_83f4aa986c.webp",
      alt: "Print Design 2"
    }
  },
  {
    id: 2,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974576/print_05_cf5718cf7c_9b320d43e3.webp",
      alt: "Print Design 2"
    }
  },


];

const PrintDesign = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const lightboxRef = useRef(null);

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
      <Head>
        <title>Print Designing Company in Calicut | Boost Brand Visibility</title>
        <meta name="description" content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image." />
        <meta property="og:title" content="Print Designing Company in Calicut | Boost Brand Visibility" />
        <meta property="og:description" content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image." />
        <meta property="og:url" content="https://dostudio.co.in" />
        <meta name="twitter:title" content="Print Designing Company in Calicut | Boost Brand Visibility" />
        <meta name="twitter:description" content="Leading print designing company in Calicut to craft high-quality print materials like brochures, flyers, and business cards for your brand image." />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-10">
          {printDesignsData.map((item, i) => (
            <FadeUp duration={0.3} delay={0.1 * i} key={item.id}>
              <div className="relative group bg-[#dcdcde]">
                <div
                  className="relative aspect-video w-full cursor-pointer"
                  onClick={() => handleImageClick(item.image.url)}
                >
                  <Image
                    src={item.image.url}
                    fill={true}
                    className="object-cover"
                    loading="lazy"
                    alt={item.image.alt}
                  />
                </div>
              </div>
            </FadeUp>
          ))}
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
                className="absolute top-2 right-2 text-white text-2xl font-bold"
              >
                &times;
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