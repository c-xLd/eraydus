'use client'

import { useState, useRef, useMemo } from 'react'
import { Plus, Search, Trash2, Edit, Loader2, X, Upload, MapPin, Building2, Filter, Eye } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'sonner'
import { createClient } from '@/services/supabase/client'
import { createProjectAction, updateProjectAction, deleteProjectAction } from './actions'
import Link from 'next/link'

type Project = {
  id: string
  name: string
  location: string
  category: string
  description: string
  image_url: string
  created_at: string
}

const DEFAULT_CATEGORIES = ["Otel", "Rezidans", "Villa", "Ticari"]
const BUCKET = "projects"

export default function AdminProjectsClient({ initialProjects }: { initialProjects: Project[] }) {
  const [projects, setProjects] = useState<Project[]>(initialProjects)
  
  // Dinamik kategoriler (Varsayılanlar + Eklenmiş olanlar)
  const allCategories = useMemo(() => {
    const unique = new Set([...DEFAULT_CATEGORIES, ...projects.map(p => p.category)])
    return Array.from(unique)
  }, [projects])
  
  const [searchQuery, setSearchQuery] = useState('')
  const [filterCategory, setFilterCategory] = useState<string>("Tümü")
  const supabase = createClient()

  // Modal state
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    category: DEFAULT_CATEGORIES[0],
    description: '',
  })
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  
  const [saving, setSaving] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.location.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = filterCategory === "Tümü" || p.category === filterCategory
      return matchesSearch && matchesCategory
    })
  }, [projects, searchQuery, filterCategory])

  const openModal = (project?: Project) => {
    if (project) {
      setEditingId(project.id)
      setFormData({
        name: project.name,
        location: project.location,
        category: project.category,
        description: project.description
      })
      setPreview(project.image_url)
    } else {
      setEditingId(null)
      setFormData({
        name: '',
        location: '',
        category: allCategories[0] || '',
        description: ''
      })
      setFile(null)
      setPreview(null)
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
    if (preview && preview.startsWith('blob:')) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(f))
  }

  const handleSave = async () => {
    if (!formData.name.trim() || !formData.location.trim() || !formData.description.trim()) {
      toast.error('Lütfen zorunlu alanları doldurun.')
      return
    }

    let finalImageUrl = editingId ? preview : null

    setSaving(true)

    if (file) {
      const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg'
      const seoSlug = formData.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').toLowerCase()
      const path = `projects/${seoSlug}-${Date.now()}.${extension}`
      
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
      const res = await updateProjectAction(editingId, { ...formData, imageUrl: finalImageUrl !== preview ? finalImageUrl : undefined })
      if (res.success && res.data) {
        setProjects(projects.map(p => p.id === editingId ? { ...p, ...res.data } : p))
        toast.success('Proje güncellendi')
        closeModal()
      } else {
        toast.error(res.error || 'Güncellenirken hata oluştu')
      }
    } else {
      const res = await createProjectAction({ ...formData, imageUrl: finalImageUrl })
      if (res.success && res.data) {
        setProjects([res.data, ...projects])
        toast.success('Yeni proje eklendi')
        closeModal()
      } else {
        toast.error(res.error || 'Eklenirken hata oluştu')
      }
    }

    setSaving(false)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu projeyi kalıcı olarak silmek istediğinize emin misiniz?')) return
    
    setDeletingId(id)
    const res = await deleteProjectAction(id)
    if (res.success) {
      setProjects(projects.filter(p => p.id !== id))
      toast.success('Proje silindi')
    } else {
      toast.error(res.error || 'Silinirken hata oluştu')
    }
    setDeletingId(null)
  }

  const stats = [
    { title: "Toplam Proje", value: projects.length, icon: Building2, color: "text-blue-600", bg: "bg-blue-100" },
    { title: "Kategori", value: new Set(projects.map(p => p.category)).size, icon: Filter, color: "text-orange-600", bg: "bg-orange-100" },
    { title: "Şehir", value: new Set(projects.map(p => p.location.split(',').pop()?.trim())).size, icon: MapPin, color: "text-red-600", bg: "bg-red-100" },
  ]

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">Proje Yönetimi</h1>
          <p className="text-muted-foreground mt-1 text-sm">Tüm referans projelerinizi görüntüleyin ve yönetin.</p>
        </div>
        <button
          onClick={() => openModal()}
          className="bg-foreground hover:bg-foreground/90 text-background px-5 py-2.5 rounded-full text-sm font-semibold transition-all flex items-center gap-2 shadow-lg shadow-black/5 active:scale-95"
        >
          <Plus className="size-4" />
          Yeni Proje
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} key={i} className="bg-card p-6 rounded-3xl border border-border/50 shadow-sm flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.bg}`}>
                <Icon className={`size-6 ${stat.color}`} />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Filter */}
      <div className="bg-card p-2 rounded-2xl border border-border/50 shadow-sm flex flex-col sm:flex-row items-center gap-2 max-w-2xl">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Proje adı, konum ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-transparent border-none focus:outline-none text-sm placeholder:text-muted-foreground/70"
          />
        </div>
        <div className="h-px w-full sm:w-px sm:h-6 bg-border/50" />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full sm:w-auto px-4 py-2 bg-transparent border-none focus:outline-none text-sm font-medium text-foreground cursor-pointer"
        >
          <option value="Tümü">Tüm Kategoriler</option>
          {allCategories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {/* Projects Table/List */}
      <div className="bg-card rounded-3xl border border-border/50 shadow-sm overflow-hidden">
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/50 bg-muted/20">
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Proje</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Konum</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground hidden md:table-cell">Açıklama</th>
                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground text-center">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30 relative">
              <AnimatePresence mode="popLayout">
                {filtered.map((project) => (
                  <motion.tr 
                    layout
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    exit={{ opacity: 0, backgroundColor: 'rgba(239,68,68,0.1)' }}
                    key={project.id} 
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="size-12 rounded-xl overflow-hidden bg-muted shrink-0 border border-border/50 relative">
                          <img src={project.image_url} alt={project.name} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-foreground text-sm">{project.name}</p>
                          <span className="inline-block px-2 py-0.5 mt-1 rounded-md text-[10px] font-bold bg-muted text-muted-foreground uppercase tracking-wider">
                            {project.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/80 font-medium">{project.location}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground hidden md:table-cell max-w-xs truncate" title={project.description}>
                      {project.description}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link href="/projeler" target="_blank" className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-xl transition-colors" title="Siteye Git">
                          <Eye className="size-4" />
                        </Link>
                        <button onClick={() => openModal(project)} className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors" title="Düzenle">
                          <Edit className="size-4" />
                        </button>
                        <button onClick={() => handleDelete(project.id)} disabled={deletingId === project.id} className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors" title="Sil">
                          {deletingId === project.id ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          {filtered.length === 0 && (
            <div className="py-20 flex flex-col items-center justify-center text-muted-foreground">
              <Building2 className="size-10 mb-4 opacity-20" />
              <p className="text-sm font-medium">Proje bulunamadı.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeModal} />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }}
              className="bg-card w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden relative z-10 border border-border/50 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-border/50 shrink-0">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">{editingId ? 'Projeyi Düzenle' : 'Yeni Proje Ekle'}</h2>
                <button onClick={closeModal} className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors">
                  <X className="size-4" />
                </button>
              </div>

              <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
                
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">Proje Görseli</label>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                  {preview ? (
                    <div className="relative rounded-2xl overflow-hidden border border-border group w-full h-56">
                      <img src={preview} alt="Önizleme" className="w-full h-full object-cover" />
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
                      className="w-full h-56 border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center gap-3 text-muted-foreground hover:border-foreground/50 hover:bg-muted/50 transition-all"
                    >
                      <Upload className="size-8 opacity-50" />
                      <div className="flex flex-col items-center">
                        <span className="text-sm font-medium text-foreground">Görsel Seç veya Sürükle</span>
                        <span className="text-xs mt-1">Yatay format, yüksek çözünürlük önerilir</span>
                      </div>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Proje Adı</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Örn: The Bosphorus Palace Hotel"
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-1.5">Kategori</label>
                    <input
                      type="text"
                      list="category-options"
                      value={formData.category}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      placeholder="Örn: Otel"
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                    <datalist id="category-options">
                      {allCategories.map(c => <option key={c} value={c} />)}
                    </datalist>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Konum</label>
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      placeholder="Örn: İstanbul, Beşiktaş"
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-foreground mb-1.5">Açıklama</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Proje detayları..."
                      rows={3}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground transition-all resize-none"
                    />
                  </div>
                </div>

              </div>

              <div className="flex justify-end gap-3 px-6 py-5 border-t border-border/50 bg-muted/20 shrink-0">
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
                  {saving && <Loader2 className="size-4 animate-spin" />}
                  {saving ? 'Kaydediliyor...' : 'Kaydet'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
