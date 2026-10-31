import localFont from "next/font/local";
import VideoWall from "../../../../components/videos/VideoWall";
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

// Videos come from Sanity; re-check hourly so new ones show up without a redeploy.
export const revalidate = 3600;

const TITLE = "Production Videos | Do Studio";
const DESCRIPTION =
  "Do Studio is a leading creative agency in Calicut offering creative services, branding, web design, graphic design, and more.";

export const metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: { title: TITLE, description: DESCRIPTION, url: "https://dostudio.co.in/our-works/production", type: "website" },
  alternates: { canonical: "https://dostudio.co.in/our-works/production" },
};

const QUERY = `*[_type == "production" && !(_id in path("drafts.**")) && defined(video.asset) && defined(thumbnail.asset)] | order(orderRank){
  _id,
  title,
  altText,
  ratio,
  "thumb": thumbnail.asset->url,
  "src": video.asset->url
}`;

async function getVideos() {
  try {
    return await client.fetch(QUERY);
  } catch (err) {
    console.error("Error fetching production videos:", err);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getVideos();
  return (
    <main className={`${grotesk.className} fixed inset-0 z-30 overflow-hidden bg-black text-white`}>
      <VideoWall videos={videos} />
    </main>
  );
}
