'use client'

import { useState } from 'react'
import {
  Sparkles,
  Bot,
  Globe,
  FileText,
  MessageCircle,
  Share2,
  Copy,
  Check,
  RefreshCw,
  CheckCircle2,
  Send
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import {
  generateSeoMeta,
  generateSocialCopy,
  generateCustomPrompt,
  testAiStatus
} from '@/app/admin/actions/ai'
import { generateAiBlogContent } from '@/app/admin/blog/actions'

interface ProductOption {
  id: string
  name: string
  slug: string
}

interface Props {
  products: ProductOption[]
}

const CLOUD_MODELS = [
  { id: 'gemma4:31b', name: 'Gemma 4 (31B) Cloud', badge: 'Önerilen', desc: 'En akıcı Türkçe ve lüks marka dili' },
  { id: 'nemotron-3-ultra', name: 'Nvidia Nemotron 3 Ultra', badge: 'Lüks Mimari', desc: 'Detaylı ürün ve mimari betimlemeler' },
  { id: 'gpt-oss:120b', name: 'GPT-OSS (120B)', badge: 'Yüksek Kapasite', desc: 'Kapsamlı blog ve derin SEO stratejileri' },
  { id: 'gpt-oss:20b', name: 'GPT-OSS (20B)', badge: 'Ultra Hızlı', desc: 'Hızlı başlık ve meta üretimleri' },
  { id: 'nemotron-3-super', name: 'Nemotron 3 Super', badge: 'Dengeli', desc: 'Zengin ürün özellikleri ve içerik' },
  { id: 'nemotron-3-nano:30b', name: 'Nemotron 3 Nano (30B)', badge: 'Hafif', desc: 'Kısa form metinler' },
  { id: 'minimax-m3', name: 'MiniMax M3', badge: 'Çok Dilli', desc: 'Alternatif içerik üretimi' }
]

export default function AiAssistantClient({ products }: Props) {
  const [activeTab, setActiveTab] = useState<'seo' | 'blog' | 'social' | 'custom'>('seo')
  const [selectedModel, setSelectedModel] = useState('gemma4:31b')
  const [connectionStatus, setConnectionStatus] = useState<{
    tested: boolean
    success: boolean
    latency: number
    message: string
  }>({
    tested: false,
    success: true,
    latency: 0,
    message: 'Ollama Cloud Bağlı'
  })
  const [isTestingConn, setIsTestingConn] = useState(false)
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  // Tab 1: SEO Meta
  const [seoSlug, setSeoSlug] = useState('')
  const [seoTitleInput, setSeoTitleInput] = useState('')
  const [seoResult, setSeoResult] = useState<{ title: string; description: string } | null>(null)
  const [isGeneratingSeo, setIsGeneratingSeo] = useState(false)

  // Tab 2: Blog Article
  const [blogTitle, setBlogTitle] = useState('')
  const [blogDesc, setBlogDesc] = useState('')
  const [blogTags, setBlogTags] = useState('')
  const [blogResult, setBlogResult] = useState<string>('')
  const [isGeneratingBlog, setIsGeneratingBlog] = useState(false)

  // Tab 3: Social & WhatsApp
  const [socialProduct, setSocialProduct] = useState('')
  const [socialPlatform, setSocialPlatform] = useState<'instagram' | 'whatsapp' | 'linkedin'>('whatsapp')
  const [socialResult, setSocialResult] = useState<string>('')
  const [isGeneratingSocial, setIsGeneratingSocial] = useState(false)

  // Tab 4: Custom Prompt
  const [customPrompt, setCustomPrompt] = useState('')
  const [customResult, setCustomResult] = useState<string>('')
  const [isGeneratingCustom, setIsGeneratingCustom] = useState(false)

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text)
    setCopiedKey(key)
    toast.success('Panoya kopyalandı!')
    setTimeout(() => setCopiedKey(null), 2000)
  }

  const handleTestConnection = async () => {
    setIsTestingConn(true)
    try {
      const res = await testAiStatus(selectedModel)
      setConnectionStatus({
        tested: true,
        success: res.success,
        latency: res.latencyMs,
        message: res.message
      })
      if (res.success) {
        toast.success(`Ollama Cloud (${selectedModel}) yanıt verdi: ${res.latencyMs}ms`)
      } else {
        toast.error(res.message)
      }
    } catch (err: any) {
      toast.error('Bağlantı hatası: ' + err.message)
    } finally {
      setIsTestingConn(false)
    }
  }

  // Handle SEO Generation
  const handleGenerateSeo = async () => {
    if (!seoSlug && !seoTitleInput) {
      toast.error('Lütfen bir ürün seçin veya başlık girin.')
      return
    }
    setIsGeneratingSeo(true)
    try {
      const res = await generateSeoMeta(seoSlug || 'urun-sayfasi', seoTitleInput, selectedModel)
      if (res.success) {
        setSeoResult({ title: res.title || '', description: res.description || '' })
        toast.success(`SEO metinleri üretildi (${res.model || selectedModel})`)
      } else {
        toast.error(res.error || 'SEO metinleri üretilemedi.')
      }
    } catch (e: any) {
      toast.error('Hata: ' + e.message)
    } finally {
      setIsGeneratingSeo(false)
    }
  }

  // Handle Blog Generation
  const handleGenerateBlog = async () => {
    if (!blogTitle.trim()) {
      toast.error('Lütfen bir blog başlığı girin.')
      return
    }
    setIsGeneratingBlog(true)
    try {
      const tagsArray = blogTags.split(',').map(t => t.trim()).filter(Boolean)
      const res = await generateAiBlogContent({
        title: blogTitle,
        description: blogDesc,
        tags: tagsArray,
        modelOverride: selectedModel
      })
      if (res.success && res.content) {
        setBlogResult(res.content)
        toast.success('Blog makalesi başarıyla oluşturuldu!')
      } else {
        toast.error(res.error || 'Blog içeriği üretilemedi.')
      }
    } catch (e: any) {
      toast.error('Hata: ' + e.message)
    } finally {
      setIsGeneratingBlog(false)
    }
  }

  // Handle Social Copy Generation
  const handleGenerateSocial = async () => {
    if (!socialProduct.trim()) {
      toast.error('Lütfen ürün veya konu adını girin.')
      return
    }
    setIsGeneratingSocial(true)
    try {
      const res = await generateSocialCopy(socialProduct, socialPlatform, selectedModel)
      if (res.success && res.content) {
        setSocialResult(res.content)
        toast.success('Metin başarıyla üretildi!')
      } else {
        toast.error(res.error || 'Metin üretilemedi.')
      }
    } catch (e: any) {
      toast.error('Hata: ' + e.message)
    } finally {
      setIsGeneratingSocial(false)
    }
  }

  // Handle Custom Prompt
  const handleGenerateCustom = async () => {
    if (!customPrompt.trim()) {
      toast.error('Lütfen bir istem (prompt) yazın.')
      return
    }
    setIsGeneratingCustom(true)
    try {
      const res = await generateCustomPrompt(customPrompt, '', selectedModel, 1200)
      if (res.success && res.content) {
        setCustomResult(res.content)
        toast.success('Yanıt üretildi!')
      } else {
        toast.error(res.error || 'Yanıt alınamadı.')
      }
    } catch (e: any) {
      toast.error('Hata: ' + e.message)
    } finally {
      setIsGeneratingCustom(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header & Status Bar */}
      <div className="bg-white border rounded-3xl p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="size-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight flex items-center gap-2.5">
                  AI Studio & Asistan
                  <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 text-xs font-semibold px-2.5 py-0.5">
                    Ollama Cloud
                  </Badge>
                </h1>
                <p className="text-sm text-gray-500">
                  Erayduş için optimize edilmiş Türkçe SEO, Blog ve Satış Metni Üretim Merkezi
                </p>
              </div>
            </div>
          </div>

          {/* Model Selector & Live Status */}
          <div className="flex flex-wrap items-center gap-3 bg-gray-50/80 p-3 rounded-2xl border">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider block">
                Aktif AI Modeli
              </span>
              <select
                value={selectedModel}
                onChange={e => setSelectedModel(e.target.value)}
                className="bg-white border border-gray-200 text-gray-900 text-xs font-medium rounded-xl px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              >
                {CLOUD_MODELS.map(m => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.badge})
                  </option>
                ))}
              </select>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleTestConnection}
              disabled={isTestingConn}
              className="h-9 mt-4 sm:mt-0 text-xs bg-white hover:bg-gray-100 shadow-sm"
            >
              <RefreshCw className={`size-3.5 mr-1.5 ${isTestingConn ? 'animate-spin' : ''}`} />
              {isTestingConn ? 'Test Ediliyor...' : 'Bağlantıyı Test Et'}
            </Button>
          </div>
        </div>

        {/* Selected Model Description Banner */}
        <div className="mt-4 pt-4 border-t flex items-center justify-between text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="size-4 text-emerald-600" />
            <span>
              <strong>{CLOUD_MODELS.find(m => m.id === selectedModel)?.name}:</strong>{' '}
              {CLOUD_MODELS.find(m => m.id === selectedModel)?.desc}
            </span>
          </div>
          {connectionStatus.tested && (
            <span className="text-emerald-700 font-medium bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              Gecikme: {connectionStatus.latency}ms
            </span>
          )}
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="space-y-6">
        <div className="bg-gray-100/80 p-1.5 rounded-2xl grid grid-cols-2 md:grid-cols-4 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('seo')}
            className={`rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'seo'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Globe className="size-4" />
            SEO Meta Üretici
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('blog')}
            className={`rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'blog'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <FileText className="size-4" />
            Blog Makalesi Yazıcı
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('social')}
            className={`rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'social'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <MessageCircle className="size-4" />
            WhatsApp & Sosyal Medya
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('custom')}
            className={`rounded-xl py-2.5 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
              activeTab === 'custom'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
            }`}
          >
            <Bot className="size-4" />
            Serbest İstem (Prompt)
          </button>
        </div>

        {/* TAB 1: SEO META GENERATOR */}
        {activeTab === 'seo' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Input Form */}
            <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Globe className="size-4 text-blue-600" />
                Ürün veya Sayfa Seçimi
              </h2>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Mevcut Ürünlerden Seç</Label>
                <select
                  value={seoSlug}
                  onChange={e => {
                    const found = products.find(p => p.slug === e.target.value)
                    setSeoSlug(e.target.value)
                    if (found) setSeoTitleInput(found.name)
                  }}
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 text-xs rounded-xl p-2.5 outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">-- Ürün Seçin (İsteğe Bağlı) --</option>
                  {products.map(p => (
                    <option key={p.id} value={p.slug}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Sayfa / Ürün Başlığı veya Konusu</Label>
                <Input
                  placeholder="Örn: Siyah Mat Profilli Sürgülü Duşakabin"
                  value={seoTitleInput}
                  onChange={e => setSeoTitleInput(e.target.value)}
                  className="bg-gray-50 text-xs rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Sayfa Yolu (Slug / URL)</Label>
                <Input
                  placeholder="Örn: siyah-mat-surgulu-dusakabin"
                  value={seoSlug}
                  onChange={e => setSeoSlug(e.target.value)}
                  className="bg-gray-50 text-xs rounded-xl"
                />
              </div>

              <Button
                onClick={handleGenerateSeo}
                disabled={isGeneratingSeo}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl shadow-md shadow-blue-500/20 py-2.5 text-xs font-semibold"
              >
                {isGeneratingSeo ? (
                  <>
                    <RefreshCw className="size-4 mr-2 animate-spin" />
                    Ollama Cloud ile Üretiliyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    SEO Meta Etiketleri Üret
                  </>
                )}
              </Button>
            </div>

            {/* Results & Google Preview */}
            <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-6">
              <h2 className="text-base font-semibold text-gray-900">Google Arama Önizlemesi & Çıktılar</h2>

              {/* Google SERP Card */}
              <div className="p-5 bg-white border rounded-2xl shadow-sm space-y-1.5 font-sans">
                <div className="flex items-center gap-2 text-xs text-[#202124]">
                  <div className="size-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">E</div>
                  <div>
                    <span className="block font-medium">Erayduş Showroom</span>
                    <span className="block text-[11px] text-[#4d5156]">
                      https://www.eraydus.net/urunler/{seoSlug || 'ornek-urun'}
                    </span>
                  </div>
                </div>
                <h3 className="text-[19px] text-[#1a0dab] font-medium leading-snug hover:underline cursor-pointer pt-1">
                  {seoResult?.title || seoTitleInput || 'Erayduş | Lüks Duşakabin Sistemleri'}
                </h3>
                <p className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                  {seoResult?.description || 'Erayduş özel üretim duşakabin çözümleri. 6-8mm temperli cam ve sessiz kayar ray teknolojisi ile banyonuza mimari estetik katın.'}
                </p>
              </div>

              {/* Output Fields */}
              {seoResult && (
                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <Label className="font-semibold text-gray-700">Üretilen SEO Title ({seoResult.title.length}/60)</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(seoResult.title, 'title')}
                        className="h-7 text-[11px] text-gray-500 hover:text-gray-900"
                      >
                        {copiedKey === 'title' ? <Check className="size-3 mr-1 text-emerald-600" /> : <Copy className="size-3 mr-1" />}
                        Kopyala
                      </Button>
                    </div>
                    <Input readOnly value={seoResult.title} className="bg-gray-50 font-medium text-xs rounded-xl" />
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <Label className="font-semibold text-gray-700">Üretilen Meta Description ({seoResult.description.length}/160)</Label>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(seoResult.description, 'desc')}
                        className="h-7 text-[11px] text-gray-500 hover:text-gray-900"
                      >
                        {copiedKey === 'desc' ? <Check className="size-3 mr-1 text-emerald-600" /> : <Copy className="size-3 mr-1" />}
                        Kopyala
                      </Button>
                    </div>
                    <Textarea readOnly rows={3} value={seoResult.description} className="bg-gray-50 text-xs rounded-xl resize-none" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: BLOG ARTICLE WRITER */}
        {activeTab === 'blog' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <FileText className="size-4 text-indigo-600" />
                Blog Makale Parametreleri
              </h2>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Yazı Başlığı *</Label>
                <Input
                  placeholder="Örn: Küçük Banyolar İçin En Kullanışlı Duşakabin Modelleri"
                  value={blogTitle}
                  onChange={e => setBlogTitle(e.target.value)}
                  className="bg-gray-50 text-xs rounded-xl"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Kısa Özet veya Odak Noktası</Label>
                <Textarea
                  placeholder="Örn: Sürgülü modeller, köşe yerleşimleri ve şeffaf cam avantajları..."
                  value={blogDesc}
                  onChange={e => setBlogDesc(e.target.value)}
                  rows={3}
                  className="bg-gray-50 text-xs rounded-xl resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Etiketler (Virgülle ayırın)</Label>
                <Input
                  placeholder="duşakabin, banyo dekorasyonu, küçük banyo, erayduş"
                  value={blogTags}
                  onChange={e => setBlogTags(e.target.value)}
                  className="bg-gray-50 text-xs rounded-xl"
                />
              </div>

              <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100 text-[11px] text-indigo-900 space-y-1">
                <p className="font-semibold">✨ Erayduş Humanizer Kuralları Aktif:</p>
                <p className="text-indigo-700">Klişe yapay zeka ifadelerinden arındırılmış, doğrudan çözüme odaklanan, alt başlıklar ve listeli zengin HTML çıktısı üretilir.</p>
              </div>

              <Button
                onClick={handleGenerateBlog}
                disabled={isGeneratingBlog}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md shadow-indigo-500/20 py-2.5 text-xs font-semibold"
              >
                {isGeneratingBlog ? (
                  <>
                    <RefreshCw className="size-4 mr-2 animate-spin" />
                    Makale Oluşturuluyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    Makaleyi Yaz
                  </>
                )}
              </Button>
            </div>

            {/* Blog Preview */}
            <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Makale Önizlemesi & HTML Çıktısı</h2>
                {blogResult && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(blogResult, 'blog')}
                    className="h-8 text-xs bg-white shadow-sm"
                  >
                    {copiedKey === 'blog' ? <Check className="size-3.5 mr-1 text-emerald-600" /> : <Copy className="size-3.5 mr-1" />}
                    HTML'i Kopyala
                  </Button>
                )}
              </div>

              {blogResult ? (
                <div className="border rounded-2xl p-5 bg-gray-50 max-h-[500px] overflow-y-auto space-y-3 prose prose-sm max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: blogResult }} />
                </div>
              ) : (
                <div className="border border-dashed rounded-2xl p-12 text-center text-gray-400 space-y-2">
                  <FileText className="size-8 mx-auto text-gray-300" />
                  <p className="text-xs">Sol taraftaki formu doldurup "Makaleyi Yaz" butonuna tıklayın.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 3: SOCIAL & WHATSAPP */}
        {activeTab === 'social' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <MessageCircle className="size-4 text-emerald-600" />
                Pazarlama & İletişim Metni
              </h2>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Platform Seçimi</Label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
                    { id: 'instagram', label: 'Instagram', icon: Share2 },
                    { id: 'linkedin', label: 'LinkedIn', icon: Globe }
                  ].map(p => {
                    const Icon = p.icon
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setSocialPlatform(p.id as any)}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                          socialPlatform === p.id
                            ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                            : 'bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <Icon className="size-4" />
                        {p.label}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">Ürün / Kampanya Adı</Label>
                <Input
                  placeholder="Örn: Bronz Aynalı Siyah Duşakabin Modeli"
                  value={socialProduct}
                  onChange={e => setSocialProduct(e.target.value)}
                  className="bg-gray-50 text-xs rounded-xl"
                />
              </div>

              <Button
                onClick={handleGenerateSocial}
                disabled={isGeneratingSocial}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md shadow-emerald-500/20 py-2.5 text-xs font-semibold"
              >
                {isGeneratingSocial ? (
                  <>
                    <RefreshCw className="size-4 mr-2 animate-spin" />
                    Metin Hazırlanıyor...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4 mr-2" />
                    Pazarlama Metni Üret
                  </>
                )}
              </Button>
            </div>

            <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">Hazırlanan Mesaj / Gönderi</h2>
                {socialResult && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(socialResult, 'social')}
                    className="h-8 text-xs bg-white shadow-sm"
                  >
                    {copiedKey === 'social' ? <Check className="size-3.5 mr-1 text-emerald-600" /> : <Copy className="size-3.5 mr-1" />}
                    Kopyala
                  </Button>
                )}
              </div>

              {socialResult ? (
                <div className="p-5 bg-gray-50 border rounded-2xl whitespace-pre-wrap text-xs text-gray-800 leading-relaxed font-sans">
                  {socialResult}
                </div>
              ) : (
                <div className="border border-dashed rounded-2xl p-12 text-center text-gray-400 space-y-2">
                  <MessageCircle className="size-8 mx-auto text-gray-300" />
                  <p className="text-xs">Ürün adını girip platform seçtikten sonra üret butonuna tıklayın.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOM PROMPT STUDIO */}
        {activeTab === 'custom' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-5 bg-white border rounded-3xl p-6 shadow-sm space-y-5">
              <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
                <Bot className="size-4 text-purple-600" />
                Özel İstem (Prompt)
              </h2>

              <div className="space-y-2">
                <Label className="text-xs text-gray-700">İsteminiz (Prompt)</Label>
                <Textarea
                  placeholder="Örn: Erayduş için 5 adet FAQ (Sıkça Sorulan Sorular) ve detaylı yanıtlarını JSON formatında hazırla."
                  value={customPrompt}
                  onChange={e => setCustomPrompt(e.target.value)}
                  rows={6}
                  className="bg-gray-50 text-xs rounded-xl resize-none"
                />
              </div>

              <Button
                onClick={handleGenerateCustom}
                disabled={isGeneratingCustom}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white rounded-xl shadow-md shadow-purple-500/20 py-2.5 text-xs font-semibold"
              >
                {isGeneratingCustom ? (
                  <>
                    <RefreshCw className="size-4 mr-2 animate-spin" />
                    Ollama Cloud Yanıtlıyor...
                  </>
                ) : (
                  <>
                    <Send className="size-4 mr-2" />
                    İstemi Gönder
                  </>
                )}
              </Button>
            </div>

            <div className="lg:col-span-7 bg-white border rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">AI Yanıtı</h2>
                {customResult && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(customResult, 'custom')}
                    className="h-8 text-xs bg-white shadow-sm"
                  >
                    {copiedKey === 'custom' ? <Check className="size-3.5 mr-1 text-emerald-600" /> : <Copy className="size-3.5 mr-1" />}
                    Kopyala
                  </Button>
                )}
              </div>

              {customResult ? (
                <div className="p-5 bg-gray-50 border rounded-2xl whitespace-pre-wrap text-xs text-gray-800 leading-relaxed font-mono max-h-[500px] overflow-y-auto">
                  {customResult}
                </div>
              ) : (
                <div className="border border-dashed rounded-2xl p-12 text-center text-gray-400 space-y-2">
                  <Bot className="size-8 mx-auto text-gray-300" />
                  <p className="text-xs">İstediğiniz herhangi bir metin veya analiz talebini sol taraftan iletebilirsiniz.</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
