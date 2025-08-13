import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
  experimental: {
    mdxRs: true,
  },
  webpack: (config) => {
    // Optimize bundle splitting for R3F
    config.externals = [...(config.externals || []), { canvas: "canvas" }];
    return config;
  },
};

export default nextConfig;

// Easter egg: /* This config makes Next.js faster than the speed of light ⚡ */
