"use client";
import React, { useState, useEffect } from "react";
import {
  serwebdev1,
  serbra1,
  serbra2,
  serwebdev2,
  WebsiteServiceBanner
} from "../../../../../public/images/index";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "../../../../components/motions/fadeUp";
import {
  FaHtml5,
  FaNodeJs,
  FaReact,
  FaRegUserCircle,
  FaShopify,
  FaWordpress,
} from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import Head from "next/head";
import { Helmet } from "react-helmet";

const FaqComponent1 = () => {
  const [activeIndex1, setActiveIndex1] = useState(null);

  const faqs1 = [
    {
      question: `Discovery & Research`,
      answer: `<b>Our web development company in calicut</b> begin by understanding client goals, conducting market analysis, researching competitors, and gaining insights into the target audience.`,
    },
    {
      question: `Planning & Strategy`,
      answer: `We define the project scope, create information architecture, develop wireframes and prototypes, and craft a content strategy in <b>our web development company in calicut</b>.`,
    },
    {
      question: `Design & User Experience`,
      answer: `We focus on user-centered design, visual branding and aesthetics, interactive elements, and ensuring accessibility and usability.`,
    },
    {
      question: `Development & Integration`,
      answer: `We handle front-end and back-end development, CMS integration, and the integration of third-party tools.`,
    },
  ];

  const toggleFaq1 = (index) => {
    setActiveIndex1(activeIndex1 === index ? null : index);
  };

  return (
    <div className="w-full mx-auto">
      {faqs1.map((faq, index) => (
        <div key={index} className="mb-2">
          <button
            className={`w-full text-left p-4 bg-gray-100 ${
              activeIndex1 === index && "bg-primarygreen"
            } transition-all duration-200 rounded-xl flex justify-between items-center`}
            onClick={() => toggleFaq1(index)}
          >
            <p className="text-base font-medium">{faq.question}</p>
            {activeIndex1 === index ? (
              <>
                <MdKeyboardArrowUp className="text-2xl" />
              </>
            ) : (
              <>
                <MdKeyboardArrowDown className="text-2xl" />
              </>
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              activeIndex1 === index ? "max-h-[200px]" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-white text-sm border rounded-xl mt-2">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FaqComponent2 = () => {
  const [activeIndex2, setActiveIndex2] = useState(null);

  const faqs2 = [
    {
      question: `Testing & Optimization`,
      answer: `We conduct cross-browser and device testing, optimize performance, perform security audits, and incorporate user feedback for adjustments.`,
    },
    {
      question: `Launch & Deployment`,
      answer: `Our <b>web development company in calicut</b> perform a final review and approval, deploy to live servers, provide monitoring and support, and offer post-launch training.`,
    },
    {
      question: `Maintenance & Growth`,
      answer: `We provide ongoing website maintenance, track analytics and performance, implement continuous improvements, and manage SEO and content updates.`,
    },
    {
      question: `Client Collaboration`,
      answer: `We in our <b>web development company in calicut</b> ensure regular updates and communication, maintain feedback loops, engage in collaborative decision-making, and plan for long-term partnerships.`,
    },
  ];

  const toggleFaq2 = (index) => {
    setActiveIndex2(activeIndex2 === index ? null : index);
  };

  return (
    <div className="w-full mx-auto">
      {faqs2.map((faq, index) => (
        <div key={index} className="mb-2">
          <button
            className={`w-full text-left p-4 bg-gray-100 ${
              activeIndex2 === index && "bg-primarygreen"
            } transition-all duration-200  rounded-xl  flex justify-between items-center`}
            onClick={() => toggleFaq2(index)}
          >
            <p className="text-base font-medium">{faq.question}</p>
            {activeIndex2 === index ? (
              <>
                <MdKeyboardArrowUp className="text-2xl" />
              </>
            ) : (
              <>
                <MdKeyboardArrowDown className="text-2xl" />
              </>
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              activeIndex2 === index ? "max-h-[200px]" : "max-h-0"
            }`}
          >
            <div className="p-4 bg-white text-sm border rounded-xl mt-2">
              <div dangerouslySetInnerHTML={{ __html: faq.answer }}></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const FaqMain = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs2 = [
    {
      question: `What is web development?`,
      answer: `Web development is the process of creating and maintaining websites. It involves designing, coding, and building the functionality of a site to ensure it operates effectively on the web.`,
    },
    {
      question: `What services do you offer?`,
      answer: `Our Web development company in Calicut offers a range of services including HTML coding, WordPress theme development, React.js web applications, Node.js server-side solutions, and Netlify deployment.`,
    },
    {
      question: `How long does it take to build a website?`,
      answer: `The timeline for building a website depends on its complexity and scope. Simple websites may take a few weeks, while more complex projects could take several months.`,
    },
    {
      question: `Do you provide ongoing support after the website is launched?`,
      answer: `Yes, Our Web development company offers ongoing maintenance and support to ensure your website remains updated, secure, and functional.`,
    },
    {
      question: `Can you help with website redesigns?`,
      answer: `Absolutely! We can assist with redesigning your website to improve its appearance, functionality, and user experience.`,
    },
    {
      question: `What is responsive design?`,
      answer: `Responsive design ensures that your website looks and works well on all devices, including desktops, tablets, and smartphones.`,
    },
    {
      question: `Will my website be search engine optimized (SEO)?`,
      answer: `Our Web development company in calicut can implement SEO best practices to help improve your website’s visibility and ranking on search engines.`,
    },
    {
      question: `How do I get started with your services?`,
      answer: `To get started, simply contact us through our website or schedule a consultation to discuss your project needs and goals.`,
    },
  ];

  const toggleFaq3 = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const toggleShowAll = () => {
    setShowAll(!showAll);
  };

  return (
    <div className="w-full mx-auto">
      {faqs2.slice(0, showAll ? faqs2.length : 4).map((faq, index) => (
        <div key={index} className="my-2 border-b last:border-b-0 outline-none">
          <button
            className={`w-full text-left pl-0 p-4 bg-white ${
              activeFaq === index && "bg-primarygreen"
            } transition-all duration-200 rounded-sm flex justify-between gap-10 items-center`}
            onClick={() => toggleFaq3(index)}
          >
            <p className="text-base font-medium">{faq.question}</p>
            {activeFaq === index ? (
              <HiMiniMinusSmall className="text-xl" />
            ) : (
              <GoPlus className="text-xl" />
            )}
          </button>
          <div
            className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
              activeFaq === index ? "max-h-[200px]" : "max-h-0"
            }`}
          >
            <div className="pl-0 p-4 bg-white text-sm rounded-md mt-2">
              <p>{faq.answer}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Show "Read More" button only if there are more than 4 items */}
      {!showAll && faqs2.length > 4 && (
        <button
          onClick={toggleShowAll}
          className="text-sm hover:text-primarygreen duration-200"
        >
          Load More
        </button>
      )}

      {/* Show "Show Less" button when all items are visible */}
      {showAll && (
        <button
          onClick={toggleShowAll}
          className="text-sm hover:text-primarygreen duration-200"
        >
          Show Less
        </button>
      )}
    </div>
  );
};

const webDesignsData = [
  {
    id: 0,
    websiteurl: "https://exxude.in",
    imageUrl: "https://cdn.sanity.io/images/0hjyj1bs/production/415ef0a5e87926c90a7a80a89f4ac2c76d62f836-2561x11214.webp"
  },
  {
    id: 1,
    websiteurl: "https://bfcsoccerschoolsqatar.com",
    imageUrl: "https://cdn.sanity.io/images/0hjyj1bs/production/fa3b0ceef29cbe5802328ccb253ad98ad6ef1d1a-2940x7142.webp"
  },
  {
    id: 2,
    websiteurl: "https://ztartvisa.com",
    imageUrl: "https://cdn.sanity.io/images/0hjyj1bs/production/d8a24d7e39e2e11af7f187a9d04bbda9891814f0-1920x7212.webp"
  },

  {
    id: 3,
    websiteurl: "https://heeracorporate.com",
    imageUrl: "https://cdn.sanity.io/images/0hjyj1bs/production/ff42ee60b6a52e88a70203cce9bca85f9505c218-1920x4402.webp"
  },

];

const Page = () => {
  const [workdata, setWorkdata] = useState([]);
  const [showSecondComponent, setShowSecondComponent] = useState(false);

  const toggleShowSecondComponent = () => {
    setShowSecondComponent(!showSecondComponent);
  };



  useEffect(() => {
    // Set title
    document.title = "Web Development Company In Calicut, Kerala | Do Studio";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.");
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "web development company in calicut, website development company in calicut, shopify development agency in calicut");
    } else {
      const newMetaKeywords = document.createElement("meta");
      newMetaKeywords.setAttribute("name", "keywords");
      newMetaKeywords.setAttribute("content", "web development company in calicut, website development company in calicut, shopify development agency in calicut");
      document.head.appendChild(newMetaKeywords);
    }

    // Set Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Web Development Company In Calicut, Kerala | Do Studio");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.setAttribute("content", "Web Development Company In Calicut, Kerala | Do Studio");
      document.head.appendChild(newOgTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.setAttribute("content", "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.");
      document.head.appendChild(newOgDescription);
    }

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      const newOgUrl = document.createElement("meta");
      newOgUrl.setAttribute("property", "og:url");
      newOgUrl.setAttribute("content", "https://dostudio.co.in");
      document.head.appendChild(newOgUrl);
    }

    // Set Twitter meta tags
    let twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle) {
      twitterTitle.setAttribute("content", "Web Development Company In Calicut, Kerala | Do Studio");
    } else {
      const newTwitterTitle = document.createElement("meta");
      newTwitterTitle.setAttribute("name", "twitter:title");
      newTwitterTitle.setAttribute("content", "Web Development Company In Calicut, Kerala | Do Studio");
      document.head.appendChild(newTwitterTitle);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.");
    } else {
      const newTwitterDescription = document.createElement("meta");
      newTwitterDescription.setAttribute("name", "twitter:description");
      newTwitterDescription.setAttribute("content", "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.");
      document.head.appendChild(newTwitterDescription);
    }

    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    if (!twitterCard) {
      const newTwitterCard = document.createElement("meta");
      newTwitterCard.setAttribute("name", "twitter:card");
      newTwitterCard.setAttribute("content", "summary_large_image");
      document.head.appendChild(newTwitterCard);
    }
  }, []);

  return (
    <>
      
      <section className="w-11/12 xl:w-10/12 mx-auto min-h-screen pt-20 py-20 flex flex-col gap-10 xl:gap-20">
        <div className="relative w-full h-48 md:h-80 xl:h-[500px]  overflow-hidden">
          <Image
            className="object-cover object-center"
            placeholder="blur"
            fill
            src={WebsiteServiceBanner}
            alt="Branding agency in Calicut"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 gap-y-3">
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
          href={"/contact"}
          className="bg-primarygreen text-black w-fit mx-auto px-10 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
        >
          Contact now
        </Link>

        <div>
          <p className="xl:text-center tracking-tighter xl:tracking-normal text-justify text-xl xl:text-2xl font-semibold">
            "We build websites that are user-friendly, presenting clean and
            simple layouts, and it only takes a few seconds for users to get
            where they are going. This sleekness of the design not only makes
            for a better user experience, it also increases the average user
            session time, hence enhancing the funnel conversion rate of the
            website."
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <div className="relative w-full h-48 md:h-80 xl:h-[500px]  overflow-hidden">
            <Image
              className="object-cover object-bottom"
              placeholder="blur"
              fill
              src={serwebdev2}
              alt="Branding agency in Calicut"
            />
          </div>
          <h2 className="text-3xl xl:text-6xl font-black uppercase">
            Make your website alive with Web development company in Calicut
          </h2>
          <div className="flex flex-col gap-3">
            <p>
              We are leading <b>Web Development company in Calicut</b> providing
              best Digital Solutions with quality, innovation, and reliable
              result. For a look at our website service offerings, you can visit
              Web Design, Custom Web Development, WordPress Solutions and Modern
              Web Applications. We do Custom HTML/CSS Development, WordPress
              Theme Development, React.js Web Applications, Netlify Deployment &
              Hosting, Node.js Server Side Solutions.
            </p>
            <p>
              From numerous industries, we showcase our portfolio featuring our
              successful projects which were responsive, user friendly and high
              performing. We are the{" "}
              <b>best web development company in Calicut</b> because of our
              technical presence and the zeal we bring with our work. We take
              the pride in being the first pick of leading company as our team
              of good developers makes sure your web project is completed and
              handed over to you precisely.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-10 xl:gap-20">
          <h3 className="text-center  text-3xl xl:text-6xl font-black uppercase">
            Our Services Include
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-x-3 gap-y-10">
            <div className="group border shadow-lg hover:shadow-xl duration-200 rounded-xl p-5 flex flex-col justify-center gap-2 relative">
              <div className="group-hover:scale-90 duration-300 h-12 w-12 rounded-full bg-black text-primarygreen  absolute -top-7 shadow-2xl shadow-black grid place-items-center">
                <FaHtml5 className="text-3xl " />
              </div>
              <p className="uppercase font-bold pt-2">html</p>
              <p className="text-sm">
                Get clean, responsive HTML code that ensures your website looks
                fantastic and operates smoothly on any device.
              </p>
            </div>
            <div className="group border shadow-lg hover:shadow-xl duration-200 rounded-xl p-5 flex flex-col justify-center gap-2 relative">
              <div className="group-hover:scale-90 duration-300 h-12 w-12 rounded-full bg-black text-primarygreen  absolute -top-7 shadow-2xl shadow-black grid place-items-center">
                <FaWordpress className="text-3xl " />
              </div>
              <p className="uppercase font-bold pt-2">wordpress</p>
              <p className="text-sm">
                Enjoy custom WordPress themes and seamless plugin integration
                for a dynamic and user-friendly website experience.
              </p>
            </div>
            <div className="group border shadow-lg hover:shadow-xl duration-200 rounded-xl p-5 flex flex-col justify-center gap-2 relative">
              <div className="group-hover:scale-90 duration-300 h-12 w-12 rounded-full bg-black text-primarygreen  absolute -top-7 shadow-2xl shadow-black grid place-items-center">
                <FaShopify className="text-3xl " />
              </div>
              <p className="uppercase font-bold pt-2">Shopify</p>
              <p className="text-sm">
                A Shopify website is an e-commerce platform that allows
                individuals and businesses to create and manage online stores.
              </p>
            </div>
            <div className="group border shadow-lg hover:shadow-xl duration-200 rounded-xl p-5 flex flex-col justify-center gap-2 relative">
              <div className="group-hover:scale-90 duration-300 h-12 w-12 rounded-full bg-black text-primarygreen  absolute -top-7 shadow-2xl shadow-black grid place-items-center">
                <FaNodeJs className="text-3xl " />
              </div>
              <p className="uppercase font-bold pt-2">react js</p>
              <p className="text-sm">
                Experience high-performance web apps with React.js, featuring
                interactive and responsive user interfaces.
              </p>
            </div>
            <div className="group border shadow-lg hover:shadow-xl duration-200 rounded-xl p-5 flex flex-col justify-center gap-2 relative">
              <div className="group-hover:scale-90 duration-300 h-12 w-12 rounded-full bg-black text-primarygreen  absolute -top-7 shadow-2xl shadow-black grid place-items-center">
                <FaReact className="text-3xl " />
              </div>
              <p className="uppercase font-bold pt-2">node js</p>
              <p className="text-sm">
                Build scalable and efficient server-side applications with
                Node.js, providing strong performance and real-time
                capabilities.
              </p>
            </div>
          </div>
          <Link
            href={"/our-works/web-design"}
            className="bg-primarygreen mx-auto text-black w-fit px-20 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
          >
            See more
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {webDesignsData && webDesignsData.length > 0 ? (
            webDesignsData?.slice(0, 4).map((data, i) => (
              <FadeUp duration={0.5} delay={0.5 * i} key={i}>
                <div className="website-details group overflow-hidden shadow-md">
                  <div className="web-container ">
                    <img
                      className="webimgmov object-top group-hover:object-bottom transition-all duration-[5s] ease-in"
                      src={data.imageUrl}
                      alt=""
                    />
                    <div className="web-overlay "></div>
                    <div className="web-button ">
                      <a target="_blank" href={data.websiteurl}>
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
        <Link
          href={"/our-works/web-design"}
          className="bg-primarygreen mx-auto text-black w-fit px-20 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
        >
          See more
        </Link>

        <div>
        
          <h4 className="text-center  text-3xl xl:text-6xl my-10 xl:my-20  font-black uppercase">
            How We Turn Your Vision
            <br className="hidden xl:block" /> Into Reality
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <FaqComponent1 />
            {showSecondComponent || (
              <div className="hidden md:block">
                <FaqComponent2 />
              </div>
            )}
          </div>

          {showSecondComponent || (
            <button
              onClick={toggleShowSecondComponent}
              className="block md:hidden mt-3 text-center w-full text-sm hover:text-primarygreen duration-200"
            >
              Load more
            </button>
          )}

          {showSecondComponent && (
            <div className="block md:hidden">
              <FaqComponent2 />
            </div>
          )}
        </div>

        <div>
          <h5 className="text-4xl xl:text-6xl font-black pb-5 uppercase">
            FAQ's to a Web development
            <br className="hidden 2xl:block" /> company in Calicut
          </h5>
          <FaqMain />
        </div>
      </section>
    </>
  );
};

export default Page;
