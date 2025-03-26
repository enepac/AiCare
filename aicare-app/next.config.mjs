/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com"
      }
    ]
  },
  experimental: {
    // Enable any future Next.js experimental features here
  },
  env: {
    PORT: "4000",
    NEXT_PUBLIC_PORT: "4000"
  },
  serverRuntimeConfig: {
    port: process.env.PORT || 4000
  },
  publicRuntimeConfig: {
    port: process.env.NEXT_PUBLIC_PORT || 4000
  }
};

export default nextConfig;
