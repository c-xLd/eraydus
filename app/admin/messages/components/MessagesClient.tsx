'use client'

import { useState } from 'react'
import { Mail, Phone, Trash2, MailOpen, MailCheck, Search, Clock, Tag } from 'lucide-react'
import { markAsRead, deleteMessage } from '@/features/messages/actions'
import { toast } from 'sonner'

type Message = {
  id: string
  name: string
  email: string
  phone?: string
  subject: string
  message: string
  created_at: string
  is_read: boolean
}

const subjectLabels: Record<string, { label: string; color: string }> = {
  genel:  { label: 'Genel Bilgi',     color: 'bg-blue-50 text-blue-700 border-blue-200' },
  fiyat:  { label: 'Fiyat Teklifi',   color: 'bg-amber-50 text-amber-700 border-amber-200' },
  mimar:  { label: 'Mimar Portal',    color: 'bg-purple-50 text-purple-700 border-purple-200' },
  bayi:   { label: 'Bayi Başvurusu',  color: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
}

export function MessagesClient({ initialMessages }: { initialMessages: Message[] }) {
  const [messages, setMessages] = useState(initialMessages)
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [expanded, setExpanded] = useState<string | null>(null)

  const filtered = messages.filter(m => {
    const matchSearch =
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.message.toLowerCase().includes(search.toLowerCase())
    const matchFilter =
      filter === 'all' ? true : filter === 'unread' ? !m.is_read : m.is_read
    return matchSearch && matchFilter
  })

  const unreadCount = messages.filter(m => !m.is_read).length

  const handleRead = async (id: string) => {
    setLoadingId(id)
    const res = await markAsRead(id)
    if (res.success) {
      setMessages(messages.map(m => m.id === id ? { ...m, is_read: true } : m))
    } else {
      toast.error('İşlem başarısız.')
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bu mesajı kalıcı olarak silmek istediğinize emin misiniz?')) return
    setLoadingId(id)
    const res = await deleteMessage(id)
    if (res.success) {
      toast.success('Mesaj silindi.')
      setMessages(messages.filter(m => m.id !== id))
      if (expanded === id) setExpanded(null)
    } else {
      toast.error('Silme işlemi başarısız.')
    }
    setLoadingId(null)
  }

  return (
    <div className="space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
        {/* Filter tabs */}
        <div className="flex gap-1 p-1 bg-gray-100 rounded-xl">
          {([
            { key: 'all',    label: 'Tümü',      count: messages.length },
            { key: 'unread', label: 'Okunmamış',  count: unreadCount },
            { key: 'read',   label: 'Okunmuş',    count: messages.length - unreadCount },
          ] as const).map(tab => (
            <button
              key={tab.key}
              onClick={() => setFilter(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                filter === tab.key
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                filter === tab.key ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-500'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="İsim, e-posta, mesaj ara…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full h-9 pl-9 pr-4 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:border-gray-400 transition-colors"
          />
        </div>
      </div>

      {/* List */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden divide-y divide-gray-100">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <Mail className="size-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">Mesaj bulunamadı.</p>
          </div>
        ) : filtered.map(msg => {
          const isExpanded = expanded === msg.id
          const isLoading = loadingId === msg.id
          const subject = subjectLabels[msg.subject]

          return (
            <div
              key={msg.id}
              className={`transition-colors ${isLoading ? 'opacity-50 pointer-events-none' : ''} ${!msg.is_read ? 'bg-blue-50/40' : ''}`}
            >
              {/* Row */}
              <div
                className="flex items-start gap-4 px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setExpanded(isExpanded ? null : msg.id)
                  if (!msg.is_read) handleRead(msg.id)
                }}
              >
                {/* Unread dot */}
                <div className="mt-1.5 shrink-0">
                  {msg.is_read
                    ? <MailOpen className="size-5 text-gray-300" />
                    : <div className="size-2.5 rounded-full bg-blue-500 mt-1" />
                  }
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className={`font-semibold text-sm ${msg.is_read ? 'text-gray-700' : 'text-gray-900'}`}>
                      {msg.name}
                    </span>
                    {subject && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border ${subject.color}`}>
                        <Tag className="size-3" />
                        {subject.label}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm truncate ${msg.is_read ? 'text-gray-400' : 'text-gray-600'}`}>
                    {msg.message}
                  </p>
                </div>

                {/* Meta */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className="flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="size-3" />
                    {new Date(msg.created_at).toLocaleDateString('tr-TR', {
                      day: 'numeric', month: 'short', year: 'numeric'
                    })}
                  </span>
                  <div className="flex gap-1" onClick={e => e.stopPropagation()}>
                    {!msg.is_read && (
                      <button
                        onClick={() => handleRead(msg.id)}
                        className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
                        title="Okundu işaretle"
                      >
                        <MailCheck className="size-3.5" />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(msg.id)}
                      className="p-1.5 rounded-lg bg-red-50 text-red-500 hover:bg-red-100 transition-colors"
                      title="Sil"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-1">E-posta</p>
                      <a href={`mailto:${msg.email}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1.5">
                        <Mail className="size-3.5" /> {msg.email}
                      </a>
                    </div>
                    {msg.phone && (
                      <div>
                        <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-1">Telefon</p>
                        <a href={`tel:${msg.phone}`} className="text-sm text-blue-600 hover:underline flex items-center gap-1.5">
                          <Phone className="size-3.5" /> {msg.phone}
                        </a>
                      </div>
                    )}
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-1">Tarih</p>
                      <p className="text-sm text-gray-700">
                        {new Date(msg.created_at).toLocaleDateString('tr-TR', {
                          day: 'numeric', month: 'long', year: 'numeric',
                          hour: '2-digit', minute: '2-digit'
                        })}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-medium mb-2">Mesaj</p>
                    <p className="text-sm text-gray-800 whitespace-pre-wrap leading-relaxed bg-white border border-gray-200 rounded-xl p-4">
                      {msg.message}
                    </p>
                  </div>
                  <div className="mt-4 flex gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-xl hover:bg-gray-700 transition-colors"
                    >
                      <Mail className="size-4" /> Yanıtla
                    </a>
                    {msg.phone && (
                      <a
                        href={`https://wa.me/${msg.phone.replace(/\D/g, '')}?text=Merhaba ${msg.name}, mesajınız için teşekkürler.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-xl hover:bg-[#128C7E] transition-colors"
                      >
                        WhatsApp
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
