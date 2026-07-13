"use client"

import { useState } from "react"
import { Save, Globe, FileText, Search, Plus, Trash2, TrendingUp, BarChart3 } from "lucide-react"

// Mock data
const mockSeoPages = [
  { id: 1, slug: '/', title: 'Ana Sayfa', metaTitle: 'Eraydus - Modern Duşakabin Tasarımı', metaDesc: 'Premium duşakabin çözümleri ile banyo tasarımı değiştirin.', rank: '1', keyword: 'duşakabin', volume: 1200, status: 'optimized' },
  { id: 2, slug: '/magaza', title: 'Mağaza', metaTitle: 'Duşakabin Modelleri | Eraydus', metaDesc: 'Tüm duşakabin serileri ve koleksiyonlarımızı keşfedin.', rank: '3', keyword: 'uygun duşakabin', volume: 800, status: 'optimized' },
  { id: 3, slug: '/koleksiyonlar/edge', title: 'Edge Koleksiyonu', metaTitle: 'Edge Serisi | Minimalist Duşakabin', metaDesc: 'Ultra ince profillerle tasarlanmış modern duşakabin.', rank: '5', keyword: 'modern duşakabin', volume: 600, status: 'needs-improvement' },
  { id: 4, slug: '/tasarla', title: 'Konfigüratör', metaTitle: 'Kendi Duşakabini Tasarla | Eraydus', metaDesc: 'Özel duşakabin tasarımını konfigüratör ile oluştur.', rank: '12', keyword: 'duşakabin konfigüratör', volume: 400, status: 'needs-improvement' },
]

const globalSeo = {
  siteTitle: 'Eraydus - Modern Duşakabin Tasarımı',
  siteDesc: 'Premium duşakabin çözümleri ile banyo tasarımını değiştirin. Edge, Pure ve Luxury serileri.',
  keywords: 'duşakabin, cam duşakabin, modern banyo, duşa tasarımı',
  robots: 'index, follow',
  language: 'tr',
  favicon: '/favicon.ico',
  ogImage: '/og-image.jpg',
}

export default function SeoAdminPage() {
  const [activeTab, setActiveTab] = useState('pages')
  const [globalData, setGlobalData] = useState(globalSeo)
  const [pages, setPages] = useState(mockSeoPages)
  const [editingPageId, setEditingPageId] = useState(null)

  const handleGlobalChange = (key: string, value: string) => {
    setGlobalData(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">SEO Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizin arama motorlarındaki görünürlüğünü optimize edin.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors">
          <Save className="size-4" />
          Kaydet
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => { setActiveTab("global"); setEditingPageId(null); }}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "global" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Global Ayarlar
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "pages" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Sayfa Optimizasyonu
        </button>
        <button
          onClick={() => setActiveTab("keywords")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "keywords" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Anahtar Kelimeler
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "global" && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Global Site Ayarları</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Başlığı</label>
              <input
                type="text"
                value={globalData.siteTitle}
                onChange={(e) => handleGlobalChange('siteTitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
              />
              <p className="text-xs text-gray-500 mt-1">Arama sonuçlarında görünecek başlık</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
              <textarea
                value={globalData.siteDesc}
                onChange={(e) => handleGlobalChange('siteDesc', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
              />
              <p className="text-xs text-gray-500 mt-1">Meta açıklaması (155 karakter tavsiye edilir)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelimeler</label>
              <textarea
                value={globalData.keywords}
                onChange={(e) => handleGlobalChange('keywords', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
              />
              <p className="text-xs text-gray-500 mt-1">Virgülle ayrılmış anahtar kelimeler</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                <select
                  value={globalData.language}
                  onChange={(e) => handleGlobalChange('language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">İngilizce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Robots</label>
                <select
                  value={globalData.robots}
                  onChange={(e) => handleGlobalChange('robots', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Toplam Sayfa', value: pages.length, icon: FileText, color: 'text-blue-600' },
              { title: 'Optimize Edilmiş', value: pages.filter(p => p.status === 'optimized').length, icon: TrendingUp, color: 'text-green-600' },
              { title: 'İyileştirilmesi Gereken', value: pages.filter(p => p.status === 'needs-improvement').length, icon: BarChart3, color: 'text-orange-600' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
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

          {/* Pages List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sayfa</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Meta Başlık</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sıra</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pages.map((page) => (
                    <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{page.title}</p>
                          <p className="text-xs text-gray-500">{page.slug}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{page.metaTitle}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          page.status === 'optimized' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {page.status === 'optimized' ? 'Optimize' : 'İyileştir'}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">#{page.rank}</span>
                          <span className="text-xs text-gray-500">Google</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                          Düzenle
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab === "keywords" && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Anahtar Kelime</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sayfa</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Arama Hacmi</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sıralama</th>
                  <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pages.map((page) => (
                  <tr key={page.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-gray-900">{page.keyword}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{page.title}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{page.volume}</span>
                      <span className="text-xs text-gray-500 ml-1">arama/ay</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        parseInt(page.rank) <= 3 ? 'bg-green-100 text-green-700' :
                        parseInt(page.rank) <= 10 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        #{page.rank}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-semibold text-green-600">↑ 2</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

