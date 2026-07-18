'use client'

import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'

export function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Bir hata oluştu, lütfen daha sonra tekrar deneyin.')
      }

      setStatus('success')
      setEmail('')
    } catch (err: unknown) {
      setStatus('error')
      setErrorMessage((err as Error).message || 'Bilinmeyen bir hata oluştu.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full lg:w-auto">
      <div className="flex w-full lg:w-auto gap-3 relative">
        <input 
          type="email" 
          placeholder="E-posta adresiniz"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === 'loading' || status === 'success'}
          required
          className="flex-1 lg:w-80 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-white placeholder:text-white/30 text-sm focus:outline-none focus:border-champagne/50 focus:ring-1 focus:ring-champagne/20 transition-all disabled:opacity-50"
        />
        <button 
          type="submit"
          disabled={status === 'loading' || status === 'success'}
          className="px-6 py-3 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 transition-colors shrink-0 flex items-center justify-center min-w-[110px] disabled:opacity-50"
        >
          {status === 'loading' ? (
            <Loader2 className="w-4 h-4 animate-spin text-black" />
          ) : status === 'success' ? (
            <Check className="w-4 h-4 text-green-600" />
          ) : (
            'Abone Ol'
          )}
        </button>
      </div>
      
      {status === 'success' && (
        <p className="text-green-400 text-xs mt-1 ml-2">
          Bültenimize başarıyla abone oldunuz!
        </p>
      )}
      
      {status === 'error' && (
        <p className="text-red-400 text-xs mt-1 ml-2">
          {errorMessage}
        </p>
      )}
    </form>
  )
}
