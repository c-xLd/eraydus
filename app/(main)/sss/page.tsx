import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronDown, MessageCircle, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react'
import { faqGroups } from '@/lib/data/faqs'

export const metadata: Metadata = {
  title: 'Sıkça Sorulan Sorular (SSS) | ERAYDUŞ Ankara',
  description:
    'Erayduş duşakabin modelleri, özel ölçü üretimi, Ankara içi ücretsiz keşif, 6mm temperli emniyet camları ve 2 yıl garanti süreçleri hakkında merak edilenler.',
}

export default function FaqPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24 font-sans text-foreground md:pt-40">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Header */}
        <p className="mb-6 text-sm font-medium uppercase tracking-[0.3em] text-champagne">
          Erayduş Yardım Merkezi
        </p>
        <h1 className="mb-4 text-4xl font-light tracking-tight lg:text-5xl">
          Sıkça Sorulan <span className="font-semibold">Sorular</span>
        </h1>
        <p className="mb-14 max-w-2xl text-lg font-light text-muted-foreground leading-relaxed">
          Erayduş 6mm temperli cam duşakabin modellerimiz, Ankara ücretsiz keşif hizmetimiz, özel ölçü imalatı ve 2 yıl garanti süreçlerimiz hakkında merak edilen tüm yanıtlar.
        </p>

        {/* Groups */}
        <div className="space-y-14">
          {faqGroups.map((group) => (
            <section key={group.title}>
              <h2 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-champagne" />
                {group.title}
              </h2>
              <div className="divide-y divide-border border-y border-border rounded-2xl overflow-hidden bg-surface/30">
                {group.items.map((item) => (
                  <details key={item.q} className="group p-2">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-left text-base md:text-lg font-medium text-foreground transition-colors hover:text-champagne [&::-webkit-details-marker]:hidden">
                      <span>{item.q}</span>
                      <ChevronDown className="size-5 shrink-0 text-muted-foreground transition-transform duration-300 group-open:rotate-180 text-champagne" />
                    </summary>
                    <p className="px-4 pb-4 pt-1 text-[15px] font-light leading-relaxed text-muted-foreground border-t border-border/30 mt-2">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Contact Info Box */}
        <div className="mt-16 p-8 rounded-3xl bg-surface border border-border/50 shadow-sm">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h3 className="text-xl font-semibold">Aradığınız cevabı bulamadınız mı?</h3>
              <p className="mt-2 text-sm text-muted-foreground font-light max-w-md">
                Ankara Siteler genel merkezimiz ve uzman teknik ekibimiz tüm sorularınızı yanıtlamaktan memnuniyet duyar.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-champagne" /> (0312) 350 79 39</span>
                <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-champagne" /> 0554 883 00 71</span>
                <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-champagne" /> info@eraydus.net</span>
              </div>
            </div>
            <Link
              href="/iletisim"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-champagne px-7 py-3.5 text-sm font-semibold text-foreground transition-all hover:bg-champagne/90 hover:scale-105 active:scale-95 shadow-lg"
            >
              <MessageCircle className="size-4" />
              İletişime Geçin
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
