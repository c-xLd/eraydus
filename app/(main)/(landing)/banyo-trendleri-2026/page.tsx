import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Sparkles,
  ArrowRight,
  Share2,
  ShieldCheck,
  Code,
  CheckCircle2,
  HelpCircle,
  Ruler,
  Droplets,
  MessageCircle,
  Phone,
  Palette,
  Shield,
  Maximize2
} from 'lucide-react'
import { getArticleSchema, getBreadcrumbSchema, getFAQSchema, getGraphSchema } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: '2026 Banyo Dekorasyon ve Duşakabin Trendleri | ERAYDUŞ Ankara',
  description:
    '2026 yılı banyo trendleri rehberi: 6mm temperli cam modelleri, mat siyah & fırçalanmış gold profiller, eşiksiz zemin çözümleri ve kireç tutmayan camlar.',
  keywords:
    '2026 banyo trendleri, duşakabin modelleri 2026, lüks banyo dekorasyonu, siyah profilli duşakabin, tek cam duşakabin, 6mm temperli cam, erayduş duşakabin, ankara özel ölçü duşakabin',
  alternates: {
    canonical: `${SITE_URL}/banyo-trendleri-2026`,
  },
  openGraph: {
    title: '2026 Banyo Dekorasyon & Duşakabin Trendleri | ERAYDUŞ',
    description:
      'Ev sahipleri ve banyo yenileyenler için 2026 yılı banyo trendleri, renk kombinasyonları ve cam teknolojileri incelemesi.',
    url: `${SITE_URL}/banyo-trendleri-2026`,
    siteName: 'ERAYDUŞ Ankara',
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: '2026 Banyo Trendleri' }],
  },
}

const trendFaqs = [
  {
    question: '2026 yılında en çok hangi duşakabin renkleri tercih ediliyor?',
    answer:
      '2026 banyo tasarımlarında mat siyah ve fırçalanmış gold (altın) profiller açık ara öne çıkıyor. Geleneksel parlak krom kabinlerin yerini banyo bataryalarıyla uyum sağlayan mat ve solmayan profiller aldı.',
  },
  {
    question: 'Duşakabinlerde neden 6mm temperli cam kullanılıyor?',
    answer:
      '6mm Şişecam temperli emniyet camı, kırılmaya ve darbelere karşı normal camlardan 5 kat daha dayanıklıdır. Ağır olmadığı için kapı tekerleklerine ve menteşelere gereksiz yük bindirmez, kabinin yıllarca sorunsuz ve hafif açılıp kapanmasını sağlar.',
  },
  {
    question: 'Eşiksiz veya tek cam duşakabinlerde su dışarı taşar mı?',
    answer:
      'Banyonun meyil ve gider eğimi doğru ayarlandığında ve en az 90-110 cm genişlikte bir sabit cam panel kullanıldığında su dışarı taşmaz. Ferah, geniş ve engelsiz bir banyo alanı oluşturur.',
  },
  {
    question: 'Kireç ve su lekesi tutmayan camlar temizlikte nasıl fark yaratır?',
    answer:
      'Özel yüzey kaplaması sayesinde su damlacıkları cam üzerinde tutunamadan aşağı kayar. Kireç ve sabun kalıntıları camın gözeneklerine işlemez; her duş sonrası basit bir çekçek darbesiyle camlar ilk günkü gibi pırıl pırıl kalır.',
  },
]

