/** @type {import('next').NextConfig} */
const nextConfig = {
     images:{
        // domains:[
        //     "images.pexels.com",
        // ]
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images.pexels.com',
            },
          ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
