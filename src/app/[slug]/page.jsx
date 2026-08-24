import React from "react";
import HeroSocialMedia from "../../components/bangalorePage/HeroSocialMedia";
import SocialMediaServices from "../../components/bangalorePage/SocialMediaServices";
import WhyChooseSocialMedia from "../../components/bangalorePage/WhyChooseSocialMedia";
import BoostsBrandSocialMedia from "../../components/bangalorePage/BoostsBrandSocialMedia";
import ShowOffSection from "../../components/bangalorePage/ShowOffSection";
import InstagramSection from "../../components/bangalorePage/InstagramSection";
import ReviewsSection from "../../components/bangalorePage/ReviewsSection";
import Faq from "../../components/bangalorePage/Faq";
import GetsStartedSocialMedia from "../../components/bangalorePage/GetStartedSocialMedia";
import { data } from "../../datas/bangalorePageData";
import WorkSection from "../../components/bangalorePage/WorkSection";
import VideoProductionServices from "../../components/bangalorePage/VideoProductionServices";
import SearchStrategySection from "../../components/bangalorePage/SearchStrategySection";
import BlogsSection from "../../components/bangalorePage/BlogsSection";
import HowWeWorkSection from "../../components/bangalorePage/HowWeWorkSection";

// Registry of all sections a bangalore page can render, keyed by name.
// DEFAULT_SECTION_ORDER preserves the historical render order so existing
// pages (which don't set `sectionOrder`) are unaffected. A page's data can
// override the order via `sectionOrder: [...]` to rearrange/omit sections.
const SECTION_REGISTRY = {
  hero: (s) => <HeroSocialMedia key="hero" {...s.hero} />,
  services: (s) => <SocialMediaServices key="services" services={s.services} />,
  showOff: (s) => s.showOff && <ShowOffSection key="showOff" {...s.showOff} />,
  videos: (s) => <VideoProductionServices key="videos" videos={s.videos} />,
  whyChoose: (s) => (
    <WhyChooseSocialMedia key="whyChoose" {...s.whyChoose} altText={s.altText} />
  ),
  howWeWork: (s) => s.howWeWork && <HowWeWorkSection key="howWeWork" {...s.howWeWork} />,
  searchStrategy: (s) =>
    s.searchStrategy && <SearchStrategySection key="searchStrategy" {...s.searchStrategy} />,
  instagramSection: (s) =>
    s.instagramSection && <InstagramSection key="instagramSection" {...s.instagramSection} />,
  boostUrBrand: (s) => <BoostsBrandSocialMedia key="boostUrBrand" {...s.boostUrBrand} />,
  reviewsSection: (s) =>
    s.reviewsSection && <ReviewsSection key="reviewsSection" {...s.reviewsSection} />,
  works: (s) => s.works && <WorkSection key="works" {...s.works} />,
  blogsSection: (s) => s.blogsSection && <BlogsSection key="blogsSection" {...s.blogsSection} />,
  faqs: (s) => <Faq key="faqs" faqs={s.faqs} />,
  letsStarted: (s) => (
    <GetsStartedSocialMedia key="letsStarted" {...s.letsStarted} altText={s.altText} />
  ),
};

const DEFAULT_SECTION_ORDER = [
  "hero",
  "services",
  "showOff",
  "videos",
  "whyChoose",
  "searchStrategy",
  "instagramSection",
  "boostUrBrand",
  "reviewsSection",
  "works",
  "blogsSection",
  "faqs",
  "letsStarted",
];

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
    title: selectedService?.metaTitle,
    description:
      selectedService?.metaDescription,
    alternates: {
      canonical: `https://dostudio.co.in/${slug}`,
    },
    openGraph: {
      title: selectedService?.metaTitle,
      description: selectedService?.metaDescription,
      url: `https://dostudio.co.in/${slug}`,
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

  const order = selectedService.sectionOrder || DEFAULT_SECTION_ORDER;

  return (
    <main className="bg-white w-full flex flex-col">
      {order.map((key) => SECTION_REGISTRY[key]?.(selectedService))}
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
