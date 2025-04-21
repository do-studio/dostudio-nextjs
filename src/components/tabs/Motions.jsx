import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css"; // Import the lightbox styles
import ReactPlayer from 'react-player';


async function getData() {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/creative-motions?pagination[pageSize]=1000&populate=*`,
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
    const [videoProgress, setVideoProgress] = useState({}); // Track the progress of videos
    const [hoveredVideos, setHoveredVideos] = useState(new Set()); // Track which videos have been hovered




    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Start loading
            const data = await getData();
            setWorkdata(data.data);
            setIsLoading(false); // Stop loading

            // Extract image URLs for the lightbox
            const sorted = data.data?.sort(
                (a, b) => a.attributes.order - b.attributes.order
            );
            // const imageUrls = sorted.map(
            //     (item) => item.attributes.image.data.attributes.url
            // );
            setWorkdata(sorted);

        };
        fetchData();
    }, []);



    // // Sort the data by the order field
    // const sortedData = workdata?.sort(
    //     (a, b) => a.attributes.order - b.attributes.order
    // );





    const handleProgress = (progress, index) => {
        setVideoProgress((prev) => ({
            ...prev,
            [index]: progress.playedSeconds, // Store the current video progress in seconds
        }));
    };

    const handleHover = (index) => {
        setPlayingIndex(index); // Start playing the video
        setHoveredVideos((prev) => new Set(prev).add(index)); // Mark the video as hovered
    };



    

    return (
        <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20  columns-3     gap-x-0 gap-y-0'>
            {isLoading ? (
                // Skeleton loading
                <Skeleton style={{ aspectRatio: "9/16", gap: "0" }} count={9} />
            ) : workdata && workdata.length > 0 ? (
                workdata.map((data, i) => (
                    <div
                        className="relative group break-inside-avoid-column"
                        key={i}
                        onMouseEnter={() => handleHover(i)} // Hover to start playing
                        onMouseLeave={() => setPlayingIndex(null)} // Stop video when hover ends
                    >
                        <div
                            className="relative w-full break-inside-avoid-column bg-black duration-150"
                            style={{ aspectRatio: data.attributes.height || "9/16" }}
                        >
                         
                            {hoveredVideos.has(i) || playingIndex === i ? (
                                <ReactPlayer
                                    url={`${data?.attributes?.url}?tr=orig&ik-cors=force`}
                                    playing={playingIndex === i} // Play only when hovered
                                    loop={true}
                                    muted={false}
                                    playsinline={true}
                                    controls={false}
                                    width="100%"
                                    height="100%"
                                    className="object-fill"
                                    style={{ objectFit: "fill" }}
                                    onProgress={(progress) => handleProgress(progress, i)} // Track video progress
                                    startTime={videoProgress[i] || 0} // Start from last position
                                />
                            ) : (
                                <img
                                    src={`${data?.attributes?.videothump ?? 'https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp'}`} // Thumbnail at 10 seconds
                                    alt="Thumbnail"
                                    id={data.id}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                            )}
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
