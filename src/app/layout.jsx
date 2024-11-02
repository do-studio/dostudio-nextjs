import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "../components/navbar/navbar";
import Footer from "../components/footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import RootClient from "./RootClient";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata = {
  title: "Best Digital Marketing Agency In Calicut, Branding Agency In Calicut",
  description: `Do Studio is a leading Digital Marketing and Branding agency in Calicut, Kerala, offers a wide range of digital marketing services, including SEO, SMM, and SEM.`,
  metadataBase: new URL('https://dostudio.co.in'), // Set the base domain
  alternates: {
    canonical: '/', // Relative URL to the canonical page
  },
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

      <body className={poppins.className}>
        <ToastContainer position="bottom-right" />
        <div className="2xl:max-w-[3500px] mx-auto">
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
