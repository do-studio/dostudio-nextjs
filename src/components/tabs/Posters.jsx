import Image from 'next/image';
import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';

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



];

const Posters = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images] = useState(postersData.map(item => item.imageUrl));

  // Sort the data: with order first (ascending), without order last
  const sortedData = [...postersData].sort((a, b) => {
    const aHasOrder = typeof a.order === 'number';
    const bHasOrder = typeof b.order === 'number';

    if (aHasOrder && bHasOrder) {
      return b.order - a.order; // Reverse sort (highest first)
    } else if (aHasOrder) {
      return -1;
    } else if (bHasOrder) {
      return 1;
    }
    return 0;
  });

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
                aspectRatio: data.hgt || '1 / 1',
              }}
            >
              <Image
                onClick={() => handleImageClick(i)}
                src={data.imageUrl}
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

      <Lightbox
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
      />
    </div>
  );
};

export default Posters;