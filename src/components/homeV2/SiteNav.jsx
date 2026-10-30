"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Works", href: "/our-works" },
  { label: "Contact", href: "/contact" },
];

// The home page's header (white logo on the left, links on the right, yellow underline on hover) for pages that
// sit on a dark background, like the poster gallery. It has the same sizing as the nav inside Hero.jsx.
export default function SiteNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Same dark fade the home hero has behind its header, so the white links stay readable over bright images. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-[clamp(5rem,12vw,9rem)] bg-gradient-to-b from-black/[0.78] to-transparent" />
      <nav className="absolute inset-x-0 top-0 z-20 flex items-start justify-between px-[4.65%] pt-[clamp(0.75rem,3vw,3.625rem)] pr-[5.3%]">
        <Link href="/" aria-label="Do Studio home">
          <Image
            src="/images/home2/logo-white.svg"
            alt="Do Studio"
            width={103}
            height={61}
            className="h-auto w-[clamp(48px,5.36vw,103px)]"
          />
        </Link>

        <ul className="hidden items-center gap-[clamp(1.5rem,2.9vw,3.5rem)] pt-[clamp(0.25rem,1.22vw,1.47rem)] md:flex">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="relative text-[clamp(1rem,1.446vw,1.736rem)] font-medium leading-[1.3] tracking-[-0.005em] text-white after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-[#f6f561] after:transition-transform after:duration-300 hover:after:scale-x-100"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="text-3xl text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <HiX /> : <HiMenuAlt3 />}
        </button>
      </nav>

      {open && (
        <ul className="absolute inset-x-4 top-16 z-20 flex flex-col rounded-2xl bg-black/85 p-4 md:hidden">
          {NAV.map((item) => (
            <li key={item.label}>
              <Link href={item.href} onClick={() => setOpen(false)} className="block py-3 text-lg font-medium text-white">
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
