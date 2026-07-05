"use client"

import { useState } from "react"
import Link from "next/link"
import { Search, Filter, Download, Edit, Trash2, Plus, Square } from "lucide-react"
import { products } from "@/lib/data/products"

export default function AdminProductsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.collectionName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Ürünler</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizdeki duşakabin modellerini, fiyatlarını ve özelliklerini yönetin.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors shadow-sm text-gray-700">
            <Download className="size-4" />
            Dışa Aktar
          </button>
          <Link href="/admin/products/new" className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm">
            <Plus className="size-4" />
            Yeni Ürün Ekle
          </Link>
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
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors group">
                  <td className="px-4 py-4"><Square className="size-4 text-gray-300" /></td>
                  <td className="px-4 py-4">
                    <div className="size-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors cursor-pointer">{product.name}</div>
                    <div className="text-xs text-gray-400 mt-0.5">ID: {product.id}</div>
                  </td>
                  <td className="px-6 py-4 font-medium text-gray-700">{product.collectionName}</td>
                  <td className="px-6 py-4 text-gray-500">{product.layoutType}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">₺{product.price.toLocaleString('tr-TR')}</td>
                  <td className="px-6 py-4">
                    <span className="bg-green-50 text-green-700 border border-green-200 text-[11px] font-medium px-2.5 py-1 rounded-full">
                      Yayında
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
              ))}
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
