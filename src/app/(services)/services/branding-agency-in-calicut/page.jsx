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
} from "../../../../../public/images/index";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeUp from "../../../../components/motions/fadeUp";
import { FaRegUserCircle } from "react-icons/fa";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { HiMiniMinusSmall } from "react-icons/hi2";
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
    <>
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
                <p>{faq.answer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

const FaqMain = () => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const faqs2 = [
    {
      question: `What services does a branding agency in Calicut offer?`,
      answer: `A branding agency in Calicut typically offers services such as brand strategy development, logo design, brand identity creation, digital marketing, social media branding, and content creation. These services are designed to enhance your brand's visibility and reputation in the market.`,
    },
    {
      question: `How can a branding agency help my business in Calicut?`,
      answer: `A branding agency in Calicut can help your business by developing a strong and cohesive brand identity that resonates with your target audience. This includes creating a memorable logo, consistent messaging, and an effective digital presence, all of which contribute to building brand loyalty and driving business growth.`,
    },
    {
      question: `Why should I choose a local branding agency in Calicut?`,
      answer: `Choosing a local branding agency in Calicut offers the advantage of understanding the regional market and cultural nuances. A local agency can provide personalized services, face-to-face consultations, and insights into the local business environment, making your brand more relevant and appealing to the target audience in Kerala.`,
    },
    {
      question: `How long does it take to develop a brand strategy in Calicut?`,
      answer: `The time required to develop a brand strategy in Calicut varies depending on the complexity of your business and goals. Typically, it can take anywhere from a few weeks to a couple of months. A thorough branding process involves research, strategy development, design, and implementation to ensure a successful brand launch.`,
    },
    {
      question: `What is the cost of hiring a branding agency in Calicut?`,
      answer: `The cost of hiring a branding agency in Calicut depends on the scope of the project and the services required. Branding packages can range from affordable rates for startups to more comprehensive solutions for established businesses. It’s best to consult with the agency to get a customized quote based on your specific needs.`,
    },
    {
      question: `Can a branding agency in Calicut improve my online presence?`,
      answer: `Yes, a branding agency in Calicut can significantly improve your online presence through digital branding strategies. This includes creating a cohesive online identity across social media, websites, and other digital platforms, as well as optimizing your content and design for better visibility and engagement with your target audience.`,
    },
    {
      question: `What makes a branding agency in Calicut different from others?`,
      answer: `A branding agency in Calicut is uniquely positioned to understand the local culture, market dynamics, and consumer behavior in Kerala. This local expertise, combined with innovative branding techniques, makes these agencies highly effective in creating brands that resonate deeply with the regional audience.`,
    },
    {
      question: `What makes Do Studio different from other branding agencies in Calicut?`,
      answer: `Do Studio stands out by offering a unique blend of local expertise and innovative branding techniques. Our deep understanding of the local culture, market dynamics, and consumer behavior in Kerala allows us to create brands that resonate deeply with the regional audience`,
    },
    {
      question: `How can Do Studio enhance my brand’s visibility online?`,
      answer: `Do Studio specializes in creating a strong online presence for your brand through customized digital marketing strategies, including SEO, social media management, and content creation. We ensure that your brand stands out on search engines, social platforms, and other digital channels, driving more traffic and engagement to your business.`,
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

const brandingData = [
  
  {
    id: 1,
    slug: "adis",
    title: "adis",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/0cff8c2ea7d42f5819deea992fe6ea2d01364ee5-1000x1000.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171397/large_ADIS_FROZEN_BITES_01_1c156a150a_98ed308f21.webp",
        width: 1200,
        height: 800,
        alt: "adis"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171404/large_ADIS_FROZEN_BITES_03_872d2dd941_7493ee808e.webp",
        width: 1200,
        height: 800,
        alt: "adis"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171404/large_ADIS_FROZEN_BITES_02_e588f97a02_4573cb72fe.webp",
        width: 1200,
        height: 800,
        alt: "adis"
      },

    ]
  },
  {
    id: 2,
    slug: "medimode",
    title: "medimode",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/a1a52d0acb048e85ad859eaa69b75714c5cb6522-3508x3508.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1747481990/MEDI_MODE_GREEN_LOGO_OP_01_-01_dokfh5.webp",
        width: 1200,
        height: 800,
        alt: "medimode"
      },

    ]
  },
  {
    id: 3,
    slug: "kebabji",
    title: "Kebabji",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/0d34832c1e94e87d6fab5d5d890d140f0b8e5fa6-500x500.gif"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979585/large_KEBABJI_01_356cd4636c_e863c8a3c4.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979592/large_KEBABJI_03_73f0d427dc_f8568b04b4.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740979593/KEBABJI_04_27b247102f_da4549ce26.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
    ]
  },
  {
    id: 4,
    slug: "add-mind",
    title: "add mind",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/9c2626bad7814d28a402fe769090a71bd2efa918-1000x1000.jpg"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741170849/ADDMIND_p_01_c0797feafa_413fc29623.webp",
        width: 1200,
        height: 800,
        alt: "add mind"
      },

    ]
  },
  {
    id: 5,
    slug: "geogrip",
    title: "Geogrip",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/dff677d91633bccebcd5183ce51ec57c9554b70c-750x750.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740978535/GEOGRIP_01_09ccde30b4_3974a1667e.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1740978536/GEOGRIP_02_55d190d471_819570ad69.webp",
        width: 1200,
        height: 800,
        alt: "geogrip"
      },
    ]
  },
  {
    id: 6,
    slug: "chai-drop",
    title: "chai drop",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/6e676f5cc5ac61ff58f70c62ff355a618b856215-1000x1000.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171137/large_chai_drop_01_83d791a0ff_368700a76c.webp",
        width: 1200,
        height: 800,
        alt: "chai drop"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171137/medium_chai_drop_02_5a79b4260f_9636301c15.webp",
        width: 1200,
        height: 800,
        alt: "chai drop"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741171137/small_chai_drop_03_7b0ec6a5b9_e44d3f2fa7.webp",
        width: 1200,
        height: 800,
        alt: "chai drop"
      },

    ]
  },
  {
    id: 7,
    slug: "dream-of-us",
    title: "Dream of us",
    coverimage: {
      url: "https://cdn.sanity.io/images/0hjyj1bs/production/eca8aa5a4352bfde7cb38f041c274b4ca2c55c7e-4500x4500.webp"
    },
    innerImages: [
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173593/large_DOU_01_01_e811abdcd3_209a028624.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173777/large_DOU_04_5ac00ead1a_c345ac9036.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173777/DOU_03_86d422a7ff_50ec1c72ac.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },
      {
        url: "https://res.cloudinary.com/djswkzoth/image/upload/v1741173777/large_DOU_02_3dcd939588_82b11c4a79.webp",
        width: 1200,
        height: 800,
        alt: "Dream of us"
      },

    ]
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
    document.title = "Branding Agency In Calicut, Kerala | Branding Services in Calicut";

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.");
    } else {
      const newMetaDescription = document.createElement("meta");
      newMetaDescription.setAttribute("name", "description");
      newMetaDescription.setAttribute("content", "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.");
      document.head.appendChild(newMetaDescription);
    }

    // Set meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.setAttribute("content", "Branding agency in calicut, Advertising agency in Calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital agency in calicut, best social media marketing agency in calicut");
    } else {
      const newMetaKeywords = document.createElement("meta");
      newMetaKeywords.setAttribute("name", "keywords");
      newMetaKeywords.setAttribute("content", "Branding agency in calicut, Advertising agency in Calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital agency in calicut, best social media marketing agency in calicut");
      document.head.appendChild(newMetaKeywords);
    }

    // Set Open Graph meta tags
    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute("content", "Branding Agency In Calicut, Kerala | Branding Services in Calicut");
    } else {
      const newOgTitle = document.createElement("meta");
      newOgTitle.setAttribute("property", "og:title");
      newOgTitle.setAttribute("content", "Branding Agency In Calicut, Kerala | Branding Services in Calicut");
      document.head.appendChild(newOgTitle);
    }

    let ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) {
      ogDescription.setAttribute("content", "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.");
    } else {
      const newOgDescription = document.createElement("meta");
      newOgDescription.setAttribute("property", "og:description");
      newOgDescription.setAttribute("content", "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.");
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
      twitterTitle.setAttribute("content", "Branding Agency In Calicut, Kerala | Branding Services in Calicut");
    } else {
      const newTwitterTitle = document.createElement("meta");
      newTwitterTitle.setAttribute("name", "twitter:title");
      newTwitterTitle.setAttribute("content", "Branding Agency In Calicut, Kerala | Branding Services in Calicut");
      document.head.appendChild(newTwitterTitle);
    }

    let twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription) {
      twitterDescription.setAttribute("content", "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.");
    } else {
      const newTwitterDescription = document.createElement("meta");
      newTwitterDescription.setAttribute("name", "twitter:description");
      newTwitterDescription.setAttribute("content", "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.");
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
            className="object-cover object-bottom"
            placeholder="blur"
            fill
            src={serbra1}
            alt="Branding agency in Calicut"
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5 gap-y-3">
          <h1 className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black uppercase">
            Branding Agency
            <br /> In Calicut
          </h1>
          <p className="md:basis-1/2 xl:basis-2/5 text-justify tracking-tighter">
            Do Studio has built an outstanding track record as one of Best{" "}
            <a className="font-semibold" href="#" target="_blank">
              Branding Agency in Calicut
            </a>{" "}
            Since 2018. Our skilled staff members can enhance your brand's
            online visibility and help you stand out.
          </p>
        </div>

        <Link
          href={"/contact"}
          className="bg-primarygreen text-black w-fit mx-auto px-10 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
        >
          Contact now
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 xl:gap-10 xl:px-40">
          {brandingData && brandingData.length > 0 ? (
            brandingData.slice(0, 4).map((data) => (
              <Link
                className="space-y-2"
                href={`/our-works/branding/${data.slug}`}
                key={data.id}
              >
                <FadeUp duration={0.5} delay={0.5}>
                  <div className="relative group">
                    <div className="relative aspect-square">
                      <Image
                        loading="lazy"
                        src={data.coverimage.url}
                        fill={true}
                        className="object-cover"
                        alt="wrk1"
                      />
                    </div>
                  </div>
                </FadeUp>
              </Link>
            ))
          ) : (
            <div className="text-left text-2xl font-medium animate-bounce">
              No data found.
            </div>
          )}
        </div>
        <Link
          href={"/our-works/branding"}
          className="bg-primarygreen mx-auto text-black w-fit px-20 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
        >
          See more
        </Link>

        <div className="flex flex-col-reverse md:flex-row gap-5 gap-y-3">
          <p className="md:basis-1/2 xl:basis-2/5 text-justify tracking-tighter">
            {" "}
            Do Studio is an{" "}
            <a className="font-semibold" href="#" target="_blank">
              Branding agency in calicut
            </a>{" "}
            dedicated to crafting outstanding identities for brands and user
            experiences. Our clients have been able to improve their brand
            image, reach a wider audience, and draw in more business thanks to
            our skillful design methods. Few organizations in the area are able
            to make this claim about the caliber of their offerings. As a result
            we are known as the{" "}
            <a className="font-semibold" href="#">
              Best branding agency in Calicut
            </a>
            .
          </p>
          <h2 className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black xl:text-right uppercase">
            Get to Know Us. Branding Agency In Calicut
          </h2>
        </div>
        <div>
          <div className="relative w-full  h-48 md:h-80 xl:h-[500px] overflow-hidden">
            <Image
              className="object-cover object-center"
              placeholder="blur"
              fill
              src={serbra2}
              alt="Best Branding agency in Calicut"
            />
          </div>
          <h3 className="text-center  text-3xl xl:text-6xl my-10 xl:my-20  font-black uppercase">
            The Method Behind Our Work
          </h3>
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

        <div className="flex flex-col md:flex-row gap-5 gap-y-3">
          <h4
            className="md:basis-1/2 xl:basis-3/5 text-3xl xl:text-6xl font-black uppercase"
            href="#"
          >
            Best Digital Marketing Agency in Calicut, Kerala
          </h4>
          <div className="md:basis-1/2 xl:basis-2/5 flex flex-col gap-3">
            <p className="text-2xl font-semibold">
              Driving Business Growth with Innovative Digital Marketing
            </p>
            <p className=" text-justify tracking-tighter">
              We drive business growth with innovative digital marketing
              solutions designed to elevate your brand. As a leading{" "}
              <a className="font-semibold" href="#" target="_blank">
                digital marketing agency in Calicut
              </a>
              , we specialize in crafting creative strategies that not only
              capture attention but also convert it into measurable results. Our
              comprehensive digital marketing services include SEO, social media
              marketing, content creation, and paid advertising, all tailored to
              meet the unique needs of your business.
            </p>
            <Link
              href={"/services/digital-marketing-agency-in-calicut"}
              className="bg-primarygreen text-black w-fit px-10 h-14 rounded-full shadow-2xl hover:shadow-xl duration-200 font-semibold uppercase grid place-items-center"
            >
              Know more
            </Link>
          </div>
        </div>
        <div>
          <h5 className="text-4xl xl:text-6xl font-black pb-5">FAQs</h5>
          <FaqMain />
        </div>
      </section>
    </>
  );
};

export default Page;
