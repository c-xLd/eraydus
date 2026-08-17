import { NextResponse } from 'next/server'
import { createAdminClient } from '@/services/supabase/server'

export async function GET() {
  const supabase = createAdminClient()
  const { data: settings } = await supabase.from('seo_settings').select('robots_txt_content, canonical_base_url').single()

  let content = settings?.robots_txt_content || 'User-agent: *\nAllow: /\nDisallow: /admin/'
  const baseUrl = settings?.canonical_base_url || 'https://www.eraydus.net'

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
