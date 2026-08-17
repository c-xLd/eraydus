'use client'

import { useEffect } from 'react'
import { createClient } from '@/services/supabase/client'
import { toast } from 'sonner'
import { Mail, Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function RealtimeNotifications() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    
    // Listen to inserts on messages table
    const messageChannel = supabase.channel('realtime-messages')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, (payload) => {
        const newMessage = payload.new as any
        toast.info(
          <div className="flex flex-col gap-1 w-full">
            <span className="font-medium flex items-center gap-1.5"><Mail className="size-4 text-blue-500" /> Yeni İletişim Mesajı!</span>
            <span className="text-sm text-gray-600 line-clamp-1">{newMessage.name}: {newMessage.message}</span>
          </div>, 
          {
            duration: 6000,
            action: {
              label: 'Göster',
              onClick: () => router.push('/admin/messages')
            }
          }
        )
      })
      .subscribe()

    // Listen to inserts on notifications table (for other system events)
    const notificationChannel = supabase.channel('realtime-notifications')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
        const newNotif = payload.new as any
        // If it's a contact notification, we already show it via messages channel. Avoid duplicate toast.
        if (newNotif.notification_type === 'new_contact') return

        toast.info(
          <div className="flex flex-col gap-1 w-full">
            <span className="font-medium flex items-center gap-1.5"><Bell className="size-4 text-amber-500" /> {newNotif.title}</span>
            <span className="text-sm text-gray-600 line-clamp-1">{newNotif.message}</span>
          </div>, 
          { duration: 5000 }
        )
      })
      .subscribe()

    return () => {
      supabase.removeChannel(messageChannel)
      supabase.removeChannel(notificationChannel)
    }
  }, [router])

  return null
}
