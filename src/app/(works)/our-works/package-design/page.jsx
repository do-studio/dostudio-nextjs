import React from "react";
import Head from "next/head";
import PackageDesignPage from "./PackageDesignPage";

export const metadata = {
    title: "Package Designing Company in Calicut, Kerala",
    description:
        "Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales.",
    alternates: {
        canonical: "https://dostudio.co.in/our-works/package-design",
    },
    openGraph: {
        title: "Package Designing Company in Calicut, Kerala",
        description:
            "Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales.",
        url: "https://dostudio.co.in/our-works/package-design",
    },
};

export default function Page() {
    return (
        <>
            <Head>
                <link
                    rel="canonical"
                    href="https://dostudio.co.in/our-works/package-design"
                />
            </Head>
            

            <PackageDesignPage />
        </>
    );
}
