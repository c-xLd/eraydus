"use client"

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/client'
import { Globe, Users, Clock, Monitor, Smartphone, Tablet } from 'lucide-react'

type AnalyticsEvent = {
  id?: string
  session_id: string
  event_name: string
  page_url: string
  device_type: string
  created_at: string
  local_received_at?: number
}

export default function RealtimeDashboard({ initialEvents }: { initialEvents: AnalyticsEvent[] }) {
  // Add a local timestamp to prevent client-server clock skew from instantly hiding events
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => 
    initialEvents.map(e => ({ ...e, local_received_at: Date.now() }))
  )
  const supabase = createClient()

  useEffect(() => {
    // Purge events older than 60 seconds every second to keep the "active" count accurate
    const interval = setInterval(() => {
      setEvents(current => {
        const sixtySecondsAgo = Date.now() - 60000
        return current.filter(e => (e.local_received_at || Date.now()) > sixtySecondsAgo)
      })
    }, 1000)

    // Subscribe to new events
    const channel = supabase
      .channel('analytics_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_events' }, (payload) => {
        const newEvent = payload.new as AnalyticsEvent
        newEvent.local_received_at = Date.now()
        setEvents(current => [newEvent, ...current])
      })
      .subscribe()

    return () => {
      clearInterval(interval)
      supabase.removeChannel(channel)
    }
  }, [supabase])

  // Derive metrics
  const activeSessions = useMemo(() => {
    const sessionMap = new Map<string, AnalyticsEvent>()
    // Since events are sorted newest first (usually), the first we see per session is their latest state
    events.forEach(e => {
      if (!sessionMap.has(e.session_id)) {
        sessionMap.set(e.session_id, e)
      }
    })
    return Array.from(sessionMap.values())
  }, [events])

  const topPages = useMemo(() => {
    const pageCounts = new Map<string, number>()
    activeSessions.forEach(session => {
      pageCounts.set(session.page_url, (pageCounts.get(session.page_url) || 0) + 1)
    })
    return Array.from(pageCounts.entries())
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
  }, [activeSessions])

  const deviceCounts = useMemo(() => {
    const counts = { desktop: 0, mobile: 0, tablet: 0 }
    activeSessions.forEach(session => {
      if (session.device_type === 'mobile') counts.mobile++
      else if (session.device_type === 'tablet') counts.tablet++
      else counts.desktop++
    })
    return counts
  }, [activeSessions])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Gerçek Zamanlı Analitikler</h1>
          <p className="text-sm text-gray-500 mt-1">Sitenizdeki anlık ziyaretçileri canlı izleyin.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-200">
          <span className="relative flex size-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-2.5 bg-green-500"></span>
          </span>
          Canlı Bağlantı
        </div>
      </div>

      {activeSessions.length === 0 ? (
        <div className="bg-white p-12 rounded-2xl border border-gray-100 shadow-sm text-center flex flex-col items-center justify-center">
          <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Users className="size-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Şu anda aktif ziyaretçi yok</h3>
          <p className="text-gray-500 mt-2 max-w-sm text-sm">Sitenize bir ziyaretçi girdiğinde burada gerçek zamanlı olarak belirecektir.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center py-10">
              <p className="text-sm font-medium text-gray-500 mb-2">Şu Anda Sitede</p>
              <p className="text-7xl font-bold text-gray-900">{activeSessions.length}</p>
              <p className="text-sm text-gray-500 mt-2">Aktif Ziyaretçi</p>
            </div>

            <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Monitor className="size-4 text-gray-500" /> 
                Cihaz Dağılımı
              </h3>
              <div className="grid grid-cols-3 gap-4 h-full pb-4">
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4">
                  <Monitor className="size-6 text-gray-400 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{deviceCounts.desktop}</p>
                  <p className="text-xs text-gray-500">Masaüstü</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4">
                  <Smartphone className="size-6 text-gray-400 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{deviceCounts.mobile}</p>
                  <p className="text-xs text-gray-500">Mobil</p>
                </div>
                <div className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-4">
                  <Tablet className="size-6 text-gray-400 mb-2" />
                  <p className="text-2xl font-bold text-gray-900">{deviceCounts.tablet}</p>
                  <p className="text-xs text-gray-500">Tablet</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Globe className="size-4 text-gray-500" /> 
                Görüntülenen Sayfalar
              </h3>
              <div className="space-y-1">
                {topPages.map((page, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700 truncate max-w-[70%]">{page.url || '/'}</span>
                    <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full">{page.count}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="size-4 text-gray-500" /> 
                Son Olaylar (Log)
              </h3>
              <div className="space-y-3 h-[250px] overflow-y-auto pr-2">
                {events.slice(0, 50).map((event, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <span className="text-gray-400 whitespace-nowrap font-mono text-xs mt-0.5">
                      {new Date(event.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </span>
                    <div>
                      <span className="font-medium text-gray-900">
                        {event.event_name === 'page_view' ? 'Sayfa Görüntüleme' :
                         event.event_name === 'heartbeat' ? 'Sitede Bekliyor' :
                         event.event_name === 'whatsapp_click' ? 'WhatsApp Tıklaması' :
                         event.event_name === 'product_view' ? 'Ürün Görüntüleme' : event.event_name}
                      </span>
                      <span className="text-gray-500 block text-xs truncate max-w-[200px]">{event.page_url}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-center">
             <h3 className="text-sm font-semibold text-gray-900 mb-2">Performans (Core Web Vitals)</h3>
             <p className="text-sm text-gray-500">Henüz yeterli gerçek kullanıcı verisi (RUM) oluşmadı.</p>
          </div>
        </>
      )}
    </div>
  )
}
