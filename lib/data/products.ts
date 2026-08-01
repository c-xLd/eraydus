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
  originalPrice?: number | null
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
  { 
    id: 'seffaf', 
    name: 'Şeffaf', 
    colorClass: 'bg-white/20 backdrop-blur-sm', 
    desc: 'Maksimum ışık geçirgenliği ve ferahlık',
    imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/seffaf.jpeg'
  },
  { 
    id: 'fume-siyah', 
    name: 'Füme Siyah', 
    colorClass: 'bg-black/60 backdrop-blur-md', 
    desc: 'Keskin hatlar ve lüks görünüm',
    imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/fume.jpeg'
  },
  { 
    id: 'bronz', 
    name: 'Bronz', 
    colorClass: 'bg-amber-900/40 backdrop-blur-md', 
    desc: 'Sıcak tonlar ve zarif yansıma',
    imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/bronz.jpeg'
  },
  { 
    id: 'aynali', 
    name: 'Aynalı', 
    colorClass: 'bg-slate-300/80 backdrop-blur-sm', 
    desc: 'Genişlik hissi ve tam mahremiyet',
    imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/aynali.jpeg'
  },
  { 
    id: 'kumlama', 
    name: 'Kumlama', 
    colorClass: 'bg-white/40 backdrop-blur-xl', 
    desc: 'Özel desenler ve modern doku',
    imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/kumlamali.jpeg'
  },
  { 
    id: 'buz-mat', 
    name: 'Buz Mat', 
    colorClass: 'bg-white/50 backdrop-blur-2xl', 
    desc: 'Pürüzsüz mat yüzey ve gizlilik',
    imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/buzlu.jpeg'
  },
]

export const profileOptions = [
  { id: 'beyaz', name: 'Beyaz', hex: '#F9FAFB', imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/beyaz.jpeg' },
  { id: 'firca-parlak', name: 'Fırça Parlak', hex: '#E8E9EB', imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/firca-parlak.jpeg' },
  { id: 'gold', name: 'Gold', hex: '#D4AF37', imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/gold.jpeg' },
  { id: 'siyah', name: 'Siyah', hex: '#1A1A1A', imageUrl: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/siyah.jpeg' },
]
