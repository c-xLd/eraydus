"use client"

import { useState } from "react"
import { Search, Download, Eye, Trash2, Plus, Send, Clock, CheckCircle2, AlertCircle, Zap } from "lucide-react"

// Mock data
const mockQuotes = [
  { id: '#1045', customer: 'Ahmet Yılmaz', email: 'ahmet@example.com', product: 'Edge Corner', amount: '₺8.500', status: 'pending', date: '2024-07-05 14:30', source: 'Configurator', days: 'Bugün' },
  { id: '#1044', customer: 'Ayşe Demir', email: 'ayse@example.com', product: 'Pure Walk-in', amount: '₺12.000', status: 'sent', date: '2024-07-05 11:15', source: 'WhatsApp', days: 'Bugün' },
  { id: '#1043', customer: 'Mehmet Kaya', email: 'mehmet@example.com', product: 'Luxury Sliding', amount: '₺16.500', status: 'viewed', date: '2024-07-04 16:45', source: 'Contact Form', days: 'Dün' },
  { id: '#1042', customer: 'Zeynep Çelik', email: 'zeynep@example.com', product: 'Edge Pivot', amount: '₺9.200', status: 'accepted', date: '2024-07-04 09:20', source: 'Configurator', days: 'Dün' },
  { id: '#1041', customer: 'Ali Demir', email: 'ali@example.com', product: 'Pure Walk-in', amount: '₺12.000', status: 'rejected', date: '2024-07-03 10:00', source: 'Direct', days: '2 gün önce' },
]

export default function QuotesPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedQuote, setSelectedQuote] = useState(null)

  const filteredQuotes = mockQuotes.filter(q => {
    const matchesSearch = q.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         q.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || q.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending': return 'bg-red-100 text-red-700'
      case 'sent': return 'bg-blue-100 text-blue-700'
      case 'viewed': return 'bg-yellow-100 text-yellow-700'
      case 'accepted': return 'bg-green-100 text-green-700'
      case 'rejected': return 'bg-gray-100 text-gray-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status) => {
    switch(status) {
      case 'pending': return 'Bekliyor'
      case 'sent': return 'Gönderildi'
      case 'viewed': return 'Görüntülendi'
      case 'accepted': return 'Kabul'
      case 'rejected': return 'Reddedildi'
      default: return status
    }
  }

  const getStatusIcon = (status) => {
    switch(status) {
      case 'pending': return AlertCircle
      case 'sent': return Send
      case 'viewed': return Eye
      case 'accepted': return CheckCircle2
      case 'rejected': return AlertCircle
      default: return Clock
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
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { title: 'Toplam Teklif', value: mockQuotes.length, icon: Zap, color: 'text-blue-600' },
          { title: 'Bekleyen', value: mockQuotes.filter(q => q.status === 'pending').length, icon: AlertCircle, color: 'text-red-600' },
          { title: 'Gönderilen', value: mockQuotes.filter(q => q.status === 'sent').length, icon: Send, color: 'text-blue-600' },
          { title: 'Kabul Edilen', value: mockQuotes.filter(q => q.status === 'accepted').length, icon: CheckCircle2, color: 'text-green-600' },
          { title: 'Ort. Dönüşüm', value: '28%', icon: Zap, color: 'text-purple-600' },
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
              placeholder="Müşteri adı, teklif ID ara..."
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
            <option value="pending">Bekliyor</option>
            <option value="sent">Gönderildi</option>
            <option value="viewed">Görüntülendi</option>
            <option value="accepted">Kabul</option>
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teklif ID</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Müşteri</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ürün</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tutar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Kaynak</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQuotes.map((quote) => {
                const StatusIcon = getStatusIcon(quote.status)
                return (
                  <tr key={quote.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-gray-900">{quote.id}</td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{quote.customer}</p>
                        <p className="text-sm text-gray-500">{quote.email}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{quote.product}</td>
                    <td className="px-6 py-4 font-semibold text-gray-900">{quote.amount}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{quote.source}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${quote.status === 'accepted' ? 'text-green-600' : quote.status === 'rejected' ? 'text-gray-600' : quote.status === 'pending' ? 'text-red-600' : 'text-blue-600'}`} />
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(quote.status)}`}>
                          {getStatusLabel(quote.status)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{quote.date}</td>
                    <td className="px-6 py-4 flex justify-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Sil">
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
