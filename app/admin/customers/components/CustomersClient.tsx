"use client"

import { useState } from 'react'
import { Search, Plus, Mail, Phone, MapPin, Edit, Trash2 } from 'lucide-react'
import { createCustomer, updateCustomer, deleteCustomer } from '../actions'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"

export default function CustomersClient({ initialCustomers }: { initialCustomers: any[] }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [customers, setCustomers] = useState(initialCustomers)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState<any>(null)
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    city: '',
    customer_type: 'individual',
    status: 'active'
  })

  const filteredCustomers = customers.filter(customer => {
    const searchString = `${customer.first_name} ${customer.last_name} ${customer.email}`.toLowerCase()
    const matchesSearch = searchString.includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  const handleOpenNewDialog = () => {
    setEditingCustomer(null)
    setFormData({
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      city: '',
      customer_type: 'individual',
      status: 'active'
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (customer: any) => {
    setEditingCustomer(customer)
    setFormData({
      first_name: customer.first_name || '',
      last_name: customer.last_name || '',
      email: customer.email || '',
      phone: customer.phone || '',
      city: customer.city || '',
      customer_type: customer.customer_type || 'individual',
      status: customer.status || 'active'
    })
    setIsDialogOpen(true)
  }

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.email) {
      toast.error("Lütfen bir e-posta adresi giriniz.")
      return
    }

    setLoadingId(editingCustomer ? editingCustomer.id : 'new')
    
    try {
      if (editingCustomer) {
        const result = await updateCustomer(editingCustomer.id, formData)
        if (result.success && result.customer) {
          toast.success("Müşteri başarıyla güncellendi.")
          setCustomers(prev => prev.map(c => c.id === result.customer.id ? result.customer : c))
          setIsDialogOpen(false)
        } else {
          toast.error("Güncelleme hatası: " + result.error)
        }
      } else {
        const result = await createCustomer(formData)
        if (result.success && result.customer) {
          toast.success("Yeni müşteri başarıyla eklendi.")
          setCustomers(prev => [result.customer, ...prev])
          setIsDialogOpen(false)
        } else {
          toast.error("Ekleme hatası: " + result.error)
        }
      }
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu müşteriyi silmek istediğinize emin misiniz? Müşteriye ait tüm geçmiş kalıcı olarak silinecektir.")) return

    setLoadingId(id)
    const result = await deleteCustomer(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("Müşteri başarıyla silindi.")
      setCustomers(prev => prev.filter(c => c.id !== id))
    } else {
      toast.error("Silme işlemi başarısız: " + result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Müşteri Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Tüm müşterilerinizi yönetin, segmentleyin ve analiz edin.</p>
        </div>
        <button onClick={handleOpenNewDialog} className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="size-4" />
          Yeni Müşteri
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Müşteri', value: customers.length, trend: '' },
          { title: 'VIP Müşteriler', value: customers.filter(c => c.status === 'vip').length, trend: '' },
          { title: 'Bireysel Müşteriler', value: customers.filter(c => c.customer_type === 'individual').length, trend: '' },
          { title: 'Aktif Müşteriler', value: customers.filter(c => c.status === 'active' || c.status === 'vip').length, trend: '' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            {stat.trend && <p className="text-xs text-green-600 mt-2">{stat.trend}</p>}
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Müşteri adı veya e-posta ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="active">Aktif</option>
            <option value="vip">VIP</option>
            <option value="inactive">Pasif</option>
          </select>
        </div>
      </div>

      {/* Customers Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ad / E-posta</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">İletişim</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Şehir</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tür</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.length === 0 ? (
                 <tr>
                   <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                     Görüntülenecek müşteri bulunamadı.
                   </td>
                 </tr>
              ) : filteredCustomers.map((customer) => {
                const isUpdating = loadingId === customer.id
                const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'İsimsiz Müşteri'

                return (
                  <tr key={customer.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{fullName}</p>
                        <p className="text-sm text-gray-500">{customer.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <a href={`mailto:${customer.email}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                          <Mail className="size-3" />
                          E-posta
                        </a>
                        {customer.phone && (
                          <a href={`tel:${customer.phone}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                            <Phone className="size-3" />
                            {customer.phone}
                          </a>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <MapPin className="size-4 text-gray-400" />
                        {customer.city || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <span className="text-gray-600 capitalize">{customer.customer_type === 'business' ? 'Kurumsal' : 'Bireysel'}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                        customer.status === 'vip' ? 'bg-purple-100 text-purple-700' :
                        customer.status === 'active' ? 'bg-green-100 text-green-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {customer.status === 'vip' ? 'VIP' : customer.status === 'active' ? 'Aktif' : 'Pasif'}
                      </span>
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button disabled={isUpdating} onClick={() => handleOpenEditDialog(customer)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Düzenle">
                        <Edit className="size-4" />
                      </button>
                      <button disabled={isUpdating} onClick={() => handleDelete(customer.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                        <Trash2 className="size-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingCustomer ? 'Müşteriyi Düzenle' : 'Yeni Müşteri Ekle'}</DialogTitle>
            <DialogDescription>
              Müşteri bilgilerini girerek veritabanına kaydedin.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveCustomer} className="space-y-4 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Ad</label>
                <input required value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Soyad</label>
                <input required value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">E-posta</label>
              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Telefon</label>
                <input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Şehir</label>
                <input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Müşteri Türü</label>
                <select value={formData.customer_type} onChange={e => setFormData({...formData, customer_type: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black">
                  <option value="individual">Bireysel</option>
                  <option value="business">Kurumsal</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Durum</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black">
                  <option value="active">Aktif</option>
                  <option value="vip">VIP</option>
                  <option value="inactive">Pasif</option>
                </select>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t">
              <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">İptal</button>
              <button type="submit" disabled={loadingId === 'new' || (editingCustomer && loadingId === editingCustomer.id)} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-black/90">
                {editingCustomer ? 'Güncelle' : 'Kaydet'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
