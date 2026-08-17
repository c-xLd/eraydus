'use client'

import { Clock, User } from 'lucide-react'
import type { DashboardData } from '@/features/dashboard/types'
import Link from 'next/link'

interface Props {
  activities: DashboardData['activities']
}

export default function RecentActivityWidget({ activities }: Props) {
  if (activities.length === 0) {
    return (
      <div className="bg-white p-6 rounded-3xl border shadow-sm h-full flex flex-col">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Son Aktiviteler</h2>
        <div className="flex-1 flex items-center justify-center text-sm text-gray-500">
          Kayıtlı aktivite bulunamadı.
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded-3xl border shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-medium text-gray-900">Son Aktiviteler</h2>
      </div>
      <div className="space-y-4 relative before:absolute before:inset-0 before:ml-2 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
        {activities.map((log: any, i: number) => (
          <div key={log.id || i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
            <div className="flex items-center justify-center size-4 rounded-full border-2 border-white bg-blue-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm" />
            
            <div className="w-[calc(100%-2rem)] md:w-[calc(50%-1.5rem)] p-3 rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-semibold text-blue-600 uppercase">{log.action || 'Sistem'}</span>
                <span className="text-[10px] text-gray-400 flex items-center gap-1">
                  <Clock className="size-3" />
                  {new Date(log.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute:'2-digit' })}
                </span>
              </div>
              <p className="text-sm text-gray-700 leading-snug">
                {log.details?.title ? `${log.details.title} güncellendi.` : `Sistem kaydı oluşturuldu.`}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
