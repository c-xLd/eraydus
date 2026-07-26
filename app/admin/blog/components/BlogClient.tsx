import Image from 'next/image'
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  FileText, Search, Tag as TagIcon, Calendar, Eye,
  Plus, Edit3, Trash2, CheckCircle2, Clock, Filter,
  ExternalLink, Loader2, AlertTriangle, ArrowUpDown
} from 'lucide-react'
import { toast } from 'sonner'
import { deleteBlogPost } from '../actions'

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

export default function BlogClient({ initialPosts }: { initialPosts: BlogPost[] }) {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState<string>('Tümü')
  const [selectedStatus, setSelectedStatus] = useState<string>('Tümü')
  const [deletePost, setDeletePost] = useState<BlogPost | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const allTags = ['Tümü', ...Array.from(new Set(initialPosts.flatMap(p => p.tags || [])))]

  const publishedCount = initialPosts.filter(p => p.status === 'published').length
  const draftCount = initialPosts.filter(p => p.status === 'draft').length

  const filtered = initialPosts.filter(post => {
    const matchesTag = selectedTag === 'Tümü' || (post.tags && post.tags.includes(selectedTag))
    const matchesStatus = selectedStatus === 'Tümü' || post.status === selectedStatus
    const searchTarget = `${post.title} ${post.description || ''} ${post.slug || ''}`.toLowerCase()
    const matchesQuery = searchTarget.includes(query.toLowerCase())
    return matchesTag && matchesStatus && matchesQuery
  })

  const formatDate = (d: string | null) =>
    d ? new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d)) : 'Tarih Yok'

  const handleDelete = async () => {
    if (!deletePost) return
    setIsDeleting(true)
    try {
      const res = await deleteBlogPost(deletePost.id)
      if (!res.success) throw new Error(res.error)
      toast.success('Blog yazısı başarıyla silindi')
      setDeletePost(null)
      router.refresh()
    } catch (err: any) {
      toast.error(err.message || 'Silme işlemi başarısız')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
            <FileText className="size-6 text-amber-600" /> Blog Yönetimi
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Yazıları tablo görünümünde inceleyin, yeni makale ekleyin veya var olanları düzenleyin.
          </p>
        </div>
        <div className="flex gap-3">
          <Link
            href="/blog"
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-xl hover:bg-gray-200 transition-colors"
          >
            <Eye className="size-4" /> Vitrin Görünümü
          </Link>
          <Link
            href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-black text-white text-sm font-medium rounded-xl hover:bg-gray-800 transition-colors shadow-sm"
          >
            <Plus className="size-4" /> Yeni Yazı Ekle
          </Link>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Toplam Makale</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{initialPosts.length}</p>
          </div>
          <div className="size-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700 font-bold">
            {initialPosts.length}
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Yayındaki Yazılar</p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">{publishedCount}</p>
          </div>
          <div className="size-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <CheckCircle2 className="size-5" />
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Taslaklar</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{draftCount}</p>
          </div>
          <div className="size-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
            <Clock className="size-5" />
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-col sm:flex-row justify-between gap-4 bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Yazı başlığı veya slug ara..."
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition-all"
          />
        </div>

        {/* Status & Tag Selectors */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Durum:</span>
            <select
              value={selectedStatus}
              onChange={e => setSelectedStatus(e.target.value)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-medium"
            >
              <option value="Tümü">Tümü</option>
              <option value="published">Yayında</option>
              <option value="draft">Taslak</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500">Etiket:</span>
            <select
              value={selectedTag}
              onChange={e => setSelectedTag(e.target.value)}
              className="px-3 py-2 text-xs bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black font-medium max-w-[160px]"
            >
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* DATA TABLE */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[11px] font-semibold uppercase tracking-wider text-gray-500">
                <th className="py-4 px-6 w-16">Görsel</th>
                <th className="py-4 px-6">Yazı Başlığı & Slug</th>
                <th className="py-4 px-6 w-32">Durum</th>
                <th className="py-4 px-6">Etiketler</th>
                <th className="py-4 px-6 w-36">Yayın Tarihi</th>
                <th className="py-4 px-6 text-right w-36">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {filtered.map(post => (
                <tr key={post.id} className="hover:bg-gray-50/80 transition-colors group">
                  {/* Thumbnail */}
                  <td className="py-3 px-6">
                    <div className="size-12 rounded-xl bg-gray-100 overflow-hidden relative border border-gray-200">
                      {post.featured_image ? (
                        <img
                          src={post.featured_image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 text-[10px]">
                          Yok
                        </div>
                      )}
                    </div>
                  </td>

                  {/* Title & Slug */}
                  <td className="py-3 px-6">
                    <div className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors line-clamp-1">
                      {post.title}
                    </div>
                    {post.slug && (
                      <div className="text-xs text-gray-400 font-mono mt-0.5 line-clamp-1">
                        /blog/{post.slug}
                      </div>
                    )}
                  </td>

                  {/* Status Badge */}
                  <td className="py-3 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full ${
                      post.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-amber-50 text-amber-700 border border-amber-200'
                    }`}>
                      {post.status === 'published' ? <CheckCircle2 className="size-3.5" /> : <Clock className="size-3.5" />}
                      {post.status === 'published' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>

                  {/* Tags */}
                  <td className="py-3 px-6">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {post.tags?.slice(0, 3).map(t => (
                        <span key={t} className="px-2 py-0.5 text-[10px] font-medium bg-gray-100 text-gray-600 rounded-md border border-gray-200">
                          {t}
                        </span>
                      ))}
                      {(post.tags?.length || 0) > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] font-medium text-gray-400">
                          +{(post.tags?.length || 0) - 3}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Date */}
                  <td className="py-3 px-6 text-xs text-gray-500 whitespace-nowrap">
                    {formatDate(post.published_at)}
                  </td>

                  {/* Actions */}
                  <td className="py-3 px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      {post.slug && (
                        <Link
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-gray-900 rounded-lg hover:bg-gray-100 transition-colors"
                          title="Görüntüle"
                        >
                          <ExternalLink className="size-4" />
                        </Link>
                      )}
                      <Link
                        href={`/admin/blog/${post.id}`}
                        className="p-2 text-gray-400 hover:text-amber-600 rounded-lg hover:bg-amber-50 transition-colors"
                        title="Düzenle"
                      >
                        <Edit3 className="size-4" />
                      </Link>
                      <button
                        onClick={() => setDeletePost(post)}
                        className="p-2 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        title="Sil"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <FileText className="size-10 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">Aramanızla eşleşen blog yazısı bulunamadı.</p>
          </div>
        )}
      </div>

      {/* DELETE CONFIRMATION DIALOG */}
      {deletePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-600">
              <div className="p-2.5 bg-red-50 rounded-xl">
                <AlertTriangle className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-gray-900">Yazıyı Sil</h3>
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-semibold text-gray-900">"{deletePost.title}"</span> başlıklı makaleyi silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
            </p>
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                onClick={() => setDeletePost(null)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-xl font-medium text-sm"
              >
                Vazgeç
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-5 py-2 bg-red-600 text-white rounded-xl font-medium text-sm hover:bg-red-700 flex items-center gap-2 disabled:opacity-50"
              >
                {isDeleting && <Loader2 className="size-4 animate-spin" />}
                Evet, Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
