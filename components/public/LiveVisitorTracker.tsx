'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { createClient } from '@/services/supabase/client'

export function LiveVisitorTracker({ ip = 'Bilinmiyor', location = 'Bilinmiyor' }: { ip?: string, location?: string }) {
  const pathname = usePathname()
  const visitorIdRef = useRef<string>('')
  
  useEffect(() => {
    // Generate or get a persistent visitor ID for the session
    if (!sessionStorage.getItem('visitor_id')) {
      sessionStorage.setItem('visitor_id', crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2))
    }
    visitorIdRef.current = sessionStorage.getItem('visitor_id') || Math.random().toString(36).substring(2)
  }, [])

  useEffect(() => {
    if (!visitorIdRef.current) return

    const supabase = createClient()
    const room = supabase.channel('online-visitors', {
      config: {
        presence: {
          key: visitorIdRef.current,
        },
      },
    })

    room.on('presence', { event: 'sync' }, () => {
      // In the tracker, we just sync but don't need to read the state
    })

    room.subscribe(async (status) => {
      if (status === 'SUBSCRIBED') {
        const title = document.title || 'Erayduş'
        await room.track({
          pathname,
          title,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          ip,
          location
        })
      }
    })

    return () => {
      room.unsubscribe()
    }
  }, [pathname])

  return null
}
