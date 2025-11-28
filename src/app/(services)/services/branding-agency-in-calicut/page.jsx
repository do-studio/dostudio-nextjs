import React from "react";
import BrandingPage from "./brandingPage";
import Head from "next/head";

export const metadata = {
    title: "Branding Agency In Calicut, Kerala | Branding Services in Calicut",
    description:
        "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.",
    keywords:
        "Branding agency in calicut, Advertising agency in Calicut, Agency in Calicut, Best Advertising agency in Calicut, best branding agency in calicut, creative agency in calicut, branding services in calicut, best branding company in calicut, digital agency in calicut, best social media marketing agency in calicut",
    alternates: {
        canonical: "https://dostudio.co.in/services/branding-agency-in-calicut",
    },
    openGraph: {
        title: "Branding Agency In Calicut, Kerala | Branding Services in Calicut",
        description:
            "Do Studio is a leading Branding Agency in Calicut offering best branding services, including logo design, brand strategy & visual identity creation.",
        url: "https://dostudio.co.in/services/branding-agency-in-calicut",
    },
};

export default function Page() {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://dostudio.co.in/services/branding-agency-in-calicut"
                />
            </Head>

            <BrandingPage />
        </>
    );
}
