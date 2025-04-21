import Image from 'next/image'
import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Import the lightbox styles


async function getData() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/creatives?pagination[pageSize]=1000&populate=*`,
        { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!res.ok) {
        return notFound();
    }

    return res.json();
}

const posters = () => {
    const [workdata, setWorkdata] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // Lightbox open state
    const [photoIndex, setPhotoIndex] = useState(0); // Current image index
    const [images, setImages] = useState([]); // Image URLs for the lightbox
    const [isLoading, setIsLoading] = useState(true); // Loading state



    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            const data = await getData();
    
            // Sort the data: with order first (ascending), without order last
            const sorted = data.data?.slice().sort((a, b) => {
                const aHasOrder = typeof a.attributes.order === "number";
                const bHasOrder = typeof b.attributes.order === "number";
    
                if (aHasOrder && bHasOrder) {
                    return a.attributes.order - b.attributes.order;
                } else if (aHasOrder) {
                    return -1;
                } else if (bHasOrder) {
                    return 1;
                } else {
                    return 0;
                }
            }).reverse(); // Reverse to make highest order come first
    
            setWorkdata(sorted);
    
            // Extract image URLs for the lightbox from the sorted list
            const imageUrls = sorted.map(
                (item) => item.attributes.image.data.attributes.url
            );
            setImages(imageUrls);
    
            setIsLoading(false); // Stop loading
        };
        fetchData();
    }, []);
    



    // Sort the data by the order field
    const sortedData = workdata?.sort(
        (a, b) => a.attributes.order - b.attributes.order
    );


    // Handle image click
    const handleImageClick = (order) => {
        const index = sortedData.findIndex((item) => item.attributes.order === order);
        setPhotoIndex(index);
        setIsOpen(true);
    };



    return (
        <div className={`w-11/12 xl:w-9/12 mx-auto pt-4 py-20    columns-3    gap-x-0 gap-y-0`}>

            <div>
                {isLoading ? (
                    // Skeleton loading
                    <Skeleton style={{ aspectRatio: "1/1", gap: "0" }} count={9} />
                ) : sortedData && sortedData.length > 0 ? (
                    sortedData.reverse().map((data, i) => (
                        <div className="relative group" key={i}>
                            <div
                                className={`relative w-full break-inside-avoid-column`}
                                style={{
                                    aspectRatio: data.attributes.hgt
                                        ? `${data.attributes.hgt}` // Dynamic aspect ratio
                                        : "1 / 1", // Fallback to a square aspect ratio
                                }}
                            >
                                <Image
                                    // onClick={() => handleImageClick(data.attributes.order)} // Use order instead of index
                                    src={data.attributes.image.data.attributes.url}
                                    fill={true}
                                    loading="lazy"
                                    className="object-cover cursor-pointer"
                                    alt={`wrk${i + 1}`}
                                />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-left text-2xl font-medium animate-bounce">
                        No data found.
                    </div>
                )}
                {/* Lightbox */}
                {isOpen && (
                    <Lightbox
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={images.map((src) => ({ src }))}
                        index={photoIndex}
                        onView={({ index }) => setPhotoIndex(index)}
                        closeOnClickOutside={true} // Ensure the lightbox closes when clicking outside
                        loading={{
                            // Customize the loading indicator
                            spinner: () => (
                                <div className="flex items-center justify-center h-full">
                                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
                                </div>
                            ),
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default posters
