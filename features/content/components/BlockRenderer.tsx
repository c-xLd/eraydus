import { SitePageBlock } from '../types/blocks'
import { AnimatedBlock, AnimatedImage } from '@/components/ui/AnimatedBlock'
import Link from 'next/link'

const HeroBlock = ({ data }: { data: any }) => (
  <section className="py-24 md:py-32 bg-background relative overflow-hidden">
    <div className="container mx-auto px-6 max-w-[1440px]">
      <AnimatedBlock y={20} className="text-champagne text-sm tracking-[0.3em] uppercase font-medium mb-6 text-center">
        {data.subtitle || 'ERAYDUŞ'}
      </AnimatedBlock>
      <AnimatedBlock y={30} delay={0.1} className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight max-w-4xl mx-auto text-center leading-[1.1]">
        {data.title_normal} <span className="font-semibold">{data.title_bold}</span>
      </AnimatedBlock>
      {data.description && (
        <AnimatedBlock y={20} delay={0.25} className="text-muted-foreground text-lg md:text-xl font-light mt-6 max-w-2xl mx-auto text-center">
          <div dangerouslySetInnerHTML={{ __html: data.description }} />
        </AnimatedBlock>
      )}
      {data.image_url && (
        <AnimatedBlock y={40} delay={0.4} className="mt-16 rounded-3xl overflow-hidden aspect-video md:aspect-[21/9]">
          <AnimatedImage src={data.image_url} alt={data.title_normal} className="w-full h-full rounded-3xl" />
        </AnimatedBlock>
      )}
    </div>
  </section>
)

const TextBlock = ({ data }: { data: any }) => (
  <AnimatedBlock className="container mx-auto py-12 px-6 max-w-4xl prose prose-sm sm:prose-base lg:prose-lg prose-neutral dark:prose-invert font-light leading-relaxed">
    <div dangerouslySetInnerHTML={{ __html: data.content || '' }} />
  </AnimatedBlock>
)

const ImageBlock = ({ data }: { data: any }) => {
  if (!data.url) return null;
  return (
    <div className={`container mx-auto py-8 px-6 ${data.full_width ? 'max-w-[1440px]' : 'max-w-4xl'}`}>
      <AnimatedBlock className="rounded-3xl overflow-hidden shadow-2xl shadow-black/5 dark:shadow-black/20">
        <AnimatedImage src={data.url} alt={data.alt || 'Görsel'} className="w-full h-auto rounded-3xl" />
      </AnimatedBlock>
    </div>
  )
}

const GalleryBlock = ({ data }: { data: any }) => {
  if (!data.images || data.images.length === 0) return null;
  
  return (
    <div className="container mx-auto py-12 px-6 max-w-[1440px]">
      <div className={`grid gap-6 ${data.layout === 'carousel' ? 'grid-flow-col auto-cols-[85%] md:auto-cols-[45%] overflow-x-auto snap-x snap-mandatory pb-8' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
        {data.images.map((img: any, idx: number) => (
          <AnimatedBlock key={idx} delay={idx * 0.1} className={`aspect-[4/5] rounded-2xl overflow-hidden shadow-lg ${data.layout === 'carousel' ? 'snap-center' : ''}`}>
            <AnimatedImage src={img.url} alt={img.alt || `Galeri görseli ${idx+1}`} className="w-full h-full rounded-2xl" />
          </AnimatedBlock>
        ))}
      </div>
    </div>
  )
}

const CTABlock = ({ data }: { data: any }) => {
  const bgClasses = {
    light: 'bg-surface text-foreground',
    dark: 'bg-foreground text-background',
    champagne: 'bg-champagne/10 text-foreground border border-champagne/20'
  };
  const currentBg = bgClasses[data.variant as keyof typeof bgClasses] || bgClasses.light;

  return (
    <div className="container mx-auto py-24 px-6 max-w-5xl">
      <AnimatedBlock className={`rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden ${currentBg}`}>
        <div className="relative z-10">
          <h2 className="text-3xl md:text-5xl font-light tracking-tight mb-6">
            {data.title}
          </h2>
          {data.description && (
            <p className="text-lg md:text-xl font-light opacity-80 max-w-2xl mx-auto mb-10">
              {data.description}
            </p>
          )}
          {data.button_label && data.button_url && (
            <Link 
              href={data.button_url}
              className={`inline-flex items-center justify-center rounded-full px-10 h-14 text-base font-semibold hover:scale-105 transition-all duration-300 ${
                data.variant === 'dark' ? 'bg-background text-foreground' : 'bg-foreground text-background'
              }`}
            >
              {data.button_label}
            </Link>
          )}
        </div>
      </AnimatedBlock>
    </div>
  )
}

const SpacerBlock = ({ data }: { data: any }) => {
  const heightMap = { small: 'h-8', medium: 'h-16', large: 'h-32', xlarge: 'h-48 md:h-64' }
  return <div className={`w-full ${heightMap[data.height as keyof typeof heightMap] || 'h-16'}`} />
}

const DividerBlock = ({ data }: { data: any }) => {
  if (data.style === 'champagne') {
    return (
      <div className="w-full max-w-4xl mx-auto px-6">
        <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-champagne/50 to-transparent" />
      </div>
    )
  }
  return (
    <div className="w-full max-w-4xl mx-auto px-6">
      <div className={`w-full border-t border-border/50 ${data.style === 'dashed' ? 'border-dashed' : 'border-solid'}`} />
    </div>
  )
}

export function BlockRenderer({ blocks }: { blocks: SitePageBlock[] }) {
  if (!blocks || !Array.isArray(blocks) || blocks.length === 0) {
    return null
  }

  return (
    <div className="flex flex-col w-full">
      {blocks.map((block) => {
        switch (block.type) {
          case 'hero':
            return <HeroBlock key={block.id} data={block.data} />
          case 'text':
            return <TextBlock key={block.id} data={block.data} />
          case 'image':
            return <ImageBlock key={block.id} data={block.data} />
          case 'gallery':
            return <GalleryBlock key={block.id} data={block.data} />
          case 'cta':
            return <CTABlock key={block.id} data={block.data} />
          case 'spacer':
            return <SpacerBlock key={block.id} data={block.data} />
          case 'divider':
            return <DividerBlock key={block.id} data={block.data} />
          case 'two_column':
            // Basic fallback for two_column until a proper block UI is built
            return (
              <div key={block.id} className="container mx-auto py-12 px-6 max-w-[1440px] grid grid-cols-1 md:grid-cols-2 gap-12">
                 <div className="prose dark:prose-invert"><p>Kolon 1 (JSON)</p></div>
                 <div className="prose dark:prose-invert"><p>Kolon 2 (JSON)</p></div>
              </div>
            )
          default:
            return (
              <div key={block.id} className="p-4 border border-dashed border-destructive/50 text-destructive text-center text-sm container mx-auto my-4">
                Desteklenmeyen blok tipi: {block.type}
              </div>
            )
        }
      })}
    </div>
  )
}
