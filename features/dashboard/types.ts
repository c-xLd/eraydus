export interface DateRange {
  from: Date
  to: Date
}

export interface KPIMetric {
  label: string
  value: number | string
  previousValue?: number | string
  changePercent?: number
  trend?: 'up' | 'down' | 'neutral'
}

export type SystemStatus = 'healthy' | 'warning' | 'error' | 'not_configured'

export interface SystemHealth {
  website: SystemStatus
  database: SystemStatus
  authentication: SystemStatus
  storage: SystemStatus
  analytics: SystemStatus
  seo: SystemStatus
}

export interface TrafficSources {
  organic: number
  direct: number
  social: number
  referral: number
  trend: { name: string, organic: number, direct: number, social: number }[]
}

export interface ExecutiveSummary {
  visitors: KPIMetric
  sessions: KPIMetric
  pageViews: KPIMetric
  productViews: KPIMetric
  whatsappClicks: KPIMetric
  organicVisitors: KPIMetric
  publishedProducts: KPIMetric
  publishedContent: KPIMetric
}

export interface AttentionItem {
  id: string
  title: string
  description: string
  impact: 'critical' | 'high' | 'medium' | 'low'
  priorityScore: number
  link: string
}

export interface WhatsAppIntelligence {
  clicks: number
  uniqueClicks: number
  productConversion: number
  topProduct: string | null
  topCategory: string | null
  topSource: string | null
}

export interface DashboardData {
  health: SystemHealth
  summary: ExecutiveSummary
  attention: AttentionItem[]
  whatsapp: WhatsAppIntelligence
  traffic: TrafficSources
  activities: any[]
}
