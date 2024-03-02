"use client";
import Link from "next/link";
import React, { useState } from "react";
import { MdKeyboardArrowDown,MdKeyboardArrowUp  } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
import { HiHome } from "react-icons/hi";
const menuItems = [
    { label: "Home",url:"/dashboard",icon:<HiHome/> },
    { label: "About",url:"/dashboard",icon:<HiHome/> },
    {
      label: "Services",
      url:"",
      icon:<HiHome/>,
      subMenu: [
        { label: "service 1",url:"/dashboard",icon:<HiHome/> },
        { label: "service 2",url:"/dashboard",icon:<HiHome/> },
        { label: "service 3",url:"/dashboard",icon:<HiHome/> },
      ],
    },
    { label: "Contact",url:"/dashboard",icon:<HiHome/> },
  ];

const Sidebar = () => {
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState(null);

  const transitionConfig = { duration: 0.3, ease: 'easeIn'  };
  const toggleSubMenu = (index) => {
    setOpenSubMenuIndex(openSubMenuIndex === index ? null : index);
  };

  return (
    <>
    <div className="bg-dashclr text-white min-h-screen p-4 xl:p-5 overflow-hidden sticky top-0">
        {menuItems?.map((menuItem, index) => (
          <div key={index} className="mb-4">
            <button onClick={() => toggleSubMenu(index)} className="text-white bg-[#1d232a] relative w-full px-2 py-1 rounded-sm">
              <Link href={`${menuItem.url}`}  className="flex items-center gap-2">
                <span>{menuItem.icon}</span>
                <span className="hidden md:flex items-center ">{menuItem.label}{menuItem.subMenu ? 
                  <MdKeyboardArrowDown className={`absolute text-xl top-[20%] right-3 transition-transform duration-300 ease-in-out ${openSubMenuIndex ? 'rotate-180' : 'rotate-0'}`}/>
                : null}</span>
              </Link>
            </button>
            <AnimatePresence>
              {openSubMenuIndex === index && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={transitionConfig}
                  className="md:pl-2 lg:pl-5"
                >
                  <ul className="">
                    {menuItem?.subMenu?.map((subMenuItem, subIndex) => (
                      <li key={subIndex} className="mb-5 mt-5  grid place-items-center md:place-items-start">
                        <Link href={`${subMenuItem.url}`}  className="flex items-center gap-1">
                            <span>{subMenuItem.icon}</span>
                            <span className="hidden md:block">{subMenuItem.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>      
    </>
  );
};

export default Sidebar;
