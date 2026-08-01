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
      existingCategories.forEach(c => categoryMap.set(c.name.toLowerCase(), c.id))
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
