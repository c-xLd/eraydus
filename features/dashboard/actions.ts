import { createAdminClient } from '@/services/supabase/server'
import type { DashboardData, SystemHealth, ExecutiveSummary, AttentionItem, WhatsAppIntelligence, KPIMetric } from './types'

const emptyMetric: KPIMetric = { label: '', value: 0, changePercent: 0, previousValue: 0 }

const emptyDashboard: DashboardData = {
  health: {
    website: 'healthy',
    database: 'healthy',
    authentication: 'healthy',
    storage: 'healthy',
    analytics: 'healthy',
    seo: 'healthy'
  },
  summary: {
    visitors: { ...emptyMetric, label: 'Ziyaretçiler' },
    sessions: { ...emptyMetric, label: 'Oturumlar' },
    pageViews: { ...emptyMetric, label: 'Sayfa Gösterimi' },
    productViews: { ...emptyMetric, label: 'Ürün İncelemeleri' },
    whatsappClicks: { ...emptyMetric, label: 'WhatsApp Tıklamaları' },
    organicVisitors: { ...emptyMetric, label: 'Organik Trafik' },
    publishedProducts: { ...emptyMetric, label: 'Aktif Ürünler' },
    publishedContent: { ...emptyMetric, label: 'Blog & İçerik' }
  },
  attention: [],
  whatsapp: {
    clicks: 0,
    uniqueClicks: 0,
    productConversion: 0,
    topProduct: null,
    topCategory: null,
    topSource: null
  },
  traffic: {
    organic: 0,
    direct: 0,
    social: 0,
    referral: 0,
    trend: []
  },
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
    
    const dashboard = JSON.parse(JSON.stringify(emptyDashboard)) as DashboardData

    // 1. Health Checks (Basic for now)
    try {
      const [{ error: dbErr }, { error: authErr }] = await Promise.all([
        supabase.from('products').select('id').limit(1),
        supabase.auth.admin.listUsers({ perPage: 1 })
      ])
      if (dbErr) dashboard.health.database = 'error'
      if (authErr) dashboard.health.authentication = 'error'
    } catch (e) {
      dashboard.health.database = 'error'
    }

    // 2. Analytics Events
    try {
      const { data: currentEvents } = await supabase
        .from('analytics_events')
        .select('event_name, session_id, referrer, page_url, created_at')
        .gte('created_at', currentPeriodStart.toISOString())

      const { data: previousEvents } = await supabase
        .from('analytics_events')
        .select('event_name, session_id')
        .gte('created_at', previousPeriodStart.toISOString())
        .lt('created_at', currentPeriodStart.toISOString())

      const curr = currentEvents || []
      const prev = previousEvents || []

      const getCount = (events: any[], name: string) => events.filter(e => e.event_name === name).length
      
      const currPageViews = getCount(curr, 'page_view')
      const prevPageViews = getCount(prev, 'page_view')
      
      const currProductViews = getCount(curr, 'product_view')
      const prevProductViews = getCount(prev, 'product_view')
      
      const currWaClicks = getCount(curr, 'whatsapp_click')
      const prevWaClicks = getCount(prev, 'whatsapp_click')

      const currSessions = new Set(curr.map(e => e.session_id)).size
      const prevSessions = new Set(prev.map(e => e.session_id)).size

      dashboard.summary.pageViews.value = currPageViews
      dashboard.summary.pageViews.previousValue = prevPageViews
      dashboard.summary.pageViews.changePercent = calcChange(currPageViews, prevPageViews)

      dashboard.summary.productViews.value = currProductViews
      dashboard.summary.productViews.previousValue = prevProductViews
      dashboard.summary.productViews.changePercent = calcChange(currProductViews, prevProductViews)

      dashboard.summary.whatsappClicks.value = currWaClicks
      dashboard.summary.whatsappClicks.previousValue = prevWaClicks
      dashboard.summary.whatsappClicks.changePercent = calcChange(currWaClicks, prevWaClicks)

      dashboard.summary.sessions.value = currSessions
      dashboard.summary.sessions.previousValue = prevSessions
      dashboard.summary.sessions.changePercent = calcChange(currSessions, prevSessions)

      dashboard.whatsapp.clicks = currWaClicks
      dashboard.whatsapp.uniqueClicks = new Set(curr.filter(e => e.event_name === 'whatsapp_click').map(e => e.session_id)).size
      dashboard.whatsapp.productConversion = currProductViews > 0 ? (currWaClicks / currProductViews) * 100 : 0
      
      // Calculate Traffic Sources from curr array
      let organic = 0, direct = 0, social = 0, referral = 0
      
      // For trend (we'll divide the period into 5 chunks or just daily if 7 days, let's keep it simple with 7 buckets)
      const numBuckets = Math.min(days, 30)
      const trendBuckets: { [key: string]: { organic: number, direct: number, social: number } } = {}
      
      for (let i = 0; i < numBuckets; i++) {
        const d = new Date(currentPeriodStart)
        d.setDate(d.getDate() + Math.floor((i / numBuckets) * days))
        trendBuckets[i] = { organic: 0, direct: 0, social: 0 }
      }

      const organicPatterns = ['google', 'bing', 'yahoo', 'yandex']
      const socialPatterns = ['instagram', 'facebook', 'twitter', 'linkedin', 't.co', 'pinterest', 'tiktok']

      // Use a set to only count unique sessions per source
      const countedSessions = new Set<string>()

      curr.forEach(e => {
        if (!countedSessions.has(e.session_id) && e.event_name === 'page_view') {
          countedSessions.add(e.session_id)
          const ref = (e.referrer || '').toLowerCase()
          let source = 'direct'
          
          if (!ref || ref.includes('eraydus')) {
            source = 'direct'
            direct++
          } else if (organicPatterns.some(p => ref.includes(p))) {
            source = 'organic'
            organic++
          } else if (socialPatterns.some(p => ref.includes(p))) {
            source = 'social'
            social++
          } else {
            source = 'referral'
            referral++
          }
          
          // Map to bucket
          if (e.created_at) {
            const evDate = new Date(e.created_at)
            const diffTime = Math.abs(evDate.getTime() - currentPeriodStart.getTime())
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))
            const bucketIdx = Math.min(Math.floor((diffDays / days) * numBuckets), numBuckets - 1)
            
            if (trendBuckets[bucketIdx]) {
              if (source === 'organic') trendBuckets[bucketIdx].organic++
              if (source === 'direct') trendBuckets[bucketIdx].direct++
              if (source === 'social') trendBuckets[bucketIdx].social++
            }
          }
        }
      })
      
      const totalSources = organic + direct + social + referral
      if (totalSources > 0) {
        dashboard.traffic.organic = Math.round((organic / totalSources) * 100)
        dashboard.traffic.direct = Math.round((direct / totalSources) * 100)
        dashboard.traffic.social = Math.round((social / totalSources) * 100)
        dashboard.traffic.referral = Math.round((referral / totalSources) * 100)
      }

      dashboard.traffic.trend = Object.keys(trendBuckets).map(k => ({
        name: String(Number(k) + 1),
        organic: trendBuckets[k].organic,
        direct: trendBuckets[k].direct,
        social: trendBuckets[k].social
      }))
      
    } catch (e) {
      console.error('Analytics fetch failed', e)
      dashboard.health.analytics = 'error'
    }

    // 3. Content & Products
    try {
      const [{ count: activeProducts }, { count: prevActiveProducts }, { count: blogPosts }] = await Promise.all([
         supabase.from('products').select('*', { count: 'exact', head: true }).not('category_id', 'is', null),
         supabase.from('products').select('*', { count: 'exact', head: true }).not('category_id', 'is', null).lt('created_at', currentPeriodStart.toISOString()),
         supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published')
      ])

      const currProd = activeProducts || 0
      const prevProd = prevActiveProducts || 0
      
      dashboard.summary.publishedProducts.value = currProd
      dashboard.summary.publishedProducts.previousValue = prevProd
      dashboard.summary.publishedProducts.changePercent = calcChange(currProd, prevProd)

      dashboard.summary.publishedContent.value = blogPosts || 0
    } catch (e) {
      console.error('Products fetch failed', e)
    }

    // 4. Attention Center
    try {
      const { data: missingSeoProducts } = await supabase
        .from('products')
        .select('id, name')
        .not('category_id', 'is', null)
        .limit(10)
      
      const { data: seoRecords } = await supabase
        .from('seo_metadata')
        .select('page_id')
        .eq('page_type', 'product')
      
      const seoSet = new Set(seoRecords?.map(s => s.page_id))
      let missingCount = 0
      missingSeoProducts?.forEach(p => {
        if (!seoSet.has(p.id)) missingCount++
      })

      if (missingCount > 0) {
        dashboard.health.seo = 'warning'
        dashboard.attention.push({
          id: 'missing-seo-products',
          title: `${missingCount} ürünün SEO verisi eksik`,
          description: 'Arama motorları bu ürünleri doğru şekilde indeksleyemeyebilir. Arama görünürlüğünü etkiler.',
          impact: 'high',
          priorityScore: 85,
          link: '/admin/seo'
        })
      } else {
        dashboard.health.seo = 'healthy'
      }
    } catch (e) {
      console.error('Attention center fetch failed', e)
    }

    return dashboard
  } catch (e) {
    console.error('Dashboard: getDashboardData failed entirely', e)
    return emptyDashboard
  }
}

