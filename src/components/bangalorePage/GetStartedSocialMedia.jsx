
import React from 'react'
import { LogoDO } from '../../../public/images'

const GetStarted = ({ heading, description, buttonText, buttonLink, altText }) => {
    return (
        <div className="bg-white relative" id="contact-form">
            <img
                className="w-60 xl:h-full xl:w-full absolute top-[50%] left-[50%] -translate-x-[50%] object-contain -translate-y-[50%] opacity-5 z-10"
                src={LogoDO.src}
                alt={altText[1]}
            />
            <section className='relative flex justify-center'>
                <section className='bg-white w-full xl:w-full mx-auto text-center py-10 xl:py-20 flex flex-col gap-5'>
                    <h6 className='text-5xl xl:text-6xl font-bold text-black uppercase'>{heading}</h6>
                    <p className='xl:w-10/12 w-full mx-auto px-5'>{description}</p>
                    <div className="mt-6 z-20">
                        <a
                            href={buttonLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-primarygreen text-black font-medium px-8 py-4 rounded-full hover:bg-primarygreenhvr transition-all duration-300 hover:cursor-pointer"
                        >
                            {buttonText}
                        </a>
                    </div>
                </section>

            </section>

        </div>
    )
}

export default GetStarted