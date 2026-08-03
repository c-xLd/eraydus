import { Metadata } from 'next'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  ArrowRight,
  Building2,
} from 'lucide-react'
import { IletisimFormClient } from './IletisimFormClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.eraydus.net'

export const metadata: Metadata = {
  title: 'İletişim | Erayduş Duşakabin',
  description: 'Projenizi birlikte şekillendirelim. Lüks duşakabin çözümleri için uzman ekibimizle iletişime geçin.',
  alternates: {
    canonical: `${SITE_URL}/iletisim`,
  },
}

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adres',
    value: 'Malazgirt Caddesi No:121/1B\nSiteler / Ankara',
    href: 'https://www.google.com/maps?cid=4589464454099566581',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '(0312) 350 79 39\n0554 883 00 71',
    href: 'tel:+903123507939',
  },
  {
    icon: Mail,
    label: 'E-posta',
    value: 'info@eraydus.net',
    href: 'mailto:info@eraydus.net',
  },
  {
    icon: Clock,
    label: 'Çalışma Saatleri',
    value: 'Pazartesi – Cumartesi: 09:00 – 18:00\nPazar: Kapalı',
  },
]

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full">
      {/* ───────────── Hero ───────────── */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <p
            className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            İletişim
          </p>
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl leading-[1.1]"
          >
            Projenizi Birlikte{' '}
            <span className="font-semibold">Şekillendirelim</span>
          </h1>
          <p
            className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl"
          >
            Hayalinizdeki banyo deneyimi için ilk adımı atın. Uzman ekibimiz
            size yardımcı olmaktan memnuniyet duyar.
          </p>
        </div>
      </section>

      {/* ───────────── Split: Info + Form ───────────── */}
      <section className="pb-32 md:pb-44 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-20">
            {/* Left: Contact Info */}
            <div
              className="lg:col-span-2"
            >
              <div className="flex flex-col gap-10">
                {contactInfo.map((item) => (
                  <div
                    key={item.label}
                    className="group"
                  >
                    <div className="flex items-start gap-5">
                      <div className="w-12 h-12 rounded-full bg-surface flex items-center justify-center shrink-0 group-hover:bg-champagne/10 transition-colors duration-300">
                        <item.icon
                          className="w-5 h-5 text-champagne"
                          strokeWidth={1.5}
                        />
                      </div>
                      <div>
                        <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                          {item.label}
                        </span>
                        {item.href ? (
                          <a
                            href={item.href}
                            target={
                              item.href.startsWith('http')
                                ? '_blank'
                                : undefined
                            }
                            rel="noopener noreferrer"
                            className="block mt-1 text-foreground text-base font-light whitespace-pre-line hover:text-champagne transition-colors"
                          >
                            {item.value}
                          </a>
                        ) : (
                          <p className="mt-1 text-foreground text-base font-light whitespace-pre-line">
                            {item.value}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* WhatsApp Quick Contact */}
              <div
                className="mt-14"
              >
                <a
                  href="https://wa.me/905548830071?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[#25D366] text-white px-8 h-14 rounded-full text-base font-medium hover:bg-[#20bd5a] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
                  WhatsApp ile Hızlı İletişim
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div
              className="lg:col-span-3"
            >
              <div className="bg-surface rounded-2xl p-8 md:p-12">
                <IletisimFormClient />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Map ───────────── */}
      <section className="bg-surface">
        <div className="container mx-auto px-6 max-w-[1440px] py-20">
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Building2
                className="w-5 h-5 text-champagne"
                strokeWidth={1.5}
              />
              <span className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-medium">
                Konum
              </span>
            </div>
            <div className="w-full rounded-2xl overflow-hidden" style={{ height: '450px' }}>
              <iframe
                src="https://maps.google.com/maps?cid=4589464454099566581&output=embed&hl=tr"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Eraydus Duşakabin Konum"
              />
            </div>
            <a
              href="https://www.google.com/maps?cid=4589464454099566581"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-champagne text-sm font-medium mt-4 hover:gap-3 transition-all duration-300"
            >
              Google Maps'te Aç
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
