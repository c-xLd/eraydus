'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Droplets, Wind, Sparkles, ShieldCheck,
  Waves, Ruler, ThermometerSun, Layers,
  ChevronRight, Phone, ArrowDown
} from 'lucide-react'

/* ══════════════════════════════════════════════
   DATA
   ══════════════════════════════════════════════ */

const jakuziFeatures = [
  { icon: Droplets, title: 'Hidromasaj Sistemi', desc: 'Su ve hava jetleriyle vücudun kaslarını rahatlatarak spa konforu sunan terapi sistemi.' },
  { icon: Wind, title: 'Sessiz Motor', desc: 'Maksimum performans, minimum ses. Yeni nesil motor teknolojisi ile huzurlu bir deneyim.' },
  { icon: Sparkles, title: 'Kromoterapi LED', desc: 'Farklı renk tonlarında LED aydınlatma ile görsel terapi ve ambiyans etkisi.' },
  { icon: ShieldCheck, title: 'Antibakteriyel Akrilik', desc: '%100 dökme akrilik gövde. Sararma yapmaz, kir tutmaz, kolay temizlenir.' },
]

const jakuziModels = [
  { name: 'Oval Jakuzi', image: 'https://images.unsplash.com/photo-1558211583-d26f610c1eb1?auto=format&fit=crop&q=80', dims: '130×130 / 140×140 / 150×150 cm', specs: ['6 Yönlü Hidromasaj', 'Pnömatik Kontrol', 'Baş Yastığı', 'Ön Panel Dahil'] },
  { name: 'Dikdörtgen Lüks Jakuzi', image: 'https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?auto=format&fit=crop&q=80', dims: '170×75 / 180×80 cm', specs: ['Çift Motor Sistemi', 'LED Kromoterapi', 'Dijital Kontrol Paneli', 'Su Isıtıcı Seçeneği'] },
  { name: 'Asimetrik Köşe Jakuzi', image: 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80', dims: '150×100 / 160×105 cm', specs: ['Oturma Alanlı Gövde', '8 Masaj Jeti', 'Ergonomik Kol Dayama', 'Paslanmaz Tutamak'] },
]

const tekneFeatures = [
  { icon: Waves, title: 'Su Yalıtımı', desc: 'Fayans altına su sızmasını engelleyen yekpare yapısıyla banyonuzu nemden korur.' },
  { icon: Ruler, title: 'Özel Ölçü Üretim', desc: 'Banyonuzun mimarisine tam oturan, santimetre hassasiyetinde özel ölçü üretim.' },
  { icon: ThermometerSun, title: 'Isı Yalıtımı', desc: 'Akrilik yapısı sayesinde ayak altında soğuk hissetmezsiniz, ısıyı tutar.' },
  { icon: Layers, title: 'Kaymaz Taban', desc: 'Güvenlik öncelikli tasarım. Kaymaz yüzey dokusuyla güvenli banyo deneyimi.' },
]

const tekneModels = [
  { name: 'Dikdörtgen Düz Tekne', image: 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80', dims: '70×90 / 80×100 / 80×120 / 80×140 cm', specs: ['Düz Zemin', 'Kaymaz Yüzey', 'Sifon Dahil', 'Kolay Montaj'] },
  { name: 'Kare Slim Tekne', image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80', dims: '80×80 / 90×90 / 100×100 cm', specs: ['5 cm İnce Profil', 'Minimal Tasarım', 'Güçlendirilmiş Taban', 'Paslanmaz Izgaralı Sifon'] },
  { name: 'Köşe Oturmalı Tekne', image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80', dims: '90×90 / 100×100 cm', specs: ['Entegre Oturma Alanı', 'Kaymaz Zemin', 'Yüksek Kenarlık', 'Sifon Dahil'] },
]

const jakuziStats = [
  { value: '500+', label: 'Mutlu Müşteri' },
  { value: '12', label: 'Farklı Model' },
  { value: '10 Yıl', label: 'Garanti' },
  { value: '%100', label: 'Dökme Akrilik' },
]

const tekneStats = [
  { value: '1000+', label: 'Kurulum' },
  { value: '8', label: 'Farklı Ölçü' },
  { value: '0', label: 'Sızıntı' },
  { value: 'Özel', label: 'Ölçü İmkânı' },
]

/* ══════════════════════════════════════════════
   COMPONENT
   ══════════════════════════════════════════════ */

export function JakuziClient() {
  const [activeTab, setActiveTab] = useState<'jakuzi' | 'tekne'>('jakuzi')
  const contentRef = useRef<HTMLDivElement>(null)

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const isJakuzi = activeTab === 'jakuzi'
  const features = isJakuzi ? jakuziFeatures : tekneFeatures
  const models = isJakuzi ? jakuziModels : tekneModels
  const stats = isJakuzi ? jakuziStats : tekneStats

  return (
    <main className="min-h-screen bg-background">

      {/* ═══════════════════════════════════════
          CINEMATIC HERO
          ═══════════════════════════════════════ */}
      <section className="relative h-screen min-h-[700px] flex flex-col items-center justify-center overflow-hidden">
        {/* Background image with parallax */}
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0"
            >
              <Image
                src={isJakuzi
                  ? 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80'
                  : 'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80'
                }
                alt={isJakuzi ? 'Jakuzi' : 'Duş Teknesi'}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
          </AnimatePresence>
          {/* Cinematic gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-10" />
          {/* Animated grain texture */}
          <div className="absolute inset-0 z-20 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")', backgroundSize: '128px 128px' }} />
        </div>

        {/* Content */}
        <div className="relative z-30 text-center px-6 max-w-5xl mx-auto">
          {/* Champagne accent line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-champagne to-transparent mx-auto mb-10"
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight text-white tracking-tight mb-6 leading-[0.95]">
                {isJakuzi ? (
                  <>Banyonuzda<br /><span className="font-medium bg-gradient-to-r from-champagne via-amber-200 to-champagne bg-clip-text text-transparent">Spa Konforu</span></>
                ) : (
                  <>Güvenli ve<br /><span className="font-medium bg-gradient-to-r from-champagne via-amber-200 to-champagne bg-clip-text text-transparent">Hijyenik Zemin</span></>
                )}
              </h1>
              <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto font-light leading-relaxed">
                {isJakuzi
                  ? 'Profesyonel hidromasaj sistemleri ile evinizde lüks spa deneyimi yaşayın.'
                  : 'Akrilik duş tekneleri ile su sızıntısına son verin, konforlu bir banyo deneyimi yaşayın.'}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Tab Switcher — Glassmorphic Pill */}
          <div className="mt-14 inline-flex bg-white/[0.06] backdrop-blur-2xl border border-white/[0.08] rounded-full p-1.5 shadow-2xl">
            {(['jakuzi', 'tekne'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="relative px-8 py-3.5 text-sm font-medium tracking-wide transition-colors duration-300 rounded-full z-10"
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="hero-pill"
                    className="absolute inset-0 bg-gradient-to-r from-champagne/90 to-amber-400/90 rounded-full shadow-lg shadow-champagne/20"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 ${activeTab === tab ? 'text-black' : 'text-white/60 hover:text-white'}`}>
                  {tab === 'jakuzi' ? 'Jakuziler' : 'Duş Tekneleri'}
                </span>
              </button>
            ))}
          </div>

          {/* Stats row */}
          <motion.div
            key={`stats-${activeTab}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
          >
            {stats.map((s, i) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl md:text-4xl font-light text-white mb-1">{s.value}</div>
                <div className="text-xs text-white/40 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <button onClick={scrollToContent} className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2 group">
          <span className="text-[10px] text-white/30 uppercase tracking-[0.3em] group-hover:text-white/60 transition-colors">Keşfet</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <ArrowDown className="w-4 h-4 text-white/30 group-hover:text-champagne transition-colors" />
          </motion.div>
        </button>
      </section>

      {/* ═══════════════════════════════════════
          CONTENT AREA
          ═══════════════════════════════════════ */}
      <div ref={contentRef}>
        <AnimatePresence mode="wait">
          {isJakuzi ? (
            <motion.div
              key="jakuzi-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* ── Jakuzi Info ── */}
              <section className="py-28 bg-surface px-6 overflow-hidden">
                <div className="container mx-auto max-w-[1200px]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="space-y-8">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-[2px] bg-champagne" />
                          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.25em]">Jakuzi Koleksiyonu</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extralight tracking-tight leading-tight">
                          Evinizde<br /><span className="font-medium text-champagne">Profesyonel Spa</span>
                        </h2>
                      </div>
                      <div className="space-y-5 text-muted-foreground font-light leading-[1.8] text-[15px]">
                        <p>Jakuziler, suyun masaj etkisini (hidromasaj) kullanarak vücudun kaslarını rahatlatır ve kan dolaşımını düzenler. Güçlü su ve hava jetleri sayesinde profesyonel spa terapisine benzer bir deneyimi evinizin banyosunda yaşarsınız.</p>
                        <p>Tüm modellerimiz <strong className="text-foreground font-medium">%100 dökme akrilikten</strong> üretilir. Zamanla sararma yapmaz, esnemez ve kolay temizlenir. Standart ölçülerin yanı sıra banyonuzun mimarisine uygun özel ölçü çözümler sunuyoruz.</p>
                        <p>Dijital kontrol panelleri, LED kromoterapi ve su ısıtma gibi ekstra donanımlar da isteğe bağlı olarak eklenebilir.</p>
                      </div>
                      <Link href="/iletisim" className="inline-flex items-center gap-2 text-champagne text-sm font-medium tracking-wide group">
                        Ücretsiz Danışmanlık Alın <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative">
                      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                        <Image src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80" alt="Lüks Jakuzi" fill className="object-cover" />
                      </div>
                      {/* Floating accent card */}
                      <div className="absolute -bottom-6 -left-6 bg-background/90 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl max-w-[220px]">
                        <div className="text-3xl font-light text-champagne mb-1">10 Yıl</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest">Garanti Süresi</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* ── Jakuzi Features ── */}
              <section className="py-28 bg-background px-6">
                <div className="container mx-auto max-w-[1200px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[2px] bg-champagne" />
                    <span className="text-champagne text-xs font-semibold uppercase tracking-[0.25em]">Özellikler</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-16">Her Modelde <span className="font-medium text-champagne">Standart</span></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {jakuziFeatures.map((f, i) => (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                        className="group relative bg-surface rounded-2xl p-8 border border-border hover:border-champagne/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-champagne/5"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/0 to-transparent group-hover:via-champagne transition-all duration-500 rounded-t-2xl" />
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-champagne/10 to-champagne/5 flex items-center justify-center mb-6 group-hover:from-champagne/20 group-hover:to-champagne/10 transition-colors duration-500">
                          <f.icon className="w-6 h-6 text-champagne" />
                        </div>
                        <h3 className="text-lg font-medium mb-3 tracking-tight">{f.title}</h3>
                        <p className="text-muted-foreground font-light leading-relaxed text-sm">{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Jakuzi Models ── */}
              <section className="py-28 bg-surface px-6">
                <div className="container mx-auto max-w-[1200px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[2px] bg-champagne" />
                    <span className="text-champagne text-xs font-semibold uppercase tracking-[0.25em]">Koleksiyon</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">Jakuzi <span className="font-medium text-champagne">Modelleri</span></h2>
                    <p className="text-muted-foreground text-sm max-w-md">Banyonuzun ölçülerine ve tarzına uygun farklı formlardaki jakuzi tasarımlarımız.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {jakuziModels.map((m, i) => (
                      <motion.div
                        key={m.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className="group bg-background rounded-3xl overflow-hidden border border-border hover:border-champagne/30 transition-all duration-500 hover:shadow-2xl hover:shadow-champagne/5 flex flex-col"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image src={m.image} alt={m.name} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-5 left-5">
                            <span className="bg-champagne text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">Jakuzi</span>
                          </div>
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <h3 className="text-xl font-medium mb-1 tracking-tight">{m.name}</h3>
                          <p className="text-xs text-champagne font-medium mb-6 tracking-wide">{m.dims}</p>
                          <ul className="space-y-3 mb-8 flex-1">
                            {m.specs.map(s => (
                              <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="w-1 h-1 rounded-full bg-champagne shrink-0" />{s}
                              </li>
                            ))}
                          </ul>
                          <Link href="/iletisim" className="w-full py-3.5 border border-border rounded-xl text-center text-sm font-medium hover:border-champagne hover:bg-champagne hover:text-black transition-all duration-300">
                            Fiyat Bilgisi Al
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          ) : (
            <motion.div
              key="tekne-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {/* ── Tekne Info ── */}
              <section className="py-28 bg-surface px-6 overflow-hidden">
                <div className="container mx-auto max-w-[1200px]">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative order-2 lg:order-1">
                      <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl">
                        <Image src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?auto=format&fit=crop&q=80" alt="Akrilik Duş Teknesi" fill className="object-cover" />
                      </div>
                      <div className="absolute -bottom-6 -right-6 bg-background/90 backdrop-blur-xl border border-border rounded-2xl p-6 shadow-2xl max-w-[220px]">
                        <div className="text-3xl font-light text-champagne mb-1">%0</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-widest">Su Sızıntısı</div>
                      </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="space-y-8 order-1 lg:order-2">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-8 h-[2px] bg-champagne" />
                          <span className="text-champagne text-xs font-semibold uppercase tracking-[0.25em]">Tekne Koleksiyonu</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-extralight tracking-tight leading-tight">
                          Güvenli ve<br /><span className="font-medium text-champagne">Hijyenik Zemin</span>
                        </h2>
                      </div>
                      <div className="space-y-5 text-muted-foreground font-light leading-[1.8] text-[15px]">
                        <p>Duş tekneleri, duşakabin altına yerleştirilen ve suyun doğrudan fayans altına sızmasını engelleyen akrilik zemin ürünleridir. Özellikle apartman dairelerinde alt kat sızıntı sorunlarını tamamen ortadan kaldırır.</p>
                        <p>Akrilik yapısı sayesinde ayağınıza <strong className="text-foreground font-medium">soğuk hissettirmez</strong>. Fayansa kıyasla çok daha hijyenik ve temizlemesi kolaydır. Kaymaz yüzey dokusu ile banyo güvenliğinizi en üst seviyeye taşır.</p>
                        <p>Dikdörtgen, kare ve köşe formlarında standart ölçü seçenekleri sunuyoruz. Banyonuz standart dışı bir ölçüdeyse özel üretim imkânımız da mevcuttur.</p>
                      </div>
                      <Link href="/iletisim" className="inline-flex items-center gap-2 text-champagne text-sm font-medium tracking-wide group">
                        Ücretsiz Danışmanlık Alın <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </section>

              {/* ── Tekne Features ── */}
              <section className="py-28 bg-background px-6">
                <div className="container mx-auto max-w-[1200px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[2px] bg-champagne" />
                    <span className="text-champagne text-xs font-semibold uppercase tracking-[0.25em]">Özellikler</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-extralight tracking-tight mb-16">Her Teknede <span className="font-medium text-champagne">Standart</span></h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {tekneFeatures.map((f, i) => (
                      <motion.div
                        key={f.title}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.12 }}
                        className="group relative bg-surface rounded-2xl p-8 border border-border hover:border-champagne/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-champagne/5"
                      >
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-champagne/0 to-transparent group-hover:via-champagne transition-all duration-500 rounded-t-2xl" />
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-champagne/10 to-champagne/5 flex items-center justify-center mb-6 group-hover:from-champagne/20 group-hover:to-champagne/10 transition-colors duration-500">
                          <f.icon className="w-6 h-6 text-champagne" />
                        </div>
                        <h3 className="text-lg font-medium mb-3 tracking-tight">{f.title}</h3>
                        <p className="text-muted-foreground font-light leading-relaxed text-sm">{f.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* ── Tekne Models ── */}
              <section className="py-28 bg-surface px-6">
                <div className="container mx-auto max-w-[1200px]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[2px] bg-champagne" />
                    <span className="text-champagne text-xs font-semibold uppercase tracking-[0.25em]">Koleksiyon</span>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-16">
                    <h2 className="text-3xl md:text-4xl font-extralight tracking-tight">Tekne <span className="font-medium text-champagne">Modelleri</span></h2>
                    <p className="text-muted-foreground text-sm max-w-md">Duşakabin altına uygulanabilen farklı form ve ölçü seçenekleri.</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {tekneModels.map((m, i) => (
                      <motion.div
                        key={m.name}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: i * 0.15 }}
                        className="group bg-background rounded-3xl overflow-hidden border border-border hover:border-champagne/30 transition-all duration-500 hover:shadow-2xl hover:shadow-champagne/5 flex flex-col"
                      >
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image src={m.image} alt={m.name} fill className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-5 left-5">
                            <span className="bg-white/90 backdrop-blur-sm text-black text-[9px] font-bold uppercase tracking-[0.2em] px-4 py-2 rounded-full shadow-lg">Tekne</span>
                          </div>
                        </div>
                        <div className="p-8 flex flex-col flex-1">
                          <h3 className="text-xl font-medium mb-1 tracking-tight">{m.name}</h3>
                          <p className="text-xs text-champagne font-medium mb-6 tracking-wide">{m.dims}</p>
                          <ul className="space-y-3 mb-8 flex-1">
                            {m.specs.map(s => (
                              <li key={s} className="flex items-center gap-3 text-sm text-muted-foreground">
                                <div className="w-1 h-1 rounded-full bg-champagne shrink-0" />{s}
                              </li>
                            ))}
                          </ul>
                          <Link href="/iletisim" className="w-full py-3.5 border border-border rounded-xl text-center text-sm font-medium hover:border-champagne hover:bg-champagne hover:text-black transition-all duration-300">
                            Fiyat Bilgisi Al
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ═══════════════════════════════════════
          CTA
          ═══════════════════════════════════════ */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&q=80" alt="CTA Background" fill className="object-cover" />
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
        </div>
        <div className="container mx-auto max-w-[800px] relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="w-12 h-[2px] bg-champagne mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight mb-6 leading-tight">
              Banyonuzu<br /><span className="font-medium text-champagne">Yenileme Zamanı</span>
            </h2>
            <p className="text-lg text-white/50 max-w-xl mx-auto mb-12 font-light">
              Mekanınıza en uygun jakuzi veya duş teknesini seçmek için uzman ekibimize danışın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/iletisim" className="bg-gradient-to-r from-champagne to-amber-400 text-black px-10 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-champagne/25 transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" /> Teklif İsteyin
              </Link>
              <Link href="/koleksiyonlar" className="px-10 py-4 rounded-full font-medium border border-white/20 text-white hover:border-champagne hover:text-champagne transition-all duration-300">
                Duşakabinleri İncele
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  )
}
