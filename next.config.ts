import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Désactive les vérifications ESLint pendant la construction
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
