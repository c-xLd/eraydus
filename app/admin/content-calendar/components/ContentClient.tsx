"use client"

import { useState } from 'react'
import { Plus, Calendar, Edit, Trash2, Eye } from 'lucide-react'
import { deleteContent, createContent, updateContent } from '../actions'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"

export default function ContentClient({ initialContent }: { initialContent: any[] }) {
  const [filterLanguage, setFilterLanguage] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [content, setContent] = useState(initialContent)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    content_type: 'blog',
    language: 'tr',
    status: 'draft',
    scheduled_for: ''
  })

  const filteredContent = content.filter(item => {
    const langMatch = filterLanguage === 'all' || item.language === filterLanguage
    const statusMatch = filterStatus === 'all' || item.status === filterStatus
    return langMatch && statusMatch
  })

  const getStatusBadgeColor = (status: string) => {
    switch(status) {
      case 'published': return 'bg-green-100 text-green-700'
      case 'scheduled': return 'bg-blue-100 text-blue-700'
      case 'draft': return 'bg-yellow-100 text-yellow-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'published': return 'Yayınlandı'
      case 'scheduled': return 'Planlandı'
      case 'draft': return 'Taslak'
      default: return status
    }
  }

  const handleOpenNewDialog = () => {
    setEditingItem(null)
    setFormData({
      title: '',
      content_type: 'blog',
      language: 'tr',
      status: 'draft',
      scheduled_for: ''
    })
    setIsDialogOpen(true)
  }

  const handleOpenEditDialog = (item: any) => {
    setEditingItem(item)
    setFormData({
      title: item.title,
      content_type: item.content_type,
      language: item.language,
      status: item.status,
      scheduled_for: item.scheduled_for ? new Date(item.scheduled_for).toISOString().slice(0, 16) : ''
    })
    setIsDialogOpen(true)
  }

  const handleSaveContent = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title) {
      toast.error("Lütfen bir başlık giriniz.")
      return
    }

    setLoadingId(editingItem ? editingItem.id : 'new')
    
    try {
      const payload = {
        ...formData,
        scheduled_for: formData.scheduled_for ? new Date(formData.scheduled_for).toISOString() : null
      }

      if (editingItem) {
        const result = await updateContent(editingItem.id, payload)
        if (result.success && result.content) {
          toast.success("İçerik başarıyla güncellendi.")
          setContent(prev => prev.map(c => c.id === result.content.id ? result.content : c))
          setIsDialogOpen(false)
        } else {
          toast.error("Güncelleme hatası: " + result.error)
        }
      } else {
        const result = await createContent(payload)
        if (result.success && result.content) {
          toast.success("Yeni içerik başarıyla eklendi.")
          setContent(prev => [result.content, ...prev])
          setIsDialogOpen(false)
        } else {
          toast.error("Ekleme hatası: " + result.error)
        }
      }
    } finally {
      setLoadingId(null)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu içeriği silmek istediğinize emin misiniz? Geri alınamaz.")) return

    setLoadingId(id)
    const result = await deleteContent(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("İçerik başarıyla silindi.")
      setContent(prev => prev.filter(c => c.id !== id))
    } else {
      toast.error("Silme işlemi başarısız: " + result.error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">İçerik Takvimi</h1>
          <p className="text-sm text-gray-500 mt-1">Blog yazıları, sayfalar ve sosyal medya içeriğini planlayın.</p>
        </div>
        <button onClick={handleOpenNewDialog} className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="size-4" />
          Yeni İçerik
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam İçerik', value: content.length, icon: '📝' },
          { title: 'Yayınlanan', value: content.filter(c => c.status === 'published').length, icon: '✓' },
          { title: 'Planlanmış', value: content.filter(c => c.status === 'scheduled').length, icon: '📅' },
          { title: 'Taslak', value: content.filter(c => c.status === 'draft').length, icon: '✏️' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 flex-wrap">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Dil</label>
          <select
            value={filterLanguage}
            onChange={(e) => setFilterLanguage(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
          >
            <option value="all">Tüm Diller</option>
            <option value="tr">Türkçe</option>
            <option value="en">İngilizce</option>
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Durum</label>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="published">Yayınlandı</option>
            <option value="scheduled">Planlandı</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
      </div>

      {/* Content Calendar */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50">
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Başlık</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tür</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Dil</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tarih</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredContent.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                    Henüz içerik eklenmemiş veya filtreye uygun içerik yok.
                  </td>
                </tr>
              ) : filteredContent.map((item) => {
                const isUpdating = loadingId === item.id
                return (
                <tr key={item.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                  <td className="px-6 py-4">
                    <p className="font-medium text-gray-900">{item.title}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">
                      {item.content_type === 'blog' ? '📝 Blog' :
                       item.content_type === 'page' ? '📄 Sayfa' :
                       item.content_type === 'social' ? '📱 Sosyal' : item.content_type}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-gray-600">{item.language === 'tr' ? '🇹🇷 Türkçe' : '🇬🇧 İngilizce'}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(item.status)}`}>
                      {getStatusLabel(item.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {new Date(item.scheduled_for || item.published_at || item.created_at).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-6 py-4 flex justify-center gap-2">
                    <button disabled={isUpdating} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Görüntüle">
                      <Eye className="size-4" />
                    </button>
                    <button disabled={isUpdating} onClick={() => handleOpenEditDialog(item)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Düzenle">
                      <Edit className="size-4" />
                    </button>
                    <button disabled={isUpdating} onClick={() => handleDelete(item.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                      <Trash2 className="size-4" />
                    </button>
                  </td>
                </tr>
              )})}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingItem ? 'İçeriği Düzenle' : 'Yeni İçerik Ekle'}</DialogTitle>
            <DialogDescription>
              İçerik başlığını ve yayınlanma durumunu ayarlayın.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSaveContent} className="space-y-4 pt-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Başlık</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">İçerik Türü</label>
                <select value={formData.content_type} onChange={e => setFormData({...formData, content_type: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black">
                  <option value="blog">Blog</option>
                  <option value="page">Sayfa</option>
                  <option value="social">Sosyal Medya</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Dil</label>
                <select value={formData.language} onChange={e => setFormData({...formData, language: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black">
                  <option value="tr">Türkçe</option>
                  <option value="en">İngilizce</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Durum</label>
                <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black">
                  <option value="draft">Taslak</option>
                  <option value="scheduled">Planlandı</option>
                  <option value="published">Yayınlandı</option>
                </select>
              </div>
              {formData.status === 'scheduled' && (
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Planlanan Tarih</label>
                  <input type="datetime-local" value={formData.scheduled_for} onChange={e => setFormData({...formData, scheduled_for: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
                </div>
              )}
            </div>

            <DialogFooter className="pt-4 border-t">
              <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">İptal</button>
              <button type="submit" disabled={loadingId === 'new' || (editingItem && loadingId === editingItem.id)} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-black/90">
                {editingItem ? 'Güncelle' : 'Kaydet'}
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
