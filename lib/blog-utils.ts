export interface TocItem {
  id: string
  text: string
  level: number
}

export function parseHtmlForToc(html: string): { htmlWithIds: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  let htmlWithIds = html

  // Matches <h2>...</h2> and <h3>...</h3>
  // We use a replacer function to inject IDs
  const headingRegex = /<(h[23])([^>]*)>(.*?)<\/\1>/gi

  htmlWithIds = html.replace(headingRegex, (match, tag, attrs, content) => {
    // If it already has an ID, we could extract it, but Tiptap doesn't add IDs by default
    // Let's generate a slug from the text content
    const textContent = content.replace(/<[^>]+>/g, '').trim()
    if (!textContent) return match

    const level = tag.toLowerCase() === 'h2' ? 2 : 3
    const id = textContent
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')

    toc.push({ id, text: textContent, level })

    // Inject the ID into the tag if it doesn't already have one
    if (attrs.includes('id=')) {
      return match
    }
    return `<${tag} id="${id}"${attrs}>${content}</${tag}>`
  })

  return { htmlWithIds, toc }
}

// Calculate reading time
export function calculateReadingTime(html: string): number {
  const textContent = html.replace(/<[^>]+>/g, '').trim()
  const words = textContent.split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200)) // 200 words per minute average
}
