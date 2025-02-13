"use client";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logoblack, Logowhite } from "../../../public/images";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { banners } from '../../components/constant/data'
import { CgArrowLongLeft } from "react-icons/cg";
import { BiChevronDown } from "react-icons/bi";


const Navbar = () => {

  const pathname = usePathname();
  const [isHome, setIsHome] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [issubMenuOpen, setSubMenuOpen] = useState(false);
  const [index, setIndex] = useState(0);

  if (typeof window !== "undefined" && typeof document !== "undefined") {
    isMenuOpen
      ? (document.body.style.overflow = "hidden")
      : (document.body.style.overflow = "visible");
  }

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };
  const handlesubMenuToggle = () => {
    setSubMenuOpen(!issubMenuOpen);
  };

  const handleScroll = () => {
    const scrollThreshold = window.innerHeight;
    if (window.scrollY >= scrollThreshold) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, banners[index].duration);
    return () => clearInterval(intervalId);
  }, [index]);


  // change logo in home
  useEffect(() => {
    setIsHome(pathname === '/');
  }, [pathname]);


  // const handleMenuItemClick = (event, items) => {
  //   event.preventDefault();
  // };
  // onClick={(e)=> handleMenuItemClick(e, items) }

  const items = [
    {
      title: `home`,
      url: `/`,
      delay: 0.1,
    },
    {
      title: `services`,
      url: `/services`,
      delay: 0.2,
    },
    {
      title: `works`,
      url: 'javascript:void(0)',
      delay: 0.3,
      ismenu: true,
    },
    {
      title: `blogs`,
      url: `/blogs`,
      delay: 0.4,
    },
    {
      title: `contact`,
      url: `/contact`,
      delay: 0.5,
    },
  ];

  const submenu = [
    {
      title: `BRANDING`,
      url: `/our-works/branding`,
      delay: 0.2,
    },
    {
      title: `CREATIVES`,
      url: `/our-works/creatives`,
      delay: 0.2,
    },
    {
      title: `WEB DESIGN`,
      url: `/our-works/web-design`,
      delay: 0.2,
    },
    {
      title: `PACKAGE DESIGN`,
      url: `/our-works/package-design`,
      delay: 0.2,
    },
    {
      title: `PRINT DESIGN`,
      url: `/our-works/print-design`,
      delay: 0.2,
    },
    {
      title: `PRODUCTION`,
      url: `/our-works/production`,
      delay: 0.2,
    },
    // {
    //   title: `DIGITAL MARKETING`,
    //   url: `/our-works/digital-marketing`,
    //   delay: 0.2,
    // },

    // {
    //   title: `PRINT DESIGN`,
    //   url: `/our-works/print-design`,
    //   delay: 0.2,
    // },
  ];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isCurrentPath = (path) => {

    if (typeof window !== "undefined") {
      return window.location.pathname == path;
    }
    return false; // Avoid errors during SSR
  };

  return (
    <>
      {/* ===========================================NAVBAR START=========================================== */}




      <nav
        className={`px-5 fixed top-0 left-0 right-0 flex justify-between md:justify-center  items-center z-40 w-full 2xl:max-w-[3500px] mx-auto h-[4.5rem] transition duration-300 ease-in-out ${isScrolled ? " " : `bg-transparent " }`}`}
      >
        {/* scroll active header */}
        <nav className={` text-black hidden md:block  `}>
          <div className="container mx-auto flex justify-center py-2">
            <ul className={`flex h-full  items-center space-x-6 bg-transparent  ${isScrolled ? "navbar " : "bg-white invert md:invert-0"
              } backdrop-blur-md px-6 py-1 rounded-full     shadow-2xl `} >
              <li>
                <Link href="/" className={`px-4 py-2 rounded-full foot-underline-hover-effect  transition duration-200 uppercase font-light  ${isCurrentPath("/") && ' !bg-gray-200 !text-black'}`}>Home</Link>
              </li>
              <li>
                <Link href="/services" className={`px-4 py-2 rounded-full foot-underline-hover-effect  transition duration-200  uppercase font-light  ${isCurrentPath("/services") && ' !bg-gray-200 !text-black'}`}>Services</Link>
              </li>
              <li className="hover:cursor-pointer rounded-full ">
                <Link href="/">
                  <Image priority className="h-10 w-28 md:h-14 md:w-32 xl:h-12 xl:w-44 " src={Logoblack} alt="Do studio" />
                </Link>

              </li>
              {/* Works Dropdown */}
              <li
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="px-4 py-2 rounded-full foot-underline-hover-effect transition duration-200 uppercase font-light">
                  Works
                </button>
                {/* Dropdown Menu */}
                {isDropdownOpen && (
                  <ul className="absolute left-0 top-full mt-0 w-48 bg-white shadow-xl rounded-lg overflow-hidden" onClick={() => setIsDropdownOpen(false)} >
                    <li>
                      <Link href="/our-works/branding" className={`block px-4 py-2 foot-underline-hover-effect transition uppercase  `}>Branding</Link>
                    </li>
                    <li>
                      <Link href="/our-works/creatives" className="block px-4 py-2 foot-underline-hover-effect transition uppercase">Creatives</Link>
                    </li>
                    <li>
                      <Link href="/our-works/web-design" className="block px-4 py-2 foot-underline-hover-effect transition uppercase">Web Design</Link>
                    </li>
                    <li>
                      <Link href="/our-works/package-design" className="block px-4 py-2 foot-underline-hover-effect transition uppercase">Package Design</Link>
                    </li>
                    <li>
                      <Link href="/our-works/print-design" className="block px-4 py-2 foot-underline-hover-effect transition uppercase">Print Design</Link>
                    </li>
                    <li>
                      <Link href="/our-works/production" className="block px-4 py-2 foot-underline-hover-effect transition uppercase">production</Link>
                    </li>
                  </ul>
                )}
              </li>
              <li>
                <Link href="/contact" className={`px-4 py-2 rounded-full foot-underline-hover-effect  transition duration-200 uppercase font-light  ${isCurrentPath("/contact") && ' !bg-gray-200 !text-black'}`}>Contact</Link>
              </li>
            </ul>
          </div>
        </nav>


        {/* scroll active header */}

        <div className={` md:hidden `}>
          <Link href={'/'}>
            <Image priority className="h-10 w-28 md:h-14 md:w-32 xl:h-20 xl:w-44" src={Logoblack} alt="Do studio" />
          </Link>
        </div>

        {/* changing logo header */}


        {/* Right */}
        <div className="flex gap-3 items-center md:hidden">


          {/* scroll active humberger */}
          <div
            onClick={handleMenuToggle}
            className={` flex flex-col h-8 p-1 justify-center  items-end space-y-1.5 cursor-pointer w-fit`}
          >
            <div className={"h-[2.5px] w-8  bg-black"}></div>
            <div className={"h-[2.5px] w-5  bg-black"}></div>
          </div>
          {/* change color humberger */}

        </div>
      </nav>






      {/* ===========================================NAVBAR START=========================================== */}

      {/* ==============================================MAIN MENU============================================== */}
      <div>
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, damping: 7, stiffness: 100 }}
              className="fixed top-0 left-0 w-full h-full flex  flex-col-reverse xl:flex-row items-center justify-between p-5 lg:p-20 bg-white overflow-hidden text-black z-[99]"
            >
              <motion.div
                initial={{ opacity: 0, translateY: -40 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 40 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 justify-end h-full w-full"
              >
                <div className="text-xl md:text-2xl font-light">
                  <p className="text-base text-gray-500">GET IN TOUCH</p>
                  <p>info@dostudio.co.in</p>
                  <p>+91 9995055541</p>
                  <p>+91 9746155541</p>
                </div>
                <div className="text-xl md:text-2xl font-light">
                  <p>1st Floor, Ramaswami Complex</p>
                  <p>Cherooty Rd, Behind Basics,</p>
                  <p>Kozhikode, Kerala,</p>
                  <p>India - 673001</p>
                </div>
              </motion.div>
              <motion.ul className="text-2xl space-y-3 lg:space-y-2 h-full flex flex-col w-full  justify-end">
                {items.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0, translateX: "100%", scale: 0.8 }}
                    animate={{ opacity: 1, translateX: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      damping: 8,
                      stiffness: 80,
                      delay: item.delay || 0,
                    }}
                    key={index}
                    className="capitalize foot-underline-hover-effect text-3xl xs:text-4xl sm:text-5xl lg:text-7xl xl:text-7xl 2xl:text-8xl h-fit w-fit font-bold"
                  >
                    <Link href={item.url} onClick={() => item.ismenu ? setMenuOpen(true) : setMenuOpen(false)}>
                      {item?.ismenu ? (
                        <div onClick={handlesubMenuToggle}>works</div>
                      ) : (
                        <div>{item.title}</div>
                      )}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
              <motion.div
                initial={{ opacity: 1, rotate: 45 }}
                animate={{ opacity: 1, rotate: 0 }}
                onClick={handleMenuToggle}
                className=" absolute  top-9 right-5 xl:right-8 flex flex-col space-y-1 cursor-pointer"
              >
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: 45 }}
                  exit={{ opacity: 0, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-[2.5px]  w-6 bg-black"
                ></motion.div>
                <motion.div
                  initial={{ opacity: 0, rotate: 0 }}
                  animate={{ opacity: 1, rotate: -45, translateY: -6 }}
                  exit={{ opacity: 0, rotate: 0 }}
                  transition={{ duration: 0.3 }}
                  className="h-[2.5px]  w-6 bg-black"
                ></motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* =======================================MAIN MENU======================================= */}

      {/* =======================================SUB MENU======================================= */}
      <div>
        <AnimatePresence>
          {issubMenuOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, damping: 7, stiffness: 100 }}
              className="fixed top-0 left-0 w-full h-full flex flex-col-reverse xl:flex-row items-center justify-between p-5 lg:p-20 bg-white overflow-hidden text-black z-[999]"
            >
              <motion.div
                initial={{ opacity: 0, translateY: -40 }}
                animate={{ opacity: 1, translateY: 0 }}
                exit={{ opacity: 0, translateY: 40 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-5 justify-end h-full w-full"
              >
                <div className="text-xl md:text-2xl font-light">
                  <p className="text-base text-gray-500">GET IN TOUCH</p>
                  <p>info@dostudio.co.in</p>
                  <p>+91 9995055541</p>
                  <p>+91 9746155541</p>
                </div>
                <div className="text-xl md:text-2xl font-light">
                  <p>1st Floor, Ramaswami Complex</p>
                  <p>Cherooty Rd, Behind Basics,</p>
                  <p>Kozhikode, Kerala,</p>
                  <p>India - 673001</p>
                </div>
              </motion.div>
              <motion.ul className="text-2xl space-y-3 h-full w-full flex flex-col justify-end">
                <button
                  onClick={handlesubMenuToggle}
                  className="flex text-lg font-bold justify-start items-center gap-x-2 mb-5"
                >
                  <CgArrowLongLeft />
                  BACK
                </button>
                {/* <CgArrowLongLeft onClick={handlesubMenuToggle} className="flex justify-start text-5xl items-start mb-5 cursor-pointer bg-black p-0"/> */}
                {submenu.map((item, index) => (
                  <motion.li
                    initial={{ opacity: 0, translateX: "100%", scale: 0.8 }}
                    animate={{ opacity: 1, translateX: 0, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      type: "spring",
                      damping: 8,
                      stiffness: 80,
                      delay: item.delay || 0,
                    }}
                    key={index}
                    className="capitalize foot-underline-hover-effect text-2xl sm:text-3xl md:text-5xl xl:text-6xl font-semibold h-fit w-fit"
                  >
                    <Link href={item.url} onClick={() => setSubMenuOpen(false) || setMenuOpen(false)}>{item.title}</Link>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      {/* =======================================SUB MENU======================================= */}
    </>
  );
};

export default Navbar;
