// Server-only: loads the package designs from Sanity for the package design pages.
import sharp from "sharp";
import { client } from "../../utils/sanity";

const QUERY = `*[_type == "packageDesign" && !(_id in path("drafts.**")) && defined(image.asset)] | order(orderRank){
  _id,
  altText,
  "url": image.asset->url,
  "width": image.asset->metadata.dimensions.width,
  "height": image.asset->metadata.dimensions.height,
  "palette": image.asset->metadata.palette.dominant.background
}`;

// The colour around the edges of the picture (most are a product on a plain backdrop). Pages paint the sides of boxes or
// the backdrop behind a pack in it, so a design blends into its surroundings. Worked out from a tiny copy of the image
// when the page is built (and again hourly), never in the visitor's browser.
async function edgeColor(url) {
  try {
    const res = await fetch(`${url}?w=32&h=32&fit=crop&fm=png`, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    const { data, info } = await sharp(Buffer.from(await res.arrayBuffer()))
      .removeAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });
    let r = 0, g = 0, b = 0, n = 0;
    for (let y = 0; y < info.height; y++) {
      for (let x = 0; x < info.width; x++) {
        if (x > 1 && x < info.width - 2 && y > 1 && y < info.height - 2) continue; // the outer two pixels only
        const i = (y * info.width + x) * info.channels;
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
        n++;
      }
    }
    return `rgb(${Math.round(r / n)}, ${Math.round(g / n)}, ${Math.round(b / n)})`;
  } catch {
    return null;
  }
}

export async function getPackageDesigns() {
  try {
    const designs = await client.fetch(QUERY);
    return await Promise.all(designs.map(async (d) => ({ ...d, color: (await edgeColor(d.url)) || d.palette })));
  } catch (err) {
    console.error("Error fetching package designs:", err);
    return [];
  }
}
