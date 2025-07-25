import React, { useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { client } from '../../../utils/sanity'
import Skeleton from 'react-loading-skeleton'

const Motions = () => {
  const [motionVideos, setMotionVideos] = useState([])
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const playersRef = useRef([])

  const getStaticProps = async () => {
    const query = `*[_type == "motion"] | order(orderRank){
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
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { props } = await getStaticProps()
        setMotionVideos(props.motions)
      } catch (error) {
        console.error("Error fetching motion videos:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleHover = (index) => {
    // Optionally seek to zero if needed, though unmounting player resets anyway
    setHoveredIndex(index)
  }

  const handleMouseLeave = () => {
    setHoveredIndex(null)
  }

  return (
    <div className="w-11/12 xl:w-9/12 mx-auto pt-4 py-20 grid grid-cols-3">
      {isLoading ? (
        Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} className="aspect-[9/16] w-full" />
        ))
      ) : motionVideos.length > 0 ? (
        motionVideos.map((data, i) => {
          const isWide = data.ratio?.replace(/\s/g, '') === '16/9'

          return (
            <div
              key={data._id || i}
              className={`relative group  ${
                isWide ? 'col-span-3' : ''
              }`}
              onMouseEnter={() => handleHover(i)}
              onMouseLeave={handleMouseLeave}
            >
              <div
                className="relative w-full bg-black duration-150"
                style={{ aspectRatio: data.ratio || '9/16' }}
              >
                {hoveredIndex === i ? (
                  <ReactPlayer
                    url={data.video.asset.url}
                    playing={true}
                    loop
                    playsinline
                    controls={false}
                    width="100%"
                    height="100%"
                    className="object-fill"
                    muted={false} // Unmute if you want sound on hover, or true for muted
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
          )
        })
      ) : (
        <div className="text-left text-2xl font-medium animate-bounce">
          No videos found.
        </div>
      )}
    </div>
  )
}

export default Motions
