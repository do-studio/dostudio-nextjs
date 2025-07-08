"use client"
import React, { useEffect, useState } from "react";
import {
  whatsapplogo,
  facebooklogo,
  linkedinlogo,
  googlemaplogo,
  gmaillogo,
  insatgramlogo,
  dologo,
  Logoblack,
} from "../../../public/images";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import { FaMapMarkerAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";

const socialMedia = [
  {
    logo: <FaFacebookF />,
    href: `https://www.facebook.com/profile.php?id=100063901933314`,
  },
  {
    logo: <FaInstagram />,
    href: `https://www.instagram.com/dostudio.agency/`,
  },
  {
    logo: <FaLinkedin />,
    href: `https://www.linkedin.com/company/do-studi0`,
  },
  {
    logo: <BiLogoGmail />,
    href: `mailto:info@dostudio.co.in`,
  },
  {
    logo: <FaMapMarkerAlt />,
    href: `https://goo.gl/maps/ku2aYUFJ78hSuSnb8?coh=178571&entry=tt`,
  },
  {
    logo: <IoLogoWhatsapp />,
    href: `https://api.whatsapp.com/send?phone=919746155541`,
  },
];

const Footer = () => {
  const [animationTrue, setAnimationTrue] = useState(false)

  useEffect(() => {

    if (typeof window !== "undefined" && window.location.pathname === "/") {
      setAnimationTrue(true)
    }

  }, [])


  return (
    <footer className="bg-gradient-to-b z-40 from-gray-100 to-white  border-[1px] border-gray-100 pt-10 text-black relative">
      {
        animationTrue &&
        <div className='absolute right-0 -top-28 xl:-top-[100%]'>
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
      }
      <div className="w-11/12 xl:w-10/12 mx-auto ">
        <div className="py-5 grid grid-cols-1 gap-y-5 md:grid-cols-2 xl:grid-cols-4">
          <div className=" flex flex-col">
            <Link href={"/"}>
              <Image
                className="object-cover w-40 -mt-10 h-40 "
                src={dologo}
                alt="dostudio"
              />
            </Link>
            {/* <p className="text-sm font-medium xl:w-[60%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam molestias voluptates quos laborum magnam blanditiis earum fuga dolor consectetur totam vero vitae quasi.</p> */}
            <ul className="flex justify-start py-5 gap-3 capitalize mt-2">
              {socialMedia.map((soc, i) => (
                <li key={i}>
                  <a
                    className=""
                    target="_blank"
                    href={soc.href}
                    aria-label={`Visit our ${soc.logo} profile`}
                  >
                    {soc.logo}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-base font-bold uppercase">pages</p>
            <ul className="text-sm flex flex-col gap-1 capitalize mt-2">
              <Link
                className="text-black foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/"}
              >
                home
              </Link>
              <Link
                className="text-black foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/services"}
              >
                services
              </Link>
              <Link
                className="text-black foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/contact"}
              >
                contact
              </Link>
              <Link
                className="text-black foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/blogs"}
              >
                blogs
              </Link>
            </ul>
          </div>
          <div>
            <p className="text-base font-bold uppercase">our works</p>
            <ul className="text-sm flex flex-col gap-1 capitalize mt-2">
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/branding"}
              >
                Branding
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/creatives"}
              >
                Creatives
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/web-design"}
              >
                Web Design
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/package-design"}
              >
                Package Design
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/print-design"}
              >
                Print Design
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/production"}
              >
                Production
              </Link>
              {/* <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/production"}
              >
                Production
              </Link> */}
            </ul>
          </div>
          <div>
            <p className="text-base font-bold uppercase">office address</p>
            <p className="text-sm mt-2 ">
              1st Floor, Ramaswami Complex
              <br />
              Cherooty Rd, Behind Basics,
              <br />
              Kozhikode, Kerala,
              <br />
              India - 673001
            </p>
            <a target="_blank" className="cursor-pointer text-sm mt-2 font-bold foot-underline-hover-effect" href="http://wa.me/+919746155541">
             DO Support <span className="font-normal" >+91 97461 55541</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
{
  /* <ul className="flex gap-1 capitalize mt-2">
{socialMedia.map((soc,i)=>(
  <a href={soc.href} key={i}>
    <Image className="h-10 w-10 object-cover hover:-translate-y-1 grayscale hover:grayscale-0 duration-200" placeholder="empty" src={soc.logo}/>
  </a>
))}
</ul> */
}

// BRANDING
// DIGITAL MARKETING
// WEB DESIGN
// PACKAGE DESIGN
// PRINT DESIGN
// PRODUCTION
