'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Sparkles, Ruler, PhoneCall, ArrowRight, MapPin, HelpCircle } from 'lucide-react'
import type { Product } from '@/lib/data/products'

interface ClientProps {
  products: Product[]
  faqs: { question: string; answer: string }[]
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 300, damping: 24 } }
}

export function DusakabinModelleriClient({ products, faqs }: ClientProps) {
  // If no products fetched, use the fallbacks temporarily so the page isn't completely empty, 
  // but normally we'd show an empty state. We'll show a mix.
  const displayProducts = products.length > 0 ? products : []

  return (
    <div className="bg-background min-h-screen">
      {/* HERO HEADER */}
      <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 border-b border-border/40 overflow-hidden bg-gradient-to-b from-champagne/5 via-background to-background">
        <motion.div 
          initial="hidden" 
          animate="show" 
          variants={staggerContainer}
          className="container mx-auto max-w-[1440px] px-6"
        >
          <motion.nav variants={fadeUp} className="mb-6 flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground">
            <Link href="/" className="hover:text-foreground transition-colors">Ana Sayfa</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">Duşakabin Modelleri</span>
          </motion.nav>

          <div className="max-w-4xl">
            <motion.span variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-champagne/10 text-champagne text-xs font-semibold uppercase tracking-wider mb-6 border border-champagne/20">
              <Sparkles className="w-3.5 h-3.5" />
              2026 Resmi Model Katalogu
            </motion.span>

            <motion.h1 variants={fadeUp} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.1]">
              2026 Duşakabin <span className="font-semibold text-champagne">Modelleri ve Fiyatları</span>
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 text-lg md:text-xl font-light text-muted-foreground leading-relaxed max-w-3xl">
              Ankara&apos;nın en geniş duşakabin kataloğu: Mat siyah profilli, 8mm temperli emniyet camlı, mika, oval, kare ve zemine sıfır Walk-in modellerimizi doğrudan üreticiden en uygun fiyat garantisiyle keşfedin.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="/tasarla"
                className="inline-flex items-center justify-center px-8 py-4 bg-foreground text-background font-medium text-sm rounded-lg hover:bg-foreground/90 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
              >
                <Ruler className="w-4 h-4 mr-2.5" />
                Özel Ölçü Tasarla & Fiyat Al
              </Link>
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center px-8 py-4 bg-muted text-foreground font-medium text-sm rounded-lg hover:bg-muted/80 transition-colors border border-border active:scale-[0.98]"
              >
                <PhoneCall className="w-4 h-4 mr-2.5 text-champagne" />
                Ankara Ücretsiz Keşif Talebi
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* VISUAL MODEL CATALOG GRID (DYNAMIC) */}
      <section className="py-16 md:py-24 container mx-auto max-w-[1440px] px-6">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12"
        >
          <motion.div variants={fadeUp}>
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne">Koleksiyonlar</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mt-2">
              Özel Üretim <span className="font-semibold">Modeller</span>
            </h2>
          </motion.div>
          <motion.p variants={fadeUp} className="text-sm text-muted-foreground max-w-md mt-4 md:mt-0">
            Banyonuzun mimarisine tam uyum sağlayan özel üretim modellerimizi inceleyin. Tüm camlarımız Şişecam garantilidir.
          </motion.p>
        </motion.div>

        {displayProducts.length > 0 ? (
          <motion.div 
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {displayProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group rounded-2xl border border-border/60 bg-card overflow-hidden hover:border-champagne/50 transition-colors duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between"
              >
                <div className="relative aspect-[4/3] bg-muted/40 overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority={index < 4}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {product.isNew && (
                    <div className="absolute top-4 left-4 bg-foreground text-background backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                      Yeni Model
                    </div>
                  )}
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground group-hover:text-champagne transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                      {product.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                    <span className="text-sm font-bold text-foreground">
                      {product.price > 0 ? `${product.price.toLocaleString('tr-TR')} ₺'den Başlayan` : 'Fiyat Alınız'}
                    </span>
                    <Link href={`/koleksiyonlar/${product.slug}`} className="inline-flex items-center text-xs font-medium text-champagne hover:underline">
                      İncele <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="py-20 text-center border border-dashed border-border/60 rounded-2xl bg-muted/10">
            <h3 className="text-xl font-medium text-foreground">Modeller Yükleniyor veya Bulunamadı</h3>
            <p className="text-sm text-muted-foreground mt-2">Şu anda gösterilecek ürün bulunmuyor. Lütfen daha sonra tekrar deneyin.</p>
          </div>
        )}
      </section>

      {/* SEARCH INTENT CONTENT BLOCKS */}
      <section className="py-16 bg-muted/20 border-y border-border/40 overflow-hidden">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="container mx-auto max-w-[1100px] px-6"
        >
          <motion.div variants={fadeUp} className="max-w-3xl mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-champagne">Rehber & Uzman Tavsiyesi</span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-foreground mt-2">
              Banyonuz İçin <span className="font-semibold">En Doğru Modeli Seçin</span>
            </h2>
          </motion.div>

          <div className="space-y-12 prose prose-neutral dark:prose-invert max-w-none text-muted-foreground leading-relaxed">
            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-border/60 bg-card hover:border-champagne/30 transition-colors">
              <h3 className="text-xl font-semibold text-foreground mb-4">1. Kare ve Köşe Duşakabin Modellerinin Avantajları</h3>
              <p className="text-base">
                Banyo alanlarında en popüler yerleşim biçimi köşe kullanımıdır. Kare duşakabinler, iki duvar birleşim noktasına oturarak banyonun tam ortasında geniş hareket alanı bırakır. Özellikle 90x90 cm ve 100x100 cm ölçülerindeki kare modeller, duş sırasında dirseklerin camlara çarpmasını engeller. Dış dikme profillerindeki ayarlı adaptörler sayesinde duvarlardaki terazi kaçıklığı ve şakül bozuklukları montaj esnasında tolare edilir.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-border/60 bg-card hover:border-champagne/30 transition-colors">
              <h3 className="text-xl font-semibold text-foreground mb-4">2. Siyah Profilli ve Gold Lüks Cam Kabinler</h3>
              <p className="text-base">
                Geleneksel parlak krom kabinlerin yerini alan mat siyah ve gold (altın) serisi duşakabinler, modern banyo mimarisinin ana odak noktası haline gelmiştir. ERAYDUŞ bünyesinde üretilen siyah profiller, 200 derece fırınlanan elektrostatik toz boya ile kaplandığı için banyodaki buharlı ortamdan, kireçli sudan ve temizlik sprey kimyasallarından etkilenmez. Gold serisinde ise PVD titanyum teknolojisi ile renk dayanıklılığı üst seviyeye çıkarılmıştır.
              </p>
            </motion.div>

            <motion.div variants={fadeUp} className="p-8 rounded-2xl border border-border/60 bg-card hover:border-champagne/30 transition-colors">
              <h3 className="text-xl font-semibold text-foreground mb-4">3. Mika Cam ve Temperli Cam Karşılaştırması</h3>
              <p className="text-base">
                Duşakabin satın alırken en çok kararsız kalınan konulardan biri cam türüdür. Mika (polistren) kabinler esnek yapıları ve hafiflikleri sayesinde kırılma riski barındırmaz ve ekonomik bütçeler için idealdir. 8mm Şişecam temperli emniyet camları ise darbelere karşı 5 kat dayanıklı olmalarının yanı sıra pürüzsüz yüzeyleri sayesinde leke tutmaz ve şeffaflığıyla banyoya ferahlık katar.
              </p>
            </motion.div>
          </div>

          <motion.div variants={fadeUp} className="mt-12 p-8 rounded-2xl border border-champagne/30 bg-champagne/5 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-champagne flex items-center gap-1.5">
                <MapPin className="w-4 h-4" /> Ankara İçi Ücretsiz Keşif Servisi
              </span>
              <h4 className="text-xl font-semibold text-foreground mt-1">Ankara İlçelerine Özel Montaj Hizmeti</h4>
              <p className="text-xs text-muted-foreground mt-1">Çankaya, Çayyolu, İncek, Keçiören, Batıkent ve Yenimahalle için aynı hafta teslimat.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/ankara-cankaya-dusakabin" className="px-4 py-2 bg-background border border-border text-xs font-semibold rounded-lg hover:border-champagne transition-colors">
                Çankaya Duşakabin →
              </Link>
              <Link href="/cayyolu-dusakabin" className="px-4 py-2 bg-background border border-border text-xs font-semibold rounded-lg hover:border-champagne transition-colors">
                Çayyolu & İncek Duşakabin →
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 md:py-24 container mx-auto max-w-[1000px] px-6">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-champagne mb-3">
              <HelpCircle className="w-4 h-4" />
              Sıkça Sorulan Sorular
            </span>
            <h2 className="text-3xl md:text-4xl font-light tracking-tight text-foreground">Duşakabin Hakkında Merak Edilenler</h2>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.details
                key={index}
                variants={fadeUp}
                className="group border border-border/60 rounded-xl bg-card p-6 cursor-pointer transition-all duration-200 [&[open]]:border-champagne/50"
              >
                <summary className="flex items-center justify-between font-medium text-base md:text-lg text-foreground list-none outline-none">
                  <span>{faq.question}</span>
                  <span className="ml-4 transition-transform duration-300 group-open:rotate-180 text-champagne">
                    ↓
                  </span>
                </summary>
                <div className="mt-4 text-xs md:text-sm leading-relaxed text-muted-foreground pt-4 border-t border-border/40">
                  {faq.answer}
                </div>
              </motion.details>
            ))}
          </div>
        </motion.div>
      </section>

      {/* BOTTOM CTA BANNER */}
      <section className="py-20 bg-foreground text-background">
        <motion.div 
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUp}
          className="container mx-auto max-w-[1440px] px-6 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-tight max-w-3xl mx-auto">
            Hayalinizdeki <span className="font-semibold text-champagne">duşakabin modelini</span> milimetrik üretiyoruz.
          </h2>
          <p className="mt-4 text-background/80 max-w-xl mx-auto text-sm md:text-base font-light">
            Ankara içi ücretsiz adresinize gelerek lazer metre ile net ölçü alıyoruz.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/tasarla"
              className="inline-flex items-center justify-center px-8 py-4 bg-champagne text-foreground font-semibold text-sm rounded-lg hover:bg-champagne/90 transition-all shadow-lg active:scale-[0.98]"
            >
              Özel Ölçü Hesabı Yap
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  )
}
