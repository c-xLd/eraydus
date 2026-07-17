import { createClient } from '@/lib/server'
import NotificationsClient from './components/NotificationsClient'

export const metadata = {
  title: 'Bildirimler | Erayduş Admin',
}

export default async function NotificationsPage() {
  const supabase = await createClient()

  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching notifications:', error)
  }

  return (
    <NotificationsClient initialNotifications={notifications || []} />
  )
}
