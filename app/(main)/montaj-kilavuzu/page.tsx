import { Metadata } from 'next'
import Link from 'next/link'
import { Ruler, Package, Wrench, Droplets, Sparkles, AlertTriangle, Phone, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Montaj Kılavuzu & Kurulum Rehberi | ERAYDUŞ Ankara',
  description:
    'Erayduş 6mm temperli cam duşakabin montaj kılavuzu. Kurulum öncesi hazırlık, adım adım montaj adımları, su sızdırmazlık ve bakım önerileri.',
}

const steps = [
  {
    icon: Ruler,
    title: 'Ölçüm & Zemin Hazırlığı',
    text: 'Montaj alanının su terazisi ile duvardan duvara tesviyesini kontrol edin. Fayans yüzeyin temiz, kuru ve deterjandan arınmış olduğunu doğrulayın. (Ankara içi siparişlerinizde bu işlem Erayduş uzman keşif ekibimizce ücretsiz yapılır).',
  },
  {
    icon: Package,
    title: 'Parçaların Kontrolü',
    text: 'Paket içeriğini inceleyin: 6mm Şişecam temperli emniyet camları, paslanmaz alüminyum profiller, mıknatıslı suluk fitilleri ve vida takımlarını kontrol edin. Cam panelleri altlarına karton koyarak düz zeminde dik bekletin.',
  },
  {
    icon: Wrench,
    title: 'Profil & Dikme Montajı',
    text: 'Duvar dikme profillerini su terazisi yardımıyla dikey hizada sabitleyin ve delik yerlerini markalayın. Uygun dübel ve vidalarla sıkın. Alt su tutucu eşik profilini zemine oturtun.',
  },
  {
    icon: Droplets,
    title: 'Cam Paneller & Nötr Silikon',
    text: '6mm temperli cam panelleri profillere yerleştirin. Menteşeli modellerde menteşe vidalarını, sürgülü modellerde rulman tekerlek ayarlarını yapın. Birleşim yerlerine %100 nötr antibakteriyel şeffaf banyo silikonu çekin.',
  },
  {
    icon: Sparkles,
    title: 'Kuruma & Sızdırmazlık Testi',
    text: 'Silikonun tam kemikleşmesi ve kuruması için en az 24 saat kabini kullanmayın. 24 saat sonunda duş başlığı ile su sızdırmazlık testini gerçekleştirin.',
  },
]

const maintenance = [
  'Cam yüzeyindeki su damlalarını her duş sonrası çekçek ile sıyırarak kireç lekesini önleyin.',
  'Profilleri temizlerken tuz ruhu, çamaşır suyu gibi asitli kimyasallar yerine ılık sabunlu su kullanın.',
  'Sürgülü rulman tekerleklerini yılda bir kez silikon sprey ile tozdan arındırın.',
  'Zamanla sertleşen suluk ve mıknatıs fitillerini 6mm cam ölçüsüne uygun yenileriyle değiştirin.',
]

export default function InstallationGuidePage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground md:pt-40">
      <div className="container mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Teknik Rehber & Kurulum
          </p>
          <h1 className="mb-6 text-4xl font-light tracking-tight lg:text-5xl">
            Montaj <span className="font-semibold">Kılavuzu</span>
          </h1>
          <p className="max-w-2xl text-lg font-light text-muted-foreground leading-relaxed">
            Erayduş 6mm temperli emniyet camlı duşakabinlerinizin doğru ve uzun ömürlü kullanımı için hazırlanan teknik montaj adımları. Ankara içi siparişlerinizde kurulum kendi uzman montaj ekibimizce ücretsiz gerçekleştirilir.
          </p>
        </header>

        {/* Warning banner */}
        <div className="mb-20 overflow-hidden relative rounded-3xl border border-champagne/20 bg-champagne/[0.03] p-8 md:p-10 shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-champagne" />
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-champagne/10">
              <AlertTriangle className="size-5 text-champagne" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-champagne mb-2">Güvenlik ve İmalatçı Uyarısı</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                6mm temperli emniyet camları yüksek dayanıklılığa sahip olmakla birlikte hassastır. Bireysel montaj esnasında cam köşelerinin fayans veya sert zeminle temas etmemesine dikkat edilmelidir. Hatalı montaj ve silikon uygulamaları garanti kapsamını etkileyebileceğinden, montajın uzman ekiplerimizce yapılması önerilir.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Steps Timeline */}
          <div className="lg:col-span-7">
            <h2 className="text-2xl font-semibold mb-10">Adım Adım Kurulum</h2>
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
            <div className="sticky top-32 rounded-3xl bg-surface border border-border/50 p-8 md:p-10 shadow-sm">
              <h2 className="mb-8 text-xl font-semibold flex items-center gap-3">
                <Sparkles className="size-5 text-champagne" />
                Uzun Ömürlü Kullanım İpuçları
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
              
              <div className="mt-10 pt-8 border-t border-border/50 space-y-3">
                <div className="text-xs font-medium text-foreground uppercase tracking-wider mb-2">İletişim & Destek Hattı</div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4 text-champagne shrink-0" />
                  <span>(0312) 350 79 39 &bull; 0554 883 00 71</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <Mail className="w-4 h-4 text-champagne shrink-0" />
                  <span>info@eraydus.net</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4 text-champagne shrink-0" />
                  <span>Siteler / Altındağ / Ankara</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface px-8 py-12 md:px-12 md:py-16 shadow-xl">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <h3 className="text-2xl font-semibold tracking-tight">Ankara içi profesyonel montaj ister misiniz?</h3>
              <p className="mt-3 text-base font-light text-muted-foreground">
                Uzman ekiplerimiz adresinize gelerek yerinde ölçü almakta ve aynı hafta içinde garantili kurulum sağlamaktadır.
              </p>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-champagne/90 hover:scale-105 active:scale-95 shadow-lg"
            >
              <Wrench className="size-4" />
              Ücretsiz Keşif & Montaj Al
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}
