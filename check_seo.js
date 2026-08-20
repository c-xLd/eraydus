const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

const supabase = createClient(supabaseUrl, supabaseKey)

async function run() {
  console.log("Checking seo_metadata table...")
  const { data, error } = await supabase.from('seo_metadata').select('*').limit(1)
  if (error) {
    console.error("Error fetching seo_metadata:", error)
  } else {
    console.log("seo_metadata table exists. Data:", data)
  }
}
run()
