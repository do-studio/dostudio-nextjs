import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RootClient from "./RootClient";
import { CanonicalTag } from "./CanonicalTag";
import Script from "next/script";
import ContactButton from "../components/home/designs/ContactButton";
import React from "react";
import FooterWrapper from "../components/FooterWrapper";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  robots: "index, follow",
  openGraph: {
    title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
    description:
      "Digital Marketing and Branding agency in Calicut, Kerala...",
    url: "https://dostudio.co.in",
    images: [
      {
        url: "https://cdn.sanity.io/images/0hjyj1bs/production/fd0e406fac5be662e3a12297817597b3b9c25080-8161x2283.png",
        width: 1200,
        height: 630,
        alt: "Do Studio - Digital Marketing and Branding Agency",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
    description:
      "Digital Marketing and Branding agency in Calicut, Kerala...",
    images: [
      "https://cdn.sanity.io/images/0hjyj1bs/production/fd0e406fac5be662e3a12297817597b3b9c25080-8161x2283.png",
    ],
  },
  other: {
    "google-site-verification": "K-0KPQ78AmDrdt3Dtqtln-KygEAHUAR0c5Qo_m4cZkU",
    "pixel:payload": "TEST88229",
    "facebook-domain-verification": "8obnherhfzfpv5unpmsdv4k4bdqsm0",
    "msvalidate.01": "1DE072A42AC32FB2D1849B5B3285ED22", 
  },
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      {/* Google Tag Manager - Script */}
      <Script id="gtm-script" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){
            w[l]=w[l]||[];
            w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
            var f=d.getElementsByTagName(s)[0],
                j=d.createElement(s),
                dl=l!='dataLayer'?'&l='+l:'';
            j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-5QJX6KRG');
        `}
      </Script>

      {/* Microsoft Clarity – lazy load after user interaction */}
      <Script id="defer-analytics" strategy="afterInteractive">
        {`
          setTimeout(() => {
            // Microsoft Clarity
            const clarityScript = document.createElement("script");
            clarityScript.innerHTML = \`
              (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/pxs9rkmsym";
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
              })(window, document, "clarity", "script", "pxs9rkmsym");
            \`;
            document.body.appendChild(clarityScript);
          }, 3000); // Load after 3 seconds
        `}
      </Script>

      <body className={poppins.className}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QJX6KRG"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <div className="2xl:max-w-[3500px] mx-auto">
          {/* <CanonicalTag /> */}

          <RootClient>
            <Navbar />
            {children}

            {/* Defer non-critical components */}
            <React.Suspense fallback={null}>
              <ContactButton />
              <FooterWrapper />
              <ToastContainer position="bottom-right" />
            </React.Suspense>
          </RootClient>
        </div>
      </body>
    </html>
  );
}
