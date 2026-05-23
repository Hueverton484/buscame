import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.dog.ceo" },
      { protocol: "https", hostname: "*.supabase.co" },
    ],
  },
  experimental: {
    serverActions: {
      // Permitir subir hasta 25MB de fotos en un reporte
      bodySizeLimit: "25mb",
    },
    viewTransition: true,
  },
};

export default nextConfig;
