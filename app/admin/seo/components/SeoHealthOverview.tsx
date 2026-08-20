'use client'

import type { SeoAuditReport } from '@/features/seo/types'
import { Activity, Search, ShieldAlert, Link as LinkIcon, FileX, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

interface Props {
  report: SeoAuditReport
}

export default function SeoHealthOverview({ report }: Props) {
  const getHealthColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50'
    if (score >= 70) return 'text-amber-600 bg-amber-50'
    return 'text-rose-600 bg-rose-50'
  }

  const getHealthColorText = (score: number) => {
    if (score >= 90) return 'text-emerald-600'
    if (score >= 70) return 'text-amber-600'
    return 'text-rose-600'
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Health Score */}
      <div className="lg:col-span-1 bg-white border rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
        <div className={`absolute -right-10 -top-10 size-40 rounded-full blur-3xl opacity-20 ${getHealthColor(report.healthScore).split(' ')[1]}`} />
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">SEO Health Score</h2>
        <div className="relative">
          <svg className="size-40 transform -rotate-90">
            <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-100" />
            <circle 
              cx="80" 
              cy="80" 
              r="70" 
              stroke="currentColor" 
              strokeWidth="8" 
              fill="transparent" 
              strokeDasharray={440} 
              strokeDashoffset={440 - (440 * report.healthScore) / 100}
              className={`${getHealthColorText(report.healthScore)} transition-all duration-1000 ease-out`} 
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-4xl font-light tracking-tighter ${getHealthColorText(report.healthScore)}`}>{report.healthScore}</span>
            <span className="text-xs font-medium text-gray-400">/ 100</span>
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-6 font-medium">
          {report.healthScore >= 90 ? 'Mükemmel! SEO altyapınız çok sağlam.' : 
           report.healthScore >= 70 ? 'İyi durumda, ancak bazı uyarılar var.' : 
           'Kritik SEO hatalarını çözmeniz gerekiyor.'}
        </p>
      </div>

      {/* Overview Stats */}
      <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'İndekslenebilir (Sitemap)', value: report.indexedUrls, icon: Search, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Noindex (Gizli)', value: report.noindexUrls, icon: ShieldAlert, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Öksüz (Kategorisiz)', value: report.orphanUrls, icon: LinkIcon, color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Eksik Canonical', value: report.missingCanonical, icon: FileX, color: 'text-indigo-600', bg: 'bg-indigo-50' }
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white border rounded-3xl p-5 shadow-sm flex flex-col items-start justify-between">
              <div className={`p-2.5 rounded-xl ${stat.bg} ${stat.color} mb-4`}>
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-3xl font-light text-gray-900 leading-none">{stat.value}</p>
                <p className="text-xs font-medium text-gray-500 mt-2">{stat.label}</p>
              </div>
            </div>
          )
        })}

        {/* Global Settings Link */}
        <Link href="/admin/seo/settings" className="sm:col-span-2 bg-gradient-to-br from-gray-900 to-gray-800 border rounded-3xl p-6 shadow-md flex items-center justify-between group hover:shadow-lg transition-all">
          <div>
            <h3 className="text-white font-medium text-lg flex items-center gap-2">
              <ShieldCheck className="size-5 text-emerald-400" /> SEO Settings & Robots
            </h3>
            <p className="text-gray-400 text-sm mt-1 font-medium">Global şablonları ve Robots.txt ayarlarını yapılandırın.</p>
          </div>
          <div className="size-10 bg-white/10 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-gray-900 transition-colors">
            →
          </div>
        </Link>
        <Link href="/admin/seo/technical" className="sm:col-span-2 bg-white border border-dashed border-gray-300 rounded-3xl p-6 flex items-center justify-between group hover:border-blue-300 hover:bg-blue-50/50 transition-all">
          <div>
            <h3 className="text-gray-900 font-medium text-lg flex items-center gap-2">
              <LinkIcon className="size-5 text-blue-500" /> Redirect Manager
            </h3>
            <p className="text-gray-500 text-sm mt-1 font-medium">301 yönlendirmeleri ve 404 Kırık link takibi.</p>
          </div>
          <div className="size-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-500 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
            →
          </div>
        </Link>
      </div>
    </div>
  )
}
