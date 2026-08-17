import { createClient } from '@/lib/server'
import NotificationsDashboard from './components/NotificationsDashboard'

export const metadata = {
  title: 'Bildirimler | Erayduş Admin',
}

export default async function NotificationsPage() {
  const supabase = await createClient()

  // Fetch initial notifications (Server Component)
  const { data: notifications, error } = await supabase
    .from('notifications')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(50)

  if (error) {
    console.error('Bildirimler yüklenirken hata oluştu:', error)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bildirim Merkezi</h1>
          <p className="text-sm text-gray-500 mt-1">Sistem, sipariş, teklif ve diğer önemli olayları buradan takip edebilirsiniz.</p>
        </div>
      </div>

      <NotificationsDashboard initialNotifications={(notifications as any[]) || []} />
    </div>
  )
}
