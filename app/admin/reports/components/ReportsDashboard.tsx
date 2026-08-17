"use client"

import { useState, useEffect } from 'react'
import { getAnalyticsReport } from '../actions'
import { Users, Clock, Globe, ArrowUpRight, ArrowDownRight, Smartphone, Monitor, MousePointerClick } from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type DateRange = 'today' | 'yesterday' | '7d' | '30d'

export default function ReportsDashboard() {
  const [dateRange, setDateRange] = useState<DateRange>('7d')
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState<any>(null)

  useEffect(() => {
    async function loadData() {
      setLoading(true)
      const res = await getAnalyticsReport(dateRange)
      if (res.success) {
        setData(res.data)
      }
      setLoading(false)
    }
    loadData()
  }, [dateRange])

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-1/4"></div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <div key={i} className="h-32 bg-gray-100 rounded-2xl"></div>)}
        </div>
        <div className="h-[400px] bg-gray-100 rounded-2xl"></div>
      </div>
    )
  }

  // If literally zero events
  if (!data || data.totalViews === 0) {
    return (
      <div className="space-y-6">
        <Header setDateRange={setDateRange} dateRange={dateRange} />
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center">
          <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Globe className="size-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Bu tarih aralığında veri bulunamadı.</h3>
          <p className="text-gray-500 mt-2 max-w-sm text-sm">Seçilen zaman diliminde sitemize kaydedilmiş herhangi bir analitik verisi (ziyaretçi, görüntüleme) bulunmuyor.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <Header setDateRange={setDateRange} dateRange={dateRange} />

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard title="Toplam Görüntüleme" value={data.totalViews.toLocaleString()} icon={Globe} />
        <KpiCard title="Benzersiz Oturum" value={data.uniqueSessions.toLocaleString()} icon={Users} />
        <KpiCard title="WhatsApp Tıklama" value={data.whatsappClicks.toLocaleString()} icon={MousePointerClick} />
        <KpiCard title="Ürün Görüntüleme" value={data.productViews.toLocaleString()} icon={Monitor} />
      </div>

      {/* Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-900 mb-6">Ziyaretçi Trendi</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data.chartData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} axisLine={false} tickLine={false} />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              <Area type="monotone" dataKey="views" name="Görüntüleme" stroke="#000000" strokeWidth={2} fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages & Devices */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">En Çok Ziyaret Edilen Sayfalar</h3>
          <div className="space-y-2">
            {data.topPages.map((page: any, i: number) => (
              <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-700 truncate">{page.url}</span>
                <span className="text-sm font-medium text-gray-900">{page.count}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Cihazlar</h3>
          <div className="space-y-4">
            <DeviceRow type="Masaüstü" count={data.deviceCounts.desktop} total={data.uniqueSessions} icon={Monitor} />
            <DeviceRow type="Mobil" count={data.deviceCounts.mobile} total={data.uniqueSessions} icon={Smartphone} />
          </div>
        </div>
      </div>
    </div>
  )
}

function Header({ dateRange, setDateRange }: { dateRange: string, setDateRange: (val: any) => void }) {
  return (
    <div className="flex justify-between items-end">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Detaylı Raporlar</h1>
        <p className="text-sm text-gray-500 mt-1">Geçmiş verilere dayalı analiz ve trendler.</p>
      </div>
      <select
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
        className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-sm"
      >
        <option value="today">Bugün</option>
        <option value="yesterday">Dün</option>
        <option value="7d">Son 7 Gün</option>
        <option value="30d">Son 30 Gün</option>
      </select>
    </div>
  )
}

function KpiCard({ title, value, icon: Icon }: { title: string, value: string, icon: any }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-sm text-gray-500 font-medium">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="size-5 text-gray-400" />
        </div>
      </div>
    </div>
  )
}

function DeviceRow({ type, count, total, icon: Icon }: { type: string, count: number, total: number, icon: any }) {
  const percent = total === 0 ? 0 : Math.round((count / total) * 100)
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-2">
          <Icon className="size-4 text-gray-400" />
          <p className="text-sm font-medium text-gray-900">{type}</p>
        </div>
        <p className="text-sm font-semibold text-gray-900">{percent}%</p>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className="bg-black rounded-full h-1.5" style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
