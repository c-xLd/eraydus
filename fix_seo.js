const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  console.log("Fetching products and seo_metadata...")
  
  const { data: products, error: pError } = await supabase
    .from('products')
    .select('id, name, slug, description')
    .not('category_id', 'is', null)
    
  if (pError) {
    console.error("Error fetching products:", pError)
    return
  }
  
  const { data: seoRecords, error: sError } = await supabase
    .from('seo_metadata')
    .select('page_id')
    .eq('page_type', 'product')
    
  if (sError) {
    console.error("Error fetching seo_metadata:", sError)
    return
  }
  
  const seoSet = new Set(seoRecords.map(s => s.page_id))
  
  const missingProducts = products.filter(p => !seoSet.has(p.id))
  
  console.log(`Found ${missingProducts.length} products missing SEO metadata. Inserting...`)
  
  let insertedCount = 0
  
  for (const product of missingProducts) {
    const { error: insertError } = await supabase
      .from('seo_metadata')
      .insert({
        page_type: 'product',
        page_id: product.id,
        page_slug: product.slug,
        title: `${product.name} | Erayduş Banyo Sistemleri`,
        description: product.description 
          ? product.description.slice(0, 150) + '...'
          : `${product.name} modelleri, özel ölçü ve lüks tasarım seçenekleriyle Erayduş kalitesinde.`,
        keywords: `${product.name}, duşakabin, banyo, erayduş`,
        status: 'published'
      })
      
    if (insertError) {
      console.error(`Error inserting seo metadata for ${product.id}:`, insertError)
    } else {
      insertedCount++
    }
  }
  
  console.log(`Successfully inserted ${insertedCount} SEO records.`)
}

run()
