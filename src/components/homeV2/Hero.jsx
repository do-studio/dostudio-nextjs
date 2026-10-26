"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import { EASE_OUT, SPRING } from "./motion";
import { useIntroReady } from "./IntroLoader";

function getPeriod(hour) {
  if (hour >= 5 && hour < 12) return "morning";
  if (hour >= 12 && hour < 16) return "afternoon";
  if (hour >= 16 && hour < 20) return "evening";
  return "night";
}

const videos = {
  desktop: {
    morning:
      "https://cdn.sanity.io/files/0hjyj1bs/production/dc1231794d63ee6e1b4726db3e4fffed5289073d.mp4",
    afternoon:
      "https://cdn.sanity.io/files/0hjyj1bs/production/da32ae8ab95dbb1386bec495a67dbfad3aa870ef.mp4",
    evening:
      "https://cdn.sanity.io/files/0hjyj1bs/production/e804ee795468b9968c281e2d8c74efed84d3d907.mp4",
    night:
      "https://cdn.sanity.io/files/0hjyj1bs/production/b91c2374f2a75daf8846dc686133157827465c95.mp4",
  },
  mobile: {
    morning:
      "https://cdn.sanity.io/files/0hjyj1bs/production/9f84a43ec5f8b176138ce5a103ffc556693987d1.mp4",
    afternoon:
      "https://cdn.sanity.io/files/0hjyj1bs/production/b944218c4430cae525e036475a7ac95cfd2e80d1.mp4",
    evening:
      "https://cdn.sanity.io/files/0hjyj1bs/production/453bd5b7a50e9ea7039a410a07b0a62af6c33d61.mp4",
    night:
      "https://cdn.sanity.io/files/0hjyj1bs/production/1527c3cbd4190d6dfe036738c88dc98e8c0a7193.mp4",
  },
};

const posters = {
  desktop:
    "https://cdn.sanity.io/images/0hjyj1bs/production/850db6d8114080e1ba31af3bde27865d5b64b17d-1920x1080.webp",
  mobile:
    "https://cdn.sanity.io/images/0hjyj1bs/production/514c02bf80817ecc72b756477618d10f11b04e3d-1080x1920.webp",
};

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Works", href: "/our-works" },
  { label: "Contact", href: "/contact" },
];

// Delay after the logo intro starts lifting away.
const START = 0.3;

export default function Hero() {
  const [open, setOpen] = useState(false);
  const [device, setDevice] = useState("desktop");
  const [period, setPeriod] = useState(null);
  const ready = useIntroReady();
  const state = ready ? "show" : "hidden";

  useEffect(() => {
    const updateDeviceAndPeriod = () => {
      setDevice(window.innerWidth <= 768 ? "mobile" : "desktop");
      const hour = new Date().getHours();
      setPeriod(getPeriod(hour));
    };

    updateDeviceAndPeriod();
    window.addEventListener("resize", updateDeviceAndPeriod);
    return () => window.removeEventListener("resize", updateDeviceAndPeriod);
  }, []);

  const poster = posters[device] || posters.desktop;
  const video = period ? videos[device][period] : null;

  return (
    <section className="relative w-full h-[100svh] min-h-[540px] md:h-[100vh] md:aspect-[1920/1302] overflow-hidden bg-black">
      <motion.div
        className="absolute inset-0"
        initial="hidden"
        animate={state}
        variants={{ hidden: { scale: 1.14 }, show: { scale: 1 } }}
        transition={{ duration: 2.4, ease: EASE_OUT }}
      >
        <img
          src={poster}
          alt="Do Studio banner"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {video && (
          <video
            key={`${device}-${period}`}
            src={video}
            poster={poster}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            preload="auto"
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
      </motion.div>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[25.5%] bg-gradient-to-b from-black/[0.78] to-transparent" />

      <nav className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-[4.65%] pt-[clamp(0.75rem,3vw,3.625rem)] pr-[5.3%]">
        <motion.div
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, y: -24 }, show: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.7, ease: EASE_OUT, delay: START }}
        >
          <Link href="/" aria-label="Do Studio home">
            <Image
              src="/images/home2/logo-white.svg"
              alt="Do Studio"
              width={103}
              height={61}
              className="h-auto w-[clamp(48px,5.36vw,103px)]"
            />
          </Link>
        </motion.div>

        <motion.ul
          className="hidden md:flex items-center gap-[clamp(1.5rem,2.9vw,3.5rem)] pt-[clamp(0.25rem,1.22vw,1.47rem)]"
          initial="hidden"
          animate={state}
          transition={{ staggerChildren: 0.08, delayChildren: START + 0.15 }}
        >
          {NAV.map((item) => (
            <motion.li
              key={item.label}
              variants={{ hidden: { opacity: 0, y: -20 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
            >
              <Link
                href={item.href}
                className="relative text-[clamp(1rem,1.446vw,1.736rem)] font-medium leading-[1.3] tracking-[-0.005em] text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#f6f561] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            </motion.li>
          ))}
        </motion.ul>

        <motion.button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden text-white text-3xl"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
          transition={{ delay: START }}
          whileTap={{ scale: 0.85 }}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </motion.button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            key="mobile-menu"
            className="md:hidden absolute inset-x-4 top-16 z-20 flex origin-top flex-col rounded-2xl bg-black/85 p-4 backdrop-blur"
            initial={{ opacity: 0, y: -12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.96 }}
            transition={{ duration: 0.25, ease: EASE_OUT }}
          >
            {NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 text-lg font-medium text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {/* Outer div owns the centering transform; the inner link owns the animated one. */}
      <div className="absolute left-1/2 top-[69.1%] z-10 -translate-x-1/2">
        <motion.a
          href="https://api.whatsapp.com/send?phone=919746155541"
          target="_blank"
          rel="noopener noreferrer"
          initial="hidden"
          animate={state}
          variants={{ hidden: { opacity: 0, scale: 0.4, y: 20 }, show: { opacity: 1, scale: 1, y: 0 } }}
          transition={{ ...SPRING, delay: START + 0.6 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          className="flex h-[clamp(2.5rem,3.1vw,3.73rem)] items-center rounded-full bg-white px-[clamp(1rem,1.28vw,1.53rem)] text-[clamp(0.95rem,1.719vw,2.06rem)] font-bold text-black shadow-md transition-colors hover:bg-[#f6f561]"
        >
          Enquire Now
        </motion.a>
      </div>
    </section>
  );
}
