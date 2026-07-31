import type { Metadata } from 'next'
import Link from 'next/link'
import { Sparkles, ArrowRight, Share2, ShieldCheck, Code } from 'lucide-react'
import { getArticleSchema, getBreadcrumbSchema, getGraphSchema } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: '2026 Banyo Dekorasyon ve Duşakabin Trendleri Raporu | ERAYDUŞ Press Hub',
  description: 'Mimarlık, iç mekan tasarımı ve ev yenileme odaklı sektör raporu. 2026 lüks duşakabin trendleri, cam teknolojileri ve doğal bağlantı kaynakları.',
  keywords: 'duşakabin, 2026 banyo trendleri, siyah profilli duşakabin, temperli cam, erayduş duşakabin sistemleri, mimari banyo raporu',
  alternates: {
    canonical: `${SITE_URL}/banyo-trendleri-2026`,
  },
  openGraph: {
    title: '2026 Banyo Dekorasyon & Duşakabin Trendleri Raporu | ERAYDUŞ',
    description: 'Mimarlar ve ev sahipleri için 2026 yılı banyo trendleri ve malzeme teknolojileri analizi.',
    url: `${SITE_URL}/banyo-trendleri-2026`,
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630 }],
  },
}

export default function BanyoTrendleriReportPage() {
  const articleSchema = getArticleSchema({
    title: '2026 Türkiye Lüks Banyo Dekorasyon ve Duşakabin Trendleri Raporu',
    description: '2026 banyo mimarisinde öne çıkan malzeme, profil rengi ve cam teknolojisi trendleri raporu.',
    image: `${SITE_URL}/images/og-default.jpg`,
    publishedAt: '2026-06-10T10:00:00+03:00',
    url: '/banyo-trendleri-2026',
    authorName: 'ERAYDUŞ Mimari Tasarım & Ar-Ge Kurulu',
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Basın & Raporlar', url: '/blog' },
    { name: '2026 Banyo Trendleri Raporu', url: '/banyo-trendleri-2026' },
  ])

  const graphSchema = getGraphSchema([articleSchema, breadcrumbSchema])

  const citationCodeHtml = `<a href="https://www.eraydus.net/dusakabin" target="_blank" rel="noopener">ERAYDUŞ Duşakabin Sistemleri 2026 Trend Raporu</a>`
  const citationCodeMarkdown = `[ERAYDUŞ Duşakabin Sistemleri 2026 Trend Raporu](https://www.eraydus.net/dusakabin)`

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
            <Sparkles className="w-4 h-4" />
            Sektörel İnceleme & Araştırma Raporu
          </div>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight text-foreground leading-[1.15]">
            2026 Türkiye Lüks Banyo & <span className="font-semibold">Duşakabin Trendleri Raporu</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
            Mimarlık firmaları, iç mimarlar, konut üreticileri ve evini yenileyen kullanıcılar için hazırlanan kapsamlı malzeme, renk, cam ve akustik izolasyon araştırma özeti.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground border-y border-border/40 py-4">
            <span><strong>Yayınlayan:</strong> ERAYDUŞ Ar-Ge ve Mimari Ekip</span>
            <span>•</span>
            <span><strong>Görüş Bildiren Mimarlar:</strong> 120+ İç Mimar & Proje Yöneticisi</span>
            <span>•</span>
            <span><strong>Son Güncelleme:</strong> Temmuz 2026</span>
          </div>
        </section>

        {/* KEY HIGHLIGHTS STATS */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <span className="text-4xl font-bold text-champagne">%84</span>
              <h3 className="text-sm font-medium text-foreground mt-2">Mat Siyah & Antrasit Profil</h3>
              <p className="text-xs text-muted-foreground mt-1">2026 villa ve rezidans projelerinde tercih edilen lider profil rengi.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <span className="text-4xl font-bold text-champagne">8mm+</span>
              <h3 className="text-sm font-medium text-foreground mt-2">Temperli Emniyet Camı</h3>
              <p className="text-xs text-muted-foreground mt-1">Standart 4mm/6mm yerine lüks segmentte benimsenen güvenlik standardı.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <span className="text-4xl font-bold text-champagne">%92</span>
              <h3 className="text-sm font-medium text-foreground mt-2">Nano Kireç Koruma</h3>
              <p className="text-xs text-muted-foreground mt-1">Temizlik kolaylığı nedeniyle aranan hidrofobik cam kaplama oranı.</p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/40 backdrop-blur-sm">
              <span className="text-4xl font-bold text-champagne">Walk-in</span>
              <h3 className="text-sm font-medium text-foreground mt-2">Eşiksiz Zemin Trendi</h3>
              <p className="text-xs text-muted-foreground mt-1">Geleneksel tekneler yerine tercih edilen zemine sıfır panel çözümleri.</p>
            </div>
          </div>
        </section>

        {/* REPORT CONTENT */}
        <section className="py-12 container mx-auto max-w-[900px] px-6 prose prose-neutral dark:prose-invert">
          <h2 className="text-2xl md:text-3xl font-light">1. Renk ve Profil Kaplama Teknolojileri</h2>
          <p>
            Geleneksel parlak krom kabinlerin yerini son üç yılda mat elektrostatik fırın boyalı 
            <Link href="/dusakabin/siyah-duskabin-modelleri" className="text-champagne font-medium mx-1 hover:underline">
              siyah profilli duşakabin
            </Link> 
            ve PVD titanyum altın/bronz kaplamalar aldı. Özellikle su damlalarına ve banyo deterjanlarına karşı direnç gösteren PVD (Physical Vapor Deposition) boyalar, renk kararması ve dökülme riskini ortadan kaldırarak 10 yıla varan garanti süreçleri sunmaktadır.
          </p>

          <h2 className="text-2xl md:text-3xl font-light mt-10">2. Cam Kalınlığı ve Şeffaf Mimari</h2>
          <p>
            Minimalist tasarımlarda profiller küçülürken cam paneller masifleşmektedir. 
            <Link href="/urunler" className="text-champagne font-medium mx-1 hover:underline">
              Özel ölçü duşakabin
            </Link> 
            tasarımlarında 8mm ve 10mm rodajlı Şişecam temperli emniyet camları, sallantı yapmayan rijit duruşları ve yüksek darbe dirençleriyle öne çıkmaktadır.
          </p>

          <h2 className="text-2xl md:text-3xl font-light mt-10">3. İç Mekan Erişilebilirliği ve Walk-in Sistemler</h2>
          <p>
            Engelsiz yaşam (universal design) ilkesi gereği duş tekneleri kaldırılmakta, doğrudan banyo seramiği üzerine oturan eşiksiz kapısız 
            <Link href="/dusakabin/walkin-dusakabin" className="text-champagne font-medium mx-1 hover:underline">
              Walk-in duş panelleri
            </Link> 
            veya soft-close fren mekanizmalı sürgülü modeller tercih edilmektedir.
          </p>
        </section>

        {/* BACKLINK / CITATION ENGINE FOR BLOGS & MEDIA */}
        <section className="py-16 bg-muted/30 border-y border-border/50 my-16">
          <div className="container mx-auto max-w-[1000px] px-6">
            <div className="flex items-center gap-3 text-champagne mb-4">
              <Share2 className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">Basın, Blog & İçerik Üreticileri İçin Bağlantı Alıntısı</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground">
              Sitenizde Kaynak Gösterin & Doğrudan Bağlantı Ekleyin
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-2xl">
              Web sitenizde, dekorasyon blogunuzda veya haber portalınızda bu raporu ve verileri kaynak gösterirken aşağıdaki resmi HTML/Markdown bağlantı kodlarını doğrudan kullanabilirsiniz.
            </p>

            <div className="mt-8 space-y-6">
              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-2">
                    <Code className="w-4 h-4 text-champagne" /> HTML Alıntı Kodu (Doğrudan Yönlendirme)
                  </span>
                </div>
                <pre className="p-3 rounded-lg bg-background text-xs font-mono text-emerald-400 overflow-x-auto border border-border/40">
                  {citationCodeHtml}
                </pre>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-2">
                    <Code className="w-4 h-4 text-champagne" /> Markdown Alıntı Kodu
                  </span>
                </div>
                <pre className="p-3 rounded-lg bg-background text-xs font-mono text-emerald-400 overflow-x-auto border border-border/40">
                  {citationCodeMarkdown}
                </pre>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-champagne" />
              <span>ERAYDUŞ, mimarlık ve dekorasyon odaklı içerik üreticilerine telifsiz grafik ve veri paylaşım izni sunar.</span>
            </div>
          </div>
        </section>

        {/* CTA BANNER */}
        <section className="container mx-auto max-w-[1200px] px-6 text-center py-12">
          <h2 className="text-2xl md:text-4xl font-light">Projeniz için Özel Ölçü Teklifi Alın</h2>
          <p className="text-muted-foreground text-sm mt-2">Erayduş mühendislik ve mimari ekibi ile banyonuzu 2026 trendlerine dönüştürün.</p>
          <div className="mt-6 flex justify-center gap-4">
            <Link href="/tasarla" className="inline-flex items-center px-6 py-3 bg-champagne text-foreground font-semibold text-sm rounded-lg hover:bg-champagne/90 transition-all">
              Özel Ölçü Tasarla
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
            <Link href="/urunler" className="inline-flex items-center px-6 py-3 bg-muted text-foreground font-medium text-sm rounded-lg hover:bg-muted/80 transition-colors border border-border">
              Modelleri İncele
            </Link>
          </div>
        </section>
      </div>
    </>
  )
}
