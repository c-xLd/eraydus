/**
 * ERAYDUŞ SEO Yardımcı Fonksiyonları
 * Blog ve Ürün sayfaları için otomatik SEO başlığı, meta açıklaması ve slug üretim motoru.
 */

export function slugify(text: string): string {
  if (!text) return ''
  return text
    .toLowerCase()
    .trim()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 80)
    .replace(/-+$/, '')
}

export function stripHtml(html: string): string {
  if (!html) return ''
  return html
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * Başlıktan ideal 50-60 karakterlik SEO Başlığı türetir.
 */
export function generateAutoSeoTitle(title: string, brandSuffix = 'ERAYDUŞ'): string {
  const cleanTitle = title.trim()
  if (!cleanTitle) return ''

  if (cleanTitle.toLowerCase().includes('erayduş') || cleanTitle.toLowerCase().includes('eraydus')) {
    return cleanTitle.substring(0, 65)
  }

  const suffix = ` | ${brandSuffix}`
  if ((cleanTitle + suffix).length <= 65) {
    return cleanTitle + suffix
  }

  // Eğer çok uzunsa başlığı kısaltıp ekle
  const maxTitleLen = 65 - suffix.length
  return cleanTitle.substring(0, maxTitleLen).trim() + suffix
}

/**
 * Açıklama ve Makale içeriğinden ideal 130-160 karakterlik Meta Description üretir.
 */
export function generateAutoSeoDescription(description: string, bodyHtml: string): string {
  if (description && description.trim().length >= 30) {
    const cleanDesc = description.trim()
    if (cleanDesc.length <= 160) return cleanDesc
    return cleanDesc.substring(0, 157).trim() + '...'
  }

  const cleanBody = stripHtml(bodyHtml)
  if (!cleanBody) return ''

  if (cleanBody.length <= 160) {
    return cleanBody
  }

  // Cümle bitişine göre kesmeye çalış
  const slice = cleanBody.substring(0, 155)
  const lastPeriod = slice.lastIndexOf('.')
  const lastSpace = slice.lastIndexOf(' ')

  if (lastPeriod > 100) {
    return slice.substring(0, lastPeriod + 1)
  }

  if (lastSpace > 110) {
    return slice.substring(0, lastSpace) + '...'
  }

  return slice.trim() + '...'
}

/**
 * İçerikten otomatik anahtar kelimeler ve etiketler önerir.
 */
export function extractSuggestedTags(title: string, bodyHtml: string): string[] {
  const text = `${title} ${stripHtml(bodyHtml)}`.toLowerCase()
  const candidateTags: [string, RegExp][] = [
    ['Temperli Cam', /temperli|emniyet camı|rodaj/i],
    ['Cam Kalınlığı', /6 mm|8 mm|kalınlık/i],
    ['Nano Kaplama', /nano|kireç önleyici|hidrofobik|su lekesi/i],
    ['Mat Siyah', /siyah|mat siyah|black/i],
    ['Gold Profil', /gold|altın|pirinç|pvd/i],
    ['Sürgülü Kabin', /sürgülü|kayar|rulman|ray/i],
    ['Menteşeli Kabin', /menteşe|pivot|açılır kapı/i],
    ['Katlanır Kabin', /katlanır|akordeon/i],
    ['Küçük Banyo', /küçük banyo|dar banyo|alan tasarrufu/i],
    ['Temizlik', /temizlik|bakım|kireç|leke/i],
    ['Ölçü Alma', /ölçü|keşif|şakül|montaj/i],
    ['Kumlama Cam', /kumlama|buzlu cam|desen/i],
    ['Tek Cam', /walk-in|tek cam|hemzemin|kapısız/i],
    ['Ankara Duşakabin', /ankara|çankaya|çayyolu|ümitköy/i],
    ['Rehber', /rehber|ipucu|nasıl|öneri/i]
  ]

  const suggested: string[] = []
  for (const [tag, regex] of candidateTags) {
    if (regex.test(text)) {
      suggested.push(tag)
    }
  }

  return suggested.slice(0, 5)
}
