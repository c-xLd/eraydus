"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Save, Image as ImageIcon, Plus } from "lucide-react"

export default function ProductEditorPage() {
  const [activeTab, setActiveTab] = useState('general')

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
            <p className="text-sm text-gray-500">Kataloğunuza yeni bir duşakabin modeli ekleyin.</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 text-gray-700">Taslak Kaydet</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 shadow-sm">
            <Save className="size-4" />
            Yayımla
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content (Left) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Desc */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ürün Adı</label>
              <input type="text" placeholder="Örn: Edge Premium Köşe" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-300 outline-none text-black" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Kısa Açıklama</label>
              <textarea rows={2} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-300 outline-none resize-none text-black"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Uzun Açıklama (Ürün Detay Sayfası İçin)</label>
              <textarea rows={6} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black/5 focus:border-gray-300 outline-none resize-none text-black"></textarea>
            </div>
          </div>

          {/* WooCommerce Style Product Data Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col md:flex-row">
            {/* Tabs Sidebar */}
            <div className="w-full md:w-48 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
              <div className="p-3 font-semibold text-xs text-gray-500 uppercase tracking-wider border-b border-gray-200">Ürün Verisi</div>
              <ul className="flex flex-row md:flex-col overflow-x-auto">
                {['Genel', 'Teknik Özellikler', 'Uyumlu Camlar', 'Profil Renkleri'].map((tab, i) => {
                  const id = ['general', 'specs', 'glass', 'profiles'][i]
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
                    <input type="number" className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-black/5 outline-none text-black" placeholder="0.00" />
                  </div>
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Vergi Durumu</label>
                    <select className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-black/5 outline-none text-black">
                      <option>Vergilendirilebilir (+ KDV)</option>
                      <option>Vergi Yok</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-4 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Yerleşim Tipi</label>
                    <select className="flex-1 px-3 py-2 border border-gray-200 rounded-md focus:ring-2 focus:ring-black/5 outline-none text-black">
                      <option>Köşe</option>
                      <option>İki Duvar Arası</option>
                      <option>Sürgülü</option>
                      <option>Walk-in</option>
                    </select>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Genişlik Aralığı</label>
                    <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black" placeholder="Örn: 80x80cm - 120x120cm" />
                  </div>
                  <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Standart Yükseklik</label>
                    <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black" placeholder="Örn: 200cm - 240cm" />
                  </div>
                  <div className="flex items-center gap-4 pb-4">
                    <label className="w-1/3 text-sm font-medium text-gray-700">Montaj Tipi</label>
                    <input type="text" className="flex-1 px-3 py-2 border border-gray-200 rounded-md outline-none text-black" placeholder="Örn: Zemin üstü veya Tekne üstü" />
                  </div>
                </div>
              )}

              {activeTab === 'glass' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Bu modelde seçilebilecek cam tiplerini işaretleyin.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Şeffaf Extra Clear', 'Füme (Siyah) Cam', 'Bronz Cam', 'Oluklu (Fluted) Cam', 'Buzlu (Kumlama) Cam'].map(glass => (
                      <label key={glass} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{glass}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'profiles' && (
                <div>
                  <p className="text-sm text-gray-500 mb-4">Bu modelde seçilebilecek profil renklerini işaretleyin.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {['Mat Siyah', 'Parlak Krom', 'Fırçalanmış Altın', 'Antik Bronz', 'Mat Beyaz'].map(profile => (
                      <label key={profile} className="flex items-center gap-2 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="checkbox" className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        <span className="text-sm text-gray-700">{profile}</span>
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
          {/* Status & Visibility */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Durum ve Görünürlük</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="status" defaultChecked className="text-blue-600 focus:ring-blue-500" />
                Herkese Açık (Yayında)
              </label>
              <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                <input type="radio" name="status" className="text-blue-600 focus:ring-blue-500" />
                Gizli (Sadece Adminler)
              </label>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Kategoriler (Seriler)</h3>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {['EDGE Serisi', 'PURE Serisi', 'LUXURY Serisi', 'Basic Serisi'].map(cat => (
                <label key={cat} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  {cat}
                </label>
              ))}
            </div>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">+ Yeni Kategori Ekle</button>
          </div>

          {/* Product Image */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-semibold text-gray-900 border-b border-gray-100 pb-2">Ürün Görseli</h3>
            <button className="w-full aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center gap-2 hover:border-gray-400 hover:bg-gray-50 transition-colors text-gray-500">
              <ImageIcon className="size-8" />
              <span className="text-sm font-medium">Ana Görsel Ekle</span>
            </button>
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
