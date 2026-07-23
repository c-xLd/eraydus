'use client'

import { motion } from 'framer-motion'
import { Target, Lightbulb, Leaf, ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { InlineEditable } from '@/features/content/components/InlineEditable'

const ease = [0.16, 1, 0.3, 1] as const

// Map string icon names to Lucide icons (simple fallback)
const iconMap: Record<string, any> = {
  'Hassasiyet': Target,
  'Yenilikçilik': Lightbulb,
  'Sürdürülebilirlik': Leaf,
}

interface AboutClientProps {
  content: any
}

export default function AboutClient({ content }: AboutClientProps) {
  // If content is missing, render nothing or a fallback
  if (!content || !content.hero) return null

  const { hero, story, values, process, facility, cta } = content

  return (
    <div className="flex flex-col w-full">
      {/* ───────────── Hero Section ───────────── */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease }}
            className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6"
          >
            <InlineEditable path="hero.subtitle" value={hero.subtitle}>{hero.subtitle}</InlineEditable>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0.01, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.1, ease }}
            className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl leading-[1.1]"
          >
            <InlineEditable path="hero.title_normal" value={hero.title_normal}>{hero.title_normal}</InlineEditable>{' '}
            <span className="font-semibold"><InlineEditable path="hero.title_bold" value={hero.title_bold}>{hero.title_bold}</InlineEditable></span>
          </motion.h1>
          <motion.div
            initial={{ opacity: 0.01, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.25, ease }}
            className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl"
          >
            <InlineEditable path="hero.description" value={hero.description} type="richtext">
              <div dangerouslySetInnerHTML={{ __html: hero.description }} />
            </InlineEditable>
          </motion.div>
        </div>
      </section>

      {/* ───────────── Brand Story ───────────── */}
      <section className="py-32 md:py-44 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0.01, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
                <InlineEditable path="story.subtitle" value={story.subtitle}>{story.subtitle}</InlineEditable>
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6 leading-[1.15]">
                <InlineEditable path="story.title_normal" value={story.title_normal}>{story.title_normal}</InlineEditable>{' '}
                <span className="font-semibold"><InlineEditable path="story.title_bold" value={story.title_bold}>{story.title_bold}</InlineEditable></span>
              </h2>
              <div className="text-muted-foreground text-lg md:text-xl font-light mt-8 leading-relaxed">
                <InlineEditable path="story.p1" value={story.p1} type="richtext">
                  <div dangerouslySetInnerHTML={{ __html: story.p1 }} />
                </InlineEditable>
              </div>
              {story.p2 && (
                <div className="text-muted-foreground text-lg md:text-xl font-light mt-6 leading-relaxed">
                  <InlineEditable path="story.p2" value={story.p2} type="richtext">
                    <div dangerouslySetInnerHTML={{ __html: story.p2 }} />
                  </InlineEditable>
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0.01, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-3xl overflow-hidden bg-surface group">
                <InlineEditable path="story.image" value={story.image} type="image" className="w-full h-full block">
                  <img
                    src={story.image}
                    alt="Hikayemiz"
                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                  />
                </InlineEditable>
              </div>
              <div className="absolute -bottom-8 -left-8 bg-surface-dark text-white p-8 rounded-2xl max-w-[280px]">
                <span className="text-champagne text-4xl md:text-5xl font-semibold">
                  {story.years_experience}
                </span>
                <p className="text-white/70 text-sm mt-2 font-light">
                  {story.years_text}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── Brand Values ───────────── */}
      <section className="py-32 md:py-44 bg-surface relative ">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-champagne/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-[1440px] relative z-10">
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center mb-24"
          >
            <span className="text-champagne text-xs tracking-[0.3em] uppercase font-semibold">
              <InlineEditable path="values.subtitle" value={values.subtitle}>{values.subtitle}</InlineEditable>
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6">
              <InlineEditable path="values.title_normal" value={values.title_normal}>{values.title_normal}</InlineEditable> <span className="font-semibold italic"><InlineEditable path="values.title_bold" value={values.title_bold}>{values.title_bold}</InlineEditable></span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {values.items.map((value: any, index: number) => {
              const Icon = iconMap[value.title] || Target
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0.01, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 1, delay: index * 0.15, ease }}
                  className="group relative bg-background rounded-3xl p-10 md:p-14 overflow-hidden border border-border hover:border-champagne/40 transition-colors duration-700"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-champagne/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center mb-10 group-hover:bg-champagne group-hover:scale-110 transition-all duration-500 ease-out">
                      <Icon className="w-7 h-7 text-foreground group-hover:text-background transition-colors duration-500" strokeWidth={1.5} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight mb-5 group-hover:text-champagne transition-colors duration-500">
                      <InlineEditable path={`values.items.${index}.title`} value={value.title}>{value.title}</InlineEditable>
                    </h3>
                    <div className="text-muted-foreground text-base md:text-lg font-light leading-relaxed">
                      <InlineEditable path={`values.items.${index}.description`} value={value.description}>{value.description}</InlineEditable>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ───────────── Manufacturing Process Timeline ───────────── */}
      <section className="py-32 md:py-44 bg-background ">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
            className="text-center mb-20 md:mb-28"
          >
            <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
              <InlineEditable path="process.subtitle" value={process.subtitle}>{process.subtitle}</InlineEditable>
            </span>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6">
              <InlineEditable path="process.title_normal" value={process.title_normal}>{process.title_normal}</InlineEditable> <span className="font-semibold"><InlineEditable path="process.title_bold" value={process.title_bold}>{process.title_bold}</InlineEditable></span>
            </h2>
          </motion.div>

          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:block">
            <div className="relative">
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.5, ease }}
                className="absolute top-[38px] left-0 right-0 h-[1px] bg-border origin-left"
              />

              <div className="grid grid-cols-6 gap-6">
                {(Array.isArray(process.steps) ? process.steps : []).map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.01, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.12,
                      ease,
                    }}
                    className="relative flex flex-col items-center text-center"
                  >
                    <div className="w-[76px] h-[76px] rounded-full bg-background border-2 border-border flex items-center justify-center mb-6 relative z-10 group-hover:border-champagne transition-colors">
                      <span className="text-champagne text-lg font-semibold">
                        {step.number}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight mb-2">
                      <InlineEditable path={`process.steps.${index}.title`} value={step.title}>{step.title}</InlineEditable>
                    </h3>
                    <div className="text-muted-foreground text-sm font-light leading-relaxed">
                      <InlineEditable path={`process.steps.${index}.description`} value={step.description}>{step.description}</InlineEditable>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Mobile / Tablet: Vertical Timeline */}
          <div className="lg:hidden">
            <div className="relative pl-10 md:pl-16">
              <motion.div
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.5, ease }}
                className="absolute top-0 bottom-0 left-[19px] md:left-[27px] w-[1px] bg-border origin-top"
              />

              <div className="flex flex-col gap-12">
                {(Array.isArray(process.steps) ? process.steps : []).map((step: any, index: number) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0.01, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-30px' }}
                    transition={{
                      duration: 0.8,
                      delay: index * 0.1,
                      ease,
                    }}
                    className="relative flex items-start gap-6"
                  >
                    <div className="absolute -left-10 md:-left-16 w-[38px] h-[38px] md:w-[54px] md:h-[54px] rounded-full bg-background border-2 border-border flex items-center justify-center shrink-0 z-10">
                      <span className="text-champagne text-xs md:text-sm font-semibold">
                        {step.number}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight mb-2">
                        <InlineEditable path={`process.steps.${index}.title`} value={step.title}>{step.title}</InlineEditable>
                      </h3>
                      <div className="text-muted-foreground text-base font-light leading-relaxed max-w-md">
                        <InlineEditable path={`process.steps.${index}.description`} value={step.description}>{step.description}</InlineEditable>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ───────────── Team / Factory Section ───────────── */}
      <section className="py-32 md:py-44 bg-surface-dark text-white ">
        <div className="container mx-auto px-6 max-w-[1440px]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div
              initial={{ opacity: 0.01, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
            >
              <span className="text-champagne text-sm tracking-[0.3em] uppercase font-medium">
                <InlineEditable path="facility.subtitle" value={facility.subtitle}>{facility.subtitle}</InlineEditable>
              </span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight mt-6 leading-[1.15]">
                <InlineEditable path="facility.title_normal" value={facility.title_normal}>{facility.title_normal}</InlineEditable>{' '}
                <span className="font-semibold"><InlineEditable path="facility.title_bold" value={facility.title_bold}>{facility.title_bold}</InlineEditable></span>
              </h2>
              <div className="text-white/60 text-lg md:text-xl font-light mt-8 leading-relaxed">
                <InlineEditable path="facility.description" value={facility.description} type="richtext">
                  <div dangerouslySetInnerHTML={{ __html: facility.description }} />
                </InlineEditable>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-12">
                {facility.stats.map((stat: any, index: number) => (
                  <div key={index}>
                    <span className="text-champagne text-2xl md:text-3xl font-semibold">
                      <InlineEditable path={`facility.stats.${index}.value`} value={stat.value}>{stat.value}</InlineEditable>
                    </span>
                    <div className="text-white/50 text-sm mt-1 font-light">
                      <InlineEditable path={`facility.stats.${index}.label`} value={stat.label}>{stat.label}</InlineEditable>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-12">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center gap-3 text-champagne text-base font-medium hover:gap-5 transition-all duration-300"
                >
                  Bize Ulaşın
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0.01, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-white/5 group">
                <InlineEditable path="facility.image" value={facility.image} type="image" className="w-full h-full block">
                  <img
                    src={facility.image}
                    alt="Tesis"
                    className="w-full h-full object-cover opacity-80 transition-transform duration-[1.5s] ease-out group-hover:scale-105 group-hover:opacity-100"
                  />
                </InlineEditable>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ───────────── CTA Section ───────────── */}
      <section className="py-32 md:py-44 bg-background">
        <div className="container mx-auto px-6 max-w-[1440px] text-center">
          <motion.div
            initial={{ opacity: 0.01, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease }}
          >
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-light tracking-tight">
              <InlineEditable path="cta.title_normal" value={cta.title_normal}>{cta.title_normal}</InlineEditable>{' '}
              <span className="font-semibold"><InlineEditable path="cta.title_bold" value={cta.title_bold}>{cta.title_bold}</InlineEditable></span>
            </h2>
            <div className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto">
              <InlineEditable path="cta.description" value={cta.description}>{cta.description}</InlineEditable>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
              <Link
                href="/iletisim"
                className="inline-flex items-center justify-center rounded-full bg-foreground text-background px-10 h-14 text-base font-semibold hover:scale-105 hover:shadow-xl transition-all duration-300"
              >
                İletişime Geçin
              </Link>
              <Link
                href="/projeler"
                className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-10 h-14 text-base font-medium hover:border-foreground hover:bg-surface transition-all duration-300"
              >
                Projeleri İnceleyin
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
