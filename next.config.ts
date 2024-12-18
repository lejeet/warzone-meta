import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Other configuration options can be added here as needed

  // ESLint configuration
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;