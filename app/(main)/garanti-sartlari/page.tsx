import { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, Clock, Wrench, CheckCircle2, XCircle, Phone, Mail, MapPin } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Garanti Şartları | ERAYDUŞ Ankara',
  description:
    'Erayduş duşakabin ürünlerinin 2 yıl resmi imalatçı garantisi, süresi ve koşulları. Garanti kapsamındaki ve kapsam dışındaki durumlar hakkında detaylı bilgilendirme.',
}

const highlights = [
  { icon: ShieldCheck, title: '2 Yıl Resmi Garanti', text: 'Üretim, malzeme ve montaj kaynaklı tüm kusurlara karşı 2 yıl tam garanti.' },
  { icon: Clock, title: 'Kesintisiz Yedek Parça', text: 'İmalat kaynaklı durumlarda ücretsiz; kaza ve kırılmalarda ise uygun fiyatlı orijinal parça temini.' },
  { icon: Wrench, title: 'Ankara Uzman Servis', text: 'Garanti kapsamındaki tüm teknik arıza ve su sızdırmazlık problemlerinde işçilik ve parça ücretsizdir.' },
]

const bizdenKaynakli = [
  'Üretim ve malzeme hatasından kaynaklanan alüminyum profil eğilmeleri ve boya dökülmeleri',
  'Menteşe, rulman tekerleği ve kilit mekanizmalarının üretim arızaları',
  'Cam fırınlama / temperleme esnasında oluşan dahili imalat kusurları',
  'Erayduş montaj ekibimizin uyguladığı su izolasyonu ve nötr silikon sızdırmazlık problemleri',
  'Garanti süresi içinde işlevini yitiren orijinal mıknatıs ve suluk fitilleri',
]

const kullaniciKaynakli = [
  'Sert darbe veya kaza sonucu oluşan 6mm temperli cam kırılmaları (Makul Ücretli Parça)',
  'Kullanım esnasında aşırı zorlama ile kırılan kulp, menteşe ve aksesuarlar (Makul Ücretli Parça)',
  'Sürgülü kapıların sert çekilmesi sonucu raydan çıkan veya zarar gören tekerlekler',
  'Ev taşıma veya tadilat esnasında ürüne verilen fiziksel zararlar',
]

const kapsamDisi = [
  'Tuz ruhu, çamaşır suyu, kezzap gibi asitli ağır kimyasallarla temizlik sonucu oluşan profilde leke ve kararmalar',
  'Yetkisiz 3. şahıslarca ürüne müdahale edilmesi, izinsiz söküm veya hatalı montaj yapılması',
  'Bina su tesisatından veya aşırı kireçli şebeke suyundan kaynaklı iç mekanizma tıkanmaları',
  'Deprem, sel, yangın gibi doğal afetler ve dış ortam kaza hasarları',
]

