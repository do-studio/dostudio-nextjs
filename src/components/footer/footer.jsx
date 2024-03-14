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
    <footer className="border-t-2">
      <div className="w-11/12 xl:w-10/12 mx-auto flex flex-col-reverse md:flex-row gap-y-2 justify-center md:justify-between items-center h-24 md:h-14">
        <div>
          <p className="text-sm font-medium">Powered By DO Studio.</p>
        </div>
        <div className="flex  gap-5">
          {socialMedia?.map((data, i) => (
           <a href={data.href} key={i} target="_blank">
             <Image
              className="h-10 w-10 object-cover hover:-translate-y-1 duration-150"
              src={data.logo}
              alt="do studio"
            />
           </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
