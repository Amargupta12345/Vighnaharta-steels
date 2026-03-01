import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Pre-existing ESLint issues should not block build
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
