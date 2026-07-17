import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import { FramerMotionFix } from "./FramerMotionFix";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { globalSeoData } from "@/lib/data/seo";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    template: `%s ${globalSeoData.titleSeparator} ${globalSeoData.siteName}`,
    default: `${globalSeoData.siteName} ${globalSeoData.titleSeparator} ${globalSeoData.defaultDescription}`,
  },
  description: globalSeoData.defaultDescription,
  openGraph: {
    type: "website",
    siteName: globalSeoData.siteName,
    title: {
      template: `%s ${globalSeoData.titleSeparator} ${globalSeoData.siteName}`,
      default: globalSeoData.siteName,
    },
    description: globalSeoData.defaultDescription,
    images: [{ url: globalSeoData.defaultOgImage }],
  },
  twitter: {
    card: "summary_large_image",
    creator: globalSeoData.twitterHandle,
  },
  other: {
    'geo.region': globalSeoData.geo.region,
    'geo.placename': globalSeoData.geo.placename,
    'geo.position': globalSeoData.geo.position,
    'ICBM': globalSeoData.geo.position,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Schema for Google
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": globalSeoData.siteName,
    "image": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}${globalSeoData.defaultOgImage}`,
    "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`,
    "telephone": globalSeoData.contact.phone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": globalSeoData.contact.address.streetAddress,
      "addressLocality": globalSeoData.contact.address.addressLocality,
      "addressRegion": globalSeoData.contact.address.addressRegion,
      "postalCode": globalSeoData.contact.address.postalCode,
      "addressCountry": globalSeoData.contact.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": globalSeoData.geo.position.split(';')[0],
      "longitude": globalSeoData.geo.position.split(';')[1]
    },
    "openingHours": globalSeoData.localBusiness.openingHours,
    "priceRange": globalSeoData.localBusiness.priceRange,
    "areaServed": globalSeoData.localBusiness.areaServed.map(area => ({
      "@type": "City",
      "name": area
    }))
  };

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <FramerMotionFix />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
