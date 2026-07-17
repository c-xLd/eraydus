import { createClient } from '@/lib/server'
import { AttributeTermsClient } from './components/AttributeTermsClient'
import { notFound } from 'next/navigation'

export const metadata = {
  title: 'Nitelik Değerleri | Erayduş Admin',
}

export default async function AttributeTermsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()
  
  // Nitelik bilgilerini çek
  const { data: attribute } = await supabase
    .from('product_attributes')
    .select('*')
    .eq('id', id)
    .single()
    
  if (!attribute) {
    notFound()
  }

  // Niteliğe ait terimleri çek
  const { data: terms } = await supabase
    .from('product_attribute_terms')
    .select('*')
    .eq('attribute_id', id)
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <AttributeTermsClient attribute={attribute} terms={terms || []} />
    </div>
  )
}
