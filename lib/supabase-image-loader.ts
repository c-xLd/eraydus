export default function supabaseLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  const isSupabase = src.includes('supabase.co/storage/v1/')
  
  // Check if it's a Supabase storage URL
  if (isSupabase) {
    let renderUrl = src
    // Replace 'object/public' with 'render/image/public' if not already using it
    if (src.includes('/object/public/')) {
      renderUrl = src.replace('/object/public/', '/render/image/public/')
    }
    
    // Add width and quality params for optimization
    const url = new URL(renderUrl)
    url.searchParams.set('width', width.toString())
    url.searchParams.set('quality', (quality || 75).toString())
    
    return url.href
  }
  
  // For other images (local, etc), return as is if no external optimization service
  return src
}
