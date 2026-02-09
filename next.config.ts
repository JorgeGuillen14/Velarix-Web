import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: "/app",
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
