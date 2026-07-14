"use client"

import { useState, useEffect } from "react"
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts'
import { ArrowUpRight, ArrowDownRight, Package, Users, FileText, CheckCircle } from 'lucide-react'
import { createClient } from '@/services/supabase/client'
import Link from 'next/link'

// Mock Data for charts, replace if time permits, but requirements focused on stats
const revenueData = [
  { name: 'Oca', value: 4000 },
  { name: 'Şub', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Nis', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Haz', value: 2390 },
  { name: 'Tem', value: 3490 },
]

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalProducts: 0,
    completedOrders: 0,
    activeProducts: 0
  });
  const [recentQuotes, setRecentQuotes] = useState<any[]>([]);

  useEffect(() => {
    async function fetchDashboardData() {
      const supabase = createClient();

      // Fetch Product stats
      const { count: totalProducts, error: productError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      const { count: activeProducts, error: activeProductError } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'published');

      // Fetch Quotes stats
      const { count: totalQuotes, error: quoteError } = await supabase
        .from('quote_requests')
        .select('*', { count: 'exact', head: true });

      const { count: completedOrders, error: completedQuoteError } = await supabase
        .from('quote_requests')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'accepted'); // Using accepted quotes as a proxy for completed orders

      // Fetch Recent Quotes (top 4)
      const { data: quotesData } = await supabase
        .from('quote_requests')
        .select(`
          id,
          quote_number,
          status,
          created_at,
          source,
          customers (
            first_name,
            last_name
          )
        `)
        .order('created_at', { ascending: false })
        .limit(4);

      setStats({
        totalQuotes: totalQuotes || 0,
        totalProducts: totalProducts || 0,
        completedOrders: completedOrders || 0,
        activeProducts: activeProducts || 0
      });

      if (quotesData) {
        setRecentQuotes(quotesData);
      }
    }

    fetchDashboardData();
  }, []);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const getStatusStyle = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-amber-50 text-amber-700 border border-amber-200';
      case 'sent': return 'bg-blue-50 text-blue-700 border border-blue-200';
      case 'accepted': return 'bg-green-50 text-green-700 border border-green-200';
      case 'rejected': return 'bg-red-50 text-red-700 border border-red-200';
      case 'viewed': return 'bg-purple-50 text-purple-700 border border-purple-200';
      default: return 'bg-gray-50 text-gray-700 border border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    switch(status) {
      case 'pending': return 'Bekliyor';
      case 'sent': return 'Gönderildi';
      case 'accepted': return 'Kabul Edildi';
      case 'rejected': return 'Reddedildi';
      case 'viewed': return 'Görüldü';
      default: return status || 'Bilinmiyor';
    }
  };

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
          <Link href="/admin/products/new" className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/90 transition-colors shadow-sm">
            Yeni Ürün Ekle
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Toplam Teklif", value: stats.totalQuotes, trend: "", isUp: true, icon: FileText },
          { title: "Toplam Ürün", value: stats.totalProducts, trend: "", isUp: true, icon: Package },
          { title: "Tamamlanan Sipariş", value: stats.completedOrders, trend: "", isUp: true, icon: CheckCircle },
          { title: "Aktif Ürün", value: stats.activeProducts, trend: "", isUp: true, icon: Package },
        ].map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
              <div className="flex justify-between items-start mb-4">
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Icon className="size-5 text-gray-600" />
                </div>
                {stat.trend && (
                  <div className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${stat.isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {stat.isUp ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {stat.trend}
                  </div>
                )}
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
            <h2 className="text-lg font-semibold text-gray-900">Teklif İstatistikleri (Örnek Veri)</h2>
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
            <Link href="/admin/quotes" className="text-sm font-medium text-blue-600 hover:text-blue-800">Tümü</Link>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {recentQuotes.length > 0 ? recentQuotes.map((quote) => {
              const customerName = quote.customers
                ? `${quote.customers.first_name || ''} ${quote.customers.last_name || ''}`.trim()
                : 'Bilinmeyen Müşteri';

              return (
                <div key={quote.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{customerName || quote.quote_number}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{quote.source || 'Website'}</span>
                      <span className="text-xs text-gray-400">{formatDate(quote.created_at)}</span>
                    </div>
                  </div>
                  <div>
                    <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${getStatusStyle(quote.status)}`}>
                      {getStatusText(quote.status)}
                    </span>
                  </div>
                </div>
              )
            }) : (
              <p className="text-sm text-gray-500 text-center py-4">Henüz talep bulunmuyor.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
