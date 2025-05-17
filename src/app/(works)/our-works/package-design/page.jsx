import Image from "next/image";
import FadeUp from "../../../../components/motions/fadeUp";

export const metadata = {
  title: 'Package Designing Company in Calicut, Package Design Service',
  description: 'Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales.',
  metadataBase: new URL('https://dostudio.co.in'),
}

const packageDesigns = [
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173202/carry_bag_536dc29191_51e01272dc.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173139/pinaple_box_mock_2ca5dd154b_e1a2a2fbf6.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173078/large_34_Parfume_Packaging_cc41244991_1169371a09.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173047/Paper_Bag_01_d4df1dfb6a_df89a0a9bd.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171647/poopbox1_f6be06aa98_0c6987bc76.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976608/large_pista_1_9d7889920e.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976569/salted_cashew_1_6935b3f81f.webp",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976305/Jaas_01_gyumcm_90e36e2947.jpg",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976305/Jaas_3_01_z4fg9u_601dff3c9c.jpg",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740976304/Chikki_Peanut_01_evrcov_2f89c11f04.jpg",
      alt: "Package Design 1"
    }
  },
  {
    id: 1,
    image: {
      url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974848/eras_bbq_cashew_fb1253009f_3b6a348c5c.webp",
      alt: "Package Design 1"
    }
  },


];

const PackageDesign = () => {
  return (
    <>
      <main className="min-h-screen w-full bg-white">
        <div className="w-11/12 xl:w-9/12 mx-auto pt-20 xl:pt-24 py-20 grid grid-cols-2 gap-0 xl:gap-10">
          {packageDesigns.length > 0 ? (
            packageDesigns.map((data, i) => (
              <FadeUp duration={0.3} delay={0.1 * i} key={data.id}>
                <div className="relative group">
                  <div className="relative aspect-square w-full">
                    <Image
                      src={data.image.url}
                      fill={true}
                      className="object-cover"
                      loading="lazy"
                      alt={data.image.alt}
                    />
                  </div>
                </div>
              </FadeUp>
            ))
          ) : (
            <div className="text-left text-2xl font-medium animate-bounce">
              No package designs found.
            </div>
          )}
        </div>
      </main>
    </>
  );
};

export default PackageDesign;