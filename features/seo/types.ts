export type PageType = 'product' | 'collection' | 'page' | 'blog' | 'category'

export interface SeoMetadata {
  id: string
  page_type: PageType
  page_id: string | null
  page_slug: string | null
  title: string
  description: string | null
  keywords: string | null
  og_image: string | null
  og_title: string | null
  og_description: string | null
  robots_index: boolean
  robots_follow: boolean
  canonical_url: string | null
  status: string
  created_at: string
  updated_at: string
}

export interface SeoSettings {
  id: string
  site_title: string
  default_meta_description: string | null
  canonical_base_url: string | null
  default_og_image: string | null
  language: string
  locale: string
  robots_txt_content: string | null
  product_title_template: string
  product_desc_template: string
  category_title_template: string
  category_desc_template: string
  schema_settings: any | null
}

export type SeoIssueSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'

export interface SeoIssue {
  id: string
  severity: SeoIssueSeverity
  type: string
  message: string
  entity_type: PageType | 'global'
  entity_id: string | null
  entity_slug: string | null
  entity_name: string
}

export interface SeoAuditReport {
  healthScore: number
  totalUrls: number
  indexedUrls: number
  noindexUrls: number
  orphanUrls: number
  missingCanonical: number
  issues: SeoIssue[]
}

export interface ProductSeoInfo {
  id: string
  name: string
  slug: string
  categories: { slug: string }[] | null
  seo_metadata?: SeoMetadata
}
