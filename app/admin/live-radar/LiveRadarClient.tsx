'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/services/supabase/client'
import { MonitorSmartphone, Globe, Clock, User, LogOut } from 'lucide-react'
import { Card } from '@/components/ui/card'

function formatDistanceToNowNative(dateString: string) {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((date.getTime() - now.getTime()) / 1000)
  
  const rtf = new Intl.RelativeTimeFormat('tr', { numeric: 'auto' })
  
  if (Math.abs(diffInSeconds) < 60) {
    return 'Az önce'
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (Math.abs(diffInMinutes) < 60) {
    return rtf.format(diffInMinutes, 'minute')
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60)
  if (Math.abs(diffInHours) < 24) {
    return rtf.format(diffInHours, 'hour')
  }
  
  const diffInDays = Math.floor(diffInHours / 24)
  return rtf.format(diffInDays, 'day')
}

interface VisitorPresence {
  presence_ref: string
  visitorId: string
  pathname: string
  title: string
  timestamp: string
  userAgent: string
}

export function LiveRadarClient() {
  const [visitors, setVisitors] = useState<VisitorPresence[]>([])
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    const room = supabase.channel('online-visitors')

    room.on('presence', { event: 'sync' }, () => {
      const state = room.presenceState()
      // Flatten the state to an array of visitors
      const currentVisitors: VisitorPresence[] = []
      
      Object.keys(state).forEach((key) => {
        // key is visitorId (or presence_ref depending on how Supabase manages it)
        const presences = state[key] as any[]
        // We take the latest presence for this visitor
        if (presences && presences.length > 0) {
          currentVisitors.push({
            visitorId: key,
            presence_ref: presences[0].presence_ref,
            pathname: presences[0].pathname,
            title: presences[0].title,
            timestamp: presences[0].timestamp,
            userAgent: presences[0].userAgent,
          })
        }
      })
      
      // Sort by timestamp (newest activity first)
      currentVisitors.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      
      setVisitors(currentVisitors)
    })

    room.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        setConnected(true)
      } else {
        setConnected(false)
      }
    })

    return () => {
      room.unsubscribe()
    }
  }, [])

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6 flex flex-col gap-1 border-emerald-100 bg-emerald-50/50">
          <span className="text-sm font-medium text-emerald-600 flex items-center gap-2">
            <MonitorSmartphone className="size-4" /> Aktif Ziyaretçi
          </span>
          <span className="text-4xl font-bold text-gray-900">{visitors.length}</span>
        </Card>
        
        <Card className="p-6 flex flex-col gap-1">
          <span className="text-sm font-medium text-gray-500 flex items-center gap-2">
            <Globe className="size-4" /> Bağlantı Durumu
          </span>
          <span className="text-xl font-semibold text-gray-900 mt-2">
            {connected ? (
              <span className="text-emerald-500 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" /> Canlı
              </span>
            ) : (
              <span className="text-amber-500 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Bağlanıyor...
              </span>
            )}
          </span>
        </Card>
      </div>

      {/* Visitors List */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50/80 text-gray-500 font-medium border-b border-gray-100">
              <tr>
                <th className="px-6 py-4">Ziyaretçi Kimliği</th>
                <th className="px-6 py-4">Bulunduğu Sayfa</th>
                <th className="px-6 py-4">Son Hareket</th>
                <th className="px-6 py-4">Cihaz / Tarayıcı</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {visitors.map((v) => (
                <tr key={v.visitorId} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                        {v.visitorId.substring(0, 2)}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-medium text-gray-900 font-mono text-xs">
                          {v.visitorId.split('-')[0] || v.visitorId.substring(0, 8)}
                        </span>
                        <span className="text-xs text-emerald-500">Çevrimiçi</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">{v.title}</span>
                      <a 
                        href={v.pathname} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-gray-400 text-xs hover:text-blue-500 transition-colors mt-0.5"
                      >
                        {v.pathname}
                      </a>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">
                    <div className="flex items-center gap-1.5">
                      <Clock className="size-3.5 text-gray-400" />
                      {formatDistanceToNowNative(v.timestamp)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-xs text-gray-500 max-w-[200px] truncate" title={v.userAgent}>
                      {v.userAgent}
                    </div>
                  </td>
                </tr>
              ))}
              
              {visitors.length === 0 && connected && (
                <tr>
                  <td colSpan={4} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <LogOut className="size-8 mb-3 opacity-20" />
                      <p>Şu an sitede aktif ziyaretçi bulunmuyor.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}
