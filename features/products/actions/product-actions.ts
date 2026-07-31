'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Helper to get supabase client in actions
async function getSupabaseActionClient() {
  const cookieStore = await cookies()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co'
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY'

  return createServerClient<any>(url, key, {
    cookies: {
      getAll() { return cookieStore.getAll() },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch { }
      },
    },
  })
}

export async function submitProductReview(productId: string, userName: string, rating: number, comment: string) {
  try {
    const supabase = await getSupabaseActionClient()
    const { error } = await supabase.from('product_reviews').insert({
      product_id: productId,
      user_name: userName,
      rating,
      comment,
      is_approved: false // Requires admin approval
    } as any)

    if (error) throw error
    return { success: true }
  } catch (error) {
    console.error('Error submitting review:', error)
    return { success: false, error: 'Yorum gönderilirken bir hata oluştu.' }
  }
}
