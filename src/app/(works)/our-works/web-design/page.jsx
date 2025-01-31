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


async function getData() {
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/api/webdesigns?&populate=*`
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return notFound();
  }
}


let testImage =
  "https://res.cloudinary.com/djswkzoth/image/upload/v1706872860/Do%20Studio%20Website/webBanner/long/farookcollege-ac-in_gecais.webp";
const WebDesign = async () => {
  const workdata = await getData();

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

          <div className="grid grid-cols-1 gap-y-14 ">
            {workdata.data && workdata.data.length > 0 ? (
              workdata.data?.map((data, i) => (
                <FadeUp duration={0.5} delay={0.1 * i}   key={i}>
                  <div
                    className="website-details group rounded-[1rem] overflow-hidden shadow-xl"
                  
                  >
                    <div className="web-container ">
                      <img
                        className="webimgmov object-top group-hover:object-bottom transition-all duration-[5s] ease-in"
                        src={data.attributes.webimage.data.attributes.url}
                        alt=""
                      />
                      <div className="web-overlay "></div>
                      <div className="web-button ">
                        <a target="_blank" href={data.attributes.siteurl}>
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

