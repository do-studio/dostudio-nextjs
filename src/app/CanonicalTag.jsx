"use client";

import { usePathname } from "next/navigation";

export function CanonicalTag() {
  const pathname = usePathname(); // Get current path
  const canonicalUrl = `https://dostudio.co.in${pathname}`; // Construct canonical URL

  return (
    <>
      <link rel="canonical" href={canonicalUrl} />
    </>
  );
}
