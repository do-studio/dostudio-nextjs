import Link from "next/link";

// The work pages, listed under "Works" in the home header (dropdown on desktop, indented list in the phone menu).
export const WORK_PAGES = [
  { label: "Branding", href: "/our-works/branding" },
  { label: "Motion Creatives", href: "/our-works/motion-creatives" },
  { label: "Creative Posters", href: "/our-works/creative-posters" },
  { label: "Web Design", href: "/our-works/web-design" },
  { label: "Package Design", href: "/our-works/package-design" },
  { label: "Print Design", href: "/our-works/print-design" },
  { label: "Production", href: "/our-works/production" },
];

// Put it inside the "Works" <li>, which needs `group relative`. Opens on hover or keyboard focus, with no JavaScript.
// The panel's top padding bridges the gap to the link so the pointer can travel into it without it closing.
export function WorksDropdown() {
  return (
    <div className="invisible absolute left-1/2 top-full z-30 -translate-x-1/2 pt-3 opacity-0 transition-[opacity,visibility,transform] duration-200 group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 translate-y-1 group-focus-within:translate-y-0 group-hover:translate-y-0">
      <ul className="w-[clamp(11rem,13vw,15rem)] overflow-hidden rounded-2xl bg-[#1c1c1e] p-2 shadow-[6px_6px_0_0_#f6f561]">
        {WORK_PAGES.map((page) => (
          <li key={page.href}>
            <Link
              href={page.href}
              className="block rounded-xl px-3 py-2 text-[clamp(0.9rem,1.1vw,1.3rem)] font-medium leading-tight text-white transition-colors hover:bg-[#f6f561] hover:text-[#1c1c1e] focus-visible:bg-[#f6f561] focus-visible:text-[#1c1c1e]"
            >
              {page.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

// The same pages as an indented list for the phone menu; `onNavigate` closes the menu.
export function WorksMobileList({ onNavigate, linkClass }) {
  return (
    <ul className="mb-1 ml-3 border-l border-white/20 pl-3">
      {WORK_PAGES.map((page) => (
        <li key={page.href}>
          <Link href={page.href} onClick={onNavigate} className={linkClass}>
            {page.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
