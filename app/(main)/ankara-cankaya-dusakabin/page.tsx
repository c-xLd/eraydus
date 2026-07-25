import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, PhoneCall, Star, ShieldCheck, CheckCircle2, ArrowRight, Ruler, Sparkles } from 'lucide-react'
import { getBreadcrumbSchema, getLocalBusinessSchema, getGraphSchema } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'Ankara Çankaya Duşakabin İmalat & Montajı - Erayduş Çankaya',
  description: 'Çankaya, Ümitköy, Gaziosmanpaşa, Ayrancı ve Yaşamkent için özel ölçü duşakabin imalatı. 8mm temperli cam, mat siyah profil, aynı hafta ücretsiz keşif ve montaj.',
  keywords: 'çankaya duşakabin, ankara çankaya duşakabin firmaları, ümitköy duşakabin montajı, gaziosmanpaşa duşakabin tamiri, yaşamkent duşakabin fiyatları',
  alternates: {
    canonical: `${SITE_URL}/ankara-cankaya-dusakabin`,
  },
  openGraph: {
    title: 'Ankara Çankaya Duşakabin İmalat & Montajı | ERAYDUŞ',
    description: 'Çankaya bölgesine özel lüks duşakabin modelleri ve ücretsiz adrese keşif servisi.',
    url: `${SITE_URL}/ankara-cankaya-dusakabin`,
    siteName: 'ERAYDUŞ',
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630 }],
  },
}

export default function CankayaDusakabinPage() {
  const localGeoData = {
    phone: '+90 312 000 00 00',
    email: 'cankaya@eraydus.net',
    address: {
      streetAddress: 'Çankaya Mahallesi, Turan Güneş Bulvarı No: 142',
      addressLocality: 'Çankaya',
      addressRegion: 'Ankara',
      postalCode: '06550',
      addressCountry: 'TR'
    },
    geo: {
      position: '39.8850;32.8597'
    }
  }

  const localBusinessSchema = getLocalBusinessSchema(localGeoData)
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Duşakabin Modelleri', url: '/dusakabin-modelleri' },
    { name: 'Ankara Çankaya Duşakabin', url: '/ankara-cankaya-dusakabin' },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs)
  const graphSchema = getGraphSchema([localBusinessSchema, breadcrumbSchema])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="bg-background min-h-screen pt-32 pb-24">
        {/* HERO SECTION */}
        <section className="container mx-auto max-w-[1200px] px-6">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-champagne font-bold mb-4">
            <MapPin className="w-4 h-4" />
            Ankara Çankaya Bölge Servisi
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1.15]">
            Ankara Çankaya <span className="font-semibold text-champagne">Duşakabin İmalat & Montajı</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
            Çankaya, Ümitköy, Gaziosmanpaşa, Ayrancı, Ayrancı, Yaşamkent ve Dikmen bölgelerinde rezidans ve villalarınıza özel 8mm temperli cam duşakabin imalatı ve aynı hafta montaj garantisi.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-semibold text-sm rounded-lg hover:bg-foreground/90 transition-all shadow-lg"
            >
              <PhoneCall className="w-4 h-4 mr-2" />
              Çankaya Keşif Talebi İste
            </Link>
            <Link
              href="/dusakabin-modelleri"
              className="inline-flex items-center justify-center px-8 py-4 bg-muted text-foreground font-medium text-sm rounded-lg hover:bg-muted/80 transition-colors border border-border"
            >
              Duşakabin Modellerini İncele
            </Link>
          </div>
        </section>

        {/* TRUST BADGES & LOCAL REVIEWS */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;Gaziosmanpaşa&apos;daki dairemiz için siyah profilli 8mm temperli duşakabin siparişi verdik. Erayduş ekibi aynı gün lazerle ölçü aldı, 4. gün montajı sıfır hatayla tamamladı.&rdquo;
              </p>
              <span className="text-xs font-bold text-foreground block mt-4">— Mehmet B. / Gaziosmanpaşa, Çankaya</span>
            </div>

            <div className="p-8 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;Ümitköy villa banyomuz için tavana kadar Walk-in cam panel yaptırdık. Su sızdırmazlığı mükemmel, titizlikleri için teşekkürler.&rdquo;
              </p>
              <span className="text-xs font-bold text-foreground block mt-4">— Selin K. / Ümitköy, Çankaya</span>
            </div>

            <div className="p-8 rounded-2xl border border-border/60 bg-card">
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground italic leading-relaxed">
                &ldquo;Çankaya Turan Güneş caddesindeki evimize soft-close sürgülü gold seri takıldı. Kireç tutmaz cam teknolojisi harika çalışıyor.&rdquo;
              </p>
              <span className="text-xs font-bold text-foreground block mt-4">— Ahmet T. / Çankaya</span>
            </div>
          </div>
        </section>

        {/* LOCAL DISTRICT DETAILS */}
        <section className="py-12 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1000px] px-6 prose prose-neutral dark:prose-invert text-muted-foreground">
            <h2 className="text-2xl md:text-3xl font-light text-foreground">Çankaya Mahallesi ve Semtlerinde Ücretsiz Keşif</h2>
            <p>
              ERAYDUŞ olarak Ankara Çankaya bölgesindeki tüm konut, rezidans ve müstakil villa projelerine özel ölçü duşakabin imalatı yapmaktayız. Ekibimiz lazer metre cihazları ile adresinize gelerek duvar dikliğini, zemin meyilini ve seramik payını hesaplar.
            </p>
            <h3 className="text-xl font-semibold text-foreground mt-6">Hizmet Verilen Çankaya Semtleri:</h3>
            <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm text-foreground font-medium my-4 list-disc pl-5">
              <li>Ümitköy Duşakabin</li>
              <li>Gaziosmanpaşa Duşakabin</li>
              <li>Ayrancı Duşakabin</li>
              <li>Yaşamkent Duşakabin</li>
              <li>Turan Güneş Duşakabin</li>
              <li>Oran Şehri Duşakabin</li>
              <li>Birlik Mahallesi Duşakabin</li>
              <li>Kavaklıdere Duşakabin</li>
              <li>Mustafa Kemal Mah. Duşakabin</li>
            </ul>
          </div>
        </section>
      </div>
    </>
  )
}
