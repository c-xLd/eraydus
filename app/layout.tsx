import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import Script from "next/script";
import { Toaster } from "sonner";

import { FramerMotionFix } from "./FramerMotionFix";
import { AIGraphSchema } from "@/components/seo/AIGraphSchema";
import { globalSeoData } from "@/lib/data/seo";
import { ImageProtection } from "@/components/ImageProtection";
import { Tracker } from "@/components/analytics/Tracker";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin", "latin-ext"],
  display: "swap",
  preload: true,
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

import { getGlobalSeoData } from "@/lib/data/seo";
import { ServerFAQSchema } from "@/components/seo/ServerFAQSchema";

export async function generateMetadata(): Promise<Metadata> {
  const globalSeo = await getGlobalSeoData();

  const titleSeparator = globalSeo.titleSeparator;
  const siteName = globalSeo.siteName;
  const description = globalSeo.defaultDescription;
  const ogImage = globalSeo.defaultOgImage;
  const twitterHandle = globalSeo.twitterHandle;
  const geoData = globalSeo || {};

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
  };
}

export default async function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const { getGlobalSeoData } = await import('@/lib/data/seo');
    const geoData = await getGlobalSeoData();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

    return (
      <html
        lang="tr"
        className={`${plusJakarta.variable} ${spaceMono.variable} antialiased`}
        data-scroll-behavior="smooth"
      >
        <head>
          {supabaseUrl && (
            <>
              <link rel="preconnect" href={supabaseUrl} crossOrigin="anonymous" />
              <link rel="dns-prefetch" href={supabaseUrl} />
            </>
          )}
        </head>
        <body className="min-h-screen flex flex-col font-sans">
          {geoData?.analytics?.googleTagManagerId && (
            <noscript>
              <iframe src={`https://www.googletagmanager.com/ns.html?id=${geoData.analytics.googleTagManagerId}`}
                height="0" width="0" style={{ display: 'none', visibility: 'hidden' }}></iframe>
            </noscript>
          )}
          <FramerMotionFix />
          <AIGraphSchema />
          <ServerFAQSchema />
          <ImageProtection />
          <Tracker />

          {/* Google Analytics (GA4) - Lazy loaded to protect FCP/LCP */}
          {geoData?.analytics?.googleAnalyticsId && (
            <>
              <Script src={`https://www.googletagmanager.com/gtag/js?id=${geoData.analytics.googleAnalyticsId}`} strategy="lazyOnload" />
              <Script id="google-analytics" strategy="lazyOnload">
                {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${geoData.analytics.googleAnalyticsId}');
              `}
              </Script>
            </>
          )}

          {/* Google Tag Manager (GTM) - Lazy loaded to protect FCP/LCP */}
          {geoData?.analytics?.googleTagManagerId && (
            <Script id="google-tag-manager" strategy="lazyOnload">
              {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${geoData.analytics.googleTagManagerId}');
            `}
            </Script>
          )}

          {/* Meta Pixel - Lazy loaded */}
          {geoData?.analytics?.metaPixelId && (
            <Script id="meta-pixel" strategy="lazyOnload">
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
          <Toaster position="top-right" richColors closeButton />
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    );
  }
