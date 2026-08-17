'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Search, Settings2, CheckCircle, AlertTriangle } from 'lucide-react'
import SeoEditorDrawer from './SeoEditorDrawer'

interface ProductProps {
  id: string
  name: string
  slug: string
  categories: { slug: string }[] | null
  seo_metadata: any | null
}

interface Props {
  products: ProductProps[]
}

export default function SeoDashboardClient({ products }: Props) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ProductProps | null>(null)
  const [isEditorOpen, setIsEditorOpen] = useState(false)

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    p.slug.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-white border rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Katalog SEO Yönetimi</h2>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input 
            placeholder="Ürün ara..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 bg-gray-50/50 border-gray-200 focus-visible:ring-gray-200 rounded-xl"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50/50 text-gray-500">
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider rounded-tl-xl">Ürün / Path</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Durum</th>
              <th className="px-4 py-3 text-xs font-semibold uppercase tracking-wider">Meta</th>
              <th className="px-4 py-3 text-right rounded-tr-xl">İşlem</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredProducts.map(product => {
              const hasSeo = !!product.seo_metadata
              const isNoIndex = product.seo_metadata && !product.seo_metadata.robots_index

              return (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                    <p className="text-[11px] text-gray-500 mt-0.5">/{product.categories?.[0]?.slug || 'kategorisiz'}/{product.slug}</p>
                  </td>
                  <td className="px-4 py-3">
                    {isNoIndex ? (
                      <span className="px-2 py-1 bg-red-50 text-red-700 text-[10px] rounded uppercase font-bold tracking-wider">NOINDEX</span>
                    ) : (
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] rounded uppercase font-bold tracking-wider">INDEX</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {hasSeo ? (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600 bg-green-50 w-fit px-2 py-1 rounded">
                        <CheckCircle className="size-3" /> TANIMLI
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 bg-orange-50 w-fit px-2 py-1 rounded">
                        <AlertTriangle className="size-3" /> EKSİK
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-xs h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      onClick={() => {
                        setSelectedProduct(product)
                        setIsEditorOpen(true)
                      }}
                    >
                      <Settings2 className="size-3.5 mr-1.5" /> Düzenle
                    </Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-500">
            Aradığınız kritere uygun ürün bulunamadı.
          </div>
        )}
      </div>

      {selectedProduct && (
        <SeoEditorDrawer 
          open={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          product={selectedProduct}
        />
      )}
    </div>
  )
}
