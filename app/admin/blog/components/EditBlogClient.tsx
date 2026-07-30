'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, FileText, Loader2, Save, Tag, Globe, ExternalLink, Image as ImageIcon } from 'lucide-react'
import { toast } from 'sonner'
import { updateBlogPost } from '../actions'
import TiptapEditor from '@/components/admin/TiptapEditor'
import FeaturedImageUpload from '@/components/admin/FeaturedImageUpload'
import SeoScorePanel from '@/components/admin/SeoScorePanel'

type BlogPost = {
  id: string
  title: string
  slug: string | null
  content_type: string
  description: string | null
  body: string | null
  status: string
  featured_image: string | null
  published_at: string | null
  created_at: string | null
  seo_title: string | null
  seo_description: string | null
  tags: string[] | null
}

export default function EditBlogClient({ post }: { post: BlogPost }) {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

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

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <Link
            href="/admin/blog"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4"
          >
            <ArrowLeft className="size-4" /> Tabloya Dön
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <FileText className="size-6 text-amber-600" /> Blog Yazısını Düzenle
          </h1>
          <p className="text-sm text-gray-500 mt-1 line-clamp-1">
            &quot;{post.title}&quot; başlıklı makale içeriğini güncelleyin.
          </p>
        </div>

        {post.slug && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 text-xs font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            <ExternalLink className="size-3.5" /> Canlı Sayfayı Gör
          </Link>
        )}
      </div>

      {/* Two-column layout */}
      <div className="flex gap-6 items-start">
        {/* Left — Form */}
        <form onSubmit={handleSubmit} className="flex-1 min-w-0 space-y-6 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm">
          {/* Title */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Yazı Başlığı *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-base focus:outline-none focus:ring-2 focus:ring-black focus:bg-white font-medium"
            />
          </div>

          {/* Slug & Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
                URL Slug *
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 font-mono">/blog/</span>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={e => setFormData({ ...formData, slug: e.target.value })}
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
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* SEO */}
          <div className="p-4 bg-gray-50 rounded-xl border border-gray-200 space-y-4">
            <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="size-4 text-amber-600" /> SEO Ayarları
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">SEO Başlığı</label>
                <input
                  type="text"
                  value={formData.seo_title}
                  onChange={e => setFormData({ ...formData, seo_title: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1 font-medium">SEO Açıklaması</label>
                <input
                  type="text"
                  value={formData.seo_description}
                  onChange={e => setFormData({ ...formData, seo_description: e.target.value })}
                  className="w-full px-3.5 py-2 bg-white border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>
            </div>
          </div>

          {/* Body Content */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-2">
              Makale İçeriği *
            </label>
            <TiptapEditor
              value={formData.body}
              onChange={html => setFormData(prev => ({ ...prev, body: html }))}
              placeholder="Makale içeriğinizi buraya yazın..."
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
        <div className="w-72 shrink-0 sticky top-6">
          <SeoScorePanel data={formData} />
        </div>
      </div>
    </div>
  )
}
