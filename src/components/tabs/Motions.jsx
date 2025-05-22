import Image from 'next/image'
import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { client } from '../../../utils/sanity'

const Motions = () => {
  const [motionVideos, setMotionVideos] = useState([])
  const [playingIndex, setPlayingIndex] = useState(null)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const playersRef = useRef([])

  const getStaticProps = async () => {
    const query = `*[_type == "motion"]{
      _id,
      title,
      ratio,
      image {
        alt,
        asset->{ url }
      },
      video {
        asset->{ url }
      },
      order
    }`
    const motions = await client.fetch(query)
    return {
      props: { motions },
      revalidate: 60,
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const { props } = await getStaticProps()
      setMotionVideos(props.motions)
    }
    fetchData()
  }, [])

  const handleHover = (index) => {
    // Pause all players
    playersRef.current.forEach((player, i) => {
      if (player && player.seekTo) {
        player.seekTo(0)
      }
    })

    setPlayingIndex(index)
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setPlayingIndex(null)
    setHoveredIndex(null)
  }

  return (
    <div className='w-11/12 xl:w-9/12 mx-auto pt-4 py-20 columns-3 gap-x-0 gap-y-0'>
      {motionVideos.length > 0 ? (
        motionVideos.map((data, i) => (
          <div
            className="relative group break-inside-avoid-column"
            key={data._id || i}
            onMouseEnter={() => handleHover(i)}
            onMouseLeave={handleMouseLeave}
          >
            <div
              className="relative w-full bg-black duration-150"
              style={{ aspectRatio: data.ratio || "9/16" }}
            >
              {hoveredIndex === i ? (
                <ReactPlayer
                  ref={(ref) => (playersRef.current[i] = ref)}
                  url={data.video.asset.url}
                  playing={playingIndex === i}
                  loop
                  
                  playsinline
                  controls={false}
                  width="100%"
                  height="100%"
                  className="object-fill"
                />
              ) : (
                <img
                  src={
                    data.image?.asset?.url ||
                    'https://res.cloudinary.com/djswkzoth/image/upload/v1730272183/Do%20Studio%20Website/new%20web%20banner/Mob_poster_syk7fx_mk6q0p.webp'
                  }
                  alt={data.image?.alt || 'Video thumbnail'}
                  className="absolute top-0 left-0 w-full h-full object-cover"
                />
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="text-left text-2xl font-medium animate-bounce">
          No videos found.
        </div>
      )}
    </div>
  )
}

export default Motions
