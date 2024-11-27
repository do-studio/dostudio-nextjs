// pages/api/sitemap.js

import { SitemapStream, streamToPromise } from 'sitemap';
import { NextResponse } from 'next/server';


export async function GET() {
  const sitemap = new SitemapStream({ hostname: 'https://dostudio.co.in/' });

  // Static pages
  sitemap.write({ url: '/', changefreq: 'monthly', priority: 1.0 });
  sitemap.write({ url: '/services', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/blogs', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/contact', changefreq: 'monthly', priority: 0.8 });
  sitemap.write({ url: '/services', changefreq: 'monthly', priority: 0.8 });


  // Dynamic pages (like blog posts or other dynamic routes)
  const dynamicUrls = [
    { url: '/services/branding-agency-in-calicut', lastmod: '2024-11-26' },
    { url: '/services/digital-marketing-agency-in-calicut', lastmod: '2024-11-26' },
    { url: '/services/package-design', lastmod: '2024-11-26' },
    { url: '/services/photoshoot', lastmod: '2024-11-26' },
    { url: '/services/print-design', lastmod: '2024-11-26' },
    { url: '/services/web-development-company-in-calicut', lastmod: '2024-11-26' },

    { url: '/our-works/branding', lastmod: '2024-11-26' },
    { url: '/services/creatives', lastmod: '2024-11-26' },
    { url: '/services/package-design', lastmod: '2024-11-26' },
    { url: '/services/print-design', lastmod: '2024-11-26' },
    { url: '/services/production', lastmod: '2024-11-26' },
    { url: '/services/web-design', lastmod: '2024-11-26' },

    { url: '/blogs/stay-ahead-of-the-game-how-a-digital-marketing-agency-in-calicut-can-boost-your-business-growth', lastmod: '2024-11-26' },
    { url: '/blogs/social-media-building-your-brands-digital-community', lastmod: '2024-11-26' },
    { url: '/blogs/meta-ads-powering-your-social-media-advertising', lastmod: '2024-11-26' },
    { url: '/blogs/seo-elevating-your-online-visibility', lastmod: '2024-11-26' },
    { url: '/blogs/google-ads-maximizing-your-online-presence', lastmod: '2024-11-26' },
    { url: '/blogs/upgrade-your-business-with-best-digital-marketing-agency-in-kerala', lastmod: '2024-11-26' },
    { url: '/blogs/effective-digital-marketing-strategies', lastmod: '2024-11-26' },


    { url: 'our-works/branding/add-mind', lastmod: '2024-11-26' },
    { url: 'our-works/branding/my-work', lastmod: '2024-11-26' },
    { url: 'our-works/branding/adis', lastmod: '2024-11-26' },
    { url: 'our-works/branding/chai-drop', lastmod: '2024-11-26' },
    { url: 'our-works/branding/comfiverse', lastmod: '2024-11-26' },
    { url: 'our-works/branding/arabian-chapter', lastmod: '2024-11-26' },
    { url: 'our-works/branding/sea-scape', lastmod: '2024-11-26' },
    { url: 'our-works/branding/stackr', lastmod: '2024-11-26' },
    { url: 'our-works/branding/genz-learning', lastmod: '2024-11-26' },
    { url: 'our-works/branding/design-dialect', lastmod: '2024-11-26' },
    { url: 'our-works/branding/flowers-academy', lastmod: '2024-11-26' },
    { url: 'our-works/branding/kebabji', lastmod: '2024-11-26' },
    { url: 'our-works/branding/sou', lastmod: '2024-11-26' },
    { url: 'our-works/branding/dou', lastmod: '2024-11-26' },
    { url: 'our-works/branding/geo-grip', lastmod: '2024-11-26' },
    { url: 'our-works/branding/plum', lastmod: '2024-11-26' },
  




   
  ];

  dynamicUrls.forEach(page => sitemap.write(page));

  sitemap.end();

  // Convert the stream to a string and send it as a response
  const xmlString = await streamToPromise(sitemap);

  // Return the response with proper Content-Type header
  return new NextResponse(xmlString.toString(), {
    headers: { 'Content-Type': 'application/xml' },
  });
}











