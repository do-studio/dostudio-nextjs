"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {banners} from '../../constant/data';

const ban1 = 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4'

const Banner = () => {
  // https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4

  return (
    <>
    <section>
        <video className="banner-video w-full h-full" autoPlay muted loop>
                <source src={ban1}  type="video/mp4" />
        </video>
    </section>
    </>
  );
};

export default Banner;
