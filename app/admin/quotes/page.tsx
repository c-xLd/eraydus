"use client"

import { useState, useEffect } from "react"
import { Search, Download, Eye, Trash2, Plus, Send, CheckCircle2, AlertCircle, Zap } from "lucide-react"
import { createClient } from '@/services/supabase/client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function QuotesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuotes() {
      const supabase = createClient()
      const { data } = await supabase
        .from('quote_requests')
        .select(`
          *,
          customers (
            first_name,
            last_name,
            email,
            phone
          ),
          configurations (
             id,
             price
          )
        `)
        .order('created_at', { ascending: false })

      if (data) setQuotes(data)
      setLoading(false)
    }
    fetchQuotes()
  }, [])

  const filteredQuotes = quotes.filter(q => {
    const customerName = q.customers
      ? `${q.customers.first_name || ''} ${q.customers.last_name || ''}`.trim()
      : 'Bilinmeyen Müşteri'

    const matchesSearch = customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (q.quote_number && q.quote_number.toLowerCase().includes(searchQuery.toLowerCase()))
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-red-100 text-red-700'
      case 'sent': return 'bg-blue-100 text-blue-700'
      case 'viewed': return 'bg-purple-100 text-purple-700'
      case 'accepted': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Yeni Talep'
      case 'sent': return 'Teklif İletildi'
      case 'viewed': return 'Görüntülendi'
      case 'accepted': return 'Onaylandı'
      case 'rejected': return 'Reddedildi'
      default: return status || 'Bilinmiyor'
    }
  }

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '-'
    const date = new Date(dateStr)
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Teklif Workflow</h1>
          <p className="text-sm text-gray-500 mt-1">Müşteri taleplerini yönetin ve teklif sürecini takip edin.</p>
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

      {/* Stats Pipeline */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[
          { label: 'Yeni Talep', value: quotes.filter(q => q.status === 'pending').length, icon: Zap, color: 'text-red-600' },
          { label: 'İletildi', value: quotes.filter(q => q.status === 'sent').length, icon: Send, color: 'text-blue-600' },
          { label: 'Görüntülendi', value: quotes.filter(q => q.status === 'viewed').length, icon: Eye, color: 'text-purple-600' },
          { label: 'Onaylandı', value: quotes.filter(q => q.status === 'accepted').length, icon: CheckCircle2, color: 'text-green-600' },
          { label: 'Reddedildi', value: quotes.filter(q => q.status === 'rejected').length, icon: AlertCircle, color: 'text-gray-600' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">{stat.label}</span>
              <stat.icon className={`size-4 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Müşteri veya teklif no ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="pending">Yeni Talepler</option>
            <option value="sent">İletilenler</option>
            <option value="viewed">Görüntülenenler</option>
            <option value="accepted">Onaylananlar</option>
          </select>
        </div>
      </div>

      {/* Quotes List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teklif/Müşteri</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">İletişim</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tutar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                 <tr>
                 <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                   Teklifler yükleniyor...
                 </td>
               </tr>
              ) : filteredQuotes.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Henüz teklif talebi bulunmuyor veya aramanızla eşleşen sonuç yok.
                  </td>
                </tr>
              ) : filteredQuotes.map((quote) => {
                const customerName = quote.customers
                  ? `${quote.customers.first_name || ''} ${quote.customers.last_name || ''}`.trim()
                  : 'Bilinmeyen Müşteri'

                const customerEmail = quote.customers?.email || '-'

                // Try to get price from estimated_price, approved_price, or config price
                const price = quote.approved_price || quote.estimated_price || (quote.configurations && quote.configurations.price) || null;
                const formattedPrice = price ? `₺${price.toLocaleString('tr-TR')}` : 'Fiyat Bekleniyor';

                return (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{customerName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">{quote.quote_number || quote.id.split('-')[0]}</span>
                        <span className="text-[11px] font-medium text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded">{quote.source || 'Website'}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm text-gray-900">{customerEmail}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{formattedPrice}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadge(quote.status)}`}>
                        {getStatusText(quote.status)}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-sm text-gray-900">{formatDate(quote.created_at)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Görüntüle"
                    >
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
