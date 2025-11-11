import React from "react";
import HeroSocialMedia from "../../components/bangalorePage/HeroSocialMedia";
import SocialMediaServices from "../../components/bangalorePage/SocialMediaServices";
import WhyChooseSocialMedia from "../../components/bangalorePage/WhyChooseSocialMedia";
import BoostsBrandSocialMedia from "../../components/bangalorePage/BoostsBrandSocialMedia";
import Faq from "../../components/bangalorePage/Faq";
import GetsStartedSocialMedia from "../../components/bangalorePage/GetStartedSocialMedia";
import { data } from "../../datas/bangalorePageData";

// ✅ Generate dynamic metadata for SEO
export async function generateMetadata({ params }) {
  const { slug } = params;

  const selectedService = Object.values(data).find(
    (service) => service.slug === slug
  );

  if (!selectedService) {
    return {
      title: "Page Not Found | Do Studio",
      description: "The requested page could not be found.",
      robots: "noindex, nofollow",
    };
  }


  return {
    title: selectedService?.metaTitle ,
    description:
      selectedService?.metaDescription,
    alternates: {
      canonical: `https://dostudio.in/${slug}`,
    },
    openGraph: {
      title: selectedService?.metaTitle,
      description: selectedService?.metaDescription,
      url: `https://dostudio.in/${slug}`,
      type: "website",
    },
  };
}

// ✅ Server component
const Page = async ({ params }) => {
  const { slug } = params;

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

  return (
    <main className="bg-white w-full flex flex-col">
      <HeroSocialMedia {...hero} />
      <SocialMediaServices services={services} />
      <WhyChooseSocialMedia {...whyChoose} />
      <BoostsBrandSocialMedia {...boostUrBrand} />
      <Faq faqs={faqs} />
      <GetsStartedSocialMedia {...letsStarted} />
    </main>
  );
};

export default Page;

// ✅ Pre-generate static paths (for SSG or ISR)
export async function generateStaticParams() {
  return Object.values(data).map((service) => ({
    slug: service.slug,
  }));
}
