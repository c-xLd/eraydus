import { createClient } from '@/lib/server'
import RealtimeDashboard from './components/RealtimeDashboard'

export const metadata = {
  title: 'Gerçek Zamanlı Analitikler | Erayduş Admin',
}

export default async function AnalyticsPage() {
  const supabase = await createClient()

  // Fetch initial active users (unique sessions in last 60 seconds)
  const sixtySecondsAgo = new Date(Date.now() - 60000).toISOString()
  
  const { data: recentEvents, error } = await supabase
    .from('analytics_events')
    .select('session_id, page_url, device_type, created_at, event_name')
    .gte('created_at', sixtySecondsAgo)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching analytics:', error)
  }

  return (
    <RealtimeDashboard initialEvents={recentEvents || []} />
  )
}
