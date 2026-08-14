import { createClient as createSupabaseClient } from '@supabase/supabase-js'

// Public read-only client WITHOUT cookies.
// Use for public data (products, published posts) in build-time contexts
// (sitemap, generateStaticParams) and statically/PPR-rendered pages so they
// don't bail out to dynamic rendering via `cookies()`.
// Only reads data allowed by public RLS SELECT policies.
export function createPublicClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY';

  return createSupabaseClient(
    url,
    key,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  )
}
