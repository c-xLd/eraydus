"use client"

import { useState } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Save, Globe, MapPin, Building2, BrainCircuit, Activity } from "lucide-react"
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { updateSiteSettings } from "../actions"

const seoSettingsSchema = z.object({
  siteName: z.string().min(2, "Site adı en az 2 karakter olmalıdır"),
  titleSeparator: z.string().min(1, "Ayraç gerekli"),
  defaultDescription: z.string().min(10, "Açıklama çok kısa").max(160, "SEO için 160 karakteri aşmayın"),
  defaultOgImage: z.string().url("Geçerli bir URL girin veya yolu belirtin").or(z.string().startsWith("/")),
  twitterHandle: z.string().startsWith("@", "Twitter handle @ ile başlamalıdır"),
  contact: z.object({
    phone: z.string().min(10, "Geçerli bir telefon girin"),
    email: z.string().email("Geçerli bir e-posta girin"),
    address: z.object({
      streetAddress: z.string().min(5, "Adres çok kısa"),
      addressLocality: z.string().min(2, "İlçe zorunlu"),
      addressRegion: z.string().min(2, "İl zorunlu"),
      postalCode: z.string().min(4, "Posta kodu gerekli"),
      addressCountry: z.string().min(2, "Ülke zorunlu")
    })
  }),
  geo: z.object({
    region: z.string().min(2, "Bölge kodu gerekli (Örn: TR-06)"),
    placename: z.string().min(2, "Yer adı zorunlu"),
    position: z.string().min(5, "Koordinat gerekli (Örn: 39.9334;32.8597)")
  }),
  localBusiness: z.object({
    openingHours: z.string().min(5, "Çalışma saatleri gerekli"),
    priceRange: z.string().min(1, "Fiyat aralığı (₺₺) gerekli"),
    areaServed: z.string().min(2, "Hizmet verilen bölgeleri virgülle ayırarak yazın")
  }),
  aiSeo: z.object({
    brandGuidelines: z.string().min(10, "Yapay zeka için marka kılavuzu gerekli"),
    targetAudience: z.string().min(5, "Hedef kitle tanımı gerekli")
  }).optional()
})

type SeoSettingsValues = z.infer<typeof seoSettingsSchema>

