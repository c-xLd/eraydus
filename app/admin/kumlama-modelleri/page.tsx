'use client'

import { useState, useEffect, useRef } from 'react'
import { Plus, Search, Trash2, Image as ImageIcon, Loader2, X, Upload, Images } from 'lucide-react'
import { createClient } from '@/services/supabase/client'

type Model = {
  id: string
  title: string
  image_url: string
  created_at: string
}

const BUCKET = 'kumlama-models'

export default function AdminKumlamaPage() {
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClient()

  // Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [mode, setMode] = useState<'upload' | 'gallery'>('upload')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [galleryUrl, setGalleryUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchModels = async () => {
    const { data, error } = await supabase
      .from('sandblasted_models')
      .select('*')
      .order('created_at', { ascending: false })

    if (!error && data) {
      setModels(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchModels()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleDelete = async (id: string) => {
    if (!confirm('Bu modeli silmek istediğinize emin misiniz?')) return

    setModels(models.filter(m => m.id !== id)) // Optimistic UI

    const { error } = await supabase
      .from('sandblasted_models')
      .delete()
      .eq('id', id)

    if (error) {
      alert('Silinirken bir hata oluştu.')
      fetchModels() // revert on error
    }
  }

  const openModal = () => {
    setTitle('')
    setMode('upload')
    setFile(null)
    setPreview(null)
    setGalleryUrl(null)
    setIsOpen(true)
  }

  const closeModal = () => {
    if (preview) URL.revokeObjectURL(preview)
    setIsOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setGalleryUrl(null)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    if (!title.trim()) {
      alert('Lütfen bir başlık giriniz.')
      return
    }

    let imageUrl = galleryUrl

    // Upload modundaysak dosyayı Storage'a yükle
    if (mode === 'upload') {
      if (!file) {
        alert('Lütfen bir görsel seçiniz veya galeriden bir görsel seçiniz.')
        return
      }
      setSaving(true)
      const path = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (upErr) {
        alert('Yüklenirken hata: ' + upErr.message)
        setSaving(false)
        return
      }
      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path)
      imageUrl = urlData.publicUrl
    } else if (!galleryUrl) {
      alert('Lütfen galeriden bir görsel seçiniz.')
      return
    }

    const { data, error } = await supabase
      .from('sandblasted_models')
      .insert([{ title: title.trim(), image_url: imageUrl }])
      .select()
      .single()

    setSaving(false)

    if (!error && data) {
      setModels([data, ...models])
      closeModal()
    } else {
      alert('Eklenirken bir hata oluştu: ' + (error?.message ?? ''))
    }
  }

  // Galeri için mevcut model görselleri (tekrarları ele)
  const galleryImages = Array.from(new Set(models.map(m => m.image_url)))

  const filteredModels = models.filter(m => m.title.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Kumlama Modelleri</h1>
          <p className="text-sm text-gray-500 mt-1">Sitede sergilenen özel cam desenlerini buradan yönetin.</p>
        </div>
        <button
          onClick={openModal}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Plus className="size-4" />
          Yeni Model Ekle
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            placeholder="Model adı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
          />
        </div>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <Loader2 className="size-8 animate-spin text-gray-400" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredModels.map(model => (
            <div key={model.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden flex flex-col group">
              <div className="relative aspect-square bg-gray-100 overflow-hidden">
                <img
                  src={model.image_url}
                  alt={model.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 flex items-center justify-between">
                <h3 className="font-semibold text-sm text-gray-900 truncate pr-4">{model.title}</h3>
                <button
                  onClick={() => handleDelete(model.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors shrink-0"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            </div>
          ))}
          {filteredModels.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl">
              <ImageIcon className="size-8 mx-auto mb-3 text-gray-400" />
              <p>Model bulunamadı.</p>
            </div>
          )}
        </div>
      )}

      {/* ───────── Modal ───────── */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={closeModal}>
          <div
            className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h2 className="text-lg font-semibold text-gray-900">Yeni Model Ekle</h2>
              <button onClick={closeModal} className="p-1.5 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
                <X className="size-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlık</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Örn: Geometrik Çizgiler"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-black"
                />
              </div>

              {/* Tabs */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setMode('upload')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'upload' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Upload className="size-4" />
                  Görsel Yükle
                </button>
                <button
                  onClick={() => setMode('gallery')}
                  className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-medium transition-colors ${
                    mode === 'gallery' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Images className="size-4" />
                  Galeriden Seç
                </button>
              </div>

              {/* Upload panel */}
              {mode === 'upload' && (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  {preview ? (
                    <div className="relative rounded-xl overflow-hidden border border-gray-200">
                      <img src={preview} alt="Önizleme" className="w-full h-56 object-cover" />
                      <button
                        onClick={() => { setFile(null); if (preview) URL.revokeObjectURL(preview); setPreview(null) }}
                        className="absolute top-2 right-2 p-1.5 bg-black/60 text-white rounded-lg hover:bg-black/80 transition-colors"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-56 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:border-gray-400 hover:bg-gray-50 transition-colors"
                    >
                      <Upload className="size-8" />
                      <span className="text-sm font-medium">Görsel Seç / Yükle</span>
                      <span className="text-xs text-gray-400">PNG, JPG, WEBP, GIF • max 10MB</span>
                    </button>
                  )}
                </div>
              )}

              {/* Gallery panel */}
              {mode === 'gallery' && (
                <div>
                  {galleryImages.length === 0 ? (
                    <p className="text-sm text-gray-400 text-center py-10">Galeride henüz görsel yok. Önce bir görsel yükleyin.</p>
                  ) : (
                    <div className="grid grid-cols-3 gap-3 max-h-72 overflow-y-auto pr-1">
                      {galleryImages.map((url) => (
                        <button
                          key={url}
                          onClick={() => { setGalleryUrl(url); setFile(null); if (preview) { URL.revokeObjectURL(preview); setPreview(null) } }}
                          className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                            galleryUrl === url ? 'border-black ring-2 ring-black/20' : 'border-transparent hover:border-gray-300'
                          }`}
                        >
                          <img src={url} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
              >
                İptal
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-5 py-2 text-sm font-medium bg-black text-white rounded-lg hover:bg-gray-800 transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
