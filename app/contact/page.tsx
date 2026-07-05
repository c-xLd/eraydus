import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'İletişim | ERAYDUŞ',
  description: 'Lüks duşakabin tasarımınız için bizimle iletişime geçin.',
}

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
          İletişim
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-light mb-16">
          Hayalinizdeki banyo deneyimi için ilk adımı atın. Size yardımcı olmaktan memnuniyet duyarız.
        </p>
        
        {/* Placeholder for Contact content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="h-[400px] bg-surface rounded-3xl animate-pulse" />
          <div className="h-[400px] bg-surface rounded-3xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}
