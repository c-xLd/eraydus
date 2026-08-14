'use client'

import { useEffect, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/services/supabase/client'

export function SessionTimeout({ timeoutMinutes = 30 }: { timeoutMinutes?: number }) {
  const router = useRouter()
  const timeoutMs = timeoutMinutes * 60 * 1000
  const timeoutId = useRef<NodeJS.Timeout | null>(null)

  const handleLogout = useCallback(async () => {
    try {
      const supabase = createClient()
      await supabase.auth.signOut()
      router.push('/giris')
      router.refresh()
    } catch (err) {
      console.error('Logout error on timeout:', err)
    }
  }, [router])

  const resetTimer = useCallback(() => {
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
    }
    timeoutId.current = setTimeout(handleLogout, timeoutMs)
  }, [handleLogout, timeoutMs])

  useEffect(() => {
    resetTimer()

    const events = ['mousemove', 'mousedown', 'keypress', 'scroll', 'touchstart']
    
    events.forEach(event => {
      window.addEventListener(event, resetTimer, { passive: true })
    })

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current)
      }
      events.forEach(event => {
        window.removeEventListener(event, resetTimer)
      })
    }
  }, [resetTimer])

  return null
}
