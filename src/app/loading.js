"use client"
import React from 'react';
import { motion } from 'framer-motion';
import ClipLoader from "react-spinners/DotLoader";

const LoadPage = () => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 bg-white z-50 min-h-screen w-full flex justify-center items-center'>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className=' text-black uppercase text-4xl font-black'
      >
        <ClipLoader
          color={'#AFFE00'}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </motion.div>
    </div>
  );
};

export default LoadPage;
