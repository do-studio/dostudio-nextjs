import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RootClient from "./RootClient";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { CanonicalTag } from "./CanonicalTag";
import Script from "next/script";
import ContactButton from "../components/home/designs/ContactButton";
import Head from "next/head";
import React from 'react'

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
    description: "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.",
    url: "https://dostudio.co.in",
    images: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png",
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
    description: "Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.",
    images: ["https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        {/* Add the Pixel Meta Payload Test Code */}
        <meta name="pixel:payload" content="TEST88229" />
        <meta name="google-site-verification" content="K-0KPQ78AmDrdt3Dtqtln-KygEAHUAR0c5Qo_m4cZkU" />
        {/* Preload Fonts */}
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
          as="font"
          type="font/woff2"
          crossorigin="anonymous"
        />
      </Head>

      <Script id="clarity-script" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "pxs9rkmsym");
        `}
      </Script>
      <body className={poppins.className}>
        <GoogleAnalytics gaId="G-XR89GB34HC" />
        <GoogleTagManager gtmId="AW-11563204186" />
        {/* <ToastContainer position="bottom-right" /> */}
        <React.Suspense fallback={<div>Loading...</div>}>
          <ToastContainer position="bottom-right" />
        </React.Suspense>

        <div className="2xl:max-w-[3500px] mx-auto">
          <CanonicalTag /> {/* Include the CanonicalTag */}
          <RootClient>
            <Navbar />
            {children}
            <ContactButton />
            <Footer />
          </RootClient>
        </div>
      </body>

    </html>
  );
}
