'use server'

import { createClient } from '@/services/supabase/server'
import { revalidatePath } from 'next/cache'

export interface MediaItem {
  id: string
  name: string
  bucket: string
  path: string
  size: number
  created_at: string
  publicUrl: string
  mime_type: string
}

const BUCKETS = ['products', 'projects', 'uploads', 'kumlama-models', 'blog-images', 'images']

async function listBucketFilesRecursively(supabase: any, bucket: string, folderPath: string = ''): Promise<MediaItem[]> {
  const items: MediaItem[] = []
  try {
    const { data: files, error } = await supabase.storage
      .from(bucket)
      .list(folderPath, {
        limit: 100,
        offset: 0,
        sortBy: { column: 'created_at', order: 'desc' }
      })

    if (error || !files) return items

    const subFolderPromises: Promise<MediaItem[]>[] = []

    for (const file of files) {
      if (file.name === '.emptyFolderPlaceholder' || file.name.startsWith('.')) continue

      const fullPath = folderPath ? `${folderPath}/${file.name}` : file.name

      // Directory check: if file has no metadata or no id, or size is 0 and no mimetype
      if (!file.metadata || !file.id || (file.metadata && Object.keys(file.metadata).length === 0)) {
        subFolderPromises.push(listBucketFilesRecursively(supabase, bucket, fullPath))
      } else {
        const { data: { publicUrl } } = supabase.storage
          .from(bucket)
          .getPublicUrl(fullPath)

        const ext = file.name.split('.').pop()?.toLowerCase() || ''
        let mime = 'image/jpeg'
        if (ext === 'png') mime = 'image/png'
        else if (ext === 'webp') mime = 'image/webp'
        else if (ext === 'svg') mime = 'image/svg+xml'
        else if (ext === 'gif') mime = 'image/gif'

        items.push({
          id: `${bucket}/${fullPath}`,
          name: file.name,
          bucket,
          path: fullPath,
          size: file.metadata?.size || file.size || 0,
          created_at: file.created_at || file.updated_at || new Date().toISOString(),
          publicUrl,
          mime_type: file.metadata?.mimetype || mime
        })
      }
    }

    // Await all subfolder scans in parallel
    const subFolderResults = await Promise.all(subFolderPromises)
    subFolderResults.forEach(subItems => items.push(...subItems))
    
  } catch (e) {
    console.warn(`Error scanning bucket ${bucket} at path ${folderPath}:`, e)
  }
  return items
}

export async function getMediaFiles(selectedBucket?: string): Promise<{ success: boolean; data?: MediaItem[]; error?: string }> {
  try {
    const supabase = (await createClient()) as any
    const targetBuckets = selectedBucket && selectedBucket !== 'all' ? [selectedBucket] : BUCKETS
    const itemMap = new Map<string, MediaItem>()

    // 1. Recursively scan Supabase Storage buckets in parallel
    const bucketPromises = targetBuckets.map(bucket => listBucketFilesRecursively(supabase, bucket, ''))
    const bucketsResults = await Promise.all(bucketPromises)
    
    bucketsResults.forEach(bucketItems => {
      bucketItems.forEach((item) => itemMap.set(item.publicUrl, item))
    })

    const items = Array.from(itemMap.values())
    items.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

    return { success: true, data: items }
  } catch (error: any) {
    console.error('Error fetching media files:', error)
    return { success: false, error: 'Ortam dosyaları yüklenemedi.' }
  }
}

export async function uploadMediaFiles(formData: FormData, bucketName: string = 'products'): Promise<{ success: boolean; data?: MediaItem[]; error?: string }> {
  try {
    const files = formData.getAll('files') as File[]
    if (!files || files.length === 0) {
      return { success: false, error: 'Yüklenecek dosya seçilmedi.' }
    }

    const supabase = (await createClient()) as any
    const uploadedItems: MediaItem[] = []

    for (const file of files) {
      if (!file.type.startsWith('image/')) {
        continue // Only allow image files
      }

      // Generate a clean SEO-friendly unique file name
      const ext = file.name.split('.').pop() || 'webp'
      const rawBaseName = file.name.substring(0, file.name.lastIndexOf('.')) || 'image'
      const cleanName = rawBaseName
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/-+/g, '-')
      
      const fileName = `${Date.now()}-${cleanName}.${ext}`

      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true
        })

      if (error) {
        console.error(`Upload error for ${file.name}:`, error)
        continue
      }

      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName)

      uploadedItems.push({
        id: `${bucketName}/${fileName}`,
        name: fileName,
        bucket: bucketName,
        path: fileName,
        size: file.size,
        created_at: new Date().toISOString(),
        publicUrl,
        mime_type: file.type
      })
    }

    revalidatePath('/admin/media')
    return { success: true, data: uploadedItems }
  } catch (error: any) {
    console.error('Upload exception:', error)
    return { success: false, error: 'Görsel yükleme işlemi başarısız.' }
  }
}

export async function deleteMediaFile(bucket: string, path: string): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = (await createClient()) as any

    const { error } = await supabase.storage
      .from(bucket)
      .remove([path])

    if (error) {
      console.error('Storage remove error:', error)
      return { success: false, error: error.message }
    }

    revalidatePath('/admin/media')
    return { success: true }
  } catch (error: any) {
    console.error('Delete media exception:', error)
    return { success: false, error: 'Silme işlemi başarısız.' }
  }
}

export async function uploadFromUrl(imageUrl: string, bucketName: string = 'products'): Promise<{ success: boolean; data?: MediaItem; error?: string }> {
  try {
    const supabase = (await createClient()) as any

    const response = await fetch(imageUrl)
    if (!response.ok) {
      return { success: false, error: 'URL adresinden görsel alınamadı.' }
    }

    const contentType = response.headers.get('content-type') || 'image/jpeg'
    if (!contentType.startsWith('image/')) {
      return { success: false, error: 'Verilen URL geçerli bir görsel değil.' }
    }

    const arrayBuffer = await response.arrayBuffer()

    const ext = contentType.split('/')[1]?.split(';')[0] || 'jpg'
    let rawBaseName = imageUrl.split('/').pop()?.split('?')[0] || 'url-image'
    rawBaseName = rawBaseName.includes('.') ? rawBaseName.substring(0, rawBaseName.lastIndexOf('.')) : rawBaseName
    
    const cleanName = rawBaseName.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-')
    const fileName = `${Date.now()}-${cleanName}.${ext}`

    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(fileName, arrayBuffer, {
        contentType,
        cacheControl: '3600',
        upsert: true
      })

    if (error) {
      console.error('URL upload error:', error)
      return { success: false, error: 'Görsel depolamaya yüklenemedi.' }
    }

    const { data: { publicUrl } } = supabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    const mediaItem: MediaItem = {
      id: `${bucketName}/${fileName}`,
      name: fileName,
      bucket: bucketName,
      path: fileName,
      size: arrayBuffer.byteLength,
      created_at: new Date().toISOString(),
      publicUrl,
      mime_type: contentType
    }

    revalidatePath('/admin/media')
    return { success: true, data: mediaItem }
  } catch (error: any) {
    console.error('URL Upload exception:', error)
    return { success: false, error: 'Beklenmeyen bir hata oluştu.' }
  }
}
