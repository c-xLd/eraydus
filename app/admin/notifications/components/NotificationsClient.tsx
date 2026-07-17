"use client"

import { useState } from 'react'
import { Bell, Trash2, CheckCircle2, AlertCircle, Info, Settings } from 'lucide-react'
import { markNotificationAsRead, deleteNotification } from '../actions'
import { toast } from 'sonner'

export default function NotificationsClient({ initialNotifications }: { initialNotifications: any[] }) {
  const [notifications, setNotifications] = useState(initialNotifications)
  const [filterType, setFilterType] = useState('all')
  const [onlyUnread, setOnlyUnread] = useState(false)
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const filteredNotifications = notifications.filter(notif => {
    const typeMatch = filterType === 'all' || notif.notification_type === filterType
    const readMatch = !onlyUnread || !notif.is_read
    return typeMatch && readMatch
  })

  const handleMarkAsRead = async (id: string) => {
    setLoadingId(id)
    const result = await markNotificationAsRead(id)
    setLoadingId(null)
    
    if (result.success) {
      setNotifications(notifications.map(n => n.id === id ? { ...n, is_read: true } : n))
    } else {
      toast.error("Hata: " + result.error)
    }
  }

  const handleDelete = async (id: string) => {
    setLoadingId(id)
    const result = await deleteNotification(id)
    setLoadingId(null)

    if (result.success) {
      setNotifications(notifications.filter(n => n.id !== id))
    } else {
      toast.error("Hata: " + result.error)
    }
  }

  const unreadCount = notifications.filter(n => !n.is_read).length

  const getIcon = (type: string) => {
    switch(type) {
      case 'quote_received': return { icon: AlertCircle, color: 'text-blue-600', bg: 'bg-blue-100' }
      case 'low_stock': return { icon: AlertCircle, color: 'text-orange-600', bg: 'bg-orange-100' }
      case 'new_contact': return { icon: Info, color: 'text-green-600', bg: 'bg-green-100' }
      case 'system': default: return { icon: Info, color: 'text-gray-600', bg: 'bg-gray-100' }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Bildirimler</h1>
          <p className="text-sm text-gray-500 mt-1">Tüm sistem ve iş bildirimlerini yönetin.</p>
        </div>
        <button className="px-4 py-2 bg-white border border-gray-200 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2 text-black">
          <Settings className="size-4" />
          Bildirim Ayarları
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: 'Toplam Bildirim', value: notifications.length, color: 'bg-blue-100 text-blue-700' },
          { title: 'Okunmayan', value: unreadCount, color: 'bg-red-100 text-red-700' },
          { title: 'Tümü', value: notifications.length, color: 'bg-green-100 text-green-700' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color.split(' ')[1]}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex gap-4 flex-wrap">
        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">Tür</label>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/5 text-black"
          >
            <option value="all">Tüm Tipler</option>
            <option value="quote_received">Teklif Talebiniz</option>
            <option value="low_stock">Düşük Stok</option>
            <option value="new_contact">Yeni İletişim</option>
            <option value="system">Sistem</option>
          </select>
        </div>
        <div className="flex items-end gap-4">
          <label className="flex items-center gap-2 cursor-pointer pb-2">
            <input
              type="checkbox"
              checked={onlyUnread}
              onChange={(e) => setOnlyUnread(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm font-medium text-gray-700">Sadece Okunmayan</span>
          </label>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => {
            const { icon: Icon, color, bg } = getIcon(notification.notification_type)
            const isUpdating = loadingId === notification.id

            return (
              <div
                key={notification.id}
                className={`p-4 rounded-xl border transition-colors ${
                  notification.is_read
                    ? 'bg-white border-gray-100 hover:border-gray-200'
                    : 'bg-blue-50 border-blue-200 hover:border-blue-300'
                } ${isUpdating ? 'opacity-50' : ''}`}
              >
                <div className="flex gap-4">
                  <div className={`flex-shrink-0 p-2 rounded-lg ${
                    notification.is_read ? 'bg-gray-100' : bg
                  }`}>
                    <Icon className={`size-5 ${notification.is_read ? 'text-gray-500' : color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <p className="font-semibold text-gray-900">{notification.title}</p>
                        <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-2">{new Date(notification.created_at).toLocaleString('tr-TR')}</p>
                      </div>
                      <span className={`text-xs font-medium px-2 py-1 rounded-full flex-shrink-0 ${
                        notification.is_read ? 'bg-gray-100 text-gray-700' : 'bg-blue-100 text-blue-700'
                      }`}>
                        {notification.is_read ? 'Okundu' : 'Yeni'}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2 flex-shrink-0 ml-4">
                    {!notification.is_read && (
                      <button
                        disabled={isUpdating}
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors disabled:opacity-50"
                        title="Okundu işaretle"
                      >
                        <CheckCircle2 className="size-4" />
                      </button>
                    )}
                    <button
                      disabled={isUpdating}
                      onClick={() => handleDelete(notification.id)}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors disabled:opacity-50"
                      title="Sil"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-100">
            <Bell className="size-12 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">Bildirim yok</p>
          </div>
        )}
      </div>
    </div>
  )
}
