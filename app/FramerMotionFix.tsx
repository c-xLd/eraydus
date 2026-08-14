'use client'
import { useEffect } from 'react'

export function FramerMotionFix() {
  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Non-blocking idle update to prevent main thread reflow thrashing during page load
    if ('requestIdleCallback' in window) {
      const handle = window.requestIdleCallback(() => {
        window.dispatchEvent(new Event('resize'))
      }, { timeout: 2000 })
      return () => window.cancelIdleCallback(handle)
    }
  }, [])
  return null
}