export default function BanyoTrendleriReportPage() {
  const articleSchema = getArticleSchema({
    title: '2026 Türkiye Lüks Banyo Dekorasyon ve Duşakabin Trendleri Rehberi',
    description:
      '2026 banyo tasarımında öne çıkan 6mm temperli cam sistemleri, solmayan profil renkleri ve eşiksiz duş çözümleri rehberi.',
    image: `${SITE_URL}/images/og-default.jpg`,
    publishedAt: '2026-08-01T10:00:00+03:00',
    url: '/banyo-trendleri-2026',
    authorName: 'ERAYDUŞ İmalat & Tasarım Ekibi',
  })

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Koleksiyonlar', url: '/urunler' },
    { name: '2026 Banyo Trendleri', url: '/banyo-trendleri-2026' },
  ])

  const faqSchema = getFAQSchema(trendFaqs)
  const graphSchema = getGraphSchema([articleSchema, breadcrumbSchema, faqSchema])

  const citationCodeHtml = `<a href="https://www.eraydus.net/urunler" target="_blank" rel="noopener">ERAYDUŞ 2026 Banyo ve Duşakabin Trendleri</a>`
  const citationCodeMarkdown = `[ERAYDUŞ 2026 Banyo ve Duşakabin Trendleri](https://www.eraydus.net/urunler)`

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(graphSchema) }}
      />

      <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground">
        
        {/* BREADCRUMB */}
        <div className="container mx-auto max-w-[1200px] px-6 mb-8">
          <nav className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-champagne transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <Link href="/urunler" className="hover:text-champagne transition-colors">Koleksiyonlar</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">2026 Banyo Trendleri</span>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="container mx-auto max-w-[1200px] px-6 pb-16 border-b border-border/40">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs font-semibold uppercase tracking-wider mb-6 border border-champagne/20">
            <Sparkles className="w-3.5 h-3.5" />
            2026 Banyo & Dekorasyon Rehberi
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
            2026 Banyo Dekorasyon & <span className="font-semibold text-champagne">Duşakabin Trendleri</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
            Banyosunu yenilemek veya yeni evine modern bir hava katmak isteyenler için 2026&apos;nın en popüler duşakabin modelleri, renk tercihleri ve <strong>6mm temperli emniyet camı</strong> avantajları.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/905548830071?text=Merhaba,%202026%20banyo%20trendleri%20modelleri%20ve%20fiyatları%20hakkında%20bilgi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold text-sm rounded-xl hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp ile Fiyat & Bilgi Al
            </a>

            <Link
              href="/tasarla"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-champagne text-foreground font-semibold text-sm rounded-xl hover:bg-champagne/90 transition-all shadow-md"
            >
              <Ruler className="w-4 h-4" />
              Kendi Ölçünle Fiyat Hesapla
            </Link>

            <a
              href="tel:+903123507939"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-muted text-foreground font-medium text-sm rounded-xl hover:bg-muted/80 transition-colors border border-border"
            >
              <Phone className="w-4 h-4 text-champagne" />
              (0312) 350 79 39
            </a>
          </div>
        </section>

        {/* 4 CORE TREND STATS */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Palette className="w-5 h-5" />
              </div>
              <span className="text-3xl font-bold text-champagne">%84</span>
              <h3 className="text-base font-semibold text-foreground mt-2">Mat Siyah & Gold Profil</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                2026 banyo projelerinde en çok tercih edilen, solmayan ve paslanmayan profil renkleri.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Shield className="w-5 h-5" />
              </div>
              <span className="text-3xl font-bold text-champagne">6 mm</span>
              <h3 className="text-base font-semibold text-foreground mt-2">Temperli Emniyet Camı</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Kırılmaya karşı 5 kat dayanıklı, hafif ve rijitliğiyle ideal cam standardı.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-3xl font-bold text-champagne">%92</span>
              <h3 className="text-base font-semibold text-foreground mt-2">Kolay Temizlenen Cam</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Su damlacıklarının kaymasını sağlayarak kireç lekesi oluşumunu engelleyen cam yapısı.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Maximize2 className="w-5 h-5" />
              </div>
              <span className="text-3xl font-bold text-champagne">Eşiksiz</span>
              <h3 className="text-base font-semibold text-foreground mt-2">Zemine Sıfır Banyo</h3>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Eski yüksek duş tekneleri yerine doğrudan banyo seramiği üzerine kurulan ferah çözümler.
              </p>
            </div>
          </div>
        </section>

        {/* 2026 TREND HIGHLIGHT ARTICLES */}
        <section className="py-12 container mx-auto max-w-[1000px] px-6">
          <div className="space-y-12">
            
            {/* Trend 1 */}
            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50">
              <span className="text-xs font-semibold text-champagne uppercase tracking-widest block mb-2">Trend #1</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                1. Mat Siyah ve Fırçalanmış Gold Profil Şıklığı
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">
                Eskiden her banyoda gördüğümüz parlak krom kaplamalar artık yerini mat siyah, antrasit ve fırçalanmış altın (gold) profillere bıraktı. Erayduş olarak profillerimizde kullandığımız fırınlanmış özel boya teknolojisi sayesinde, profiller banyo neminden etkilenmez, soyulma yapmaz ve rengini yıllarca korur.
              </p>
              <Link
                href="/urunler"
                className="inline-flex items-center text-sm font-semibold text-champagne hover:underline"
              >
                Siyah & Gold Duşakabin Modellerini İnceleyin <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Trend 2 */}
            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50">
              <span className="text-xs font-semibold text-champagne uppercase tracking-widest block mb-2">Trend #2</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                2. Neden 6mm Temperli Cam En İdeal Tercihtir?
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">
                Banyoda güvenlik her şeyden önemlidir. Fabrikamızda işlenen 6mm Şişecam temperli güvenlik camları, darbelere karşı 5 kat güçlendirilmiştir. Hem banyonuzda tok ve sağlam bir duruş sergiler hem de kapı tekerleklerine aşırı yük bindirmediği için kabininiz yıllarca parmak ucuyla sessizce kayarak açılıp kapanır.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                  <span>Kırılmaya karşı 5 kat dayanıklı emniyet camı</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-foreground font-medium">
                  <CheckCircle2 className="w-4 h-4 text-champagne shrink-0" />
                  <span>Şeffaf, Füme, Bronz, Aynalı & Kumlama seçenekleri</span>
                </div>
              </div>
            </div>

            {/* Trend 3 */}
            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50">
              <span className="text-xs font-semibold text-champagne uppercase tracking-widest block mb-2">Trend #3</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                3. Yüksek Duş Teknelerine Veda: Eşiksiz & Tek Cam Çözümler
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">
                2026 banyolarında sararan, temizliği zor ve basamaklı yüksek duş tekneleri tamamen terk ediliyor. Doğrudan banyo zemin seramiği üzerine monte edilen eşiksiz sürgülü kabinler veya sabit tek cam paneller banyoyu iki kat daha geniş ve ferah gösteriyor.
              </p>
              <Link
                href="/urunler"
                className="inline-flex items-center text-sm font-semibold text-champagne hover:underline"
              >
                Eşiksiz Duşakabin Çözümlerini Görün <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            {/* Trend 4 */}
            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50">
              <span className="text-xs font-semibold text-champagne uppercase tracking-widest block mb-2">Trend #4</span>
              <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
                4. Özel Ölçü İmalat & Ankara İçi Ücretsiz Keşif
              </h2>
              <p className="text-muted-foreground leading-relaxed font-light mb-4">
                Hazır paket kabinler her banyonun duvarına tam oturmaz, zamanla su sızdırma yapar. Erayduş olarak banyonuzun ölçüsünü lazerle milimetrik olarak alıyor, Siteler fabrikamızda banyonuza özel sıfır hata ile üretiyoruz. 2 Yıl Resmi İmalatçı Garantimizle montajı aynı hafta tamamlıyoruz.
              </p>
              <div className="flex flex-wrap gap-4 pt-2">
                <a
                  href="https://wa.me/905548830071?text=Merhaba,%20Ankara%20özel%20ölçü%20duşakabin%20ücretsiz%20keşif%20randevusu%20almak%20istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold text-champagne hover:underline"
                >
                  <MessageCircle className="w-4 h-4" />
                  Ücretsiz Lazer Ölçüm Randevusu Al →
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* CITATION ENGINE FOR BLOGS & MEDIA */}
        <section className="py-16 bg-muted/30 border-y border-border/50 my-16">
          <div className="container mx-auto max-w-[1000px] px-6">
            <div className="flex items-center gap-3 text-champagne mb-4">
              <Share2 className="w-6 h-6" />
              <span className="text-xs font-semibold uppercase tracking-widest">
                Basın, Blog & İçerik Üreticileri İçin Kaynak Bağlantısı
              </span>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-foreground">
              Sitenizde Kaynak Gösterin & Doğrudan Bağlantı Ekleyin
            </h2>
            <p className="text-muted-foreground text-sm mt-2 max-w-2xl font-light">
              Web sitenizde, dekorasyon blogunuzda veya haber sitenizde 2026 banyo trendlerini kaynak gösterirken aşağıdaki resmi HTML/Markdown bağlantı kodlarını doğrudan kullanabilirsiniz:
            </p>

            <div className="mt-8 space-y-6">
              <div className="p-5 rounded-2xl bg-card border border-border">
                <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-champagne" /> HTML Alıntı Kodu
                </span>
                <pre className="p-3.5 rounded-xl bg-background text-xs font-mono text-emerald-400 overflow-x-auto border border-border/40">
                  {citationCodeHtml}
                </pre>
              </div>

              <div className="p-5 rounded-2xl bg-card border border-border">
                <span className="text-xs font-mono font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Code className="w-4 h-4 text-champagne" /> Markdown Alıntı Kodu
                </span>
                <pre className="p-3.5 rounded-xl bg-background text-xs font-mono text-emerald-400 overflow-x-auto border border-border/40">
                  {citationCodeMarkdown}
                </pre>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
              <ShieldCheck className="w-4 h-4 text-champagne" />
              <span>ERAYDUŞ, dekorasyon ve banyo tasarımı odaklı içerik üreticilerine veri ve araştırma paylaşım izni sunar.</span>
            </div>
          </div>
        </section>

        {/* FAQ ACCORDION SECTION */}
        <section className="py-16 container mx-auto max-w-[1000px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-champagne mb-2">
              <HelpCircle className="w-4 h-4" />
              Merak Edilenler
            </span>
            <h2 className="text-3xl font-light tracking-tight text-foreground">
              2026 Trendleri <span className="font-semibold">Sıkça Sorulan Sorular</span>
            </h2>
          </div>

          <div className="space-y-4">
            {trendFaqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-border/60 rounded-2xl bg-card p-6 cursor-pointer transition-all duration-200 [&[open]]:border-champagne/50 shadow-sm"
              >
                <summary className="flex items-center justify-between font-medium text-base md:text-lg text-foreground list-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 transition-transform duration-200 group-open:rotate-180 text-champagne">
                    ↓
                  </span>
                </summary>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground pt-4 border-t border-border/40 font-light">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* BOTTOM HIGH CONVERSION CTA */}
        <section className="container mx-auto max-w-[1200px] px-6 mt-8">
          <div className="p-8 md:p-14 rounded-3xl bg-foreground text-background text-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10 max-w-2xl mx-auto">
              <span className="inline-block text-xs uppercase tracking-widest text-champagne font-bold mb-3">
                Banyonuzu 2026 Trendlerine Dönüştürün
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
                Özel Ölçü ile <span className="font-semibold text-champagne">Hayalinizdeki Kabini Tasarlayın</span>
              </h2>
              <p className="text-background/80 text-sm md:text-base font-light mb-8 leading-relaxed">
                6mm temperli cam modellerimizi ve solmayan profil seçeneklerimizi inceleyin, anında net fiyat teklifi alın.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/tasarla"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-champagne text-foreground font-semibold text-sm hover:bg-champagne/90 transition-all shadow-lg hover:scale-105 active:scale-95"
                >
                  <Ruler className="w-4 h-4" />
                  3D Konfigüratör ile Tasarla
                </Link>
                <a
                  href="https://wa.me/905548830071?text=Merhaba,%202026%20trend%20duşakabin%20modelleri%20için%20fiyat%20teklifi%20almak%20istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-all shadow-lg"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Destek
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
