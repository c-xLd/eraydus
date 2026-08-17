'use client'

import type { DashboardData } from '@/features/dashboard/types'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts'
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'

interface Props {
  quotes: DashboardData['quotes']
}

export default function QuoteFunnel({ quotes }: Props) {
  const data = [
    { name: 'Bekleyen', value: quotes.pending, color: '#f59e0b' },
    { name: 'Onaylanan', value: quotes.accepted, color: '#10b981' },
    { name: 'Reddedilen', value: quotes.rejected, color: '#ef4444' }
  ].filter(d => d.value > 0)

  // Fallback if no quotes
  if (quotes.total === 0) {
    data.push({ name: 'Teklif Yok', value: 1, color: '#e5e7eb' })
  }

  return (
    <div className="bg-white p-6 rounded-3xl border shadow-sm flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-900">Teklif Durumları</h2>
        <Link href="/admin/quotes" className="text-xs font-medium text-blue-600 hover:underline">
          Tümünü Gör
        </Link>
      </div>
      
      <div className="flex-1 flex flex-col md:flex-row items-center gap-6">
        <div className="size-32 relative shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={60}
                paddingAngle={2}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <RechartsTooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '13px', fontWeight: 500 }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-2xl font-light leading-none">{quotes.total}</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-3 w-full">
          <div className="p-3 bg-amber-50 rounded-xl">
            <div className="flex items-center gap-1.5 text-amber-600 mb-1">
              <Clock className="size-3" />
              <span className="text-xs font-semibold">Bekleyen</span>
            </div>
            <span className="text-xl font-light text-amber-900">{quotes.pending}</span>
          </div>
          <div className="p-3 bg-emerald-50 rounded-xl">
            <div className="flex items-center gap-1.5 text-emerald-600 mb-1">
              <CheckCircle className="size-3" />
              <span className="text-xs font-semibold">Onaylanan</span>
            </div>
            <span className="text-xl font-light text-emerald-900">{quotes.accepted}</span>
          </div>
          <div className="p-3 bg-rose-50 rounded-xl">
            <div className="flex items-center gap-1.5 text-rose-600 mb-1">
              <XCircle className="size-3" />
              <span className="text-xs font-semibold">Reddedilen</span>
            </div>
            <span className="text-xl font-light text-rose-900">{quotes.rejected}</span>
          </div>
          <div className="p-3 bg-indigo-50 rounded-xl">
            <div className="flex items-center gap-1.5 text-indigo-600 mb-1">
              <FileText className="size-3" />
              <span className="text-xs font-semibold">Toplam</span>
            </div>
            <span className="text-xl font-light text-indigo-900">{quotes.total}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
