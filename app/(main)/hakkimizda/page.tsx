'use client'

import { motion } from 'framer-motion'
import { Target, Lightbulb, Leaf, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

const ease = [0.16, 1, 0.3, 1] as const

const values = [
  {
    icon: Target,
    title: 'Hassasiyet',
    description:
      'Milimetrik doğrulukla üretilen her parça, mükemmelliğin bir yansımasıdır. Endüstriyel standartların ötesinde, sanat eseri titizliğiyle çalışıyoruz.',
  },
  {
    icon: Lightbulb,
    title: 'Yenilikçilik',
    description:
      'Geleneksel cam işçiliğini modern mühendislikle birleştirerek, sektörde yeni standartlar belirliyoruz. Ar-Ge odaklı yaklaşımımız fark yaratır.',
  },
  {
    icon: Leaf,
    title: 'Sürdürülebilirlik',
    description:
      'Doğaya saygılı üretim süreçleri ve uzun ömürlü malzeme seçimleriyle, gelecek nesillere karşı sorumluluğumuzu her ürünümüze yansıtıyoruz.',
  },
]

const processSteps = [
  {
    number: '01',
    title: 'Ölçü',
    description: 'Profesyonel ekibimiz metreküpük hassasiyetle banyo alanınızın ölçülerini alır.',
  },
  {
    number: '02',
    title: 'Tasarım',
    description: '3D modelleme ile projeniz hayat bulur. Her detay sizinle birlikte planlanır.',
  },
  {
    number: '03',
    title: 'Üretim',
    description: 'CNC teknolojisi ve usta ellerde cam, profil ve aksesuarlar şekillendirilir.',
  },
  {
    number: '04',
    title: 'Temperlenme',
    description: `Camlar 620°C'de temperlenerek EN12150 standardında güvenlik sağlanır.`,
  },
  {
    number: '05',
    title: 'Montaj',
    description: 'Uzman montaj ekibimiz, milimetrik doğrulukla sisteminizi yerine konumlandırır.',
  },
  {
    number: '06',
    title: 'Kalite Kontrol',
    description: 'Çok aşamalı kalite kontrol sürecimizle kusursuz teslimat garanti edilir.',
  },
]

export default function AboutPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ───────────── Hero Section ───────────── */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            Hakkımızda
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl leading-[1.1]"
          >
            Mühendislik ve Tasarımın{' '}
            <span className="font-semibold">Buluştuğu Yer</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl"
          >
            ERAYDUŞ, mimarinin zarafetini banyolarınıza taşıyan premium
            duşakabin sistemleri üretmektedir. Her ürünümüz, on yılı aşkın
            deneyimimizin ve mühendislik tutkumuzun bir eseridir.
          </motion.p>
        </div>
      </section>

      {/* ───────────── Brand Story ───────────── */}
      <section className="py-32 md:py-44 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
                Hikayemiz
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6 leading-[1.15]">
                Cam İşçiliğinde{' '}
                <span className="font-semibold">Bir Devrim</span>
              </h2>
              <p className="text-muted-foreground text-lg md:text-xl font-light mt-8 leading-relaxed">
                2010 yılında İstanbul'da kurulan ERAYDUŞ, Türkiye'nin önde
                gelen lüks duşakabin üreticisi olma yolculuğuna küçük bir
                atölyede başladı. Bugün, modern üretim tesislerimizde yüzlerce
                mimari projeye imza atıyoruz.
              </p>
              <p className="text-muted-foreground text-lg md:text-xl font-light mt-6 leading-relaxed">
                Her projeye bir sanat eseri gibi yaklaşıyor, mühendislik
                bilgimizi tasarım duyarlılığıyla birleştiriyoruz. Amacımız
                sadece duşakabin üretmek değil, yaşam alanlarınıza değer
                katmak.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-surface group relative">
                <Image
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                  alt="ERAYDUŞ üretim tesisi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-surface-dark text-white p-8 rounded-2xl max-w-[280px]">
                <span className="text-champagne text-4xl md:text-5xl font-semibold">
                  14+
                </span>
                <p className="text-white/70 text-sm mt-2 font-light">
                  Yıllık sektör deneyimi ve binlerce tamamlanan proje
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Brand Values ───────────── */}
      <section className="py-32 md:py-44 bg-surface relative overflow-hidden">
        {/* Background ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center mb-24"
          >
            <span className="text-champagne text-xs tracking-[0.3em] uppercase font-semibold">
              Değerlerimiz
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6">
              Bizi Biz Yapan <span className="font-semibold italic">İlkeler</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1, delay: index * 0.15, ease }}
                className="group relative bg-background rounded-3xl p-10 md:p-14 overflow-hidden border border-border hover:border-champagne/40 transition-colors duration-700"
              >
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10">
                  <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-10 group-hover:bg-champagne group-hover:scale-110 transition-all duration-500 ease-out">
                    <value.icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors duration-500" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5 group-hover:text-champagne transition-colors duration-500">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────── Manufacturing Process Timeline ───────────── */}
      <section className="py-32 md:py-44 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
              Üretim Süreci
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6">
              Fikirden <span className="font-semibold">Mükemmelliğe</span>
            </h2>
          </motion.div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              {/* Connecting line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease }}
                className="absolute top-[38px] left-0 right-0 h-[1px] bg-border origin-left"
              />

              <div className="grid grid-cols-6 gap-6">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.12,
                      ease,
                    }}
                    className="relative flex flex-col items-center text-center"
                  >
                    {/* Node circle */}
                    <div className="w-[76px] h-[76px] rounded-full bg-background border-2 border-border flex items-center justify-center mb-6 relative z-10 group-hover:border-champagne transition-colors">
                      <span className="text-champagne text-lg font-semibold">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm font-light leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / Tablet: Vertical Timeline */}
          <div className="lg:hidden">
            <div className="relative pl-10 md:pl-16">
              {/* Vertical line */}
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.5, ease }}
                className="absolute top-0 bottom-0 left-[19px] md:left-[27px] w-[1px] bg-border origin-top"
              />

              <div className="flex flex-col gap-12">
                {processSteps.map((step, index) => (
                  <motion.div
                    key={step.number}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease,
                    }}
                    className="relative flex items-start gap-6"
                  >
                    {/* Node circle */}
                    <div className="absolute -left-10 md:-left-16 w-[38px] h-[38px] md:w-[54px] md:h-[54px] rounded-full bg-background border-2 border-border flex items-center justify-center shrink-0 z-10">
                      <span className="text-champagne text-xs md:text-sm font-semibold">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight mb-2">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground text-base font-light leading-relaxed max-w-md">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Team / Factory Section ───────────── */}
      <section className="py-32 md:py-44 bg-surface-dark text-white overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
                Ekibimiz & Tesisimiz
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6 leading-[1.15]">
                Tutku ile{' '}
                <span className="font-semibold">Şekillenen Üretim</span>
              </h2>
              <p className="text-white/60 text-lg md:text-xl font-light mt-8 leading-relaxed">
                50'den fazla uzman mühendis ve teknisyenimiz, 3.000 m²'lik
                modern üretim tesisimizde her gün sınırları zorluyor. CNC
                işleme merkezleri, temperleme fırınları ve kalite kontrol
                laboratuvarlarımızla sektörün en donanımlı tesislerinden birini
                işletiyoruz.
              </p>

              <div className="grid grid-cols-3 gap-8 mt-12">
                {[
                  { value: '3.000+', label: 'm² Üretim Alanı' },
                  { value: '50+', label: 'Uzman Personel' },
                  { value: '2.500+', label: 'Tamamlanan Proje' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <span className="text-champagne text-2xl md:text-3xl font-semibold">
                      {stat.value}
                    </span>
                    <p className="text-white/50 text-sm mt-1 font-light">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-3 text-champagne text-base font-medium hover:gap-5 transition-all duration-300"
                >
                  Bize Ulaşın
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 relative">
                <Image
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?q=80&w=2070&auto=format&fit=crop"
                  alt="ERAYDUŞ üretim ekibi"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover opacity-80"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── CTA Section ───────────── */}
      <section className="py-32 md:py-44 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              Projeniz İçin{' '}
              <span className="font-semibold">Hazırız</span>
            </h2>
            <p className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto">
              Hayalinizdeki banyo deneyimini gerçeğe dönüştürmek için ilk
              adımı atın. Uzman ekibimiz sizin için burada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-10 h-14 text-base font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                İletişime Geçin
              </Link>
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-10 h-14 text-base font-medium hover:border-foreground hover:bg-surface transition-all duration-300"
              >
                Projeleri İnceleyin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

