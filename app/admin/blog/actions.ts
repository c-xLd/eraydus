"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function createBlogPost(data: {
  title: string
  slug: string
  description?: string
  body?: string
  featured_image?: string
  status?: string
  seo_title?: string
  seo_description?: string
  tags?: string[]
}) {
  try {
    const supabase = await createClient()

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      body: data.body || null,
      featured_image: data.featured_image || null,
      content_type: 'blog',
      status: data.status || 'published',
      published_at: data.status === 'draft' ? null : new Date().toISOString(),
      seo_title: data.seo_title || data.title,
      seo_description: data.seo_description || data.description || null,
      tags: data.tags || [],
      updated_at: new Date().toISOString()
    }

    const { data: post, error } = await supabase
      .from('content_calendar')
      .insert(payload)
      .select()
      .single()

    if (error) return { success: false, error: error.message }

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    if (data.slug) revalidatePath(`/blog/${data.slug}`)

    return { success: true, id: post.id as string }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Yazı oluşturulamadı' }
  }
}

export async function updateBlogPost(id: string, data: {
  title: string
  slug: string
  description?: string
  body?: string
  featured_image?: string
  status?: string
  seo_title?: string
  seo_description?: string
  tags?: string[]
}) {
  try {
    const supabase = await createClient()

    const patch: Record<string, any> = {
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      body: data.body || null,
      featured_image: data.featured_image || null,
      status: data.status || 'published',
      seo_title: data.seo_title || data.title,
      seo_description: data.seo_description || data.description || null,
      tags: data.tags || [],
      updated_at: new Date().toISOString()
    }

    if (data.status === 'published') {
      patch.published_at = new Date().toISOString()
    }

    console.log('[updateBlogPost] attempting update for id:', id)
    console.log('[updateBlogPost] patch keys:', Object.keys(patch))

    const { error, count } = await supabase
      .from('content_calendar')
      .update(patch)
      .eq('id', id)

    console.log('[updateBlogPost] result — error:', error, 'count:', count)

    if (error) {
      console.error('[updateBlogPost] Supabase error:', JSON.stringify(error, null, 2))
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/blog')
    revalidatePath('/blog')
    if (data.slug) revalidatePath(`/blog/${data.slug}`)

    return { success: true }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Yazı güncellenemedi' }
  }
}

export async function deleteBlogPost(id: string) {
  try {
    const supabase = await createClient()

    const { error } = await supabase
      .from('content_calendar')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }

    revalidatePath('/admin/blog')
    revalidatePath('/blog')

    return { success: true }
  } catch (e: any) {
    return { success: false, error: e?.message || 'Yazı silinemedi' }
  }
}

export async function getBlogPostById(id: string) {
  try {
    const supabase = await createClient()
    const { data: post, error } = await supabase
      .from('content_calendar')
      .select('*')
      .eq('id', id)
      .maybeSingle()

    if (error) throw error
    return post
  } catch (e: any) {
    console.error('Error fetching blog post by id:', e)
    return null
  }
}
