import WorksCollage from "./WorksCollage";
import { client } from "../../../utils/sanity";

const PUBLISHED = `!(_id in path("drafts.**"))`;
// Videos over 15MB are skipped so the collage stays light (some production films are 280MB+).
const MAX_VIDEO_BYTES = 15000000;

// One query, one piece of work per collage slot, picked by type and shape so CMS changes flow through.
const QUERY = `{
  "vertical": *[_type == "motion" && ratio == "9/16" && video.asset->size < ${MAX_VIDEO_BYTES} && ${PUBLISHED}] | order(orderRank)[0]{
    title, "poster": image.asset->url, "video": video.asset->url
  },
  "posterTall": *[_type == "poster" && ratio == "4/5" && ${PUBLISHED}] | order(orderRank)[0]{
    title, "image": image.asset->url, "alt": image.alt
  },
  "posterStory": *[_type == "poster" && ratio == "9/16" && ${PUBLISHED}] | order(orderRank)[0]{
    title, "image": image.asset->url, "alt": image.alt
  },
  "branding": *[_type == "branding" && defined(slug.current) && ${PUBLISHED}] | order(orderRank)[0]{
    title, "slug": slug.current, "image": thumbnail.asset->url
  },
  "films": *[_type == "production" && ratio == "16/9" && video.asset->size < ${MAX_VIDEO_BYTES} && ${PUBLISHED}] | order(orderRank)[0...2]{
    title, altText, "poster": thumbnail.asset->url, "video": video.asset->url
  },
  "pack": *[_type == "packageDesign" && ${PUBLISHED}] | order(orderRank)[0]{
    altText, "image": image.asset->url
  },
  "web": *[_type == "webDesign" && ${PUBLISHED}] | order(orderRank)[0]{
    title, alt, "image": image.asset->url
  },
  "print": *[_type == "printDesign" && defined(images[0].asset) && ${PUBLISHED}] | order(orderRank)[0]{
    title, "image": images[0].asset->url
  }
}`;

async function getWorks() {
  try {
    return await client.fetch(QUERY);
  } catch (err) {
    console.error("Error fetching works for the collage:", err);
    return {};
  }
}

const clean = (s) => (s || "").trim();

export default async function Works() {
  const w = await getWorks();
  const [film1, film2] = w.films || [];

  // Slot order matches the collage layout in WorksCollage. `fallback` is used if Sanity has nothing for a slot.
  const media = [
    w.vertical?.video && {
      kind: "video", src: w.vertical.video, poster: w.vertical.poster, title: clean(w.vertical.title),
      category: "Motion Creatives", href: "/our-works/motion-creatives",
    },
    w.posterTall?.image && {
      kind: "image", src: w.posterTall.image, title: clean(w.posterTall.alt || w.posterTall.title),
      category: "Creative Posters", href: "/our-works/creative-posters",
    },
    w.branding?.image && {
      kind: "image", src: w.branding.image, title: clean(w.branding.title),
      category: "Branding", href: `/our-works/branding/${w.branding.slug}`,
    },
    film1?.video && {
      kind: "video", src: film1.video, poster: film1.poster, title: clean(film1.altText || film1.title),
      category: "Production", href: "/our-works/production",
    },
    w.posterStory?.image && {
      kind: "image", src: w.posterStory.image, title: clean(w.posterStory.alt || w.posterStory.title),
      category: "Creative Posters", href: "/our-works/creative-posters",
    },
    w.pack?.image && {
      kind: "image", src: w.pack.image, title: "Package design",
      category: "Package Design", href: "/our-works/package-design",
    },
    film2?.video && {
      kind: "video", src: film2.video, poster: film2.poster, title: clean(film2.altText || film2.title),
      category: "Production", href: "/our-works/production",
    },
    // Full-page website screenshot; the tile scrolls down it on hover.
    w.web?.image && {
      kind: "website", src: w.web.image, title: clean(w.web.title || w.web.alt),
      category: "Web Design", href: "/our-works/web-design",
    },
    w.print?.image && {
      kind: "image", src: w.print.image, title: clean(w.print.title),
      category: "Print Design", href: "/our-works/print-design",
    },
  ];

  return <WorksCollage media={media} />;
}
