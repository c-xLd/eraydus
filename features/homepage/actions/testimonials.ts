'use server'

import { createClient as createLocalClient } from '@/services/supabase/server'
import { createAdminClient } from '@/services/supabase/server'

async function getAdminSupabase() {
  let supabase: any
  try {
    if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
      supabase = createAdminClient()
    } else {
      supabase = await createLocalClient()
    }
  } catch {
    supabase = await createLocalClient()
  }
  return supabase
}
import { revalidatePath, revalidateTag } from 'next/cache'
import { z } from 'zod'

const testimonialSchema = z.object({
  name: z.string().min(1, 'İsim zorunludur'),
  role: z.string().optional(),
  quote: z.string().min(1, 'Yorum metni zorunludur'),
  rating: z.coerce.number().min(1).max(5),
  is_published: z.boolean().default(true),
  image_url: z.string().optional().nullable(),
})

export type TestimonialInput = z.infer<typeof testimonialSchema>

export async function getTestimonialsList() {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching testimonials:', error)
    return { data: null, error: error.message }
  }

  return { data, error: null }
}

export async function createTestimonial(input: TestimonialInput) {
  const supabase = await getAdminSupabase()
  
  const parsed = testimonialSchema.safeParse(input)
  if (!parsed.success) {
    return { data: null, error: 'Geçersiz veri' }
  }

  const { data, error } = await supabase
    .from('testimonials')
    .insert(parsed.data)
    .select()
    .single()

  if (error) {
    console.error('Error creating testimonial:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  revalidateTag('testimonials')

  return { data, error: null }
}

export async function updateTestimonial(id: string, input: Partial<TestimonialInput>) {
  const supabase = await getAdminSupabase()
  
  const { data, error } = await supabase
    .from('testimonials')
    .update(input)
    .eq('id', id)
    .select()
    .maybeSingle()

  if (error) {
    console.error('Error updating testimonial:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  revalidateTag('testimonials')

  return { data, error: null }
}

export async function deleteTestimonial(id: string) {
  const supabase = await getAdminSupabase()
  
  const { error } = await supabase
    .from('testimonials')
    .delete()
    .eq('id', id)

  if (error) {
    console.error('Error deleting testimonial:', error)
    return { data: null, error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/testimonials')
  revalidateTag('testimonials')

  return { data: true, error: null }
}
