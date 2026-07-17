import { SitePageBlock } from '../types/blocks'

// Placeholder for actual block components
const HeroBlock = ({ data }: { data: any }) => (
  <div className="py-20 bg-muted/20 text-center">
    <h1 className="text-4xl md:text-6xl font-light">{data.title_normal} <span className="font-bold">{data.title_bold}</span></h1>
    {data.description && <p className="mt-4 text-lg text-muted-foreground">{data.description}</p>}
  </div>
)

const TextBlock = ({ data }: { data: any }) => (
  <div className="container mx-auto py-12 px-6 max-w-4xl prose prose-sm sm:prose-base dark:prose-invert" dangerouslySetInnerHTML={{ __html: data.content || '' }} />
)

const SpacerBlock = ({ data }: { data: any }) => {
  const heightMap = { small: 'h-8', medium: 'h-16', large: 'h-32', xlarge: 'h-48' }
  return <div className={`w-full ${heightMap[data.height as keyof typeof heightMap] || 'h-16'}`} />
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
          case 'spacer':
            return <SpacerBlock key={block.id} data={block.data} />
          // Add more block renderers here
          default:
            return (
              <div key={block.id} className="p-4 border border-dashed border-destructive/50 text-destructive text-center text-sm">
                Desteklenmeyen blok tipi: {block.type}
              </div>
            )
        }
      })}
    </div>
  )
}
