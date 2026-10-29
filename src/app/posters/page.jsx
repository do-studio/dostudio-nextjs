import localFont from "next/font/local";
import PosterGallery from "../../components/posters/PosterGallery";
import { client } from "../../../utils/sanity";

const grotesk = localFont({
  src: [
    { path: "../../fonts/random-grotesque/RG-StandardBook.ttf", weight: "400", style: "normal" },
    { path: "../../fonts/random-grotesque/RG-StandardMedium.ttf", weight: "500", style: "normal" },
    { path: "../../fonts/random-grotesque/RG-StandardSemibold.ttf", weight: "600", style: "normal" },
    { path: "../../fonts/random-grotesque/RG-StandardBold.ttf", weight: "700", style: "normal" },
  ],
  display: "swap",
});

// Posters come from Sanity; re-check hourly so new ones show up without a redeploy.
export const revalidate = 3600;

const TITLE = "Creative Posters Gallery | Do Studio, Calicut";
const DESCRIPTION =
  "Explore creative poster designs by Do Studio, a creative agency in Calicut. Drag through our gallery of social media posters, festival creatives and ad designs.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://dostudio.co.in/posters", type: "website" },
  alternates: { canonical: "https://dostudio.co.in/posters" },
};

const QUERY = `*[_type == "poster" && !(_id in path("drafts.**")) && defined(image.asset)] | order(orderRank){
  _id,
  title,
  ratio,
  "src": image.asset->url,
  "alt": image.alt
}`;

async function getPosters() {
  try {
    return await client.fetch(QUERY);
  } catch (err) {
    console.error("Error fetching posters:", err);
    return [];
  }
}

export default async function PostersPage() {
  const posters = await getPosters();
  return (
    <main className={`${grotesk.className} fixed inset-0 z-[60] overflow-hidden bg-[#0c0c0c] text-white`}>
      <PosterGallery posters={posters} />
    </main>
  );
}
