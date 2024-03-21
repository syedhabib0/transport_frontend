/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "https://api.tmsiws.com/", "api.tmsiws.com"],
  },
  reactStrictMode: false,
};

export default nextConfig;