export default function WarrantyPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground md:pt-40">
      <div className="container mx-auto max-w-5xl px-6">
        
        {/* Header */}
        <header className="mb-16">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Erayduş Kalite Güvencesi
          </p>
          <h1 className="mb-6 text-4xl font-light tracking-tight lg:text-5xl">
            Garanti <span className="font-semibold">Şartları & Kapsamı</span>
          </h1>
          <p className="max-w-2xl text-lg font-light text-muted-foreground leading-relaxed">
            Ankara Siteler tesislerimizde ürettiğimiz tüm duşakabin modellerimiz, üretimden montaja kadar kalite standartlarımızın bir göstergesi olarak <strong>2 yıl resmi imalatçı garantisi</strong> ile teslim edilir.
          </p>
        </header>

        {/* Highlights */}
        <div className="mb-20 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {highlights.map((h, i) => (
            <div key={h.title} className="relative overflow-hidden rounded-3xl bg-surface border border-border/50 p-8 group transition-colors hover:border-champagne/30 shadow-sm">
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

        {/* Coverage 3-Column Grid */}
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Bizden Kaynaklı (Garanti Kapsamında) */}
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 flex flex-col justify-between">
            <div>
              <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-emerald-600">
                <span className="flex size-8 items-center justify-center rounded-full bg-emerald-500/20">
                  <CheckCircle2 className="size-5 text-emerald-600" />
                </span>
                İmalat & Montaj Kaynaklı (Ücretsiz)
              </h2>
              <ul className="space-y-4">
                {bizdenKaynakli.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] font-light text-muted-foreground">
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-emerald-500/10 text-[12px] font-medium text-emerald-700">
              ✓ Parça ve işçilik tamamen ücretsizdir.
            </div>
          </div>
          
          {/* Kullanıcı Kaynaklı (Ücretli Parça Temini) */}
          <div className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-8 flex flex-col justify-between">
            <div>
              <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-amber-600">
                <span className="flex size-8 items-center justify-center rounded-full bg-amber-500/20">
                  <Wrench className="size-5 text-amber-600" />
                </span>
                Kaza & Kullanıcı Durumları (Makul Ücretli)
              </h2>
              <ul className="space-y-4">
                {kullaniciKaynakli.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] font-light text-muted-foreground">
                    <span className="mt-1 size-2 rounded-full bg-amber-500 shrink-0" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-amber-500/10 text-[12px] font-medium text-amber-700">
              ⚙ Uygun fiyatla orijinal yedek parça temini sağlanır.
            </div>
          </div>

          {/* Garanti Kapsamına Girmeyen Sebepler */}
          <div className="rounded-3xl border border-rose-500/20 bg-rose-500/5 p-8 flex flex-col justify-between">
            <div>
              <h2 className="mb-6 flex items-center gap-3 text-lg font-semibold text-rose-600">
                <span className="flex size-8 items-center justify-center rounded-full bg-rose-500/20">
                  <XCircle className="size-5 text-rose-600" />
                </span>
                Garanti Kapsamına Girmeyenler
              </h2>
              <ul className="space-y-4">
                {kapsamDisi.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-[14px] font-light text-muted-foreground">
                    <XCircle className="mt-0.5 size-4 shrink-0 text-rose-500" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-rose-500/10 text-[12px] font-medium text-rose-700">
              ✕ Ağır kimyasal lekelemesi ve yetkisiz müdahale kapsamaz.
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="mb-20 grid grid-cols-1 gap-12 md:grid-cols-3">
          <section className="md:col-span-1">
            <h2 className="text-xl font-semibold text-foreground">Servis Süreci</h2>
            <p className="mt-4 text-[15px] font-light leading-relaxed text-muted-foreground">
              Garanti koşullarımızın detayları ve servis talebinizi nasıl ileteceğiniz hakkında merak edilen konular.
            </p>
            <div className="mt-6 space-y-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <span>(0312) 350 79 39</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-champagne shrink-0" />
                <span>0554 883 00 71</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne shrink-0" />
                <span>info@eraydus.net</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-champagne shrink-0" />
                <span>Siteler / Ankara</span>
              </div>
            </div>
          </section>
          
          <div className="md:col-span-2 space-y-12">
            <section className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
              <div className="absolute top-0 left-0 w-px h-1/3 bg-champagne" />
              <h3 className="mb-4 text-lg font-semibold text-foreground">2 Yıl Tam Garanti Süresi</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                Tüm Erayduş duşakabin sistemleri, fatura veya teslim tarihinden itibaren <strong>2 (iki) yıl</strong> süreyle
                imalat, malzeme ve montaj hatalarına karşı garanti kapsamındadır. Garanti süresi boyunca imalat kaynaklı
                arızalarda parça ve servis ücreti talep edilmez.
              </p>
            </section>

            <section className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Garantiden Yararlanma Koşulları</h3>
              <ul className="space-y-3 text-[15px] font-light text-muted-foreground">
                <li className="flex gap-3"><span className="text-champagne">•</span> Ürünün Erayduş yetkili ekibi veya onaylı montaj kadrosu tarafından kurulmuş olması.</li>
                <li className="flex gap-3"><span className="text-champagne">•</span> Fatura veya teslim fişinin ibraz edilmesi.</li>
                <li className="flex gap-3"><span className="text-champagne">•</span> Temizlik esnasında aşındırıcı asitli kimyasallar yerine ılık sabunlu su kullanılmış olması.</li>
              </ul>
            </section>

            <section className="relative pl-6 before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-border">
              <h3 className="mb-4 text-lg font-semibold text-foreground">Garanti ve Servis Talebi Nasıl Oluşturulur?</h3>
              <p className="text-[15px] font-light leading-relaxed text-muted-foreground">
                Garanti kapsamındaki bir sorunla karşılaştığınızda (örneğin su sızdırması veya rulman takılması), adres ve ürün fotoğrafınızı WhatsApp hattımızdan (0554 883 00 71) veya telefon numaramızdan (0312 350 79 39) bize iletmeniz yeterlidir. Ankara içi gezici teknik ekibimiz en kısa sürede adresinizi ziyaret ederek sorunu giderir.
              </p>
            </section>
          </div>
        </div>

        {/* CTA */}
        <div className="relative overflow-hidden rounded-3xl border border-border/50 bg-surface px-8 py-12 md:px-12 md:py-16 shadow-xl">
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          </div>
          
          <div className="relative z-10 flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-lg">
              <h3 className="text-2xl font-semibold tracking-tight">Garanti veya servis talebi mi oluşturacaksınız?</h3>
              <p className="mt-3 text-base font-light text-muted-foreground">
                Ankara uzman teknik ekibimiz ürününüzle ilgili tüm soruları hızla çözmek için hazır.
              </p>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-champagne px-8 py-4 text-sm font-semibold text-foreground transition-all hover:bg-champagne/90 hover:scale-105 active:scale-95 shadow-lg"
            >
              Servis Ekibiyle İletişime Geçin
            </Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}
