"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { EASE_OUT, Reveal } from "./motion";

const FAQS = [
  {
    q: "What digital marketing services do you offer in Calicut?",
    a: "We offer SEO, social media marketing, PPC and Google Ads management, content marketing and website development. Beyond marketing, our in-house team handles branding, package design, print design and photo and video production, so your campaigns, creatives and website stay consistent.",
  },
  {
    q: "Why should I choose your digital marketing agency in Calicut?",
    a: "We are a top digital marketing agency in Calicut with years of experience. We know the local market well and create custom strategies that help businesses like yours succeed online. Our goal is to drive more traffic to your website and increase your sales, making us one of the best digital marketing agencies in Calicut.",
  },
  {
    q: "How do I know if your digital marketing services are right for my business in Calicut?",
    a: "We are the best digital marketing agency in Calicut because we take the time to understand your business goals. We create a personalized digital marketing strategy that works specifically for your needs. Our proven success in helping businesses in Calicut ensures we can help you get the best results.",
  },
  {
    q: "What makes your digital marketing agency in Calicut different from others?",
    a: "Our digital marketing agency in Calicut stands out because we are results-driven and fully dedicated to your success. We focus on understanding your unique business needs and create customized strategies that deliver real results. Our personal attention and deep local knowledge make us one of the best digital marketing agencies in Calicut.",
  },
  {
    q: "How long will it take to see results from digital marketing in Calicut?",
    a: "The time it takes to see results from digital marketing services in Calicut can vary. SEO usually takes 3-6 months for noticeable improvements. For PPC ads and social media marketing, you may see results within weeks. We focus on long-term success but also aim to deliver quick wins for your business.",
  },
  {
    q: "How much do your digital marketing services cost?",
    a: "Pricing depends on your goals, channels and scope, so we don't use one-size-fits-all rate cards. We offer monthly plans for small businesses and full programmes for larger brands. Share your requirements and we'll send a tailored quote.",
  },
  {
    q: "Which is the best digital marketing agency in Calicut, Kerala?",
    a: "We'd say Do Studio, but judge for yourself. We're a digital marketing agency in Calicut, Kerala offering SEO, SMM, PPC, branding, photoshoots, video production and web design in one team. See our work and client testimonials above, or read our Google reviews.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="mx-auto grid w-[89.5%] max-w-[1718px] grid-cols-1 items-start gap-8 pt-[clamp(4rem,7.03vw,8.44rem)] md:grid-cols-[30.8%_1fr] md:gap-0">
      <Reveal
        as="h2"
        x={-40}
        y={0}
        className="text-[clamp(1.5rem,2.786vw,3.34rem)] font-bold uppercase leading-[1.103] text-[#1c1c1e] md:pt-[clamp(0.5rem,0.73vw,0.875rem)]"
      >
        Frequently
        <br />
        Asked Questions?
      </Reveal>

      <motion.ul
        className="md:max-w-[min(1195px,62.24vw)]"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={{ staggerChildren: 0.08, delayChildren: 0.1 }}
      >
        {FAQS.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.li
              key={item.q}
              variants={{ hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease: EASE_OUT }}
              className="border-b border-transparent [border-image:linear-gradient(to_right,#9b9b9b,#9b9b9b_80%,transparent)_1]"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? -1 : i)}
                aria-expanded={isOpen}
                className={`w-full py-[clamp(0.75rem,0.94vw,1.125rem)] text-left text-[clamp(1rem,1.875vw,2.25rem)] leading-[1.444] transition-[color,transform] duration-300 ${
                  isOpen ? "font-semibold text-[#1c1c1e]" : "font-medium text-[#3e3e3e] hover:translate-x-2 hover:text-[#1c1c1e]"
                }`}
              >
                {item.q}
              </button>
              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <p className="overflow-hidden md:max-w-[min(1100px,57.3vw)] text-[clamp(0.9rem,1.667vw,2rem)] font-medium leading-[1.375] text-[#3e3e3e]">
                  <span className={`block pb-[clamp(1rem,1.25vw,1.5rem)] transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0"}`}>
                    {item.a}
                  </span>
                </p>
              </div>
            </motion.li>
          );
        })}
      </motion.ul>
    </section>
  );
}
