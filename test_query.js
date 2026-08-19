require('dotenv').config({path: '.env.local'});
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

const now = new Date()
const subDays = (d, days) => new Date(d.getTime() - days * 24 * 60 * 60 * 1000)
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const endDate = now.toISOString()
const startDate = startOfDay(subDays(now, 30)).toISOString()

async function test() {
  console.log("Start:", startDate, "End:", endDate)
  const res1 = await supabase.from('analytics_events').select('session_id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate);
  console.log('Query 1 count:', res1.count, 'Error:', res1.error);
  
  const res2 = await supabase.from('analytics_events').select('session_id', { count: 'exact', head: true }).gte('created_at', startDate).lte('created_at', endDate).eq('event_name', 'page_view');
  console.log('Query 2 count:', res2.count, 'Error:', res2.error);
}

test();
