import localFont from "next/font/local";
import BrandingIndex from "../../../../components/branding/BrandingIndex";
import { client } from "../../../../../utils/sanity";

const grotesk = localFont({
  src: [
    { path: "../../../../fonts/random-grotesque/RG-StandardBook.ttf", weight: "400", style: "normal" },
    { path: "../../../../fonts/random-grotesque/RG-StandardMedium.ttf", weight: "500", style: "normal" },
    { path: "../../../../fonts/random-grotesque/RG-StandardSemibold.ttf", weight: "600", style: "normal" },
    { path: "../../../../fonts/random-grotesque/RG-StandardBold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Branding projects come from Sanity; re-check hourly so new ones show up without a redeploy.
export const revalidate = 3600;

const TITLE = "Branding Company in Calicut | Brand Identity Design Services";
const DESCRIPTION =
  "Discover how Do Studio can transform your brand. Our team delivers best branding solutions, including logo design, brand strategy.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://dostudio.co.in/our-works/branding", type: "website" },
  alternates: { canonical: "https://dostudio.co.in/our-works/branding" },
};

const QUERY = `*[_type == "branding" && !(_id in path("drafts.**")) && defined(slug.current) && defined(thumbnail.asset)] | order(orderRank){
  _id,
  title,
  altText,
  "slug": slug.current,
  "thumb": thumbnail.asset->url,
  "inner": innerImages[0...4].asset->url
}`;

async function getBrands() {
  try {
    return await client.fetch(QUERY);
  } catch (err) {
    console.error("Error fetching branding projects:", err);
    return [];
  }
}

export default async function BrandingPage() {
  const brands = await getBrands();
  return (
    <main className={`${grotesk.className} relative min-h-screen bg-[#0c0c0c] text-white`}>
      <BrandingIndex brands={brands} />
    </main>
  );
}
