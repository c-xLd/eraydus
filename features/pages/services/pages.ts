'use server'

import { createClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'

export interface SitePage {
  slug: string
  title: string
  content: any
  blocks?: any[]
  seo?: any
  status?: string
  created_at: string
  updated_at: string
}

export async function getSitePage(slug: string): Promise<SitePage | null> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_pages')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error || !data) return null
    return data as SitePage
  } catch (error) {
    console.error('Error fetching site page:', error)
    return null
  }
}

export async function getAllSitePages(): Promise<SitePage[]> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('site_pages')
      .select('slug, title, updated_at')
      .order('title', { ascending: true })

    if (error || !data) return []
    return data as SitePage[]
  } catch (error) {
    console.error('Error fetching all site pages:', error)
    return []
  }
}

export async function updateSitePageContent(slug: string, content: any): Promise<boolean> {
  try {
    const supabase = await createClient()
    const { error } = await supabase
      .from('site_pages')
      .update({ content })
      .eq('slug', slug)

    if (error) {
      console.error('Error updating site page content:', error)
      return false
    }

    // Revalidate paths so the UI updates
    revalidatePath(`/${slug}`)
    if (slug === 'hakkimizda') revalidatePath('/hakkimizda')
    if (slug === 'jakuzi-tekneler') revalidatePath('/jakuzi-tekneler')
    
    return true
  } catch (error) {
    console.error('Error in updateSitePageContent:', error)
    return false
  }
}
