import { createClient } from '@/lib/server'
import BlogClient from './components/BlogClient'

export const metadata = {
  title: 'Blog Yönetimi | Erayduş Admin',
}

export default async function AdminBlogPage() {
  const supabase = await createClient()

  const { data: posts, error } = await supabase
    .from('blog')
    .select('*')
    .eq('content_type', 'blog')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Error fetching blog posts for admin:', error)
  }

  return (
    <BlogClient initialPosts={posts || []} />
  )
}
