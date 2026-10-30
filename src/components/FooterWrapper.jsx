"use client";
import { usePathname } from "next/navigation";
import Footer from "./footer/footer";

export default function FooterWrapper() {
  const pathname = usePathname();
  const hiddenRoutes = ["/test", "/scene", "/preview", "/", "/our-works/creative-posters"];

  if (hiddenRoutes.includes(pathname)) return null;

  return <Footer />;
}