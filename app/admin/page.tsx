import { createClient } from '@/lib/server'
import { ArrowUpRight, ArrowDownRight, Package, Users, FileText, CheckCircle } from 'lucide-react'
import { DashboardCharts } from './components/DashboardCharts'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  // 1. Fetch total quotes
  const { count: totalQuotesCount } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })

  // 2. Fetch completed quotes
  const { count: completedOrdersCount } = await supabase
    .from('quotes')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'accepted')

  // 3. Fetch active products
  const { count: activeProductsCount } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  // 4. Visitors count (simplified for now)
  const { count: visitorsCount } = await supabase
    .from('visitor_tracking')
    .select('*', { count: 'exact', head: true })

  // 5. Recent Quotes
  const { data: recentQuotesData } = await supabase
    .from('quotes')
    .select('id, quote_number, customer_name, source, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  const recentQuotes = (recentQuotesData || []).map((quote: any) => ({
    id: quote.quote_number || `#${quote.id.substring(0, 4)}`,
    name: quote.customer_name,
    type: quote.source,
    status: quote.status === 'pending' ? 'Bekliyor' : quote.status === 'accepted' ? 'Tamamlandı' : 'Cevaplandı',
    date: new Date(quote.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
  }))

  // 6. Chart data
  const { data: allQuotes } = await supabase
    .from('quotes')
    .select('created_at')
  
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  const revenueData = months.map(m => ({ name: m, value: 0 }))
  
  if (allQuotes) {
    allQuotes.forEach((q: any) => {
      const date = new Date(q.created_at)
      const monthIndex = date.getMonth()
      revenueData[monthIndex].value += 1
    })
  }
  
  // Filter to just show up to current month (or all)
  const currentMonth = new Date().getMonth()
  const displayData = revenueData.slice(Math.max(0, currentMonth - 5), currentMonth + 1)

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
          { title: "Toplam Teklif", value: totalQuotesCount || "0", trend: "0%", isUp: true, icon: FileText },
          { title: "Ziyaretçi (Toplam)", value: visitorsCount || "0", trend: "0%", isUp: true, icon: Users },
          { title: "Tamamlanan Sipariş", value: completedOrdersCount || "0", trend: "0%", isUp: true, icon: CheckCircle },
          { title: "Aktif Ürün", value: activeProductsCount || "0", trend: "0%", isUp: true, icon: Package },
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
          <DashboardCharts revenueData={displayData} />
        </div>

        {/* Recent Quotes */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Son Talepler</h2>
            <button className="text-sm font-medium text-blue-600 hover:text-blue-800">Tümü</button>
          </div>
          <div className="flex-1 flex flex-col gap-4">
            {recentQuotes.length > 0 ? recentQuotes.map((quote: any) => (
              <div key={quote.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 cursor-pointer">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{quote.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[11px] font-medium text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md capitalize">{quote.type?.replace('_', ' ')}</span>
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
            )) : (
              <div className="text-sm text-gray-500 text-center py-4">Henüz talep bulunmuyor.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
