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

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
      url.searchParams.delete('redirectedFrom')
      return NextResponse.redirect(url)
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

  return supabaseResponse
}
