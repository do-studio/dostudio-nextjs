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
    ];
  },
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
 
};

export default nextConfig;
