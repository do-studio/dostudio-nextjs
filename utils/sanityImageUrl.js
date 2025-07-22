import imageUrlBuilder from '@sanity/image-url';
import { client } from './sanity'; // Update path to your Sanity client

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source).auto('format').fit('max');
}
