"use server"

import { createClient } from '@/lib/server'
import { revalidatePath } from 'next/cache'
import { callAI, type AIResult } from '@/lib/ai'

// ============================================================
// AI Content Generation — Ollama Cloud Motoru (@/lib/ai)
// ============================================================

const SYSTEM_TR = `
Sen Erayduş adlı lüks duşakabin ve banyo sistemleri markası için uzman bir Türkçe içerik ve SEO uzmanısın.
Ton: Lüks, mimari, estetik, net ve ikna edici.
Klişelerden ("Bu kapsamlı rehberde", "Sonuç olarak", "Özetle") kaçın.
Sadece istenen içeriği döndür, açıklama veya ek tırnak işareti ekleme.
`

export async function generateProductDescription(req: {
  productName: string
  features?: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productName, features = "", modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `"${productName}" ürünü için detaylı, mimari ve lüks bir Türkçe ürün açıklaması yaz. Özellikler/Detaylar: ${features || '6-8mm temperli cam, paslanmaz profil, kusursuz sızdırmazlık'}. Kalite, suyun akışı ve modern banyo estetiğini vurgula. 2-3 paragraf olsun.`,
    modelOverride || 'gemma4:31b',
    600
  )
}

export async function generateSEOTitle(req: {
  productName: string
  mainFeature?: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productName, mainFeature = "", modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `"${productName}" ürünü için Google SEO standartlarına uygun, en fazla 60 karakterlik tek bir başlık üret. Ana özellik: ${mainFeature || 'Lüks Duşakabin'}. Sadece başlığı döndür.`,
    modelOverride || 'gemma4:31b',
    100
  )
}

export async function generateMetaDescription(req: {
  productDescription?: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productDescription = "", modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `Aşağıdaki ürün için 160 karakteri geçmeyen, tıklanma oranını artıracak ikna edici bir Türkçe meta açıklaması yaz. Sadece metni döndür.\n\nÜrün Bilgisi: ${productDescription}`,
    modelOverride || 'gemma4:31b',
    150
  )
}

export async function generateBlogIntro(req: {
  productDescription?: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productDescription = "", modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `Aşağıdaki ürün/konu hakkında ilgi çekici, mimari bir Türkçe blog giriş paragrafı yaz. Banyo yenileyen ev sahiplerine ve tasarım meraklılarına hitap etsin.\n\nKonu: ${productDescription}`,
    modelOverride || 'gemma4:31b',
    300
  )
}

export async function generateWhatsAppText(req: {
  productName: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productName, modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `"${productName}" ürünü için samimi, kibar ve kurumsal bir WhatsApp müşteri bilgilendirme/teklif mesajı yaz. Detayları, özel ölçü imkanını ve müşteri temsilcisine yönlendirmeyi içersin. Sadece mesajı döndür.`,
    modelOverride || 'gemma4:31b',
    250
  )
}

export async function generateProductFAQs(req: {
  productName: string
  productDescription?: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productName, productDescription = "", modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `"${productName}" adlı lüks duşakabin modeli için müşterilerin montaj, cam kalınlığı, temizlik ve su sızdırmazlığı ile ilgili en çok merak ettiği 3 adet Sıkça Sorulan Soru (SSS) ve uzman yanıtları hazırla. Doğrudan ve net olsun.\n\nÜrün Detayı: ${productDescription}`,
    modelOverride || 'gemma4:31b',
    400
  )
}

export async function generateProductHighlights(req: {
  productName: string
  features?: string
  modelOverride?: string
}): Promise<AIResult> {
  const { productName, features = "", modelOverride } = req
  return callAI(
    SYSTEM_TR,
    `"${productName}" için ürün kartında ve detay sayfasında listelenecek 4 adet vurucu, mimari ve teknik özellik maddesi yaz (Örn: 8mm Temperli Emniyet Camı, Eloksal Paslanmaz Alüminyum Profil vb.). Sadece tire (-) ile başlayan maddeleri döndür.`,
    modelOverride || 'gemma4:31b',
    200
  )
}



