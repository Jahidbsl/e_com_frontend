/** @type {import('next').NextConfig} */
const nextConfig = {

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e-com-backend-lr5z.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;