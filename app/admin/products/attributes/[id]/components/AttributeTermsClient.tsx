'use client'

import { useState } from 'react'
import { Plus, Edit, Trash2, Loader2, ArrowLeft } from 'lucide-react'
import { createAttributeTerm, updateAttributeTerm, deleteAttributeTerm } from '../../../actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { generateSlug } from '@/lib/utils'

export function AttributeTermsClient({ attribute, terms }: { attribute: any, terms: any[] }) {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    color_code: '#000000'
  })

  const openModalForNew = () => {
    setEditingId(null)
    setFormData({ name: '', slug: '', color_code: '#000000' })
    setIsModalOpen(true)
  }

  const openModalForEdit = (term: any) => {
    setEditingId(term.id)
    setFormData({ name: term.name, slug: term.slug, color_code: term.color_code || '#000000' })
    setIsModalOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu değeri silmek istediğinize emin misiniz?")) return
    const res = await deleteAttributeTerm(id, attribute.id)
    if (res.success) {
      toast.success("Değer başarıyla silindi!")
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
      res = await updateAttributeTerm(editingId, attribute.id, {
        name: formData.name,
        slug: slugToSave,
        color_code: attribute.type === 'color' ? formData.color_code : undefined
      })
    } else {
      res = await createAttributeTerm({
        attribute_id: attribute.id,
        name: formData.name,
        slug: slugToSave,
        color_code: attribute.type === 'color' ? formData.color_code : undefined
      })
    }

    if (res.success) {
      toast.success(editingId ? 'Değer güncellendi!' : 'Değer başarıyla eklendi!')
      setIsModalOpen(false)
      setFormData({ name: '', slug: '', color_code: '#000000' })
      router.refresh()
    } else {
      toast.error(res.error || 'Hata oluştu')
    }
    
    setIsSaving(false)
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Link href="/admin/products/attributes" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{attribute.name}</h1>
              <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-600">Değerleri</span>
            </div>
            <p className="text-sm text-gray-500">Bu nitelik için kullanılabilir değerleri (Örn: Siyah, 90x90) ekleyin.</p>
          </div>
        </div>
        <button 
          onClick={openModalForNew}
          className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm"
        >
          <Plus className="size-4" />
          Yeni Değer Ekle
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-200 bg-gray-50 text-sm font-medium text-gray-500">
          <div className="col-span-4">Değer Adı</div>
          <div className="col-span-4">Slug</div>
          {attribute.type === 'color' && <div className="col-span-2">Renk</div>}
          <div className={`col-span-${attribute.type === 'color' ? '2' : '4'} text-right`}>İşlemler</div>
        </div>
        
        <div className="divide-y divide-gray-100">
          {!terms || terms.length === 0 ? (
            <div className="p-8 text-center text-sm text-gray-500">
              Henüz bu niteliğe ait bir değer (term) eklenmemiş.
            </div>
          ) : (
            terms.map((term) => (
              <div key={term.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                <div className="col-span-4 font-medium text-gray-900">
                  {term.name}
                </div>
                <div className="col-span-4 text-sm text-gray-500">
                  {term.slug}
                </div>
                {attribute.type === 'color' && (
                  <div className="col-span-2 flex items-center gap-2">
                    <div className="size-6 rounded-full border border-gray-200" style={{ backgroundColor: term.color_code || '#000' }} />
                    <span className="text-xs text-gray-500 uppercase">{term.color_code}</span>
                  </div>
                )}
                <div className={`col-span-${attribute.type === 'color' ? '2' : '4'} flex items-center justify-end gap-2`}>
                  <button onClick={() => openModalForEdit(term)} className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                    <Edit className="size-4" />
                  </button>
                  <button onClick={() => handleDelete(term.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
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
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Değeri Düzenle' : `Yeni '${attribute.name}' Değeri Ekle`}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Değer Adı</label>
                <input 
                  type="text" 
                  required
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black" 
                  placeholder={attribute.type === 'color' ? "Örn: Mat Siyah" : "Örn: 90x90"}
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
              
              {attribute.type === 'color' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Renk Kodu</label>
                  <div className="flex items-center gap-3">
                    <input 
                      type="color" 
                      value={formData.color_code}
                      onChange={e => setFormData({...formData, color_code: e.target.value})}
                      className="size-10 p-0 border-0 rounded cursor-pointer" 
                    />
                    <input 
                      type="text" 
                      value={formData.color_code}
                      onChange={e => setFormData({...formData, color_code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none text-black uppercase" 
                    />
                  </div>
                </div>
              )}
              
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
    </>
  )
}
