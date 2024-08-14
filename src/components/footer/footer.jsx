import React from "react";
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
    logo: <FaFacebookF/>,
    href: `https://www.facebook.com/profile.php?id=100063901933314`,
  },
  {
    logo: <FaInstagram/>,
    href: `https://instagram.com/do_studi0?igshid=YmMyMTA2M2Y=`,
  },
  {
    logo: <FaLinkedin/>,
    href: `https://www.linkedin.com/company/do-studi0`,
  },
  {
    logo: <BiLogoGmail/>,
    href: `mailto:info@dostudio.co.in`,
  },
  {
    logo: <FaMapMarkerAlt/>,
    href: `https://goo.gl/maps/ku2aYUFJ78hSuSnb8?coh=178571&entry=tt`,
  },
  {
    logo: <IoLogoWhatsapp/>,
    href: `https://api.whatsapp.com/send?phone=919746155541`,
  },
];

const Footer = () => {
  return (
    <footer className=" bg-white text-black">
      <div className="px-3 md:px-7">
        <div className="py-5 grid grid-cols-1 gap-y-5 xl:grid-cols-4">
          <div className=" flex flex-col">
            <Image className="object-cover w-40 -mt-10 h-40 " src={dologo} />
            {/* <p className="text-sm font-medium xl:w-[60%]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam molestias voluptates quos laborum magnam blanditiis earum fuga dolor consectetur totam vero vitae quasi.</p> */}
            <ul className="flex justify-start py-5 gap-3 capitalize mt-2">
              {socialMedia.map((soc, i) => (
                <a href={soc.href} key={i}>
                 {soc.logo}
                </a>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold uppercase">pages</h4>
            <ul className="text-sm flex flex-col gap-1 capitalize mt-2">
              <Link
                className="text-black foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/"}
              >
                home
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit  hover:text-gray-700 duration-200"
                href={"/services"}
              >
                services
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit  hover:text-gray-700 duration-200"
                href={"/contact"}
              >
                contact
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit  hover:text-gray-700 duration-200"
                href={"/blogs"}
              >
                blogs
              </Link>
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold uppercase">services</h4>
            <ul className="text-sm flex flex-col gap-1 capitalize mt-2">
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/branding"}
              >
                Branding
              </Link>
              <Link
                className="text-black  foot-underline-hover-effect w-fit hover:text-gray-700 duration-200"
                href={"/our-works/digital-marketing"}
              >
                Digital Marketing
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
            </ul>
          </div>
          <div>
            <h4 className="text-base font-bold uppercase">office address</h4>
            <p className=" text-sm mt-2 ">
              1st Floor, Ramaswami Complex
              <br />
              Cherooty Rd, Behind Basics,
              <br />
              Kozhikode, Kerala,
              <br />
              India - 673001
            </p>
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
