'use client'
import Image from 'next/image'

import { useState } from 'react'
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  MessageCircle,
  ArrowRight,
  Building2,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createClient } from '@/services/supabase/client'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Adres',
    value: 'Dudullu OSB, 1. Cadde No:12\nÜmraniye, İstanbul 34776',
    href: 'https://maps.google.com',
  },
  {
    icon: Phone,
    label: 'Telefon',
    value: '+90 (216) 540 00 00',
    href: 'tel:+902165400000',
  },
  {
    icon: Mail,
    label: 'E-posta',
    value: 'info@eraydus.com',
    href: 'mailto:info@eraydus.com',
  },
  {
    icon: Clock,
    label: 'Çalışma Saatleri',
    value: 'Pazartesi – Cuma: 08:30 – 18:00\nCumartesi: 09:00 – 14:00',
  },
]

const subjectOptions = [
  { value: '', label: 'Konu Seçiniz' },
  { value: 'genel', label: 'Genel Bilgi' },
  { value: 'fiyat', label: 'Fiyat Teklifi' },
  { value: 'mimar', label: 'Mimar Portal' },
  { value: 'bayi', label: 'Bayi Başvurusu' },
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsSubmitting(true)

    const supabase = createClient()
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          message: formData.message,
        }
      ])

    setIsSubmitting(false)
    if (!error) {
      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } else {
      console.error('Error submitting message:', error)
      alert('Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    }
  }

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
                  href="https://wa.me/902165400000?text=Merhaba%2C%20bilgi%20almak%20istiyorum."
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
                {isSubmitted ? (
                  <div
                    className="text-center py-16"
                  >
                    <div className="w-16 h-16 rounded-full bg-champagne/10 flex items-center justify-center mx-auto mb-6">
                      <Send className="w-7 h-7 text-champagne" />
                    </div>
                    <h3 className="text-2xl font-semibold tracking-tight mb-3">
                      Mesajınız İletildi
                    </h3>
                    <p className="text-muted-foreground font-light max-w-md mx-auto">
                      En kısa sürede sizinle iletişime geçeceğiz. İlginiz
                      için teşekkür ederiz.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Ad Soyad */}
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="name" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Ad Soyad</Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Adınız ve soyadınız"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base focus-visible:ring-0 focus-visible:border-champagne focus-visible:outline-none transition-colors duration-300 placeholder:text-muted-foreground/50"
                        />
                      </div>

                      {/* E-posta */}
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="email" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">E-posta</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="ornek@email.com"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base focus-visible:ring-0 focus-visible:border-champagne focus-visible:outline-none transition-colors duration-300 placeholder:text-muted-foreground/50"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Telefon */}
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="phone" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Telefon</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          placeholder="+90 (5xx) xxx xx xx"
                          value={formData.phone}
                          onChange={handleChange}
                          className="h-12 bg-transparent border-0 border-b border-border rounded-none px-0 text-base focus-visible:ring-0 focus-visible:border-champagne focus-visible:outline-none transition-colors duration-300 placeholder:text-muted-foreground/50"
                        />
                      </div>

                      {/* Konu */}
                      <div className="flex flex-col gap-2">
                        <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Konu</Label>
                        <div className="relative">
                          <select
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                            className="h-12 w-full bg-transparent border-0 border-b border-border rounded-none px-0 text-base text-foreground outline-none transition-colors duration-300 focus:border-champagne appearance-none cursor-pointer"
                          >
                            {subjectOptions.map((option) => (
                              <option
                                key={option.value}
                                value={option.value}
                                disabled={option.value === ''}
                                className="bg-background text-foreground"
                              >
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground">
                            ↓
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Mesaj */}
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="message" className="text-xs uppercase tracking-widest text-muted-foreground font-semibold">Mesaj</Label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        placeholder="Projeniz hakkında bize bilgi verin..."
                        value={formData.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-transparent border-0 border-b border-border rounded-none px-0 py-3 text-base text-foreground outline-none transition-colors duration-300 resize-none focus:border-champagne placeholder:text-muted-foreground/50"
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      disabled={isSubmitting}
                      className="w-full md:w-auto md:self-end mt-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Gönderiliyor...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <Send className="w-4 h-4" />
                          Mesajı Gönder
                        </span>
                      )}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Map Placeholder ───────────── */}
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
            <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden bg-surface-dark">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2074&auto=format&fit=crop"
                alt="Harita konumu"
                className="w-full h-full object-cover opacity-40"
               fill />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-champagne flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-white" strokeWidth={1.5} />
                </div>
                <p className="text-white text-lg font-light">
                  Dudullu OSB, Ümraniye / İstanbul
                </p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-champagne text-sm font-medium mt-3 hover:gap-3 transition-all duration-300"
                >
                  Google Maps'te Aç
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
