'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { customerSchema, type CustomerFormValues } from '@/features/crm/schema'
import { createCustomer, updateCustomer } from '@/features/crm/actions'
import type { Customer } from '@/features/crm/types'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'

interface CustomerFormProps {
  customer?: Customer
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export default function CustomerForm({ customer, open, onOpenChange, onSuccess }: CustomerFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<any>({
    resolver: zodResolver(customerSchema as any),
    defaultValues: {
      customer_type: customer?.customer_type || 'individual',
      first_name: customer?.first_name || '',
      last_name: customer?.last_name || '',
      company_name: customer?.company_name || '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      city: customer?.city || '',
      district: customer?.district || '',
      address: customer?.address || '',
      source: customer?.source || 'UNKNOWN',
      status: customer?.status || 'lead',
    }
  })

  const type = watch('customer_type')

  const onSubmit = async (data: any) => {
    setIsSubmitting(true)
    setServerError(null)

    // Form data is created since server actions can accept formData
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        formData.append(key, value as string)
      }
    })

    try {
      const res = customer 
        ? await updateCustomer(customer.id, formData)
        : await createCustomer(formData)

      if (res.error) {
        setServerError(res.error)
      } else {
        onOpenChange(false)
        onSuccess?.()
      }
    } catch (err) {
      setServerError('Bir hata oluştu.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-white border-none shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-light">{customer ? 'Müşteriyi Düzenle' : 'Yeni Müşteri'}</DialogTitle>
          <DialogDescription>Müşteri bilgilerini girerek veritabanına kaydedin.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-4">
          {serverError && (
            <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md border border-red-100">
              {serverError}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Müşteri Türü</Label>
              <Select value={type} onValueChange={(val: any) => setValue('customer_type', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="individual">Bireysel</SelectItem>
                  <SelectItem value="business">Kurumsal</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Durum</Label>
              <Select defaultValue={customer?.status || 'lead'} onValueChange={(val: any) => setValue('status', val)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lead">Aday (Lead)</SelectItem>
                  <SelectItem value="active">Aktif İletişim</SelectItem>
                  <SelectItem value="quote_sent">Teklif İletildi</SelectItem>
                  <SelectItem value="customer">Müşteri</SelectItem>
                  <SelectItem value="lost">Kaybedildi</SelectItem>
                  <SelectItem value="inactive">Pasif</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {type === 'individual' ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Ad *</Label>
                <Input {...register('first_name')} />
                {errors.first_name && <span className="text-xs text-red-500">{errors.first_name.message as string}</span>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="last_name">Soyad *</Label>
                <div className="space-y-1">
                  <Input id="last_name" {...register('last_name')} />
                  {errors.last_name && <span className="text-xs text-red-500">{errors.last_name.message as string}</span>}
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <Label htmlFor="company_name">Firma Adı *</Label>
              <div className="space-y-1">
                <Input id="company_name" {...register('company_name')} />
                {errors.company_name && <span className="text-xs text-red-500">{errors.company_name.message as string}</span>}
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-Posta *</Label>
              <div className="space-y-1">
                <Input id="email" type="email" {...register('email')} />
                {errors.email && <span className="text-xs text-red-500">{errors.email.message as string}</span>}
              </div>
            </div>
            <div className="space-y-2">
              <Label>Telefon</Label>
              <Input {...register('phone')} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Şehir</Label>
              <Input {...register('city')} />
            </div>
            <div className="space-y-2">
              <Label>İlçe</Label>
              <Input {...register('district')} />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Kaynak</Label>
            <Select defaultValue={customer?.source || 'UNKNOWN'} onValueChange={(val) => setValue('source', val)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="UNKNOWN">Bilinmiyor</SelectItem>
                <SelectItem value="WEBSITE">Web Sitesi</SelectItem>
                <SelectItem value="WHATSAPP">WhatsApp</SelectItem>
                <SelectItem value="PHONE">Telefon</SelectItem>
                <SelectItem value="GOOGLE">Google Arama</SelectItem>
                <SelectItem value="INSTAGRAM">Instagram</SelectItem>
                <SelectItem value="REFERRAL">Referans</SelectItem>
                <SelectItem value="SHOWROOM">Showroom (Mağaza)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              İptal
            </Button>
            <Button type="submit" disabled={isSubmitting} className="w-32 bg-black text-white hover:bg-black/90">
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : 'Kaydet'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
