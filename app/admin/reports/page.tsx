"use client"

import { useState } from 'react'
import { Download, Plus, BarChart3, TrendingUp, Users, ShoppingCart } from 'lucide-react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { name: 'Ocak', sales: 4000, quotes: 240, customers: 24 },
  { name: 'Şubat', sales: 3000, quotes: 221, customers: 22 },
  { name: 'Mart', sales: 2000, quotes: 229, customers: 20 },
  { name: 'Nisan', sales: 2780, quotes: 200, customers: 21 },
  { name: 'Mayıs', sales: 1890, quotes: 229, customers: 22 },
  { name: 'Haziran', sales: 2390, quotes: 200, customers: 23 },
  { name: 'Temmuz', sales: 3490, quotes: 210, customers: 25 },
]

const conversionData = [
  { name: 'Web Sitesi', value: 45, fill: '#000000' },
  { name: 'Configurator', value: 30, fill: '#666666' },
  { name: 'WhatsApp', value: 15, fill: '#999999' },
  { name: 'İletişim Formu', value: 10, fill: '#CCCCCC' },
]

const recentReports = [
  { id: 1, name: 'Aylık Satış Raporu', type: 'sales', date: '2024-07-05', status: 'completed' },
  { id: 2, name: 'Teklif Analiz', type: 'quotes', date: '2024-07-04', status: 'completed' },
  { id: 3, name: 'Müşteri Segmentasyonu', type: 'customers', date: '2024-07-03', status: 'completed' },
  { id: 4, name: 'Ürün Performansı', type: 'products', date: '2024-07-02', status: 'completed' },
]

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState('month')

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Raporlar & Analitikler</h1>
          <p className="text-sm text-gray-500 mt-1">Satış, teklif ve müşteri verilerini analiz edin.</p>
        </div>
        <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm flex items-center gap-2">
          <Plus className="size-4" />
          Yeni Rapor
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Gelir', value: '₺245.5K', trend: '+12.5%', icon: ShoppingCart },
          { title: 'Teklif Sayısı', value: '1,203', trend: '+8.2%', icon: TrendingUp },
          { title: 'Dönüşüm Oranı', value: '18.5%', trend: '+3.2%', icon: BarChart3 },
          { title: 'Ort. Teklif Değeri', value: '₺2,041', trend: '+2.1%', icon: Users },
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div>
                <p className="text-sm text-gray-500 font-medium">{kpi.title}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-green-100 text-green-700">{kpi.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Date Range Filter */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 flex-wrap items-center">
        <label className="text-sm font-medium text-gray-700">Zaman Aralığı:</label>
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5"
        >
          <option value="week">Bu Hafta</option>
          <option value="month">Bu Ay</option>
          <option value="quarter">Bu Çeyrek</option>
          <option value="year">Bu Yıl</option>
          <option value="custom">Özel Aralık</option>
        </select>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Aylık Satış Trendi</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip />
                <Line type="monotone" dataKey="sales" stroke="#000000" strokeWidth={2} dot={{ fill: '#000000' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Conversion Sources */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Dönüşüm Kaynakları</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={conversionData} cx="50%" cy="50%" labelLine={false} label={({ name, value }) => `${name}: ${value}%`} outerRadius={80} fill="#8884d8" dataKey="value">
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quotes vs Orders */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm lg:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Teklif ve Müşteri Trendi</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6B7280' }} />
                <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip />
                <Bar dataKey="quotes" fill="#000000" radius={[4, 4, 0, 0]} />
                <Bar dataKey="customers" fill="#CCCCCC" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Reports */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Son Oluşturulan Raporlar</h3>
          <button className="text-sm text-blue-600 hover:underline">Tüm Raporları Gör</button>
        </div>
        <div className="space-y-3">
          {recentReports.map((report) => (
            <div key={report.id} className="flex justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors">
              <div>
                <p className="font-medium text-gray-900">{report.name}</p>
                <p className="text-sm text-gray-500">{report.date}</p>
              </div>
              <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                <Download className="size-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
