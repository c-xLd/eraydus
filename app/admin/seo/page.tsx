"use client"

import { useState } from "react"
import { Save, Globe, FileText, Search, Plus, Trash2, Eye } from "lucide-react"
import { globalSeoData, pagesSeoData, type PageSEO, type GlobalSEO } from "@/lib/data/seo"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function SeoAdminPage() {
  const [activeTab, setActiveTab] = useState<"global" | "pages">("global")
  const [globalData, setGlobalData] = useState<GlobalSEO>(globalSeoData)
  const [pages, setPages] = useState<PageSEO[]>(pagesSeoData)
  
  // State for the currently selected page to edit
  const [editingPageId, setEditingPageId] = useState<string | null>(null)
  
  const editingPage = pages.find(p => p.id === editingPageId) || null

  const handleGlobalChange = (key: keyof GlobalSEO, value: string) => {
    setGlobalData(prev => ({ ...prev, [key]: value }))
  }

  const handlePageChange = (key: keyof PageSEO, value: string | boolean) => {
    if (!editingPageId) return
    setPages(prev => prev.map(p => 
      p.id === editingPageId ? { ...p, [key]: value } : p
    ))
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">SEO Yönetimi</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizin arama motorlarındaki görünürlüğünü ve performansını yönetin.</p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors">
          <Save className="size-4" />
          Tüm Ayarları Kaydet
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200">
        <button
          onClick={() => { setActiveTab("global"); setEditingPageId(null); }}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "global" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <div className="flex items-center gap-2">
            <Globe className="size-4" />
            Genel Site Ayarları
          </div>
        </button>
        <button
          onClick={() => setActiveTab("pages")}
          className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
            activeTab === "pages" ? "border-black text-black" : "border-transparent text-gray-500 hover:text-black"
          }`}
        >
          <div className="flex items-center gap-2">
            <FileText className="size-4" />
            Sayfa Bazlı SEO
          </div>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === "global" && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-lg font-semibold mb-6">Global SEO Değişkenleri</h2>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Adı (Title Suffix)</Label>
                    <Input 
                      id="siteName" 
                      value={globalData.siteName} 
                      onChange={e => handleGlobalChange('siteName', e.target.value)}
                    />
                    <p className="text-[11px] text-gray-500">Arama sonuçlarında başlığın sonuna eklenir (Örn: Sayfa | SİTE ADI).</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="titleSeparator">Başlık Ayırıcı (Separator)</Label>
                    <Input 
                      id="titleSeparator" 
                      value={globalData.titleSeparator} 
                      onChange={e => handleGlobalChange('titleSeparator', e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="defaultDescription">Varsayılan Meta Açıklaması</Label>
                  <Textarea 
                    id="defaultDescription" 
                    rows={3} 
                    value={globalData.defaultDescription}
                    onChange={e => handleGlobalChange('defaultDescription', e.target.value)}
                  />
                  <p className="text-[11px] text-gray-500">Özel açıklaması olmayan sayfalar için bu metin kullanılır.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="twitterHandle">Twitter/X Kullanıcı Adı</Label>
                  <Input 
                    id="twitterHandle" 
                    value={globalData.twitterHandle} 
                    onChange={e => handleGlobalChange('twitterHandle', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "pages" && !editingPageId && (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
                <h2 className="font-semibold text-sm">Site Sayfaları</h2>
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
                  <Input placeholder="Sayfa ara..." className="w-64 pl-9 h-8 text-xs bg-white" />
                </div>
              </div>
              <div className="divide-y divide-gray-100">
                {pages.map(p => (
                  <div key={p.id} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div>
                      <h3 className="font-medium text-sm text-gray-900">{p.title}</h3>
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{p.path}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {p.isIndexable ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-[10px] font-semibold tracking-wide uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                          İndeksleniyor
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-[10px] font-semibold tracking-wide uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                          No-Index
                        </span>
                      )}
                      <button 
                        onClick={() => setEditingPageId(p.id)}
                        className="text-xs font-medium text-blue-600 hover:text-blue-800"
                      >
                        SEO Düzenle
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "pages" && editingPage && (
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-300">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">{editingPage.title} - SEO Ayarları</h2>
                <button 
                  onClick={() => setEditingPageId(null)}
                  className="text-xs font-medium text-gray-500 hover:text-black"
                >
                  ← Sayfa Listesine Dön
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="pageTitle">Meta Başlık (Title)</Label>
                  <Input 
                    id="pageTitle" 
                    value={editingPage.title} 
                    onChange={e => handlePageChange('title', e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[11px] text-gray-500">Arama sonuçlarında tıklanabilir ana başlık.</p>
                    <span className={`text-[11px] font-mono ${editingPage.title.length > 60 ? 'text-red-500' : 'text-green-600'}`}>
                      {editingPage.title.length} / 60
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageDesc">Meta Açıklama (Description)</Label>
                  <Textarea 
                    id="pageDesc" 
                    rows={3} 
                    value={editingPage.description}
                    onChange={e => handlePageChange('description', e.target.value)}
                  />
                  <div className="flex justify-between items-center mt-1">
                    <p className="text-[11px] text-gray-500">İçeriğinizi özetleyen ve tıklamaya teşvik eden açıklama.</p>
                    <span className={`text-[11px] font-mono ${editingPage.description.length > 160 ? 'text-red-500' : 'text-green-600'}`}>
                      {editingPage.description.length} / 160
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pageKw">Anahtar Kelimeler (Keywords)</Label>
                  <Input 
                    id="pageKw" 
                    value={editingPage.keywords} 
                    onChange={e => handlePageChange('keywords', e.target.value)}
                    placeholder="virgül, ile, ayırın"
                  />
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium">Arama Motorlarına İzin Ver (Index)</h4>
                    <p className="text-[11px] text-gray-500">Bu sayfanın Google tarafından taranmasına izin verin.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      className="sr-only peer" 
                      checked={editingPage.isIndexable}
                      onChange={e => handlePageChange('isIndexable', e.target.checked)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black"></div>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar / Preview Area */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-6">
            <div className="flex items-center gap-2 mb-4">
              <Eye className="size-4 text-blue-600" />
              <h3 className="font-semibold text-sm">Google Arama Önizlemesi</h3>
            </div>
            
            {/* Google Snippet Simulator */}
            <div className="bg-white border border-[#dfe1e5] rounded-lg p-4 shadow-[0_1px_6px_rgba(32,33,36,.28)]">
              <div className="flex items-center gap-3 mb-1">
                <div className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center">
                  <span className="text-[10px] font-bold">E</span>
                </div>
                <div>
                  <div className="text-[14px] text-[#202124] leading-tight">{globalData.siteName}</div>
                  <div className="text-[12px] text-[#4d5156] leading-tight">
                    https://eraydus.com{activeTab === 'pages' && editingPage ? editingPage.path : '/'}
                  </div>
                </div>
              </div>
              <h4 className="text-[20px] text-[#1a0dab] leading-[1.3] font-normal hover:underline cursor-pointer line-clamp-1">
                {activeTab === 'pages' && editingPage 
                  ? `${editingPage.title} ${globalData.titleSeparator} ${globalData.siteName}` 
                  : `Erayduş ${globalData.titleSeparator} Lüks Duşakabin Sistemleri`}
              </h4>
              <p className="text-[14px] text-[#4d5156] leading-[1.58] mt-1 line-clamp-2">
                {activeTab === 'pages' && editingPage 
                  ? editingPage.description 
                  : globalData.defaultDescription}
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">SEO Skoru</h4>
              {activeTab === 'pages' && editingPage ? (
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Başlık Uzunluğu</span>
                    {editingPage.title.length >= 30 && editingPage.title.length <= 60 
                      ? <span className="text-green-600 font-medium">İyi</span>
                      : <span className="text-orange-500 font-medium">Geliştirilmeli</span>}
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-600">Açıklama Uzunluğu</span>
                    {editingPage.description.length >= 120 && editingPage.description.length <= 160 
                      ? <span className="text-green-600 font-medium">İyi</span>
                      : <span className="text-orange-500 font-medium">Geliştirilmeli</span>}
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-500">Skor analizini görmek için sayfalar sekmesinden bir sayfa seçin.</p>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
