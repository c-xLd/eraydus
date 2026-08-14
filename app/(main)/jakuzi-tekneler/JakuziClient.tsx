'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Droplets, Wind, Sparkles, ShieldCheck,
  Waves, Ruler, ThermometerSun, Layers,
  Phone, ArrowDown, CheckCircle2, MessageCircle
} from 'lucide-react'

interface JakuziClientProps {
  content?: any
  products?: any[]
}

const iconMap: Record<string, any> = {
  'Hidromasaj Sistemi': Droplets,
  'Sessiz Motor': Wind,
  'Kromoterapi LED': Sparkles,
  'Antibakteriyel Akrilik': ShieldCheck,
  'Su Yalıtımı': Waves,
  'Özel Ölçü Üretim': Ruler,
  'Isı Yalıtımı': ThermometerSun,
  'Kaymaz Taban': Layers,
  'Ayarlanabilir Ayak Sistemi': Ruler,
  'Metal Ayak Desteği': Layers,
  'Kolay Temizlik': Sparkles,
  'Sifon Hediyeli': Droplets,
  '1. Sınıf Dökme Akrilik': ShieldCheck,
  'Ergonomik Yüzey': Waves,
  'Güçlendirilmiş Gövde': Layers,
  'Kolay Bakım': Sparkles,
}

const REAL_TEKNE_FEATURES = [
  {
    title: 'Ayarlanabilir Ayak Sistemi',
    desc: 'Zemine göre kolayca teraziye getirilebilen paslanmaz ayak mekanizması.'
  },
  {
    title: 'Metal Ayak Karkası',
    desc: 'Yüksek ağırlık taşıma kapasiteli, esnemeyen güçlendirilmiş gövde desteği.'
  },
  {
    title: 'Kolay Temizlik Yüzeyi',
    desc: 'Pürüzsüz akrilik dokusu sayesinde kireç ve leke tutmayan hijyenik yapı.'
  },
  {
    title: 'Sifon Hediyeli',
    desc: 'Tam sızdırmaz krom kapaklı tahliye sifonu ürünle birlikte teslim edilir.'
  }
]

const REAL_KUVET_FEATURES = [
  { title: '1. Sınıf Dökme Akrilik', desc: 'Sararma yapmayan, ısıyı uzun süre muhafaza eden yüksek kaliteli akrilik.' },
  { title: 'Ergonomik Yüzey', desc: 'Vücut anatomisine uygun konforlu ve kaymaz banyo iç tasarımı.' },
  { title: 'Güçlendirilmiş Gövde', desc: 'Fiberglas ve metal profil takviyeli ekstra dayanıklı karkas.' },
  { title: 'Kolay Bakım & Hijyen', desc: 'Antibakteriyel yüzeyi ile zahmetsiz günlük temizlik.' }
]

const REAL_JAKUZI_FEATURES = [
  { title: 'Hidromasaj Sistemi', desc: 'Su ve hava jetleriyle vücut kaslarını gevşeten rahatlatıcı SPA masajı.' },
  { title: 'Sessiz Motor Teknolojisi', desc: 'Düşük desibelde yüksek basınç sunan uzun ömürlü masaj motoru.' },
  { title: 'Kromoterapi LED Aydınlatma', desc: 'Banyonuza terapi etkisi sunan renkli su altı aydınlatma sistemi.' },
  { title: 'Antibakteriyel Akrilik Gövde', desc: 'Leke, kireç ve bakteri barındırmayan 1. sınıf hijyenik yüzey.' }
]

