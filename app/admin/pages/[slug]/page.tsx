import { getSitePage } from '@/features/pages/services/pages'
import { notFound } from 'next/navigation'
import { DynamicPageEditor } from '@/features/pages/components/DynamicPageEditor'

export const metadata = {
  title: 'Sayfa Düzenle | Erayduş Admin',
}

interface PageProps {
  params: Promise<{ slug: string }>
}

export default async function PageEditorPage({ params }: PageProps) {
  const { slug } = await params
  const page = await getSitePage(slug)

  if (!page) {
    notFound()
  }

  return (
    <DynamicPageEditor 
      pageSlug={page.slug} 
      pageTitle={page.title} 
      initialBlocks={page.blocks || []}
      initialContent={page.content}
    />
  )
}
