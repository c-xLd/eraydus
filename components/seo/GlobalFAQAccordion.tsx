"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageCircleQuestion } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export function GlobalFAQAccordion() {
  const pathname = usePathname();
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    async function fetchFaqs() {
      try {
        setLoading(true);
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY! || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
        );
        const { data: pageSeo } = await supabase
          .from('seo_metadata')
          .select('faq_data, faq_schema_enabled')
          .eq('page_slug', pathname)
          .single();

        if (pageSeo && pageSeo.faq_schema_enabled && Array.isArray(pageSeo.faq_data) && pageSeo.faq_data.length > 0) {
          setFaqs(pageSeo.faq_data);
        } else {
          setFaqs([]);
        }
      } catch (err) {
        // Silently fail if no data
        setFaqs([]);
      } finally {
        setLoading(false);
      }
    }
    
    fetchFaqs();
  }, [pathname]);

  if (loading || faqs.length === 0) {
    return null;
  }

  return (
    <section className="py-24 md:py-32 bg-surface text-foreground border-t border-border/20 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-champagne/5 rounded-[100%] blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center gap-2 text-champagne mb-4"
          >
            <MessageCircleQuestion className="size-5" />
            <span className="text-xs tracking-[0.2em] font-medium uppercase">Bilgi Merkezi</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl md:text-5xl font-light tracking-tight text-foreground"
          >
            Sıkça Sorulan <span className="font-semibold text-champagne">Sorular</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0.01, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`border rounded-3xl overflow-hidden transition-colors duration-500 ${
                  isOpen ? 'bg-background/80 border-champagne/30 shadow-lg shadow-champagne/5' : 'bg-surface/50 border-border/50 hover:border-border'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full text-left px-6 py-6 md:px-8 md:py-8 flex items-center justify-between gap-6 focus:outline-none focus-visible:ring-2 focus-visible:ring-champagne/50"
                >
                  <span className={`text-base md:text-lg font-medium transition-colors duration-300 ${isOpen ? 'text-champagne' : 'text-foreground'}`}>
                    {faq.question}
                  </span>
                  <div className={`shrink-0 flex items-center justify-center size-10 rounded-full border transition-all duration-500 ${isOpen ? 'bg-champagne/10 border-champagne text-champagne rotate-180' : 'bg-background border-border text-muted-foreground'}`}>
                    <ChevronDown className="size-5" />
                  </div>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <div className="px-6 pb-6 md:px-8 md:pb-8 pt-0 text-muted-foreground text-sm md:text-base leading-relaxed font-light">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
