/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
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
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'host',
            value: 'www.dostudio.co.in', // Check if the host is 'www.dostudio.co.in'
          },
        ],
        destination: 'https://dostudio.co.in/:path*', // Redirect to non-www domain
        permanent: true, // 301 permanent redirect
      },
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap', // This is the API route you created
      },
    ];
  },
};

export default nextConfig;
