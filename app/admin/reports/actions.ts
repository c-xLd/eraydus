"use server"

import { createAdminClient } from '@/services/supabase/server'

export async function getAnalyticsReport(dateRange: 'today' | 'yesterday' | '7d' | '30d') {
  try {
    const supabase = createAdminClient()
    
    // Calculate start date
    const now = new Date()
    let startDate = new Date()
    let endDate = new Date()

    if (dateRange === 'today') {
      startDate.setHours(0, 0, 0, 0)
    } else if (dateRange === 'yesterday') {
      startDate.setDate(now.getDate() - 1)
      startDate.setHours(0, 0, 0, 0)
      endDate.setDate(now.getDate() - 1)
      endDate.setHours(23, 59, 59, 999)
    } else if (dateRange === '7d') {
      startDate.setDate(now.getDate() - 7)
    } else if (dateRange === '30d') {
      startDate.setDate(now.getDate() - 30)
    }

    const { data: events, error } = await supabase
      .from('analytics_events')
      .select('*')
      .gte('created_at', startDate.toISOString())
      .lte('created_at', endDate.toISOString())

    if (error) throw error

    if (!events || events.length === 0) {
      return { success: true, data: { totalViews: 0 } }
    }

    const totalViews = events.filter(e => e.event_name === 'page_view').length
    const productViews = events.filter(e => e.event_name === 'product_view').length
    const whatsappClicks = events.filter(e => e.event_name === 'whatsapp_click').length
    
    const uniqueSessions = new Set(events.map(e => e.session_id)).size

    const pageCounts = new Map<string, number>()
    const deviceCounts = { desktop: 0, mobile: 0 }
    
    // Process unique sessions for device counts to avoid inflation from many events by same session
    const processedSessions = new Set<string>()

    events.forEach(e => {
      if (e.event_name === 'page_view' && e.page_url) {
        pageCounts.set(e.page_url, (pageCounts.get(e.page_url) || 0) + 1)
      }
      
      if (!processedSessions.has(e.session_id)) {
        processedSessions.add(e.session_id)
        if (e.device_type === 'mobile') deviceCounts.mobile++
        else deviceCounts.desktop++
      }
    })

    const topPages = Array.from(pageCounts.entries())
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)

    // Generate chart data (group by day or hour depending on range)
    const chartMap = new Map<string, number>()
    
    events.filter(e => e.event_name === 'page_view').forEach(e => {
      const date = new Date(e.created_at)
      let key = ''
      if (dateRange === 'today' || dateRange === 'yesterday') {
        key = date.toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }) // Hour level
      } else {
        key = date.toLocaleDateString('tr-TR', { day: '2-digit', month: 'short' }) // Day level
      }
      chartMap.set(key, (chartMap.get(key) || 0) + 1)
    })

    const chartData = Array.from(chartMap.entries())
      .map(([date, views]) => ({ date, views }))

    return { 
      success: true, 
      data: {
        totalViews,
        productViews,
        whatsappClicks,
        uniqueSessions,
        topPages,
        deviceCounts,
        chartData
      }
    }
  } catch (err: any) {
    console.error("Report fetch error:", err)
    return { success: false, error: err.message }
  }
}
