"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function saveGlobalSeo(data: any) {
  // In a real app, global SEO might be saved to a specific row in settings or seo_metadata with page_slug='global'
  const supabase = await createClient()

  const { data: existing } = await supabase
    .from('seo_metadata')
    .select('id')
    .eq('page_type', 'global')
    .single()

  let updated;
  let error;

  const payload = {
    page_type: 'global',
    page_slug: 'global',
    title: data.siteTitle,
    description: data.siteDesc,
    keywords: data.keywords,
    robots_index: data.robots?.includes('index') && !data.robots?.includes('noindex'),
    robots_follow: data.robots?.includes('follow') && !data.robots?.includes('nofollow'),
    og_image: data.ogImage,
    twitter_handle: data.twitterHandle,
    title_separator: data.titleSeparator,
    updated_at: new Date().toISOString()
  };

  if (existing) {
    const res = await supabase.from('seo_metadata').update(payload).eq('id', existing.id).select().single()
    updated = res.data
    error = res.error
  } else {
    const res = await supabase.from('seo_metadata').insert(payload).select().single()
    updated = res.data
    error = res.error
  }

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/seo')
  revalidatePath('/')

  return { success: true, data: updated }
}

export async function updateSeoMetadata(id: string, data: any) {
  const supabase = await createClient()

  const { data: updated, error } = await supabase
    .from('seo_metadata')
    .update({
      title: data.title,
      description: data.description,
      keywords: data.keywords,
      status: data.status,
      og_image: data.ogImage,
      faq_schema_enabled: data.faqSchemaEnabled,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single()

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/seo')

  return { success: true, data: updated }
}

export async function deleteSeoMetadata(id: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('seo_metadata')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/seo')

  return { success: true }
}