const REAL_TEKNE_MODELS = [
  {
    name: 'Oval Duş Teknesi',
    dims: '80×80 / 90×90 / 100×100 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482175-oval-dus-teknesi.webp',
    specs: ['1. Sınıf Dökme Akrilik', 'Kaymaz Yüzey Dokusu', 'Metal Ayak Karkaslı', 'Sifon Hediyeli']
  },
  {
    name: 'Oval Oturmalı Duş Teknesi',
    dims: '90×90 / 100×100 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482452-oval-oturmali-dus-teknesi.webp',
    specs: ['Ergonomik Oturma Alanı', '1. Sınıf Dökme Akrilik', 'Güçlendirilmiş Taban', 'Sifon Hediyeli']
  },
  {
    name: 'Asimetrik Oval Duş Teknesi',
    dims: '90×110 / 90×120 / 100×120 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597480708-asimetrik-oval-dus-teknesi.webp',
    specs: ['Sol / Sağ Yön Seçeneği', '1. Sınıf Akrilik', 'Ayarlanabilir Ayak Sistemi', 'Sifon Hediyeli']
  },
  {
    name: 'Asimetrik Oval Oturmalı Duş Teknesi',
    dims: '90×110 / 90×120 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481092-asimetrik-oval-oturmali-dus-teknesi.webp',
    specs: ['Entegre Oturma Basamağı', 'Sol / Sağ Uyumlu', 'Dökme Akrilik Gövde', 'Sifon Hediyeli']
  },
  {
    name: 'Dikdörtgen Duş Teknesi',
    dims: '70×90 / 80×100 / 80×120 / 90×140 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481667-dikdortgen-dus-teknesi.webp',
    specs: ['Geniş Kullanım Alanı', 'Leke Ve Sararma Karşıtı', 'Metal Destek Profil', 'Sifon Hediyeli']
  }
]

const REAL_KUVET_MODELS = [
  {
    name: 'Oval Küvet',
    dims: '140×140 / 150×150 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597482452-oval-oturmali-dus-teknesi.webp',
    specs: ['Ergonomik Oval Form', '1. Sınıf Dökme Akrilik', 'Isı Muhafazalı Gövde', 'Taşmalı Sifon Sistemi']
  },
  {
    name: 'Dikdörtgen Küvet',
    dims: '150×70 / 160×70 / 170×70 / 180×80 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481667-dikdortgen-dus-teknesi.webp',
    specs: ['Klasik Dikdörtgen Tasarım', 'Ekstra Derinlik', 'Fiberglas Takviyeli', 'Kolay Temizlik']
  },
  {
    name: 'Asimetrik Oval Küvet',
    dims: '150×100 / 160×105 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597480708-asimetrik-oval-dus-teknesi.webp',
    specs: ['Asimetrik Köşe Yerleşimi', 'Geniş İç Hacim', 'Antibakteriyel Akrilik', 'Sağ / Sol Açılı']
  },
  {
    name: 'Dikdörtgen Oturmalı Küvet',
    dims: '120×70 / 130×70 / 140×70 cm',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785597481092-asimetrik-oval-oturmali-dus-teknesi.webp',
    specs: ['Entegre Oturma Basamağı', 'Kompakt Banyo Çözümü', 'Esnemez Gövde', '1. Sınıf Akrilik']
  }
]

const REAL_JAKUZI_MODELS = [
  {
    name: 'Sistem 1 Jakuzi',
    dims: 'Her Ölçüye Uygulanabilir',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/projects/projects/karma-galeri-rezidans-projesi-10-1785169082032.jpg',
    specs: ['Akrilik Malzeme', 'Yanlardan 6 Adet Jakuzi Jeti', '0,90 hp Jakuzi Motoru', 'Kumandalı Gider & Su Basınç Ayarı', 'Paslanmaz Metal Destekli Gövde']
  },
  {
    name: 'Sistem 2 Jakuzi',
    dims: 'Her Ölçüye Uygulanabilir',
    image: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/projects/projects/karma-galeri-otel-projesi-1-1785169039271.jpg',
    specs: ['Akrilik Malzeme', 'Yanlardan 6, Tabandan 10 Adet Jet', '0,90 hp Jakuzi Motoru', 'Kumandalı Gider & Su Basınç Ayarı', 'Paslanmaz Metal Destekli Gövde']
  }
]

