import { createClient as createSupabaseClient } from '@supabase/supabase-js'

export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co'
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  return createSupabaseClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
