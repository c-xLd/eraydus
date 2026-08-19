import BlogClient from './components/BlogClient'
import { getAdminBlogPosts } from './actions'

export const metadata = {
  title: 'Blog Yönetimi | Erayduş Admin',
}

export const dynamic = 'force-dynamic'

export default async function AdminBlogPage() {
  const posts = await getAdminBlogPosts()

  return (
    <BlogClient initialPosts={(posts as any[]) || []} />
  )
}
