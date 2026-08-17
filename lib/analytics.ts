"use client"

import { v4 as uuidv4 } from 'uuid'

export function getOrCreateSessionId() {
  if (typeof window === 'undefined') return 'server-session'
  let sessionId = localStorage.getItem('analytics_session_id')
  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem('analytics_session_id', sessionId)
  }
  return sessionId
}

export function getDeviceType() {
  if (typeof window === 'undefined') return 'desktop'
  const ua = navigator.userAgent
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}

export async function trackEvent(eventName: string, payload: any = {}) {
  try {
    const sessionId = getOrCreateSessionId()
    
    await fetch('/api/track', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event_name: eventName,
        session_id: sessionId,
        page_url: window.location.pathname,
        device_type: getDeviceType(),
        ...payload
      }),
    })
  } catch (error) {
    console.error('Failed to track event', error)
  }
}
