"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, Image as ImageIcon, Plus } from "lucide-react"
import { createClient } from '@/services/supabase/client'

const ALL_GLASSES = [
  { id: 'clear', name: 'Şeffaf Extra Clear' },
  { id: 'smoke', name: 'Füme (Siyah) Cam' },
  { id: 'bronze', name: 'Bronz Cam' },
  { id: 'fluted', name: 'Oluklu (Fluted) Cam' },
  { id: 'frosted', name: 'Buzlu (Kumlama) Cam' },
  { id: 'nano', name: 'Nano Kaplı Cam' },
]

const ALL_PROFILES = [
  { id: 'black', name: 'Mat Siyah' },
  { id: 'chrome', name: 'Parlak Krom' },
  { id: 'gold', name: 'Fırçalı Altın' },
  { id: 'white', name: 'Mat Beyaz' },
  { id: 'gunmetal', name: 'Antrasit' },
  { id: 'nickel', name: 'Fırçalı Nikel' },
]

export default function ProductEditorPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: 'Köşe',
    series: 'edge',
    status: 'published',
    availableGlasses: [] as string[],
    availableProfiles: [] as string[],
    image: ''
  })

  const handleToggleArray = (field: 'availableGlasses' | 'availableProfiles', id: string) => {
    setFormData(prev => {
      const arr = prev[field]
      if (arr.includes(id)) {
        return { ...prev, [field]: arr.filter(x => x !== id) }
      } else {
        return { ...prev, [field]: [...arr, id] }
      }
    })
  }

  const handleSave = async (status: string) => {
    if (!formData.title || !formData.price) {
      alert("Lütfen ürün adı ve başlangıç fiyatını giriniz.")
      return
    }

    setIsSaving(true)
    const supabase = createClient()
    const slug = formData.title.toLowerCase().replace(/[^a-z0-9çğıöşü]+/g, '-')

    const features = {
      availableGlasses: formData.availableGlasses,
      availableProfiles: formData.availableProfiles,
    }

    const { error } = await supabase.from('products').insert({
      title: formData.title,
      slug: slug,
      description: formData.description,
      price: Number(formData.price),
      category: formData.category,
      series: formData.series,
      status: status,
      features: features,
      images: formData.image ? [formData.image] : []
    })

    setIsSaving(false)

    if (error) {
      alert('Kaydedilirken hata oluştu: ' + error.message)
    } else {
      router.push('/admin/products')
    }
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/products" className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <ArrowLeft className="size-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Yeni Ürün Ekle</h1>
            <p className="text-sm text-gray-500">Konfigüratör (Tasarla) ve Mağaza için ürün kuralı oluşturun.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button 
            disabled={isSaving}
            onClick={() => handleSave('draft')}
            className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50"
          >
            Taslak Kaydet
          </button>
          <button 
            disabled={isSaving}
            onClick={() => handleSave('published')}
            className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 shadow-sm disabled:opacity-50"
          >
            <Save className="size-4" />
            {isSaving ? 'Kaydediliyor...' : 'Yayımla'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Desc */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı (Model)</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                placeholder="Örn: Edge Premium Köşe Kabin" 
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 outline-none text-black" 
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</label>
              <textarea 
                rows={2} 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                placeholder="Ürün özelliklerini kısaca özetleyin..."
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 outline-none resize-none text-black"
              />
            </div>
          </div>

          {/* Configuration Rules Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Tabs Sidebar */}
            <div className="w-full md:w-48 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="p-3 font-semibold text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">Konfigüratör Verisi</div>
              <ul className="flex flex-row md:flex-col overflow-x-auto">
                {['Genel Ayarlar', 'Uyumlu Camlar', 'Profil Renkleri'].map((tab, i) => {
                  const id = ['general', 'glass', 'profiles'][i]
                  return (
                    <li key={id}>
                      <button 
                        onClick={() => setActiveTab(id)}
                        className={`w-full text-left px-4 py-3 text-sm font-medium border-l-2 whitespace-nowrap ${activeTab === id ? 'bg-white border-blue-600 text-blue-600' : 'border-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900'}`}
                      >
                        {tab}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            
            {/* Tab Content */}
            <div className="flex-1 p-6 min-h-[300px]">
              {activeTab === 'general' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Başlangıç Fiyatı (₺)</label>
                    <input 
                      type="number" 
                      value={formData.price}
                      onChange={e => setFormData({...formData, price: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black" 
                      placeholder="Örn: 8500" 
                    />
                  </div>
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Koleksiyon (Seri)</label>
                    <select 
                      value={formData.series}
                      onChange={e => setFormData({...formData, series: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black"
                    >
                      <option value="edge">EDGE Serisi</option>
                      <option value="pure">PURE Serisi</option>
                      <option value="luxury">LUXURY Serisi</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Yerleşim Tipi</label>
                    <select 
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black"
                    >
                      <option value="wall-to-wall">İki Duvar Arası</option>
                      <option value="corner">Köşe</option>
                      <option value="walk-in">Walk-in</option>
                      <option value="sliding">Sürgülü</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'glass' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Müşterilerin konfigüratörde bu ürün için seçebileceği cam tiplerini işaretleyin.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ALL_GLASSES.map(glass => (
                      <label key={glass.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.availableGlasses.includes(glass.id)}
                          onChange={() => handleToggleArray('availableGlasses', glass.id)}
                          className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-gray-700">{glass.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profiles' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Müşterilerin konfigüratörde bu ürün için seçebileceği profil renklerini işaretleyin.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {ALL_PROFILES.map(profile => (
                      <label key={profile.id} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.availableProfiles.includes(profile.id)}
                          onChange={() => handleToggleArray('availableProfiles', profile.id)}
                          className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" 
                        />
                        <span className="text-sm text-gray-700">{profile.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {/* Status */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Görünürlük</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={formData.status === 'published'}
                  onChange={() => setFormData({...formData, status: 'published'})}
                  className="text-blue-600" 
                />
                Konfigüratörde Aktif (Yayında)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input 
                  type="radio" 
                  name="status" 
                  checked={formData.status === 'draft'}
                  onChange={() => setFormData({...formData, status: 'draft'})}
                  className="text-blue-600" 
                />
                Gizli (Taslak)
              </label>
            </div>
          </div>

          {/* Product Image */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Ürün Görseli</h3>
            
            {!formData.image ? (
              <div className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-500">
                <ImageIcon className="size-8" />
                <span className="text-sm font-medium">Ana Görsel Ekle</span>
              </div>
            ) : (
              <div className="w-full aspect-square border border-gray-200 rounded-lg overflow-hidden relative group">
                <img src={formData.image} alt="Preview" className="w-full h-full object-cover" />
              </div>
            )}
            
            <input 
              type="text" 
              value={formData.image}
              onChange={e => setFormData({...formData, image: e.target.value})}
              placeholder="Görsel URL giriniz..."
              className="w-full px-3 py-2 border border-gray-200 rounded-md outline-none text-sm text-black"
            />
            <p className="text-xs text-gray-400 text-center">Önerilen: 1200x1600px (JPG/PNG)</p>
          </div>

          {/* Gallery */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Ürün Galerisi</h3>
            <button className="w-full py-4 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-500 text-sm font-medium">
              <Plus className="size-4" />
              Galeriye Görsel Ekle
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
