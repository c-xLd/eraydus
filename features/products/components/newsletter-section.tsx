'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return
    
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
      setTimeout(() => setStatus('idle'), 3000)
    }, 1000)
  }

  return (
    <section className="py-12 md:py-16 bg-white border-t border-black/[0.03]">
      <div className="container max-w-6xl px-4 mx-auto">
        <div className="max-w-2xl mx-auto text-center space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 mb-4 block">
              BÜLTEN
            </span>
            <h2 className="text-3xl md:text-5xl font-light tracking-tight text-black mb-6">
              Ayrıcalıklara Katılın
            </h2>
            <p className="text-black/50 text-lg mb-12 font-light">
              Yeni ürün serileri, özel tasarım çözümleri ve ilham veren banyo fikirleri için kayıt olun.
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="E-posta adresiniz" 
                className="h-14 flex-1 bg-black/[0.02] border border-black/10 px-6 text-[13px] text-black placeholder:text-black/30 focus:outline-none focus:border-black transition-colors rounded-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status !== 'idle'}
              />
              <button 
                type="submit" 
                className="h-14 px-8 bg-black text-white text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-black/80 transition-colors disabled:opacity-50 mt-4 sm:mt-0"
                disabled={status !== 'idle'}
              >
                {status === 'loading' ? 'GÖNDERİLİYOR' : status === 'success' ? 'TEŞEKKÜRLER' : 'KAYIT OL'}
              </button>
            </form>
            
            <p className="text-[10px] text-black/30 mt-8 font-light tracking-wide uppercase">
              Gizliliğinize saygı duyuyoruz. İstenmeyen e-posta göndermiyoruz.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
