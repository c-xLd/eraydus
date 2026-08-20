'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X, Send, Minimize2, Sparkles, PowerOff, MessageCircle } from 'lucide-react'
import { createClient } from '@/services/supabase/client'

interface Message {
  id: string
  content: string
  sender_type: 'visitor' | 'admin'
  created_at: string
}

const checkIsOnline = () => {
  try {
    const formatter = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Istanbul',
      hour: 'numeric',
      hour12: false,
      weekday: 'short'
    })
    const parts = formatter.formatToParts(new Date())
    const hourPart = parts.find(p => p.type === 'hour')?.value
    const weekdayPart = parts.find(p => p.type === 'weekday')?.value
    
    if (!hourPart || !weekdayPart) return true // fallback
    
    const hour = parseInt(hourPart, 10)
    const isSunday = weekdayPart === 'Sun'
    
    return !isSunday && hour >= 9 && hour < 19
  } catch (e) {
    return true // fallback on error
  }
}

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [sessionStatus, setSessionStatus] = useState<string>('bot')
  const [isTyping, setIsTyping] = useState(false)
  const [isOnline, setIsOnline] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsOnline(checkIsOnline())
    const interval = setInterval(() => setIsOnline(checkIsOnline()), 60000)
    return () => clearInterval(interval)
  }, [])

  // Pre-chat form states
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [isFormSubmitting, setIsFormSubmitting] = useState(false)
  
  const visitorId = typeof window !== 'undefined' ? sessionStorage.getItem('visitor_id') : null
  const supabase = createClient()

  useEffect(() => {
    if (!visitorId) return

    const initChat = async () => {
      const { data: existingSession } = await supabase
        .from('chat_sessions')
        .select('*')
        .eq('visitor_id', visitorId)
        .neq('status', 'closed')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()
      
      if (existingSession) {
        setSessionId(existingSession.id)
        setSessionStatus(existingSession.status)
        loadMessages(existingSession.id)
      }
    }

    initChat()
  }, [visitorId])

  const loadMessages = async (sid: string) => {
    const { data } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('session_id', sid)
      .order('created_at', { ascending: true })
    
    if (data) setMessages(data)
  }

  useEffect(() => {
    if (!sessionId) return

    const messageChannel = supabase
      .channel(`chat_${sessionId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'chat_messages',
        filter: `session_id=eq.${sessionId}`
      }, (payload) => {
        setMessages((prev) => [...prev, payload.new as Message])
      })
      .on('postgres_changes', {
        event: 'UPDATE',
        schema: 'public',
        table: 'chat_sessions',
        filter: `id=eq.${sessionId}`
      }, (payload) => {
        setSessionStatus(payload.new.status)
        if (payload.new.status === 'closed') {
          setSessionId(null)
          setMessages([])
        }
      })
      .subscribe()

    return () => {
      supabase.removeChannel(messageChannel)
    }
  }, [sessionId])

  useEffect(() => {
    // Auto-scroll to bottom
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen, isTyping])

  const startChat = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !visitorId) return

    setIsFormSubmitting(true)
    const { data: newSession } = await supabase
      .from('chat_sessions')
      .insert([{ 
        visitor_id: visitorId, 
        visitor_name: name.trim(),
        visitor_phone: phone.trim() || null,
        status: 'active' 
      }])
      .select()
      .single()
    
    if (newSession) {
      setSessionId(newSession.id)
      setSessionStatus(newSession.status)
      
      // Auto-reply for waiting
      const replyContent = isOnline 
        ? 'Merhaba! Destek ekibimize hoş geldiniz. Müşteri temsilcilerimiz şu an yoğun olabilir. Ortalama bekleme süremiz 2-3 dakikadır. Lütfen sorunuzu veya talebinizi yazın, en kısa sürede sizinle iletişime geçeceğiz.'
        : 'Merhaba, şu an mesai saatleri dışındayız (Çalışma saatleri: 09:00 - 19:00). Bize mesajınızı veya talebinizi bırakabilirsiniz, mesai başladığında ilk iş olarak size dönüş yapacağız.'

      await supabase.from('chat_messages').insert([{
        session_id: newSession.id,
        sender_type: 'admin',
        sender_id: 'system',
        content: replyContent
      }])
    }
    setIsFormSubmitting(false)
  }

  const endChat = async () => {
    if (!sessionId) return
    const confirmClose = window.confirm("Sohbeti sonlandırmak istediğinize emin misiniz?")
    if (confirmClose) {
      await supabase.from('chat_sessions').update({ status: 'closed' }).eq('id', sessionId)
      setSessionId(null)
      setMessages([])
      setIsOpen(false)
    }
  }

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || !sessionId || !visitorId) return

    const msg = input.trim()
    setInput('')

    await supabase.from('chat_messages').insert([{
      session_id: sessionId,
      sender_type: 'visitor',
      sender_id: visitorId,
      content: msg
    }])
  }

  const connectToHuman = async () => {
    if (!sessionId) return
    await supabase.from('chat_sessions').update({ status: 'active' }).eq('id', sessionId)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-4 w-[340px] max-w-[calc(100vw-32px)] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col"
            style={{ height: '500px', maxHeight: 'calc(100vh - 120px)' }}
          >
            {/* Header */}
            <div className="bg-slate-900 p-4 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center">
                    <Sparkles className="size-5 text-emerald-400" />
                  </div>
                  {isOnline ? (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" title="Aktif" />
                  ) : (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-red-400 border-2 border-slate-900 rounded-full" title="Mesai Dışı" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-sm">
                    Erayduş Canlı Destek
                  </h3>
                  <p className="text-xs text-slate-300">
                    {isOnline ? 'Size nasıl yardımcı olabiliriz?' : 'Şu an mesai dışındayız.'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={() => window.open('https://wa.me/905548830071?text=Merhaba, web sitenizden ulaşıyorum.', '_blank')}
                  className="p-1.5 text-slate-300 hover:text-green-400 hover:bg-slate-800 rounded-lg transition-colors"
                  title="WhatsApp'tan Yaz"
                >
                  <MessageCircle className="size-4" />
                </button>
                {sessionId && (
                  <button 
                    onClick={endChat}
                    className="p-1.5 text-slate-300 hover:text-red-400 hover:bg-slate-800 rounded-lg transition-colors"
                    title="Sohbeti Sonlandır"
                  >
                    <PowerOff className="size-4" />
                  </button>
                )}
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Minimize2 className="size-4" />
                </button>
              </div>
            </div>

            {!sessionId ? (
              /* Pre-Chat Form */
              <div className="flex-1 overflow-y-auto p-6 bg-slate-50 flex flex-col justify-center">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 space-y-4">
                  <div className="text-center space-y-1">
                    <h4 className="font-semibold text-gray-900">Sohbete Başla</h4>
                    <p className="text-xs text-gray-500">Size daha iyi yardımcı olabilmemiz için lütfen bilgilerinizi girin.</p>
                  </div>
                  <form onSubmit={startChat} className="space-y-3">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Adınız Soyadınız</label>
                      <input 
                        required
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        placeholder="Örn: Ahmet Yılmaz"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-700">Telefon Numaranız <span className="text-gray-400 font-normal">(Opsiyonel)</span></label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                        placeholder="Örn: 0555 555 5555"
                      />
                    </div>
                    <button 
                      type="submit"
                      disabled={isFormSubmitting}
                      className="w-full bg-emerald-600 text-white rounded-lg py-2.5 text-sm font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 mt-2"
                    >
                      {isFormSubmitting ? 'Bağlanıyor...' : 'Görüşmeye Başla'}
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <>
                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4">
                  {messages.length === 0 && (
                    <div className="text-center text-gray-500 text-sm mt-10">
                      <p>Hoş geldiniz! İhtiyacınız olan ürün veya hizmetle ilgili sorularınızı buraya yazabilirsiniz.</p>
                      <p className="mt-2 text-xs text-gray-400">Canlı destek ekibimiz size en kısa sürede dönecektir.</p>
                    </div>
                  )}
                  {messages.map((msg, i) => {
                    const isVisitor = msg.sender_type === 'visitor'
                    const time = new Date(msg.created_at).toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })
                    return (
                      <div key={msg.id || i} className={`flex ${isVisitor ? 'justify-end' : 'justify-start'}`}>
                        <div 
                          className={`max-w-[85%] min-w-[70px] rounded-2xl px-4 pt-2 pb-5 text-sm relative ${
                            isVisitor 
                              ? 'bg-emerald-600 text-white rounded-br-sm' 
                              : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                          }`}
                        >
                          <div>{msg.content}</div>
                          <div className={`text-[10px] absolute bottom-1 right-3 ${isVisitor ? 'text-emerald-100' : 'text-gray-400'}`}>
                            {time}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1">
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }} />
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }} />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="bg-white border-t border-gray-100 flex flex-col">
                  <div className="p-3">
                    <form onSubmit={sendMessage} className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Mesajınızı yazın..."
                        disabled={isTyping}
                        className="flex-1 bg-slate-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 disabled:opacity-50"
                      />
                      <button 
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        aria-label="Mesaj Gönder"
                        className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-700 transition-colors"
                      >
                        <Send className="size-4 ml-1" />
                      </button>
                    </form>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Canlı Destek ve WhatsApp İletişimi"
        aria-expanded={isOpen}
        className="w-14 h-14 rounded-full bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 flex items-center justify-center relative"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="size-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageSquare className="size-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}
