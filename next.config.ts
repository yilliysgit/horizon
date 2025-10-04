import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // laat de build doorgaan ondanks ESLint-fouten
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
