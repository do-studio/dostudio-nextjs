"use client"
import React from 'react';

const movingText=[
    {
        word:`BRANDING`
    },
    {
        word:`BUSINESS CARD`
    },
    {
        word:`MARKETING`
    },
    {
        word:`POSTER`
    },
    {
        word:`PACKAGE DESIGN`
    },
    {
        word:`PHOTOSHOOT`
    },
    {
        word:`PRINT DESIGN`
    },
    {
        word:`BRANDING`
    },
    {
        word:`BUSINESS CARD`
    },
    {
        word:`MARKETING`
    },
    {
        word:`POSTER`
    },
    {
        word:`PACKAGE DESIGN`
    },
    {
        word:`PHOTOSHOOT`
    },
    {
        word:`PRINT DESIGN`
    },
    {
        word:`BRANDING`
    },
    {
        word:`BUSINESS CARD`
    },
    {
        word:`MARKETING`
    },
    {
        word:`POSTER`
    },
    {
        word:`PACKAGE DESIGN`
    },
    {
        word:`PHOTOSHOOT`
    },
    {
        word:`PRINT DESIGN`
    },
   
]

const Movingwords = () => {
  return (
    <div className="slider">
    <div className="slide-track">
        {movingText?.map((text,i)=>(
        <div key={i} className="slide">
            <h3 className='text-lg font-extrabold'>{text.word}</h3>
        </div>
        ))}
    </div>
  </div>
  )
}

export default Movingwords