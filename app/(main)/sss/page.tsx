import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular (SSS)',
  description:
    'Erayduş duşakabin ürünleri, sipariş, teslimat, montaj ve garanti süreçleri hakkında en sık sorulan soruların yanıtları.',
}

interface FaqItem {
  q: string
  a: string
}

interface FaqGroup {
  title: string
  items: FaqItem[]
}

const faqGroups: FaqGroup[] = [
  {
    title: 'Ürünler & Sipariş',
    items: [
      {
        q: 'Duşakabinleriniz özel ölçüye göre üretiliyor mu?',
        a: 'Evet. Tüm duşakabin sistemlerimiz banyonuzun ölçülerine göre özel olarak üretilir. Standart ölçülerin dışında, milimetrik hassasiyetle projenize uygun çözümler sunuyoruz.',
      },
      {
        q: 'Hangi cam türlerini kullanıyorsunuz?',
        a: 'Şeffaf extra clear, füme (siyah), bronz, oluklu (fluted) ve buzlu (kumlama) cam seçeneklerimiz mevcuttur. Tüm camlarımız 8 mm temperli güvenlik camıdır ve nano yüzey kaplama ile su lekesine karşı korunur.',
      },
      {
        q: 'Sipariş vermeden önce fiyat teklifi alabilir miyim?',
        a: 'Elbette. İletişim formu, WhatsApp veya online konfigüratörümüz üzerinden ölçülerinizi ve tercihlerinizi ileterek ücretsiz fiyat teklifi alabilirsiniz.',
      },
    ],
  },
  {
    title: 'Teslimat & Montaj',
    items: [
      {
        q: 'Üretim ve teslimat süresi ne kadar?',
        a: 'Özel üretim duşakabinlerimizin üretim süresi ortalama 7-14 iş günüdür. Ürün hazır olduğunda montaj randevusu için sizinle iletişime geçilir.',
      },
      {
        q: 'Montaj hizmeti veriyor musunuz?',
        a: 'Evet, uzman montaj ekibimiz profesyonel kurulum hizmeti sunar. Montaj öncesi hazırlık ve adımlar için Montaj Kılavuzu sayfamızı inceleyebilirsiniz.',
      },
      {
        q: 'Türkiye’nin her yerine gönderim yapıyor musunuz?',
        a: 'Evet, 81 ile anlaşmalı kargo ve montaj iş ortaklarımız aracılığıyla gönderim yapıyoruz. Bölgenize göre teslimat koşulları değişebilir.',
      },
    ],
  },
  {
    title: 'Garanti & Servis',
    items: [
      {
        q: 'Ürünleriniz garantili mi?',
        a: 'Tüm ürünlerimiz üretim ve malzeme hatalarına karşı garanti kapsamındadır. Detaylar için Garanti Şartları sayfamızı inceleyebilirsiniz.',
      },
      {
        q: 'Yedek parça temin ediyor musunuz?',
        a: 'Menteşe, conta, tekerlek ve aksesuar gibi yedek parçaları uzun yıllar boyunca temin ediyoruz. Servis talepleriniz için iletişim kanallarımızdan bize ulaşabilirsiniz.',
      },
    ],
  },
]

export default function FaqPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground md:pt-40">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Header */}
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
          Yardım Merkezi
        </p>
        <h1 className="mb-4 text-4xl font-light tracking-tight lg:text-5xl">
          Sıkça Sorulan <span className="font-semibold">Sorular</span>
        </h1>
        <p className="mb-14 max-w-2xl text-lg font-light text-muted-foreground">
          Ürünlerimiz, sipariş, teslimat ve garanti süreçleri hakkında merak ettiklerinizi burada topladık.
        </p>

        {/* Groups */}
        <div className="space-y-14">
          {faqGroups.map((group) => (
            <section key={group.title}>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                {group.title}
              </h2>
              <div className="divide-y divide-border border-y border-border">
                {group.items.map((item) => (
                  <details key={item.q} className="group">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left text-base font-medium text-foreground transition-colors hover:text-champagne [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180" />
                    </summary>
                    <p className="pb-5 pr-10 text-[15px] font-light leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-col items-start gap-5 rounded-2xl bg-surface p-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold">Sorunuzu bulamadınız mı?</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Uzman ekibimiz tüm sorularınızı yanıtlamaktan memnuniyet duyar.
            </p>
          </div>
          <Link
            href="/iletisim"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-champagne px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-champagne/90"
          >
            <MessageCircle className="size-4" />
            Bize Ulaşın
          </Link>
        </div>
      </div>
    </div>
  )
}
