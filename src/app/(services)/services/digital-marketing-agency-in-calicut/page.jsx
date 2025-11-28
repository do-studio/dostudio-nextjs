import React from "react";
import Head from "next/head";
import DigitalMarketingPage from "./DigitalMarketingPage";

export const metadata = {
    title: "Digital Marketing Agency in Calicut, Kerala | Do Studio",
    description:
        "Experience best digital marketing services in Calicut with Do Studio. Our team excels in SEO, social media marketing, PPC, and more.",
    keywords:
        "Digital Marketing Agency in Calicut, Digital marketing services in Calicut, marketing agency in calicut, best marketing agency in calicut, digital marketing agency in kozhikode, best digital marketing agency in calicut, digital marketing companies in calicut, best social media marketing agency in calicut, socialmedia agency in kozhikode",
    alternates: {
        canonical: "https://dostudio.co.in/services/digital-marketing-agency-in-calicut",
    },
    openGraph: {
        title: "Branding Agency In Calicut, Kerala | Branding Services in Calicut",
        description:
            "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.",
        url: "https://dostudio.co.in/services/digital-marketing-agency-in-calicut",
    },
};

export default function Page() {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://dostudio.co.in/services/digital-marketing-agency-in-calicut"
                />
            </Head>

            <DigitalMarketingPage />
        </>
    );
}
