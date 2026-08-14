import type { Metadata } from 'next'
import Link from 'next/link'
import {
  MapPin,
  PhoneCall,
  Star,
  ShieldCheck,
  ArrowRight,
  Ruler,
  Sparkles,
  MessageCircle,
  Phone,
  HelpCircle,
  Droplets
} from 'lucide-react'
import { getBreadcrumbSchema, getLocalBusinessSchema, getFAQSchema, getGraphSchema } from '@/lib/seo/schemas'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'Ankara Çankaya Duşakabin İmalat & Montajı | Ücretsiz Keşif - ERAYDUŞ',
  description:
    'Çankaya, Gaziosmanpaşa, Ümitköy, Çukurambar, Ayrancı ve Yaşamkent için özel ölçü 6mm temperli cam duşakabin imalatı. Aynı gün ücretsiz yerinde keşif, 2 yıl üretici garantisi.',
  keywords:
    'çankaya duşakabin, ankara çankaya duşakabin firmaları, çankaya duşakabin fiyatları, gaziosmanpaşa duşakabin, ümitköy duşakabin montajı, çukurambar duşakabin, ayrancı duşakabin tamiri, turan güneş duşakabin, yaşamkent duşakabin, oran şehri duşakabin, banyo cam kabin ankara',
  alternates: {
    canonical: `${SITE_URL}/ankara-cankaya-dusakabin`,
  },
  openGraph: {
    title: 'Ankara Çankaya Duşakabin İmalat & Montajı | ERAYDUŞ',
    description:
      'Çankaya bölgesine özel lüks 6mm temperli cam duşakabin modelleri ve yerinde ücretsiz keşif servisi.',
    url: `${SITE_URL}/ankara-cankaya-dusakabin`,
    siteName: 'ERAYDUŞ Ankara',
    images: [{ url: `${SITE_URL}/images/og-default.jpg`, width: 1200, height: 630, alt: 'Ankara Çankaya Duşakabin' }],
  },
}

const cankayaFaqs = [
  {
    question: 'Çankaya bölgesinde adrese ücretsiz keşif ve ölçü alma hizmeti yapıyor musunuz?',
    answer:
      'Evet. Çankaya, Gaziosmanpaşa, Ümitköy, Çukurambar, Ayrancı, Yaşamkent, Turan Güneş ve tüm Çankaya mahallelerinde adresinize gelerek uzman ekibimizle banyonuzun ölçüsünü tamamen ücretsiz alıyoruz.',
  },
  {
    question: 'Çankaya için duşakabin imalatı ve montajı ne kadar sürer?',
    answer:
      'Ölçü onayının ardından Siteler fabrikamızda 6mm temperli cam ve paslanmaz profil kesimi ortalama 3-5 iş günü içinde tamamlanır. Kendi uzman montaj ekibimiz randevu saatinizde gelerek 1-2 saat içinde montajı temiz şekilde bitirir.',
  },
  {
    question: 'Eski duşakabinimi söküp yeni kabini takıyor musunuz?',
    answer:
      'Evet. Çankaya montaj hizmetimiz kapsamında talep etmeniz durumunda eski duşakabininizi seramiklere zarar vermeden söküyor, zemin temizliğini yapıp yeni kabininizi monte ediyoruz.',
  },
  {
    question: 'Hangi cam modelleri ve profil renklerini tercih edebilirim?',
    answer:
      'Tüm modellerimizde 6mm darbe dayanımlı temperli güvenlik camı kullanılır. Şeffaf Extra Clear, Füme Cam, Bronz Cam, Aynalı Cam ve Kumlama (buzlu özel desen) cam seçenekleri ile Mat Siyah, Parlak Krom, Gold ve Mat Beyaz profil renklerimiz mevcuttur.',
  },
  {
    question: 'Duşakabinlerinizin garanti süresi ve şartları nedir?',
    answer:
      'Tüm Erayduş kabinleri 2 Yıl Resmi Üretici Garantisi altındadır. İmalat, montaj, profil kaplaması ve su sızdırmazlık kusurları garanti kapsamında ücretsiz giderilir.',
  },
]

