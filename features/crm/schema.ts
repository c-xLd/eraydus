import { z } from 'zod'

export const customerSchema = z.object({
  customer_type: z.enum(['individual', 'business']),
  first_name: z.string().min(2, 'En az 2 karakter olmalıdır.').optional().or(z.literal('')),
  last_name: z.string().min(2, 'En az 2 karakter olmalıdır.').optional().or(z.literal('')),
  company_name: z.string().min(2, 'En az 2 karakter olmalıdır.').optional().or(z.literal('')),
  email: z.string().email('Geçerli bir e-posta adresi giriniz.'),
  phone: z.string().optional().or(z.literal('')),
  city: z.string().optional().or(z.literal('')),
  district: z.string().optional().or(z.literal('')),
  address: z.string().optional().or(z.literal('')),
  source: z.string().default('UNKNOWN'),
  status: z.enum(['lead', 'active', 'quote_sent', 'customer', 'inactive', 'lost']).default('lead'),
  assigned_to: z.string().uuid().optional().nullable(),
}).refine(data => {
  if (data.customer_type === 'individual') {
    return !!data.first_name && !!data.last_name
  }
  if (data.customer_type === 'business') {
    return !!data.company_name
  }
  return true
}, {
  message: "Bireysel müşteriler için ad/soyad, kurumsal müşteriler için firma adı zorunludur.",
  path: ["first_name"] // This will attach the error to first_name in UI
})

export type CustomerFormValues = z.infer<typeof customerSchema>

export const customerNoteSchema = z.object({
  content: z.string().min(2, 'Not en az 2 karakter olmalıdır.')
})

export type CustomerNoteFormValues = z.infer<typeof customerNoteSchema>
