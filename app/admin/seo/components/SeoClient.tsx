"use client"

import { useState } from "react"
import { Save, FileText, Plus, Trash2, TrendingUp, BarChart3, Edit, Sparkles, Loader2, Info, Check, X } from "lucide-react"
import { saveGlobalSeo, updateSeoMetadata, deleteSeoMetadata } from "../actions"
import { generateSeoMeta } from '../../actions/ai'
import { toast } from "sonner"
import { motion, AnimatePresence } from "framer-motion"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { globalSeoSchema, GlobalSeoFormValues } from "../validations"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog"

export default function SeoClient({ initialPages, initialGlobal }: { initialPages: any[], initialGlobal: any }) {
  const [activeTab, setActiveTab] = useState<'global' | 'geo' | 'pages' | 'analytics' | 'ai'>('global')
  const [pages, setPages] = useState(initialPages)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  
  // Dialog State
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [editingPage, setEditingPage] = useState<any>(null)
  const [isAiLoading, setIsAiLoading] = useState(false)
  
  const [pageFormData, setPageFormData] = useState({
    title: '',
    description: '',
    keywords: '',
    status: 'optimized',
    ogImage: '',
    faqSchemaEnabled: false,
    faqData: [] as { question: string; answer: string }[]
  })

  const form = useForm<GlobalSeoFormValues>({
    resolver: zodResolver(globalSeoSchema),
    defaultValues: {
      siteTitle: initialGlobal?.title || '',
      siteDesc: initialGlobal?.description || '',
      keywords: initialGlobal?.keywords || '',
      language: 'tr',
      robots: (initialGlobal?.robots_index !== false ? 'index' : 'noindex') + ', ' + (initialGlobal?.robots_follow !== false ? 'follow' : 'nofollow'),
      titleSeparator: initialGlobal?.title_separator || '|',
      twitterHandle: initialGlobal?.twitter_handle || '',
      ogImage: initialGlobal?.og_image || '',
      geoData: {
        phone: initialGlobal?.geo_data?.phone || '',
        email: initialGlobal?.geo_data?.email || '',
        address: {
          streetAddress: initialGlobal?.geo_data?.address?.streetAddress || '',
          addressLocality: initialGlobal?.geo_data?.address?.addressLocality || '',
          addressRegion: initialGlobal?.geo_data?.address?.addressRegion || '',
          postalCode: initialGlobal?.geo_data?.address?.postalCode || '',
          addressCountry: initialGlobal?.geo_data?.address?.addressCountry || 'TR'
        },
        geo: {
          region: initialGlobal?.geo_data?.geo?.region || '',
          placename: initialGlobal?.geo_data?.geo?.placename || '',
          position: initialGlobal?.geo_data?.geo?.position || ''
        },
        localBusiness: {
          openingHours: initialGlobal?.geo_data?.localBusiness?.openingHours || 'Mo,Tu,We,Th,Fr,Sa 09:00-19:00',
          priceRange: initialGlobal?.geo_data?.localBusiness?.priceRange || '₺₺'
        },
        socialLinks: {
          instagram: initialGlobal?.geo_data?.socialLinks?.instagram || '',
          facebook: initialGlobal?.geo_data?.socialLinks?.facebook || '',
          youtube: initialGlobal?.geo_data?.socialLinks?.youtube || '',
          linkedin: initialGlobal?.geo_data?.socialLinks?.linkedin || ''
        },
        analytics: {
          googleAnalyticsId: initialGlobal?.geo_data?.analytics?.googleAnalyticsId || '',
          googleTagManagerId: initialGlobal?.geo_data?.analytics?.googleTagManagerId || '',
          metaPixelId: initialGlobal?.geo_data?.analytics?.metaPixelId || '',
        },
        brand: {
          targetAudience: initialGlobal?.geo_data?.brand?.targetAudience || '',
          brandGuidelines: initialGlobal?.geo_data?.brand?.brandGuidelines || '',
        }
      }
    }
  })

  const onSubmitGlobal = async (data: GlobalSeoFormValues) => {
    setLoadingId('global')
    const result = await saveGlobalSeo(data)
    setLoadingId(null)
    if (result.success) {
      toast.success("SEO ayarları başarıyla kaydedildi.")
      form.reset(data) // Reset dirty state
    } else {
      toast.error("Hata: " + result.error)
    }
  }

  // --- Page Functions ---
  const handleOpenEditDialog = (page: any) => {
    setEditingPage(page)
    setPageFormData({
      title: page.title || '',
      description: page.description || '',
      keywords: page.keywords || '',
      status: page.status || 'optimized',
      ogImage: page.og_image || '',
      faqSchemaEnabled: page.faq_schema_enabled || false,
      faqData: Array.isArray(page.faq_data) ? page.faq_data : []
    })
    setIsDialogOpen(true)
  }

  const handleAiGenerateSeo = async () => {
    if (!editingPage) return
    setIsAiLoading(true)
    const currentTitle = pageFormData.title || editingPage.title || ''
    const slug = editingPage.page_slug || ''
    const result = await generateSeoMeta(slug, currentTitle)
    setIsAiLoading(false)
    if (result.success) {
      setPageFormData(prev => ({
        ...prev,
        title: result.title || prev.title,
        description: result.description || prev.description
      }))
      toast.success("AI SEO metinlerini başarıyla oluşturdu.")
    } else {
      toast.error(result.error || "AI veri üretemedi.")
    }
  }

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!editingPage) return
    setLoadingId(editingPage.id)
    const result = await updateSeoMetadata(editingPage.id, pageFormData)
    setLoadingId(null)
    if (result.success && result.data) {
      toast.success("Sayfa ayarları güncellendi.")
      setPages(prev => prev.map(p => p.id === result.data.id ? result.data : p))
      setIsDialogOpen(false)
    } else {
      toast.error("Güncelleme hatası: " + result.error)
    }
  }

  const handleDelete = async (id: string) => {
    if (!window.confirm("Silmek istediğinize emin misiniz?")) return
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

  const tabs = [
    { id: 'global', label: 'Genel SEO' },
    { id: 'geo', label: 'Yerel & Coğrafi (GEO)' },
    { id: 'ai', label: 'Yapay Zeka (AI)' },
    { id: 'analytics', label: 'İzleme & Analitik' },
    { id: 'pages', label: 'Sayfa Optimizasyonu' }
  ]

  return (
    <div className="pb-24 max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">İleri Düzey SEO & GEO Merkezi</h1>
        <p className="text-sm text-gray-500 mt-2">
          Arama motorlarında ve Yapay Zeka botlarında (ChatGPT, Gemini) kusursuz görünürlük için işletme ayarlarınızı yapılandırın.
        </p>
      </div>

      {/* Modern Tabs */}
      <div className="flex items-center gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`relative pb-3 text-sm font-medium transition-colors ${
              activeTab === tab.id ? "text-black" : "text-gray-500 hover:text-black"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
            )}
          </button>
        ))}
      </div>

      {/* Main Content Area */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab !== 'pages' ? (
            <form id="global-seo-form" onSubmit={form.handleSubmit(onSubmitGlobal)} className="space-y-8">
              
              {activeTab === 'global' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Save className="size-5" /></div>
                    <h3 className="text-lg font-semibold text-gray-900">Genel SEO Ayarları</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Site Başlığı (Title)</label>
                      <input {...form.register('siteTitle')} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                      {form.formState.errors.siteTitle && <p className="text-xs text-red-500">{form.formState.errors.siteTitle.message}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Başlık Ayırıcı</label>
                      <select {...form.register('titleSeparator')} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black">
                        <option value="|">| (Boru)</option>
                        <option value="-">- (Tire)</option>
                        <option value="~">~ (Tilda)</option>
                        <option value="•">• (Nokta)</option>
                      </select>
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Meta Açıklaması (Description)</label>
                      <textarea {...form.register('siteDesc')} rows={3} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black resize-none" />
                      {form.formState.errors.siteDesc && <p className="text-xs text-red-500">{form.formState.errors.siteDesc.message}</p>}
                    </div>

                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Varsayılan Paylaşım Görseli (OG Image URL)</label>
                      <input {...form.register('ogImage')} placeholder="/images/og-default.jpg" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Anahtar Kelimeler</label>
                      <input {...form.register('keywords')} placeholder="duşakabin, banyo, ankara" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Robots Kuralları</label>
                      <select {...form.register('robots')} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black">
                        <option value="index, follow">Index, Follow</option>
                        <option value="noindex, follow">No Index, Follow</option>
                        <option value="index, nofollow">Index, No Follow</option>
                        <option value="noindex, nofollow">No Index, No Follow</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'geo' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border border-purple-100 p-6 rounded-2xl">
                    <div className="flex gap-3">
                      <Sparkles className="size-6 text-purple-600 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-purple-900">Generative Engine Optimization (GEO) Nedir?</h4>
                        <p className="text-sm text-purple-800 mt-1">Bu alandaki bilgiler doğrudan Google Knowledge Graph, ChatGPT ve Perplexity gibi yapay zeka sistemlerine işletmenizin ne olduğunu ve nerede bulunduğunu öğretir. Tam ve doğru doldurulması kritiktir.</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* İletişim Bilgileri */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">İletişim & Konum</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Telefon</label>
                          <input {...form.register('geoData.phone')} placeholder="+90 555 123 4567" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">E-Posta</label>
                          <input type="email" {...form.register('geoData.email')} placeholder="info@eraydus.net" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          {form.formState.errors.geoData?.email && <p className="text-xs text-red-500">{form.formState.errors.geoData.email.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Açık Adres (Sokak/Cadde)</label>
                          <input {...form.register('geoData.address.streetAddress')} placeholder="Ostim OSB, 100. Yıl Bulvarı" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">İlçe</label>
                            <input {...form.register('geoData.address.addressLocality')} placeholder="Yenimahalle" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">İl</label>
                            <input {...form.register('geoData.address.addressRegion')} placeholder="Ankara" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Local Business & Sosyal Medya */}
                    <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                      <h3 className="text-lg font-semibold text-gray-900">İşletme & Sosyal Ağlar</h3>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">Çalışma Saatleri (Schema Formatı)</label>
                          <input {...form.register('geoData.localBusiness.openingHours')} placeholder="Mo,Tu,We,Th,Fr,Sa 09:00-19:00" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">Koordinatlar (Enlem;Boylam)</label>
                            <input {...form.register('geoData.geo.position')} placeholder="39.9334;32.8597" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">X (Twitter) Handle</label>
                            <input {...form.register('twitterHandle')} placeholder="@eraydus" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          </div>
                        </div>
                        <div className="space-y-2 pt-2">
                          <label className="text-sm font-medium text-gray-700">Instagram Profil Linki</label>
                          <input {...form.register('geoData.socialLinks.instagram')} placeholder="https://instagram.com/eraydus" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          {form.formState.errors.geoData?.socialLinks?.instagram && <p className="text-xs text-red-500">{form.formState.errors.geoData.socialLinks.instagram.message}</p>}
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700">LinkedIn Profil Linki</label>
                          <input {...form.register('geoData.socialLinks.linkedin')} placeholder="https://linkedin.com/company/eraydus" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                          {form.formState.errors.geoData?.socialLinks?.linkedin && <p className="text-xs text-red-500">{form.formState.errors.geoData.socialLinks.linkedin.message}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'ai' && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100 p-6 rounded-2xl">
                    <div className="flex gap-3">
                      <Sparkles className="size-6 text-blue-600 shrink-0" />
                      <div>
                        <h4 className="text-sm font-bold text-blue-900">Yapay Zeka (AI) SEO</h4>
                        <p className="text-sm text-blue-800 mt-1">ChatGPT, Claude ve Gemini gibi modellere markanızı doğru bir şekilde tanıtmak için buradaki verileri doldurun.</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Hedef Kitle (Target Audience)</label>
                      <textarea {...form.register('geoData.brand.targetAudience')} rows={3} placeholder="Örn: Lüks mimari tasarımlar arayan ev sahipleri ve iç mimarlar" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Marka Kılavuzu & Misyonu</label>
                      <textarea {...form.register('geoData.brand.brandGuidelines')} rows={4} placeholder="Markanızın vizyonu, misyonu ve kalitesi hakkında detaylı bilgi" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black resize-none" />
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'analytics' && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-100 shadow-sm space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">Analitik & İzleme (Tracking)</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Google Analytics ID (GA4)</label>
                      <input {...form.register('geoData.analytics.googleAnalyticsId')} placeholder="G-XXXXXXXXXX" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Google Tag Manager ID (GTM)</label>
                      <input {...form.register('geoData.analytics.googleTagManagerId')} placeholder="GTM-XXXXXXX" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Meta (Facebook) Pixel ID</label>
                      <input {...form.register('geoData.analytics.metaPixelId')} placeholder="123456789012345" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
                    </div>
                  </div>
                </div>
              )}
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { title: 'Toplam Sayfa', value: pages.length, icon: FileText, color: 'text-blue-600', bg: 'bg-blue-50' },
                  { title: 'Optimize Edilmiş', value: pages.filter(p => p.status === 'optimized').length, icon: TrendingUp, color: 'text-green-600', bg: 'bg-green-50' },
                  { title: 'İyileştirme Bekleyen', value: pages.filter(p => p.status !== 'optimized').length, icon: BarChart3, color: 'text-orange-600', bg: 'bg-orange-50' },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
                      <div className={`p-3 rounded-xl ${stat.bg}`}>
                        <Icon className={`size-5 ${stat.color}`} />
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        <p className="text-xs font-medium text-gray-500">{stat.title}</p>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Sayfa</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Durum</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Özel Şema</th>
                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">İşlem</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {pages.map((page) => (
                        <tr key={page.id} className="hover:bg-gray-50/50 transition-colors">
                          <td className="px-6 py-4">
                            <p className="font-medium text-gray-900">{page.title}</p>
                            <p className="text-xs text-gray-500 font-mono mt-0.5">{page.page_slug || '-'}</p>
                          </td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${
                              page.status === 'optimized' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-orange-50 text-orange-700 border border-orange-200'
                            }`}>
                              {page.status === 'optimized' ? <Check className="size-3" /> : <Info className="size-3" />}
                              {page.status === 'optimized' ? 'Optimize' : 'İyileştir'}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            {page.faq_schema_enabled ? (
                              <span className="text-xs font-medium bg-purple-50 text-purple-700 px-2.5 py-1 rounded-md border border-purple-100">FAQ Şeması</span>
                            ) : <span className="text-xs text-gray-400">-</span>}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex justify-center gap-2">
                              <button onClick={() => handleOpenEditDialog(page)} className="p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors">
                                <Edit className="size-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Sticky Save Bar for Global/GEO */}
      <AnimatePresence>
        {activeTab !== 'pages' && form.formState.isDirty && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-gray-900 text-white px-6 py-4 rounded-2xl shadow-2xl border border-gray-800"
          >
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Değişiklikleri kaydetmediniz</p>
            </div>
            <button
              onClick={() => form.handleSubmit(onSubmitGlobal)()}
              disabled={loadingId === 'global'}
              className="flex items-center gap-2 px-6 py-2 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-colors disabled:opacity-50"
            >
              {loadingId === 'global' ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {loadingId === 'global' ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden bg-white rounded-2xl border-0 shadow-2xl">
          <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
            <div>
              <DialogTitle className="text-lg font-semibold text-gray-900">Sayfa SEO Düzenle</DialogTitle>
              <DialogDescription className="text-xs text-gray-500 mt-1">{editingPage?.page_slug}</DialogDescription>
            </div>
          </div>
          <form onSubmit={handleSavePage} className="p-6 space-y-6">
            <div className="flex justify-end">
              <button 
                type="button" 
                onClick={handleAiGenerateSeo}
                disabled={isAiLoading}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-champagne/10 to-champagne/5 text-champagne hover:from-champagne/20 hover:to-champagne/10 border border-champagne/20 rounded-xl text-sm font-medium transition-all"
              >
                {isAiLoading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}
                Yapay Zeka ile Optimize Et
              </button>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Meta Başlık</label>
                <input required value={pageFormData.title} onChange={e => setPageFormData({...pageFormData, title: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Meta Açıklama</label>
                <textarea required rows={3} value={pageFormData.description} onChange={e => setPageFormData({...pageFormData, description: e.target.value})} className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black resize-none" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Özel OG Görseli</label>
                <input value={pageFormData.ogImage} onChange={e => setPageFormData({...pageFormData, ogImage: e.target.value})} placeholder="Opsiyonel" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-black/5 transition-all text-black" />
              </div>
              
              <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex items-start gap-3">
                <input 
                  type="checkbox" 
                  id="faq-toggle"
                  checked={pageFormData.faqSchemaEnabled} 
                  onChange={e => setPageFormData({...pageFormData, faqSchemaEnabled: e.target.checked})} 
                  className="mt-1 rounded text-purple-600 focus:ring-purple-600 size-4 border-purple-300"
                />
                <label htmlFor="faq-toggle" className="cursor-pointer">
                  <span className="block text-sm font-semibold text-purple-900">FAQ (Soru-Cevap) Şeması</span>
                  <span className="block text-xs text-purple-700 mt-1">Bu sayfa arama motorlarında sıkça sorulan sorular zengin sonucu olarak listelenebilir.</span>
                </label>
              </div>

              {pageFormData.faqSchemaEnabled && (
                <div className="space-y-4 border-l-2 border-purple-200 pl-4 ml-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-900">Sorular ve Cevaplar</h4>
                    <button 
                      type="button"
                      onClick={() => setPageFormData({
                        ...pageFormData, 
                        faqData: [...pageFormData.faqData, { question: '', answer: '' }]
                      })}
                      className="text-xs font-medium text-purple-600 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"
                    >
                      <Plus className="size-3" />
                      Soru Ekle
                    </button>
                  </div>
                  
                  {pageFormData.faqData.length === 0 && (
                    <p className="text-xs text-gray-500 italic">Henüz soru eklenmemiş. Lütfen bir soru ekleyin.</p>
                  )}

                  <AnimatePresence>
                    {pageFormData.faqData.map((faq, index) => (
                      <motion.div 
                        key={index}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="bg-white border border-gray-200 rounded-xl p-4 space-y-3 relative group"
                      >
                        <button 
                          type="button"
                          onClick={() => {
                            const newData = [...pageFormData.faqData];
                            newData.splice(index, 1);
                            setPageFormData({...pageFormData, faqData: newData});
                          }}
                          className="absolute -top-2 -right-2 bg-red-100 text-red-600 p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                        
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Soru {index + 1}</label>
                          <input 
                            required 
                            value={faq.question}
                            onChange={(e) => {
                              const newData = [...pageFormData.faqData];
                              newData[index].question = e.target.value;
                              setPageFormData({...pageFormData, faqData: newData});
                            }}
                            placeholder="Sıkça sorulan bir soru..."
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all text-black" 
                          />
                        </div>
                        <div>
                          <label className="text-xs font-medium text-gray-600 mb-1 block">Cevap</label>
                          <textarea 
                            required 
                            rows={2}
                            value={faq.answer}
                            onChange={(e) => {
                              const newData = [...pageFormData.faqData];
                              newData[index].answer = e.target.value;
                              setPageFormData({...pageFormData, faqData: newData});
                            }}
                            placeholder="Bu soru için detaylı ve özgün cevap..."
                            className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:bg-white focus:ring-2 focus:ring-purple-500/20 transition-all text-black resize-none" 
                          />
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>

            <div className="pt-4 flex items-center justify-end gap-3 border-t border-gray-100">
              <button type="button" onClick={() => setIsDialogOpen(false)} className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">İptal</button>
              <button type="submit" disabled={loadingId === editingPage?.id} className="flex items-center gap-2 px-6 py-2.5 bg-black text-white text-sm font-semibold rounded-xl hover:bg-black/90 transition-colors disabled:opacity-50">
                {loadingId === editingPage?.id ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
                Kaydet
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
