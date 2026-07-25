import { notFound } from 'next/navigation'
import { getBlogPostById } from '../actions'
import EditBlogClient from '../components/EditBlogClient'

export const metadata = {
  title: 'Blog Yazısını Düzenle | Erayduş Admin',
}

type Props = { params: Promise<{ id: string }> }

export default async function EditBlogPostPage({ params }: Props) {
  const { id } = await params
  const post = await getBlogPostById(id)

  if (!post) {
    notFound()
  }

  return <EditBlogClient post={post} />
}
