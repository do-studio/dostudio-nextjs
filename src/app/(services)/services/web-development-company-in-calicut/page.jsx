import React from "react";
import BrandingPage from "./brandingPage";
import Head from "next/head";

export const metadata = {
    title: "Web Development Company In Calicut, Kerala | Do Studio",
    description:
        "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.",
    keywords:
        "web development company in calicut, website development company in calicut, shopify development agency in calicut",
    alternates: {
        canonical: "https://dostudio.co.in/services/web-development-company-in-calicut",
    },
    openGraph: {
        title: "Web Development Company In Calicut, Kerala | Do Studio",
        description:
            "We are your go-to web development company in Calicut. We offer custom web design, WordPress development, e-commerce solutions more.",
        url: "https://dostudio.co.in/services/web-development-company-in-calicut",
    },
};

export default function Page() {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://dostudio.co.in/services/web-development-company-in-calicut"
                />
            </Head>

            <BrandingPage />
        </>
    );
}
