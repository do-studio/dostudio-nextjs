import localFont from "next/font/local";
import Hero from "../components/homeV2/Hero";
import Intro from "../components/homeV2/Intro";
import Works from "../components/homeV2/Works";
import Services from "../components/homeV2/Services";
import Process from "../components/homeV2/Process";
import Clients from "../components/homeV2/Clients";
import Testimonial from "../components/homeV2/Testimonial";
import Faq from "../components/homeV2/Faq";
import Cta from "../components/homeV2/Cta";
import Footer from "../components/homeV2/Footer";
import { MotionProvider } from "../components/homeV2/motion";
import IntroLoader, { IntroProvider } from "../components/homeV2/IntroLoader";

const grotesk = localFont({
  src: [
    { path: "../fonts/random-grotesque/RG-StandardBook.ttf", weight: "400", style: "normal" },
    { path: "../fonts/random-grotesque/RG-StandardMedium.ttf", weight: "500", style: "normal" },
    { path: "../fonts/random-grotesque/RG-StandardSemibold.ttf", weight: "600", style: "normal" },
    { path: "../fonts/random-grotesque/RG-StandardBold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Logo "bouncing ball" intro. Set to true to turn it back on.
const SHOW_INTRO = false;

// Client logos are fetched from Sanity on the server; re-check hourly so new clients appear without a redeploy.
export const revalidate = 3600;

export const metadata = {
  title: "Best Digital Marketing Agency in Calicut, Kerala | Do Studio",
  description:
    "Do Studio is the best digital marketing agency in Calicut, offering Web Development, SEO, SMM, PPC & branding services. Get a free strategy call today!",
  openGraph: {
    title: "Best Digital Marketing Agency in Calicut, Kerala | Do Studio",
    description:
      "Do Studio is the best digital marketing agency in Calicut, offering Web Development, SEO, SMM, PPC & branding services. Get a free strategy call today!",
    url: "https://dostudio.co.in",
    type: "website",
    images: [
      {
        url: "https://cdn.sanity.io/images/0hjyj1bs/production/fd0e406fac5be662e3a12297817597b3b9c25080-8161x2283.png",
        width: 1200,
        height: 630,
        alt: "Do Studio - Digital Marketing and Branding Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Best Digital Marketing Agency in Calicut, Kerala | Do Studio",
    description:
      "Do Studio is the best digital marketing agency in Calicut, offering Web Development, SEO, SMM, PPC & branding services. Get a free strategy call today!",
    images: [
      "https://cdn.sanity.io/images/0hjyj1bs/production/fd0e406fac5be662e3a12297817597b3b9c25080-8161x2283.png",
    ],
  },
  alternates: {
    canonical: "https://dostudio.co.in",
  },
};

export default function Page() {
  return (
    <main className={`${grotesk.className} overflow-x-hidden bg-white text-[#1c1c1e]`}>
      <MotionProvider>
        <IntroProvider enabled={SHOW_INTRO}>
          {SHOW_INTRO && <IntroLoader />}
          <Hero />
          <Intro />
          <Works />
          <Services />
          <Process />
          <Clients />
          <Testimonial />
          <Faq />
          <Cta />
          <Footer />
        </IntroProvider>
      </MotionProvider>
    </main>
  );
}
