'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Edit2, Search, Link as LinkIcon, AlertTriangle } from 'lucide-react'
import { Input } from '@/components/ui/input'
import CategorySeoDrawer from './CategorySeoDrawer'

interface Props {
  categories: any[]
}

export default function CategorySeoClient({ categories }: Props) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<any | null>(null)

  const filtered = categories.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    c.slug.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="bg-white border rounded-3xl overflow-hidden shadow-sm">
      <div className="p-4 border-b flex items-center justify-between bg-gray-50/50">
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <Input 
            placeholder="Kategori Ara..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 bg-white"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-medium">
            <tr>
              <th className="px-6 py-4">Kategori Adı</th>
              <th className="px-6 py-4">İndeks Durumu</th>
              <th className="px-6 py-4">Meta Title</th>
              <th className="px-6 py-4">Aksiyon</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((category) => {
              const meta = category.seo_metadata
              const noindex = meta && meta.robots_index === false
              const missingTitle = !meta?.title
              const missingDesc = !meta?.description

              return (
                <tr key={category.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{category.name}</span>
                      <span className="text-gray-400 text-xs flex items-center mt-1">
                        <LinkIcon className="size-3 mr-1" /> /urunler/{category.slug}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {noindex ? (
                      <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200">NoIndex</Badge>
                    ) : (
                      <Badge className="bg-green-100 text-green-700 hover:bg-green-200">İndeksleniyor</Badge>
                    )}
                  </td>
                  <td className="px-6 py-4 max-w-[200px] truncate">
                    {missingTitle || missingDesc ? (
                      <div className="flex items-center text-amber-600 gap-1 text-xs font-medium">
                        <AlertTriangle className="size-3.5" /> Eksik Metadata
                      </div>
                    ) : (
                      <span className="text-gray-600">{meta.title}</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCategory(category)}
                      className="rounded-xl hover:bg-gray-100"
                    >
                      <Edit2 className="size-3.5 mr-2" />
                      Düzenle
                    </Button>
                  </td>
                </tr>
              )
            })}
            
            {filtered.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                  Hiç kategori bulunamadı.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <CategorySeoDrawer 
        category={selectedCategory} 
        open={!!selectedCategory} 
        onClose={() => setSelectedCategory(null)} 
      />
    </div>
  )
}
