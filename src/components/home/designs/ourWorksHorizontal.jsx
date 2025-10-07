'use client';
import React, { useRef } from 'react';

const HorizontalScrollGallery = () => {
  const scrollContainerRef = useRef(null);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -900 : 900;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Array of media sets - each set has 3 images on top and 1 video below
  const mediaSets = [
    {
      images: [
        { src: 'https://cdn.sanity.io/images/0hjyj1bs/production/eaff9bdd2cee8ffb211f182b8fffcbc4e5ff1bd5-2528x2250.webp', alt: 'Best advertising agency in Calicut' },
        { src: 'https://cdn.sanity.io/images/0hjyj1bs/production/d55d75ab1cb9e34cbc15188219fe1368c4fde8f1-1080x1080.webp', alt: 'Digital marketing agency in Calicut' },
        { src: 'https://cdn.sanity.io/images/0hjyj1bs/production/cca6d0d67136baa99ea68e1cf4a09f96b9d41f0e-2235x2235.webp', alt: 'Branding company in calicut' }
      ],
      video: 'https://cdn.sanity.io/files/0hjyj1bs/production/c12967a6e9df620f33867dc43a2e94ce2c2b6d5d.mp4'
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800', alt: 'Creative work 1' },
        { src: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800', alt: 'Creative work 2' },
        { src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800', alt: 'Creative work 3' }
      ],
      video: 'https://cdn.sanity.io/files/0hjyj1bs/production/c12967a6e9df620f33867dc43a2e94ce2c2b6d5d.mp4'
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800', alt: 'Portfolio item 1' },
        { src: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800', alt: 'Portfolio item 2' },
        { src: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', alt: 'Portfolio item 3' }
      ],
      video: 'https://cdn.sanity.io/files/0hjyj1bs/production/c12967a6e9df620f33867dc43a2e94ce2c2b6d5d.mp4'
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800', alt: 'Design work 1' },
        { src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800', alt: 'Design work 2' },
        { src: 'https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800', alt: 'Design work 3' }
      ],
      video: 'https://cdn.sanity.io/files/0hjyj1bs/production/c12967a6e9df620f33867dc43a2e94ce2c2b6d5d.mp4'
    },
    {
      images: [
        { src: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800', alt: 'Campaign 1' },
        { src: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800', alt: 'Campaign 2' },
        { src: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800', alt: 'Campaign 3' }
      ],
      video: 'https://cdn.sanity.io/files/0hjyj1bs/production/c12967a6e9df620f33867dc43a2e94ce2c2b6d5d.mp4'
    }
  ];

  return (
    <div className="w-full mx-auto py-8 relative">
      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="flex gap-5 overflow-x-auto scrollbar-hide scroll-smooth pl-8 xl:pl-16"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {mediaSets.map((set, index) => (
          <div key={index} className="flex-shrink-0 w-[90vw] sm:w-[85vw] md:w-[75vw] lg:w-[65vw] xl:w-11/12 2xl:w-10/12 max-w-7xl pl-0 xl:pl-20">
            <div className="flex flex-col gap-1 xl:gap-5">
              {/* Top three images in a grid */}
              <div className="grid grid-cols-3 gap-1 xl:gap-5">
                {set.images.map((image, imgIndex) => (
                  <div
                    key={imgIndex}
                    className="aspect-square relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200"
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={image.src}
                      alt={image.alt}
                    />
                  </div>
                ))}
              </div>

              {/* Bottom video */}
              <div className="w-full aspect-[4/2] relative rounded-xl xl:rounded-3xl overflow-hidden border-2 xl:border-8 border-gray-200">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  loop
                  muted
                >
                  <source src={set.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default HorizontalScrollGallery;