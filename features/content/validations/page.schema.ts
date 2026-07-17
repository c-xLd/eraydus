import { z } from 'zod'

export const baseBlockSchema = z.object({
  id: z.string().uuid(),
  type: z.enum([
    'hero', 'text', 'image', 'gallery', 'video', 
    'cta', 'quote', 'product_showcase', 'comparison_table', 
    'faq', 'spacer', 'divider', 'two_column', 'three_column'
  ]),
  data: z.any() // Can be refined further based on block type
})

export const pageSeoSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  ogImage: z.string().url().optional().or(z.literal('')),
  keywords: z.string().optional()
})

export const sitePageSchema = z.object({
  slug: z.string().min(1, 'Slug zorunludur'),
  title: z.string().min(1, 'Başlık zorunludur'),
  blocks: z.array(baseBlockSchema).default([]),
  seo: pageSeoSchema.default({}),
  status: z.enum(['draft', 'published']).default('draft')
})

export type SitePageFormData = z.infer<typeof sitePageSchema>
