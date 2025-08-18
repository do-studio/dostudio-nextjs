"use client";

import { usePathname } from "next/navigation";

const whatsappLink = "https://api.whatsapp.com/send?phone=919746155541";

const ContactButton = () => {
    const pathname = usePathname();

    if (pathname === "/home2" || pathname === "/contact" || pathname === "/seo-company-in-calicut") return null;

    const handleWhatsApp = () => {
        window.open(whatsappLink, '_blank');
    };

    return (
        <div className="fixed bottom-0 md:bottom-3 z-30 left-0 w-full p-4 flex justify-center">
            <button
                onClick={handleWhatsApp}
                className="bg-primarygreen shadow-lg hover:shadow-xl text-black font-medium py-3 px-6 rounded-[3rem] w-full md:hidden max-w-xs capitalize"
            >
                enquire now
            </button>
            <button
                onClick={handleWhatsApp}
                className="bg-primarygreen shadow-lg hover:shadow-xl text-black font-medium py-3 px-6 rounded-[3rem] w-full hidden md:block hover:scale-110 duration-150  max-w-52 capitalize"
            >
                enquire now
            </button>
        </div>
    );
};

export default ContactButton;
