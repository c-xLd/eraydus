const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function testStorage() {
  const buckets = ['products', 'projects', 'uploads', 'kumlama-models'];
  for (const bucket of buckets) {
    console.log(`\n--- Checking bucket: ${bucket} ---`);
    const { data, error } = await supabase.storage.from(bucket).list('', { limit: 100 });
    if (error) {
      console.error(`Error listing ${bucket}:`, error.message);
    } else {
      console.log(`Found ${data.length} items in ${bucket}:`);
      data.forEach(f => console.log(` - ${f.name} (id: ${f.id}, meta: ${JSON.stringify(f.metadata)})`));
    }
  }
}

testStorage();
