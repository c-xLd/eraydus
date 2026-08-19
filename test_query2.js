require('dotenv').config({path: '.env.local'});


// Actually I can just write the test script here for products
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const now = new Date()
const subDays = (d, days) => new Date(d.getTime() - days * 24 * 60 * 60 * 1000)
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const endDate = now.toISOString()
const startDate = startOfDay(subDays(now, 30)).toISOString()

async function test() {
  const { data: events, error } = await supabase
    .from('analytics_events')
    .select('product_id, event_name, products(name)')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .not('product_id', 'is', null)
    .in('event_name', ['product_view', 'whatsapp_click'])

  console.log("Top Products Error:", error)
  console.log("Events:", events ? events.length : 0)
}
test();

