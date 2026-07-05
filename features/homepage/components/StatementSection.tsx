'use client'

import { motion } from 'framer-motion'

export function StatementSection() {
  return (
    <section className="py-40 md:py-60 bg-background flex items-center justify-center">
      <div className="container mx-auto px-6 max-w-[1440px] text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight text-foreground leading-[1.2] max-w-5xl mx-auto"
        >
          <span className="text-muted-foreground block mb-4">Her banyo</span>
          Sıradan Bir Duşakabini <br />
          Hak Etmez.
        </motion.h2>
      </div>
    </section>
  )
}
