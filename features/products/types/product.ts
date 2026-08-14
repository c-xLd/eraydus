export interface GlassOption {
  id: string
  name: string
  description: string
  color_class: string
  sort_order: number
  status: string
}

export interface ProfileOption {
  id: string
  name: string
  hex_color: string
  sort_order: number
  status: string
}

export interface ProductGalleryImage {
  id: string
  product_id: string
  image_url: string
  alt_text: string | null
  sort_order: number
}

export interface ProductVariant {
  id: string
  product_id: string
  sku: string
  name: string
  price: number
  sale_price: number | null
  stock_quantity: number
  attributes: Record<string, string>
  status: string
}

export interface TechnicalSpecs {
  glass_thickness: string[]
  height: string
  width_range: string
  installation: string
}

export interface ProductDetail {
  id: string
  sku: string
  slug: string
  name: string
  short_description: string | null
  description: string | null
  long_description: string | null
  collection_id: string | null
  category_id: string | null
  base_price: number | null
  starting_price: number | null
  sale_price: number | null
  layout_type: string | null
  cabin_shape: string | null
  main_image_url: string | null
  images?: string[] | null
  features: string[]
  technical_specs: TechnicalSpecs
  production_time?: string | null
  availability?: string | null
  warranty?: string | null
  compatible_glass: string[]
  compatible_profiles: string[]
  status: string
  featured: boolean
  new_product: boolean
  best_seller: boolean
  meta_title: string | null
  meta_description: string | null
  canonical_url: string | null
  created_at: string
  updated_at: string
  // Relations
  collection?: {
    id: string
    name: string
    slug: string
  }
  category?: {
    id: string
    name: string
    slug: string
  }
  gallery: ProductGalleryImage[]
  variants: ProductVariant[]
}

export interface ProductWithOptions extends ProductDetail {
  glass_options: GlassOption[]
  profile_options: ProfileOption[]
}
