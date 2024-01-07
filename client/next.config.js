/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["flowbite.com", "fakestoreapi.com", "dosi-in.com"],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:5000/api/:path*", // Proxy to Backend
      },
    ];
  },
};
// http://localhost:5000/api/v1/auth/login
module.exports = nextConfig;
