import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";


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

import { getGlobalSeoData } from "@/lib/data/seo";
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
  const geoData = globalSeo?.geo_data || {};

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
    verification: {
      google: 'YgtPsUfGBfj8w2zoHlnRnvZ-cCrEz3p0okKJqSgjdaU',
    },
    other: {
      'geo.region': geoData?.geo?.region || globalSeoData.geo.region,
      'geo.placename': geoData?.geo?.placename || globalSeoData.geo.placename,
      'geo.position': geoData?.geo?.position || globalSeoData.geo.position,
      'ICBM': geoData?.geo?.position || globalSeoData.geo.position,
    },
    verification: {
      google: "YgtPsUfGBfj8w2zoHlnRnvZ-cCrEz3p0okKJqSgjdaU",
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { getGlobalSeoData } = await import('@/lib/data/seo');
  const geoData = await getGlobalSeoData();

  return (
    <html
      lang="tr"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans">
        {geoData?.analytics?.googleTagManagerId && (
          <noscript>
            <iframe src={`https://www.googletagmanager.com/ns.html?id=${geoData.analytics.googleTagManagerId}`}
            height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
          </noscript>
        )}
        <FramerMotionFix />
        <AIGraphSchema />
        
        {/* Google Analytics (GA4) */}
        {geoData?.analytics?.googleAnalyticsId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${geoData.analytics.googleAnalyticsId}`} strategy="afterInteractive" />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${geoData.analytics.googleAnalyticsId}');
              `}
            </Script>
          </>
        )}

        {/* Google Tag Manager (GTM) */}
        {geoData?.analytics?.googleTagManagerId && (
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${geoData.analytics.googleTagManagerId}');
            `}
          </Script>
        )}

        {/* Meta Pixel */}
        {geoData?.analytics?.metaPixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${geoData.analytics.metaPixelId}');
              fbq('track', 'PageView');
            `}
          </Script>
        )}

        {children}
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
