"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import Link from "next/link"
import { createClient } from "@/lib/client"

export function NotificationBell() {
  const [unreadCount, setUnreadCount] = useState(0)
  const supabase = createClient()

  useEffect(() => {
    // Initial fetch
    async function fetchCount() {
      const { count } = await supabase
        .from('notifications')
        .select('*', { count: 'exact', head: true })
        .eq('is_read', false)
      
      if (count !== null) setUnreadCount(count)
    }
    fetchCount()

    // Realtime subscription
    const channel = supabase
      .channel('notifications_bell')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'notifications' }, () => {
        // Just re-fetch count when any notification changes
        fetchCount()
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  return (
    <Link
      href="/admin/notifications"
      className="relative p-2 text-black/50 hover:text-black hover:bg-black/5 rounded-full transition-all block"
      title="Bildirimler"
    >
      <Bell className="size-5" strokeWidth={2} />
      {unreadCount > 0 && (
        <span className="absolute -top-1 -right-1 min-w-[20px] h-[20px] flex items-center justify-center bg-red-500 text-white text-[10px] font-bold rounded-full border-2 border-white px-1">
          {unreadCount > 99 ? '99+' : unreadCount}
        </span>
      )}
    </Link>
  )
}
