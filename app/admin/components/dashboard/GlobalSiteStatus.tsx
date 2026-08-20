import { CheckCircle2, AlertTriangle, XCircle, HelpCircle } from 'lucide-react'
import type { SystemHealth, SystemStatus } from '@/features/dashboard/types'

function StatusIcon({ status }: { status: SystemStatus }) {
  switch (status) {
    case 'healthy':
      return <CheckCircle2 className="h-4 w-4 text-emerald-500" />
    case 'warning':
      return <AlertTriangle className="h-4 w-4 text-amber-500" />
    case 'error':
      return <XCircle className="h-4 w-4 text-rose-500" />
    default:
      return <HelpCircle className="h-4 w-4 text-neutral-400" />
  }
}

export default function GlobalSiteStatus({ health }: { health: SystemHealth }) {
  const isCritical = Object.values(health).some(s => s === 'error')
  const isWarning = Object.values(health).some(s => s === 'warning')

  const globalStatus = isCritical ? 'Kritik Durum' : isWarning ? 'Uyarılar Var' : 'Tüm Sistemler Aktif'
  const globalColor = isCritical ? 'text-rose-600' : isWarning ? 'text-amber-600' : 'text-emerald-600'
  const dotColor = isCritical ? 'bg-rose-500 animate-pulse' : isWarning ? 'bg-amber-500' : 'bg-emerald-500'

  const checks = [
    { label: 'Web Sitesi', status: health.website },
    { label: 'Veritabanı', status: health.database },
    { label: 'Oturum & Auth', status: health.authentication },
    { label: 'Dosya & Depolama', status: health.storage },
    { label: 'Analitik Servisi', status: health.analytics },
    { label: 'SEO Altyapısı', status: health.seo },
  ]

  const statusMap: Record<SystemStatus, string> = {
    healthy: 'Sağlıklı',
    warning: 'Uyarı',
    error: 'Hata',
    not_configured: 'Yapılandırılmadı'
  }

  return (
    <div className="bg-white rounded-2xl border border-black/5 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-black/5 bg-neutral-50/50 flex justify-between items-center">
        <h2 className="text-[12px] font-bold tracking-[0.15em] text-neutral-500">SİSTEM DURUMU</h2>
        <div className="flex items-center gap-2.5 bg-white px-3 py-1.5 rounded-full border border-black/5 shadow-sm">
          <div className={`h-2 w-2 rounded-full ${dotColor}`} />
          <span className={`text-xs font-semibold ${globalColor}`}>{globalStatus}</span>
        </div>
      </div>
      <div className="p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {checks.map((check) => (
          <div key={check.label} className="flex flex-col items-start p-4 rounded-xl border border-black/5 bg-neutral-50/50 gap-3 hover:bg-white transition-colors">
            <div className="flex items-center gap-2">
              <StatusIcon status={check.status} />
              <span className="text-[13px] font-semibold text-[#050505]">{check.label}</span>
            </div>
            <span className="text-[11px] font-medium text-neutral-500 uppercase tracking-wider">{statusMap[check.status]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
