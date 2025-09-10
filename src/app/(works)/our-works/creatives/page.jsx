  "use client";

  import Head from "next/head";
  import 'react-loading-skeleton/dist/skeleton.css';
  import Posters from '../../../../components/tabs/Posters'

  import Videos from '../../../../components/tabs/Videos'
  import Motions from '../../../../components/tabs/Motions'
  import { useEffect, useState } from "react";
  import { motion, AnimatePresence } from "framer-motion";


  const getVariants = (activeTab, prevTab) => {
    let direction = 0;

    // Motion Tab
    if (activeTab === "motions") direction = 100; // Right to left

    // Videos Tab
    if (activeTab === "videos") direction = -100; // Left to right

    // Posters Tab
    if (activeTab === "posters") {
      if (prevTab === "motions") direction = -100; // From motions, left to right
      if (prevTab === "videos") direction = 100;  // From videos, right to left
    }

    return {
      initial: { opacity: 0, x: direction },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -direction },
    };
  };

  const DigitalMarketing = () => {
    const [activeTab, setActiveTab] = useState('posters')
    const [prevTab, setPrevTab] = useState(null);

    const handleTabChange = (tab) => {
      setPrevTab(activeTab); // Store previous tab before updating
      setActiveTab(tab);
    };

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
          <div className="w-fit mx-auto flex justify-between text-center rounded-full  md:text-4xl h-10 text-gray-500 font-light">
            <div
              className={`w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5 ${activeTab === "motions" ? "-translate-y-1 md:-translate-y-2 scale-110 text-black  " : ""
                }`}
              onClick={() => handleTabChange("motions")}
            >
              <h1 className={`pb-1 ${activeTab === "motions" ? "font-medium" : "foot-underline-hover-effect-black"}`}>
                motions
              </h1>
            </div>
            <div className="h-full w-[1px] bg-black"></div>
            <div
              className={`w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5 ${activeTab === "posters" ? "-translate-y-1 md:-translate-y-2  scale-110 text-black" : ""
                }`}
              onClick={() => handleTabChange("posters")}
            >
              <h1 className={`pb-1 ${activeTab === "posters" ? "font-medium" : "foot-underline-hover-effect-black"}`}>
                posters
              </h1>
            </div>
            {/* <div className="h-full w-[1px] bg-black"></div>
            <div
              className={`w-full flex justify-center items-center duration-300 uppercase hover:cursor-pointer p-5 ${activeTab === "videos" ? "-translate-y-1 md:-translate-y-2 scale-110 text-black" : ""
                }`}
              onClick={() => handleTabChange("videos")}
            >
              <h1 className={`pb-1 ${activeTab === "videos" ? "font-medium" : "foot-underline-hover-effect-black"}`}>
                videos
              </h1>
            </div> */}
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "posters" && (
              <motion.div
                key="posters"
                variants={getVariants(activeTab, prevTab)}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Posters />
              </motion.div>
            )}
            {activeTab === "motions" && (
              <motion.div
                key="motions"
                variants={getVariants(activeTab, prevTab)}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Motions />
              </motion.div>
            )}
            {activeTab === "videos" && (
              <motion.div
                key="videos"
                variants={getVariants(activeTab, prevTab)}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
              >
                <Motions />
              </motion.div>
            )}
          </AnimatePresence>
        </main >
      </>
    );
  };

  export default DigitalMarketing;