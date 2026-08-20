import { createAdminClient } from '@/services/supabase/server'
import type { DashboardData } from './types'

const emptyDashboard: DashboardData = {
  customers: { total: 0, newInPeriod: 0, changePercent: 0, recent: [] },
  quotes: { total: 0, pending: 0, accepted: 0, rejected: 0, changePercent: 0, recent: [] },
  products: { total: 0, active: 0, inSitemap: 0, missingSeo: 0, orphan: 0, lowStock: 0 },
  activities: []
}

export async function getDashboardData(days = 30): Promise<DashboardData> {
  try {
    const supabase = createAdminClient()
    
    const now = new Date()
    const currentPeriodStart = new Date(now)
    currentPeriodStart.setDate(now.getDate() - days)
    
    const previousPeriodStart = new Date(currentPeriodStart)
    previousPeriodStart.setDate(currentPeriodStart.getDate() - days)

    const calcChange = (curr: number, prev: number) => {
      if (prev === 0) return curr > 0 ? 100 : 0
      return ((curr - prev) / prev) * 100
    }

    // 1. Customers — safe
    let customerData = emptyDashboard.customers
    try {
      const [{ count: totalCustomers }, { count: currentCustomers }, { count: previousCustomers }, { data: recentCustomers }] = await Promise.all([
        supabase.from('customers').select('*', { count: 'exact', head: true }),
        supabase.from('customers').select('*', { count: 'exact', head: true }).gte('created_at', currentPeriodStart.toISOString()),
        supabase.from('customers').select('*', { count: 'exact', head: true }).gte('created_at', previousPeriodStart.toISOString()).lt('created_at', currentPeriodStart.toISOString()),
        supabase.from('customers').select('*').order('created_at', { ascending: false }).limit(5)
      ])
      customerData = {
        total: totalCustomers || 0,
        newInPeriod: currentCustomers || 0,
        changePercent: calcChange(currentCustomers || 0, previousCustomers || 0),
        recent: recentCustomers || []
      }
    } catch (e) {
      console.error('Dashboard: customers query failed', e)
    }

    // 2. Quotes — safe (removed broken customers join)
    let quoteData = emptyDashboard.quotes
    try {
      const [{ data: allQuotes }, { count: currentQuotesCount }, { count: prevQuotesCount }, { data: recentQuotes }] = await Promise.all([
        supabase.from('quotes').select('status'),
        supabase.from('quotes').select('*', { count: 'exact', head: true }).gte('created_at', currentPeriodStart.toISOString()),
        supabase.from('quotes').select('*', { count: 'exact', head: true }).gte('created_at', previousPeriodStart.toISOString()).lt('created_at', currentPeriodStart.toISOString()),
        supabase.from('quotes').select('id, created_at, status, quote_number, customer_id').order('created_at', { ascending: false }).limit(5)
      ])

      const totalQuotes = allQuotes?.length || 0
      const pendingQuotes = allQuotes?.filter(q => q.status === 'pending').length || 0
      const acceptedQuotes = allQuotes?.filter(q => q.status === 'accepted').length || 0
      const rejectedQuotes = allQuotes?.filter(q => q.status === 'rejected').length || 0

      quoteData = {
        total: totalQuotes,
        pending: pendingQuotes,
        accepted: acceptedQuotes,
        rejected: rejectedQuotes,
        changePercent: calcChange(currentQuotesCount || 0, prevQuotesCount || 0),
        recent: recentQuotes || []
      }
    } catch (e) {
      console.error('Dashboard: quotes query failed', e)
    }

    // 3. Products & SEO Data Quality — safe
    let productData = emptyDashboard.products
    try {
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

      productData = {
        total: products?.length || 0,
        active: products?.length || 0,
        inSitemap: (products?.length || 0) - orphans,
        missingSeo,
        orphan: orphans,
        lowStock: 0
      }
    } catch (e) {
      console.error('Dashboard: products query failed', e)
    }

    // 4. Low Stock — safe (table may not have 'quantity' column)
    try {
      const { count: lowStockCount } = await supabase
        .from('product_inventory')
        .select('*', { count: 'exact', head: true })
        .lt('quantity', 5)
      productData.lowStock = lowStockCount || 0
    } catch (e) {
      // product_inventory table or quantity column may not exist
    }

    // 5. Recent Activity Logs — safe
    let activities: any[] = []
    try {
      const { data } = await supabase
        .from('activity_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10)
      activities = data || []
    } catch (e) {
      console.error('Dashboard: activity_logs query failed', e)
    }

    return {
      customers: customerData,
      quotes: quoteData,
      products: productData,
      activities
    }
  } catch (e) {
    console.error('Dashboard: getDashboardData failed entirely', e)
    return emptyDashboard
  }
}
