import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";


import { FramerMotionFix } from "./FramerMotionFix";
import { AIGraphSchema } from "@/components/seo/AIGraphSchema";
import { globalSeoData } from "@/lib/data/seo";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { createClient } from "@/lib/server";

export async function generateMetadata(): Promise<Metadata> {
  const supabase = await createClient();
  const { data: globalSeo } = await supabase
    .from('seo_metadata')
    .select('*')
    .eq('page_type', 'global')
    .single();

  const titleSeparator = globalSeo?.title_separator || globalSeoData.titleSeparator;
  const siteName = globalSeo?.title || globalSeoData.siteName;
  const description = globalSeo?.description || globalSeoData.defaultDescription;
  const ogImage = globalSeo?.og_image || globalSeoData.defaultOgImage;
  const twitterHandle = globalSeo?.twitter_handle || globalSeoData.twitterHandle;

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'),
    title: {
      template: `%s ${titleSeparator} ${siteName}`,
      default: `${siteName} ${titleSeparator} ${description}`,
    },
    description: description,
    openGraph: {
      type: "website",
      siteName: siteName,
      title: {
        template: `%s ${titleSeparator} ${siteName}`,
        default: siteName,
      },
      description: description,
      images: [{ url: ogImage }],
    },
    twitter: {
      card: "summary_large_image",
      creator: twitterHandle,
    },
    other: {
      'geo.region': globalSeoData.geo.region,
      'geo.placename': globalSeoData.geo.placename,
      'geo.position': globalSeoData.geo.position,
      'ICBM': globalSeoData.geo.position,
    },
    verification: {
      google: "YgtPsUfGBfj8w2zoHlnRnvZ-cCrEz3p0okKJqSgjdaU",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        <FramerMotionFix />
        <AIGraphSchema />
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
