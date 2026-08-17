import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      '@radix-ui/react-slider',
      '@radix-ui/react-switch',
      'es-toolkit',
      'sonner',
    ],
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  // @ts-ignore - To silence the workspace root warning in Turbopack
  turbopack: {
    root: path.join(process.cwd(), './'),
  },
  compress: true,
  reactStrictMode: true,
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 1200],
    imageSizes: [256],
    qualities: [25, 50, 75, 90, 100],
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'eraydus.net',
        port: '',
        pathname: '**',
      },
    ],
  },
  // Baseline security headers applied to every response.
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), browsing-topics=()',
          },
        ],
      },
    ]
  },
};

export default nextConfig;

