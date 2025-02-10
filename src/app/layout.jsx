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
  robots: "index, follow",
  
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
