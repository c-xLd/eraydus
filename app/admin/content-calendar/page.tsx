"use client"

import { useState } from 'react'
import { Plus, Calendar, Edit, Trash2, Eye } from 'lucide-react'

// Mock data
const mockContent = [
  { id: 1, title: 'Yazlık Koleksiyonumuz Açılıyor', type: 'blog', language: 'tr', status: 'published', publishedDate: '2024-07-05', author: 'Ahmet Y.' },
  { id: 2, title: 'Yeni Ürün: Luxury Sürgülü Sistem', type: 'blog', language: 'tr', status: 'scheduled', scheduledDate: '2024-07-10', author: 'Fatma K.' },
  { id: 3, title: 'SEO İpuçları - Banyo Tasarımı', type: 'page', language: 'tr', status: 'draft', createdDate: '2024-07-04', author: 'Mehmet A.' },
  { id: 4, title: 'Yeni Katalog PDF', type: 'social', language: 'tr', status: 'published', publishedDate: '2024-07-03', author: 'Zeynep Ç.' },
  { id: 5, title: 'Summer Collection English', type: 'blog', language: 'en', status: 'draft', createdDate: '2024-07-04', author: 'Ahmet Y.' },
]

export default function ContentCalendarPage() {
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredContent = mockContent.filter(item => {
    const langMatch = filterLanguage === 'all' || item.language === filterLanguage
    const statusMatch = filterStatus === 'all' || item.status === filterStatus
    return langMatch && statusMatch
  })

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'published': return 'Yayınlandı'
      case 'scheduled': return 'Planlandı'
      case 'draft': return 'Taslak'
      default: return status
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">İçerik Takvimi</h1>
          <p className="text-sm text-gray-500 mt-1">Blog yazıları, sayfalar ve sosyal medya içeriğini planlayın.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="size-4" />
          Yeni İçerik
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam İçerik', value: '142', icon: '📝' },
          { title: 'Yayınlanan', value: '98', icon: '✓' },
          { title: 'Planlanmış', value: '28', icon: '📅' },
          { title: 'Taslak', value: '16', icon: '✏️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 flex-wrap">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Dil</label>
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="all">Tüm Diller</option>
            <option value="tr">Türkçe</option>
            <option value="en">İngilizce</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Durum</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="published">Yayınlandı</option>
            <option value="scheduled">Planlandı</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tür</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Dil</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Yazar</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContent.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{item.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {item.type === 'blog' ? '📝 Blog' :
                       item.type === 'page' ? '📄 Sayfa' :
                       item.type === 'social' ? '📱 Sosyal' : item.type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.language === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 İngilizce'}</span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{item.author}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {item.publishedDate || item.scheduledDate || item.createdDate}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                      <Eye className="size-4" />
                    </button>
                    <button className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Düzenle">
                      <Edit className="size-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                      <Trash2 className="size-4" />
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
