import { createAdminClient } from '@/services/supabase/server'
import type { DashboardData } from './types'

export async function getDashboardData(days = 30): Promise<DashboardData> {
  const supabase = createAdminClient()
  
  const now = new Date()
  const currentPeriodStart = new Date(now)
  currentPeriodStart.setDate(now.getDate() - days)
  
  const previousPeriodStart = new Date(currentPeriodStart)
  previousPeriodStart.setDate(currentPeriodStart.getDate() - days)

  // 1. Customers
  const [{ count: totalCustomers }, { count: currentCustomers }, { count: previousCustomers }, { data: recentCustomers }] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('customers').select('*', { count: 'exact', head: true }).gte('created_at', currentPeriodStart.toISOString()),
    supabase.from('customers').select('*', { count: 'exact', head: true }).gte('created_at', previousPeriodStart.toISOString()).lt('created_at', currentPeriodStart.toISOString()),
    supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(5)
  ])

  const calcChange = (curr: number, prev: number) => {
    if (prev === 0) return curr > 0 ? 100 : 0
    return ((curr - prev) / prev) * 100
  }

  // 2. Quotes
  const [{ data: allQuotes }, { count: currentQuotesCount }, { count: prevQuotesCount }, { data: recentQuotes }] = await Promise.all([
    supabase.from('quotes').select('status'),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).gte('created_at', currentPeriodStart.toISOString()),
    supabase.from('quotes').select('*', { count: 'exact', head: true }).gte('created_at', previousPeriodStart.toISOString()).lt('created_at', currentPeriodStart.toISOString()),
    supabase.from('quotes').select(`
      id, created_at, status, quote_number,
      customers(first_name, last_name, company_name)
    `).order('created_at', { ascending: false }).limit(5)
  ])

  const totalQuotes = allQuotes?.length || 0
  const pendingQuotes = allQuotes?.filter(q => q.status === 'pending').length || 0
  const acceptedQuotes = allQuotes?.filter(q => q.status === 'accepted').length || 0
  const rejectedQuotes = allQuotes?.filter(q => q.status === 'rejected').length || 0

  // 3. Products & SEO Data Quality
  const [{ data: products }, { data: seoRecords }] = await Promise.all([
    supabase.from('products').select('id, status, categories(slug)').eq('status', 'active'),
    supabase.from('seo_metadata').select('page_id, title, description, robots_index').eq('page_type', 'product')
  ])

  let missingSeo = 0
  let orphans = 0
  
  if (products) {
    const seoMap = new Map(seoRecords?.map(s => [s.page_id, s]) || [])
    for (const p of products as any[]) {
      if (!p.categories || p.categories.length === 0) orphans++
      const seo = seoMap.get(p.id)
      if (!seo || !seo.title || !seo.description || !seo.robots_index) {
        missingSeo++
      }
    }
  }

  // 4. Recent Activity Logs
  const { data: activities } = await supabase
    .from('activity_logs')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(10)

  // 5. Inventory check
  const { count: lowStockCount } = await supabase
    .from('product_inventory')
    .select('*', { count: 'exact', head: true })
    .lt('quantity', 5)

  return {
    customers: {
      total: totalCustomers || 0,
      newInPeriod: currentCustomers || 0,
      changePercent: calcChange(currentCustomers || 0, previousCustomers || 0),
      recent: recentCustomers || []
    },
    quotes: {
      total: totalQuotes,
      pending: pendingQuotes,
      accepted: acceptedQuotes,
      rejected: rejectedQuotes,
      changePercent: calcChange(currentQuotesCount || 0, prevQuotesCount || 0),
      recent: recentQuotes || []
    },
    products: {
      total: products?.length || 0,
      active: products?.length || 0,
      inSitemap: (products?.length || 0) - orphans,
      missingSeo,
      orphan: orphans,
      lowStock: lowStockCount || 0
    },
    activities: activities || []
  }
}