export async function deleteProduct(id: string) {
  const supabase = (await createClient()) as any

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
  revalidatePath('/urunler')

  return { success: true }
}

export async function createAttribute(data: { name: string, slug: string, type: string }) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('product_attributes').insert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/attributes')
  return { success: true }
}

export async function createCategory(data: { name: string, slug: string, parent_category?: string }) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('categories').insert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/categories')
  revalidatePath('/urunler', 'layout')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteCategory(id: string) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('categories').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/categories')
  revalidatePath('/urunler', 'layout')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function updateCategory(id: string, data: any) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('categories').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/categories')
  revalidatePath('/urunler', 'layout')
  revalidatePath('/', 'layout')
  return { success: true }
}

export async function deleteAttribute(id: string) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('product_attributes').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/attributes')
  return { success: true }
}

export async function updateAttribute(id: string, data: any) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('product_attributes').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath('/admin/products/attributes')
  return { success: true }
}

export async function createAttributeTerm(data: { attribute_id: string, name: string, slug: string, color_code?: string }) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('product_attribute_terms').insert(data)
  if (error) return { success: false, error: error.message }
  revalidatePath(`/admin/products/attributes/${data.attribute_id}`)
  return { success: true }
}

export async function deleteAttributeTerm(id: string, attribute_id: string) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('product_attribute_terms').delete().eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath(`/admin/products/attributes/${attribute_id}`)
  return { success: true }
}

export async function updateAttributeTerm(id: string, attribute_id: string, data: any) {
  const supabase = (await createClient()) as any
  const { error } = await supabase.from('product_attribute_terms').update(data).eq('id', id)
  if (error) return { success: false, error: error.message }
  revalidatePath(`/admin/products/attributes/${attribute_id}`)
  return { success: true }
}

export async function revalidateProductPaths(categorySlug?: string, productSlug?: string) {
  revalidatePath('/urunler')
  revalidatePath('/urunler', 'layout')
  if (categorySlug) {
    revalidatePath(`/urunler/${categorySlug}`)
    revalidatePath(`/urunler/${categorySlug}`, 'layout')
    if (productSlug) {
      revalidatePath(`/urunler/${categorySlug}/${productSlug}`)
    }
  }
  revalidatePath('/')
  return { success: true }
}

function parseCSV(text: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentCell = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentCell += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentCell.trim());
      currentCell = '';
    } else if ((char === '\r' || char === '\n') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++;
      }
      currentRow.push(currentCell.trim());
      if (currentRow.length > 0 && currentRow.some(c => c.length > 0)) {
        rows.push(currentRow);
      }
      currentRow = [];
      currentCell = '';
    } else {
      currentCell += char;
    }
  }

  if (currentCell.length > 0 || currentRow.length > 0) {
    currentRow.push(currentCell.trim());
    if (currentRow.some(c => c.length > 0)) {
      rows.push(currentRow);
    }
  }

  return rows;
}

