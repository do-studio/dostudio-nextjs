"use client";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import ClipLoader from "react-spinners/DotLoader";





const LoadingMain = () => {
  return (
    <>
      <div className='fixed top-0 bottom-0 left-0 right-0 bg-black z-50 min-h-screen w-full flex justify-center items-center'>

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className=' text-black uppercase text-4xl font-black'
        >
          <div className=''>
            <video
              className="h-40 w-40 xl:h-60 xl:w-60 bg-transparent"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723785309/Do%20Studio%20Website/Vertical_1_utwcx9.webm?c_limit=3000&cache=true' type="video/mp4" />
              <source src='https://res.cloudinary.com/djswkzoth/video/upload/v1723110687/Do%20Studio%20Website/DO_STUDIO_LOGO_3-1_pevafw.mov?c_limit=3000&cache=true' type="video/mp4" />
            </video>
          </div>
          {/* <ClipLoader
                color={'#AFFE00'}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
            /> */}
        </motion.div>
      </div>
    </>
  )
}





export default function RootClient({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleComplete = () => {
      setLoading(false);
    };

    // Simulate a loading delay
    setTimeout(handleComplete, 500);

    return () => {
      // Clean up
      clearTimeout(handleComplete);
    };
  }, []);

  return (
    <>
      {loading && <LoadingMain />}
      <div className={` ${loading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
        {children}
      </div>
    </>
  );
}
