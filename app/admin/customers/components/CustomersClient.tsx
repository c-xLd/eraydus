'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { Plus, Search, Filter, Mail, Phone, MoreHorizontal, ChevronLeft, ChevronRight } from 'lucide-react'
import type { CustomerWithRelations } from '@/features/crm/types'
import { deleteCustomer } from '@/features/crm/actions'
import CustomerForm from './CustomerForm'
import CustomerDrawer from './CustomerDrawer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'


interface CustomersClientProps {
  customers: CustomerWithRelations[]
  totalCount: number
  currentPage: number
  limit: number
}

export default function CustomersClient({ customers, totalCount, currentPage, limit }: CustomersClientProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '')
  
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<CustomerWithRelations | null>(null)
  
  const [deletingId, setDeletingId] = useState<string | null>(null)

  // Debounced Search using URL params (Antigravity UX Server-Side approach)
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())
      if (searchQuery) {
        params.set('search', searchQuery)
        params.set('page', '1') // Reset page on search
      } else {
        params.delete('search')
      }
      router.push(`${pathname}?${params.toString()}`)
    }, 400)

    return () => clearTimeout(timer)
  }, [searchQuery, pathname, router, searchParams])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`${pathname}?${params.toString()}`)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu müşteriyi silmek istediğinize emin misiniz?')) return
    setDeletingId(id)
    try {
      const res = await deleteCustomer(id)
      if (res.error) {
        alert(res.error)
      } else {
        setIsDrawerOpen(false)
      }
    } finally {
      setDeletingId(null)
    }
  }

  const openDrawer = (customer: CustomerWithRelations) => {
    setSelectedCustomer(customer)
    setIsDrawerOpen(true)
  }

  const openEdit = (customer: CustomerWithRelations) => {
    setSelectedCustomer(customer)
    setIsFormOpen(true)
  }

  const totalPages = Math.ceil(totalCount / limit)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-light tracking-tight text-gray-900">Müşteriler</h1>
          <p className="text-sm text-gray-500 mt-1">
            Toplam {totalCount} müşteri bulundu
          </p>
        </div>
        <Button onClick={() => { setSelectedCustomer(null); setIsFormOpen(true) }} className="bg-black text-white hover:bg-black/90 flex gap-2">
          <Plus className="size-4" />
          Yeni Müşteri
        </Button>
      </div>

      <div className="bg-white border rounded-xl overflow-hidden shadow-sm">
        {/* Toolbar */}
        <div className="p-4 border-b bg-gray-50/50 flex gap-4 items-center justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <Input 
              placeholder="İsim, e-posta veya telefon ile ara..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex gap-2 text-gray-600">
              <Filter className="size-4" /> Filtrele
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50/50">
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Müşteri</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">İletişim</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tür</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                <th className="px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">Oluşturulma</th>
                <th className="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    Arama kriterlerine uygun müşteri bulunamadı.
                  </td>
                </tr>
              ) : (
                customers.map(customer => {
                  const fullName = customer.customer_type === 'individual' 
                    ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'İsimsiz'
                    : customer.company_name || 'İsimsiz Firma'
                  
                  return (
                    <tr key={customer.id} className="hover:bg-gray-50/50 transition-colors group cursor-pointer" onClick={() => openDrawer(customer)}>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900">{fullName}</div>
                        {customer.district && <div className="text-xs text-gray-500 mt-1">{customer.district}{customer.city ? `, ${customer.city}` : ''}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600">{customer.email}</div>
                        {customer.phone && <div className="text-sm text-gray-500 mt-0.5">{customer.phone}</div>}
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md uppercase font-medium tracking-wide">
                          {customer.customer_type === 'business' ? 'Kurumsal' : 'Bireysel'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 text-xs rounded-md font-medium tracking-wide ${
                          customer.status === 'customer' ? 'bg-green-100 text-green-700' :
                          customer.status === 'lead' ? 'bg-blue-100 text-blue-700' :
                          customer.status === 'quote_sent' ? 'bg-amber-100 text-amber-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {customer.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(customer.created_at).toLocaleDateString('tr-TR')}
                      </td>
                      <td className="px-6 py-4 text-right flex gap-2 justify-end" onClick={e => e.stopPropagation()}>
                        <Button variant="ghost" size="sm" onClick={() => openEdit(customer)} className="h-8 px-2 text-gray-500 hover:text-gray-900">
                          Düzenle
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleDelete(customer.id)} className="h-8 px-2 text-red-500 hover:text-red-600 hover:bg-red-50">
                          {deletingId === customer.id ? '...' : 'Sil'}
                        </Button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t bg-gray-50/50 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Sayfa {currentPage} / {totalPages}
            </div>
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="size-4 mr-1" /> Önceki
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                disabled={currentPage >= totalPages}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Sonraki <ChevronRight className="size-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <CustomerForm 
        open={isFormOpen} 
        onOpenChange={setIsFormOpen} 
        customer={selectedCustomer || undefined}
        onSuccess={() => {
          if (isDrawerOpen && selectedCustomer) {
            // Need to close drawer if we edited from inside it so it refreshes properly, or we rely on server action revalidatePath
            setIsDrawerOpen(false)
          }
        }}
      />

      <CustomerDrawer 
        open={isDrawerOpen} 
        onClose={() => setIsDrawerOpen(false)} 
        customer={selectedCustomer}
        onEdit={(c) => {
          setSelectedCustomer(c)
          setIsFormOpen(true)
        }}
      />
    </div>
  )
}
