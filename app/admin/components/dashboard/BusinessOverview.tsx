'use client'

import { Users, FileText, CheckCircle, TrendingUp, TrendingDown, Package, AlertTriangle } from 'lucide-react'
import type { DashboardData } from '@/features/dashboard/types'

interface Props {
  data: DashboardData
}

export default function BusinessOverview({ data }: Props) {
  const formatChange = (percent: number) => {
    if (percent === 0) return { label: 'Değişim yok', color: 'text-gray-500', icon: null }
    if (percent > 0) return { label: `+${percent.toFixed(1)}%`, color: 'text-green-600 bg-green-50', icon: <TrendingUp className="size-3 mr-1" /> }
    return { label: `${percent.toFixed(1)}%`, color: 'text-red-600 bg-red-50', icon: <TrendingDown className="size-3 mr-1" /> }
  }

  const kpis = [
    {
      title: 'Toplam Müşteri',
      value: data.customers.total,
      change: data.customers.changePercent,
      icon: <Users className="size-5 text-blue-600" />,
      bg: 'bg-blue-50/50'
    },
    {
      title: 'Gelen Teklifler',
      value: data.quotes.total,
      change: data.quotes.changePercent,
      icon: <FileText className="size-5 text-indigo-600" />,
      bg: 'bg-indigo-50/50'
    },
    {
      title: 'Onaylanan Teklif',
      value: data.quotes.accepted,
      change: 0,
      icon: <CheckCircle className="size-5 text-emerald-600" />,
      bg: 'bg-emerald-50/50'
    },
    {
      title: 'Kritik Stok Uyarısı',
      value: data.products.lowStock,
      change: 0,
      icon: <AlertTriangle className="size-5 text-rose-600" />,
      bg: 'bg-rose-50/50'
    }
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {kpis.map((kpi, i) => {
        const change = formatChange(kpi.change)
        return (
          <div key={i} className="bg-white border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start">
              <div className={`p-3 rounded-xl ${kpi.bg}`}>
                {kpi.icon}
              </div>
              {kpi.change !== 0 && (
                <span className={`flex items-center text-xs font-medium px-2.5 py-1 rounded-full ${change.color}`}>
                  {change.icon}
                  {change.label}
                </span>
              )}
            </div>
            <div className="mt-4">
              <h3 className="text-3xl font-light text-gray-900 tracking-tight">{kpi.value}</h3>
              <p className="text-sm font-medium text-gray-500 mt-1">{kpi.title}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
