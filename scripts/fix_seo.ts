import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve('c:/Users/ahmet/Documents/GitHub/eraydus/.env.local') })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  const { data: products } = await supabase.from('products').select('id, name, slug, categories(slug)').eq('status', 'active')
  const { data: settings } = await supabase.from('seo_settings').select('*').single()
  const { data: metaDataList } = await supabase.from('seo_metadata').select('*').eq('page_type', 'product')

  const metaMap = new Map(metaDataList?.map(m => [m.page_id, m]) || [])
  
  if (!settings?.canonical_base_url || !settings?.default_meta_description) {
      console.log('Fixing global settings...')
      await supabase.from('seo_settings').upsert({ 
          id: settings?.id || 1, 
          canonical_base_url: 'https://www.eraydus.net',
          default_meta_description: 'Ankara Siteler merkezli duşakabin üreticisi ERAYDUŞ. Özel ölçü imalat, ücretsiz keşif ve 2 yıl garantili banyo çözümleri.'
      })
  }

  for (const product of products || []) {
      const meta = metaMap.get(product.id)
      
      const humanizedTitle = `${product.name} | Erayduş Özel Ölçü Duşakabin (Ankara)`
      const humanizedDescription = `${product.name} modelini Erayduş kalitesiyle Ankara'da inceleyin. Banyonuzun ölçüsüne özel, paslanmaz profilli ve 6mm temperli camlı üretim. Ücretsiz keşif için arayın.`
      
      if (!meta) {
          console.log(`Creating meta for ${product.name}`)
          await supabase.from('seo_metadata').insert({
              page_id: product.id,
              page_type: 'product',
              title: humanizedTitle,
              description: humanizedDescription,
              robots_index: true,
              canonical_url: `https://www.eraydus.net/urun/${product.slug}`
          })
      } else {
          let updates: any = {}
          let needsUpdate = false
          
          if (!meta.robots_index) {
              updates.robots_index = true
              needsUpdate = true
          }
          if (!meta.canonical_url) {
              updates.canonical_url = `https://www.eraydus.net/urun/${product.slug}`
              needsUpdate = true
          }
          if (!meta.title || meta.title.length < 10) {
              updates.title = humanizedTitle
              needsUpdate = true
          }
          if (!meta.description || meta.description.length < 50) {
              updates.description = humanizedDescription
              needsUpdate = true
          }
          
          if (needsUpdate) {
              console.log(`Updating meta for ${product.name}`)
              await supabase.from('seo_metadata').update(updates).eq('id', meta.id)
          }
      }
      
      const isOrphan = !product.categories || product.categories.length === 0
      if (isOrphan) {
          // get tum-urunler category id
          const { data: cat } = await supabase.from('categories').select('id').eq('slug', 'tum-urunler').single()
          if (cat) {
              console.log(`Fixing orphan product ${product.name}`)
              await supabase.from('product_categories').insert({
                  product_id: product.id,
                  category_id: cat.id
              })
          }
      }
  }
  
  console.log('Done fixing SEO issues.')
}

run().catch(console.error)
