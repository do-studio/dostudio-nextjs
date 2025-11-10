"use client";
import React from "react";
import HeroSocialMedia from "../../components/bangalorePage/HeroSocialMedia";
import SocialMediaServices from "../../components/bangalorePage/SocialMediaServices";
import WhyChooseSocialMedia from "../../components/bangalorePage/WhyChooseSocialMedia";
import BoostsBrandSocialMedia from "../../components/bangalorePage/BoostsBrandSocialMedia";
import Faq from "../../components/bangalorePage/Faq";
import GetsStartedSocialMedia from "../../components/bangalorePage/GetStartedSocialMedia";
import { data } from "../../datas/bangalorePageData";
import { useParams } from "next/navigation";

const page = () => {
  const { slug } = useParams();


  // find the matching section dynamically
  const selectedService = Object.values(data).find(
    (service) => service.slug === slug
  );

  if (!selectedService) {
    return (
      <div className="flex items-center justify-center min-h-screen text-2xl font-bold text-gray-700">
        Page not found
      </div>
    );
  }


  const { hero, services, whyChoose, boostUrBrand, faqs, letsStarted } =
    selectedService;

  console.log("Data", letsStarted);



  return (
    <main className="bg-white w-full flex flex-col" >
      <HeroSocialMedia {...hero} />
      <SocialMediaServices services={services} />
      <WhyChooseSocialMedia {...whyChoose} />
      <BoostsBrandSocialMedia {...boostUrBrand} />
      <Faq faqs={faqs} />
      <GetsStartedSocialMedia {...letsStarted} />
    </main >
  );
};

export default page;
