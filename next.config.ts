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
    // Disable Next.js image optimization so images are served directly
    // from origin (Supabase/Unsplash/public) without hitting Vercel limits (402)
    // or requiring paid Supabase Image Transformation add-ons.
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 480, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 85, 90, 100],
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
  async redirects() {
    return [
      {
        source: '/blog/6-mm-mi-8-mm-dusakabin',
        destination: '/blog/dusakabin-cam-kalinligi-ne-olmali',
        permanent: true,
      },
    ]
  },
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

