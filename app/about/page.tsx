import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hakkımızda | ERAYDUŞ',
  description: 'ERAYDUŞ markasının hikayesi, vizyonu ve üretim kalitesi.',
}

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-[1440px]">
        <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
          Hakkımızda
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl font-light mb-16">
          Mükemmellik bir tesadüf değildir. İnce mühendislik ve kusursuz tasarımın buluştuğu nokta.
        </p>
        
        {/* Placeholder for About content */}
        <div className="w-full h-[500px] bg-surface rounded-3xl animate-pulse" />
      </div>
    </div>
  )
}
