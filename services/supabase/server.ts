import { createServerClient } from '@supabase/ssr'
import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY';

  return createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

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

// Admin client with service_role key to bypass RLS.
// Prefer createClient() with authenticated RLS policies when possible.
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!url || !serviceRoleKey) {
    throw new Error(
      'Missing Supabase admin credentials. Add SUPABASE_SERVICE_ROLE_KEY to .env.local (Supabase Dashboard → Settings → API → service_role key).'
    )
  }

  return createSupabaseClient(url, serviceRoleKey)
}
