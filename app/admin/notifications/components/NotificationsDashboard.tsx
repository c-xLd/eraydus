"use client"

import { useState, useEffect, useMemo } from 'react'
import { createClient } from '@/lib/client'
import { 
  Bell, CheckCircle2, Circle, AlertTriangle, AlertCircle, Info, 
  Trash2, MailOpen, Mail, Filter, Search, Loader2 
} from 'lucide-react'
import { toast } from 'sonner'
import Link from 'next/link'
import { 
  markNotificationAsRead, 
  markNotificationAsUnread, 
  deleteNotification, 
  markAllAsRead, 
  bulkDeleteNotifications, 
  bulkMarkAsRead, 
  bulkMarkAsUnread 
} from '../actions'

type Notification = {
  id: string
  title: string
  message: string
  notification_type: string
  priority: string
  is_read: boolean
  status: string
  created_at: string
  action_url?: string
}

export default function NotificationsDashboard({ initialNotifications }: { initialNotifications: Notification[] }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications)
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState('ALL')
  const [isPending, setIsPending] = useState(false)
  
  const supabase = createClient()

  // Realtime subscription
  useEffect(() => {
    const channel = supabase
      .channel('notifications_realtime')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'notifications' }, (payload) => {
        const newNotif = payload.new as Notification
        setNotifications(prev => [newNotif, ...prev])
        toast.info(newNotif.title, { description: newNotif.message })
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'notifications' }, (payload) => {
        const updatedNotif = payload.new as Notification
        setNotifications(prev => prev.map(n => n.id === updatedNotif.id ? updatedNotif : n))
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'notifications' }, (payload) => {
        const deletedId = payload.old.id
        setNotifications(prev => prev.filter(n => n.id !== deletedId))
        setSelectedIds(prev => {
          const newSet = new Set(prev)
          newSet.delete(deletedId)
          return newSet
        })
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  // Filtered and searched data
  const filteredNotifications = useMemo(() => {
    let result = notifications

    if (filterStatus === 'UNREAD') result = result.filter(n => !n.is_read)
    if (filterStatus === 'READ') result = result.filter(n => n.is_read)
    
    if (search.trim()) {
      const q = search.toLowerCase()
      result = result.filter(n => 
        (n.title && n.title.toLowerCase().includes(q)) || 
        (n.message && n.message.toLowerCase().includes(q))
      )
    }

    return result
  }, [notifications, search, filterStatus])

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredNotifications.length && filteredNotifications.length > 0) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filteredNotifications.map(n => n.id)))
    }
  }

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds)
    if (newSet.has(id)) newSet.delete(id)
    else newSet.add(id)
    setSelectedIds(newSet)
  }

  const handleMarkAllAsRead = async () => {
    setIsPending(true)
    const res = await markAllAsRead()
    if (res.success) toast.success(`${res.count} bildirim okundu olarak işaretlendi.`)
    else toast.error('Hata oluştu', { description: res.error })
    setIsPending(false)
  }

  const handleBulkAction = async (action: 'READ' | 'UNREAD' | 'DELETE') => {
    if (selectedIds.size === 0) return
    setIsPending(true)
    
    const ids = Array.from(selectedIds)
    let res: any
    
    if (action === 'READ') res = await bulkMarkAsRead(ids)
    if (action === 'UNREAD') res = await bulkMarkAsUnread(ids)
    if (action === 'DELETE') {
      if (!confirm(`${ids.length} bildirimi silmek istediğinize emin misiniz?`)) {
        setIsPending(false)
        return
      }
      res = await bulkDeleteNotifications(ids)
    }

    if (res.success) {
      toast.success(`${res.count} bildirim güncellendi.`)
      setSelectedIds(new Set())
    } else {
      toast.error('İşlem başarısız.', { description: res.error })
    }
    
    setIsPending(false)
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'CRITICAL': return <AlertTriangle className="size-5 text-red-500" />
      case 'HIGH': return <AlertCircle className="size-5 text-orange-500" />
      default: return <Info className="size-5 text-blue-500" />
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-180px)] min-h-[600px]">
      
      {/* Toolbar */}
      <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50/50">
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Bildirimlerde ara..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
            />
          </div>
          
          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black/5"
          >
            <option value="ALL">Tümü</option>
            <option value="UNREAD">Okunmamış</option>
            <option value="READ">Okunanlar</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          {selectedIds.size > 0 ? (
            <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
              <span className="text-sm font-medium text-gray-600 mr-2">{selectedIds.size} seçildi</span>
              <button onClick={() => handleBulkAction('READ')} disabled={isPending} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Okundu İşaretle">
                <MailOpen className="size-4" />
              </button>
              <button onClick={() => handleBulkAction('UNREAD')} disabled={isPending} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Okunmadı İşaretle">
                <Mail className="size-4" />
              </button>
              <button onClick={() => handleBulkAction('DELETE')} disabled={isPending} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="Sil">
                <Trash2 className="size-4" />
              </button>
            </div>
          ) : (
            <button 
              onClick={handleMarkAllAsRead} 
              disabled={isPending || notifications.filter(n => !n.is_read).length === 0}
              className="text-sm font-medium px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Tümünü Okundu Yap
            </button>
          )}
        </div>
      </div>

      {/* List Header */}
      <div className="px-6 py-3 border-b border-gray-100 bg-white grid grid-cols-[40px_1fr_120px] gap-4 items-center">
        <input 
          type="checkbox" 
          checked={filteredNotifications.length > 0 && selectedIds.size === filteredNotifications.length}
          onChange={toggleSelectAll}
          className="rounded border-gray-300 text-black focus:ring-black/20"
        />
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Bildirim</span>
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Tarih</span>
      </div>

      {/* List Body */}
      <div className="flex-1 overflow-y-auto bg-white">
        {filteredNotifications.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-8">
            <div className="size-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <Bell className="size-8 text-gray-300" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              {search || filterStatus !== 'ALL' ? 'Eşleşen bildirim bulunamadı.' : 'Hiç bildiriminiz yok.'}
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-sm">
              Sistem uyarıları, teklif bildirimleri ve diğer önemli olaylar burada listelenir.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredNotifications.map((notif) => (
              <div 
                key={notif.id} 
                className={`px-6 py-4 grid grid-cols-[40px_1fr_120px] gap-4 items-start group transition-colors ${notif.is_read ? 'bg-white hover:bg-gray-50/50' : 'bg-blue-50/30 hover:bg-blue-50/50'}`}
              >
                <div className="pt-1">
                  <input 
                    type="checkbox" 
                    checked={selectedIds.has(notif.id)}
                    onChange={() => toggleSelect(notif.id)}
                    className="rounded border-gray-300 text-black focus:ring-black/20 cursor-pointer"
                  />
                </div>
                
                <div className="flex gap-4">
                  <div className="pt-0.5">
                    {getPriorityIcon(notif.priority)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-sm font-semibold ${notif.is_read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notif.title}
                      </span>
                      {!notif.is_read && (
                        <span className="size-2 bg-blue-500 rounded-full" />
                      )}
                      <span className="text-[10px] font-medium px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                        {notif.notification_type || 'SYSTEM'}
                      </span>
                    </div>
                    <p className={`text-sm ${notif.is_read ? 'text-gray-500' : 'text-gray-700'}`}>
                      {notif.message}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-3">
                      {notif.action_url && (
                        <Link href={notif.action_url} className="text-xs font-medium text-blue-600 hover:text-blue-700">
                          Detayları Gör &rarr;
                        </Link>
                      )}
                      
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-3">
                        <button 
                          onClick={() => notif.is_read ? markNotificationAsUnread(notif.id) : markNotificationAsRead(notif.id)}
                          className="text-xs font-medium text-gray-500 hover:text-black"
                        >
                          {notif.is_read ? 'Okunmadı İşaretle' : 'Okundu İşaretle'}
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm('Bu bildirimi silmek istediğinize emin misiniz?')) {
                              deleteNotification(notif.id)
                            }
                          }}
                          className="text-xs font-medium text-gray-500 hover:text-red-600"
                        >
                          Sil
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right text-xs text-gray-400 font-medium whitespace-nowrap pt-1">
                  {new Date(notif.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
