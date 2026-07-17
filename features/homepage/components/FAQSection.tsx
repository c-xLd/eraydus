'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const ease = [0.16, 1, 0.3, 1] as const

export interface FAQ {
  question: string
  answer: string
}

interface FAQSectionProps {
  faqs: FAQ[]
}

function FAQItem({ faq, index }: { faq: FAQ; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0.01, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "200px" }}
      transition={{ duration: 0.6, delay: index * 0.08, ease }}
      className="border-b border-border last:border-b-0"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-6 py-7 md:py-8 text-left group"
      >
        <span className="text-lg md:text-xl font-medium tracking-tight group-hover:text-champagne transition-colors">
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.3, ease }}
          className="flex-shrink-0 w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-champagne/40 transition-colors"
        >
          <Plus className="size-5 text-muted-foreground group-hover:text-champagne transition-colors" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0.01 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0.01 }}
            transition={{ duration: 0.4, ease }}
            className=""
          >
            <p className="text-muted-foreground leading-relaxed pb-8 pr-16 max-w-3xl">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export function FAQSection({ faqs }: FAQSectionProps) {
  return (
    <section className="py-20 md:py-24 bg-surface ">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Left — Header */}
          <div className="lg:col-span-4">
            <motion.span
              initial={{ opacity: 0.01, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, ease }}
              className="text-champagne text-xs font-semibold tracking-widest uppercase mb-4 block"
            >
              SSS
            </motion.span>
            <motion.h2
              initial={{ opacity: 0.01, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight mb-4 leading-[1.1]"
            >
              Sıkça Sorulan{' '}
              <span className="font-semibold">Sorular</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0.01, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "200px" }}
              transition={{ duration: 0.8, delay: 0.2, ease }}
              className="text-muted-foreground leading-relaxed"
            >
              Merak ettiğiniz her şeyin cevabını burada bulabilirsiniz.
              Aradığınız bilgiyi bulamadıysanız bizimle iletişime geçmekten
              çekinmeyin.
            </motion.p>
          </div>

          {/* Right — Accordion */}
          <div className="lg:col-span-8">
            <div className="border-t border-border">
              {faqs.map((faq, i) => (
                <FAQItem key={i} faq={faq} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
