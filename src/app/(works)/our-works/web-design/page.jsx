import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "../../../../components/motions/fadeUp";
import axios from "axios";
import Head from "next/head";


export const metadata = {
  title: 'Custom Web Design & Development services in Calicut',
  description: 'We are leading web design company in Calicut offering custom website design, development services. We create unique and engaging websites.',
  metadataBase: new URL('https://dostudio.co.in'), // Set the base domain

}

const webDesignsData = [
  {
    id: 1,
    websiteurl: "https://farookcollege.ac.in",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872860/Do%20Studio%20Website/webBanner/long/farookcollege-ac-in_gecais.webp"
  },
  {
    id: 2,
    websiteurl: "https://ztartvisa.com",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1742888081/ztartvisa_a08e5b0b34.webp"
  },

  {
    id: 3,
    websiteurl: "https://heeracorporate.com",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1742888145/heeracorporate_2025_03_25_13_01_24_a6b742df93.webp"
  },
  {
    id: 4,
    websiteurl: "https://pigmentslive.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1744190165/pigmentslive_2025_04_09_14_41_59_0353e8a23d.webp"
  },
  {
    id: 5,
    websiteurl: "https://tandthospitalityllp.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1742888108/tandthospitalityllp_2025_03_25_13_00_33_ed3880b44e.webp"
  },
  {
    id: 6,
    websiteurl: "https://smartkidsabacus.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1744190205/smartkidsabacus_2025_04_09_14_42_36_4f241c9e8b.webp"
  },
  {
    id: 7,
    websiteurl: "https://kadalundibank.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745928699/kadalundibank_2025_04_29_17_35_47_2919072f38.webp"
  },
  {
    id: 8,
    websiteurl: "https://stackr.ae/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872858/Do%20Studio%20Website/webBanner/long/stackr-ae_ccu2k9.webp"
  },
  {
    id: 9,
    websiteurl: "https://mckkutty.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872858/Do%20Studio%20Website/webBanner/long/mckkutty_m787i0.webp"
  },
  {
    id: 10,
    websiteurl: "https://esordio.in/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872859/Do%20Studio%20Website/webBanner/long/esordio-in_ogsoxs.webp"
  },
  {
    id: 11,
    websiteurl: "https://zainbuilders.co/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872859/Do%20Studio%20Website/webBanner/long/zainbuilders-co_lueerg.webp"
  },
  {
    id: 12,
    websiteurl: "https://kccpl.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872860/Do%20Studio%20Website/webBanner/long/kccpl_a0fi3s.webp"
  },
  {
    id: 13,
    websiteurl: "https://pythonbull.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872860/Do%20Studio%20Website/webBanner/long/pythonbull_imr96b.webp"
  },
  {
    id: 14,
    websiteurl: "https://www.hearvox.in/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872858/Do%20Studio%20Website/webBanner/long/hearvox-in_mhciel.webp"
  },
  {
    id: 15,
    websiteurl: "https://annamonicabeautyshack.com/",
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1706872859/Do%20Studio%20Website/webBanner/long/annamonicabeautyshack_t0hrjt.webp"
  },

];



const WebDesign = async () => {
  

  return (
    <>

      <main className="min-h-screen w-full bg-whit">
        <div className="w-11/12 xl:w-9/12 mx-auto pt-20 xl:pt-24 py-20 ">
          {/* <div className="text-center space-y-2">
        <FadeUp duration={0.3} delay={0.1}>
        <h1 className="text-2xl md:text-4xl font-medium">Strategic Web Design Solutions for Your Brand</h1>
        </FadeUp>
        <FadeUp duration={0.3} delay={0.2}>
        <h2 className="text-base md:text-2xl font-light">Responsive and Mobile-Optimized Design</h2>
        </FadeUp>
        </div> */}


        <div div className="flex flex-col md:flex-row gap-5 gap-y-3 pt-10">
          <h1 className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black uppercase">
            Web Development Company In Calicut
          </h1>
          <div className="md:basis-1/2 xl:basis-2/5 flex flex-col gap-3">
            <p className=" text-justify tracking-tighter">
              We are a web development business based in Calicut. As a web
              development company in Calicut, we are good at the job and we are
              involved in developing and designing powerful, customized
              websites. We are this type of company that will visualize all your
              ideas.
            </p>
          </div>
        </div>
        <Link
           href="/contact"
           scroll={true}
          className="bg-primarygreen text-black w-fit mx-auto px-10 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center mb-10 mt-5"
        >
          Contact now
        </Link>

        <div className="grid grid-cols-1 gap-y-14 ">
        {webDesignsData.length > 0 ? (
              webDesignsData.map((data, i) => (
                <FadeUp duration={0.5} delay={0.1 * i} key={data.id}>
                  <div className="website-details group rounded-[1rem] overflow-hidden shadow-xl">
                    <div className="web-container">
                      <img
                        className="webimgmov object-top group-hover:object-bottom transition-all duration-[5s] ease-in"
                        src={data.imageUrl}
                        alt={`Website showcase ${data.id}`}
                      />
                      <div className="web-overlay"></div>
                      <div className="web-button">
                        <a target="_blank" rel="noopener noreferrer" href={data.websiteurl}>
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))
            ) : (
              <div className="text-left text-2xl font-medium animate-bounce">
                No data found.
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default WebDesign;

