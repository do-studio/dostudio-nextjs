import React from "react";
import {
  whatsapplogo,
  facebooklogo,
  linkedinlogo,
  googlemaplogo,
  gmaillogo,
  insatgramlogo,
} from "../../../public/images";
import Image from "next/image";

const socialMedia = [
  {
    logo: facebooklogo,
    href:`https://www.facebook.com/profile.php?id=100063901933314`
  },
  {
    logo: insatgramlogo,
    href:`https://instagram.com/do_studi0?igshid=YmMyMTA2M2Y=`
  },
  {
    logo: linkedinlogo,
    href:`https://www.linkedin.com/company/do-studi0`
  },
  {
    logo: gmaillogo,
    href:`mailto:info@dostudio.co.in`
  },
  {
    logo: googlemaplogo,
    href:`https://goo.gl/maps/ku2aYUFJ78hSuSnb8?coh=178571&entry=tt`
  },
  {
    logo: whatsapplogo,
    href:`https://api.whatsapp.com/send?phone=919746155541`
  },
];

const Footer = () => {
  return (
    <footer className="bg-white text-black">
      <div className="py-5 border-t-2 w-11/12 xl:w-10/12 mx-auto  grid grid-cols-1 md:grid-cols-2 gap-y-10">
        <div className="">
            <h4 className="text-2xl xl:text-3xl uppercase">Want to work with us?</h4>
            <p className="text-lg pt-5 xl:pt-5 pb-1">Contact us at</p>
            <a className="underline text-xl" href="mailto:info@dostudio.co.in" target="_blank">info@dostudio.co.in</a>
          </div>
          <div className="flex gap-3 md:justify-end items-end">
              {socialMedia?.map((social,i)=>(
                <a key={i} href={social.href} target="_blank"><Image className="h-10 w-10 object-cover hover:-translate-y-1 opacity-80 hover:opacity-100 duration-200" placeholder="empty" src={social.logo}/></a>
              ))}
          </div>
      </div>
    </footer>
  );
};

export default Footer;
