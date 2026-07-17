"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'
import { callOpenRouter, type AIResult } from '@/lib/ai'

// ============================================================
// AI Content Generation — paylaşılan istemci (@/lib/ai) üzerinden.
// ============================================================

const SYSTEM_TR =
  "Sen Erayduş adlı lüks duşakabin markası için uzman bir Türkçe içerik ve SEO uzmanısın. Sadece istenen içeriği döndür, açıklama veya ek not ekleme."

export async function generateProductDescription(req: {
  productName: string
  features?: string
}): Promise<AIResult> {
  const { productName, features = "" } = req
  return callOpenRouter(
    SYSTEM_TR,
    `"${productName}" ürünü için detaylı, profesyonel bir Türkçe ürün açıklaması yaz. Özellikler: ${features}. Lüks, kalite ve kullanım avantajlarını vurgula. 2-3 paragraf olsun.`,
    ""
  )
}

export async function generateSEOTitle(req: {
  productName: string
  mainFeature?: string
}): Promise<AIResult> {
  const { productName, mainFeature = "" } = req
  return callOpenRouter(
    SYSTEM_TR,
    `"${productName}" ürünü için SEO uyumlu, en fazla 60 karakterlik tek bir başlık üret. Ana özellik: ${mainFeature}. Türkçe anahtar kelimeler içersin. Sadece başlığı döndür, tırnak kullanma.`,
    `${productName} - Kaliteli Duşakabin Çözümleri`
  )
}

export async function generateMetaDescription(req: {
  productDescription?: string
}): Promise<AIResult> {
  const { productDescription = "" } = req
  return callOpenRouter(
    SYSTEM_TR,
    `Aşağıdaki ürün için 160 karakteri geçmeyen, ikna edici bir Türkçe meta açıklaması yaz. Anahtar kelimeler ve bir çağrı (call-to-action) içersin. Sadece metni döndür.\n\nÜrün: ${productDescription}`,
    "Erayduş ile kaliteli duşakabin sistemleri. Özel üretim, lüks tasarım ve mimari çözümler."
  )
}

export async function generateBlogIntro(req: {
  productDescription?: string
}): Promise<AIResult> {
  const { productDescription = "" } = req
  return callOpenRouter(
    SYSTEM_TR,
    `Aşağıdaki ürün/konu hakkında ilgi çekici bir Türkçe blog giriş paragrafı yaz. Banyo yenilemek isteyen ev sahiplerine hitap etsin, uzmanlık ve faydaları öne çıkarsın.\n\nKonu: ${productDescription}`,
    "Erayduş ile hayalinizdeki banyo deneyimi artık gerçek. Her detay özenle tasarlanır, uzmanlıkla uygulanır."
  )
}

export async function generateWhatsAppText(req: {
  productName: string
}): Promise<AIResult> {
  const { productName } = req
  return callOpenRouter(
    SYSTEM_TR,
    `"${productName}" ürünü için samimi, kısa bir WhatsApp teklif/tanıtım mesajı yaz. Ana faydaları, bir çağrı (call-to-action) ve müşteri hizmeti bilgisini içersin. Emojileri ölçülü kullan. Sadece mesajı döndür.`,
    `Merhaba! Erayduş ${productName} ile banyonuzu yenileyin. Özel üretim, lüks ve kalite. Detaylı bilgi için bize WhatsApp'tan yazın.`
  )
}

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

