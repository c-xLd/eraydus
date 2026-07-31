import { createClient } from '@/lib/server'
import {
  Package, MessageSquare, Users, Star,
  ArrowUpRight, ArrowDownRight, Mail, Layers,
  TrendingUp, Clock
} from 'lucide-react'
import Link from 'next/link'
import { DashboardCharts } from './components/DashboardCharts'

export default async function AdminDashboardPage() {
  const supabase = await createClient()

  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
  const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString()
  const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59).toISOString()

  // ── Paralel sorgular ──
  const startOfWeek = new Date(now)
  startOfWeek.setDate(now.getDate() - 7)
  const startOfWeekISO = startOfWeek.toISOString()

  const [
    { count: totalProducts },
    { count: totalMessages },
    { count: unreadMessages },
    { count: messagesThisMonth },
    { count: messagesLastMonth },
    { count: totalSubscribers },
    { count: subscribersThisMonth },
    { count: subscribersLastMonth },
    { count: totalReviews },
    { count: pendingReviews },
    { count: totalSandblasted },
    { count: messagesThisWeek },
    { count: subscribersThisWeek },
    { count: totalQuotes },
    { count: quotesThisMonth },
    { data: recentMessages },
    { data: recentQuotes },
    { data: allMessagesMonthly },
  ] = await Promise.all([
    supabase.from('products').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
    supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', startOfLastMonth).lte('created_at', endOfLastMonth),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).gte('created_at', startOfLastMonth).lte('created_at', endOfLastMonth),
    supabase.from('product_reviews').select('*', { count: 'exact', head: true }),
    supabase.from('product_reviews').select('*', { count: 'exact', head: true }).eq('is_approved', false),
    supabase.from('sandblasted_models').select('*', { count: 'exact', head: true }),
    supabase.from('messages').select('*', { count: 'exact', head: true }).gte('created_at', startOfWeekISO),
    supabase.from('subscribers').select('*', { count: 'exact', head: true }).gte('created_at', startOfWeekISO),
    supabase.from('quotes').select('*', { count: 'exact', head: true }),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).gte('created_at', startOfMonth),
    supabase.from('messages').select('id, name, subject, created_at, is_read').order('created_at', { ascending: false }).limit(5),
    supabase.from('quotes').select('id, quote_number, customer_name, source, status, created_at').order('created_at', { ascending: false }).limit(5),
    supabase.from('messages').select('created_at').gte('created_at', new Date(now.getFullYear(), now.getMonth() - 5, 1).toISOString()),
  ])

  // Trend hesapla
  function trend(current: number, previous: number) {
    if (previous === 0) return current > 0 ? { label: `+${current}`, up: true } : { label: '—', up: true }
    const pct = Math.round(((current - previous) / previous) * 100)
    return { label: `${pct >= 0 ? '+' : ''}${pct}%`, up: pct >= 0 }
  }

  const msgTrend = trend(messagesThisMonth ?? 0, messagesLastMonth ?? 0)
  const subTrend = trend(subscribersThisMonth ?? 0, subscribersLastMonth ?? 0)
  const qteTrend = trend(subscribersThisWeek ?? 0, subscribersLastMonth ?? 0)

  // Aylık grafik verisi (son 6 ay)
  const months = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
  const chartData = Array.from({ length: 6 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - 5 + i, 1)
    return { name: months[d.getMonth()], value: 0, month: d.getMonth(), year: d.getFullYear() }
  })
  ;(allMessagesMonthly ?? []).forEach((m: any) => {
    const d = new Date(m.created_at)
    const slot = chartData.find(c => c.month === d.getMonth() && c.year === d.getFullYear())
    if (slot) slot.value += 1
  })

  const subjectLabels: Record<string, string> = {
    genel: 'Genel', fiyat: 'Fiyat Teklifi', mimar: 'Mimar', bayi: 'Bayi'
  }

  return (
    <div className="p-4 sm:p-8 max-w-7xl mx-auto space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 pb-4 border-b border-black/[0.04]">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-sans">Dashboard</h1>
          <p className="text-[13px] text-gray-500 mt-1.5 font-medium">
            {now.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/products/new" className="px-5 py-2.5 bg-[#0A0A0A] text-white text-[13px] font-medium rounded-xl hover:bg-black transition-all duration-300 shadow-md shadow-black/10 hover:shadow-lg hover:shadow-black/20 active:scale-95 flex items-center gap-2">
            <Package className="size-4 opacity-70" />
            Ürün Ekle
          </Link>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            title: 'Toplam Ürün',
            value: totalProducts ?? 0,
            sub: `${totalSandblasted ?? 0} kumlama modeli`,
            trend: null,
            icon: Package,
            href: '/admin/products',
            color: 'text-blue-600 bg-blue-50',
          },
          {
            title: 'Mesajlar',
            value: totalMessages ?? 0,
            sub: unreadMessages ? `${unreadMessages} okunmamış` : 'Tümü okundu',
            trend: msgTrend,
            icon: MessageSquare,
            href: '/admin/messages',
            color: unreadMessages ? 'text-amber-600 bg-amber-50' : 'text-green-600 bg-green-50',
          },
          {
            title: 'Bülten Aboneleri',
            value: totalSubscribers ?? 0,
            sub: subscribersThisMonth ? `+${subscribersThisMonth} bu ay` : 'Bu ay yeni yok',
            trend: subTrend,
            icon: Mail,
            href: null,
            color: 'text-purple-600 bg-purple-50',
          },
          {
            title: 'Teklifler',
            value: totalQuotes ?? 0,
            sub: quotesThisMonth ? `${quotesThisMonth} bu ay` : 'Bu ay yok',
            trend: qteTrend,
            icon: TrendingUp,
            href: '/admin/quotes',
            color: 'text-emerald-600 bg-emerald-50',
          },
        ].map((card) => {
          const Icon = card.icon
          const inner = (
            <div className="bg-white p-6 rounded-3xl border border-black/[0.03] shadow-[0_2px_20px_rgb(0,0,0,0.02)] flex flex-col gap-4 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 h-full relative overflow-hidden group">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-black/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="flex items-center justify-between relative z-10">
                <div className={`p-3 rounded-2xl ${card.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}>
                  <Icon className="size-5" />
                </div>
                {card.trend && (
                  <span className={`flex items-center gap-0.5 text-[11px] font-bold px-2.5 py-1 rounded-full ${card.trend.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {card.trend.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {card.trend.label}
                  </span>
                )}
              </div>
              <div className="relative z-10">
                <p className="text-[32px] font-extrabold text-gray-900 tracking-tight leading-none">{card.value}</p>
                <p className="text-[13px] font-medium text-gray-500 mt-2">{card.title}</p>
              </div>
              <p className="text-[11px] text-gray-400 font-medium relative z-10">{card.sub}</p>
            </div>
          )
          return card.href
            ? <Link key={card.title} href={card.href}>{inner}</Link>
            : <div key={card.title}>{inner}</div>
        })}
      </div>

      {/* Yorumlar + Kumlama özet şerit */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Toplam Yorum', value: totalReviews ?? 0, sub: pendingReviews ? `${pendingReviews} onay bekliyor` : 'Tümü onaylandı', icon: Star, href: '/admin/reviews', warn: !!pendingReviews },
          { label: 'Kumlama Modeli', value: totalSandblasted ?? 0, sub: 'Yüklü model', icon: Layers, href: '/admin/kumlama-modelleri', warn: false },
        ].map((item) => {
          const Icon = item.icon
          return (
            <Link key={item.label} href={item.href} className="col-span-1 bg-white p-5 rounded-3xl border border-black/[0.03] shadow-[0_2px_20px_rgb(0,0,0,0.02)] flex items-center gap-5 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-500 group">
              <div className={`p-3 rounded-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3 ${item.warn ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-600'}`}>
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-2xl font-extrabold text-gray-900 tracking-tight leading-none">{item.value}</p>
                <p className="text-[13px] font-medium text-gray-500 mt-1.5">{item.label}</p>
                <p className="text-[11px] text-gray-400 font-medium mt-0.5">{item.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Grafik + Son Mesajlar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-7 rounded-3xl border border-black/[0.03] shadow-[0_2px_20px_rgb(0,0,0,0.02)] transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-lg font-bold text-gray-900 tracking-tight">Aylık Mesaj Trendi</h2>
              <p className="text-[13px] font-medium text-gray-400 mt-1">Son 6 ay, iletişim formundan gelen mesajlar</p>
            </div>
          </div>
          <DashboardCharts revenueData={chartData} />
        </div>

        {/* Son Mesajlar */}
        <div className="bg-white p-7 rounded-3xl border border-black/[0.03] shadow-[0_2px_20px_rgb(0,0,0,0.02)] flex flex-col transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Son Mesajlar</h2>
            <Link href="/admin/messages" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100">
              Tümü
            </Link>
          </div>
          <div className="flex flex-col gap-4 flex-1">
            {(recentMessages ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6 font-medium">Henüz mesaj yok.</p>
            ) : (recentMessages ?? []).map((msg: any) => (
              <div key={msg.id} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors group cursor-pointer border border-transparent hover:border-black/[0.02]">
                <div className={`mt-1.5 size-2.5 rounded-full shrink-0 shadow-sm ${msg.is_read ? 'bg-gray-200' : 'bg-blue-500 shadow-blue-500/30'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">{msg.name}</p>
                  <p className="text-xs font-medium text-gray-500 truncate mt-0.5">{subjectLabels[msg.subject] ?? msg.subject}</p>
                </div>
                <span className="text-[10px] font-semibold text-gray-400 shrink-0 flex items-center gap-1 mt-1 bg-gray-50 px-2 py-1 rounded-md">
                  <Clock className="size-3" />
                  {new Date(msg.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Son Teklifler */}
      {(recentQuotes ?? []).length > 0 && (
        <div className="bg-white rounded-3xl border border-black/[0.03] shadow-[0_2px_20px_rgb(0,0,0,0.02)] overflow-hidden transition-shadow duration-500 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
          <div className="flex items-center justify-between px-7 py-5 border-b border-black/[0.03] bg-gray-50/50">
            <h2 className="text-lg font-bold text-gray-900 tracking-tight">Son Teklifler</h2>
            <Link href="/admin/quotes" className="text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors bg-blue-50 px-3 py-1.5 rounded-full hover:bg-blue-100">
              Tümü
            </Link>
          </div>
          <div className="divide-y divide-black/[0.02]">
            {(recentQuotes ?? []).map((q: any) => (
              <div key={q.id} className="flex items-center justify-between px-7 py-4 hover:bg-gray-50/80 transition-colors cursor-pointer group">
                <div>
                  <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{q.customer_name}</p>
                  <p className="text-[13px] font-medium text-gray-500 mt-1 flex items-center gap-2">
                    <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[11px] font-semibold tracking-wider">
                      {q.quote_number ?? `#${q.id.slice(0, 6)}`}
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock className="size-3" />{new Date(q.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                  </p>
                </div>
                <span className={`text-[11px] font-bold px-3 py-1.5 rounded-full border shadow-sm ${
                  q.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-100' :
                  q.status === 'pending'  ? 'bg-amber-50 text-amber-700 border-amber-100' :
                                            'bg-blue-50 text-blue-700 border-blue-100'
                }`}>
                  {q.status === 'accepted' ? 'Tamamlandı' : q.status === 'pending' ? 'Bekliyor' : 'Yanıtlandı'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
