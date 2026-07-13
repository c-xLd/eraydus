"use client"

import { useState } from 'react'
import { TrendingUp, Globe, Users, Zap, Clock } from 'lucide-react'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const pageViewsData = [
  { date: 'Pzt', views: 2400, unique: 1200, bounce: 24 },
  { date: 'Sal', views: 1398, unique: 1221, bounce: 22 },
  { date: 'Çar', views: 3200, unique: 2290, bounce: 20 },
  { date: 'Per', views: 2780, unique: 2000, bounce: 18 },
  { date: 'Cum', views: 1890, unique: 1500, bounce: 25 },
  { date: 'Cmt', views: 2390, unique: 2100, bounce: 19 },
  { date: 'Paz', views: 3490, unique: 2210, bounce: 21 },
]

const topPages = [
  { slug: '/', title: 'Ana Sayfa', views: 12450, unique: 9800, avgTime: '2:34', convRate: '18.5%' },
  { slug: '/magaza', title: 'Mağaza', views: 8920, unique: 7200, avgTime: '1:45', convRate: '12.3%' },
  { slug: '/koleksiyonlar/edge', title: 'Edge Koleksiyonu', views: 6750, unique: 5400, avgTime: '3:12', convRate: '22.1%' },
  { slug: '/tasarla', title: 'Konfigüratör', views: 5430, unique: 4200, avgTime: '4:52', convRate: '28.7%' },
  { slug: '/hakkimizda', title: 'Hakkımızda', views: 3210, unique: 2800, avgTime: '1:23', convRate: '5.2%' },
]

const trafficSources = [
  { source: 'Doğrudan', visitors: 5200, percentage: 35 },
  { source: 'Google', visitors: 4100, percentage: 28 },
  { source: 'Sosyal Medya', visitors: 2800, percentage: 19 },
  { source: 'Referral', visitors: 1900, percentage: 13 },
  { source: 'Diğer', visitors: 500, percentage: 5 },
]

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('week')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gerçek Zamanlı Analitikler</h1>
          <p className="text-sm text-gray-500 mt-1">Web sitenizin ziyaretçi ve performans verilerini izleyin.</p>
        </div>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
        >
          <option value="day">Bugün</option>
          <option value="week">Bu Hafta</option>
          <option value="month">Bu Ay</option>
          <option value="year">Bu Yıl</option>
        </select>
      </div>

      {/* KPI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {[
          { title: 'Toplam Ziyaret', value: '48.5K', trend: '+12.5%', icon: Globe, color: 'text-blue-600' },
          { title: 'Benzersiz Ziyaretçi', value: '32.2K', trend: '+8.2%', icon: Users, color: 'text-purple-600' },
          { title: 'Ort. Oturum Süresi', value: '2:34', trend: '+18%', icon: Clock, color: 'text-green-600' },
          { title: 'Dönüş Oranı', value: '42.3%', trend: '-2.1%', icon: TrendingUp, color: 'text-orange-600' },
          { title: 'Hız Skoru', value: '87/100', trend: '+5', icon: Zap, color: 'text-yellow-600' },
        ].map((metric, i) => (
          <div key={i} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="flex items-start justify-between mb-2">
              <div className={`p-2 rounded-lg ${metric.color.replace('text-', 'bg-').replace('-600', '-100')}`}>
                <metric.icon className={`size-4 ${metric.color}`} />
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">{metric.trend}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
            <p className="text-xs text-gray-500 mt-1">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Main Chart */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Haftalık Ziyaret Trendi</h3>
        <div className="h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={pageViewsData}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#000000" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip />
              <Area type="monotone" dataKey="views" stroke="#000000" fillOpacity={1} fill="url(#colorViews)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Top Pages & Traffic Sources */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Pages */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">En Çok Ziyaret Edilen Sayfalar</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-left py-2 font-semibold text-gray-900">Sayfa</th>
                  <th className="text-right py-2 font-semibold text-gray-900">Ziyaret</th>
                  <th className="text-right py-2 font-semibold text-gray-900">Benzersiz</th>
                  <th className="text-right py-2 font-semibold text-gray-900">Ort. Süre</th>
                  <th className="text-right py-2 font-semibold text-gray-900">Dönüş %</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page, i) => (
                  <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3">
                      <p className="font-medium text-gray-900">{page.title}</p>
                      <p className="text-xs text-gray-500">{page.slug}</p>
                    </td>
                    <td className="text-right text-gray-900">{page.views.toLocaleString()}</td>
                    <td className="text-right text-gray-600">{page.unique.toLocaleString()}</td>
                    <td className="text-right text-gray-600">{page.avgTime}</td>
                    <td className="text-right font-medium text-gray-900">{page.convRate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Trafik Kaynakları</h3>
          <div className="space-y-4">
            {trafficSources.map((source, i) => (
              <div key={i}>
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm font-medium text-gray-900">{source.source}</p>
                  <p className="text-sm font-semibold text-gray-900">{source.percentage}%</p>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="bg-black rounded-full h-2 transition-all"
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1">{source.visitors.toLocaleString()} ziyaretçi</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hourly Activity */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Saatlik Aktivite</h3>
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pageViewsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
              <Tooltip />
              <Bar dataKey="bounce" fill="#000000" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
