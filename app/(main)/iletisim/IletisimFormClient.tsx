'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

const subjectOptions = [
  { value: '', label: 'Konu Seçiniz' },
  { value: 'genel', label: 'Genel Bilgi' },
  { value: 'fiyat', label: 'Fiyat Teklifi' },
  { value: 'mimar', label: 'Mimar Portal' },
  { value: 'bayi', label: 'Bayi Başvurusu' },
]

export function IletisimFormClient() {
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

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (!res.ok) throw new Error('Sunucu hatası')

      setIsSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      console.error('Submit error:', err)
      alert('Mesajınız gönderilirken bir hata oluştu. Lütfen tekrar deneyin.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="text-center py-16">
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
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
  )
}
