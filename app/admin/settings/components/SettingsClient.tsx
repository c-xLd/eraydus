"use client"

import { useState } from "react"
import { Save, Settings2, Globe, Mail, Shield, Bell } from "lucide-react"
import { toast } from "sonner"
import { motion } from "framer-motion"

export function SettingsClient() {
  const [activeTab, setActiveTab] = useState('general')
  const [isLoading, setIsLoading] = useState(false)

  const handleSave = () => {
    setIsLoading(true)
    // Simulate save
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Ayarlar başarıyla kaydedildi.")
    }, 800)
  }

  const tabs = [
    { id: 'general', label: 'Genel Ayarlar', icon: Settings2 },
    { id: 'contact', label: 'İletişim Bilgileri', icon: Mail },
    { id: 'security', label: 'Güvenlik', icon: Shield },
    { id: 'notifications', label: 'Bildirimler', icon: Bell },
  ]

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Platform Ayarları</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizin temel çalışma prensiplerini ve iletişim bilgilerini yönetin.</p>
        </div>
        <button 
          onClick={handleSave} 
          disabled={isLoading} 
          className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0A0A0A] text-white text-sm font-medium rounded-xl hover:bg-black/80 transition-all disabled:opacity-50 shadow-xl shadow-black/10 hover:shadow-black/20"
        >
          <Save className="size-4" />
          {isLoading ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0">
          <nav className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all whitespace-nowrap ${
                    isActive 
                      ? "text-[#0A0A0A] font-medium bg-white shadow-sm border border-gray-100" 
                      : "text-gray-500 hover:text-[#0A0A0A] hover:bg-gray-50 border border-transparent font-light"
                  }`}
                >
                  <Icon className={`size-4 ${isActive ? 'text-champagne' : ''}`} />
                  {tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[400px]">
            {activeTab === 'general' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Genel Bilgiler</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Marka Adı</label>
                    <input type="text" defaultValue="ERAYDUŞ" className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Logo</label>
                    <div className="flex items-center gap-4">
                      <div className="size-16 bg-[#0A0A0A] rounded-xl flex items-center justify-center text-white text-xs tracking-widest font-medium">LOGO</div>
                      <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">Değiştir</button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bakım Modu</label>
                    <select className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm">
                      <option value="off">Kapalı (Site Yayında)</option>
                      <option value="on">Açık (Ziyaretçilere Kapalı)</option>
                    </select>
                    <p className="text-xs text-gray-400 mt-2">Bakım modu açıkken sadece adminler siteyi görebilir.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'contact' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">İletişim Bilgileri</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">E-posta Adresi</label>
                    <input type="email" defaultValue="info@eraydus.com" className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Telefon Numarası</label>
                    <input type="tel" defaultValue="+90 555 123 4567" className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fiziksel Adres</label>
                    <textarea rows={3} defaultValue="Örnek Mah. Tasarım Sok. No:1 Kadıköy/İstanbul" className="w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 transition-all text-sm resize-none" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'security' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Güvenlik Ayarları</h3>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-100">
                  <div>
                    <p className="font-medium text-sm text-gray-900">İki Aşamalı Doğrulama (2FA)</p>
                    <p className="text-xs text-gray-500 mt-1">Admin girişlerinde ekstra güvenlik katmanı.</p>
                  </div>
                  <button className="px-4 py-2 text-xs font-medium text-white bg-black rounded-lg hover:bg-black/80 transition-colors">Aktifleştir</button>
                </div>
              </motion.div>
            )}

            {activeTab === 'notifications' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Sistem Bildirimleri</h3>
                <div className="space-y-3">
                  {['Yeni Müşteri Talebi', 'Sistem Hataları', 'Günlük Performans Raporu'].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                      <input type="checkbox" defaultChecked className="size-4 text-black focus:ring-black border-gray-300 rounded" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
