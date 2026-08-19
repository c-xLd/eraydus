"use client"

import { useEffect } from 'react'
import { getDeviceType, getOrCreateSessionId } from '@/lib/analytics'

export function ProductTracker({ 
  productId, 
  categoryId,
  title
}: { 
  productId: string
  categoryId?: string | null
  title?: string
}) {
  useEffect(() => {
    // Small delay to ensure route transition is fully complete
    const timer = setTimeout(() => {
      const sessionId = getOrCreateSessionId()
      
      fetch('/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event_name: 'product_view',
          session_id: sessionId,
          page_url: window.location.pathname,
          page_title: title || document.title,
          referrer: document.referrer || '',
          device_type: getDeviceType(),
          product_id: productId,
          category_id: categoryId || undefined
        }),
      }).catch((err) => console.error('Product Tracking failed', err))
    }, 1000)

    return () => clearTimeout(timer)
  }, [productId, categoryId, title])

  return null
}
