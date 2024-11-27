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
        source: 'https://www.dostudio.co.in/:path*',
        destination: 'https://dostudio.co.in/:path*',
        permanent: true, // This makes the redirect permanent (status code 301)
      },
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

    ];
  },
};

export default nextConfig;
