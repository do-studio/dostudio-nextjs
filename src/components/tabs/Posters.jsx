import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { client } from '../../../utils/sanity';

const postersData = [
  {
    id: 1,
    order: 1,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745405949/Lulu_thudarum_39e52c82f8.webp",
    hgt: "4/5"
  },
  {
    id: 2,
    order: 2,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745220987/Lulu_empuran_17b9ddcf3a.webp",
    hgt: "4/5"
  },
  {
    id: 3,
    order: 3,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745220987/large_Lulu_vishu_ca477cb2fc.webp",
    hgt: "4/5"
  },
  {
    id: 4,
    order: 4,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174474/medium_AROOHA_P4_copy_e8bcd8835f_32723205a2.webp",
    hgt: "1/1"
  },
  {
    id: 5,
    order: 5,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174362/small_medium_C_Builders_JUNE_P2_copy_7e41f57f4d_6c8779bed2.webp",
    hgt: "1/1"
  },
  {
    id: 6,
    order: 6,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174108/large_Kurikkal_MAR_P3_copy_d884943c7b_62d2c88128.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740977522/large_Ztart_Aug_Destination_18cc317071_ee37b09ffa.webp",
    hgt: "4/5"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974452/large_AROOHA_aug_p8_v2_copy_f97df6128d_f9e6d4b8f3.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/USA_AD_2_b46ad390d2_faabe9db3a.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/AROOHA_AUG_P1_copy_49da850ee2_0cf2bdc3bc.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/large_ZTART_CANADA_AD_f4b9f66a7f_af02cd7e41.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/medium_uk_visa_ad_de2cf60dc5_171ee9d252.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974452/large_AROOHA_p5_copy_ed8d2a45b7_13b2e5309e.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974112/palooda_SEP_P4_v5_copy_4d1f3e9493_8f10468a08.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974112/large_Whats_App_Image_2025_01_13_at_17_12_07_77026146_75e998b28e_421155b073.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974111/large_T_and_T_NOV_P2_copy_349d77fbb9_a5d98513a9.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974111/large_Whats_App_Image_2025_01_13_at_17_11_45_645dcaad_2daa8f0661_b9172a1dbc.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974111/large_Whats_App_Image_2025_01_13_at_17_11_44_545857c7_36335c331c_f72ae60992.webp",
    hgt: "1/1"
  },




];





const Posters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images] = useState(postersData.map(item => item.imageUrl));
  const [sortedData, setSortedData] = useState([])

  // Sort the data: with order first (ascending), without order last
  // const sortedData = [...postersData].sort((a, b) => {
  //   const aHasOrder = typeof a.order === 'number';
  //   const bHasOrder = typeof b.order === 'number';

  //   if (aHasOrder && bHasOrder) {
  //     return b.order - a.order; // Reverse sort (highest first)
  //   } else if (aHasOrder) {
  //     return -1;
  //   } else if (bHasOrder) {
  //     return 1;
  //   }
  //   return 0;
  // });


  const getStaticProps = async () => {
    const query = `*[_type == "poster"]{
    _id,
    title,
  
    ratio,
    image {
      alt,
      asset->{
        url,
        
      }
    }
  }`;


    const posters = await client.fetch(query);

    return {
      props: {
        posters,
      },
      revalidate: 60,
    };
  }


  useEffect(() => {

    const fetchData = async () => {
      const { props } = await getStaticProps()

      console.log(props.posters)
      setSortedData(props.posters)
    }
    fetchData()
  }, [])

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="w-11/12 xl:w-9/12 mx-auto pt-4 py-20 columns-3 gap-x-0 gap-y-0">
      {sortedData.length > 0 ? (
        sortedData.map((data, i) => (
          <div className="relative group" key={data.id}>
            <div
              className="relative w-full break-inside-avoid-column"
              style={{
                aspectRatio: data.ratio || '1 / 1',
              }}
            >
              <Image
                onClick={() => handleImageClick(i)}
                src={data.image.asset.url}
                width={500}
                height={500}
                loading="lazy"
                className="object-cover cursor-pointer"
                alt={`Poster ${data.id}`}
              />
            </div>
          </div>
        ))
      ) : (
        <div className="text-left text-2xl font-medium animate-bounce">
          No posters found.
        </div>
      )}

      {/* <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images.map((src) => ({ src }))}
        index={photoIndex}
        onView={({ index }) => setPhotoIndex(index)}
        closeOnClickOutside={true}
        loading={{
          spinner: () => (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            </div>
          ),
        }}
      /> */}
    </div>
  );
};

export default Posters;