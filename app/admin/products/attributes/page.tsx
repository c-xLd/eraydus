import { createClient } from '@/lib/server'
import { AttributeManagerClient } from './components/AttributeManagerClient'

export const metadata = {
  title: 'Nitelikler (Attributes) | Erayduş Admin',
}

export default async function AttributesPage() {
  const supabase = await createClient()
  
  let attributes: any[] = []
  try {
    const { data } = await supabase
      .from('product_attributes')
      .select('*')
      .order('created_at', { ascending: true })
    
    if (data) attributes = data
  } catch (err) {
    // Tablo henüz yoksa (migration bekliyorsa) sessizce yakala
  }

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <AttributeManagerClient attributes={attributes} />
    </div>
  )
}
