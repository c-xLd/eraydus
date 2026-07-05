"use client"

import { useState, useEffect } from "react"
import { Search, Filter, MoreHorizontal, Download, Eye, Trash2 } from "lucide-react"
import { createClient } from '@/services/supabase/client'

export default function QuotesPage() {
  const [quotes, setQuotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchQuotes() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('quotes')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (data) {
        setQuotes(data)
      }
      setLoading(false)
    }
    fetchQuotes()
  }, [])
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Teklifler</h1>
          <p className="text-sm text-gray-500 mt-1">Gelen tüm teklif taleplerini ve siparişleri buradan yönetin.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Download className="size-4" />
            Dışa Aktar
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Müşteri ara (İsim, Telefon, ID)..." 
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all"
          />
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5">
            <option>Tüm Durumlar</option>
            <option>Bekliyor</option>
            <option>Cevaplandı</option>
            <option>Tamamlandı</option>
            <option>İptal</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors">
            <Filter className="size-4" />
            Filtrele
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-6 py-4 whitespace-nowrap">ID</th>
                <th className="px-6 py-4 whitespace-nowrap">Müşteri</th>
                <th className="px-6 py-4 whitespace-nowrap">İletişim</th>
                <th className="px-6 py-4 whitespace-nowrap">Kaynak</th>
                <th className="px-6 py-4 whitespace-nowrap">Model / Seri</th>
                <th className="px-6 py-4 whitespace-nowrap">Tutar</th>
                <th className="px-6 py-4 whitespace-nowrap">Tarih</th>
                <th className="px-6 py-4 whitespace-nowrap">Durum</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    Teklifler yükleniyor...
                  </td>
                </tr>
              ) : quotes.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-6 py-8 text-center text-gray-500">
                    Henüz hiç teklif veya sipariş bulunmuyor.
                  </td>
                </tr>
              ) : quotes.map((quote) => {
                const isNew = quote.status === 'new' || !quote.status
                const statusLabel = isNew ? 'Bekliyor' : quote.status === 'contacted' ? 'Cevaplandı' : 'Tamamlandı'
                const date = new Date(quote.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: 'short', year: 'numeric' })
                return (
                <tr key={quote.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-6 py-4 font-medium text-gray-900" title={quote.id}>#{quote.id.split('-')[0]}</td>
                  <td className="px-6 py-4 font-semibold text-gray-900">{quote.customer_name}</td>
                  <td className="px-6 py-4 text-gray-500">{quote.phone}</td>
                  <td className="px-6 py-4">
                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-md text-xs font-medium">
                      Konfigüratör
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-900 capitalize">{quote.configuration_data?.collection || '-'} Serisi</td>
                  <td className="px-6 py-4 font-medium">₺{quote.calculated_price?.toLocaleString('tr-TR') || '-'}</td>
                  <td className="px-6 py-4 text-gray-500">{date}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      statusLabel === 'Bekliyor' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                      statusLabel === 'Cevaplandı' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                      'bg-green-50 text-green-700 border border-green-200'
                    }`}>
                      {statusLabel}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="İncele">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Sil">
                        <Trash2 className="size-4" />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors">
                        <MoreHorizontal className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>Toplam {quotes.length} kayıt</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">Önceki</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md bg-gray-50 font-medium">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">Sonraki</button>
          </div>
        </div>
      </div>
    </div>
  )
}
