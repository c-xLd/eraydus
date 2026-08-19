'use server'

import { createAdminClient } from '@/services/supabase/server'

export type DateRange = 'today' | 'yesterday' | '7days' | '30days' | '90days' | 'thisMonth' | 'lastMonth' | 'thisYear' | 'allTime'

function getDateRangeFilter(range: DateRange) {
  const now = new Date()
  let startDate: Date
  let endDate: Date = now

  const startOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
  const endOfDay = (d: Date) => new Date(d.getFullYear(), d.getMonth(), d.getDate(), 23, 59, 59, 999)
  const subDays = (d: Date, days: number) => new Date(d.getTime() - days * 24 * 60 * 60 * 1000)

  switch (range) {
    case 'today':
      startDate = startOfDay(now)
      break
    case 'yesterday':
      startDate = startOfDay(subDays(now, 1))
      endDate = endOfDay(subDays(now, 1))
      break
    case '7days':
      startDate = startOfDay(subDays(now, 7))
      break
    case '30days':
      startDate = startOfDay(subDays(now, 30))
      break
    case '90days':
      startDate = startOfDay(subDays(now, 90))
      break
    case 'thisMonth':
      startDate = new Date(now.getFullYear(), now.getMonth(), 1)
      break
    case 'lastMonth':
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
      endDate = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999)
      break
    case 'thisYear':
      startDate = new Date(now.getFullYear(), 0, 1)
      break
    case 'allTime':
    default:
      startDate = new Date(2020, 0, 1) // far past
      break
  }

  return { startDate: startDate.toISOString(), endDate: endDate.toISOString() }
}

export async function getAnalyticsSummary(range: DateRange) {
  const supabase = createAdminClient()
  const { startDate, endDate } = getDateRangeFilter(range)

  // In a real high scale app this would be a materialized view or custom RPC function.
  // We'll use multiple simple queries for now.
  
  const [
    { count: totalVisitors },
    { count: totalSessions },
    { count: pageViews },
    { count: productViews },
    { count: whatsappClicks }
  ] = await Promise.all([
    // Visitors (Unique Session IDs)
    // Note: Supabase JS client doesn't have COUNT DISTINCT out of the box easily without RPC.
    // For MVP, we'll fetch unique sessions via JS if small, or an RPC. Since we can't create an RPC now, 
    // we will approximate with total pageviews or fetch only unique sessions. 
    // Actually we can just query the count of events and group in JS, but it's bad for large data.
    // We'll just fetch raw count for `page_views` and use it for Sessions. 
    // For real unique visitors we'll count unique session_ids via an RPC. 
    // Wait, let's create a generic query and use .count().
    supabase.from('analytics_events').select('session_id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate),
    supabase.from('analytics_events').select('session_id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate).eq('event_name', 'page_view'),
    supabase.from('analytics_events').select('id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate).eq('event_name', 'page_view'),
    supabase.from('analytics_events').select('id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate).eq('event_name', 'product_view'),
    supabase.from('analytics_events').select('id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate).eq('event_name', 'whatsapp_click'),
  ])

  const conversionRate = productViews && productViews > 0 
    ? ((whatsappClicks || 0) / productViews * 100).toFixed(2) 
    : 0

  return {
    visitors: totalSessions || 0, // Approx
    sessions: totalSessions || 0, 
    pageViews: pageViews || 0,
    productViews: productViews || 0,
    whatsappClicks: whatsappClicks || 0,
    conversionRate: Number(conversionRate)
  }
}

export async function getTrafficChart(range: DateRange) {
  const supabase = createAdminClient()
  const { startDate, endDate } = getDateRangeFilter(range)

  // Fetch all events for the period to aggregate in JS (assuming < 10k events for this MVP)
  // In production, use a Postgres function to group by time bucket.
  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('created_at, event_name')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .in('event_name', ['page_view', 'whatsapp_click'])

  if (error || !events) return []

  const chartData = new Map<string, { date: string, pageViews: number, whatsappClicks: number }>()

  events.forEach(e => {
    // Format as YYYY-MM-DD
    const dateStr = new Date(e.created_at).toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit' })
    if (!chartData.has(dateStr)) {
      chartData.set(dateStr, { date: dateStr, pageViews: 0, whatsappClicks: 0 })
    }
    const item = chartData.get(dateStr)!
    if (e.event_name === 'page_view') item.pageViews++
    if (e.event_name === 'whatsapp_click') item.whatsappClicks++
  })

  return Array.from(chartData.values())
}

export async function getTopProductsAnalytics(range: DateRange) {
  const supabase = createAdminClient()
  const { startDate, endDate } = getDateRangeFilter(range)

  // Fetch product views and whatsapp clicks
  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('product_id, event_name, products(name)')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .not('product_id', 'is', null)
    .in('event_name', ['product_view', 'whatsapp_click'])

  if (error || !events) return []

  const prodMap = new Map<string, { id: string, name: string, views: number, clicks: number }>()

  events.forEach(e => {
    const pId = e.product_id as string
    if (!pId) return
    if (!prodMap.has(pId)) {
      const prodData = e.products as any
      prodMap.set(pId, { id: pId, name: prodData?.name || 'Bilinmeyen Ürün', views: 0, clicks: 0 })
    }
    const item = prodMap.get(pId)!
    if (e.event_name === 'product_view') item.views++
    if (e.event_name === 'whatsapp_click') item.clicks++
  })

  const results = Array.from(prodMap.values()).map(p => ({
    ...p,
    conversionRate: p.views > 0 ? Number(((p.clicks / p.views) * 100).toFixed(2)) : 0
  }))

  return results.sort((a, b) => b.clicks - a.clicks).slice(0, 20)
}
