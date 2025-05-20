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
  DigitalMarketingBannerImage
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
import { Helmet } from "react-helmet";

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
            <p className={`text-base font-medium `}>{faq.question}</p>
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

const postersData = [
  {
    id: 1,
    order: 1,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745405949/Lulu_thudarum_39e52c82f8.webp",
    hgt: "4/5"
  },
  {
    id: 2,
    order: 2,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745220987/Lulu_empuran_17b9ddcf3a.webp",
    hgt: "4/5"
  },
  {
    id: 3,
    order: 3,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1745220987/large_Lulu_vishu_ca477cb2fc.webp",
    hgt: "4/5"
  },
  {
    id: 4,
    order: 4,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174474/medium_AROOHA_P4_copy_e8bcd8835f_32723205a2.webp",
    hgt: "1/1"
  },
  {
    id: 5,
    order: 5,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174362/small_medium_C_Builders_JUNE_P2_copy_7e41f57f4d_6c8779bed2.webp",
    hgt: "1/1"
  },
  {
    id: 6,
    order: 6,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1741174108/large_Kurikkal_MAR_P3_copy_d884943c7b_62d2c88128.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740977522/large_Ztart_Aug_Destination_18cc317071_ee37b09ffa.webp",
    hgt: "4/5"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974452/large_AROOHA_aug_p8_v2_copy_f97df6128d_f9e6d4b8f3.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/USA_AD_2_b46ad390d2_faabe9db3a.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/AROOHA_AUG_P1_copy_49da850ee2_0cf2bdc3bc.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/large_ZTART_CANADA_AD_f4b9f66a7f_af02cd7e41.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974453/medium_uk_visa_ad_de2cf60dc5_171ee9d252.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974452/large_AROOHA_p5_copy_ed8d2a45b7_13b2e5309e.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974112/palooda_SEP_P4_v5_copy_4d1f3e9493_8f10468a08.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974112/large_Whats_App_Image_2025_01_13_at_17_12_07_77026146_75e998b28e_421155b073.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974111/large_T_and_T_NOV_P2_copy_349d77fbb9_a5d98513a9.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974111/large_Whats_App_Image_2025_01_13_at_17_11_45_645dcaad_2daa8f0661_b9172a1dbc.webp",
    hgt: "1/1"
  },
  {
    id: 7,
    order: 7,
    imageUrl: "https://res.cloudinary.com/djswkzoth/image/upload/v1740974111/large_Whats_App_Image_2025_01_13_at_17_11_44_545857c7_36335c331c_f72ae60992.webp",
    hgt: "1/1"
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
    document.title = "Leading Digital Marketing Services in Calicut: Do Studio";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.");
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, socialmedia agency in kozhikode");
    } else {
      const newMetaKeywords = document.createElement("meta");
      newMetaKeywords.setAttribute("name", "keywords");
      newMetaKeywords.setAttribute("content", "Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, socialmedia agency in kozhikode");
      document.head.appendChild(newMetaKeywords);
    }

    // Set Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Leading Digital Marketing Services in Calicut: Do Studio");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.setAttribute("content", "Leading Digital Marketing Services in Calicut: Do Studio");
      document.head.appendChild(newOgTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.setAttribute("content", "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.");
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
      twitterTitle.setAttribute("content", "Leading Digital Marketing Services in Calicut: Do Studio");
    } else {
      const newTwitterTitle = document.createElement("meta");
      newTwitterTitle.setAttribute("name", "twitter:title");
      newTwitterTitle.setAttribute("content", "Leading Digital Marketing Services in Calicut: Do Studio");
      document.head.appendChild(newTwitterTitle);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.");
    } else {
      const newTwitterDescription = document.createElement("meta");
      newTwitterDescription.setAttribute("name", "twitter:description");
      newTwitterDescription.setAttribute("content", "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.");
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
        <div className="relative w-full h-48 md:h-80 xl:h-[500px] overflow-hidden">
          <Image
            className="object-cover"
            placeholder="blur"
            fill
            src={DigitalMarketingBannerImage}
            objectPosition="top"
            alt="digital marketing agency in kozhikode"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 gap-y-3">
          <h1 className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black uppercase">
            Do Studio Digital Marketing Agency In Calicut
          </h1>
          <div className="md:basis-1/2 xl:basis-2/5 flex flex-col gap-3">
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

        <div className="columns-3 gap-x-0 gap-y-0">
          {postersData && postersData.length > 0 ? (
            postersData.slice(0, 6).map((data) => (
              <FadeUp duration={0.5} delay={0.5}>
                <div className="relative group">
                  <div    className="relative w-full break-inside-avoid-column"
              style={{
                aspectRatio: data.hgt || '1 / 1',
              }}>
                    <Image
                      loading="lazy"
                      src={data.imageUrl}
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
          <h4 className="text-3xl xl:text-6xl font-black uppercase text-center pb-5 xl:pb-16">
            Our Happy Clients
          </h4>
          <Testimonials />
        </div>

        <div>
          <h5 className="text-4xl xl:text-6xl font-black pb-5">FAQs</h5>
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
            <h6 className="text-4xl xl:text-6xl font-black xl:text-right uppercase">
              Best Branding Agency In Calicut.
            </h6>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
