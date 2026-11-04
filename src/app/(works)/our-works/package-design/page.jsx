import localFont from "next/font/local";
import PackageBoxes from "../../../../components/packaging/PackageBoxes";
import { getPackageDesigns } from "../../../../datas/packageDesigns";

const grotesk = localFont({
  src: [
    { path: "../../../../fonts/random-grotesque/RG-StandardBook.ttf", weight: "400", style: "normal" },
    { path: "../../../../fonts/random-grotesque/RG-StandardMedium.ttf", weight: "500", style: "normal" },
    { path: "../../../../fonts/random-grotesque/RG-StandardSemibold.ttf", weight: "600", style: "normal" },
    { path: "../../../../fonts/random-grotesque/RG-StandardBold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Package designs come from Sanity; re-check hourly so new ones show up without a redeploy.
export const revalidate = 3600;

const TITLE = "Package Designing Company in Calicut, Kerala";
const DESCRIPTION =
  "Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://dostudio.co.in/our-works/package-design", type: "website" },
  alternates: { canonical: "https://dostudio.co.in/our-works/package-design" },
};

export default async function PackageDesignPage() {
  const designs = await getPackageDesigns();
  return (
    <main className={`${grotesk.className} relative min-h-screen bg-[#f3f0e8] text-[#1c1c1e]`}>
      <PackageBoxes designs={designs} />
    </main>
  );
}
