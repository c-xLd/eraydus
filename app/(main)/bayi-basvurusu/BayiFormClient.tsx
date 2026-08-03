'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Send, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createClient } from '@/services/supabase/client'

export function BayiFormClient() {
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

  if (isSubmitted) {
    return (
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
    )
  }

  return (
    <>
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

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Sorularınız mı var?{' '}
        <Link href="/iletisim" className="font-medium text-champagne hover:underline">
          Bizimle iletişime geçin
        </Link>
        .
      </p>
    </>
  )
}
