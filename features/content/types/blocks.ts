import { z } from 'zod'

export type BlockType = 
  | 'hero' 
  | 'text' 
  | 'image' 
  | 'gallery' 
  | 'video' 
  | 'cta' 
  | 'quote' 
  | 'product_showcase' 
  | 'comparison_table' 
  | 'faq' 
  | 'spacer' 
  | 'divider' 
  | 'two_column' 
  | 'three_column'

export interface BaseBlock {
  id: string
  type: BlockType
  data: any
}

// Hero Block
export interface HeroBlockData {
  title_normal: string
  title_bold: string
  description?: string
  image_url?: string
  buttons?: Array<{ label: string; url: string; variant: 'primary' | 'secondary' }>
}

// Text Block
export interface TextBlockData {
  content: string // HTML or Rich Text
}

// Image Block
export interface ImageBlockData {
  url: string
  alt: string
  caption?: string
  full_width: boolean
}

// Gallery Block
export interface GalleryBlockData {
  images: Array<{ url: string; alt: string }>
  layout: 'grid' | 'carousel'
}

// Video Block
export interface VideoBlockData {
  url: string
  poster?: string
  autoplay: boolean
  loop: boolean
}

// CTA Block
export interface CTABlockData {
  title: string
  description: string
  button_label: string
  button_url: string
  variant: 'light' | 'dark' | 'champagne'
}

// Quote Block
export interface QuoteBlockData {
  text: string
  author?: string
  role?: string
}

// Product Showcase Block
export interface ProductShowcaseBlockData {
  title: string
  category_id?: string // Fetch dynamic if provided
  product_ids?: string[] // Manual selection if provided
  layout: 'grid' | 'carousel'
}

// FAQ Block
export interface FAQBlockData {
  title?: string
  items: Array<{ question: string; answer: string }>
}

// Spacer
export interface SpacerBlockData {
  height: 'small' | 'medium' | 'large' | 'xlarge' // e.g. 32px, 64px, 128px, 192px
}

// Divider
export interface DividerBlockData {
  style: 'solid' | 'dashed' | 'champagne'
}

// Layout Blocks (Simple columns supporting recursive or specific simple blocks)
// For simplicity in JSON, columns can just contain an array of BaseBlocks
export interface ColumnBlockData {
  col1: BaseBlock[]
  col2: BaseBlock[]
  col3?: BaseBlock[] // For three_column
}

export interface SitePageBlock extends BaseBlock {
  data: HeroBlockData | TextBlockData | ImageBlockData | GalleryBlockData | VideoBlockData | CTABlockData | QuoteBlockData | ProductShowcaseBlockData | FAQBlockData | SpacerBlockData | DividerBlockData | ColumnBlockData | any
}
