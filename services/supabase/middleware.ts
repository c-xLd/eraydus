import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Set x-pathname header so Server Components can read the current path
  request.headers.set('x-pathname', pathname)

  // Public pages (home, koleksiyonlar, blog, etc.) must NOT call getUser().
  // Calling auth.getUser() here would force every matched route into dynamic
  // rendering and kill static/ISR caching (hurting TTFB and the Real
  // Experience Score). Only admin/login paths need the session check.
  const needsAuth = pathname.startsWith('/admin') || pathname.startsWith('/giris')
  if (!needsAuth) {
    return NextResponse.next({ 
      request: { headers: request.headers } 
    })
  }

  let supabaseResponse = NextResponse.next({
    request: { headers: request.headers },
  })

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || 'https://xzxutzjzjdyjheivdxdl.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY || 'sb_publishable_g0itJI2YsAytCSuPGT18xw_Rl-VxHbY';

  const supabase = createServerClient(
    url,
    key,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // This refreshes the session if expired - required to access the current user
  const { data: { user } } = await supabase.auth.getUser()

  // Protect /admin routes
  if (pathname.startsWith('/admin')) {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = '/giris'
      url.searchParams.set('redirectedFrom', pathname)
      return NextResponse.redirect(url)
    }

    // [RBAC] Rol Tabanlı Erişim Kontrolü
    const { data: profile } = await supabase
      .from('profiles')
      .select('role_id, is_suspended')
      .eq('id', user.id)
      .single()

    // 1=SUPER_ADMIN, 2=ADMIN, 3=EDITOR, 4=SALES, 5=SEO_MANAGER, 6=WAREHOUSE
    const validRoleIds = [1, 2, 3, 4, 5, 6]
    
    if (!profile || !validRoleIds.includes(profile.role_id) || profile.is_suspended) {
      const url = request.nextUrl.clone()
      url.pathname = '/' // Yetkisizse anasayfaya at
      return NextResponse.redirect(url)
    }

    // [MFA Enforcement]
    // AAL (Authenticator Assurance Level) kontrolü
    const { data: aalData } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel()
    const currentLevel = aalData?.currentLevel
    const nextLevel = aalData?.nextLevel
    
    // Eğer kullanıcının MFA'sı varsa (nextLevel === 'aal2') ama girmemişse (currentLevel === 'aal1')
    if (nextLevel === 'aal2' && currentLevel === 'aal1') {
      if (!pathname.startsWith('/admin/mfa')) {
        const url = request.nextUrl.clone()
        url.pathname = '/admin/mfa'
        url.searchParams.set('next', pathname)
        return NextResponse.redirect(url)
      }
    }
  }

  // If user is logged in and tries to access /giris, redirect to /admin
  if (pathname.startsWith('/giris')) {
    if (user) {
      const url = request.nextUrl.clone()
      url.pathname = '/admin'
      url.search = ''
      return NextResponse.redirect(url)
    }
  }

  // Harden auth-sensitive responses against clickjacking / MIME sniffing and
  // keep them out of shared caches.
  supabaseResponse.headers.set('X-Frame-Options', 'DENY')
  supabaseResponse.headers.set('X-Content-Type-Options', 'nosniff')
  supabaseResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  supabaseResponse.headers.set('Cache-Control', 'no-store, max-age=0')

  // [CSP] Sadece /admin için katı Güvenlik Başlıkları
  if (pathname.startsWith('/admin')) {
    const csp = `
      default-src 'self';
      script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://connect.facebook.net;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: https: blob:;
      font-src 'self' data:;
      connect-src 'self' https://*.supabase.co wss://*.supabase.co https://*.vercel-scripts.com https://vitals.vercel-insights.com https://*.google-analytics.com;
      frame-ancestors 'none';
      form-action 'self';
    `.replace(/\s{2,}/g, ' ').trim()

    supabaseResponse.headers.set('Content-Security-Policy', csp)
  }

  return supabaseResponse
}
