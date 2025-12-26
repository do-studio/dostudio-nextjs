"use client";

import 'react-loading-skeleton/dist/skeleton.css';
import Posters from '../../../../components/tabs/Posters'
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";



const CreativePosters = () => {

    useEffect(() => {
        // Set title
        document.title = "Creative Agency in Calicut: Branding, Web Design, Creatives";

        // Set meta description
        let metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
            metaDescription.setAttribute(
                "content",
                "Do Studio is a leading creative agency in Calicut offering creative services, branding, web design, graphic design, and more: View our portfolio."
            );
        } else {
            const newMetaDescription = document.createElement("meta");
            newMetaDescription.setAttribute("name", "description");
            newMetaDescription.setAttribute(
                "content",
                "Do Studio is a leading creative agency in Calicut offering creative services, branding, web design, graphic design, and more: View our portfolio."
            );
            document.head.appendChild(newMetaDescription);
        }
    }, []);

    return (
        <>


            <main className="min-h-screen w-full bg-white pt-32">
                <div className="w-fit mx-auto flex justify-between text-center rounded-full text-2xl md:text-4xl h-10 text-gray-500 font-light">
                    <div
                        className={`w-full flex justify-center items-center duration-300 uppercase  p-5 -translate-y-1 md:-translate-y-2  scale-110 text-black`}
                    >
                        <h1 className={`pb-1  font-medium foot-underline-hover-effect-black`}>
                            creative posters
                        </h1>
                    </div>
                   
                </div>

                <AnimatePresence mode="wait">

                    <motion.div
                        key="posters"
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                        <Posters />
                    </motion.div>

                </AnimatePresence>
            </main >
        </>
    );
};

export default CreativePosters;