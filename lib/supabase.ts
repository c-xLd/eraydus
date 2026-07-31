import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-url.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Using `any` here temporarily to avoid widespread `never` type errors
// while we progressively restore full Database typings from migrations.
export const supabase = createClient<any>(supabaseUrl, supabaseAnonKey)
