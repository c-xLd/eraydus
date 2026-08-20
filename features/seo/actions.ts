'use server'

import { createAdminClient } from '@/services/supabase/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function updateSeoMetadata(pageId: string, pageType: string, data: any) {
  const supabase = createAdminClient()
  
  const { data: existing } = await supabase
    .from('seo_metadata')
    .select('id')
    .eq('page_id', pageId)
    .single()

  if (existing) {
    const { error } = await supabase
      .from('seo_metadata')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('seo_metadata')
      .insert([{ page_id: pageId, page_type: pageType, ...data }])
    if (error) throw new Error(error.message)
  }

  // Clear cache depending on page type
  if (pageType === 'product') {
    revalidatePath('/urunler/[category]/[slug]', 'page')
  }
  revalidatePath('/', 'layout')
}

export async function getSeoSettings() {
  const supabase = createAdminClient()
  const { data } = await supabase.from('seo_settings').select('*').single()
  return data
}

export async function updateSeoSettings(data: any) {
  const supabase = createAdminClient()
  const existing = await getSeoSettings()
  
  if (existing) {
    const { error } = await supabase
      .from('seo_settings')
      .update({ ...data, updated_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabase
      .from('seo_settings')
      .insert([data])
    if (error) throw new Error(error.message)
  }
  
  revalidateTag('seo-settings')
  revalidatePath('/', 'layout')
}

export async function createRedirect(oldUrl: string, newUrl: string) {
  const supabase = createAdminClient()
  const { error } = await supabase
    .from('seo_redirects')
    .insert([{ old_url: oldUrl, new_url: newUrl, status_code: 301 }])
    
  if (error) {
    if (error.code === '23505') throw new Error('Bu URL için zaten bir yönlendirme var.')
    throw new Error(error.message)
  }
  
  // Clean up any 404 logs matching this oldUrl
  await supabase.from('seo_404_logs').update({ resolved: true }).eq('url', oldUrl)
  
  revalidatePath('/admin/seo/technical')
}
