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
      const [playingIndex, setPlayingIndex] = useState(null); // Track which video is playing
    



    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            const data = await getData();
            setWorkdata(data.data);
            setIsLoading(false); // Stop loading

            return 
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


    const convertDriveUrl = (url) => {
        const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
        return match ? `https://drive.google.com/file/d/${match[1]}/preview` : url;
    };



    return (
        <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20  grid grid-cols-2 md:grid-cols-3    gap-x-0 gap-y-0'>
            {isLoading ? (
                // Skeleton loading
                <Skeleton style={{ aspectRatio: "9/16", gap: "0" }} count={9} />
            ) : workdata && workdata.length > 0 ? (
                workdata.map((data, i) => (
                    <div
                        className="relative group"
                        key={i}
                        onMouseEnter={() => setPlayingIndex(i)}
                        onMouseLeave={() => setPlayingIndex(null)}
                    >
                        <div
                            className="relative w-full break-inside-avoid-column"
                            style={{ aspectRatio: data.attributes.height || "9/16" }}
                        >
                            <ReactPlayer
                                url={`${data?.attributes?.url}`}

                                // url={`https://ik.imagekit.io/ekomrfja9e/Snapinst.app_video_.mp4?tr=orig`}
                                playing={playingIndex === i} // Play only when hovered
                                loop={true}
                                muted={false}
                                playsinline={true}
                                controls={false}
                                width="100%"
                                height="100%"
                                className="object-fill"
                                style={{ objectFit: "fill" }}
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
