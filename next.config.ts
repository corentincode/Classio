import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Désactive les vérifications ESLint pendant la construction
    ignoreDuringBuilds: true,
  },
  reactStrictMode: true,
  images: {
    domains: ['julianmayer.fr'],
  },
  // Ajoutez cette configuration pour les sous-domaines
  async rewrites() {
    return {
      beforeFiles: [
        // Redirection des sous-domaines vers le dossier /etablissements/[sousDomaine]
        {
          source: '/:path*',
          has: [
            {
              type: 'host',
              value: '(?<sousDomaine>[^.]+).classio.fr',
            },
          ],
          destination: '/admin/etablissements/:sousDomaine/:path*',
        },
      ],
    }
  },
};

export default nextConfig;