export function SettingsClient({ initialData }: { initialData: Record<string, unknown> | null | undefined }) {
  const [activeTab, setActiveTab] = useState('general')
  const [isSaving, setIsSaving] = useState(false)

  // Parse areaServed from array to string for the form
  const defaultValues = {
    ...initialData,
    localBusiness: {
      ...initialData?.localBusiness,
      areaServed: Array.isArray(initialData?.localBusiness?.areaServed) 
        ? initialData.localBusiness.areaServed.join(', ')
        : initialData?.localBusiness?.areaServed || ''
    },
    aiSeo: initialData?.aiSeo || {
      brandGuidelines: "Erayduş, lüks ve premium segmentte yer alan modern bir duşakabin markasıdır.",
      targetAudience: "Mimarlar, iç mimarlar ve lüks yaşam alanları arayan son kullanıcılar."
    }
  }

  const { register, handleSubmit, formState: { errors }, control } = useForm<SeoSettingsValues>({
    resolver: zodResolver(seoSettingsSchema),
    defaultValues
  })

  const onSubmit = async (data: SeoSettingsValues) => {
    setIsSaving(true)
    
    // Transform areaServed back to array
    const formattedData = {
      ...data,
      localBusiness: {
        ...data.localBusiness,
        areaServed: data.localBusiness.areaServed.split(',').map(s => s.trim()).filter(Boolean)
      }
    }

    const result = await updateSiteSettings(formattedData)
    
    setIsSaving(false)
    if (result.success) {
      toast.success("SEO ve Sistem Ayarları başarıyla güncellendi!")
    } else {
      toast.error("Kaydedilirken hata oluştu: " + result.error)
    }
  }

  const tabs = [
    { id: 'general', label: 'Genel SEO & Meta', icon: Globe, desc: 'Site ismi, açıklama ve meta etiketleri' },
    { id: 'local', label: 'Local Business & Schema', icon: Building2, desc: 'İletişim ve işletme schema verileri' },
    { id: 'geo', label: 'Coğrafi (Geo) SEO', icon: MapPin, desc: 'Bölgesel arama optimizasyonu' },
    { id: 'ai', label: 'AI & Semantic SEO', icon: BrainCircuit, desc: 'LLM\'ler için marka yönergeleri' },
  ]

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-6xl mx-auto pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-4 z-10">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <Activity className="size-6 text-emerald-500" />
            Gelişmiş SEO Ayarları
          </h1>
          <p className="text-sm text-gray-500 mt-1">Google ve Yapay Zeka botları için sistem yapılandırması.</p>
        </div>
        <button 
          type="submit"
          disabled={isSaving} 
          className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-black text-white text-sm font-medium rounded-xl hover:bg-black/90 transition-all disabled:opacity-50 shadow-xl shadow-black/10 hover:shadow-black/20"
        >
          {isSaving ? (
            <div className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-72 shrink-0">
          <nav className="flex lg:flex-col gap-3 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-start gap-1 p-4 rounded-xl text-left transition-all min-w-[200px] lg:min-w-0 ${
                    isActive 
                      ? "bg-white shadow-md border border-gray-100" 
                      : "hover:bg-white/60 border border-transparent"
                  }`}
                >
                  <div className={`flex items-center gap-2 text-sm font-semibold ${isActive ? 'text-black' : 'text-gray-600'}`}>
                    <Icon className={`size-4 ${isActive ? 'text-emerald-500' : 'text-gray-400'}`} />
                    {tab.label}
                  </div>
                  <p className="text-xs text-gray-500 line-clamp-1">{tab.desc}</p>
                </button>
              )
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1">
          <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm min-h-[500px]">
            <AnimatePresence mode="wait">
              {activeTab === 'general' && (
                <motion.div key="general" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Genel SEO & Meta Yapılandırması</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Site Adı (Brand Name)</label>
                      <input {...register("siteName")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.siteName ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 text-sm`} />
                      {errors.siteName && <p className="text-red-500 text-xs">{errors.siteName.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Başlık Ayracı (Title Separator)</label>
                      <input {...register("titleSeparator")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.titleSeparator ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 text-sm`} />
                      {errors.titleSeparator && <p className="text-red-500 text-xs">{errors.titleSeparator.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Twitter Handle</label>
                      <input {...register("twitterHandle")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.twitterHandle ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 text-sm`} />
                      {errors.twitterHandle && <p className="text-red-500 text-xs">{errors.twitterHandle.message}</p>}
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Varsayılan Meta Açıklama (Default Description)</label>
                      <textarea rows={3} {...register("defaultDescription")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.defaultDescription ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 text-sm resize-none`} />
                      <div className="flex justify-between items-center mt-1">
                        {errors.defaultDescription ? <p className="text-red-500 text-xs">{errors.defaultDescription.message}</p> : <span />}
                      </div>
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Varsayılan Sosyal Medya Görseli (OG Image URL)</label>
                      <input {...register("defaultOgImage")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.defaultOgImage ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 text-sm`} />
                      {errors.defaultOgImage && <p className="text-red-500 text-xs">{errors.defaultOgImage.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'local' && (
                <motion.div key="local" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">İletişim & Local Business Schema</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Telefon</label>
                      <input {...register("contact.phone")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.contact?.phone ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm`} />
                      {errors.contact?.phone && <p className="text-red-500 text-xs">{errors.contact.phone.message}</p>}
                    </div>
                    
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">E-posta</label>
                      <input {...register("contact.email")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.contact?.email ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm`} />
                      {errors.contact?.email && <p className="text-red-500 text-xs">{errors.contact.email.message}</p>}
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Açık Adres (Street Address)</label>
                      <input {...register("contact.address.streetAddress")} className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.contact?.address?.streetAddress ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">İlçe (Locality)</label>
                      <input {...register("contact.address.addressLocality")} className={`w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">İl (Region)</label>
                      <input {...register("contact.address.addressRegion")} className={`w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Posta Kodu</label>
                      <input {...register("contact.address.postalCode")} className={`w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Ülke (Country Code)</label>
                      <input {...register("contact.address.addressCountry")} className={`w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1 md:col-span-2 pt-4 border-t border-gray-100">
                      <h4 className="text-sm font-semibold text-gray-900 mb-4">Schema Verileri</h4>
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Çalışma Saatleri (ISO 8601)</label>
                      <input {...register("localBusiness.openingHours")} placeholder="Mo,Tu,We,Th,Fr,Sa 09:00-19:00" className={`w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Fiyat Aralığı Segmenti</label>
                      <input {...register("localBusiness.priceRange")} placeholder="₺₺" className={`w-full px-4 py-3 bg-[#F9F9F9] border border-gray-200 rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Hizmet Verilen Bölgeler (Virgülle ayırın)</label>
                      <textarea rows={2} {...register("localBusiness.areaServed")} placeholder="Ankara, Çankaya, Yenimahalle" className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.localBusiness?.areaServed ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm resize-none`} />
                      {errors.localBusiness?.areaServed && <p className="text-red-500 text-xs">{errors.localBusiness.areaServed.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'geo' && (
                <motion.div key="geo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Coğrafi (Geo) Meta Verileri</h3>
                  <p className="text-sm text-gray-500">Google ve diğer arama motorlarına fiziksel konumunuzu tam olarak bildirir. Yerel aramalarda (Local SEO) üst sıralara çıkmak için kritiktir.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Bölge (geo.region)</label>
                      <input {...register("geo.region")} placeholder="TR-06" className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.geo?.region ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm`} />
                      {errors.geo?.region && <p className="text-red-500 text-xs">{errors.geo.region.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Yer Adı (geo.placename)</label>
                      <input {...register("geo.placename")} placeholder="Ankara" className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.geo?.placename ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm`} />
                    </div>

                    <div className="space-y-1 md:col-span-2">
                      <label className="text-sm font-medium text-gray-700">Koordinatlar (geo.position)</label>
                      <input {...register("geo.position")} placeholder="39.9334;32.8597" className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.geo?.position ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm`} />
                      <p className="text-xs text-gray-500 mt-1">Enlem ve boylamı noktalı virgül ile ayırın (Örn: 39.9334;32.8597)</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'ai' && (
                <motion.div key="ai" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900 border-b border-gray-100 pb-4">Yapay Zeka & Semantik SEO Optimizasyonu</h3>
                  <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl mb-6">
                    <p className="text-sm text-emerald-800 font-medium">Bu veriler, ChatGPT, Claude ve Gemini gibi büyük dil modellerine şirketinizin kurumsal kimliğini ve hedef kitlesini öğretmek için kullanılır (AI Search Optimization).</p>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Marka Kılavuzu & Konumlandırma (AI Prompt)</label>
                      <textarea rows={4} {...register("aiSeo.brandGuidelines")} placeholder="Erayduş, lüks segmentte..." className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.aiSeo?.brandGuidelines ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm resize-none`} />
                      <p className="text-xs text-gray-500 mt-1">AI botları bu markayı nasıl tanımalı?</p>
                      {errors.aiSeo?.brandGuidelines && <p className="text-red-500 text-xs">{errors.aiSeo.brandGuidelines.message}</p>}
                    </div>

                    <div className="space-y-1">
                      <label className="text-sm font-medium text-gray-700">Hedef Kitle Tanımı</label>
                      <textarea rows={3} {...register("aiSeo.targetAudience")} placeholder="Mimarlar ve lüks konut sahipleri..." className={`w-full px-4 py-3 bg-[#F9F9F9] border ${errors.aiSeo?.targetAudience ? 'border-red-500' : 'border-gray-200'} rounded-xl text-sm resize-none`} />
                      {errors.aiSeo?.targetAudience && <p className="text-red-500 text-xs">{errors.aiSeo.targetAudience.message}</p>}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </form>
  )
}
