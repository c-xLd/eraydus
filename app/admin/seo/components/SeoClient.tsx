"use client"

import { useState } from "react"
import { Save, Globe, FileText, Search, Plus, Trash2, TrendingUp, BarChart3, Edit } from "lucide-react"
import { saveGlobalSeo, updateSeoMetadata, deleteSeoMetadata } from "../actions"
import { generateSeoMeta } from '../../actions/ai'
import { toast } from "sonner"
import { Sparkles, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog"

export default function SeoClient({ initialPages, initialGlobal }: { initialPages: any[], initialGlobal: any }) {
  const [activeTab, setActiveTab] = useState('pages')
  const [pages, setPages] = useState(initialPages)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)

  const [globalData, setGlobalData] = useState({
    siteTitle: initialGlobal?.title || 'Eraydus - Modern Duşakabin Tasarımı',
    siteDesc: initialGlobal?.description || 'Premium duşakabin çözümleri ile banyo tasarımını değiştirin.',
    keywords: initialGlobal?.keywords || 'duşakabin, cam duşakabin, modern banyo',
    robots: (initialGlobal?.robots_index !== false ? 'index' : 'noindex') + ', ' + (initialGlobal?.robots_follow !== false ? 'follow' : 'nofollow'),
    language: 'tr'
  })

  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<any>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    status: 'optimized'
  })

  const handleGlobalChange = (key: string, value: string) => {
    setGlobalData(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveGlobal = async () => {
    setLoadingId('global')
    const result = await saveGlobalSeo(globalData)
    setLoadingId(null)
    if (result.success) {
      toast.success("Global SEO ayarları kaydedildi.")
    } else {
      toast.error("Hata: " + result.error)
    }
  }

  const handleOpenEditDialog = (page: any) => {
    setEditingPage(page)
    setFormData({
      title: page.title || '',
      description: page.description || '',
      keywords: page.keywords || '',
      status: page.status || 'optimized'
    })
    setIsDialogOpen(true)
  }

  const handleAiGenerateSeo = async () => {
    if (!editingPage) return
    
    setIsAiLoading(true)
    // Send either the existing title to improve it, or at least the slug
    const currentTitle = formData.title || editingPage.title || ''
    const slug = editingPage.page_slug || ''
    
    const result = await generateSeoMeta(slug, currentTitle)
    setIsAiLoading(false)
    
    if (result.success) {
      setFormData(prev => ({
        ...prev,
        title: result.title || prev.title,
        description: result.description || prev.description
      }))
      toast.success("AI tarafından SEO verileri oluşturuldu!")
    } else {
      toast.error(result.error || "AI veri üretemedi.")
    }
  }

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPage) return

    setLoadingId(editingPage.id)
    const result = await updateSeoMetadata(editingPage.id, formData)
    setLoadingId(null)

    if (result.success && result.data) {
      toast.success("Sayfa SEO ayarları güncellendi.")
      setPages(prev => prev.map(p => p.id === result.data.id ? result.data : p))
      setIsDialogOpen(false)
    } else {
      toast.error("Güncelleme hatası: " + result.error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bu SEO kaydını silmek istediğinize emin misiniz?")) return
    setLoadingId(id)
    const result = await deleteSeoMetadata(id)
    setLoadingId(null)

    if (result.success) {
      toast.success("SEO kaydı silindi.")
      setPages(prev => prev.filter(p => p.id !== id))
    } else {
      toast.error("Hata: " + result.error)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">SEO Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizin arama motorlarındaki görünürlüğünü optimize edin.</p>
        </div>
        {activeTab === 'global' && (
          <button onClick={handleSaveGlobal} disabled={loadingId === 'global'} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors disabled:opacity-50">
            <Save className="size-4" />
            {loadingId === 'global' ? 'Kaydediliyor...' : 'Kaydet'}
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => setActiveTab("global")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "global" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Global Ayarlar
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "pages" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          Sayfa Optimizasyonu
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "global" && (
        <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">Global Site Ayarları</h3>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Başlığı</label>
              <input
                type="text"
                value={globalData.siteTitle}
                onChange={(e) => handleGlobalChange('siteTitle', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Arama sonuçlarında görünecek başlık</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Site Açıklaması</label>
              <textarea
                value={globalData.siteDesc}
                onChange={(e) => handleGlobalChange('siteDesc', e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Meta açıklaması (155 karakter tavsiye edilir)</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Anahtar Kelimeler</label>
              <textarea
                value={globalData.keywords}
                onChange={(e) => handleGlobalChange('keywords', e.target.value)}
                rows={2}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
              />
              <p className="text-xs text-gray-500 mt-1">Virgülle ayrılmış anahtar kelimeler</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Dil</label>
                <select
                  value={globalData.language}
                  onChange={(e) => handleGlobalChange('language', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
                >
                  <option value="tr">Türkçe</option>
                  <option value="en">İngilizce</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Robots</label>
                <select
                  value={globalData.robots}
                  onChange={(e) => handleGlobalChange('robots', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
                >
                  <option value="index, follow">Index, Follow</option>
                  <option value="noindex, follow">No Index, Follow</option>
                  <option value="index, nofollow">Index, No Follow</option>
                  <option value="noindex, nofollow">No Index, No Follow</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "pages" && (
        <div className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { title: 'Toplam Kayıt', value: pages.length, icon: FileText, color: 'text-blue-600' },
              { title: 'Optimize Edilmiş', value: pages.filter(p => p.status === 'optimized').length, icon: TrendingUp, color: 'text-green-600' },
              { title: 'İyileştirilmesi Gereken', value: pages.filter(p => p.status !== 'optimized').length, icon: BarChart3, color: 'text-orange-600' },
            ].map((stat, i) => {
              const Icon = stat.icon
              return (
                <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-2">
                    <div className={`p-2 rounded-lg ${stat.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                      <Icon className={`size-4 ${stat.color}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-xs text-gray-500 mt-1">{stat.title}</p>
                </div>
              )
            })}
          </div>

          {/* Pages List */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Sayfa Başlığı / Slug</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Tür</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-gray-900">Durum</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold text-gray-900">İşlemler</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {pages.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Kayıtlı sayfa bulunamadı.</td>
                    </tr>
                  ) : pages.map((page) => {
                    const isUpdating = loadingId === page.id
                    return (
                    <tr key={page.id} className={`hover:bg-gray-50 transition-colors ${isUpdating ? 'opacity-50' : ''}`}>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{page.title}</p>
                          <p className="text-xs text-gray-500">{page.page_slug || '-'}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{page.page_type}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                          page.status === 'optimized' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                        }`}>
                          {page.status === 'optimized' ? 'Optimize' : 'İyileştir'}
                        </span>
                      </td>
                      <td className="px-6 py-4 flex justify-center gap-2">
                        <button disabled={isUpdating} onClick={() => handleOpenEditDialog(page)} className="p-2 text-amber-600 hover:bg-amber-50 rounded-lg transition-colors" title="Düzenle">
                          <Edit className="size-4" />
                        </button>
                        <button disabled={isUpdating} onClick={() => handleDelete(page.id)} className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                          <Trash2 className="size-4" />
                        </button>
                      </td>
                    </tr>
                  )})}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>SEO Düzenle</DialogTitle>
            <DialogDescription>
              {editingPage?.page_slug} sayfası için SEO ayarlarını düzenleyin.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSavePage} className="space-y-4 pt-4">
            <div className="flex justify-end mb-2">
              <button 
                type="button" 
                onClick={handleAiGenerateSeo}
                disabled={isAiLoading}
                className="text-xs flex items-center gap-1.5 text-champagne hover:text-champagne/80 font-medium transition-colors bg-champagne/10 px-3 py-1.5 rounded-full"
              >
                {isAiLoading ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                AI ile Doldur
              </button>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Meta Başlık</label>
              <input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Meta Açıklama</label>
              <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black resize-none" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Anahtar Kelimeler</label>
              <input value={formData.keywords} onChange={e => setFormData({...formData, keywords: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black" placeholder="Virgülle ayırarak yazın..." />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Durum</label>
              <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full p-2 border rounded-md text-sm text-black">
                <option value="optimized">Optimize Edilmiş</option>
                <option value="needs-improvement">İyileştirilmesi Gereken</option>
              </select>
            </div>

            <DialogFooter className="pt-4 border-t">
              <button type="button" onClick={() => setIsDialogOpen(false)} className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50">İptal</button>
              <button type="submit" disabled={!editingPage || loadingId === editingPage.id} className="px-4 py-2 bg-black text-white rounded-lg text-sm hover:bg-black/90">
                Kaydet
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
