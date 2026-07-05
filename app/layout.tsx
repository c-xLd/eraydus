import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full flex flex-col font-sans">
        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
