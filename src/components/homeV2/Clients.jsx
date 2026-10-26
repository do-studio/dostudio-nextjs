import SectionPill from "./SectionPill";
import ClientsGrid from "./ClientsGrid";
import { client } from "../../../utils/sanity";

const QUERY = `*[_type == "client"] | order(orderRank){
  _id,
  title,
  image { alt, asset->{ url } }
}`;

async function getClients() {
  try {
    const data = await client.fetch(QUERY);
    return (data || []).filter((c) => c.image?.asset?.url);
  } catch (err) {
    console.error("Error fetching client logos:", err);
    return [];
  }
}

export default async function Clients() {
  const logos = await getClients();
  if (logos.length === 0) return null;

  return (
    <section className="mx-auto w-[89.5%] max-w-[1718px] pt-[clamp(4rem,5.31vw,6.375rem)]">
      <SectionPill>Our Clients</SectionPill>
      <ClientsGrid logos={logos} />
    </section>
  );
}
