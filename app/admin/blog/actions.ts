"use server"

import { revalidatePath } from 'next/cache'
import { callAI } from '@/lib/ai'
import { getAdminClient } from '@/lib/supabase-admin'

export async function getAdminBlogPosts() {
  try {
    const supabase = getAdminClient()
    const { data: posts, error } = await supabase
      .from('blog')
      .select('*')
      .order('created_at', { ascending: false, nullsFirst: false })

    if (error) {
      console.error('[getAdminBlogPosts] Error:', error)
      return []
    }
    return posts || []
  } catch (err) {
    console.error('[getAdminBlogPosts] Exception:', err)
    return []
  }
}

export async function uploadBlogCoverImage(formData: FormData): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    const file = formData.get('file') as File
    if (!file) {
      return { success: false, error: 'Yüklenecek dosya bulunamadı.' }
    }

    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'Lütfen geçerli bir görsel dosyası seçin (PNG, JPEG, WebP vb.).' }
    }

    if (file.size > 10 * 1024 * 1024) {
      return { success: false, error: 'Görsel boyutu 10 MB\'dan küçük olmalıdır.' }
    }

    const supabase = getAdminClient()
    const ext = file.name.split('.').pop() || 'jpg'
    const fileName = `covers/${Date.now()}-${Math.random().toString(36).slice(2, 10)}.${ext}`

    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)

    const { error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, buffer, {
        contentType: file.type,
        cacheControl: '3600',
        upsert: true
      })

    if (uploadError) {
      console.error('[uploadBlogCoverImage] Upload error:', uploadError)
      return { success: false, error: uploadError.message }
    }

    const { data } = supabase.storage.from('blog-images').getPublicUrl(fileName)
    return { success: true, url: data.publicUrl }
  } catch (err: any) {
    console.error('[uploadBlogCoverImage] Exception:', err)
    return { success: false, error: err?.message || 'Görsel yüklenirken bir hata oluştu.' }
  }
}

export async function generateAiBlogContent(data: {
  title: string
  description?: string
  tags?: string[]
  modelOverride?: string
}): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    if (!data.title.trim()) {
      return { success: false, error: 'Lütfen önce bir yazı başlığı girin.' }
    }

    const systemPrompt = `Sen ERAYDUŞ duşakabin ve banyo mimarisi markası için uzman bir Türkçe blog yazarısın.
Kurallar:
- Doğal, akıcı, uzman bir Türkçe dil kullan.
- 'Bu kapsamlı rehberde', 'Sonuç olarak', 'Özetle', 'Bu yazımızda', 'Hayatımızın vazgeçilmez bir parçasıdır' gibi robotik AI kalıplarını ASLA KULLANMA.
- İlk cümlede doğrudan okuyucunun aradığı pratik bilgiye veya çözüme gir.
- <h2> alt başlıkları, akıcı paragraflar ve <ul><li> madde imleri kullan.
- 350 ile 600 kelime arasında kapsamlı, bilgilendirici ve SEO dostu bir HTML içerik üret. Sadece <p>, <h2>, <h3>, <ul>, <li>, <strong> etiketlerini kullan. <html> veya <body> tagleri ekleme.`

    const userPrompt = `Başlık: "${data.title}"
${data.description ? `Özet Bilgi: "${data.description}"` : ''}
${data.tags?.length ? `Etiketler: ${data.tags.join(', ')}` : ''}

Bu başlık için banyo yenilemek veya duşakabin seçmek isteyen kullanıcılara rehberlik edecek, gerçek uzmanlık içeren zengin bir Türkçe blog makalesi yaz.`

    const res = await callAI(
      systemPrompt,
      userPrompt,
      data.modelOverride || 'gemma4:31b',
      1200
    )

    if ('error' in res && res.error) {
      return { success: false, error: res.error }
    }

    let cleanContent = (res.content || '').trim()
    // Markdown code block wrapperlarını temizle
    cleanContent = cleanContent.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim()

    return { success: true, content: cleanContent }
  } catch (err: any) {
    console.error('[generateAiBlogContent] Error:', err)
    return { success: false, error: err?.message || 'Yapay zeka içeriği üretilemedi.' }
  }
}

export async function generateBlogFaqContent(data: {
  title: string
  modelOverride?: string
}): Promise<{ success: boolean; content?: string; error?: string }> {
  try {
    if (!data.title.trim()) {
      return { success: false, error: 'Lütfen önce bir yazı başlığı girin.' }
    }

    const systemPrompt = `Sen ERAYDUŞ banyo ve duşakabin uzmanısın.
"${data.title}" başlıklı blog yazısı için Google SSS (FAQ) zengin snippet standartlarına uygun, kullanıcıların en çok sorduğu 3 kritik soru ve kısa net uzman yanıtları hazırla.
Format: Sadece <h3>Soru</h3><p>Cevap</p> şeklinde temiz HTML döndür. Giriş/sonuç metni ekleme.`

    const res = await callAI(
      systemPrompt,
      `Blog Başlığı: "${data.title}"`,
      data.modelOverride || 'gemma4:31b',
      500
    )

    if ('error' in res && res.error) {
      return { success: false, error: res.error }
    }

    let clean = (res.content || '').trim()
    clean = clean.replace(/^```html\s*/i, '').replace(/^```\s*/i, '').replace(/\s*```$/i, '').trim()

    return { success: true, content: `<h2>Sıkça Sorulan Sorular</h2>\n${clean}` }
  } catch (err: any) {
    return { success: false, error: err?.message || 'SSS üretilemedi' }
  }
}



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
    const supabase = getAdminClient()

    const payload = {
      title: data.title,
      slug: data.slug,
      description: data.description || null,
      body: data.body || null,
      featured_image: data.featured_image || null,
      status: data.status || 'published',
      published_at: data.status === 'draft' ? null : new Date().toISOString(),
      seo_title: data.seo_title || data.title,
      seo_description: data.seo_description || data.description || null,
      tags: data.tags || [],
      updated_at: new Date().toISOString()
    }

    const { data: post, error } = await supabase
      .from('blog')
      .insert(payload)
      .select()
      .single()

    if (error) {
      console.error('[createBlogPost] Error:', error)
      return { success: false, error: error.message }
    }

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
    const supabase = getAdminClient()

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

    const { error } = await supabase
      .from('blog')
      .update(patch)
      .eq('id', id)

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
    const supabase = getAdminClient()

    const { error } = await supabase
      .from('blog')
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
    const supabase = getAdminClient()
    const { data: post, error } = await supabase
      .from('blog')
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
