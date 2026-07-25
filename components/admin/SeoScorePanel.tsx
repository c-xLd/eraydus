'use client'

import { useMemo } from 'react'
import { CheckCircle2, XCircle, AlertCircle, TrendingUp } from 'lucide-react'

interface SeoData {
  title: string
  slug: string
  description: string
  body: string
  seo_title: string
  seo_description: string
  featured_image: string
}

interface Check {
  label: string
  status: 'good' | 'warn' | 'bad'
  detail: string
  points: number
  maxPoints: number
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function wordCount(text: string) {
  return text.trim() ? text.trim().split(/\s+/).length : 0
}

function slugIsClean(slug: string) {
  return /^[a-z0-9-]+$/.test(slug)
}

export default function SeoScorePanel({ data }: { data: SeoData }) {
  const checks = useMemo<Check[]>(() => {
    const titleLen = (data.seo_title || data.title).length
    const descLen = (data.seo_description || data.description).length
    const bodyText = stripHtml(data.body)
    const words = wordCount(bodyText)
    const slug = data.slug

    return [
      // SEO Title
      (() => {
        if (titleLen === 0) return { label: 'SEO Başlığı', status: 'bad', detail: 'Başlık girilmemiş', points: 0, maxPoints: 20 }
        if (titleLen < 30) return { label: 'SEO Başlığı', status: 'warn', detail: `${titleLen} karakter — 50-60 arası ideal`, points: 10, maxPoints: 20 }
        if (titleLen > 70) return { label: 'SEO Başlığı', status: 'warn', detail: `${titleLen} karakter — 60'tan kısa olmalı`, points: 10, maxPoints: 20 }
        return { label: 'SEO Başlığı', status: 'good', detail: `${titleLen} karakter ✓`, points: 20, maxPoints: 20 }
      })() as Check,

      // Meta Description
      (() => {
        if (descLen === 0) return { label: 'Meta Description', status: 'bad', detail: 'Açıklama girilmemiş', points: 0, maxPoints: 20 }
        if (descLen < 80) return { label: 'Meta Description', status: 'warn', detail: `${descLen} karakter — 120-160 arası ideal`, points: 10, maxPoints: 20 }
        if (descLen > 170) return { label: 'Meta Description', status: 'warn', detail: `${descLen} karakter — 160'tan kısa olmalı`, points: 10, maxPoints: 20 }
        return { label: 'Meta Description', status: 'good', detail: `${descLen} karakter ✓`, points: 20, maxPoints: 20 }
      })() as Check,

      // İçerik uzunluğu
      (() => {
        if (words === 0) return { label: 'İçerik Uzunluğu', status: 'bad', detail: 'İçerik yok', points: 0, maxPoints: 25 }
        if (words < 300) return { label: 'İçerik Uzunluğu', status: 'bad', detail: `${words} kelime — minimum 300 gerekli`, points: 5, maxPoints: 25 }
        if (words < 600) return { label: 'İçerik Uzunluğu', status: 'warn', detail: `${words} kelime — 600+ daha iyi`, points: 15, maxPoints: 25 }
        return { label: 'İçerik Uzunluğu', status: 'good', detail: `${words} kelime ✓`, points: 25, maxPoints: 25 }
      })() as Check,

      // Kapak görseli
      (() => {
        if (!data.featured_image) return { label: 'Kapak Görseli', status: 'bad', detail: 'Görsel yok — sosyal paylaşım etkilenir', points: 0, maxPoints: 15 }
        return { label: 'Kapak Görseli', status: 'good', detail: 'Görsel mevcut ✓', points: 15, maxPoints: 15 }
      })() as Check,

      // Slug kalitesi
      (() => {
        if (!slug) return { label: 'URL Slug', status: 'bad', detail: 'Slug girilmemiş', points: 0, maxPoints: 10 }
        if (!slugIsClean(slug)) return { label: 'URL Slug', status: 'warn', detail: 'Türkçe karakter veya boşluk var', points: 5, maxPoints: 10 }
        if (slug.length > 60) return { label: 'URL Slug', status: 'warn', detail: `${slug.length} karakter — 60'tan kısa olmalı`, points: 7, maxPoints: 10 }
        return { label: 'URL Slug', status: 'good', detail: 'Temiz ve kısa ✓', points: 10, maxPoints: 10 }
      })() as Check,

      // H2 başlık kullanımı
      (() => {
        const hasH2 = /<h2/i.test(data.body)
        if (!hasH2) return { label: 'Alt Başlık (H2)', status: 'warn', detail: 'H2 başlık yok — içerik yapısı zayıf', points: 5, maxPoints: 10 }
        return { label: 'Alt Başlık (H2)', status: 'good', detail: 'H2 başlık kullanılmış ✓', points: 10, maxPoints: 10 }
      })() as Check,
    ]
  }, [data])

  const totalPoints = checks.reduce((s, c) => s + c.points, 0)
  const maxPoints = checks.reduce((s, c) => s + c.maxPoints, 0)
  const score = Math.round((totalPoints / maxPoints) * 100)

  const scoreColor =
    score >= 80 ? 'text-emerald-600' :
    score >= 50 ? 'text-amber-500' :
    'text-red-500'

  const ringColor =
    score >= 80 ? 'stroke-emerald-500' :
    score >= 50 ? 'stroke-amber-400' :
    'stroke-red-400'

  const label =
    score >= 80 ? 'İyi' :
    score >= 50 ? 'Orta' :
    'Zayıf'

  const radius = 28
  const circ = 2 * Math.PI * radius
  const dash = (score / 100) * circ

  return (
    <div className="p-4 bg-white rounded-2xl border border-gray-200 shadow-sm space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
          <TrendingUp className="size-4 text-amber-600" /> SEO Skoru
        </h3>

        {/* Score ring */}
        <div className="flex items-center gap-2.5">
          <svg width="64" height="64" viewBox="0 0 64 64" className="-rotate-90">
            <circle cx="32" cy="32" r={radius} fill="none" stroke="#e5e7eb" strokeWidth="6" />
            <circle
              cx="32" cy="32" r={radius}
              fill="none"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${dash} ${circ}`}
              className={`${ringColor} transition-all duration-700`}
            />
          </svg>
          <div className="text-right -ml-1">
            <span className={`text-2xl font-bold ${scoreColor}`}>{score}</span>
            <span className="text-xs text-gray-400 block">{label}</span>
          </div>
        </div>
      </div>

      {/* Checks */}
      <div className="space-y-2">
        {checks.map((c) => (
          <div key={c.label} className="flex items-start gap-2.5">
            {c.status === 'good'
              ? <CheckCircle2 className="size-4 text-emerald-500 mt-0.5 shrink-0" />
              : c.status === 'warn'
              ? <AlertCircle className="size-4 text-amber-400 mt-0.5 shrink-0" />
              : <XCircle className="size-4 text-red-400 mt-0.5 shrink-0" />
            }
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700">{c.label}</p>
              <p className="text-[11px] text-gray-400 leading-tight">{c.detail}</p>
            </div>
            <span className={`ml-auto text-[11px] font-bold shrink-0 ${
              c.status === 'good' ? 'text-emerald-600' :
              c.status === 'warn' ? 'text-amber-500' : 'text-red-400'
            }`}>
              {c.points}/{c.maxPoints}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${
              score >= 80 ? 'bg-emerald-500' :
              score >= 50 ? 'bg-amber-400' : 'bg-red-400'
            }`}
            style={{ width: `${score}%` }}
          />
        </div>
        <p className="text-[11px] text-gray-400 text-right">{totalPoints}/{maxPoints} puan</p>
      </div>
    </div>
  )
}
