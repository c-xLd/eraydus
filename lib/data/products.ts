export type ProductVariant = {
  id: string
  name: string
  sku: string
  price: number
  salePrice?: number | null
  stockQuantity: number
  attributes: Record<string, string>
}

export type Product = {
  id: string
  slug: string
  name: string
  collectionId: string
  collectionName: string
  collectionSlug?: string
  layoutType: string
  price: number
  isNew: boolean
  description: string
  longDescription: string
  image: string
  gallery: string[]
  features: string[]
  technicalSpecs: {
    glassThickness: string[]
    height: string
    widthRange: string
    installation: string
  }
  compatibleGlass: { id: string; name: string; colorClass: string; desc: string }[]
  compatibleProfiles: { id: string; name: string; hex: string }[]
  variants?: ProductVariant[]
  cabinShape?: string
}

export const glassOptions = [
  { id: 'clear', name: 'Şeffaf Extra Clear', colorClass: 'bg-white/20 backdrop-blur-sm', desc: 'Maksimum ışık geçirgenliği' },
  { id: 'smoke', name: 'Füme (Siyah) Cam', colorClass: 'bg-black/60 backdrop-blur-md', desc: 'Gizlilik ve lüks görünüm' },
  { id: 'bronze', name: 'Bronz Cam', colorClass: 'bg-amber-900/40 backdrop-blur-md', desc: 'Sıcak tonlar ve zarif yansıma' },
  { id: 'fluted', name: 'Oluklu (Fluted) Cam', colorClass: 'bg-white/30 backdrop-blur-[2px] repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(255,255,255,0.1) 4px, rgba(255,255,255,0.1) 8px)', desc: 'Retro-modern yarı saydam yapı' },
  { id: 'frosted', name: 'Buzlu (Kumlama) Cam', colorClass: 'bg-white/40 backdrop-blur-xl', desc: 'Tam mahremiyet' },
]

export const profileOptions = [
  { id: 'black', name: 'Mat Siyah', hex: '#1A1A1A' },
  { id: 'chrome', name: 'Parlak Krom', hex: '#E8E9EB' },
  { id: 'gold', name: 'Fırçalanmış Altın', hex: '#D4AF37' },
  { id: 'bronze', name: 'Antik Bronz', hex: '#CD7F32' },
  { id: 'white', name: 'Mat Beyaz', hex: '#F9FAFB' },
]
