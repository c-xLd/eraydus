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
        }).catch(() => {})
      }, 500)
      
      return () => clearTimeout(timer)
    }
  }, [pathname])

  // Global click listener to track WhatsApp and phone clicks
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      // Find closest anchor tag
      const target = (e.target as Element).closest('a')
      if (!target || !target.href) return

      const href = target.href
      let event_name = ''
      
      if (href.includes('wa.me') || href.includes('whatsapp.com')) {
        event_name = 'whatsapp_click'
      } else if (href.startsWith('tel:')) {
        event_name = 'phone_click'
      } else if (href.startsWith('mailto:')) {
        event_name = 'email_click'
      } else if (target.classList.contains('whatsapp-cta')) {
        event_name = 'whatsapp_click'
      }

      if (event_name) {
        const sessionId = getOrCreateSessionId()
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event_name,
            session_id: sessionId,
            page_url: window.location.pathname,
            referrer: document.referrer || '',
            device_type: getDeviceType()
          }),
        }).catch(() => {})
      }
    }

    document.addEventListener('click', handleGlobalClick)
    return () => document.removeEventListener('click', handleGlobalClick)
  }, [])

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
