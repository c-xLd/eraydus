'use client'
import { useEffect } from 'react'

export function FramerMotionFix() {
  useEffect(() => {
    const trigger = () => {
      window.dispatchEvent(new Event('scroll'))
      window.dispatchEvent(new Event('resize'))
    }
    setTimeout(trigger, 100)
    setTimeout(trigger, 500)
    setTimeout(trigger, 1000)
    setTimeout(trigger, 2000)
  }, [])
  return null
}
