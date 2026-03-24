import { MetadataRoute } from 'next'
import { client } from '../../utils/sanity'



const BASE_URL = 'https://dostudio.co.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // ── 1. Static pages ──────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}`, priority: 1.0, changeFrequency: 'yearly' },
    { url: `${BASE_URL}/services`, priority: 0.9, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/blogs`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${BASE_URL}/contact`, priority: 0.8, changeFrequency: 'yearly' },
    // service sub-pages
    { url: `${BASE_URL}/services/branding-agency-in-calicut`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/digital-marketing-agency-in-calicut`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/package-design`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/photoshoot`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/print-design`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/web-development-company-in-calicut`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/creatives`, priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/production`,                      priority: 0.85, changeFrequency: 'monthly' },
    { url: `${BASE_URL}/services/web-design`,                      priority: 0.85, changeFrequency: 'monthly' },
    // our-works sub-pages
    { url: `${BASE_URL}/our-works/motion-creatives`,               priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-works/creative-posters`,               priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-works/web-design`,                     priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-works/package-design`,                 priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-works/print-design`,                   priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-works/production`,                     priority: 0.8,  changeFrequency: 'monthly' },
    { url: `${BASE_URL}/our-works/branding`,                       priority: 0.8,  changeFrequency: 'monthly' },
  ]

  // ── 2. Dynamic blog pages from Sanity ────────────────────────────
  let blogUrls: MetadataRoute.Sitemap = []
  try {
    const blogs: { slug: { current: string } }[] = await client.fetch(
      `*[_type == "blog" && !(_id in path("drafts.**"))]{slug}`
    )
    blogUrls = blogs
      .filter(b => b?.slug?.current)
      .map(b => ({
        url: `${BASE_URL}/blogs/${b.slug.current}`,
        changeFrequency: 'weekly',
        priority: 0.75,
      }))
  } catch (e) {
    console.error('Sitemap: failed to fetch blogs', e)
  }

  // ── 3. Dynamic branding pages from Sanity ────────────────────────
  let brandingUrls: MetadataRoute.Sitemap = []
  try {
    const brandings: { slug: { current: string } }[] = await client.fetch(
      `*[_type == "branding"] | order(orderRank) {slug}`
    )
    brandingUrls = brandings
      .filter(b => b?.slug?.current)
      .map(b => ({
        url: `${BASE_URL}/our-works/branding/${b.slug.current}`,
        changeFrequency: 'monthly',
        priority: 0.7,
      }))
  } catch (e) {
    console.error('Sitemap: failed to fetch branding', e)
  }

  return [...staticPages, ...blogUrls, ...brandingUrls]
}
