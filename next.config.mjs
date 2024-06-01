/** @type {import('next').NextConfig} */
const nextConfig = {
     images:{
      domains:["http://localhost:1337/",'res.cloudinary.com'],
        // domains:[
        //     "images.pexels.com",
        // ]
        remotePatterns: [
            {
              protocol: 'https',
              hostname: 'images.pexels.com',
            },
            {
              protocol: "http",
              hostname: "localhost",
              port: "1337",
              pathname: "/uploads/**",
            },
          ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