function slugify(text: string): string {
  if (!text) return '';
  const trMap: Record<string, string> = {
    'ç': 'c', 'Ç': 'c', 'ğ': 'g', 'Ğ': 'g', 'ı': 'i', 'I': 'i', 'İ': 'i',
    'ö': 'o', 'Ö': 'o', 'ş': 's', 'Ş': 's', 'ü': 'u', 'Ü': 'u'
  };
  return text
    .toString()
    .replace(/[çÇğĞıIİöÖşŞüÜ]/g, (match) => trMap[match] || match)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function importWooCommerceCSVAction(csvText: string) {
  try {
    const supabase = (await createClient()) as any
    const rows = parseCSV(csvText)

    if (rows.length < 2) {
      return { success: false, error: 'CSV dosyasında geçerli başlık ve ürün verisi bulunamadı.' }
    }

    const headers = rows[0].map(h => h.replace(/^"/, '').replace(/"$/, '').trim())
    const getIndex = (name: string) => headers.findIndex(h => h.toLowerCase() === name.toLowerCase())

    const idxId = getIndex('Kimlik')
    const idxSku = getIndex('Stok kodu (SKU)')
    const idxName = getIndex('İsim')
    const idxPublished = getIndex('Yayımlanmış')
    const idxFeatured = getIndex('Öne çıkan?')
    const idxShortDesc = getIndex('Kısa açıklama')
    const idxDesc = getIndex('Açıklama')
    const idxRegularPrice = getIndex('Normal fiyat')
    const idxSalePrice = getIndex('İndirimli satış fiyatı')
    const idxCategories = getIndex('Kategoriler')
    const idxImages = getIndex('Görseller')

    if (idxName === -1) {
      return { success: false, error: 'CSV içerisinde "İsim" sütunu bulunamadı. Lütfen geçerli bir WooCommerce CSV dışa aktarım dosyası seçin.' }
    }

    // Fetch existing categories
    const { data: existingCategories } = await supabase.from('categories').select('*')
    const categoryMap = new Map<string, string>()
    if (existingCategories) {
      existingCategories.forEach((c: { name: string; id: string }) => categoryMap.set(c.name.toLowerCase(), c.id))
    }

    const productRows = rows.slice(1)
    let importedCount = 0
    let skippedCount = 0
    const errors: string[] = []

    for (let i = 0; i < productRows.length; i++) {
      const row = productRows[i]
      const name = row[idxName] || ''
      if (!name) {
        skippedCount++
        continue
      }

      const rawSku = row[idxSku] || ''
      const rawId = row[idxId] || ''
      const sku = rawSku ? rawSku.trim() : `eray-${rawId || i + 1}`
      const slug = slugify(name) || `urun-${rawId || i + 1}`

      // Category handling
      const categoryString = row[idxCategories] || 'Genel'
      const mainCategoryName = categoryString.split('>')[0].split(',')[0].trim()
      let categoryId = categoryMap.get(mainCategoryName.toLowerCase())

      if (!categoryId && mainCategoryName) {
        const catSlug = slugify(mainCategoryName)
        const { data: newCat } = await supabase
          .from('categories')
          .insert([{ name: mainCategoryName, slug: catSlug, status: 'active' }])
          .select()
          .single()

        if (newCat) {
          categoryId = newCat.id
          categoryMap.set(mainCategoryName.toLowerCase(), newCat.id)
        }
      }

      // Prices
      const regPriceStr = (row[idxRegularPrice] || '').replace(',', '.')
      const salePriceStr = (row[idxSalePrice] || '').replace(',', '.')

      const regularPrice = regPriceStr ? parseFloat(regPriceStr) : null
      const salePrice = salePriceStr ? parseFloat(salePriceStr) : null
      const basePrice = salePrice || regularPrice || 0
      const startingPrice = regularPrice && salePrice ? regularPrice : basePrice

      // Images: Auto-upload to Supabase Storage in [slug]/[seo-name] structure
      const rawImages = row[idxImages] || ''
      const rawImagesArray = rawImages
        ? rawImages.split(',').map(u => u.trim()).filter(u => u.startsWith('http'))
        : []

      const finalImagesArray: string[] = []

      for (let imgIdx = 0; imgIdx < rawImagesArray.length; imgIdx++) {
        const imageUrl = rawImagesArray[imgIdx]
        if (imageUrl.includes('.supabase.co/storage/')) {
          finalImagesArray.push(imageUrl)
        } else {
          try {
            const response = await fetch(imageUrl, {
              headers: { 'User-Agent': 'Mozilla/5.0' }
            })
            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer()
              const buffer = Buffer.from(arrayBuffer)
              let ext = 'jpg'
              const cleanUrl = imageUrl.split('?')[0]
              if (cleanUrl.endsWith('.png')) ext = 'png'
              else if (cleanUrl.endsWith('.webp')) ext = 'webp'

              const seoFileName = `${slug}-eraydus-${imgIdx + 1}.${ext}`
              const storagePath = `${slug}/${seoFileName}`

              const { error: uploadErr } = await supabase.storage
                .from('products')
                .upload(storagePath, buffer, {
                  contentType: response.headers.get('content-type') || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
                  upsert: true
                })

              if (!uploadErr) {
                const { data: publicUrlData } = supabase.storage
                  .from('products')
                  .getPublicUrl(storagePath)
                if (publicUrlData?.publicUrl) {
                  finalImagesArray.push(publicUrlData.publicUrl)
                  continue
                }
              }
            }
          } catch (e) {}
          finalImagesArray.push(imageUrl)
        }
      }

      const isPublished = row[idxPublished] === '1' || row[idxPublished] === 'true'
      const isFeatured = row[idxFeatured] === '1' || row[idxFeatured] === 'true'

      const productPayload = {
        sku,
        slug,
        name,
        short_description: row[idxShortDesc] || null,
        description: row[idxDesc] || null,
        category_id: categoryId || null,
        base_price: basePrice,
        starting_price: startingPrice,
        sale_price: salePrice,
        status: isPublished ? 'active' : 'draft',
        featured: isFeatured,
        images: finalImagesArray.length > 0 ? finalImagesArray : null,
        updated_at: new Date().toISOString()
      }

      const { error: upsertErr } = await supabase
        .from('products')
        .upsert(productPayload, { onConflict: 'sku' })

      if (upsertErr) {
        const { error: slugUpsertErr } = await supabase
          .from('products')
          .upsert(productPayload, { onConflict: 'slug' })

        if (slugUpsertErr) {
          errors.push(`Ürün "${name}" aktarılamadı: ${upsertErr.message}`)
          skippedCount++
        } else {
          importedCount++
        }
      } else {
        importedCount++
      }
    }

    revalidatePath('/admin/products')
    revalidatePath('/admin/products/categories')
    revalidatePath('/urunler')
    revalidatePath('/')

    return {
      success: true,
      importedCount,
      skippedCount,
      errors: errors.slice(0, 5)
    }
  } catch (err: any) {
    return { success: false, error: err.message || 'CSV aktarılırken beklenmeyen bir hata oluştu.' }
  }
}

