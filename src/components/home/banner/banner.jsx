"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {banners} from '../../constant/data';

const bandesk = 'https://res.cloudinary.com/djswkzoth/video/upload/v1720000391/DO_STUDIO__JUNE_M1_HORIZONTAL_p3o0uk.mp4'
const banmob = 'https://res.cloudinary.com/djswkzoth/video/upload/v1723561320/Do%20Studio%20Website/Do_Studio_M2_v5_ug6wqo.mp4'

const Banner = () => {


  return (
    <>
    <section className=''>
        <video className="hidden md:block banner-video w-full h-full" autoPlay muted loop>
                <source  src={bandesk}  type="video/mp4" />
        </video>
        <video className="block md:hidden w-full h-full" autoPlay muted loop>
                <source  src={banmob}  type="video/mp4" />
        </video>
    </section>
    </>
  );
};

export default Banner;
