import React, { useState } from "react";
import { FiPlus } from "react-icons/fi";
const LandFAQ = [
  {
    question: "What digital marketing services do you offer in Calicut?",
    answer: "We offer a wide range of digital marketing services in Calicut, including Search Engine Optimization (SEO) to improve your website’s ranking on Google, Social Media Marketing to boost your presence on platforms like Facebook, Instagram, and LinkedIn, Pay-Per-Click (PPC) Advertising to run targeted ads on Google and social media, Content Marketing to create engaging content that attracts and retains customers, and Website Design & Development to build or improve your website to convert visitors into customers.",
  },
  {
    question: "Why should I choose your digital marketing agency in Calicut?",
    answer: "We are a top digital marketing agency in Calicut with years of experience. We know the local market well and create custom strategies that help businesses like yours succeed online. Our goal is to drive more traffic to your website and increase your sales, making us one of the best digital marketing agencies in Calicut.",
  },
  {
    question: "How do I know if your digital marketing services are right for my business in Calicut?",
    answer: "We are the best digital marketing agency in Calicut because we take the time to understand your business goals. We create a personalized digital marketing strategy that works specifically for your needs. Our proven success in helping businesses in Calicut ensures we can help you get the best results.",
  },
  {
    question: "What makes your digital marketing agency in Calicut different from others?",
    answer: "Our digital marketing agency in Calicut stands out because we are results-driven and fully dedicated to your success. We focus on understanding your unique business needs and create customized strategies that deliver real results. Our personal attention and deep local knowledge make us one of the best digital marketing agencies in Calicut.",
  },
  {
    question: "How long will it take to see results from digital marketing in Calicut?",
    answer: "The time it takes to see results from digital marketing services in Calicut can vary. SEO usually takes 3-6 months for noticeable improvements. For PPC ads and social media marketing, you may see results within weeks. We focus on long-term success but also aim to deliver quick wins for your business.",
  },
];

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="">
      <div
        className={`flex gap-x-10  ${isOpen ? "bg-white" : "bg-white"
          } rounded-md md:gap-x-0  justify-between items-center  pl-0 p-4 cursor-pointer transition duration-300 ease-in-out `}
        onClick={toggleOpen}
      >
        <div className=" text-sm md:text-base pl-5">{question}</div>
        <div
          className={`transform transition-transform ${isOpen ? "rotate-45" : "rotate-0"
            }`}
        >
          <FiPlus />
        </div>
      </div>
      <div
        className={`bg-white px-5 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
      >
        <p className="p-4 pl-0 text-sm font-PoppinsRegular">{answer}</p>
      </div>
    </div>
  );
};
const Faq = () => {
  return (
    <>
      <section className="w-11/12 xl:w-10/12 mx-auto grid grid-cols-1 md:grid-cols-2 pb-20 pt-20 gap-y-5">
        <div className="h-full flex flex-col justify-center space-y-3">
          <h5 className="text-5xl xl:text-7xl font-black uppercase text-center xl:text-left">
            Frequently asked <span className="text-visaclr">questions?</span>
          </h5>


        </div>
        <div className="">
          {LandFAQ.map((dt, i) => (
            <FAQItem key={i} question={dt.question} answer={dt.answer} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Faq;