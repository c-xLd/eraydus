"use client"

import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/services/supabase/client'
import { Send, User, Clock, CheckCircle2, Circle, X, MessageSquare, Trash2, Zap, Sparkles, Loader2 } from 'lucide-react'
import { generateChatSmartReplyAction } from './actions'
import { toast } from 'sonner'

interface ChatSession {
  id: string
  visitor_id: string
  visitor_name?: string
  visitor_phone?: string
  status: string
  updated_at: string
}

interface Message {
  id: string
  content: string
  sender_type: 'visitor' | 'admin'
  created_at: string
}

export function LiveChatAdminClient() {
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [showReplies, setShowReplies] = useState(false)
  const [isGeneratingReply, setIsGeneratingReply] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const supabase = createClient()
  const [adminId, setAdminId] = useState<string | null>(null)
  
  const activeSession = sessions.find(s => s.id === activeSessionId)

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) setAdminId(data.user.id)
    })
  }, [])

  // Load sessions
  useEffect(() => {
    const fetchSessions = async () => {
      const { data } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('updated_at', { ascending: false })
      
      if (data) setSessions(data)
    }
    fetchSessions()

    // Listen for new sessions
    const channel = supabase
      .channel('admin_sessions')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_sessions' }, (payload) => {
        setSessions(prev => [payload.new as ChatSession, ...prev])
      })
      .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'chat_sessions' }, (payload) => {
        setSessions(prev => prev.map(s => s.id === payload.new.id ? payload.new as ChatSession : s))
      })
      .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'chat_sessions' }, (payload) => {
        setSessions(prev => prev.filter(s => s.id !== payload.old.id))
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Load messages for active session
  useEffect(() => {
    if (!activeSessionId) {
      setMessages([])
      return
    }

    const fetchMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', activeSessionId)
        .order('created_at', { ascending: true })
      
      if (data) {
        setMessages(data)
        
        // Auto-join message if not present
        const hasJoined = data.some(m => m.content === 'Müşteri temsilcisi sohbete katıldı.')
        const hasAdminReply = data.some(m => m.sender_type === 'admin' && m.sender_id !== 'system')
        
        if (!hasJoined && !hasAdminReply) {
          const currentAdminId = adminId || 'admin'
          await supabase.from('chat_messages').insert([{
            session_id: activeSessionId,
            sender_type: 'admin',
            sender_id: 'system',
            content: 'Müşteri temsilcisi sohbete katıldı.'
          }])
        }
      }
    }
    fetchMessages()

    const channel = supabase
      .channel(`admin_chat_${activeSessionId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `session_id=eq.${activeSessionId}`
      }, (payload) => {
        setMessages(prev => [...prev, payload.new as Message])
      })
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [activeSessionId])

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages])

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    const currentAdminId = adminId || 'admin'
    if (!input.trim() || !activeSessionId || !currentAdminId) return

    const msg = input.trim()
    setInput('')

    await supabase.from('chat_messages').insert([{
      session_id: activeSessionId,
      sender_type: 'admin',
      sender_id: currentAdminId,
      content: msg
    }])

    await supabase
      .from('chat_sessions')
      .update({ updated_at: new Date().toISOString(), status: 'active' })
      .eq('id', activeSessionId)
  }

  const handleGenerateAiSmartReply = async () => {
    if (!messages.length) {
      toast.error('Öneri üretmek için sohbette en az bir mesaj olmalıdır.')
      return
    }

    setIsGeneratingReply(true)
    const toastId = toast.loading('Ollama Cloud lüks yanıt önerisi hazırlıyor...')
    try {
      const res = await generateChatSmartReplyAction({
        customerName: activeSession?.visitor_name,
        lastMessages: messages.slice(-6).map(m => ({
          sender_type: m.sender_type,
          content: m.content
        }))
      })

      if (res.success && res.reply) {
        setInput(res.reply)
        toast.dismiss(toastId)
        toast.success('✨ AI yanıt önerisi metin kutusuna aktarıldı!')
      } else {
        toast.dismiss(toastId)
        toast.error(res.error || 'Yanıt önerisi üretilemedi.')
      }
    } catch (err: any) {
      toast.dismiss(toastId)
      toast.error('AI hatası: ' + err.message)
    } finally {
      setIsGeneratingReply(false)
    }
  }

  const markClosed = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const confirmClose = window.confirm("Sohbeti kapatmak istediğinize emin misiniz?")
    if (confirmClose) {
      await supabase.from('chat_sessions').update({ status: 'closed' }).eq('id', id)
      if (activeSessionId === id) {
        setActiveSessionId(null)
      }
    }
  }

  const deleteSession = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const confirmDelete = window.confirm("Bu sohbeti tamamen silmek istediğinize emin misiniz? Bu işlem geri alınamaz.")
    if (confirmDelete) {
      // Optimistic update
      if (activeSessionId === id) {
        setActiveSessionId(null)
      }
      setSessions(prev => prev.filter(s => s.id !== id))
      
      const { deleteChatSessionAction } = await import('./actions')
      const result = await deleteChatSessionAction(id)
      
      if (!result.success) {
        alert('Sohbet silinirken bir hata oluştu: ' + result.error)
        // Note: we could revert the optimistic update here if we want to be thorough
      }
    }
  }

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.round(diffMs / 60000)
    
    if (diffMins < 1) return 'Az önce'
    if (diffMins < 60) return `${diffMins} dk önce`
    const diffHours = Math.round(diffMins / 60)
    if (diffHours < 24) return `${diffHours} saat önce`
    return `${Math.round(diffHours / 24)} gün önce`
  }

  const QUICK_REPLIES = [
    "Merhaba, size nasıl yardımcı olabilirim?",
    "İletişim numaranızı alabilir miyim?",
    "Hemen kontrol edip dönüş yapıyorum.",
    "Fiyatlarımız ölçüye ve seçilen modele göre değişmektedir.",
    "Ankara içi ücretsiz keşif (ölçü alma) hizmetimiz bulunmaktadır.",
    "İstediğiniz modelin görselini veya linkini paylaşabilir misiniz?",
    "Montaj süremiz, ölçü alındıktan sonra ortalama 3-5 iş günüdür.",
    "Maalesef Ankara dışına montaj hizmetimiz bulunmamaktadır.",
    "Banyonuzun fotoğrafını gönderirseniz daha net yardımcı olabiliriz.",
    "Başka yardımcı olabileceğim bir konu var mı?",
    "İyi günler dileriz."
  ]

  return (
    <div className="flex h-full divide-x divide-gray-100">
      {/* Sidebar: Sessions List */}
      <div className="w-1/3 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-gray-100 bg-white">
          <h2 className="font-semibold text-gray-900">Aktif Sohbetler</h2>
        </div>
        <div className="flex-1 overflow-y-auto">
          {sessions.length === 0 ? (
            <div className="p-6 text-center text-gray-400 text-sm">Hiç sohbet bulunmuyor.</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sessions.map(session => (
                <div 
                  key={session.id}
                  onClick={() => setActiveSessionId(session.id)}
                  className={`p-4 cursor-pointer hover:bg-white transition-colors ${activeSessionId === session.id ? 'bg-white border-l-2 border-emerald-500 shadow-sm' : 'border-l-2 border-transparent'}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500">
                        <User className="size-5" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">
                          {session.visitor_name || `Ziyaretçi ${session.visitor_id.substring(0, 4)}`}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          {session.status === 'active' ? (
                            <span className="text-emerald-500 flex items-center gap-1"><Circle className="size-2 fill-emerald-500" /> Aktif</span>
                          ) : session.status === 'bot' ? (
                            <span className="text-blue-500 flex items-center gap-1"><Circle className="size-2 fill-blue-500" /> Yeni</span>
                          ) : (
                            <span className="text-gray-400 flex items-center gap-1"><CheckCircle2 className="size-3" /> Kapalı</span>
                          )}
                          <span className="mx-1">•</span>
                          <span>{formatTimeAgo(session.updated_at)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {session.status !== 'closed' && (
                        <button 
                          onClick={(e) => markClosed(e, session.id)}
                          className="text-xs text-gray-400 hover:text-red-500 p-1"
                          title="Sohbeti Kapat"
                        >
                          <X className="size-4" />
                        </button>
                      )}
                      <button 
                        onClick={(e) => deleteSession(e, session.id)}
                        className="text-xs text-gray-400 hover:text-red-500 p-1"
                        title="Sohbeti Sil"
                      >
                        <Trash2 className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main: Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {activeSession ? (
          <>
            <div className="p-4 border-b border-gray-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                <User className="size-5" />
              </div>
              <div className="flex-1 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{activeSession.visitor_name || `Ziyaretçi ${activeSession.visitor_id.substring(0, 8)}`}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-emerald-600">Şu an sizinle sohbet ediyor</p>
                    {activeSession.visitor_phone && (
                      <>
                        <span className="text-gray-300">•</span>
                        <p className="text-xs font-mono text-gray-500">{activeSession.visitor_phone}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {activeSession.status !== 'closed' && (
                    <button 
                      onClick={(e) => markClosed(e, activeSession.id)}
                      className="text-sm px-3 py-1.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-md transition-colors font-medium"
                    >
                      Sohbeti Kapat
                    </button>
                  )}
                  <button 
                    onClick={(e) => deleteSession(e, activeSession.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                    title="Sohbeti Sil"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/50">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 text-sm mt-10">Bu sohbette henüz mesaj yok.</div>
              ) : (
                messages.map((msg, i) => {
                  const isAdmin = msg.sender_type === 'admin'
                  const time = new Date(msg.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                  return (
                    <div key={msg.id || i} className={`flex ${isAdmin ? 'justify-end' : 'justify-start'}`}>
                      <div 
                        className={`max-w-[70%] min-w-[70px] rounded-2xl px-4 pt-2 pb-5 text-sm relative ${
                          isAdmin 
                            ? 'bg-slate-900 text-white rounded-br-sm' 
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                        }`}
                      >
                        <div>{msg.content}</div>
                        <div className={`text-[10px] absolute bottom-1 right-3 ${isAdmin ? 'text-slate-400' : 'text-gray-400'}`}>
                          {time}
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-gray-100 relative">
              {/* Quick Replies Popup */}
              {showReplies && (
                <div className="absolute bottom-full mb-2 left-4 right-4 bg-white border border-gray-200 shadow-xl rounded-2xl p-2 max-h-64 overflow-y-auto z-10 flex flex-col gap-1">
                  <div className="flex items-center justify-between px-3 pt-2 pb-1">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Hızlı Yanıtlar</span>
                    <button onClick={() => setShowReplies(false)} className="text-gray-400 hover:text-red-500 p-1 rounded-md transition-colors">
                      <X className="size-4" />
                    </button>
                  </div>
                  {QUICK_REPLIES.map((reply, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setInput(reply)
                        setShowReplies(false)
                      }}
                      className="text-left px-4 py-2.5 hover:bg-slate-50 text-slate-700 text-sm rounded-xl transition-colors border border-transparent hover:border-slate-100"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={sendMessage} className="flex gap-2 items-center">
                <button
                  type="button"
                  onClick={handleGenerateAiSmartReply}
                  disabled={isGeneratingReply || !messages.length}
                  className="w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center transition-all shadow-sm border bg-gradient-to-tr from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 border-indigo-200 text-indigo-700 disabled:opacity-50"
                  title="Ollama AI Akıllı Yanıt Önerisi"
                >
                  {isGeneratingReply ? (
                    <Loader2 className="size-4 animate-spin text-indigo-600" />
                  ) : (
                    <Sparkles className="size-4 text-indigo-600" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowReplies(!showReplies)}
                  className={`w-11 h-11 flex-shrink-0 rounded-full flex items-center justify-center transition-colors shadow-sm border ${showReplies ? 'bg-emerald-50 border-emerald-200 text-emerald-600' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-500'}`}
                  title="Hızlı Yanıtlar"
                >
                  <Zap className="size-5" />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Müşteriye yanıt yazın..."
                  className="flex-1 border border-gray-200 rounded-full px-5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-slate-900/20 focus:border-slate-900"
                />
                <button 
                  type="submit"
                  disabled={!input.trim()}
                  className="w-11 h-11 flex-shrink-0 rounded-full bg-slate-900 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-800 transition-colors shadow-sm"
                >
                  <Send className="size-4 ml-0.5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <MessageSquare className="size-12 mb-4 opacity-20" />
            <p>Yanıtlamak için sol taraftan bir sohbet seçin.</p>
          </div>
        )}
      </div>
    </div>
  )
}
