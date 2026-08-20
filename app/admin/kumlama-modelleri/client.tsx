'use client'

import { useState, useRef, useCallback } from 'react'
import { Plus, Search, Trash2, Edit, ImageIcon, Loader2, X, Upload, Images, GripVertical, Check, Eye, EyeOff, ChevronUp, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { createClient } from '@/services/supabase/client'
import {
  createModelAction,
  updateModelAction,
  deleteModelAction,
  toggleModelStatusAction,
  updateOrderAction
} from './actions'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'
import { cn } from '@/lib/utils'

type Model = {
  id: string
  title: string
  image_url: string
  created_at: string
  is_active?: boolean
  order_index?: number
}

const BUCKET = 'kumlama-models'

export default function KumlamaModelleriClient({ initialModels }: { initialModels: Model[] }) {
  const [models, setModels] = useState<Model[]>(initialModels)
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClient()

  // Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [mode, setMode] = useState<'upload' | 'gallery'>('upload')
  const [editingId, setEditingId] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [galleryUrl, setGalleryUrl] = useState<string | null>(null)

  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [togglingId, setTogglingId] = useState<string | null>(null)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragEnd = useCallback((result: DropResult) => {
    // Disable drag-and-drop when filtering is active
    if (searchQuery !== '') {
      toast.error('Filtre uygulandığı öğeleri yeniden sırayalamazsınız. Lütfen filtreyi temizleyin.')
      return
    }

    if (!result.destination) return

    const sourceIndex = result.source.index
    const destinationIndex = result.destination.index

    if (sourceIndex === destinationIndex) return

    // Work with the full models list (since filtering is disabled when this runs)
    const newModels = Array.from(models)
    const [movedItem] = newModels.splice(sourceIndex, 1)
    newModels.splice(destinationIndex, 0, movedItem)

    // Store previous state for potential rollback
    const previousModels = models

    setModels(newModels)

    const orderedIds = newModels.map(model => model.id)
    updateOrderAction(orderedIds).then((res) => {
      if (!res.success) {
        toast.error(res.error || 'Sıralama güncellenirken hata oluştu')
        setModels(previousModels)
      }
    })
  }, [models, searchQuery])

  const handleMoveOrder = useCallback((index: number, direction: 'up' | 'down') => {
    if (searchQuery !== '') {
      toast.error('Filtre uygulandığı sırada sıralama değiştirilemez. Lütfen aramayı temizleyin.')
      return
    }

    const targetIndex = direction === 'up' ? index - 1 : index + 1
    if (targetIndex < 0 || targetIndex >= models.length) return

    const newModels = Array.from(models)
    const [movedItem] = newModels.splice(index, 1)
    newModels.splice(targetIndex, 0, movedItem)

    const previousModels = models
    setModels(newModels)

    const orderedIds = newModels.map((model) => model.id)
    updateOrderAction(orderedIds).then((res) => {
      if (!res.success) {
        toast.error(res.error || 'Sıralama güncellenirken hata oluştu')
        setModels(previousModels)
      } else {
        toast.success('Sıra güncellendi')
      }
    })
  }, [models, searchQuery])

  const openModal = (model?: Model) => {
    if (model) {
      setEditingId(model.id)
      setTitle(model.title || '')
      setMode('gallery')
      setGalleryUrl(model.image_url)
      setPreview(model.image_url)
    } else {
      setEditingId(null)
      setTitle('')
      setMode('upload')
      setFile(null)
      setPreview(null)
      setGalleryUrl(null)
    }
    setIsOpen(true)
  }

  const closeModal = () => {
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setIsOpen(false)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFile(f)
    setGalleryUrl(null)
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    if (!title.trim()) {
      toast.error('Lütfen bir başlık giriniz.')
      return
    }

    let finalImageUrl = galleryUrl
    let uploadedPath: string | null = null

    setSaving(true)

    if (mode === 'upload' && file) {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const seoSlug = title.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
      const path = `${seoSlug}-${Date.now()}.${extension}`
      uploadedPath = path

      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, file, { cacheControl: '3600', upsert: false })

      if (upErr) {
        toast.error('Görsel yüklenirken hata: ' + upErr.message)
        setSaving(false)
        return
      }

      const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path)
      finalImageUrl = urlData.publicUrl
    }

    if (!finalImageUrl) {
      toast.error('Lütfen görsel seçin veya yükleyin.')
      setSaving(false)
      return
    }

    if (editingId) {
      const res: any = await updateModelAction(editingId, { title, imageUrl: finalImageUrl })
      if (res.success && res.data) {
        setModels(models.map(m => m.id === editingId ? { ...m, ...res.data } : m))
        if (res.warning) {
          toast.warning(res.warning)
        } else if (res.previousImageRemoved) {
          toast.success('Model güncellendi ve eski görsel temizlendi')
        } else {
          toast.success('Model güncellendi')
        }
        closeModal()
      } else {
        if (uploadedPath) {
          await supabase.storage.from(BUCKET).remove([uploadedPath])
        }
        toast.error(res.error || 'Güncellenirken hata oluştu')
      }
    } else {
      const res: any = await createModelAction({ title, imageUrl: finalImageUrl })
      if (res.success && res.data) {
        setModels([res.data, ...models])
        toast.success('Yeni model eklendi')
        closeModal()
      } else {
        if (uploadedPath) {
          await supabase.storage.from(BUCKET).remove([uploadedPath])
        }
        toast.error(res.error || 'Eklenirken hata oluştu')
      }
    }

    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu modeli kalıcı olarak silmek istediğinize emin misiniz?')) return

    setDeletingId(id)
    const res = await deleteModelAction(id)
    if (res.success) {
      setModels(models.filter(m => m.id !== id))
      if (res.warning) {
        toast.warning(res.warning)
      } else if (res.imageRemoved) {
        toast.success('Model ve Storage görseli silindi')
      } else {
        toast.success('Model silindi')
      }
    } else {
      toast.error(res.error || 'Silinirken hata oluştu')
    }
    setDeletingId(null)
  }

  const handleToggleActive = async (id: string, currentStatus: boolean = true) => {
    setTogglingId(id)
    // Optimistic
    setModels(models.map(m => m.id === id ? { ...m, is_active: !currentStatus } : m))

    const res = await toggleModelStatusAction(id, currentStatus)
    if (!res.success) {
      // Revert on error
      setModels(models.map(m => m.id === id ? { ...m, is_active: currentStatus } : m))
      toast.error('Durum değiştirilemedi. Veritabanı şemasını güncellediğinizden emin olun.')
    } else {
      toast.success(currentStatus ? 'Model gizlendi' : 'Model aktifleştirildi')
    }
    setTogglingId(null)
  }

  const galleryImages = Array.from(
    new Map((models || []).filter((model) => Boolean(model.image_url)).map((model) => [model.image_url, model])).values()
  )
  const filteredModels = (models || []).filter(m => (m?.title || '').toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Kumlama Modelleri</h1>
          <p className="text-muted-foreground mt-1 text-sm">Sitede sergilenen özel cam desenlerini yönetin.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-foreground hover:bg-foreground/90 text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-black/5 active:scale-95"
        >
          <Plus className="size-4" />
          Yeni Model Ekle
        </button>
      </div>

      {/* Filter */}
      <div className="bg-card p-2 rounded-2xl border border-border/50 shadow-sm flex items-center gap-4 max-w-md">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Model adı ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground/70"
          />
        </div>
      </div>

      {/* Grid */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="model-grid">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={cn(
                "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 transition-all",
                snapshot.isDraggingOver && "bg-black/[0.01] rounded-2xl p-2"
              )}
            >
              {filteredModels.map((model, index) => {
                const isActive = model.is_active ?? true

                return (
                  <Draggable key={model.id} draggableId={model.id} index={index}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        className={cn(
                          "bg-white rounded-2xl border border-black/10 overflow-hidden flex flex-col group relative transition-shadow duration-200",
                          !isActive && "opacity-60 grayscale-[0.3]",
                          snapshot.isDragging ? "shadow-2xl ring-2 ring-black bg-white scale-[1.02] z-50" : "shadow-2xs hover:shadow-lg"
                        )}
                        style={{
                          ...provided.draggableProps.style,
                          userSelect: 'none'
                        }}
                      >
                        {/* Drag Handle & Order Badge */}
                        <div className="flex items-center justify-between p-2.5 bg-black/[0.02] border-b border-black/5">
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-black text-white shadow-2xs">
                              #{index + 1}
                            </span>
                            {!model.is_active && (
                              <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-black/50 bg-black/5 px-1.5 py-0.5 rounded">
                                Gizli
                              </span>
                            )}
                          </div>

                          <div className="flex items-center gap-1">
                            {/* Quick 1-Click Order Shifting */}
                            {searchQuery === '' && (
                              <div className="flex items-center gap-0.5 mr-1">
                                <button
                                  type="button"
                                  disabled={index === 0}
                                  onClick={() => handleMoveOrder(index, 'up')}
                                  className="p-1 rounded-md hover:bg-black/10 disabled:opacity-30 disabled:hover:bg-transparent text-black transition-colors"
                                  title="Bir Yukarı Taşı"
                                >
                                  <ChevronUp className="size-3.5" />
                                </button>
                                <button
                                  type="button"
                                  disabled={index === models.length - 1}
                                  onClick={() => handleMoveOrder(index, 'down')}
                                  className="p-1 rounded-md hover:bg-black/10 disabled:opacity-30 disabled:hover:bg-transparent text-black transition-colors"
                                  title="Bir Aşağı Taşı"
                                >
                                  <ChevronDown className="size-3.5" />
                                </button>
                              </div>
                            )}

                            {/* Drag Grip Handle */}
                            <div
                              {...(provided.dragHandleProps ?? {})}
                              className="p-1.5 rounded-lg bg-black/5 hover:bg-black hover:text-white text-black/70 cursor-grab active:cursor-grabbing transition-colors"
                              title="Sürükleyip Sırayı Değiştir"
                            >
                              <GripVertical className="size-4" />
                            </div>
                          </div>
                        </div>

                        {/* Image Container */}
                        <div className="relative aspect-square bg-black/[0.02] overflow-hidden">
                          <img
                            src={model.image_url}
                            alt={model.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                          {/* Hover Actions Overlay */}
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs">
                            <button
                              onClick={() => openModal(model)}
                              className="p-2.5 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-md"
                              title="Düzenle"
                            >
                              <Edit className="size-4" />
                            </button>
                            <button
                              onClick={() => handleToggleActive(model.id, isActive)}
                              disabled={togglingId === model.id}
                              className="p-2.5 bg-white text-black rounded-full hover:scale-110 transition-transform shadow-md"
                              title={isActive ? 'Gizle' : 'Göster'}
                            >
                              {isActive ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                            </button>
                            <button
                              onClick={() => handleDelete(model.id)}
                              disabled={deletingId === model.id}
                              className="p-2.5 bg-red-600 text-white rounded-full hover:scale-110 transition-transform shadow-md"
                              title="Sil"
                            >
                              {deletingId === model.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="p-3.5 border-t border-black/5 bg-white">
                          <h3 className="truncate text-xs font-semibold text-black sm:text-sm">
                            {model.title || `Kumlama Modeli #${index + 1}`}
                          </h3>
                        </div>
                      </div>
                    )}
                  </Draggable>
                )
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-card w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-border/50"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">{editingId ? 'Modeli Düzenle' : 'Yeni Model Ekle'}</h2>
                <button onClick={closeModal} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Başlık</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Örn: Geometrik Çizgiler"
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                  />
                </div>

                <div className="flex gap-2 p-1 bg-muted rounded-xl">
                  <button
                    onClick={() => setMode('upload')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                      mode === 'upload' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Upload className="size-4" />
                    Görsel Yükle
                  </button>
                  <button
                    onClick={() => setMode('gallery')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
                      mode === 'gallery' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Images className="size-4" />
                    Galeriden Seç
                  </button>
                </div>

                {mode === 'upload' && (
                  <div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                    {preview ? (
                      <div className="relative rounded-2xl overflow-hidden border border-border group">
                        <img src={preview} alt="Önizleme" className="w-full h-48 object-cover" />
                        <button
                          onClick={() => { setFile(null); if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview); setPreview(null) }}
                          className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 backdrop-blur-md transition-all opacity-0 group-hover:opacity-100"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full h-48 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground/50 hover:bg-muted/50 transition-all"
                      >
                        <Upload className="size-8 opacity-50" />
                        <div className="flex flex-col items-center">
                          <span className="text-sm font-medium text-foreground">Görsel Seç veya Sürükle</span>
                          <span className="text-xs mt-1">PNG, JPG, WEBP • Max 10MB</span>
                        </div>
                      </button>
                    )}
                  </div>
                )}

                {mode === 'gallery' && (
                  <div>
                    {galleryImages.length === 0 ? (
                      <p className="text-sm text-muted-foreground text-center py-12">Galeride görsel yok.</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-3 max-h-56 overflow-y-auto pr-2 custom-scrollbar">
                        {galleryImages.map((galleryModel) => (
                          <button
                            key={galleryModel.image_url}
                            onClick={() => { setGalleryUrl(galleryModel.image_url); setFile(null); if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview); setPreview(galleryModel.image_url) }}
                            className={`overflow-hidden rounded-xl border-2 bg-background text-left transition-all ${
                              galleryUrl === galleryModel.image_url ? 'border-foreground ring-4 ring-foreground/10' : 'border-transparent hover:border-border'
                            }`}
                          >
                            <div className="relative aspect-square overflow-hidden">
                              <img src={galleryModel.image_url} alt={galleryModel.title} className="h-full w-full object-cover" />
                            {galleryUrl === galleryModel.image_url && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                <div className="bg-foreground text-background rounded-full p-1 shadow-md">
                                  <Check className="size-4" />
                                </div>
                              </div>
                            )}
                            </div>
                            <span className="block truncate border-t border-border/60 px-2 py-1.5 text-[11px] font-medium text-foreground">
                              {galleryModel.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div className="flex justify-end gap-3 px-6 py-5 border-t border-border/50 bg-muted/20">
                  <button
                    onClick={closeModal}
                    className="px-5 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-all"
                  >
                    İptal
                  </button>
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    className="px-6 py-2.5 text-sm font-semibold bg-foreground text-background rounded-full hover:bg-foreground/90 transition-all disabled:opacity-50 flex items-center gap-2 shadow-lg shadow-black/5 active:scale-95"
                  >
                    Kaydet
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
