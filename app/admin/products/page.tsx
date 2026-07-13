"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, Eye, Package, TrendingUp, AlertCircle } from "lucide-react"

// Mock data
const mockProducts = [
  { id: 1, sku: 'EDGE-CRN', name: 'Edge Köşe Kabin', collection: 'EDGE', category: 'Duşakabin', price: '₺8.500', stock: 45, status: 'active', featured: true, sales: '↑ 12%' },
  { id: 2, sku: 'PURE-WLK', name: 'Pure Walk-in', collection: 'PURE', category: 'Duşakabin', price: '₺12.000', stock: 28, status: 'active', featured: true, sales: '↑ 8%' },
  { id: 3, sku: 'LUX-SLD', name: 'Luxury Sürgülü', collection: 'LUXURY', category: 'Duşakabin', price: '₺16.500', stock: 5, status: 'active', featured: false, sales: '↑ 15%' },
  { id: 4, sku: 'EDGE-PVT', name: 'Edge Pivot', collection: 'EDGE', category: 'Duşakabin', price: '₺9.200', stock: 0, status: 'inactive', featured: false, sales: '↓ 2%' },
]

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  const filteredProducts = mockProducts.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.sku.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'in-stock' ? p.stock > 0 : filterStatus === 'low-stock' ? p.stock > 0 && p.stock < 10 : p.stock === 0)
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ürün Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Tüm ürünlerinizi, stoklarını ve performanslarını yönetin.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm">
            <Package className="size-4" />
            Stok Alma
          </button>
          <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm">
            <Plus className="size-4" />
            Yeni Ürün
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Ürün', value: mockProducts.length, icon: Package, color: 'text-blue-600' },
          { title: 'Aktif Ürünler', value: mockProducts.filter(p => p.status === 'active').length, icon: TrendingUp, color: 'text-green-600' },
          { title: 'Düşük Stok', value: mockProducts.filter(p => p.stock > 0 && p.stock < 10).length, icon: AlertCircle, color: 'text-orange-600' },
          { title: 'Stokta Yok', value: mockProducts.filter(p => p.stock === 0).length, icon: AlertCircle, color: 'text-red-600' },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                  <Icon className={`size-5 ${stat.color}`} />
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 font-medium mt-1">{stat.title}</p>
            </div>
          )
        })}
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex gap-4 flex-wrap">
          <div className="flex-1 min-w-[250px] relative">
            <Search className="absolute left-3 top-2.5 size-5 text-gray-400" />
            <input
              type="text"
              placeholder="Ürün adı, SKU ara..."
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
            <option value="all">Tüm Stoklar</option>
            <option value="in-stock">Stokta Var</option>
            <option value="low-stock">Düşük Stok</option>
            <option value="out-of-stock">Stokta Yok</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="name">Ada Göre Sırala</option>
            <option value="price-low">Fiyata Göre (Düşük)</option>
            <option value="price-high">Fiyata Göre (Yüksek)</option>
            <option value="stock">Stok Miktarı</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Ürün Adı</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SKU</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Koleksiyon</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fiyat</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Stok</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Satış</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{product.name}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.sku}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.collection}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{product.price}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{product.stock}</span>
                      {product.stock === 0 && <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">Yok</span>}
                      {product.stock > 0 && product.stock < 10 && <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">Düşük</span>}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{product.sales}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
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

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Ürün ara..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-300 transition-all text-black"
            />
          </div>
          <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5 text-gray-700">
            <option>Toplu İşlemler</option>
            <option>Düzenle</option>
            <option>Çöpe Taşı</option>
          </select>
          <button className="px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            Uygula
          </button>
        </div>
        <div className="flex gap-2">
          <select className="bg-white border border-gray-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/5 text-gray-700">
            <option>Kategori Seç</option>
            <option>EDGE Serisi</option>
            <option>PURE Serisi</option>
            <option>LUXURY Serisi</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-gray-50 border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-100 transition-colors text-gray-700">
            <Filter className="size-4" />
            Filtrele
          </button>
        </div>
      </div>

      {/* WooCommerce Style Data Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 font-medium">
              <tr>
                <th className="px-4 py-4 whitespace-nowrap w-12"><Square className="size-4 text-gray-400" /></th>
                <th className="px-4 py-4 whitespace-nowrap w-20">Görsel</th>
                <th className="px-6 py-4 whitespace-nowrap">İsim</th>
                <th className="px-6 py-4 whitespace-nowrap">Kategori</th>
                <th className="px-6 py-4 whitespace-nowrap">Yerleşim</th>
                <th className="px-6 py-4 whitespace-nowrap">Fiyat</th>
                <th className="px-6 py-4 whitespace-nowrap">Durum</th>
                <th className="px-6 py-4 whitespace-nowrap text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Ürünler yükleniyor...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-8 text-center text-gray-500">
                    Henüz ürün eklenmemiş veya arama kriterinize uygun ürün yok.
                  </td>
                </tr>
              ) : filteredProducts.map((product) => {
                const imageUrl = Array.isArray(product.images) && product.images.length > 0 
                  ? product.images[0] 
                  : 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=200&auto=format&fit=crop'
                
                return (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-4"><Square className="size-4 text-gray-300" /></td>
                  <td className="px-4 py-4">
                    <div className="size-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={imageUrl} alt={product.title} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">{product.title}</div>
                    <div className="text-xs text-gray-400 mt-0.5" title={product.id}>ID: {product.id.split('-')[0]}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{product.series}</td>
                  <td className="px-6 py-4 text-gray-500">{product.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₺{product.price?.toLocaleString('tr-TR')}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                      product.status === 'published' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-gray-100 text-gray-600 border border-gray-200'
                    }`}>
                      {product.status === 'published' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/products/new?id=${product.id}`} className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Düzenle">
                        <Edit className="size-4" />
                      </Link>
                      <button className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors" title="Çöpe Taşı">
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
          <span>Toplam {filteredProducts.length} ürün</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">Önceki</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md bg-gray-50 font-medium text-gray-900">1</button>
            <button className="px-3 py-1 border border-gray-200 rounded-md hover:bg-gray-50 disabled:opacity-50">Sonraki</button>
          </div>
        </div>
      </div>
    </div>
  )
}
