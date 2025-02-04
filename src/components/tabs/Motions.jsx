import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Import the lightbox styles
import ReactPlayer from 'react-player';


async function getData() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/creative-motions?&populate=*`,
        { next: { revalidate: 60 } } // Revalidate every 60 seconds
    );

    if (!res.ok) {
        return notFound();
    }

    return res.json();
}

const motions = () => {
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
            setWorkdata(data.data);
            setIsLoading(false); // Stop loading

            return console.log(data)

            // Extract image URLs for the lightbox
            const sorted = data.data?.sort(
                (a, b) => a.attributes.order - b.attributes.order
            );
            const imageUrls = sorted.map(
                (item) => item.attributes.image.data.attributes.url
            );
            setImages(imageUrls);

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
        <div>
            {isLoading ? (
                // Skeleton loading
                <Skeleton style={{ aspectRatio: "9/16", gap: "0" }} count={9} />
            ) : workdata && workdata.length > 0 ? (
                workdata.map((data, i) => (
                    <div className="relative group" key={i}>
                        <div
                            className={`relative w-full break-inside-avoid-column`}
                            style={{
                                aspectRatio: data.attributes.height
                                    ? `${data.attributes.height}` // Dynamic aspect ratio
                                    : "9/16", // Fallback to a square aspect ratio
                            }}
                        >
                            <ReactPlayer
                                url={`${data?.attributes?.url}?autoplay=0&controls=0&modestbranding=0&rel=0&showinfo=0&fs=0&iv_load_policy=3&playsinline=1&disablekb=0`}
                                playing={false} // Autoplay
                                loop={true}
                                muted={true}
                                playsinline={true}
                                controls={false}
                                width="100%"
                                height="100%"
                                className="object-fill"
                                style={{ objectFit: "fill" }}
                                config={{
                                    youtube: {
                                        playerVars: {
                                            controls: 0, // Hides player controls
                                            modestbranding: 1, // Minimizes branding
                                            rel: 0, // Prevents showing related videos from other channels
                                            fs: 0, // Disables fullscreen button
                                            iv_load_policy: 3, // Hides annotations
                                            playsinline: 1, // Ensures inline playback on mobile
                                            disablekb: 1, // Disables keyboard controls
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                ))
            ) : (
                <div className="text-left text-2xl font-medium animate-bounce">
                    No data found.
                </div>
            )}

        </div>
    )
}

export default motions
