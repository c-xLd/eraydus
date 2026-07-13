"use client"

import { useState } from 'react'
import { Search, Plus, Mail, Phone, MapPin, TrendingUp, MessageSquare } from 'lucide-react'

// Mock data
const mockCustomers = [
  { id: 1, name: 'Ahmet Yılmaz', email: 'ahmet@example.com', phone: '+90 555 123 4567', city: 'İstanbul', type: 'individual', quotes: 3, spent: '45,000₺', status: 'active', lastContact: 'Bugün' },
  { id: 2, name: 'Ayşe Demir', email: 'ayse@example.com', phone: '+90 555 234 5678', city: 'Ankara', type: 'business', quotes: 1, spent: '0₺', status: 'active', lastContact: '2 gün önce' },
  { id: 3, name: 'Mehmet Kaya', email: 'mehmet@example.com', phone: '+90 555 345 6789', city: 'İzmir', type: 'individual', quotes: 5, spent: '125,000₺', status: 'vip', lastContact: 'Bugün' },
  { id: 4, name: 'Zeynep Çelik', email: 'zeynep@example.com', phone: '+90 555 456 7890', city: 'Bursa', type: 'business', quotes: 2, spent: '89,500₺', status: 'active', lastContact: '1 hafta önce' },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState('all')

  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         customer.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = selectedStatus === 'all' || customer.status === selectedStatus
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Müşteri Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Tüm müşterilerinizi yönetin, segmentleyin ve analiz edin.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="size-4" />
          Yeni Müşteri
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Müşteri', value: '248', trend: '+12%' },
          { title: 'VIP Müşteriler', value: '28', trend: '+3' },
          { title: 'Bu Ay Yeni', value: '15', trend: '+5' },
          { title: 'Aktif Müşteriler', value: '198', trend: '95%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
            <p className="text-xs text-green-600 mt-2">{stat.trend}</p>
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
              placeholder="Müşteri adı, e-posta ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Konum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Teklif / Harcama</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Son İletişim</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{customer.name}</p>
                      <p className="text-sm text-gray-500">{customer.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <a href={`mailto:${customer.email}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        <Mail className="size-3" />
                        E-posta
                      </a>
                      <a href={`tel:${customer.phone}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1">
                        <Phone className="size-3" />
                        {customer.phone}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="size-4 text-gray-400" />
                      {customer.city}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">{customer.quotes} teklif</p>
                      <p className="text-gray-500">{customer.spent}</p>
                    </div>
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
                  <td className="px-6 py-4 text-sm text-gray-600">{customer.lastContact}</td>
                  <td className="px-6 py-4 text-center">
                    <button className="inline-flex items-center gap-2 px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <MessageSquare className="size-4" />
                      İletişim
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
