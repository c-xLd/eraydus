'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Loader2, List, Type, Palette } from 'lucide-react'
import { createAttribute, updateAttribute, deleteAttribute } from '../../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ProductsNav } from '../../components/ProductsNav'
import { generateSlug } from '@/lib/utils'

export function AttributeManagerClient({ attributes }: { attributes: any[] }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    type: 'select'
  })

  const openModalForNew = () => {
    setEditingId(null)
    setFormData({ name: '', slug: '', type: 'select' })
    setIsModalOpen(true)
  }

  const openModalForEdit = (attr: any) => {
    setEditingId(attr.id)
    setFormData({ name: attr.name, slug: attr.slug, type: attr.type || 'select' })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu niteliği silmek istediğinize emin misiniz? Altındaki tüm değerler de silinebilir.")) return
    const res = await deleteAttribute(id)
    if (res.success) {
      toast.success("Nitelik başarıyla silindi!")
      router.refresh()
    } else {
      toast.error(res.error || "Silinirken hata oluştu")
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    
    // Auto-generate slug if empty
    const slugToSave = formData.slug ? generateSlug(formData.slug) : generateSlug(formData.name)

    let res
    if (editingId) {
      res = await updateAttribute(editingId, {
        name: formData.name,
        slug: slugToSave,
        type: formData.type
      })
    } else {
      res = await createAttribute({
        name: formData.name,
        slug: slugToSave,
        type: formData.type
      })
    }

    if (res.success) {
      toast.success(editingId ? 'Nitelik güncellendi!' : 'Nitelik başarıyla oluşturuldu!')
      setIsModalOpen(false)
      setFormData({ name: '', slug: '', type: 'select' })
      router.refresh()
    } else {
      toast.error(res.error || 'Hata oluştu')
    }
    
    setIsSaving(false)
  }

  const getTypeIcon = (type: string) => {
    if (type === 'color') return <Palette className="size-4" />
    if (type === 'button') return <Type className="size-4" />
    return <List className="size-4" />
  }

  return (
    <div className="space-y-6">
      <ProductsNav />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Nitelikler</h1>
          <p className="text-sm text-gray-500">Global ürün niteliklerini (Örn: Cam Tipi, Profil Rengi) yönetin.</p>
        </div>
        <button 
          onClick={openModalForNew}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          Yeni Nitelik
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
          <div className="col-span-4">Nitelik Adı</div>
          <div className="col-span-3">Slug (Kısa Ad)</div>
          <div className="col-span-2">Görsel Tipi</div>
          <div className="col-span-3 text-right">İşlemler</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {!attributes || attributes.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Henüz nitelik eklenmemiş. Nitelikler ekleyerek varyasyonlu ürünler oluşturabilirsiniz.
            </div>
          ) : (
            attributes.map((attr) => (
              <div key={attr.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-4 font-medium text-gray-900">
                  {attr.name}
                </div>
                <div className="col-span-3 text-sm text-gray-500">
                  {attr.slug}
                </div>
                <div className="col-span-2 text-sm text-gray-500 capitalize flex items-center gap-2">
                  {getTypeIcon(attr.type)}
                  {attr.type}
                </div>
                <div className="col-span-3 flex items-center justify-end gap-2">
                  <Link href={`/admin/products/attributes/${attr.id}`} className="px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
                    Değerleri Düzenle
                  </Link>
                  <button onClick={() => openModalForEdit(attr)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(attr.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Niteliği Düzenle' : 'Yeni Nitelik Oluştur'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nitelik Adı</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black" 
                  placeholder="Örn: Profil Rengi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL (İsteğe bağlı)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={e => setFormData({...formData, slug: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black" 
                  placeholder="Otomatik oluşturulur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Görünüm Tipi</label>
                <select 
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black"
                >
                  <option value="select">Açılır Liste (Select Box)</option>
                  <option value="button">Etiket Butonları (Pills)</option>
                  <option value="color">Renk Dairesi (Color Swatch)</option>
                </select>
              </div>
              <div className="flex gap-3 justify-end mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  İptal
                </button>
                <button 
                  type="submit" 
                  disabled={isSaving}
                  className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black hover:bg-black/90 rounded-lg disabled:opacity-50"
                >
                  {isSaving && <Loader2 className="size-4 animate-spin" />}
                  Kaydet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
