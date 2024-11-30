"use client";
import React, { useState, useEffect } from "react";
import {
  wrk1,
  wrk2,
  wrk3,
  wrk4,
  wrk5,
  WRK1,
  WRK2,
  serbra1,
  serbra2,
  serdig1,
  serdig2,
} from "../../../../../public/images/index";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "../../../../components/motions/fadeUp";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
import { Testimonials } from "../../../../components/index";
import Head from "next/head";

const FaqComponent1 = () => {
  const [activeIndex1, setActiveIndex1] = useState(null);

  const faqs1 = [
    {
      question: `Client-Centered Approach`,
      answer: `We begin by understanding your brand's vision, goals, and target audience. Our team engages in deep conversations to ensure we capture the essence of your business.`,
    },
    {
      question: `Market Research & Insights`,
      answer: `We conduct thorough market research to identify trends, competitors, and opportunities unique to Calicut and beyond. This helps us craft strategies that resonate with your audience.`,
    },
    {
      question: `Creative Concept Development`,
      answer: `Our creative team collaborates to brainstorm and develop innovative concepts that align with your brand identity, ensuring a distinctive and memorable brand presence.`,
    },
    {
      question: `Tailored Branding Strategies`,
      answer: `We design customized branding strategies that reflect your unique brand story, from logo design and color schemes to brand messaging and tone of voice.`,
    },
    {
      question: `Collaborative Design Process`,
      answer: `We involve you at every step of the design process, incorporating your feedback to create a brand identity that truly represents your business`,
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
            <h3 className="text-base font-medium">{faq.question}</h3>
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
              <p>{faq.answer}</p>
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
      question: `Attention to Local Culture`,
      answer: `Being based in Calicut, we infuse local cultural elements into our designs, ensuring your brand connects with the regional audience while maintaining universal appeal.`,
    },
    {
      question: `Data-Driven Decisions`,
      answer: `We rely on data and analytics to guide our branding decisions, ensuring that every element we create has a purpose and contributes to your business goals`,
    },
    {
      question: `Quality Assurance`,
      answer: `Our team meticulously reviews every aspect of the branding process to ensure high standards of quality and consistency across all brand touchpoints.`,
    },
    {
      question: `Launch & Beyond`,
      answer: `We assist with the launch of your brand, providing continuous support to ensure your brand's message remains strong and relevant as your business grows.`,
    },
    {
      question: `Ongoing Evaluation & Optimization`,
      answer: `Post-launch, we monitor your brand's performance and make necessary adjustments to optimize your brand's impact and reach.`,
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
            <h3 className="text-base font-medium">{faq.question}</h3>
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
              <p>{faq.answer}</p>
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
      question: `What digital marketing services does your agency offer in Calicut?`,
      answer: `Our digital marketing agency in Calicut offers a wide range of services, including SEO, social media marketing, content creation, email marketing, pay-per-click (PPC) advertising, branding, and web design. We tailor our services to meet the unique needs of each client to ensure maximum online visibility and engagement.`,
    },
    {
      question: `Why should I choose a local digital marketing agency in Calicut?`,
      answer: `Choosing a local digital marketing agency in Calicut gives you the advantage of working with a team that understands the regional market, audience behavior, and local trends. We provide personalized service, are easily accessible for in-person meetings, and can offer insights specific to your target audience in Calicut and Kerala`,
    },
    {
      question: `How does digital marketing benefit my business in Calicut?`,
      answer: `Digital marketing helps your business in Calicut by increasing your online visibility, attracting targeted traffic, and converting leads into customers. Through strategies like SEO, social media marketing, and PPC, we help you reach a broader audience, build brand awareness, and ultimately drive sales.`,
    },
    {
      question: `What makes your digital marketing agency different from others in Calicut?`,
      answer: `Our digital marketing agency stands out in Calicut due to our commitment to quality, creativity, and results. We provide tailored strategies, transparent communication, and a focus on ROI. Our team of experts uses the latest tools and techniques to deliver exceptional results that align with your business goals.`,
    },
    {
      question: `How long does it take to see results from digital marketing services?`,
      answer: `The time it takes to see results from digital marketing services varies depending on the strategy and goals. SEO typically takes 3 to 6 months to show significant results, while PPC and social media campaigns can generate leads and conversions almost immediately. We provide ongoing reports to track progress and optimize strategies as needed.`,
    },
    {
      question: `Do you offer customized digital marketing plans?`,
      answer: `Yes, we offer customized digital marketing plans tailored to your business needs, goals, and budget. We begin with an in-depth analysis of your business and target audience, then develop a strategy that aligns with your objectives, ensuring maximum effectiveness.`,
    },
    {
      question: `Can your agency help with local SEO in Calicut?`,
      answer: `Absolutely. We specialize in local SEO to help businesses in Calicut rank higher in search engine results for location-specific queries. Our strategies include optimizing your Google My Business profile, managing online reviews, and targeting local keywords to increase your visibility among potential customers in the area.`,
    },
    {
      question: `How do you measure the success of your digital marketing efforts?`,
      answer: `We measure the success of our digital marketing efforts using key performance indicators (KPIs) such as website traffic, conversion rates, return on investment (ROI), engagement metrics, and search engine rankings. We provide detailed reports and analytics to show you the impact of our strategies and how they contribute to your business growth.`,
    },
    {
      question: `What industries do you specialize in for digital marketing?`,
      answer: `Our digital marketing agency in Calicut has experience working with a diverse range of industries, including retail, healthcare, real estate, education, hospitality, and more. We customize our strategies based on industry-specific trends and audience behaviors to deliver effective results.`,
    },
    {
      question: `Do you provide digital marketing services for small businesses in Calicut?`,
      answer: `Yes, we provide tailored digital marketing services for small businesses in Calicut. Our strategies are designed to maximize your online presence within your.`,
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
      {faqs2.slice(0, showAll ? faqs2.length : 5).map((faq, index) => (
        <div key={index} className="my-2 border-b last:border-b-0 outline-none">
          <button
            className={`w-full text-left pl-0 p-4 bg-white ${
              activeFaq === index && "bg-primarygreen"
            } transition-all duration-200 rounded-sm flex justify-between gap-10 items-center`}
            onClick={() => toggleFaq3(index)}
          >
            <h3 className={`text-base font-medium `}>{faq.question}</h3>
            {activeFaq === index ? (
              <HiMiniMinusSmall className={`text-xl`} />
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

async function fetchData() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/creatives?&populate=*`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return notFound();
  }

  return res.json();
}

const Page = () => {
  const [workdata, setWorkdata] = useState([]);
  const [showSecondComponent, setShowSecondComponent] = useState(false);

  const toggleShowSecondComponent = () => {
    setShowSecondComponent(!showSecondComponent);
  };

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setWorkdata(
        data.data?.sort((a, b) => a.attributes.order - b.attributes.order)
      );
    };

    getData();
  }, []);

  return (
    <>
      <Head>
        <link
          rel="canonical"
          href="https://dostudio.co.in/services/digital-marketing-agency-in-calicut"
          key="canonical"
        />
      </Head>
      <section className="w-11/12 xl:w-10/12 mx-auto min-h-screen pt-20 py-20 flex flex-col gap-10 xl:gap-20">
        <div className="relative w-full h-48 md:h-80 xl:h-[500px] overflow-hidden">
          <Image
            className="object-cover"
            placeholder="blur"
            fill
            src={serdig1}
            alt="digital marketing agency in kozhikode"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 gap-y-3">
          <h1 className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black uppercase">
            Professional Marketers Creating Tomorrow’s Trends
          </h1>
          <div className="md:basis-1/2 xl:basis-2/5 flex flex-col gap-3">
            <h1 className="text-2xl font-semibold">
              Do Studio Digital Marketing Agency In Calicut
            </h1>
            <p className="text-justify tracking-tighter">
              As a Best{" "}
              <a className="font-semibold" href="#" target="_blank">
                digital marketing agency in Calicut
              </a>
              , we pride ourselves on staying ahead of the curve and setting new
              industry standards. From SEO to social media, we craft customized
              solutions that not only meet your business goals but also pave the
              way for future success. Partner with us to experience the future
              of digital marketing today.
            </p>
          </div>
        </div>
        <Link
          href={"/contact"}
          className="bg-primarygreen text-black w-fit mx-auto px-10 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
        >
          Contact now
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {workdata && workdata.length > 0 ? (
            workdata.slice(0, 6).map((data) => (
              <FadeUp duration={0.5} delay={0.5}>
                <div className="relative group">
                  <div className="relative aspect-square w-full">
                    <Image
                      loading="lazy"
                      src={data.attributes.image.data.attributes.url}
                      fill={true}
                      className="object-cover"
                      alt="wrk1"
                    />
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
          href={"/our-works/creatives"}
          className="bg-primarygreen mx-auto text-black w-fit px-20 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
        >
          See more
        </Link>
        <div className="flex flex-col-reverse md:flex-row gap-5 gap-y-3">
          <p className="md:basis-1/2 xl:basis-2/5 text-justify tracking-tighter">
            {" "}
            At our{" "}
            <a className="font-semibold" href="#" target="_blank">
              digital marketing agency in calicut
            </a>
            , we specialize in building brands that stand out in today's
            competitive landscape. Our strategy is focused on a deep
            understanding of our clients' unique needs, ensuring that every
            campaign is customized to their specific goals and challenges. By
            offering the best{" "}
            <a className="font-semibold" href="#" target="_blank">
              digital marketing services in calicut
            </a>
            , we create effective solutions that not only grab attention but
            also build lasting connections with target audiences. Our approach
            combines creativity with data-driven insights to deliver great
            results that boost your brand's presence and drive steady growth.
            Partner with us to turn your vision into a powerful, standout brand.
          </p>
          <h2 className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black xl:text-right uppercase">
            Building Brand
            <br /> That Stands
            <br /> Out.
          </h2>
        </div>
        <div>
          <div className="relative w-full h-48 md:h-80 xl:h-[500px]   overflow-hidden">
            <Image
              className="object-cover object-center"
              placeholder="blur"
              fill
              src={serdig2}
              alt="best digital marketing agency in calicut"
            />
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-5 gap-y-3">
          <h3
            className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-5xl font-black uppercase"
            href="#"
          >
            Transform Your Online Presence with Best
            <br className="hidden xl:block" /> Digital Marketing
            <br /> Services in Calicut
          </h3>
          <div className="md:basis-1/2 xl:basis-2/5 flex flex-col gap-3">
            <p className=" text-justify tracking-tighter">
              Do studio delivers{" "}
              <a className="font-semibold" href="#" target="_blank">
                Best Digital Marketing services in Calicut
              </a>
              , with a focus on quality, innovation, and tangible results. Our
              service offerings encompass a wide range of solutions, including
              Digital Marketing, Branding, Product Photography, Social Media
              Management, and Brochure Design. Our portfolio reflects our
              success in executing diverse projects, demonstrating our ability
              to navigate the digital landscape and deliver outstanding results
              for our clients. Which makes us the{" "}
              <a className="font-semibold" href="#" target="_blank">
                best digital marketing agency in calicut
              </a>
              .
            </p>
          </div>
        </div>
        <div className="">
          <h3 className="text-3xl xl:text-6xl font-black uppercase text-center pb-5 xl:pb-16">
            Our Happy Clients
          </h3>
          <Testimonials />
        </div>

        <div>
          <h4 className="text-4xl xl:text-6xl font-black pb-5">FAQs</h4>
          <FaqMain />
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-y-3 gap-5">
          <div className="md:basis-1/2 xl:basis-2/5 flex flex-col gap-y-3">
            <p className=" text-justify tracking-tighter">
              Looking for the{" "}
              <a className="font-semibold" href="#" target="_blank">
                best branding agency in Calicut
              </a>
              ? Our agency specializes in creating powerful and memorable brand
              identities that resonate with your target audience. We combine
              creativity, strategy, and market insights to develop branding
              solutions that elevate your business and set you apart from the
              competition.
            </p>
            <Link
              href={"/services/branding-agency-in-calicut"}
              className="bg-primarygreen text-black w-fit px-10 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
            >
              Know more
            </Link>
          </div>
          <div className="md:basis-1/2 xl:basis-3/5 ">
            <h5 className="text-4xl xl:text-6xl font-black xl:text-right uppercase">
              Best Branding Agency In Calicut.
            </h5>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
