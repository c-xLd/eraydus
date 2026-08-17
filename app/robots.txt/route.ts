import { NextResponse } from 'next/server'
import { createAdminClient } from '@/services/supabase/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  let content = 'User-agent: *\nAllow: /\nDisallow: /admin/'
  let baseUrl = 'https://www.eraydus.net'

  try {
    const supabase = createAdminClient()
    const { data: settings } = await supabase.from('seo_settings').select('robots_txt_content, canonical_base_url').single()

    if (settings?.robots_txt_content) {
      content = settings.robots_txt_content
    }
    if (settings?.canonical_base_url) {
      baseUrl = settings.canonical_base_url
    }
  } catch {
    // Fallback to defaults if Supabase is unreachable
  }

  // Ensure sitemap is present
  if (!content.includes('Sitemap:')) {
    content += `\nSitemap: ${baseUrl}/sitemap.xml`
  }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
