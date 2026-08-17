'use client'

import { CustomerWithRelations } from '@/features/crm/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, Phone, MapPin, Building2, User, Clock, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface CustomerDrawerProps {
  customer: CustomerWithRelations | null
  open: boolean
  onClose: () => void
  onEdit: (customer: CustomerWithRelations) => void
}

export default function CustomerDrawer({ customer, open, onClose, onEdit }: CustomerDrawerProps) {
  if (!customer) return null

  const fullName = customer.customer_type === 'individual' 
    ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() 
    : customer.company_name

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-50 w-full max-w-md bg-white shadow-2xl border-l flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-light">Müşteri Detayları</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X className="size-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-8">
              {/* Profile Header */}
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="size-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-500">
                  {customer.customer_type === 'business' ? <Building2 className="size-8" /> : <User className="size-8" />}
                </div>
                <div>
                  <h3 className="text-2xl font-medium">{fullName}</h3>
                  <p className="text-gray-500">{customer.email}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider ${
                    customer.status === 'customer' ? 'bg-green-100 text-green-700' :
                    customer.status === 'lead' ? 'bg-blue-100 text-blue-700' :
                    customer.status === 'quote_sent' ? 'bg-amber-100 text-amber-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {customer.status.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium uppercase tracking-wider">
                    {customer.customer_type === 'business' ? 'KURUMSAL' : 'BİREYSEL'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="w-full flex gap-2" onClick={() => window.location.href = `mailto:${customer.email}`}>
                  <Mail className="size-4" /> E-Posta
                </Button>
                {customer.phone && (
                  <Button variant="outline" className="w-full flex gap-2" onClick={() => window.open(`https://wa.me/${customer.phone?.replace(/[^0-9]/g, '')}`, '_blank')}>
                    <Phone className="size-4" /> WhatsApp
                  </Button>
                )}
              </div>

              {/* Info Grid */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">İletişim & Konum</h4>
                <div className="bg-gray-50 p-4 rounded-xl space-y-3 text-sm">
                  {customer.phone && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Telefon</span>
                      <span className="font-medium">{customer.phone}</span>
                    </div>
                  )}
                  {(customer.city || customer.district) && (
                    <div className="flex justify-between">
                      <span className="text-gray-500">Bölge</span>
                      <span className="font-medium flex items-center gap-1">
                        <MapPin className="size-3 text-gray-400" />
                        {customer.district} {customer.district && customer.city && '/'} {customer.city}
                      </span>
                    </div>
                  )}
                  {customer.address && (
                    <div className="flex flex-col gap-1 pt-2 border-t">
                      <span className="text-gray-500">Açık Adres</span>
                      <span className="font-medium leading-relaxed">{customer.address}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-4">
                <h4 className="text-sm font-medium text-gray-900 uppercase tracking-wider">İstatistikler</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-gray-500 text-xs">Toplam Teklif</span>
                    <span className="text-xl font-medium">{customer.total_quotes || 0}</span>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl flex flex-col gap-1">
                    <span className="text-gray-500 text-xs">Toplam Harcama</span>
                    <span className="text-xl font-medium">₺{customer.total_spent || 0}</span>
                  </div>
                </div>
                <div className="bg-gray-50 p-4 rounded-xl text-sm flex justify-between">
                  <span className="text-gray-500 flex items-center gap-1"><Clock className="size-3" /> Oluşturulma</span>
                  <span className="font-medium">{new Date(customer.created_at).toLocaleDateString('tr-TR')}</span>
                </div>
              </div>
            </div>

            <div className="p-6 border-t flex gap-3">
              <Button onClick={() => onEdit(customer)} className="flex-1 bg-black text-white hover:bg-black/90">
                Düzenle
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