export async function duplicateProduct(id: string) {
  const supabase = (await createClient()) as any

  // Fetch the product to duplicate
  const { data: product, error: fetchError } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (fetchError || !product) {
    return { success: false, error: fetchError?.message || 'Ürün bulunamadı' }
  }

  const { id: _, created_at, updated_at, ...newProduct } = product

  newProduct.name = `${newProduct.name} (Kopya)`
  newProduct.slug = `${newProduct.slug}-kopya-${Math.floor(Math.random() * 1000)}`
  if (newProduct.sku) {
    newProduct.sku = `${newProduct.sku}-KOPYA`
  }

  const { error: insertError } = await supabase
    .from('products')
    .insert([newProduct])

  if (insertError) {
    return { success: false, error: insertError.message }
  }

  revalidatePath('/admin/products')
  return { success: true }
}

export async function bulkDeleteProducts(ids: string[]) {
  const supabase = (await createClient()) as any

  const { error } = await supabase
    .from('products')
    .delete()
    .in('id', ids)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/urunler')

  return { success: true }
}

export async function updateProductStatus(id: string, status: string) {
  const supabase = (await createClient()) as any

  const { error } = await supabase
    .from('products')
    .update({ status })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/urunler')

  return { success: true }
}

export async function updateProductPrice(id: string, base_price: number, sale_price: number | null) {
  const supabase = (await createClient()) as any

  const { error } = await supabase
    .from('products')
    .update({ base_price, sale_price })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/urunler')

  return { success: true }
}

export async function updateProductSEO(id: string, description: string) {
  const supabase = (await createClient()) as any

  const { error } = await supabase
    .from('products')
    .update({ description })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/urunler')

  return { success: true }
}

export async function updateProductBasicInfo(id: string, name: string, sku: string | null) {
  const supabase = (await createClient()) as any

  // Sadece isim ve SKU güncelliyoruz
  const { error } = await supabase
    .from('products')
    .update({ name, sku })
    .eq('id', id)

  if (error) {
    return { success: false, error: error.message }
  }

  revalidatePath('/admin/products')
  revalidatePath('/urunler')

  return { success: true }
}
