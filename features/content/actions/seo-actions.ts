'use server'

import { createClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'

export interface SeoData {
  title?: string
  description?: string
  keywords?: string
}

export async function getPageSeo(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('site_pages')
    .select('seo')
    .eq('slug', slug)
    .single()
    
  if (error || !data) {
    return { success: false, data: null }
  }
  
  return { success: true, data: data.seo as SeoData }
}

export async function updatePageSeo(slug: string, seoData: SeoData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    return { success: false, error: 'Yetkisiz erişim.' }
  }

  try {
    const { error } = await supabase
      .from('site_pages')
      .update({ seo: seoData })
      .eq('slug', slug)

    if (error) throw error

    revalidatePath(`/${slug === 'anasayfa' ? '' : slug}`)
    return { success: true }
  } catch (error: any) {
    return { success: false, error: error.message }
  }
}
