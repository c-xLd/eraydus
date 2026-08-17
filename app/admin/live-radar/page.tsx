import { Metadata } from 'next'
import { LiveRadarClient } from './LiveRadarClient'

export const metadata: Metadata = {
  title: 'Canlı Radar | Erayduş Admin',
  description: 'Şu an sitede aktif olan ziyaretçiler',
}

export default function LiveRadarPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold tracking-tight">Canlı Ziyaretçi Radarı</h1>
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-muted-foreground text-sm">
          Şu an sitenizde aktif olarak gezinen kullanıcıların anlık durumu.
        </p>
      </div>

      <LiveRadarClient />
    </div>
  )
}
