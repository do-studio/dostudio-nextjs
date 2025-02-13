"use client";

import { usePathname, useRouter } from "next/navigation";

const ContactButton = () => {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/contact") return null; // Hide button on contact page

  return (
    <div className="fixed bottom-0 z-[999999] left-0 w-full bg-white p-4 flex justify-center md:hidden">
      <button 
        onClick={() => router.push("/contact")} 
        className="bg-primarygreen text-black font-medium py-3 px-6 rounded-full w-full max-w-xs capitalize"
      >
        enquire now
      </button>
    </div>
  );
};

export default ContactButton;
