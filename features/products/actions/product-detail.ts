'use server'

import { createClient } from '@/lib/server'
import type { ProductWithOptions, GlassOption, ProfileOption } from '@/features/products/types/product'
import { cache } from 'react'

/**
 * Fetch complete product details by slug
 * Includes gallery, variants, and all related data
 */
export const getProductBySlug = cache(async (slug: string): Promise<{ success: boolean; data?: ProductWithOptions; error?: string }> => {
  try {
    const supabase = await createClient()

    // Fetch product with relations
    const { data: product, error: productError } = await supabase
      .from('products')
      .select(`
        *,
        collection:collections(id, name, slug),
        category:categories(id, name, slug),
        gallery:product_gallery(id, product_id, image_url, alt_text, sort_order),
        variants:product_variants(id, product_id, sku, name, price, sale_price, stock_quantity, attributes, status)
      `)
      .eq('slug', slug)
      .eq('status', 'active')
      .order('sort_order', { referencedTable: 'product_gallery', ascending: true })
      .order('created_at', { referencedTable: 'product_variants', ascending: true })
      .single()

    if (productError) {
      console.error('Product fetch error:', productError)
      return { success: false, error: 'Ürün bulunamadı' }
    }

    if (!product) {
      return { success: false, error: 'Ürün bulunamadı' }
    }

    // Fetch glass and profile options in parallel
    const [glassResult, profileResult] = await Promise.all([
      supabase.from('glass_options').select('*').eq('status', 'active').order('sort_order'),
      supabase.from('profile_options').select('*').eq('status', 'active').order('sort_order')
    ])

    if (glassResult.error || profileResult.error) {
      console.error('Options fetch error:', glassResult.error || profileResult.error)
      return { success: false, error: 'Seçenekler yüklenemedi' }
    }

    // Filter glass and profile options based on product compatibility
    const compatibleGlassIds = product.compatible_glass || []
    const compatibleProfileIds = product.compatible_profiles || []

    const filteredGlassOptions = (glassResult.data || []).filter((opt: GlassOption) =>
      compatibleGlassIds.length === 0 || compatibleGlassIds.includes(opt.id)
    )

    const filteredProfileOptions = (profileResult.data || []).filter((opt: ProfileOption) =>
      compatibleProfileIds.length === 0 || compatibleProfileIds.includes(opt.id)
    )

    const productWithOptions: ProductWithOptions = {
      ...product,
      glass_options: filteredGlassOptions,
      profile_options: filteredProfileOptions,
      gallery: product.gallery || [],
      variants: (product.variants || []).filter((v: { status: string }) => v.status === 'active')
    }

    return { success: true, data: productWithOptions }
  } catch (error) {
    console.error('Unexpected error in getProductBySlug:', error)
    return { success: false, error: 'Beklenmeyen bir hata oluştu' }
  }
})

/**
 * Get all glass options (for global use)
 */
export const getAllGlassOptions = cache(async (): Promise<{ success: boolean; data?: GlassOption[]; error?: string }> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('glass_options')
      .select('*')
      .eq('status', 'active')
      .order('sort_order')

    if (error) {
      console.error('Glass options fetch error:', error)
      return { success: false, error: 'Cam seçenekleri yüklenemedi' }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Unexpected error in getAllGlassOptions:', error)
    return { success: false, error: 'Beklenmeyen bir hata oluştu' }
  }
})

/**
 * Get all profile options (for global use)
 */
export const getAllProfileOptions = cache(async (): Promise<{ success: boolean; data?: ProfileOption[]; error?: string }> => {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('profile_options')
      .select('*')
      .eq('status', 'active')
      .order('sort_order')

    if (error) {
      console.error('Profile options fetch error:', error)
      return { success: false, error: 'Profil seçenekleri yüklenemedi' }
    }

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Unexpected error in getAllProfileOptions:', error)
    return { success: false, error: 'Beklenmeyen bir hata oluştu' }
  }
})