const popularModels = [
  {
    title: 'Sürgülü Duşakabinler',
    desc: 'Yumuşak kayar rulman sistemi, yer tasarruflu ve modern banyolar için ideal.',
    tag: 'En Çok Tercih Edilen',
    link: '/urunler',
  },
  {
    title: 'Menteşeli Lüks Kabinler',
    desc: 'Paslanmaz pirinç menteşe mekanizması, geniş açılır ferah banyo tasarımı.',
    tag: 'Premium Seri',
    link: '/urunler',
  },
  {
    title: 'Mat Siyah Profilli Kabinler',
    desc: 'Elektrostatik fırın boyalı, solmaz ve leke tutmaz modern antrasit/siyah profil.',
    tag: 'Mimari Trend',
    link: '/urunler',
  },
  {
    title: 'Tek Cam Duşakabinler',
    desc: 'Eşiksiz, doğrudan banyo zeminine oturan minimalist ve engelsiz tek cam duş alanı.',
    tag: 'Minimalist',
    link: '/urunler',
  },
]

const cankayaDistricts = [
  'Ümitköy',
  'Gaziosmanpaşa (GOP)',
  'Çukurambar',
  'Ayrancı',
  'Yaşamkent',
  'Turan Güneş Bulvarı',
  'Oran Şehri',
  'Birlik Mahallesi',
  'Kavaklıdere',
  'Mustafa Kemal Mahallesi',
  'Balgat',
  'Beytepe',
  'Dikmen',
  'Kırkkonaklar',
  'Bahçelievler',
  'Söğütözü',
  'İncek Girişi',
  'Yüzüncüyıl',
  'Maltepe',
  'Kızılay Çevresi',
  'Beştepe',
  'Ahlatlıbel',
]

