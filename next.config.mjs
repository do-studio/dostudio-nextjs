/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: "/:path*", // Match all paths
        has: [
          {
            type: "host",
            value: "www.dostudio.co.in", // Match www domain
          },
        ],
        destination: "https://dostudio.co.in/:path*", // Redirect to non-www domain
        permanent: true, // Set to true for a 308 permanent redirect
      },
      {
        source: '/brand/flowers-academy',
        destination: '/our-works/branding/flowers-academy',
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/brand/chai-drop',
        destination: '/our-works/branding/chai-drop',
        permanent: true,
      },
      {
        source: '/brand/genz-learning',
        destination: '/our-works/branding/genz-learning',
        permanent: true,
      },
      {
        source: '/brand/dream-of-us',
        destination: '/our-works/branding/dream-of-us',
        permanent: true,
      },
      {
        source: '/brand/comfiverse',
        destination: '/our-works/branding/comfiverse',
        permanent: true,
      },
      {
        source: '/brand/sou',
        destination: '/our-works/branding/sou',
        permanent: true,
      },
      {
        source: '/brand/seascape',
        destination: '/our-works/branding/seascape',
        permanent: true,
      },
      {
        source: '/brand/design-dialects',
        destination: '/our-works/branding/design-dialects',
        permanent: true,
      },
      {
        source: '/brand/adis-frozen-bites',
        destination: '/our-works/branding/adis-frozen-bites',
        permanent: true,
      },
      {
        source: '/brand/arabian-chapter',
        destination: '/our-works/branding/arabian-chapter',
        permanent: true,
      },
      {
        source: '/brand/my-work',
        destination: '/our-works/branding/my-work',
        permanent: true,
      },
      {
        source: '/brand/stackr',
        destination: '/our-works/branding/stackr',
        permanent: true,
      },
      {
        source: '/brand/kebabji',
        destination: '/our-works/branding/kebabji',
        permanent: true,
      },
      {
        source: '/brand/add-mind',
        destination: '/our-works/branding/add-mind',
        permanent: true,
      },
      {
        source: '/brand/geo-grip',
        destination: '/our-works/branding/geo-grip',
        permanent: true,
      },

      // Redirect blog link
      {
        source: '/blog/how-to-choose-the-right-branding-services',
        destination: '/blogs/how-to-choose-the-right-branding-services',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: "https",
        hostname: "dostudio.co.in",
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io'

      }
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

};

export default nextConfig;
