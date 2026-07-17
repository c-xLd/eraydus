'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from 'lucide-react'
import { signIn } from '@/features/auth/actions/auth'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const loginSchema = z.object({
  email: z.string().min(1, 'E-posta adresi zorunludur.').email('Lütfen geçerli bir e-posta adresi girin.'),
  password: z.string().min(1, 'Şifre zorunludur.').min(6, 'Şifre en az 6 karakter olmalıdır.'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export default function LoginPage() {
  const [globalError, setGlobalError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsSubmitting(true)
    setGlobalError(null)

    // Convert data to FormData for the server action
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    const result = await signIn(formData)

    if (result?.error) {
      setGlobalError(result.error)
      setIsSubmitting(false)
    }
    // If successful, the server action will redirect automatically.
  }

  // Animation variants
  const containerVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  }

  const itemVariants: import('framer-motion').Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { type: 'spring', stiffness: 100, damping: 15 } 
    },
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] flex flex-col md:flex-row relative overflow-hidden selection:bg-champagne/30 selection:text-white">
      {/* ───────────── Left Side (Branding/Editorial) ───────────── */}
      <div className="hidden md:flex md:w-1/2 relative bg-black flex-col justify-between p-12 lg:p-20 overflow-hidden">
        {/* Abstract Background Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[120%] h-[120%] bg-gradient-to-br from-champagne/5 via-black to-black opacity-50 blur-[100px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-champagne/10 to-transparent opacity-30 blur-[80px] pointer-events-none" />

        <motion.div 
          initial={{ opacity: 0, x: -30 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <div className="text-white text-2xl tracking-[0.2em] uppercase font-light">
            Erayduş
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10"
        >
          <h1 className="text-5xl lg:text-7xl font-light text-white tracking-tight leading-[1.1] mb-6">
            Zarafeti<br />
            <span className="font-semibold text-champagne">Yönetin.</span>
          </h1>
          <p className="text-white/50 text-lg max-w-md font-light leading-relaxed">
            Dijital mağazanızın kontrol merkezi. Güvenli, hızlı ve tamamen sizin kontrolünüzde.
          </p>
        </motion.div>
      </div>

      {/* ───────────── Right Side (Form) ───────────── */}
      <div className="flex-1 flex items-center justify-center p-6 md:p-12 relative">
        {/* Mobile Background Elements */}
        <div className="md:hidden absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-champagne/5 to-[#0A0A0A] pointer-events-none" />
          <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-champagne/10 rounded-full blur-[100px] pointer-events-none" />
        </div>

        <div className="w-full max-w-[420px] relative z-10">
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={containerVariants}
            className="bg-white/[0.02] backdrop-blur-3xl border border-white/5 rounded-3xl p-8 sm:p-10 shadow-2xl relative"
          >
            {/* Top Subtle Highlight */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-champagne/30 to-transparent" />

            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="w-14 h-14 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 border border-white/10 ring-4 ring-white/[0.02]">
                <ShieldCheck className="w-6 h-6 text-champagne" />
              </div>
              <h2 className="text-2xl font-light text-white tracking-tight">
                Sisteme <span className="font-medium">Giriş Yapın</span>
              </h2>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <AnimatePresence>
                {globalError && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0, scale: 0.95 }}
                    animate={{ opacity: 1, height: 'auto', scale: 1 }}
                    exit={{ opacity: 0, height: 0, scale: 0.95 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-200 text-sm text-center font-light overflow-hidden"
                  >
                    {globalError}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="space-y-5">
                {/* Email Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-champagne transition-colors duration-300" />
                    <input
                      type="email"
                      placeholder="E-posta adresi"
                      {...register('email')}
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-champagne focus:border-champagne focus:bg-white/[0.05] transition-all duration-300 font-light"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }} 
                        className="text-red-400 text-xs px-2 font-light"
                      >
                        {errors.email.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Password Field */}
                <motion.div variants={itemVariants} className="space-y-2">
                  <div className="relative group">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30 group-focus-within:text-champagne transition-colors duration-300" />
                    <input
                      type="password"
                      placeholder="Şifre"
                      {...register('password')}
                      className="w-full bg-white/[0.03] hover:bg-white/[0.05] border border-white/10 rounded-2xl px-12 py-4 text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-champagne focus:border-champagne focus:bg-white/[0.05] transition-all duration-300 font-light"
                    />
                  </div>
                  <AnimatePresence>
                    {errors.password && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }} 
                        animate={{ opacity: 1, y: 0 }} 
                        exit={{ opacity: 0, y: -10 }} 
                        className="text-red-400 text-xs px-2 font-light"
                      >
                        {errors.password.message}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              <motion.div variants={itemVariants} className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="relative w-full bg-white text-black rounded-2xl py-4 font-medium text-sm tracking-wide overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed transition-transform active:scale-[0.98]"
                >
                  <div className="absolute inset-0 bg-champagne translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[0.19,1,0.22,1]" />
                  <div className="relative flex items-center justify-center gap-2 group-hover:text-white transition-colors duration-300">
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Giriş Yap
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </div>
                </button>
              </motion.div>
            </form>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 1, duration: 1 }}
            className="text-center text-white/30 text-xs mt-8 font-light"
          >
            &copy; {new Date().getFullYear()} Erayduş. Tüm hakları saklıdır.
          </motion.p>
        </div>
      </div>
    </div>
  )
}
