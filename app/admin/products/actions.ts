"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'

export async function deleteProduct(id: string) {
  const supabase = await createClient()

  // Müşterinin (product) varyasyonları vb. silinmesi gerekebilir ancak 
  // schema'da product_id foreign key'leri ON DELETE CASCADE olabilir.
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/koleksiyonlar')

  return { success: true }
}

export async function createAttribute(data: { name: string, slug: string, type: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('product_attributes').insert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/attributes')
  return { success: true }
}

export async function createCategory(data: { name: string, slug: string, parent_category?: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').insert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/categories')
  revalidatePath('/koleksiyonlar', 'layout')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/categories')
  revalidatePath('/koleksiyonlar', 'layout')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateCategory(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('categories').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/categories')
  revalidatePath('/koleksiyonlar', 'layout')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteAttribute(id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('product_attributes').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/attributes')
  return { success: true }
}

export async function updateAttribute(id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('product_attributes').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/attributes')
  return { success: true }
}

export async function createAttributeTerm(data: { attribute_id: string, name: string, slug: string, color_code?: string }) {
  const supabase = await createClient()
  const { error } = await supabase.from('product_attribute_terms').insert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath(`/admin/products/attributes/${data.attribute_id}`)
  return { success: true }
}

export async function deleteAttributeTerm(id: string, attribute_id: string) {
  const supabase = await createClient()
  const { error } = await supabase.from('product_attribute_terms').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath(`/admin/products/attributes/${attribute_id}`)
  return { success: true }
}

export async function updateAttributeTerm(id: string, attribute_id: string, data: any) {
  const supabase = await createClient()
  const { error } = await supabase.from('product_attribute_terms').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath(`/admin/products/attributes/${attribute_id}`)
  return { success: true }
}

export async function revalidateProductPaths(categorySlug?: string, productSlug?: string) {
  revalidatePath('/koleksiyonlar')
  revalidatePath('/koleksiyonlar', 'layout')
  if (categorySlug) {
    revalidatePath(`/koleksiyonlar/${categorySlug}`)
    revalidatePath(`/koleksiyonlar/${categorySlug}`, 'layout')
    if (productSlug) {
      revalidatePath(`/koleksiyonlar/${categorySlug}/${productSlug}`)
    }
  }
  revalidatePath('/')
  return { success: true }
}

