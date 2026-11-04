import localFont from "next/font/local";
import PackageHolo from "../../components/packaging/PackageHolo";
import { getPackageDesigns } from "../../datas/packageDesigns";

const grotesk = localFont({
  src: [
    { path: "../../fonts/random-grotesque/RG-StandardBook.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/random-grotesque/RG-StandardMedium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/random-grotesque/RG-StandardSemibold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/random-grotesque/RG-StandardBold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Package designs come from Sanity; re-check hourly so new ones show up without a redeploy.
export const revalidate = 3600;

const TITLE = "Package Designing Company in Calicut, Kerala";
const DESCRIPTION =
  "Our Package designing company in Calicut offers creative and effective packaging solutions to enhance your brand and drive sales.";

// Option 3 of the new package design pages (see also /package-design and /package-design-2). A preview, so search engines skip it.
export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  robots: { index: false, follow: false },
};

export default async function PackageDesignOption3() {
  const designs = await getPackageDesigns();
  return (
    <main className={`${grotesk.className} fixed inset-0 z-30 overflow-hidden bg-[#04040a] text-white`}>
      <PackageHolo designs={designs} />
    </main>
  );
}
