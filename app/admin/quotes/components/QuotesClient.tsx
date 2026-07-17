"use client"

import { useState } from "react"
import { Search, Download, Eye, Trash2, Plus, Send, Clock, CheckCircle2, AlertCircle, Zap } from "lucide-react"
import { updateQuoteStatus, deleteQuote } from "../actions"
import { toast } from "sonner"

export default function QuotesClient({ initialQuotes }: { initialQuotes: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [quotes, setQuotes] = useState(initialQuotes)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const filteredQuotes = quotes.filter(q => {
    const searchString = `${q.customer_name} ${q.quote_number} ${q.customer_email}`.toLowerCase()
    const matchesSearch = searchString.includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-100 text-amber-700'
      case 'sent': return 'bg-blue-100 text-blue-700'
      case 'viewed': return 'bg-purple-100 text-purple-700'
      case 'accepted': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-red-100 text-red-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Bekliyor'
      case 'sent': return 'Gönderildi'
      case 'viewed': return 'Görüntülendi'
      case 'accepted': return 'Kabul Edildi'
      case 'rejected': return 'Reddedildi'
      default: return status
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending': return Clock
      case 'sent': return Send
      case 'viewed': return Eye
      case 'accepted': return CheckCircle2
      case 'rejected': return AlertCircle
      default: return Clock
    }
  }

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id)
    const result = await updateQuoteStatus(id, newStatus)
    setLoadingId(null)
    
    if (result.success) {
      toast.success("Teklif durumu güncellendi.")
      setQuotes(prev => prev.map(q => q.id === id ? { ...q, status: newStatus } : q))
    } else {
      toast.error("Durum güncellenirken bir hata oluştu: " + result.error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu teklifi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")) return

    setLoadingId(id)
    const result = await deleteQuote(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("Teklif başarıyla silindi.")
      setQuotes(prev => prev.filter(q => q.id !== id))
    } else {
      toast.error("Teklif silinirken hata oluştu: " + result.error)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Teklif Workflow</h1>
          <p className="text-sm text-gray-500 mt-1">Gelen teklif taleplerini, yanıtlarını ve durumlarını takip edin.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="size-4" />
            Dışa Aktar
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm">
            <Plus className="size-4" />
            Yeni Teklif
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { title: 'Toplam Teklif', value: quotes.length, icon: Zap, color: 'text-blue-600' },
          { title: 'Bekleyen', value: quotes.filter(q => q.status === 'pending').length, icon: Clock, color: 'text-amber-600' },
          { title: 'Gönderilen', value: quotes.filter(q => q.status === 'sent').length, icon: Send, color: 'text-blue-600' },
          { title: 'Kabul Edilen', value: quotes.filter(q => q.status === 'accepted').length, icon: CheckCircle2, color: 'text-green-600' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
              <div className="flex items-start justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`size-4 ${stat.color}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
            </div>
          )
        })}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Müşteri adı, teklif No veya E-posta ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending">Bekliyor</option>
            <option value="sent">Gönderildi</option>
            <option value="viewed">Görüntülendi</option>
            <option value="accepted">Kabul Edildi</option>
            <option value="rejected">Reddedildi</option>
          </select>
        </div>
      </div>

      {/* Quotes Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teklif No</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Müşteri</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tutar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kaynak</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-gray-500">
                    Görüntülenecek teklif bulunamadı.
                  </td>
                </tr>
              ) : filteredQuotes.map((quote) => {
                const StatusIcon = getStatusIcon(quote.status)
                const isUpdating = loadingId === quote.id
                
                return (
                  <tr key={quote.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                    <td className="px-6 py-4 font-semibold text-gray-900">{quote.quote_number || `#${quote.id.substring(0,6)}`}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{quote.customer_name}</p>
                        <p className="text-sm text-gray-500">{quote.customer_email || '-'}</p>
                        <p className="text-xs text-gray-400">{quote.customer_phone || '-'}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900">
                      {quote.total_amount ? `₺${quote.total_amount.toLocaleString('tr-TR')}` : '-'}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 capitalize">{quote.source?.replace('_', ' ')}</td>
                    <td className="px-6 py-4">
                      <select 
                        value={quote.status}
                        onChange={(e) => handleStatusChange(quote.id, e.target.value)}
                        disabled={isUpdating}
                        className={`inline-block px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer border-none outline-none ring-1 ring-inset ring-gray-200 ${getStatusBadge(quote.status)}`}
                      >
                        <option value="pending">Bekliyor</option>
                        <option value="sent">Gönderildi</option>
                        <option value="viewed">Görüntülendi</option>
                        <option value="accepted">Kabul Edildi</option>
                        <option value="rejected">Reddedildi</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(quote.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                    </td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button disabled={isUpdating} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                        <Eye className="size-4" />
                      </button>
                      <button disabled={isUpdating} onClick={() => handleDelete(quote.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
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
    </div>
  )
}
