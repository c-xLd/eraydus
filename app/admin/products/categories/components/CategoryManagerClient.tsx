'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Loader2 } from 'lucide-react'
import { createCategory, updateCategory, deleteCategory } from '../../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { ProductsNav } from '../../components/ProductsNav'
import { generateSlug } from '@/lib/utils'

export function CategoryManagerClient({ categories }: { categories: any[] }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    parent_category: ''
  })

  const openModalForNew = () => {
    setEditingId(null)
    setIsSlugManuallyEdited(false)
    setFormData({ name: '', slug: '', parent_category: '' })
    setIsModalOpen(true)
  }

  const openModalForEdit = (category: any) => {
    setEditingId(category.id)
    setIsSlugManuallyEdited(true)
    setFormData({ name: category.name, slug: category.slug, parent_category: category.parent_category || '' })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu kategoriyi silmek istediğinize emin misiniz?")) return
    const res = await deleteCategory(id)
    if (res.success) {
      toast.success("Kategori başarıyla silindi!")
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
      res = await updateCategory(editingId, {
        name: formData.name,
        slug: slugToSave,
        parent_category: formData.parent_category || null
      })
    } else {
      res = await createCategory({
        name: formData.name,
        slug: slugToSave,
        parent_category: formData.parent_category || undefined
      })
    }

    if (res.success) {
      toast.success(editingId ? 'Kategori güncellendi!' : 'Kategori başarıyla oluşturuldu!')
      setIsModalOpen(false)
      setFormData({ name: '', slug: '', parent_category: '' })
      router.refresh()
    } else {
      toast.error(res.error || 'Hata oluştu')
    }
    
    setIsSaving(false)
  }

  return (
    <div className="space-y-6">
      <ProductsNav />

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kategoriler</h1>
          <p className="text-sm text-gray-500">Ürün kategorilerini ve hiyerarşisini yönetin.</p>
        </div>
        <button 
          onClick={openModalForNew}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          Yeni Kategori
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
          <div className="col-span-5">Kategori Adı</div>
          <div className="col-span-3">URL (Slug)</div>
          <div className="col-span-2">Durum</div>
          <div className="col-span-2 text-right">İşlemler</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {!categories || categories.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Henüz kategori bulunmuyor.
            </div>
          ) : (
            categories.map((category) => (
              <div key={category.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-5 font-medium text-gray-900 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center flex-shrink-0 text-gray-400">
                    {category.name.charAt(0)}
                  </div>
                  <div>
                    <p>{category.name}</p>
                    {category.parent_category && (
                      <p className="text-xs text-gray-400 font-normal">
                        Üst: {categories.find(c => c.id === category.parent_category)?.name || 'Bilinmiyor'}
                      </p>
                    )}
                  </div>
                </div>
                <div className="col-span-3 text-sm text-gray-500">
                  /{category.slug}
                </div>
                <div className="col-span-2">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {category.status === 'active' ? 'Aktif' : 'Pasif'}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-end gap-2">
                  <button onClick={() => openModalForEdit(category)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(category.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Kategoriyi Düzenle' : 'Yeni Kategori Oluştur'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kategori Adı</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => {
                    const newName = e.target.value;
                    setFormData(prev => ({
                      ...prev, 
                      name: newName,
                      slug: !isSlugManuallyEdited ? generateSlug(newName) : prev.slug
                    }))
                  }}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black" 
                  placeholder="Örn: Banyo Dolapları"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL (İsteğe bağlı)</label>
                <input 
                  type="text" 
                  value={formData.slug}
                  onChange={e => {
                    setIsSlugManuallyEdited(true)
                    setFormData({...formData, slug: e.target.value})
                  }}
                  className="w-full pl-3 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black" 
                  placeholder="Otomatik oluşturulur"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Üst Kategori (Opsiyonel)</label>
                <select 
                  value={formData.parent_category}
                  onChange={e => setFormData({...formData, parent_category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black bg-white" 
                >
                  <option value="">-- Ana Kategori --</option>
                  {categories.filter(c => c.id !== editingId).map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">Eğer bu kategori başka bir kategorinin altındaysa seçin.</p>
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
