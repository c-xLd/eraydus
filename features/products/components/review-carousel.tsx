import { Star } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'

export function ReviewCarousel() {
  // Placeholder section for now as per instructions
  // Will be connected to DB later
  return (
    <section className="py-24 md:py-32 bg-background border-t border-border/50">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <div className="w-12 h-1 bg-[#C9A86A] mx-auto" />
        </div>

        {/* Empty state for now */}
        <div className="max-w-3xl mx-auto text-center py-12 px-4 rounded-3xl bg-muted/10 border border-border/50">
          <div className="flex justify-center mb-6">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-6 h-6 text-[#C9A86A]/30 fill-[#C9A86A]/10" />
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-lg mb-2">Henüz değerlendirme bulunmuyor.</p>
          <p className="text-sm text-muted-foreground/70">İlk değerlendiren siz olun.</p>
        </div>
      </div>
    </section>
  )
}