export default function CankayaDusakabinPage() {
  const localGeoData = {
    phone: '+90 312 350 79 39',
    email: 'info@eraydus.net',
    address: {
      streetAddress: 'Malazgirt Caddesi No:121/1B, Siteler',
      addressLocality: 'Altındağ',
      addressRegion: 'Ankara',
      postalCode: '06160',
      addressCountry: 'TR',
    },
    geo: {
      position: '39.9570;32.8980',
    },
    localBusiness: {
      openingHours: 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
      priceRange: '₺₺',
      areaServed: [
        'Çankaya',
        'Ümitköy',
        'Gaziosmanpaşa',
        'Çukurambar',
        'Ayrancı',
        'Yaşamkent',
        'Balgat',
        'Beytepe',
        'Oran',
      ],
    },
  }

  const localBusinessSchema = getLocalBusinessSchema(localGeoData)
  const breadcrumbs = [
    { name: 'Ana Sayfa', url: '/' },
    { name: 'Koleksiyonlar', url: '/urunler' },
    { name: 'Ankara Çankaya Duşakabin', url: '/ankara-cankaya-dusakabin' },
  ]
  const breadcrumbSchema = getBreadcrumbSchema(breadcrumbs)
  const faqSchema = getFAQSchema(cankayaFaqs)
  const graphSchema = getGraphSchema([localBusinessSchema, breadcrumbSchema, faqSchema])

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
            <span className="text-foreground font-semibold">Ankara Çankaya Duşakabin</span>
          </nav>
        </div>

        {/* HERO SECTION */}
        <section className="container mx-auto max-w-[1200px] px-6 pb-16 border-b border-border/40">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-champagne/10 text-champagne text-xs font-semibold uppercase tracking-wider mb-6 border border-champagne/20">
            <MapPin className="w-3.5 h-3.5" />
            Ankara Çankaya Özel Bölge Servisi
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
            Ankara Çankaya <span className="font-semibold text-champagne">Duşakabin İmalat & Montajı</span>
          </h1>
          
          <p className="mt-6 text-lg md:text-xl text-muted-foreground font-light max-w-3xl leading-relaxed">
            Çankaya, Gaziosmanpaşa, Ümitköy, Çukurambar, Ayrancı ve Yaşamkent&apos;teki konut ve villalara özel <strong>6mm Şişecam temperli emniyet camı</strong> ile milimetrik duşakabin imalatı. Aynı gün ücretsiz keşif ve 2 yıl resmi imalatçı garantisi.
          </p>

          {/* ACTION BUTTONS */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://wa.me/905548830071?text=Merhaba,%20Çankaya%20bölgesinde%20özel%20ölçü%20duşakabin%20ücretsiz%20keşif%20ve%20fiyat%20teklifi%20almak%20istiyorum."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#25D366] text-white font-semibold text-sm rounded-xl hover:bg-[#20bd5a] transition-all shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
            >
              <MessageCircle className="w-5 h-5" />
              WhatsApp ile Çankaya Keşfi İste
            </a>

            <a
              href="tel:+903123507939"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-foreground text-background font-semibold text-sm rounded-xl hover:bg-foreground/90 transition-all shadow-md"
            >
              <Phone className="w-4 h-4 text-champagne" />
              (0312) 350 79 39
            </a>

            <Link
              href="/tasarla"
              className="inline-flex items-center justify-center gap-2 px-7 py-4 bg-muted text-foreground font-medium text-sm rounded-xl hover:bg-muted/80 transition-colors border border-border"
            >
              <Ruler className="w-4 h-4 text-champagne" />
              3D Konfigüratör ile Fiyat Al
            </Link>
          </div>
        </section>

        {/* 4 CORE VALUE PILLARS */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Ruler className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">Ücretsiz Yerinde Keşif</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Çankaya genelinde adresinize gelerek duvar dikliğini ve zemin eğimini uzman ekibimizle milimetrik ölçüyoruz.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">6mm Temperli Cam</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Şişecam lisanslı, kırılmaya karşı 5 kat dayanıklı rodajlı emniyet camları ile maksimum banyo güvenliği.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Droplets className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">%100 Su Sızdırmazlık</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mıknatıslı suluk fitilleri ve antibakteriyel nötr silikon çekim tekniğimiz ile banyonuzda su sızıntısına son.
              </p>
            </div>

            <div className="p-6 rounded-2xl border border-border/60 bg-card/60 shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-champagne/10 text-champagne flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground mb-1">2 Yıl Resmi Garanti</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Siteler fabrikamızın doğrudan imalatçı garantisiyle, montaj ve malzeme kaynaklı tüm arızalar ücretsiz giderilir.
              </p>
            </div>
          </div>
        </section>

        {/* POPULAR MODELS SHOWCASE */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1200px] px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
              <div>
                <span className="text-xs font-semibold text-champagne uppercase tracking-widest block mb-2">
                  Çankaya Projelerinde Popüler
                </span>
                <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
                  Öne Çıkan <span className="font-semibold">Duşakabin Modellerimiz</span>
                </h2>
              </div>
              <Link
                href="/urunler"
                className="mt-4 md:mt-0 inline-flex items-center text-sm font-semibold text-champagne hover:underline"
              >
                Tüm Koleksiyonu İnceleyin <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {popularModels.map((model, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border/60 bg-card flex flex-col justify-between hover:border-champagne/40 transition-all hover:shadow-lg"
                >
                  <div>
                    <span className="inline-block px-2.5 py-1 rounded-md bg-champagne/10 text-champagne text-[11px] font-semibold mb-4">
                      {model.tag}
                    </span>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{model.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6">{model.desc}</p>
                  </div>
                  <Link
                    href={model.link}
                    className="inline-flex items-center justify-between text-xs font-semibold text-foreground group-hover:text-champagne pt-4 border-t border-border/40"
                  >
                    <span>Modelleri Gör</span>
                    <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* STEP-BY-STEP PROCESS */}
        <section className="py-20 container mx-auto max-w-[1200px] px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne block mb-2">
              Kusursuz Süreç
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">
              3 Adımda <span className="font-semibold">Yeni Duşakabininiz Hazır</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50 relative">
              <span className="text-4xl font-mono font-bold text-champagne/30 block mb-4">01</span>
              <h3 className="text-xl font-semibold mb-2">Ücretsiz Yerinde Keşif</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Çankaya&apos;daki evinize gelerek duvar gönyesini ve zemin kotunu yerinde ölçüyor, banyonuza en uygun cam ve profil modelini belirliyoruz.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50 relative">
              <span className="text-4xl font-mono font-bold text-champagne/30 block mb-4">02</span>
              <h3 className="text-xl font-semibold mb-2">Özel Fabrika İmalatı</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Siteler tesisimizde 6mm temperli emniyet camları ve elektrostatik fırın boyalı profiller 3-5 iş günü içinde milimetrik üretilir.
              </p>
            </div>

            <div className="p-8 rounded-3xl border border-border/60 bg-surface/50 relative">
              <span className="text-4xl font-mono font-bold text-champagne/30 block mb-4">03</span>
              <h3 className="text-xl font-semibold mb-2">Garantili Montaj</h3>
              <p className="text-sm text-muted-foreground leading-relaxed font-light">
                Kendi kadrolu montaj ustalarımız kabininizi 1-2 saatte monte eder, sızdırmazlık testini yapıp 2 yıl resmi garanti belgenizi teslim eder.
              </p>
            </div>
          </div>
        </section>

        {/* VERIFIED GOOGLE 5-STAR REVIEWS FROM ÇANKAYA */}
        <section className="py-16 bg-muted/20 border-y border-border/40">
          <div className="container mx-auto max-w-[1200px] px-6">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex items-center text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs font-semibold text-foreground">5.0 / 5.0 Google Değerlendirmeleri</span>
            </div>
            
            <h2 className="text-3xl font-light tracking-tight mb-10">
              Çankaya Müşterilerimizin <span className="font-semibold">Gerçek Yorumları</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;Gaziosmanpaşa&apos;daki dairemiz için siyah profilli 6mm temperli duşakabin siparişi verdik. Erayduş ekibi aynı gün gelip ölçü aldı, 4. gün montajı sıfır hatayla tamamladı. İşçilik muazzam.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Mehmet B.</span>
                  <span className="text-muted-foreground">Gaziosmanpaşa, Çankaya</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;Ümitköy&apos;deki villa banyomuz için tavana kadar tek cam duşakabin yaptırdık. Su sızdırmazlığı kusursuz, kireç tutmaz cam yüzeyi sayesinde temizliği çok pratik. Kesinlikle tavsiye ederim.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Selin K.</span>
                  <span className="text-muted-foreground">Ümitköy, Çankaya</span>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-border/60 bg-card shadow-sm">
                <div className="flex items-center gap-1 text-amber-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed italic">
                  &ldquo;Turan Güneş Bulvarı üzerindeki evimize gold seri sürgülü kabin taktılar. Rayların akışı ipek gibi sessiz. Hem fiyat fabrika çıkışı olduğu için çok uygun hem de montaj ekibi çok saygılıydı.&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between text-xs">
                  <span className="font-bold text-foreground">Ahmet T.</span>
                  <span className="text-muted-foreground">Turan Güneş, Çankaya</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOCAL NEIGHBORHOOD NETWORK */}
        <section className="py-16 container mx-auto max-w-[1200px] px-6">
          <div className="p-8 md:p-12 rounded-3xl border border-border/60 bg-surface/40 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-light tracking-tight text-foreground mb-4">
              Hizmet Verdiğimiz <span className="font-semibold">Çankaya Semt & Mahalleleri</span>
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl font-light mb-8">
              Aşağıdaki tüm bölgelere aynı gün ücretsiz keşif araçlarımızla ulaşıyor, adreste yerinde keşif ve teknik danışmanlık sağlıyoruz:
            </p>

            <div className="flex flex-wrap gap-2.5">
              {cankayaDistricts.map((district, idx) => (
                <span
                  key={idx}
                  className="px-3.5 py-1.5 rounded-full bg-background border border-border/60 text-xs font-medium text-foreground hover:border-champagne/50 hover:text-champagne transition-colors cursor-default"
                >
                  ✓ {district} Duşakabin
                </span>
              ))}
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
              Çankaya Duşakabin <span className="font-semibold">Sıkça Sorulan Sorular</span>
            </h2>
          </div>

          <div className="space-y-4">
            {cankayaFaqs.map((faq, index) => (
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
                Çankaya Ücretsiz Keşif Fırsatı
              </span>
              <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-4">
                Banyonuz için <span className="font-semibold text-champagne">Özel Ölçü Teklifi Alın</span>
              </h2>
              <p className="text-background/80 text-sm md:text-base font-light mb-8 leading-relaxed">
                Çankaya&apos;daki eviniz için ücretsiz yerinde keşif randevusu oluşturun. 3-5 günde fabrikadan doğrudan montaj ayrıcalığını yaşayın.
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="https://wa.me/905548830071?text=Merhaba,%20Çankaya'daki%20banyom%20için%20ücretsiz%20keşif%20randevusu%20oluşturmak%20istiyorum."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-sm hover:bg-[#20bd5a] transition-all shadow-lg"
                >
                  <MessageCircle className="w-5 h-5" />
                  WhatsApp ile Hemen Randevu Al
                </a>
                <a
                  href="tel:+903123507939"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-champagne text-foreground font-semibold text-sm hover:bg-champagne/90 transition-all shadow-lg"
                >
                  <PhoneCall className="w-4 h-4" />
                  (0312) 350 79 39 Ara
                </a>
              </div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
