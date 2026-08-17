"use client"

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { getDeviceType, getOrCreateSessionId } from '@/lib/analytics'

export function Tracker() {
  const pathname = usePathname()
  const lastPathnameRef = useRef(pathname)

  useEffect(() => {
    const sessionId = getOrCreateSessionId()
    
    // Only track if pathname changed to avoid strict mode double renders
    if (pathname !== lastPathnameRef.current || !window.sessionStorage.getItem('initial_page_view_sent')) {
       window.sessionStorage.setItem('initial_page_view_sent', 'true')
       lastPathnameRef.current = pathname
       
       const timer = setTimeout(() => {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name: 'page_view',
            session_id: sessionId,
            page_url: pathname,
            page_title: document.title || pathname,
            referrer: document.referrer || '',
            device_type: getDeviceType()
          }),
        }).catch((err) => console.error('Tracking failed', err))
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Heartbeat mechanism to keep session active (for real-time active users count)
  useEffect(() => {
    const interval = setInterval(() => {
      const sessionId = getOrCreateSessionId()
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'heartbeat',
          session_id: sessionId,
          page_url: window.location.pathname,
          device_type: getDeviceType()
        }),
      }).catch(() => {})
    }, 30000) // Send heartbeat every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return null
}
