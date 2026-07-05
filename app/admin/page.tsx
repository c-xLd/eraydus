"use client"

import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, Package, Users, FileText, CheckCircle } from 'lucide-react'

// Mock Data
const revenueData = [
  { name: 'Oca', value: 4000 },
  { name: 'Şub', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Nis', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Haz', value: 2390 },
  { name: 'Tem', value: 3490 },
]

const recentQuotes = [
  { id: '#1045', name: 'Ahmet Yılmaz', type: 'Configurator', model: 'Edge Serisi', status: 'Bekliyor', date: 'Bugün, 14:30' },
  { id: '#1044', name: 'Ayşe Demir', type: 'WhatsApp', model: 'Pure Serisi', status: 'Cevaplandı', date: 'Bugün, 11:15' },
  { id: '#1043', name: 'Mehmet Kaya', type: 'İletişim', model: '-', status: 'Bekliyor', date: 'Dün, 16:45' },
  { id: '#1042', name: 'Zeynep Çelik', type: 'Configurator', model: 'Luxury Serisi', status: 'Tamamlandı', date: 'Dün, 09:20' },
]

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizin genel durumuna ve son etkinliklere göz atın.</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
            Rapor İndir
          </button>
          <button className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm">
            Yeni Ürün Ekle
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Toplam Teklif", value: "128", trend: "+12.5%", isUp: true, icon: FileText },
          { title: "Ziyaretçi (Aylık)", value: "14.2k", trend: "+8.2%", isUp: true, icon: Users },
          { title: "Tamamlanan Sipariş", value: "45", trend: "-2.4%", isUp: false, icon: CheckCircle },
          { title: "Aktif Ürün", value: "24", trend: "0%", isUp: true, icon: Package },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className="size-5 text-gray-600" />
                </div>
                <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  {stat.isUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                  {stat.trend}
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Charts */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Teklif İstatistikleri</h2>
            <select className="bg-gray-50 border border-gray-200 text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-black/5">
              <option>Son 6 Ay</option>
              <option>Bu Yıl</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6B7280' }} />
                <Tooltip 
                  cursor={{ fill: '#F3F4F6' }}
                  contentStyle={{ borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill="#000000" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Son Talepler</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Tümü</button>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {recentQuotes.map((quote) => (
              <div key={quote.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{quote.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{quote.type}</span>
                    <span className="text-xs text-gray-400">{quote.date}</span>
                  </div>
                </div>
                <div>
                  <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    quote.status === 'Bekliyor' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    quote.status === 'Cevaplandı' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                    'bg-green-50 text-green-700 border border-green-200'
                  }`}>
                    {quote.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
