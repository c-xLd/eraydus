'use server'

import { createClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'
import { SitePageFormData } from '../validations/page.schema'

export async function savePageContent(slug: string, data: Partial<SitePageFormData>) {
  try {
    const supabase = await createClient()
    
    // Build update payload
    const payload: any = {}
    if (data.title !== undefined) payload.title = data.title
    if (data.blocks !== undefined) payload.blocks = data.blocks
    if (data.seo !== undefined) payload.seo = data.seo
    if (data.status !== undefined) payload.status = data.status

    const { error } = await supabase
      .from('site_pages')
      .update(payload)
      .eq('slug', slug)

    if (error) throw error

    revalidatePath(`/${slug}`)
    if (slug === 'hakkimizda') revalidatePath('/hakkimizda')
    if (slug === 'jakuzi-tekneler') revalidatePath('/jakuzi-tekneler')

    return { success: true }
  } catch (error) {
    console.error('Error saving page content:', error)
    return { success: false, error: 'Kaydetme başarısız oldu' }
  }
}

export async function publishPage(slug: string) {
  return savePageContent(slug, { status: 'published' })
}

export async function unpublishPage(slug: string) {
  return savePageContent(slug, { status: 'draft' })
}
