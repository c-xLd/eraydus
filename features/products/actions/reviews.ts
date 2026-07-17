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
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { success: false, data: [] }
  }

  const { data, error } = await supabase
    .from('product_reviews')
    .select('*, product:products(name, slug)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching all reviews:', error)
    return { success: false, data: [] }
  }

  return { success: true, data }
}

export async function submitProductReview(formData: FormData) {
  // Honeypot check
  const honeypot = formData.get('website_url')
  if (honeypot) {
    // If honeypot is filled, it's a bot. Silently reject.
    return { success: true, message: 'Bot detected.' } // Pretend it succeeded
  }

  const productId = formData.get('product_id') as string
  const authorName = formData.get('author_name') as string
  const authorEmail = formData.get('author_email') as string
  const content = formData.get('content') as string
  const ratingStr = formData.get('rating') as string
  const rating = parseInt(ratingStr, 10)

  // Validate math captcha (e.g. 5 + 3 = 8)
  const mathAnswer = formData.get('math_answer') as string
  if (mathAnswer !== '8') {
    return { success: false, error: 'Matematik doğrulamasını yanlış girdiniz.' }
  }

  if (!productId || !authorName || !content || !rating) {
    return { success: false, error: 'Lütfen zorunlu alanları doldurun.' }
  }

  const supabase = await createClient()

  // Handle optional images (if they upload some)
  // For now, let's just accept the text data. Images can be handled via upload-actions separately 
  // and passed as JSON/array of URLs in a hidden field if implemented in the frontend.
  const imageUrlsStr = formData.get('images') as string
  let images: string[] = []
  if (imageUrlsStr) {
    try {
      images = JSON.parse(imageUrlsStr)
    } catch(e) {}
  }

  const { error } = await supabase
    .from('product_reviews')
    .insert({
      product_id: productId,
      author_name: authorName,
      author_email: authorEmail || null,
      rating: rating,
      content: content,
      images: images.length > 0 ? images : null,
      is_approved: false // Always false by default
    })

  if (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: 'Yorumunuz gönderilirken bir hata oluştu.' }
  }

  return { success: true, message: 'Yorumunuz başarıyla alındı ve onay sürecine eklendi.' }
}

export async function updateReviewStatus(reviewId: string, isApproved: boolean) {
  const authClient = await createClient()
  
  // Verify Admin
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) {
    return { success: false, error: 'Yetkisiz erişim.' }
  }

  const { error } = await authClient
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
  const authClient = await createClient()
  
  // Verify Admin
  const { data: { user } } = await authClient.auth.getUser()
  if (!user) {
    return { success: false, error: 'Yetkisiz erişim.' }
  }

  const { error } = await authClient
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
