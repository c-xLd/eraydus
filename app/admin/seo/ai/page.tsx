import { createClient } from '@/lib/server'
import AiAssistantClient from './AiAssistantClient'

export const metadata = {
  title: 'AI SEO & İçerik Stüdyosu | Erayduş Admin'
}

export default async function Page() {
  const supabase = (await createClient()) as any
  const { data: products } = await supabase
    .from('products')
    .select('id, name, slug')
    .order('name', { ascending: true })

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <AiAssistantClient products={products || []} />
    </div>
  )
}
