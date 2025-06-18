"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
// import { ClientsData } from "../../constant/data";
import Image from "next/image";
import { client } from "../../../../utils/sanity";
import { clntgava } from "../../../../public/images";

const Clients = () => {
  const [displayedImages, setDisplayedImages] = useState(10);
  const [isAllShown, setIsAllShown] = useState(false);
  const [ClientsData, setClientsData] = useState([]);


  const getStaticProps = async () => {
    const query = `*[_type == "client"] | order(orderRank){
        _id,
        title,
       
        image {
          alt,
          asset->{ url }
        },
      }`
    const clients = await client.fetch(query)

    


    //  clients.map((client) => {
    //   console.log(client.image.asset.url)
    // })


    return {
      props: { clients },

    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { props } = await getStaticProps()
        console.log(props.clients)
        setClientsData(props.clients)
        // setMotionVideos(props.motions)
      } catch (error) {
        console.error("Error fetching motion videos:", error)
      } finally {
        // setIsLoading(false)
      }
    }
    fetchData()
  }, [])


  useEffect(() => {
    const updateImageCount = () => {
      if (!isAllShown) {
        setDisplayedImages(window.innerWidth < 768 ? 8 : 10);
      }
    };

    updateImageCount(); // Initial set
    window.addEventListener("resize", updateImageCount);
    return () => window.removeEventListener("resize", updateImageCount);
  }, [isAllShown]); // Runs only when `isAllShown` changes

  const loadMoreImages = () => {
    setDisplayedImages(ClientsData.length);
    setIsAllShown(true);
  };

  return (
    <div className="bg-white py-10 xl:py-20">
      <h3 className="text-4xl md:text-7xl xl:text-8xl uppercase font-extrabold text-black text-center">
        Our Clients
      </h3>
      <div className="w-11/12 xl:w-10/12 mx-auto">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.3 }}
          className="grid place-items-center grid-cols-4 md:grid-cols-5 gap-3"
        >
          {ClientsData.slice(0, displayedImages).map((image, index) => {
            console.log(image)
            return (
              <motion.div key={index} className="w-fit h-auto">
                <Image
                  className="h-16 w-16 md:h-32 md:w-32 xl:h-48 xl:w-48 object-contain grayscale hover:grayscale-0 duration-200 cursor-pointer"
                  placeholder="blur"
                  blurDataURL='../../../public/images/medias/branding/ban1.webp'
                  src={image.image?.asset.url}
                  title={image.title}
                  alt={`${image.image.alt}`}
                  width={1080}
                  height={1080}
                  sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                  loading="lazy"
                  decoding="async"
                />
               
              </motion.div>
            )
          })}
        </motion.div>

        {/* Show All Button */}
        {!isAllShown && (
          <div className="w-full h-full flex justify-center mt-5">
            <button onClick={loadMoreImages} className="btn-21 "><span>Load More</span></button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Clients;
