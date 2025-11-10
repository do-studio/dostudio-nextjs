import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { client } from '../../../utils/sanity';


const Posters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [sortedData, setSortedData] = useState([])
  const [loading, setLoading] = useState(true);

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
    const query = `*[_type == "poster" && !(_id in path("drafts.**"))] | order(orderRank){
    _id,
    title,
    ratio,
    image {
      alt,
      asset->{
        url
      }
    }
  }`;

    const posters = await client.fetch(query);

    return {
      props: {
        posters,
      },

    };
  }


  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        const { props } = await getStaticProps()
        setSortedData(props.posters)
      } catch (error) {
        console.error("Error fetching posters data:", error);
      } finally {
        setLoading(false);
      }
    }


    fetchData()
  }, [])

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  return (
    <div className="w-11/12 xl:w-9/12 mx-auto pt-4 py-20 columns-3 gap-x-0 gap-y-0">
      {loading ? (
        Array.from({ length: 12 }).map((_, index) => (
          <Skeleton key={index} height={400} className="w-full " />
        ))
      ) : sortedData.length > 0 ? (
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
      )
      }

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