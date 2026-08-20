import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/services/supabase/middleware'
import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

// Initialize Upstash Redis ONLY if env vars exist
let ratelimit: Ratelimit | null = null

try {
  if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
    const redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
    
    // Create a new ratelimiter, that allows 10 requests per 10 seconds
    ratelimit = new Ratelimit({
      redis: redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
      prefix: '@upstash/ratelimit',
    })
  }
} catch (e) {
  console.warn('Failed to initialize Redis Rate Limiter:', e)
}

export async function proxy(request: NextRequest) {
  const ip = (request as any).ip ?? request.headers.get('x-forwarded-for') ?? '127.0.0.1'
  const pathname = request.nextUrl.pathname

  // 1. DYNAMIC EDGE REDIRECTS (SEO)
  // Fetch from Supabase with 60s Next.js cache to preserve Edge speed
  if (!pathname.startsWith('/admin') && !pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    try {
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co'
      const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY'
      const redirectsRes = await fetch(`${supabaseUrl}/rest/v1/seo_redirects?select=old_url,new_url,status_code&old_url=eq.${encodeURIComponent(pathname)}`, {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        next: { revalidate: 60, tags: ['seo-redirects'] }
      })
      if (redirectsRes.ok) {
        const redirects = await redirectsRes.json()
        if (redirects && redirects.length > 0) {
          const r = redirects[0]
          return NextResponse.redirect(new URL(r.new_url, request.url), r.status_code)
        }
      }
    } catch (e) {
      console.warn('Edge redirect fetch failed:', e)
    }
  }

  // Apply rate limiting to /api/admin or /giris routes to prevent brute force at the Edge
  if (ratelimit && (pathname.startsWith('/api/admin') || pathname.startsWith('/giris'))) {
    try {
      const { success, pending, limit, reset, remaining } = await ratelimit.limit(`ratelimit_${ip}`)
      
      if (!success) {
        return NextResponse.json(
          { error: 'Too many requests' },
          { 
            status: 429,
            headers: {
              'X-RateLimit-Limit': limit.toString(),
              'X-RateLimit-Remaining': remaining.toString(),
              'X-RateLimit-Reset': reset.toString()
            }
          }
        )
      }
    } catch (e) {
      console.warn('Rate limit error:', e)
      // Fail open if Redis is down
    }
  }

  const response = await updateSession(request)
  response.headers.set('x-pathname', request.nextUrl.pathname)
  
  // Security Headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  response.headers.set('Content-Security-Policy', "default-src 'self' 'unsafe-inline' 'unsafe-eval' https: wss: data: blob:;")

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}