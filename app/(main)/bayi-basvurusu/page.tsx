import { Metadata } from 'next'
import { Building2, TrendingUp, Headphones, BadgePercent } from 'lucide-react'
import { BayiFormClient } from './BayiFormClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'Bayi Başvurusu | Erayduş Duşakabin',
  description: 'Erayduş bayisi olun. Avantajlı fiyatlar, bölgesel yetki ve pazarlama desteği ile lüks duşakabin sektöründe büyüyen ağımıza katılın.',
  alternates: {
    canonical: `${SITE_URL}/bayi-basvurusu`,
  },
}

const benefits = [
  { icon: BadgePercent, title: 'Avantajlı Bayi Fiyatları', text: 'Rekabetçi bayi iskontoları ve esnek ödeme koşulları.' },
  { icon: TrendingUp, title: 'Pazarlama Desteği', text: 'Katalog, görsel ve dijital pazarlama materyalleri.' },
  { icon: Headphones, title: 'Öncelikli Teknik Destek', text: 'Bayilere özel hızlı sipariş ve satış sonrası destek hattı.' },
  { icon: Building2, title: 'Bölgesel Yetki', text: 'Belirlenen bölgelerde ayrıcalıklı bayilik imkânı.' },
]

export default function DealerApplicationPage() {
  return (
    <div className="flex w-full flex-col">
      {/* Hero */}
      <section className="bg-background pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="container mx-auto max-w-[1440px] px-6">
          <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
            Profesyoneller
          </p>
          <h1 className="max-w-4xl text-4xl font-light leading-[1.1] tracking-tight md:text-6xl">
            Erayduş <span className="font-semibold">Bayisi Olun</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg font-light text-muted-foreground md:text-xl">
            Lüks duşakabin segmentinde güçlü bir markanın çözüm ortağı olun. Büyüyen bayi ağımıza katılmak için
            başvurunuzu bırakın, ekibimiz sizinle iletişime geçsin.
          </p>
        </div>
      </section>

      {/* Split: Benefits + Form */}
      <section className="bg-background pb-32 md:pb-44">
        <div className="container mx-auto max-w-[1440px] px-6">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-5 lg:gap-20">
            {/* Benefits */}
            <div className="lg:col-span-2">
              <h2 className="mb-8 text-2xl font-light tracking-tight">
                Bayilik <span className="font-semibold">Avantajları</span>
              </h2>
              <div className="flex flex-col gap-8">
                {benefits.map((b) => (
                  <div key={b.title} className="flex items-start gap-5">
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-surface">
                      <b.icon className="size-5 text-champagne" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold">{b.title}</h3>
                      <p className="mt-1 text-sm font-light leading-relaxed text-muted-foreground">{b.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              <div className="rounded-2xl bg-surface p-8 md:p-12">
                <BayiFormClient />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
