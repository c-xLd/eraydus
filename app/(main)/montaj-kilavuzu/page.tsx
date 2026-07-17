import { Metadata } from 'next'
import Link from 'next/link'
import { Ruler, Package, Wrench, Droplets, Sparkles, AlertTriangle, Download, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Montaj Kılavuzu',
  description:
    'Erayduş duşakabin montaj kılavuzu. Kurulum öncesi hazırlık, adım adım montaj süreci, bakım önerileri ve dikkat edilmesi gerekenler.',
}

const steps = [
  {
    icon: Ruler,
    title: 'Ölçüm & Hazırlık',
    text: 'Montaj alanının tesviyesini ve duvar dikliğini kontrol edin. Fayans yüzeyin temiz, kuru ve düz olduğundan emin olun. Su ve elektrik hatlarının konumunu işaretleyin.',
  },
  {
    icon: Package,
    title: 'Parçaların Kontrolü',
    text: 'Paket içeriğini montaj listesiyle karşılaştırın. Cam paneller, profiller, menteşeler, contalar ve vida setinin eksiksiz olduğunu doğrulayın. Camları düz bir zeminde güvenle bekletin.',
  },
  {
    icon: Wrench,
    title: 'Profil Montajı',
    text: 'Duvar profillerini terazi yardımıyla dikey hizalayın ve delik yerlerini işaretleyin. Uygun dübel ve vidalarla sabitleyin. Alt eşik profilini zemine yerleştirin.',
  },
  {
    icon: Droplets,
    title: 'Cam & Sızdırmazlık',
    text: 'Cam panelleri profillere dikkatlice yerleştirin ve menteşeleri sıkın. Tüm birleşim noktalarına ve alt eşiğe silikon uygulayarak sızdırmazlığı sağlayın.',
  },
  {
    icon: Sparkles,
    title: 'Test & Temizlik',
    text: 'Silikonun tam kuruması için en az 24 saat bekleyin. Ardından su testi yaparak sızdırmazlığı kontrol edin. Yüzeyi yumuşak bezle temizleyin.',
  },
]

const maintenance = [
  'Cam yüzeyi düzenli olarak yumuşak bez ve su ile silin; kireç oluşumunu önleyin.',
  'Aşındırıcı, asit veya çözücü içeren temizlik ürünleri kullanmayın.',
  'Menteşe ve rayları yılda birkaç kez kontrol edin, gerekirse ince yağ uygulayın.',
  'Contalarda deformasyon fark ederseniz zamanında değiştirin.',
]

export default function InstallationGuidePage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground md:pt-40">
      <div className="container mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Teknik Destek
          </p>
          <h1 className="mb-6 text-4xl font-light tracking-tight lg:text-5xl">
            Montaj <span className="font-semibold">Kılavuzu</span>
          </h1>
          <p className="max-w-2xl text-lg font-light text-muted-foreground leading-relaxed">
            Duşakabininizin doğru ve güvenli kurulumu için adım adım rehber. Üstün performans ve uzun ömür için profesyonel montaj hizmetimizi tercih etmenizi öneririz.
          </p>
        </header>

        {/* Warning banner */}
        <div className="mb-20 overflow-hidden relative rounded-3xl border border-champagne/20 bg-champagne/[0.03] p-8 md:p-10">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-champagne" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-champagne/10">
              <AlertTriangle className="size-5 text-champagne" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne mb-2">Önemli Uyarı</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                Temperli cam paneller ağır ve hassastır. Montaj sırasında en az iki kişi çalışılması ve uygun koruyucu ekipman kullanılması şiddetle önerilir. Hatalı veya yetkisiz montaj, ürünün garanti kapsamını geçersiz kılabilir.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Steps Timeline */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-10">Kurulum Adımları</h2>
            <div className="relative pl-8 md:pl-0">
              {/* Timeline Line (Mobile) */}
              <div className="absolute left-[15px] top-4 bottom-4 w-px bg-border md:hidden" />
              
              <div className="space-y-12">
                {steps.map((step, index) => (
                  <div key={step.title} className="relative group md:flex md:gap-8 items-start">
                    
                    {/* Number / Icon Area */}
                    <div className="absolute -left-8 md:relative md:left-auto flex flex-col items-center shrink-0">
                      <div className="flex size-8 md:size-14 items-center justify-center rounded-full bg-surface border border-border text-champagne font-mono text-sm shadow-sm transition-transform duration-500 group-hover:border-champagne/50 group-hover:scale-110 z-10">
                        <span className="md:hidden">{index + 1}</span>
                        <step.icon className="hidden md:block size-5" strokeWidth={1.5} />
                      </div>
                      {/* Timeline Line (Desktop) */}
                      {index !== steps.length - 1 && (
                        <div className="hidden md:block w-px h-full bg-border mt-4 absolute top-14 bottom-[-3rem]" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className="md:pt-3">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="hidden md:block text-xs font-mono text-champagne">ADIM {String(index + 1).padStart(2, '0')}</span>
                        <h3 className="text-xl font-semibold">{step.title}</h3>
                      </div>
                      <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                        {step.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Maintenance Sidebar */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 rounded-3xl bg-surface border border-border/50 p-8 md:p-10">
              <h2 className="mb-8 text-xl font-semibold flex items-center gap-3">
                <Sparkles className="size-5 text-champagne" />
                Bakım Önerileri
              </h2>
              <ul className="space-y-6">
                {maintenance.map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-[15px] font-light text-muted-foreground">
                    <span className="mt-1 flex size-5 shrink-0 items-center justify-center rounded-full bg-champagne/10 text-[10px] text-champagne font-mono">
                      {i + 1}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-10 pt-8 border-t border-border/50">
                <a
                  href="/iletisim"
                  className="group flex w-full items-center justify-between rounded-xl bg-background border border-border/50 p-4 transition-colors hover:border-champagne hover:bg-champagne/5"
                >
                  <span className="flex items-center gap-3 text-sm font-semibold">
                    <Download className="size-4 text-champagne" />
                    PDF Kılavuz İndir
                  </span>
                  <ArrowRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface px-8 py-12 md:px-12 md:py-16">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <h3 className="text-2xl font-semibold tracking-tight">Profesyonel montaj mı istiyorsunuz?</h3>
              <p className="mt-3 text-base font-light text-muted-foreground">
                Uzman ekibimizle güvenli ve garantili kurulum için randevu alın. Hata riskini sıfıra indirin.
              </p>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-white transition-all hover:bg-champagne/90 hover:scale-105 active:scale-95"
            >
              <Wrench className="size-4" />
              Montaj Randevusu
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}
