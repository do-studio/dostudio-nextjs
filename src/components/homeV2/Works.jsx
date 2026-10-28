import WorksCollage from "./WorksCollage";
import { client } from "../../../utils/sanity";

const PUBLISHED = `!(_id in path("drafts.**"))`;

// Centre tile: the Do Studio showreel (the same video and thumbnail the previous home page used). It isn't attached
// to a Sanity item, so it's used directly instead of being looked up.
const SHOWREEL = {
  video: "https://cdn.sanity.io/files/0hjyj1bs/production/53b0df08ef0a7647496fe7f01b59418478c8a606.mp4",
  poster: "https://cdn.sanity.io/images/0hjyj1bs/production/2b55c42f3a2cfc2816c7dd83d79099da3959c07a-2920x1634.webp",
  title: "Do Studio showreel",
};

// Tiles pinned to a specific Sanity file. To swap one, paste the new asset URL here (it must belong to a document of the
// same type in Sanity, since that's where the title and video thumbnail come from).
const PINNED = {
  tallLeftVideo: "https://cdn.sanity.io/files/0hjyj1bs/production/7ade3b3c8a19991e1dcc2402e345d5aa76dfd725.mp4", // Motion · tall left
  posterTall: "https://cdn.sanity.io/images/0hjyj1bs/production/01f7b7863c66398fec9307136450ed91cbfbeb4e-1080x1350.jpg", // Poster 4:5 · under it
  posterStory: "https://cdn.sanity.io/images/0hjyj1bs/production/e6f2044b8f679196d9cbfe2824c50abb508ff1c2-899x1600.jpg", // Poster 9:16 · tall right
  package: "https://cdn.sanity.io/images/0hjyj1bs/production/28e465edec5a4232ad8c67f5f6f453e48ded6ec1-3000x3000.webp", // Package design · small right
  branding: "https://cdn.sanity.io/images/0hjyj1bs/production/f7e1d881cfbeb5d00cae7491977bdba012836bc1-1000x1000.png", // Branding thumbnail · top row
  website: "https://exxude.in/", // Web design (matched by the site's live link) · yellow tile
  wideVideo: "https://cdn.sanity.io/files/0hjyj1bs/production/a3f3d40af18d7bd86370eb7c0af05001f0f17447.mp4", // Motion · wide bottom
  print: "https://cdn.sanity.io/images/0hjyj1bs/production/58cb2cf225ca6575076dcf3060291d359be5b84f-3840x2560.webp", // Print design
};

// One query, one piece of work per collage slot. Pinned slots look their item up by URL; the others take the
// first item of their type, so reordering those lists in Sanity changes them.
const QUERY = `{
  "tallLeftVideo": *[_type == "motion" && video.asset->url == $tallLeftVideo && ${PUBLISHED}][0]{
    title, "poster": image.asset->url, "video": video.asset->url
  },
  "posterTall": *[_type == "poster" && image.asset->url == $posterTall && ${PUBLISHED}][0]{
    title, "image": image.asset->url, "alt": image.alt
  },
  "posterStory": *[_type == "poster" && image.asset->url == $posterStory && ${PUBLISHED}][0]{
    title, "image": image.asset->url, "alt": image.alt
  },
  "branding": *[_type == "branding" && thumbnail.asset->url == $branding && defined(slug.current) && ${PUBLISHED}][0]{
    title, "slug": slug.current, "image": thumbnail.asset->url
  },
  "pack": *[_type == "packageDesign" && image.asset->url == $package && ${PUBLISHED}][0]{
    altText, "image": image.asset->url
  },
  "wideVideo": *[_type == "motion" && video.asset->url == $wideVideo && ${PUBLISHED}][0]{
    title, "poster": image.asset->url, "video": video.asset->url
  },
  "web": *[_type == "webDesign" && link == $website && ${PUBLISHED}][0]{
    title, alt, "image": image.asset->url
  },
  "print": *[_type == "printDesign" && $print in images[].asset->url && ${PUBLISHED}][0]{
    title, "image": images[asset->url == $print][0].asset->url
  }
}`;

async function getWorks() {
  try {
    return await client.fetch(QUERY, PINNED);
  } catch (err) {
    console.error("Error fetching works for the collage:", err);
    return {};
  }
}

const clean = (s) => (s || "").trim();

export default async function Works() {
  const w = await getWorks();

  // Slot order matches the collage layout in WorksCollage. `fallback` is used if Sanity has nothing for a slot.
  const media = [
    w.tallLeftVideo?.video && {
      kind: "video", src: w.tallLeftVideo.video, poster: w.tallLeftVideo.poster, title: clean(w.tallLeftVideo.title),
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
    {
      kind: "video", src: SHOWREEL.video, poster: SHOWREEL.poster, title: SHOWREEL.title,
      category: "Production", href: "/our-works/production",
    },
    w.posterStory?.image && {
      kind: "image", src: w.posterStory.image, title: clean(w.posterStory.alt || w.posterStory.title),
      category: "Creative Posters", href: "/our-works/creative-posters",
    },
    w.pack?.image && {
      kind: "image", src: w.pack.image, title: clean(w.pack.altText) || "Package design",
      category: "Package Design", href: "/our-works/package-design",
    },
    w.wideVideo?.video && {
      kind: "video", src: w.wideVideo.video, poster: w.wideVideo.poster, title: clean(w.wideVideo.title),
      category: "Motion Creatives", href: "/our-works/motion-creatives",
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
