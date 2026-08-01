import { Check } from 'lucide-react'

// Allow both db-style and ui-style property names
interface TechnicalSpecs {
  glass_thickness?: string;
  glassThickness?: string[];
  height?: string;
  width_range?: string;
  widthRange?: string;
  installation?: string;
  [key: string]: any;
}

export function ProductSpecs({ specs, features }: { specs?: TechnicalSpecs; features?: string[] }) {
  if (!specs && (!features || features.length === 0)) return null

  // Normalize specs
  const glassThickness = specs?.glass_thickness || (specs?.glassThickness ? specs.glassThickness.join(', ') : 'Belirtilmedi')
  const height = specs?.height || 'Belirtilmedi'
  const widthRange = specs?.width_range || specs?.widthRange || 'Belirtilmedi'
  const installation = specs?.installation || 'Profesyonel Montaj'

  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-medium tracking-tight">Teknik Özellikler</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Specs Table */}
        <div className="space-y-4">
          <div className="flex justify-between py-4 border-b border-border">
            <span className="text-muted-foreground">Cam Kalınlığı</span>
            <span className="font-medium text-right">{glassThickness}</span>
          </div>
          <div className="flex justify-between py-4 border-b border-border">
            <span className="text-muted-foreground">Yükseklik</span>
            <span className="font-medium text-right">{height}</span>
          </div>
          <div className="flex justify-between py-4 border-b border-border">
            <span className="text-muted-foreground">Genişlik Aralığı</span>
            <span className="font-medium text-right">{widthRange}</span>
          </div>
          <div className="flex justify-between py-4 border-b border-border">
            <span className="text-muted-foreground">Kurulum</span>
            <span className="font-medium text-right">{installation}</span>
          </div>
        </div>

        {/* Features List */}
        {features && features.length > 0 && (
          <div className="bg-muted/10 rounded-2xl p-8 border border-border">
            <h3 className="font-mono text-sm tracking-wider uppercase text-muted-foreground mb-6">Öne Çıkan Özellikler</h3>
            <ul className="space-y-4">
              {features.map((feature, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="mt-1 bg-champagne/10 p-1 rounded-full text-champagne shrink-0">
                    <Check className="w-4 h-4" />
                  </div>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}
