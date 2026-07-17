import { createClient } from '@/lib/server'
import { CategoryManagerClient } from './components/CategoryManagerClient'

export const metadata = {
  title: 'Kategoriler | Erayduş Admin',
}

export default async function CategoriesPage() {
  const supabase = await createClient()
  
  const { data: categories } = await supabase
    .from('categories')
    .select('*')
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      <CategoryManagerClient categories={categories || []} />
    </div>
  )
}