export function JakuziClient({ content = {}, products = [] }: JakuziClientProps) {
  const [activeTab, setActiveTab] = useState<'tekne' | 'kuvet' | 'jakuzi'>('tekne')
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const activeData = content?.[activeTab]

  // Features mapping per tab
  const rawFeatures = activeData?.features && Array.isArray(activeData.features) && activeData.features.length > 0
    ? activeData.features
    : (activeTab === 'tekne' ? REAL_TEKNE_FEATURES : activeTab === 'kuvet' ? REAL_KUVET_FEATURES : REAL_JAKUZI_FEATURES)

  const features = rawFeatures.map((f: any) => ({
    ...f,
    icon: iconMap[f.title] || Sparkles
  }))

  // Filter real Supabase products for active tab
  const categoryFilters = {
    tekne: ['tekne', 'dus-teknesi', 'akrilik-tekne'],
    kuvet: ['kuvet', 'banyo-kuveti', 'akrilik-kuvet'],
    jakuzi: ['jakuzi', 'spa', 'hidromasaj']
  }
  const currentFilters = categoryFilters[activeTab]

  const realModelsFromDb = products.filter((p: any) => {
    const catSlug = p.categories?.slug || ''
    const catName = p.categories?.name?.toLowerCase() || ''
    const title = p.name?.toLowerCase() || ''
    return currentFilters.some(filter => catSlug.includes(filter) || catName.includes(filter) || title.includes(filter))
  })

  const realStaticFallbackModels = activeTab === 'tekne'
    ? REAL_TEKNE_MODELS
    : activeTab === 'kuvet'
    ? REAL_KUVET_MODELS
    : REAL_JAKUZI_MODELS

  const dbMappedModels = realModelsFromDb.map((p: any) => ({
    id: p.id,
    name: p.name,
    dims: p.dimensions || p.sku || 'Özel Ölçü',
    image: p.main_image_url || (Array.isArray(p.images) ? p.images[0] : null),
    specs: p.attributes ? Object.entries(p.attributes).map(([k, v]) => `${k}: ${v}`) : ['1. Sınıf Kalite Akrilik', 'Yerli Üretim']
  }))

  const hasUpdatedDbModels = activeData?.models && Array.isArray(activeData.models) && (
    (activeTab === 'tekne' && activeData.models.length >= 5) ||
    (activeTab === 'kuvet' && activeData.models.length >= 4) ||
    (activeTab === 'jakuzi' && activeData.models.length > 0)
  )

  // Combine DB products or content models from Supabase or real fallback models
  const displayModels = hasUpdatedDbModels
    ? activeData.models
    : (dbMappedModels.length > 0 ? dbMappedModels : realStaticFallbackModels)

  const stats = activeData?.stats || [
    { value: '1. Sınıf', label: 'Dökme Akrilik' },
    { value: 'Yerli', label: 'Üretim Kalitesi' },
    { value: activeTab === 'jakuzi' ? '2 Yıl' : 'Ayarlı', label: activeTab === 'jakuzi' ? 'Motor Garantisi' : 'Ayak Sistemi' },
    { value: activeTab === 'jakuzi' ? 'Sessiz' : 'Hediye', label: activeTab === 'jakuzi' ? 'Motor Teknolojisi' : 'Sifon Dahil' }
  ]

  const infoTitles = {
    tekne: { normal: '1. Sınıf Kalite', bold: 'Akrilik Duş Tekneleri' },
    kuvet: { normal: 'Klasik & Estetik', bold: 'Banyo Küvetleri' },
    jakuzi: { normal: 'Lüks & Rahatlık', bold: 'Hidromasajlı Jakuziler' }
  }

  const infoParagraphs = {
    tekne: [
      '1. sınıf kalite akrilik malzemeden üretilen, ayarlanabilir ayak sistemli, yerli üretim, banyo alanlarında kullanışlı ve sade bir çözüm sunar.',
      'Zemine göre ayarlanabilen pratik ayak sistemi ve destekleyici metal ayak karkası sayesinde esneme yapmaz, sağlam kullanım sunar.',
      'Pürüzsüz akrilik yüzeyi sayesinde günlük temizlikte pratik kullanım sağlar. Tüm duş teknelerimizde sızdırmaz tahliye sifonu ürünle birlikte hediyedir.'
    ],
    kuvet: [
      '1. sınıf dökme akrilikten üretilen banyo küvetleri, ısıyı uzun süre muhafaza eder, leke tutmaz ve estetik görünümüyle dinlendirici banyo keyfi sunar.',
      'Vücut anatomisine uygun ergonomik yatış yüzeyi ve ekstra güçlendirilmiş fiberglas karkası ile güvenli kullanım sağlar.',
      'Özel antibakteriyel yapısı sayesinde banyo sonrası temizliği pratikleştirir, sızdırmaz taşma ve tahliye sifonu sistemlerine sahiptir.'
    ],
    jakuzi: [
      'Günün yorgunluğunu banyonuzda spa konforuyla atın. Özel tasarlanmış hidromasaj jetleri ve sessiz motor teknolojimiz ile bedeninizi tazeleyin.',
      '1. sınıf dökme antibakteriyel akrilikten üretilen jakuzilerimiz, ısıyı uzun süre muhafaza eder ve sararma yapmaz.',
      'Kromoterapi LED aydınlatma, dokunmatik dijital kontrol paneli ve ozon dezenfeksiyon sistemleri ile kişiselleştirilebilir.'
    ]
  }

  const heroTitles = {
    tekne: { normal: 'Banyonuz İçin Kullanışlı &', bold: 'Akrilik Duş Tekneleri', desc: '1. sınıf kalite akrilik malzemeden üretilen, ayarlanabilir ayak sistemli, yerli üretim, banyo alanlarında kullanışlı ve sade bir çözüm sunar.' },
    kuvet: { normal: 'Banyonuzda Dinlendirici &', bold: 'Banyo Küvetleri', desc: '1. sınıf dökme akrilikten üretilen, ısı muhafazalı, ergonomik ve şık tasarımlı banyo küvetleri.' },
    jakuzi: { normal: 'Banyonuzda Lüks &', bold: 'Hidromasajlı Jakuziler', desc: 'Günlük stresi unutturan hidromasaj teknolojisi, 1. sınıf antibakteriyel akrilik gövde ve şık tasarımlar.' }
  }

  const heroBackgrounds = {
    tekne: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785599951282-dus-teknesi-hero.webp',
    kuvet: content?.hero?.kuvet_bg || 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80',
    jakuzi: content?.hero?.jakuzi_bg || 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80'
  }

  const infoImages: Record<string, string | null> = {
    tekne: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/1785601700432-shower-tray-in-luxury-bathroom-202608011927.webp',
    kuvet: activeData?.info_image || null,
    jakuzi: activeData?.info_image || null
  }

  const currentHero = content?.hero?.[activeTab] || heroTitles[activeTab]
  const currentInfoTitle = {
    normal: activeData?.info_title_normal || infoTitles[activeTab].normal,
    bold: activeData?.info_title_bold || infoTitles[activeTab].bold
  }
  const currentInfoP = [
    activeData?.info_p1 || infoParagraphs[activeTab][0],
    activeData?.info_p2 || infoParagraphs[activeTab][1],
    activeData?.info_p3 || infoParagraphs[activeTab][2]
  ]

  return (
    <main className="min-h-screen bg-white text-black">

      {/* COMPACT SHOWROOM HERO */}
      <section className="relative pt-28 pb-12 md:pt-36 md:pb-16 bg-black overflow-hidden select-none border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={heroBackgrounds[activeTab]}
            alt={currentHero.bold}
            fill
            priority
            quality={90}
            className="object-cover opacity-85 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/85 z-10" />
        </div>

        <div className="relative z-30 text-center px-6 max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0.01, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0.01, y: -10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-3 leading-[1.1]">
                {currentHero.normal}{' '}
                <span className="font-semibold bg-gradient-to-r from-champagne via-amber-200 to-champagne bg-clip-text text-transparent">
                  {currentHero.bold}
                </span>
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
                {currentHero.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* 3 Tab Switcher */}
          <div className="mt-8 inline-flex bg-white/[0.06] backdrop-blur-2xl border border-white/[0.1] rounded-full p-1 shadow-xl">
            {(['tekne', 'kuvet', 'jakuzi'] as const).map(tab => {
              const labelMap = { tekne: 'Duş Tekneleri', kuvet: 'Küvetler', jakuzi: 'Jakuziler' }
              const isActive = activeTab === tab

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className="relative px-5 md:px-7 py-2.5 text-xs md:text-sm font-medium tracking-wide transition-colors duration-300 rounded-full z-10 select-none"
                >
                  {isActive && (
                    <motion.div
                      layoutId="hero-tab-pill"
                      className="absolute inset-0 bg-white rounded-full shadow-md"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span className={`relative z-10 ${isActive ? 'text-black font-semibold' : 'text-white/60 hover:text-white'}`}>
                    {labelMap[tab]}
                  </span>
                </button>
              )
            })}
          </div>

          {/* Compact Stats Bar */}
          <motion.div
            key={`stats-${activeTab}`}
            initial={{ opacity: 0.01, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto border-t border-white/10 pt-6"
          >
            {stats.map((s: any) => (
              <div key={s.label} className="text-center">
                <div className="text-xl md:text-2xl font-light text-white mb-0.5 tracking-tight">{s.value}</div>
                <div className="text-[9px] text-white/50 uppercase tracking-[0.15em] font-mono">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* MAIN CONTENT AREA */}
      <div ref={contentRef}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0.01 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0.01 }}
            transition={{ duration: 0.4 }}
          >
            {/* Architectural Info Section */}
            <section className="py-20 md:py-28 px-6 bg-white border-b border-black/5">
              <div className="container mx-auto px-4 md:px-6 max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-3 block font-mono">
                      {activeTab === 'jakuzi' ? 'SPA & HİDROMASAJ' : activeTab === 'kuvet' ? 'DÖKME AKRİLİK KÜVET' : 'MİMARİ DUŞ TEKNESİ'}
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight text-black leading-[1.1]">
                      {currentInfoTitle.normal} <br />
                      <span className="font-semibold">{currentInfoTitle.bold}</span>
                    </h2>

                    <div className="space-y-5 mt-8 text-base md:text-lg font-light text-black/70 leading-relaxed">
                      {currentInfoP.map((p, idx) => (
                        <p key={idx}>{p}</p>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-10 border-t border-black/10 pt-8">
                      {stats.map((stat: any) => (
                        <div key={stat.label}>
                          <div className="text-2xl font-semibold text-black mb-0.5">{stat.value}</div>
                          <div className="text-xs text-black/50 font-medium">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual Quality Badge Box */}
                  <div className="relative">
                    <div className="aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-black/10 relative shadow-sm">
                      {infoImages[activeTab] ? (
                        <Image
                          src={infoImages[activeTab]!}
                          alt={currentInfoTitle.bold}
                          fill
                          sizes="(max-width: 1024px) 100vw, 50vw"
                          className="object-cover transition-transform duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center p-8 text-center">
                          <div className="text-center">
                            <Droplets className="w-14 h-14 mx-auto mb-4 text-black opacity-80" />
                            <h3 className="text-xl font-semibold text-black tracking-tight">{currentInfoTitle.bold}</h3>
                            <p className="text-xs text-black/60 mt-2 font-light max-w-xs mx-auto">
                              1. Sınıf Dökme Akrilik, Paslanmaz Destek Karkası ve Yerli İmalat Garantisi.
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-6 -left-6 bg-black text-white p-6 rounded-2xl shadow-xl max-w-[240px] z-20">
                      <div className="text-3xl font-semibold mb-1 text-champagne">100%</div>
                      <div className="text-xs font-medium text-white/80">Yerli İmalat & Sızdırmazlık Garantisi</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-20 md:py-28 bg-neutral-50/50 px-6 border-b border-black/5">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-14">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-2 block font-mono">
                    MÜHENDİSLİK STANDARTLARI
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black">
                    Öne Çıkan <span className="font-semibold">Teknik Özellikler</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature: any, index: number) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08, duration: 0.5 }}
                      className="group p-6 rounded-2xl bg-white border border-black/10 hover:border-black/30 shadow-2xs hover:shadow-md transition-all duration-300"
                    >
                      <div className="w-12 h-12 rounded-xl bg-black text-white flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                        <feature.icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-base font-semibold text-black mb-2">{feature.title}</h3>
                      <p className="text-black/60 text-xs leading-relaxed font-light">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* Models Showcase Section */}
            <section className="py-20 md:py-28 bg-white px-6">
              <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-14">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/40 mb-2 block font-mono">
                    ÜRÜN KOLEKSİYONU
                  </span>
                  <h2 className="text-3xl md:text-4xl font-light tracking-tight text-black">
                    Popüler <span className="font-semibold">Modeller</span>
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                  {displayModels.map((m: any, i: number) => (
                    <motion.div
                      key={m.name || m.id || i}
                      initial={{ opacity: 0.01, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      className="group bg-neutral-50/50 rounded-3xl overflow-hidden border border-black/10 hover:border-black/30 transition-all duration-300 flex flex-col hover:shadow-md"
                    >
                      {m.image ? (
                        <div className="relative aspect-[4/3] overflow-hidden bg-neutral-200">
                          <Image
                            src={m.image}
                            alt={m.name}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-neutral-100 border-b border-black/5 flex items-center justify-center p-6 text-center">
                          <span className="text-xs text-black/40 font-mono uppercase tracking-widest">{m.name}</span>
                        </div>
                      )}
                      
                      <div className="p-6 flex flex-col flex-1">
                        <h3 className="text-lg font-semibold text-black mb-1">{m.name}</h3>
                        <p className="text-xs font-mono text-black/50 mb-4">{m.dims}</p>
                        
                        <ul className="space-y-2 mb-6 flex-1">
                          {(m.specs || []).map((s: string) => (
                            <li key={s} className="flex items-center gap-2.5 text-xs text-black/70 font-light">
                              <CheckCircle2 className="w-3.5 h-3.5 text-black shrink-0" />
                              <span>{s}</span>
                            </li>
                          ))}
                        </ul>

                        <a
                          href={`https://wa.me/905000000000?text=${encodeURIComponent(`Merhaba, ${m.name} modeli hakkında fiyat bilgisi almak istiyorum.`)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full py-3 px-4 rounded-xl bg-black text-white text-xs font-semibold text-center flex items-center justify-center gap-2 hover:bg-neutral-800 transition-colors shadow-2xs"
                        >
                          <MessageCircle className="w-4 h-4 text-green-400" />
                          <span>Fiyat & Keşif Bilgisi Al</span>
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CTA SECTION */}
      <section className="py-24 px-6 bg-black text-white text-center">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight mb-6">
            {content?.cta?.title_normal || 'Banyonuz İçin'} <span className="font-semibold text-champagne">{content?.cta?.title_bold || 'Özel İmalat Teklif Alın'}</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 font-light mb-10 max-w-2xl mx-auto">
            {content?.cta?.description || 'Özel ölçü tekne, küvet ve jakuzi projeleriniz için Ankara genelinde ücretsiz keşif ekibimizden teklif alın.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/tasarla"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shadow-lg"
            >
              Ölçüne Göre Tasarla
            </Link>
            <Link
              href="/iletisim"
              className="inline-flex items-center justify-center px-8 py-4 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-all"
            >
              İletişime Geçin
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
