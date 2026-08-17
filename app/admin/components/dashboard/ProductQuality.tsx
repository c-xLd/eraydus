'use client'

import type { DashboardData } from '@/features/dashboard/types'
import { Package, ShieldAlert, Link as LinkIcon, Search } from 'lucide-react'
import Link from 'next/link'

interface Props {
  products: DashboardData['products']
}

export default function ProductQuality({ products }: Props) {
  return (
    <div className="bg-white p-6 rounded-3xl border shadow-sm h-full flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Katalog & Veri Kalitesi</h2>
        <Link href="/admin/products" className="text-xs font-medium text-blue-600 hover:underline">
          Katalog
        </Link>
      </div>

      <div className="flex-1 grid grid-cols-2 gap-4">
        {/* Total Products */}
        <div className="p-4 border rounded-2xl bg-gray-50 flex items-center gap-4">
          <div className="p-2.5 bg-white rounded-xl shadow-sm border border-gray-100 text-gray-500">
            <Package className="size-5" />
          </div>
          <div>
            <p className="text-2xl font-light text-gray-900 leading-none mb-1">{products.total}</p>
            <p className="text-xs font-medium text-gray-500">Aktif Ürün</p>
          </div>
        </div>

        {/* Missing SEO */}
        <div className={`p-4 border rounded-2xl flex items-center gap-4 transition-colors ${products.missingSeo > 0 ? 'bg-orange-50 border-orange-100 hover:bg-orange-100/50 cursor-pointer' : 'bg-gray-50'}`}>
          <div className={`p-2.5 rounded-xl shadow-sm border ${products.missingSeo > 0 ? 'bg-white border-orange-100 text-orange-500' : 'bg-white border-gray-100 text-gray-400'}`}>
            <Search className="size-5" />
          </div>
          <div>
            <p className={`text-2xl font-light leading-none mb-1 ${products.missingSeo > 0 ? 'text-orange-700' : 'text-gray-900'}`}>{products.missingSeo}</p>
            <p className={`text-xs font-medium ${products.missingSeo > 0 ? 'text-orange-600' : 'text-gray-500'}`}>SEO Eksik</p>
          </div>
        </div>

        {/* Orphans */}
        <div className={`p-4 border rounded-2xl flex items-center gap-4 transition-colors ${products.orphan > 0 ? 'bg-red-50 border-red-100 hover:bg-red-100/50 cursor-pointer' : 'bg-gray-50'}`}>
          <div className={`p-2.5 rounded-xl shadow-sm border ${products.orphan > 0 ? 'bg-white border-red-100 text-red-500' : 'bg-white border-gray-100 text-gray-400'}`}>
            <LinkIcon className="size-5" />
          </div>
          <div>
            <p className={`text-2xl font-light leading-none mb-1 ${products.orphan > 0 ? 'text-red-700' : 'text-gray-900'}`}>{products.orphan}</p>
            <p className={`text-xs font-medium ${products.orphan > 0 ? 'text-red-600' : 'text-gray-500'}`}>Öksüz (Kategorisiz)</p>
          </div>
        </div>

        {/* Low Stock */}
        <div className={`p-4 border rounded-2xl flex items-center gap-4 transition-colors ${products.lowStock > 0 ? 'bg-rose-50 border-rose-100 hover:bg-rose-100/50 cursor-pointer' : 'bg-gray-50'}`}>
          <div className={`p-2.5 rounded-xl shadow-sm border ${products.lowStock > 0 ? 'bg-white border-rose-100 text-rose-500' : 'bg-white border-gray-100 text-gray-400'}`}>
            <ShieldAlert className="size-5" />
          </div>
          <div>
            <p className={`text-2xl font-light leading-none mb-1 ${products.lowStock > 0 ? 'text-rose-700' : 'text-gray-900'}`}>{products.lowStock}</p>
            <p className={`text-xs font-medium ${products.lowStock > 0 ? 'text-rose-600' : 'text-gray-500'}`}>Düşük Stok</p>
          </div>
        </div>
      </div>
      
      {(products.missingSeo > 0 || products.orphan > 0) && (
        <div className="mt-4 flex justify-end">
          <Link href="/admin/seo" className="text-xs font-medium text-red-600 hover:underline flex items-center gap-1">
            <ShieldAlert className="size-3" /> Hataları SEO Panelinde Çöz
          </Link>
        </div>
      )}
    </div>
  )
}
