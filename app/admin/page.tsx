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
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">
            {now.toLocaleDateString('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/products/new" className="px-4 py-2 bg-black text-white text-sm font-medium rounded-lg hover:bg-black/85 transition-colors">
            + Ürün Ekle
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
            <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-3 hover:shadow-md transition-shadow h-full">
              <div className="flex items-center justify-between">
                <div className={`p-2 rounded-xl ${card.color}`}>
                  <Icon className="size-5" />
                </div>
                {card.trend && (
                  <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-1 rounded-full ${card.trend.up ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                    {card.trend.up ? <ArrowUpRight className="size-3" /> : <ArrowDownRight className="size-3" />}
                    {card.trend.label}
                  </span>
                )}
              </div>
              <div>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
                <p className="text-sm font-medium text-gray-500 mt-0.5">{card.title}</p>
              </div>
              <p className="text-xs text-gray-400">{card.sub}</p>
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
            <Link key={item.label} href={item.href} className="col-span-1 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
              <div className={`p-2.5 rounded-xl ${item.warn ? 'bg-amber-50 text-amber-600' : 'bg-gray-50 text-gray-600'}`}>
                <Icon className="size-5" />
              </div>
              <div>
                <p className="text-xl font-bold text-gray-900">{item.value}</p>
                <p className="text-xs font-medium text-gray-500">{item.label}</p>
                <p className="text-[11px] text-gray-400">{item.sub}</p>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Grafik + Son Mesajlar */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900">Aylık Mesaj Trendi</h2>
              <p className="text-xs text-gray-400 mt-0.5">Son 6 ay, iletişim formundan gelen mesajlar</p>
            </div>
          </div>
          <DashboardCharts revenueData={chartData} />
        </div>

        {/* Son Mesajlar */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-semibold text-gray-900">Son Mesajlar</h2>
            <Link href="/admin/messages" className="text-xs font-medium text-blue-600 hover:text-blue-800">
              Tümü →
            </Link>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            {(recentMessages ?? []).length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-6">Henüz mesaj yok.</p>
            ) : (recentMessages ?? []).map((msg: any) => (
              <div key={msg.id} className="flex items-start gap-3">
                <div className={`mt-1 size-2 rounded-full shrink-0 ${msg.is_read ? 'bg-gray-200' : 'bg-blue-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{msg.name}</p>
                  <p className="text-xs text-gray-400 truncate">{subjectLabels[msg.subject] ?? msg.subject}</p>
                </div>
                <span className="text-[10px] text-gray-400 shrink-0 flex items-center gap-1 mt-0.5">
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
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Son Teklifler</h2>
            <Link href="/admin/quotes" className="text-xs font-medium text-blue-600 hover:text-blue-800">Tümü →</Link>
          </div>
          <div className="divide-y divide-gray-50">
            {(recentQuotes ?? []).map((q: any) => (
              <div key={q.id} className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors">
                <div>
                  <p className="text-sm font-semibold text-gray-900">{q.customer_name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {q.quote_number ?? `#${q.id.slice(0, 6)}`} · {new Date(q.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
                <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                  q.status === 'accepted' ? 'bg-green-50 text-green-700 border-green-200' :
                  q.status === 'pending'  ? 'bg-amber-50 text-amber-700 border-amber-200' :
                                            'bg-blue-50 text-blue-700 border-blue-200'
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
