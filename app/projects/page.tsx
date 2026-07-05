import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projeler | ERAYDUŞ',
  description: 'ERAYDUŞ imzasını taşıyan prestijli projeler ve referanslar.',
}

export default function ProjectsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
          Projeler
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-light mb-16">
          Mimarinin zarafetini tamamlayan, özenle tamamlanmış lüks projelerimiz.
        </p>
        
        {/* Placeholder for Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="aspect-square bg-surface rounded-3xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  )
}
