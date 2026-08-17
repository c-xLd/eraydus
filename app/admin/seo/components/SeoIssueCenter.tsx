'use client'

import type { SeoIssue } from '@/features/seo/types'
import { AlertCircle, AlertTriangle, Info, CheckCircle2, Settings } from 'lucide-react'
import Link from 'next/link'

interface Props {
  issues: SeoIssue[]
  onFixProduct?: (productId: string) => void
}

export default function SeoIssueCenter({ issues, onFixProduct }: Props) {
  const getSeverityStyles = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return 'bg-rose-50 border-rose-200 text-rose-700'
      case 'HIGH': return 'bg-orange-50 border-orange-200 text-orange-700'
      case 'MEDIUM': return 'bg-amber-50 border-amber-200 text-amber-700'
      default: return 'bg-blue-50 border-blue-200 text-blue-700'
    }
  }

  const getSeverityIcon = (severity: string) => {
    switch(severity) {
      case 'CRITICAL': return <AlertCircle className="size-5" />
      case 'HIGH': return <AlertTriangle className="size-5" />
      case 'MEDIUM': return <AlertTriangle className="size-5" />
      default: return <Info className="size-5" />
    }
  }

  if (issues.length === 0) {
    return (
      <div className="bg-white border rounded-3xl p-8 shadow-sm flex flex-col items-center justify-center text-center">
        <div className="size-16 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-4">
          <CheckCircle2 className="size-8" />
        </div>
        <h3 className="text-xl font-medium text-gray-900 mb-2">Harika! Sorun Yok.</h3>
        <p className="text-gray-500">Sitenizde tespit edilen herhangi bir SEO hatası veya uyarısı bulunmamaktadır.</p>
      </div>
    )
  }

  return (
    <div className="bg-white border rounded-3xl shadow-sm overflow-hidden flex flex-col h-full">
      <div className="px-6 py-5 border-b flex items-center justify-between bg-gray-50/50">
        <h2 className="text-lg font-medium text-gray-900 flex items-center gap-2">
          <AlertCircle className="size-5 text-gray-500" />
          SEO Issue Center
        </h2>
        <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2.5 py-1 rounded-full">
          {issues.length} Hata
        </span>
      </div>
      
      <div className="divide-y max-h-[500px] overflow-y-auto">
        {issues.map(issue => (
          <div key={issue.id} className="p-5 hover:bg-gray-50 transition-colors flex items-start gap-4">
            <div className={`p-2 rounded-xl border ${getSeverityStyles(issue.severity)} shrink-0 mt-0.5`}>
              {getSeverityIcon(issue.severity)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                  issue.severity === 'CRITICAL' ? 'bg-rose-100 text-rose-800' :
                  issue.severity === 'HIGH' ? 'bg-orange-100 text-orange-800' :
                  issue.severity === 'MEDIUM' ? 'bg-amber-100 text-amber-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {issue.severity}
                </span>
                <span className="text-xs font-medium text-gray-500">{issue.entity_type}</span>
              </div>
              <h4 className="text-sm font-semibold text-gray-900">{issue.entity_name}</h4>
              <p className="text-sm text-gray-600 mt-1">{issue.message}</p>
            </div>
            
            {issue.entity_type === 'global' ? (
              <Link href="/admin/seo/settings" className="shrink-0">
                <button className="text-xs font-semibold px-3 py-1.5 rounded-lg border bg-white hover:bg-gray-50 transition-colors flex items-center gap-1.5 text-gray-700 shadow-sm">
                  <Settings className="size-3" /> Ayarlara Git
                </button>
              </Link>
            ) : (
              <button 
                onClick={() => onFixProduct?.(issue.entity_id!)}
                className="shrink-0 text-xs font-semibold px-3 py-1.5 rounded-lg border bg-blue-50 border-blue-100 hover:bg-blue-100 transition-colors flex items-center gap-1.5 text-blue-700 shadow-sm"
              >
                Çöz (Fix)
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
