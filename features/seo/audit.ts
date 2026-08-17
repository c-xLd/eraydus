import { createAdminClient } from '@/services/supabase/server'
import type { SeoAuditReport, SeoIssue, ProductSeoInfo } from './types'

export async function runAdvancedSeoAudit(): Promise<SeoAuditReport> {
  const supabase = createAdminClient()
  
  const [productsRes, metadataRes, settingsRes] = await Promise.all([
    supabase.from('products').select('id, name, slug, status, categories(slug)').eq('status', 'active'),
    supabase.from('seo_metadata').select('*').eq('page_type', 'product'),
    supabase.from('seo_settings').select('*').single()
  ])

  const products = (productsRes.data || []) as ProductSeoInfo[]
  const metaMap = new Map(metadataRes.data?.map(m => [m.page_id, m]) || [])
  const settings = settingsRes.data

  let healthScore = 100
  const issues: SeoIssue[] = []
  
  let totalUrls = products.length
  let indexedUrls = 0
  let noindexUrls = 0
  let orphanUrls = 0
  let missingCanonical = 0

  const deduct = (points: number) => {
    healthScore = Math.max(0, healthScore - points)
  }

  // Settings Checks
  if (!settings?.canonical_base_url) {
    issues.push({
      id: 'settings-canonical',
      severity: 'CRITICAL',
      type: 'missing_canonical_base',
      message: 'Global Canonical Base URL tanımlanmamış. Bu durum duplicate content yaratabilir.',
      entity_type: 'global',
      entity_id: null,
      entity_slug: null,
      entity_name: 'Site Settings'
    })
    deduct(10)
  }
  if (!settings?.default_meta_description) {
    issues.push({
      id: 'settings-desc',
      severity: 'MEDIUM',
      type: 'missing_default_desc',
      message: 'Varsayılan Meta Description tanımlanmamış.',
      entity_type: 'global',
      entity_id: null,
      entity_slug: null,
      entity_name: 'Site Settings'
    })
    deduct(2)
  }

  // Product Checks
  for (const product of products) {
    const meta = metaMap.get(product.id)
    
    // Check Orphan
    const isOrphan = !product.categories || product.categories.length === 0
    if (isOrphan) {
      orphanUrls++
      issues.push({
        id: `orphan-${product.id}`,
        severity: 'CRITICAL',
        type: 'orphan_page',
        message: 'Ürün hiçbir kategoriye atanmamış. Site içi linklemesi zayıf (Sitemap hatası verebilir).',
        entity_type: 'product',
        entity_id: product.id,
        entity_slug: product.slug,
        entity_name: product.name
      })
      deduct(5)
    }

    // Check SEO Exists
    if (!meta) {
      issues.push({
        id: `missing-seo-${product.id}`,
        severity: 'HIGH',
        type: 'missing_seo_metadata',
        message: 'SEO kaydı yok. Varsayılan (Template) değerler kullanılacak.',
        entity_type: 'product',
        entity_id: product.id,
        entity_slug: product.slug,
        entity_name: product.name
      })
      deduct(2)
      // Assume it will be indexed by default templates
      indexedUrls++
      continue
    }

    // Check Indexability
    if (!meta.robots_index) {
      noindexUrls++
      issues.push({
        id: `noindex-${product.id}`,
        severity: 'HIGH',
        type: 'noindex_tag',
        message: 'Ürün kasıtlı olarak indexlenmeye kapatılmış (NOINDEX). Google arama sonuçlarında görünmeyecek.',
        entity_type: 'product',
        entity_id: product.id,
        entity_slug: product.slug,
        entity_name: product.name
      })
      deduct(1) // Minor deduction since it might be intentional
    } else {
      indexedUrls++
    }

    // Check Canonical
    if (!meta.canonical_url && !settings?.canonical_base_url) {
      missingCanonical++
    }

    // Check Title
    if (meta.title && meta.title.length < 10) {
      issues.push({
        id: `short-title-${product.id}`,
        severity: 'MEDIUM',
        type: 'short_title',
        message: 'Title çok kısa. Google için en az 30 karakter önerilir.',
        entity_type: 'product',
        entity_id: product.id,
        entity_slug: product.slug,
        entity_name: product.name
      })
      deduct(1)
    }

    // Check Description
    if (meta.description && meta.description.length < 50) {
      issues.push({
        id: `short-desc-${product.id}`,
        severity: 'MEDIUM',
        type: 'short_description',
        message: 'Meta description çok kısa (< 50 karakter). Zayıf tıklama oranı getirebilir.',
        entity_type: 'product',
        entity_id: product.id,
        entity_slug: product.slug,
        entity_name: product.name
      })
      deduct(1)
    }
  }

  // Sort issues by severity
  const severityWeight = { CRITICAL: 4, HIGH: 3, MEDIUM: 2, LOW: 1 }
  issues.sort((a, b) => severityWeight[b.severity] - severityWeight[a.severity])

  return {
    healthScore,
    totalUrls,
    indexedUrls,
    noindexUrls,
    orphanUrls,
    missingCanonical,
    issues
  }
}
