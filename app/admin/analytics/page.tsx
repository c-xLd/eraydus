import { createClient } from '@/lib/server'
import AnalyticsClient from './components/AnalyticsClient'

export const metadata = {
  title: 'Analitikler | Erayduş Admin',
}

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch all analytics records (we can filter in the client for this simple demo)
  const { data: analyticsData, error } = await supabase
    .from('page_analytics')
    .select('*')
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching analytics:', error)
  }

  return (
    <AnalyticsClient initialData={analyticsData || []} />
  )
}
