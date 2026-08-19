'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft, FileText, Loader2, Save, Tag, Globe,
  ExternalLink, Image as ImageIcon, Sparkles, RefreshCw, Eye
} from 'lucide-react'
import { toast } from 'sonner'
import { updateBlogPost, generateAiBlogContent, generateBlogFaqContent } from '../actions'
import { generateSeoMeta } from '@/app/admin/actions/ai'
import TiptapEditor from '@/components/admin/TiptapEditor'
import FeaturedImageUpload from '@/components/admin/FeaturedImageUpload'
import SeoScorePanel from '@/components/admin/SeoScorePanel'
import {
  slugify,
  generateAutoSeoTitle,
  generateAutoSeoDescription,
  extractSuggestedTags
} from '@/lib/seo-helpers'

type BlogPost = {
  id: string
  title: string
  slug: string | null
  description: string | null
  body: string | null
  featured_image: string | null
  status: string | null
  seo_title: string | null
  seo_description: string | null
  tags: string[] | null
}

export default function EditBlogClient({ post }: { post: BlogPost }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isGeneratingAi, setIsGeneratingAi] = useState(false)
  const [isGeneratingFaq, setIsGeneratingFaq] = useState(false)
  const [isGeneratingSeoAi, setIsGeneratingSeoAi] = useState(false)

  const [formData, setFormData] = useState({
    title: post.title || '',
    slug: post.slug || '',
    description: post.description || '',
    body: post.body || '',
    featured_image: post.featured_image || '',
    status: post.status || 'published',
    seo_title: post.seo_title || post.title || '',
    seo_description: post.seo_description || post.description || '',
    tagsStr: post.tags?.join(', ') || ''
  })

  const [isSlugEdited, setIsSlugEdited] = useState(true)
  const [isSeoTitleEdited, setIsSeoTitleEdited] = useState(!!post.seo_title)
  const [isSeoDescEdited, setIsSeoDescEdited] = useState(!!post.seo_description)

  // Otomatik Senkronizasyon (Başlık değiştikçe)
  const handleTitleChange = (newTitle: string) => {
    const autoSlug = slugify(newTitle)
    const autoSeoTitle = generateAutoSeoTitle(newTitle)

    setFormData(prev => ({
      ...prev,
      title: newTitle,
      slug: isSlugEdited ? prev.slug : autoSlug,
      seo_title: isSeoTitleEdited ? prev.seo_title : autoSeoTitle
    }))
  }

  // Otomatik Senkronizasyon (Özet Açıklama değiştikçe)
  const handleDescriptionChange = (newDesc: string) => {
    const autoSeoDesc = generateAutoSeoDescription(newDesc, formData.body)

    setFormData(prev => ({
      ...prev,
      description: newDesc,
      seo_description: isSeoDescEdited ? prev.seo_description : autoSeoDesc
    }))
  }

  // Otomatik Senkronizasyon (Makale İçeriği değiştikçe)
  const handleBodyChange = (html: string) => {
    setFormData(prev => {
      const autoSeoDesc = isSeoDescEdited
        ? prev.seo_description
        : (prev.seo_description || generateAutoSeoDescription(prev.description, html))

      return {
        ...prev,
        body: html,
        seo_description: autoSeoDesc
      }
    })
  }

  // ⚡ Tek tıkla tüm SEO alanlarını otomatik optimize et
  const handleAutoGenerateSEO = () => {
    if (!formData.title.trim()) {
      toast.error('Lütfen önce bir yazı başlığı girin')
      return
    }

    const autoSlug = slugify(formData.title)
    const autoSeoTitle = generateAutoSeoTitle(formData.title)
    const autoSeoDesc = generateAutoSeoDescription(formData.description, formData.body)
    const suggestedTags = extractSuggestedTags(formData.title, formData.body)

    const currentTags = formData.tagsStr
      ? formData.tagsStr.split(',').map(t => t.trim()).filter(Boolean)
      : []
    const combinedTags = Array.from(new Set([...currentTags, ...suggestedTags]))

    setFormData(prev => ({
      ...prev,
      slug: autoSlug,
      seo_title: autoSeoTitle,
      seo_description: autoSeoDesc || prev.description || autoSeoTitle,
      tagsStr: combinedTags.join(', ')
    }))

    setIsSlugEdited(true)
    setIsSeoTitleEdited(true)
    setIsSeoDescEdited(true)

    toast.success('SEO Başlığı, Açıklaması, Slug ve Etiketler otomatik optimize edildi!')
  }

  // ✨ Yapay Zeka ile Makale Yazdır / Genişlet
  const handleGenerateAiContent = async () => {
    if (!formData.title.trim()) {
      toast.error('Makale üretmek için lütfen önce bir Yazı Başlığı girin')
      return
    }

    setIsGeneratingAi(true)
    const toastId = toast.loading('Yapay zeka uzman blog makalenizi hazırlıyor...')

    try {
      const tags = formData.tagsStr
        ? formData.tagsStr.split(',').map(t => t.trim()).filter(Boolean)
        : []

      const res = await generateAiBlogContent({
        title: formData.title,
        description: formData.description,
        tags
      })

      if (!res.success || !res.content) {
        throw new Error(res.error || 'İçerik üretilemedi')
      }

      setFormData(prev => ({
        ...prev,
        body: res.content || prev.body
      }))

      handleAutoGenerateSEO()

      toast.dismiss(toastId)
      toast.success('✨ 400+ kelimelik SEO uyumlu makale başarıyla oluşturuldu!')
    } catch (err: any) {
      toast.dismiss(toastId)
      toast.error(err?.message || 'Makale üretilirken bir hata oluştu')
    } finally {
      setIsGeneratingAi(false)
    }
  }

  const handleGenerateFaqContent = async () => {
    if (!formData.title.trim()) {
      toast.error('Lütfen önce bir yazı başlığı girin')
      return
    }

    setIsGeneratingFaq(true)
    const toastId = toast.loading('Sıkça Sorulan Sorular hazırlanıyor...')
    try {
      const res = await generateBlogFaqContent({ title: formData.title })
      if (!res.success || !res.content) {
        throw new Error(res.error || 'SSS üretilemedi')
      }
      setFormData(prev => ({
        ...prev,
        body: `${prev.body || ''}\n\n${res.content}`
      }))
      toast.dismiss(toastId)
      toast.success('✨ Sıkça Sorulan Sorular bloğu makalenin sonuna eklendi!')
    } catch (e: any) {
      toast.dismiss(toastId)
      toast.error(e.message)
    } finally {
      setIsGeneratingFaq(false)
    }
  }

  const handleGenerateSeoWithAi = async () => {
    if (!formData.title.trim()) {
      toast.error('Lütfen önce bir başlık girin')
      return
    }

    setIsGeneratingSeoAi(true)
    try {
      const res = await generateSeoMeta(formData.slug || slugify(formData.title), formData.title)
      if (res.success) {
        setFormData(prev => ({
          ...prev,
          seo_title: res.title || prev.seo_title,
          seo_description: res.description || prev.seo_description
        }))
        setIsSeoTitleEdited(true)
        setIsSeoDescEdited(true)
        toast.success(`Ollama Cloud (${res.model || 'gemma4:31b'}) ile SEO Meta üretildi!`)
      } else {
        toast.error(res.error || 'SEO üretilemedi')
      }
    } catch (e: any) {
      toast.error('AI hatası: ' + e.message)
    } finally {
      setIsGeneratingSeoAi(false)
    }
  }


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title.trim()) {
      toast.error('Lütfen blog başlığını girin')
      return
    }

    if (!formData.slug.trim()) {
      toast.error('Lütfen bir URL slug girin')
      return
    }

    const tags = formData.tagsStr
      .split(',')
      .map(t => t.trim())
      .filter(Boolean)

    setIsSubmitting(true)

    try {
      const res = await updateBlogPost(post.id, { ...formData, tags })
      if (!res.success) throw new Error(res.error)
      toast.success('Blog yazısı başarıyla güncellendi!')
      router.push('/admin/blog')
    } catch (err: any) {
      toast.error(err.message || 'Yazı güncellenirken bir hata oluştu')
    } finally {
      setIsSubmitting(false)
    }
  }

  const seoTitleLength = (formData.seo_title || formData.title).length
  const seoDescLength = (formData.seo_description || formData.description).length

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-2"
          >
            <ArrowLeft className="size-4" /> Tabloya Dön
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <FileText className="size-6 text-amber-600" /> Blog Yazısını Düzenle
          </h1>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            "{post.title}" başlıklı makale içeriğini ve SEO ayarlarını güncelleyin.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAutoGenerateSEO}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-900 border border-amber-200 text-xs font-semibold rounded-xl hover:bg-amber-100 transition-colors shadow-sm"
          >
            <Sparkles className="size-4 text-amber-600" /> Otomatik SEO Oluştur
          </button>
          {post.slug && (
            <Link
              href={`/blog/${post.slug}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-200 transition-colors"
            >
              <ExternalLink className="size-3.5" /> Canlı Gör
            </Link>
          )}
        </div>
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Left — Form */}
        <form onSubmit={handleSubmit} className="flex-1 min-w-0 w-full space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Yazı Başlığı *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => handleTitleChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-black focus:bg-white font-medium"
            />
          </div>

          {/* Slug & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                  URL Slug *
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const autoSlug = slugify(formData.title)
                    setFormData(prev => ({ ...prev, slug: autoSlug }))
                    toast.success('Slug başlıktan yeniden üretildi')
                  }}
                  className="text-[11px] text-amber-600 hover:underline flex items-center gap-1 font-medium"
                >
                  <RefreshCw className="size-3" /> Başlıktan Yenile
                </button>
              </div>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">/blog/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  className="w-full pl-16 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-mono focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                Yayın Durumu
              </label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value })}
                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="published">Yayında (Published)</option>
                <option value="draft">Taslak (Draft)</option>
              </select>
            </div>
          </div>

          {/* Featured Image */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <ImageIcon className="size-3.5 text-gray-400" /> Kapak Görseli
            </label>
            <FeaturedImageUpload
              value={formData.featured_image}
              onChange={url => setFormData(prev => ({ ...prev, featured_image: url }))}
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Tag className="size-3.5 text-gray-400" /> Etiketler (Virgülle ayırın)
            </label>
            <input
              type="text"
              value={formData.tagsStr}
              onChange={e => setFormData({ ...formData, tagsStr: e.target.value })}
              placeholder="Siyah Profil, Bakım, Banyo Yenileme"
              className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Excerpt / Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Özet Açıklama (Meta Description)
            </label>
            <textarea
              rows={3}
              value={formData.description}
              onChange={e => handleDescriptionChange(e.target.value)}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* SEO SECTION WITH AUTOMATIC SYNC & PREVIEW */}
          <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-800 uppercase tracking-wider flex items-center gap-1.5">
                <Globe className="size-4 text-amber-600" /> Otomatik SEO & Arama Motoru Ayarları
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleGenerateSeoWithAi}
                  disabled={isGeneratingSeoAi}
                  className="text-xs px-2.5 py-1 bg-amber-100/70 hover:bg-amber-200 text-amber-900 font-semibold rounded-lg flex items-center gap-1 transition-colors disabled:opacity-50"
                >
                  {isGeneratingSeoAi ? <RefreshCw className="size-3 animate-spin" /> : <Sparkles className="size-3 text-amber-600" />}
                  Ollama ile SEO Üret
                </button>
                <button
                  type="button"
                  onClick={handleAutoGenerateSEO}
                  className="text-xs text-amber-700 hover:text-amber-800 font-semibold flex items-center gap-1"
                >
                  Otomatik Doldur
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-700 font-medium">SEO Başlığı (Otomatik)</label>
                  <span className={`text-[11px] font-mono ${
                    seoTitleLength >= 40 && seoTitleLength <= 65 ? 'text-emerald-600 font-semibold' : 'text-gray-400'
                  }`}>
                    {seoTitleLength}/65
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={e => {
                    setIsSeoTitleEdited(true)
                    setFormData({ ...formData, seo_title: e.target.value })
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs text-gray-700 font-medium">SEO Açıklaması (Otomatik)</label>
                  <span className={`text-[11px] font-mono ${
                    seoDescLength >= 120 && seoDescLength <= 160 ? 'text-emerald-600 font-semibold' : 'text-gray-400'
                  }`}>
                    {seoDescLength}/160
                  </span>
                </div>
                <input
                  type="text"
                  value={formData.seo_description}
                  onChange={e => {
                    setIsSeoDescEdited(true)
                    setFormData({ ...formData, seo_description: e.target.value })
                  }}
                  className="w-full px-3.5 py-2.5 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>

            {/* Google SERP Live Preview */}
            <div className="pt-3 border-t border-gray-200">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 mb-2">
                <Eye className="size-3.5" /> Google Arama Önizlemesi (SERP)
              </div>
              <div className="p-4 bg-white rounded-xl border border-gray-200 space-y-1">
                <div className="flex items-center gap-2 text-[11px] text-gray-500">
                  <span className="font-semibold text-gray-800">eraydus.net</span>
                  <span>›</span>
                  <span className="text-gray-500 font-mono">blog › {formData.slug || 'slug'}</span>
                </div>
                <h4 className="text-base text-[#1a0dab] hover:underline font-medium line-clamp-1 cursor-pointer">
                  {formData.seo_title || formData.title || 'Yazı Başlığı'}
                </h4>
                <p className="text-xs text-[#4d5156] line-clamp-2 leading-relaxed">
                  {formData.seo_description || formData.description || 'Google arama sonuçlarında gösterilecek açıklama burada yer alır.'}
                </p>
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Makale İçeriği *
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={isGeneratingFaq}
                  onClick={handleGenerateFaqContent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold rounded-lg hover:bg-blue-100 transition-all shadow-sm disabled:opacity-50"
                >
                  {isGeneratingFaq ? <Loader2 className="size-3.5 animate-spin" /> : <Sparkles className="size-3.5" />}
                  <span>+ AI ile SSS (FAQ) Ekle</span>
                </button>
                <button
                  type="button"
                  disabled={isGeneratingAi}
                  onClick={handleGenerateAiContent}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-xs font-semibold rounded-lg hover:from-amber-600 hover:to-amber-700 transition-all shadow-sm disabled:opacity-50"
                >
                  {isGeneratingAi ? (
                    <>
                      <Loader2 className="size-3.5 animate-spin" />
                      <span>AI Makale Yazıyor...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-3.5" />
                      <span>✨ AI ile Makale Yazdır (Humanizer)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <TiptapEditor
              value={formData.body}
              onChange={handleBodyChange}
              placeholder="Makale içeriğinizi buraya yazın veya AI butonuyla zenginleştirin..."
            />
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-100">
            <Link
              href="/admin/blog"
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              İptal
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm flex items-center gap-2 disabled:opacity-50"
            >
              {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
              {isSubmitting ? 'Güncelleniyor...' : 'Değişiklikleri Kaydet'}
            </button>
          </div>
        </form>

        {/* Right — SEO Score (sticky) */}
        <div className="w-full lg:w-72 shrink-0 lg:sticky lg:top-6">
          <SeoScorePanel data={formData} />
        </div>
      </div>
    </div>
  )
}

export { EditBlogClient }

