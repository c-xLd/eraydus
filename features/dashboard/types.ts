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

export interface DashboardData {
  customers: {
    total: number
    newInPeriod: number
    changePercent: number
    recent: any[]
  }
  quotes: {
    total: number
    pending: number
    accepted: number
    rejected: number
    changePercent: number
    recent: any[]
  }
  products: {
    total: number
    active: number
    inSitemap: number
    missingSeo: number
    orphan: number
    lowStock: number
  }
  activities: any[]
}
