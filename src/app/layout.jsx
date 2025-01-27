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

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
  description: `Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.`,
  metadataBase: new URL("https://dostudio.co.in"), // Set the base domain
  keywords:
    "Branding agency in calicut, Advertising agency in Calicut, Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, performance marketing company in calicut",
  icons: {
    icon: ["/src/app/favicon.ico"],
    apple: ["/src/app/apple-touch-icon.png?v=4"],
    shortcut: ["/src/app/apple-touch-icon.png"],
  },
  robots: "index, follow",
  openGraph: {
    type: "website",
    url: "https://dostudio.co.in", // The URL of your website or specific page
    title: "Digital Marketing Agency in Calicut, Branding Agency Calicut",
    description: `Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.`,
    images: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png", // Replace with the URL of your OG image
        secureUrl:
          "https://res.cloudinary.com/djswkzoth/image/upload/v1737185612/metaicon_t4u5lc.png", // Secure URL (HTTPS)
        type: "image/jpeg",
        width: 1200, // Recommended image dimensions
        height: 630,
        alt: "Do Studio - Digital Marketing and Branding Agency", // Alternative text for the image
      },
    ],
  },
  // manifest: "/src/app/site.webmanifest",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="w7iJ2ozCamTV8_qsPHnhDTZOFBIAra5xJn5xheVeX2M"
      />
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
        <ToastContainer position="bottom-right" />

        <div className="2xl:max-w-[3500px] mx-auto">
          <CanonicalTag /> {/* Include the CanonicalTag */}
          <RootClient>
            <Navbar />
            {children}
            <Footer />
          </RootClient>
        </div>
      </body>
    </html>
  );
}
