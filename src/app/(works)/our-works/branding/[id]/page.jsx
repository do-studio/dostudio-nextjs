import React from "react";
import Image from "next/image";
import FadeUp from "../../../../../components/motions/fadeUp";

// Local data array
const brandingData = [
  
  {
    id: 1,
    slug: "adis",
    title: "adis",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171401/large_ADIS_FROZEN_BITES_THUMB_04_ace03ce408_6f0c194fb6.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171397/large_ADIS_FROZEN_BITES_01_1c156a150a_98ed308f21.webp",
        width: 1200,
        height: 800,
        alt: "adis"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171404/large_ADIS_FROZEN_BITES_03_872d2dd941_7493ee808e.webp",
        width: 1200,
        height: 800,
        alt: "adis"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171404/large_ADIS_FROZEN_BITES_02_e588f97a02_4573cb72fe.webp",
        width: 1200,
        height: 800,
        alt: "adis"
      },

    ]
  },
  {
    id: 2,
    slug: "medimode",
    title: "medimode",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1747482760/MEDI_MODE_GREEN_LOGO_SQUAR_OP_01_-01_e5qwny.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1747481990/MEDI_MODE_GREEN_LOGO_OP_01_-01_dokfh5.webp",
        width: 1200,
        height: 800,
        alt: "medimode"
      },

    ]
  },
  {
    id: 3,
    slug: "kebabji",
    title: "Kebabji",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979589/KEBABJI_05_f3f6d019d5_c16a67984b.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979585/large_KEBABJI_01_356cd4636c_e863c8a3c4.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979592/large_KEBABJI_03_73f0d427dc_f8568b04b4.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979593/KEBABJI_04_27b247102f_da4549ce26.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
    ]
  },
  {
    id: 4,
    slug: "add-mind",
    title: "add mind",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741170922/large_s5_kfziqa_43869b7f15.jpg"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741170849/ADDMIND_p_01_c0797feafa_413fc29623.webp",
        width: 1200,
        height: 800,
        alt: "add mind"
      },

    ]
  },
  {
    id: 5,
    slug: "geogrip",
    title: "Geogrip",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740978493/medium_large_GEOGRIP_THUMB_261a6d7665_761d6ca25e.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740978535/GEOGRIP_01_09ccde30b4_3974a1667e.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740978536/GEOGRIP_02_55d190d471_819570ad69.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
    ]
  },
  {
    id: 6,
    slug: "chai-drop",
    title: "chai drop",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171141/large_chai_drop_04tumb_bfac854407_0547a65068.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171137/large_chai_drop_01_83d791a0ff_368700a76c.webp",
        width: 1200,
        height: 800,
        alt: "chai drop"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171137/medium_chai_drop_02_5a79b4260f_9636301c15.webp",
        width: 1200,
        height: 800,
        alt: "chai drop"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171137/small_chai_drop_03_7b0ec6a5b9_e44d3f2fa7.webp",
        width: 1200,
        height: 800,
        alt: "chai drop"
      },

    ]
  },
  {
    id: 7,
    slug: "dream-of-us",
    title: "Dream of us",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979589/DOU_THUMB_04_b6adb23bf2_0babb3af31.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173593/large_DOU_01_01_e811abdcd3_209a028624.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173777/large_DOU_04_5ac00ead1a_c345ac9036.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173777/DOU_03_86d422a7ff_50ec1c72ac.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173777/large_DOU_02_3dcd939588_82b11c4a79.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },

    ]
  },
  {
    id: 8,
    slug: "my-work",
    title: "My work",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174752/MW_THUMB_08_440ae154f1_54ab465145.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174960/medium_MW_01_4f7633d7ac_3dfec7a490.webp",
        width: 1200,
        height: 800,
        alt: "My work"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174968/large_MW_03_b477565878_0363ffb11b.webp",
        width: 1200,
        height: 800,
        alt: "My work"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174968/MW_05_bcd9e75ff5_857445500d.webp",
        width: 1200,
        height: 800,
        alt: "My work"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174969/large_MW_02_f76ce4eb47_37cf8a113a.webp",
        width: 1200,
        height: 800,
        alt: "My work"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174969/MW_04_348b5a16e4_804996543c.webp",
        width: 1200,
        height: 800,
        alt: "My work"
      },

    ]
  },
  {
    id: 9,
    slug: "blue-leaf",
    title: "Blue Leaf",
    coverimage: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740977266/large_blue_leaf_68a59f9721_bd2707dca3.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740977274/BLUE_LEAF_LOGO_OP_01_5d9eaeee49_bd4b1c0640.webp",
        width: 1200,
        height: 800,
        alt: "Blue Leaf Logo"
      },
    ]
  },

];

export async function generateMetadata({ params }) {
  const brand = brandingData.find(item => item.slug === params.id);

  if (!brand) {
    return {
      title: "Branding Not Found - Do Studio",
      description: "The requested brand could not be found.",
    };
  }

  return {
    title: brand.title || "Branding Services",
    description: `Branding work for ${brand.title}`,
    metadataBase: new URL("https://dostudio.co.in"),
    openGraph: {
      title: brand.title,
      description: `Branding work for ${brand.title}`,
      url: `https://dostudio.co.in/branding/${brand.slug}`,
      images: [
        {
          url: brand.coverimage.url,
          width: 1200,
          height: 630,
          alt: brand.title,
        },
      ],
      type: "article",
    },
  };
}

const BrandingInnerPage = ({ params }) => {
  const brand = brandingData.find(item => item.slug === params.id);

  if (!brand) {
    return (
      <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20">
        <h1 className="text-2xl font-medium">Brand not found</h1>
      </div>
    );
  }

  return (
<main className="xl:min-h-screen w-full">
      <div className="w-11/12 xl:w-10/12 mx-auto pt-20 xl:pt-24 py-20">
        {brand.innerImages?.map((image, i) => (
          <div key={i} className="relative w-full mb-10">
            <FadeUp duration={0.2}>
              <div className="w-full overflow-hidden">
                <Image
                  src={image.url}
                  width={image.width}
                  height={image.height}
                  loading="lazy"
                  className="w-full h-auto object-contain"
                  alt={image.alt || `${brand.title} image ${i + 1}`}
                  style={{
                    maxWidth: '100%',
                    height: 'auto'
                  }}
                />
              </div>
            </FadeUp>
          </div>
        ))}
      </div>
    </main>
  );
};

export default BrandingInnerPage;