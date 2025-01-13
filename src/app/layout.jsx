import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RootClient from "./RootClient";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import {CanonicalTag} from './CanonicalTag'

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Best Digital Marketing Agency In Calicut, Branding Agency In Calicut",
  description: `Do Studio is a leading Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.`,
  metadataBase: new URL("https://dostudio.co.in"), // Set the base domain
  
  icons: {
    icon: ["/src/app/favicon.ico"],
    apple: ["/src/app/apple-touch-icon.png?v=4"],
    shortcut: ["/src/app/apple-touch-icon.png"],
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
      <body className={poppins.className}>
        <GoogleAnalytics gaId="G-XR89GB34HC" />
        <GoogleTagManager gtmId="AW-11558854712" />
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
