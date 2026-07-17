import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Clock, Wrench, CheckCircle2, XCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Garanti Şartları',
  description:
    'Erayduş duşakabin ürünlerinin garanti kapsamı, süresi ve koşulları. Garanti kapsamındaki ve kapsam dışındaki durumlar hakkında detaylı bilgi.',
}

const highlights = [
  { icon: ShieldCheck, title: '2 Yıl Garanti', text: 'Üretim ve malzeme hatalarına karşı tam kapsamlı garanti.' },
  { icon: Clock, title: 'Ömür Boyu Destek', text: 'Yedek parça ve teknik destek hizmeti garantiden sonra da devam eder.' },
  { icon: Wrench, title: 'Ücretsiz Servis', text: 'Garanti kapsamındaki arızalarda işçilik ve parça ücretsizdir.' },
]

const covered = [
  'Cam yüzeyindeki üretim kaynaklı kusurlar',
  'Menteşe, ray ve mekanizmalarda üretim hataları',
  'Krom/alüminyum profillerde kaplama soyulması',
  'Conta ve sızdırmazlık elemanlarında erken aşınma',
]

const notCovered = [
  'Hatalı kullanım, darbe veya düşürme kaynaklı kırılmalar',
  'Yetkisiz kişilerce yapılan montaj ve müdahaleler',
  'Uygun olmayan temizlik ürünleriyle oluşan yüzey hasarları',
  'Doğal afet, yangın veya su baskını kaynaklı hasarlar',
  'Normal yıpranma ve estetik eskime',
]

export default function WarrantyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground md:pt-40">
      <div className="container mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Güvence
          </p>
          <h1 className="mb-6 text-4xl font-light tracking-tight lg:text-5xl">
            Garanti <span className="font-semibold">Şartları</span>
          </h1>
          <p className="max-w-2xl text-lg font-light text-muted-foreground leading-relaxed">
            Erayduş ürünleri, kalite standartlarımızın bir yansıması olarak kapsamlı garanti güvencesiyle sunulur. Modern mühendislik, uzun yıllar sorunsuz kullanım için tasarlanmıştır.
          </p>
        </header>

        {/* Highlights */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div key={h.title} className="relative overflow-hidden rounded-3xl bg-surface border border-border/50 p-8 group transition-colors hover:border-champagne/30">
              <div className="absolute top-0 right-0 p-6 text-xs font-mono text-muted-foreground/30 select-none">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="mb-6 flex size-14 items-center justify-center rounded-2xl bg-champagne/10 text-champagne transition-transform duration-500 group-hover:scale-110">
                <h.icon className="size-6" strokeWidth={1.5} />
              </div>
              <h3 className="mb-3 text-lg font-semibold">{h.title}</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">{h.text}</p>
            </div>
          ))}
        </div>

        {/* Coverage columns */}
        <div className="mb-20 grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Covered */}
          <div className="rounded-3xl border border-border/50 bg-surface/50 p-8 md:p-10">
            <h2 className="mb-8 flex items-center gap-3 text-xl font-semibold">
              <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/10">
                <CheckCircle2 className="size-5 text-emerald-500" />
              </span>
              Garanti Kapsamındakiler
            </h2>
            <ul className="space-y-4">
              {covered.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[15px] font-light text-muted-foreground">
                  <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500/50" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Not Covered */}
          <div className="rounded-3xl border border-border/50 bg-surface/50 p-8 md:p-10">
            <h2 className="mb-8 flex items-center gap-3 text-xl font-semibold">
              <span className="flex size-8 items-center justify-center rounded-full bg-destructive/10">
                <XCircle className="size-5 text-destructive" />
              </span>
              Kapsam Dışındakiler
            </h2>
            <ul className="space-y-4">
              {notCovered.map((item) => (
                <li key={item} className="flex items-start gap-4 text-[15px] font-light text-muted-foreground">
                  <XCircle className="mt-0.5 size-4 shrink-0 text-destructive/50" />
                  <span className="leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          <section className="md:col-span-1">
            <h2 className="text-xl font-semibold text-foreground">Süreç ve Süreler</h2>
            <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground">
              Garanti koşullarımızın detayları ve servis talebinizi nasıl ileteceğiniz hakkında bilmeniz gerekenler.
            </p>
          </section>
          
          <div className="md:col-span-2 space-y-12">
            <section className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
              <div className="absolute top-0 left-0 w-px h-1/3 bg-champagne" />
              <h3 className="mb-4 text-lg font-semibold text-foreground">Garanti Süresi</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                Tüm Erayduş duşakabin sistemleri, fatura/teslim tarihinden itibaren <strong>2 (iki) yıl</strong> süreyle
                üretim ve malzeme hatalarına karşı garanti kapsamındadır. Garanti süresi boyunca kapsam dahilindeki
                arızalarda parça ve işçilik ücreti talep edilmez.
              </p>
            </section>

            <section className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Garantiden Yararlanma Koşulları</h3>
              <ul className="space-y-3 text-[15px] font-light text-muted-foreground">
                <li className="flex gap-3"><span className="text-champagne">•</span> Ürünün Erayduş yetkili ekibi veya onaylı montaj ortağı tarafından kurulmuş olması.</li>
                <li className="flex gap-3"><span className="text-champagne">•</span> Fatura veya teslim belgesinin ibraz edilmesi.</li>
                <li className="flex gap-3"><span className="text-champagne">•</span> Ürünün kullanım kılavuzuna uygun şekilde kullanılmış olması.</li>
              </ul>
            </section>

            <section className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Garanti Talebi Nasıl Oluşturulur?</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                Garanti kapsamındaki bir durumla karşılaştığınızda, ürün bilgileriniz ve fatura numaranızla birlikte
                iletişim kanallarımızdan bize ulaşabilirsiniz. Talebiniz en kısa sürede değerlendirilerek servis süreci
                başlatılır.
              </p>
            </section>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface px-8 py-12 md:px-12 md:py-16">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <h3 className="text-2xl font-semibold tracking-tight">Garanti talebi mi oluşturacaksınız?</h3>
              <p className="mt-3 text-base font-light text-muted-foreground">
                Servis ekibimiz ürününüzle ilgili tüm sorunları hızla çözmek için hazır.
              </p>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-champagne/90 hover:scale-105 active:scale-95"
            >
              Servis Talebi Oluştur
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}
