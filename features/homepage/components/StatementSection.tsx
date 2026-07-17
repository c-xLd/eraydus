'use client'

import { motion } from 'framer-motion'

export function StatementSection() {
  return (
    <section className="py-20 md:py-28 bg-background flex items-center justify-center relative overflow-hidden">
      {/* Subtle Background Element */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-surface to-transparent opacity-60" />
      </div>

      <div className="container mx-auto px-6 max-w-[1200px] text-center relative z-10">
        <motion.div
          initial={{ opacity: 0.01, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
        >
          <span className="text-champagne text-sm font-medium tracking-[0.2em] uppercase">Felsefemiz</span>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0.01, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(1.75rem,4vw,3.5rem)] font-light tracking-[-0.02em] text-foreground leading-[1.1] max-w-4xl mx-auto"
        >
          Her Banyo{' '}
          <span className="text-muted-foreground">Sıradan Bir</span>
          <br />
          Duşakabini{' '}
          <span className="font-semibold italic">Hak Etmez.</span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "200px" }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-24 h-[1px] bg-champagne mx-auto mt-12"
        />
      </div>
    </section>
  )
}
