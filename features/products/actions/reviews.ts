'use server'

import { createClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'

export async function getApprovedReviews(productId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('product_reviews')
    .select('*')
    .eq('product_id', productId)
    .eq('is_approved', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching reviews:', error)
    return { success: false, data: [] }
  }

  return { success: true, data }
}

export async function getAllReviews() {
  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import('@/services/supabase/server')
      supabase = createAdminClient()
    } else {
      supabase = await createClient()
    }
  } catch {
    supabase = await createClient()
  }

  const { data, error } = await supabase
    .from('product_reviews')
    .select('*, product:products(name, slug)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('getAllReviews: Error fetching all reviews:', error)
    return { success: false, data: [] }
  }

  return { success: true, data }
}

export async function submitProductReview(formData: FormData) {
  // Honeypot check
  const honeypot = formData.get('website_url')
  if (honeypot) {
    return { success: true, message: 'Bot detected.' }
  }

  const productId = formData.get('product_id') as string
  const authorName = formData.get('author_name') as string
  const authorEmail = formData.get('author_email') as string
  const content = formData.get('content') as string
  const ratingStr = formData.get('rating') as string
  const rating = parseInt(ratingStr, 10)

  // Validate math captcha (e.g. 3 + 5 = 8)
  const mathAnswer = formData.get('math_answer') as string
  if (mathAnswer && mathAnswer.trim() !== '8') {
    return { success: false, error: 'Lütfen güvenlik sorusunu doğru yanıtlayın (3 + 5 = 8).' }
  }

  if (!productId || !authorName || !content || !rating) {
    return { success: false, error: 'Lütfen tüm zorunlu alanları doldurun.' }
  }

  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import('@/services/supabase/server')
      supabase = createAdminClient()
    } else {
      supabase = await createClient()
    }
  } catch {
    supabase = await createClient()
  }

  const imageUrlsStr = formData.get('images') as string
  let images: string[] = []
  if (imageUrlsStr) {
    try {
      images = JSON.parse(imageUrlsStr)
    } catch(e) {}
  }

  const { data: insertedData, error } = await supabase
    .from('product_reviews')
    .insert({
      product_id: productId,
      author_name: authorName,
      author_email: authorEmail || null,
      rating: rating,
      content: content,
      images: images.length > 0 ? images : null,
      is_approved: false // Set to false so reviews must be approved by admin
    })

  if (error) {
    console.error('Error submitting review:', error)
    // If RLS blocked anon insert, still return useful message or success if client handles optimistic update
    return { 
      success: false, 
      error: error.code === '42501' 
        ? 'Veritabanı erişim izni (RLS) nedeniyle kayıt yapılamadı. Lütfen Supabase SQL editöründe public insert iznini etkinleştirin veya SUPABASE_SERVICE_ROLE_KEY ekleyin.' 
        : (error.message || 'Yorumunuz gönderilirken bir hata oluştu.') 
    }
  }

  revalidatePath('/urunler', 'layout')

  return { 
    success: true, 
    data: null, // Insert succeeded, but we can't return the row due to RLS
    message: 'Değerlendirmeniz başarıyla alındı. Yönetici onayından sonra yayınlanacaktır.' 
  }
}

export async function updateReviewStatus(reviewId: string, isApproved: boolean) {
  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import('@/services/supabase/server')
      supabase = createAdminClient()
    } else {
      supabase = await createClient()
    }
  } catch {
    supabase = await createClient()
  }

  const { error } = await supabase
    .from('product_reviews')
    .update({ is_approved: isApproved, updated_at: new Date().toISOString() })
    .eq('id', reviewId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reviews')
  return { success: true }
}

export async function deleteReview(reviewId: string) {
  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      const { createAdminClient } = await import('@/services/supabase/server')
      supabase = createAdminClient()
    } else {
      supabase = await createClient()
    }
  } catch {
    supabase = await createClient()
  }

  const { error } = await supabase
    .from('product_reviews')
    .delete()
    .eq('id', reviewId)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/reviews')
  return { success: true }
}

export async function getSandblastedModels() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('sandblasted_models')
    .select('*')
    .order('title', { ascending: true })

  if (error) {
    console.error('Error fetching sandblasted models:', error)
    return { success: false, data: [] }
  }

  return { success: true, data: data || [] }
}
