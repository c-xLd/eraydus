"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Plus, Edit, Trash2, Eye, Package, TrendingUp, AlertCircle } from "lucide-react"
import { deleteProduct } from "../actions"
import { toast } from "sonner"
import { ProductsNav } from "./ProductsNav"

export default function ProductsClient({ initialProducts }: { initialProducts: any[] }) {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('name')
  const [products, setProducts] = useState(initialProducts)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         p.category_id?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = filterStatus === 'all' || (filterStatus === 'in-stock' ? p.status === 'active' : p.status !== 'active')
    return matchesSearch && matchesStatus
  }).sort((a, b) => {
    if (sortBy === 'price-low') return (a.base_price || 0) - (b.base_price || 0)
    if (sortBy === 'price-high') return (b.base_price || 0) - (a.base_price || 0)
    return (a.name || '').localeCompare(b.name || '')
  })

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu ürünü silmek istediğinize emin misiniz? Geri alınamaz.")) return

    setLoadingId(id)
    const result = await deleteProduct(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("Ürün başarıyla silindi.")
      setProducts(prev => prev.filter(p => p.id !== id))
    } else {
      toast.error("Ürün silinirken bir hata oluştu: " + result.error)
    }
  }

  return (
    <div className="space-y-6">
      <ProductsNav />

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
          { title: 'Toplam Ürün', value: products.length, icon: Package, color: 'text-blue-600' },
          { title: 'Aktif Ürünler', value: products.filter(p => p.status === 'active').length, icon: TrendingUp, color: 'text-green-600' },
          { title: 'Taslaklar', value: products.filter(p => p.status !== 'active').length, icon: AlertCircle, color: 'text-orange-600' },
          { title: 'Stokta Yok', value: 0, icon: AlertCircle, color: 'text-red-600' },
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
              placeholder="Ürün adı, koleksiyon ara..."
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
            <option value="in-stock">Yayında</option>
            <option value="out-of-stock">Taslak</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
          >
            <option value="name">Ada Göre Sırala</option>
            <option value="price-low">Fiyata Göre (Düşük)</option>
            <option value="price-high">Fiyata Göre (Yüksek)</option>
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
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tip</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">SEO Skoru</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Fiyat</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Henüz ürün eklenmemiş veya arama kriterinize uygun ürün yok.
                  </td>
                </tr>
              ) : filteredProducts.map((product) => {
                const imageUrl = Array.isArray(product.images) && product.images.length > 0 
                  ? product.images[0] 
                  : 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?q=80&w=200&auto=format&fit=crop'
                
                const isUpdating = loadingId === product.id

                // Calculate Pseudo-Real SEO Score for Product based on actual content lengths
                let seoScore = 0
                if (product.name && product.name.length >= 20 && product.name.length <= 60) seoScore += 40
                else if (product.name) seoScore += 20

                if (product.short_description && product.short_description.length >= 50) seoScore += 20
                else if (product.short_description) seoScore += 10

                if (product.description && product.description.length >= 200) seoScore += 40
                else if (product.description && product.description.length >= 50) seoScore += 20

                const getScoreColor = (score: number) => {
                  if (score >= 80) return 'text-emerald-600 bg-emerald-100'
                  if (score >= 50) return 'text-yellow-700 bg-yellow-100'
                  return 'text-red-600 bg-red-100'
                }

                return (
                <tr key={product.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="size-10 rounded-md overflow-hidden bg-gray-100 shrink-0 border border-gray-200">
                        <img src={imageUrl} alt={product.name} className="w-full h-full object-cover" />
                      </div>
                      <p className="font-medium text-gray-900">{product.name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${product.product_type === 'variable' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                      {product.product_type === 'variable' ? 'Varyasyonlu' : 'Basit'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-semibold ${getScoreColor(seoScore)}`}>
                        {seoScore} / 100
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.sale_price ? (
                      <div className="flex flex-col">
                        <span className="text-gray-400 line-through text-xs">₺{product.base_price?.toLocaleString('tr-TR')}</span>
                        <span className="text-red-600">₺{product.sale_price?.toLocaleString('tr-TR')}</span>
                      </div>
                    ) : (
                      <span>₺{product.base_price?.toLocaleString('tr-TR')}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      product.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {product.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <Link href={`/koleksiyonlar/${product.category?.slug || 'genel'}/${product.slug}`} target="_blank" className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                      <Eye className="size-4" />
                    </Link>
                    <Link href={`/admin/products/new?id=${product.id}`} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Düzenle">
                      <Edit className="size-4" />
                    </Link>
                    <button disabled={isUpdating} onClick={() => handleDelete(product.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
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
