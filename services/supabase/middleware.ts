import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
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
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!user) {
      const redirectUrl = request.nextUrl.clone()
      redirectUrl.pathname = '/auth/login'
      const redirectResponse = NextResponse.redirect(redirectUrl)
      // Copy over the updated cookies to avoid dropping refreshed sessions
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
      })
      return redirectResponse
    }

    // Check user's role for admin access authorization
    const { data: profile } = await supabase
      .from('profiles')
      .select('roles(name)')
      .eq('auth_user_id', user.id)
      .single()

    const rolesData = profile?.roles as unknown as { name: string } | { name: string }[];
    const rolesArray = Array.isArray(rolesData) ? rolesData : (rolesData ? [rolesData] : []);

    // Only allow Super Admin or Owner to access the main admin panel. (Can be modified depending on granular access needs).
    const allowedRoles = ['Super Admin', 'Owner']

    const hasAccess = rolesArray.some(role => allowedRoles.includes(role.name));

    if (!hasAccess) {
      const redirectUrl = request.nextUrl.clone()
      // You can redirect to an unauthorized page if one exists, otherwise home.
      redirectUrl.pathname = '/'
      const redirectResponse = NextResponse.redirect(redirectUrl)
      // Copy over the updated cookies to avoid dropping refreshed sessions
      supabaseResponse.cookies.getAll().forEach((cookie) => {
        redirectResponse.cookies.set(cookie.name, cookie.value, cookie)
      })
      return redirectResponse
    }
  }

  return supabaseResponse
}
