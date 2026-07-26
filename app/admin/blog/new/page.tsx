import type { Metadata } from 'next'
import { BlogNewClient } from './BlogNewClient'

export const metadata: Metadata = {
  title: 'Yeni Blog Yazısı',
  description: 'Yeni bir blog yazısı oluşturun.',
  robots: {
    index: false,
    follow: false,
  }
}

export default function NewBlogPostPage() {
  return <BlogNewClient />
}
