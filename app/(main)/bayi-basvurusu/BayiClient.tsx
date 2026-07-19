'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Building2, TrendingUp, Headphones, BadgePercent, Send, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createClient } from '@/services/supabase/client'

const benefits = [
  { icon: BadgePercent, title: 'Avantajlı Bayi Fiyatları', text: 'Rekabetçi bayi iskontoları ve esnek ödeme koşulları.' },
  { icon: TrendingUp, title: 'Pazarlama Desteği', text: 'Katalog, görsel ve dijital pazarlama materyalleri.' },
  { icon: Headphones, title: 'Öncelikli Teknik Destek', text: 'Bayilere özel hızlı sipariş ve satış sonrası destek hattı.' },
  { icon: Building2, title: 'Bölgesel Yetki', text: 'Belirlenen bölgelerde ayrıcalıklı bayilik imkânı.' },
]

export default function BayiClient() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    city: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const details = [
      `Firma: ${formData.company}`,
      `Şehir: ${formData.city}`,
      '',
      formData.message,
    ].join('\n')

    const { error } = await supabase.from('messages').insert([
      {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: 'bayi',
        message: details,
      },
    ])

    setIsSubmitting(false)
    if (!error) {
      setIsSubmitted(true)
      setFormData({ name: '', company: '', email: '', phone: '', city: '', message: '' })
    } else {
      console.error('Error submitting dealer application:', error)
      alert('Başvurunuz gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

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
                {isSubmitted ? (
                  <div className="py-16 text-center">
                    <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-champagne/10">
                      <CheckCircle2 className="size-7 text-champagne" />
                    </div>
                    <h3 className="mb-3 text-2xl font-semibold tracking-tight">Başvurunuz Alındı</h3>
                    <p className="mx-auto max-w-md font-light text-muted-foreground">
                      Bayilik başvurunuz için teşekkür ederiz. Ekibimiz başvurunuzu değerlendirip en kısa sürede
                      sizinle iletişime geçecektir.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Ad Soyad
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Yetkili adı soyadı"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base transition-colors duration-300 placeholder:text-muted-foreground/50 focus-visible:border-champagne focus-visible:outline-none focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="company" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Firma Adı
                        </Label>
                        <Input
                          id="company"
                          name="company"
                          placeholder="Şirket / mağaza adı"
                          value={formData.company}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base transition-colors duration-300 placeholder:text-muted-foreground/50 focus-visible:border-champagne focus-visible:outline-none focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          E-posta
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base transition-colors duration-300 placeholder:text-muted-foreground/50 focus-visible:border-champagne focus-visible:outline-none focus-visible:ring-0"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                          Telefon
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+90 (5xx) xxx xx xx"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base transition-colors duration-300 placeholder:text-muted-foreground/50 focus-visible:border-champagne focus-visible:outline-none focus-visible:ring-0"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="city" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Şehir
                      </Label>
                      <Input
                        id="city"
                        name="city"
                        placeholder="Faaliyet gösterdiğiniz il"
                        value={formData.city}
                        onChange={handleChange}
                        required
                        className="h-12 rounded-none border-0 border-b border-border bg-transparent px-0 text-base transition-colors duration-300 placeholder:text-muted-foreground/50 focus-visible:border-champagne focus-visible:outline-none focus-visible:ring-0"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="message" className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                        Mesajınız
                      </Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Mevcut faaliyet alanınız ve bayilik hedefleriniz hakkında kısaca bilgi verin..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full resize-none rounded-none border-0 border-b border-border bg-transparent px-0 py-3 text-base text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/50 focus:border-champagne"
                      />
                    </div>

                    <Button type="submit" size="lg" disabled={isSubmitting} className="mt-2 w-full md:w-auto md:self-end">
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                          Gönderiliyor...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="size-4" />
                          Başvuruyu Gönder
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>

              <p className="mt-6 text-center text-sm text-muted-foreground">
                Sorularınız mı var?{' '}
                <Link href="/iletisim" className="font-medium text-champagne hover:underline">
                  Bizimle iletişime geçin
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
