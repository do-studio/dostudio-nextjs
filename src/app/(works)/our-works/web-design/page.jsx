"use client";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "../../../../components/motions/fadeUp";
import axios from "axios";
import Head from "next/head";
import { client } from "../../../../../utils/sanity";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';








const WebDesign = async () => {

  const [webDesignsData, setWebDesignsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getStaticProps = async () => {
    const query = `*[_type == "webDesign"]  | order(orderRank) {
        _id,
        title,
        link,
        alt,
        image {
          asset->{
            url,
          }
        }
      }`;



    const webDesigns = await client.fetch(query);

    return {
      props: {
        webDesigns,
      },
      revalidate: 60,
    };
  }


  useEffect(() => {

    const fetchData = async () => {

      try {
        setLoading(true);
        const { props } = await getStaticProps()
        setWebDesignsData(props.webDesigns)
      } catch (error) {
        console.error("Error fetching production videos:", error);
      } finally {
        setLoading(false);
      }


    }
    fetchData()
  }, [])



  useEffect(() => {
    // Set title
    document.title = "Custom Web Design & Development services in Calicut | Do Studio";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "We are leading web design company in Calicut offering custom website design, development services. We create unique and engaging websites."
      );
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute(
        "content",
        "We are leading web design company in Calicut offering custom website design, development services. We create unique and engaging websites."
      );
      document.head.appendChild(newMetaDescription);
    }
  }, []);




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
            {
              loading ? (
                <div className="flex flex-col gap-10">

                  <Skeleton count={6} height={400} className="w-full mb-10 rounded-lg" />
                </div>
              )
                :
                webDesignsData.length > 0 ? (
                  webDesignsData.map((data, i) => (
                    <FadeUp duration={0.5} delay={0.1 * i} key={data._id}>
                      <div className="website-details group rounded-[1rem] overflow-hidden shadow-xl">
                        <div className="web-container">
                          <img
                            className="webimgmov object-top group-hover:object-bottom transition-all duration-[5s] ease-in"
                            src={data.image.asset.url}
                            alt={`Website showcase ${data.alt}`}
                            lazyLoad="eager"
                          />
                          <div className="web-overlay"></div>
                          <div className="web-button">
                            <a target="_blank" rel="noopener noreferrer" href={data.link}>
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
                )
            }
          </div>
        </div>
      </main>
    </>
  );
};

export default WebDesign;

