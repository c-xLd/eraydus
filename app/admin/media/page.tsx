import { Metadata } from 'next'
import { getMediaFiles } from './actions'
import { MediaLibraryClient } from './MediaLibraryClient'

export const metadata: Metadata = {
  title: 'Ortam Kütüphanesi | Erayduş Admin',
  description: 'WordPress tarzı medya ve ortam dosyası kütüphanesi.',
}

export default async function AdminMediaPage() {
  const result = await getMediaFiles('all')
  const initialItems = result.success && result.data ? result.data : []

  return <MediaLibraryClient initialItems={initialItems} />
}
