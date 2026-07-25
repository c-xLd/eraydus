import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Product, glassOptions, profileOptions } from '@/lib/data/products'

export const getHexColor = (val: string) => {
  const v = val.toLowerCase()
  if (v.includes('siyah') || v.includes('black')) return '#1A1A1A'
  if (v.includes('gold') || v.includes('altın') || v.includes('altin')) return '#D4AF37'
  if (v.includes('krom') || v.includes('silver') || v.includes('gümüş') || v.includes('gumus') || v.includes('parlak') || v.includes('metal')) return '#E5E5E5'
  if (v.includes('bronz') || v.includes('bronze')) return '#CD7F32'
  if (v.includes('beyaz') || v.includes('white')) return '#FFFFFF'
  if (v.includes('antrasit') || v.includes('gri') || v.includes('gray')) return '#3A3F47'
  return '#666666'
}

export const isKumlamaValue = (val: string) => {
  const v = val.toLowerCase()
  return v.includes('kumlama') || v.includes('buzlu')
}

export const isTekneJakuziValue = (val: string) => {
  const v = val.toLowerCase()
  return v.includes('tekne') || v.includes('jakuzi')
}

export const humanizeValue = (val: string) =>
  val.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())

export const humanizeKey = (key: string) =>
  key.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())


export function useProductVariants(product: Product, onShowSandblastedModal: () => void) {
  const router = useRouter()
  const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>({})

  const variants = product.variants ?? []

  // Build attribute groups: { "profil-rengi": ["mat-siyah", "krom"], ... }
  const attributeGroups = useMemo(() => {
    const groups: Record<string, string[]> = {}
    
    variants.forEach(v => {
      Object.entries(v.attributes || {}).forEach(([key, val]) => {
        if (!groups[key]) groups[key] = []
        if (!groups[key].includes(val)) groups[key].push(val)
      })
    })
    
    return groups
  }, [variants])

  const attributeKeys = Object.keys(attributeGroups)
  
  // We consider it "having variants" if there are selectable attributes
  const hasVariants = attributeKeys.length > 0

  // Find the variant matching all currently selected attributes
  const selectedVariant = useMemo(() => {
    if (!hasVariants) return null
    // Only match when every attribute group has a selection
    const allSelected = attributeKeys.every(k => selectedAttributes[k])
    if (!allSelected) return null
    return variants.find(v =>
      attributeKeys.every(k => (v.attributes || {})[k] === selectedAttributes[k])
    ) || null
  }, [hasVariants, attributeKeys, selectedAttributes, variants])

  // Displayed price: selected variant price (with sale) → cheapest variant → base product price
  const displayPrice = useMemo(() => {
    if (selectedVariant) {
      return selectedVariant.salePrice ?? selectedVariant.price
    }
    if (variants.length > 0) {
      const prices = variants.map(v => v.salePrice ?? v.price).filter(p => p > 0)
      return prices.length > 0 ? Math.min(...prices) : product.price
    }
    return product.price
  }, [selectedVariant, variants, product.price])

  const handleSelectAttribute = (key: string, val: string) => {
    // Tekne / Jakuzi selections are configured on a dedicated page.
    if (isTekneJakuziValue(val) || isTekneJakuziValue(key)) {
      router.push('/jakuzi-tekneler')
      return
    }
    setSelectedAttributes(prev => ({ ...prev, [key]: val }))
    // Sandblasted (kumlama) glass → open the pattern gallery modal.
    if (isKumlamaValue(val)) {
      onShowSandblastedModal()
    }
  }

  // ─── Variant-aware compatibility lists ───
  const glassAttrKey = useMemo(
    () => attributeKeys.find(k => k.toLowerCase().includes('cam') || k.toLowerCase().includes('tip')),
    [attributeKeys]
  )
  const profileAttrKey = useMemo(
    () => attributeKeys.find(k => k.toLowerCase().includes('profil') || k.toLowerCase().includes('renk')),
    [attributeKeys]
  )

  const compatibleGlassList = useMemo(() => {
    if (variants.length > 0 && glassAttrKey) {
      return attributeGroups[glassAttrKey].map(val => {
        const low = val.toLowerCase()
        const match = glassOptions.find(g => {
          const gl = g.name.toLowerCase()
          return gl === low || gl.includes(low) || low.includes(g.id)
            || (low.includes('kumlama') && g.id === 'frosted')
            || (low.includes('buzlu') && g.id === 'frosted')
            || ((low.includes('şeffaf') || low.includes('seffaf')) && g.id === 'clear')
            || ((low.includes('füme') || low.includes('fume')) && g.id === 'smoke')
            || (low.includes('bronz') && g.id === 'bronze')
            || ((low.includes('oluklu') || low.includes('fluted')) && g.id === 'fluted')
        })
        return {
          id: val,
          name: match ? match.name : humanizeValue(val),
          colorClass: match ? match.colorClass : 'bg-white/20 backdrop-blur-sm',
          isKumlama: isKumlamaValue(val),
        }
      })
    }
    return product.compatibleGlass.map(g => ({ ...g, isKumlama: isKumlamaValue(g.name) }))
  }, [variants.length, glassAttrKey, attributeGroups, product.compatibleGlass])

  const compatibleProfileList = useMemo(() => {
    if (variants.length > 0 && profileAttrKey) {
      return attributeGroups[profileAttrKey].map(val => {
        const low = val.toLowerCase()
        const match = profileOptions.find(p => {
          const pl = p.name.toLowerCase()
          return pl === low || pl.includes(low) || low.includes(p.id)
        })
        return {
          id: val,
          name: match ? match.name : humanizeValue(val),
          hex: match ? match.hex : getHexColor(val),
        }
      })
    }
    return product.compatibleProfiles
  }, [variants.length, profileAttrKey, attributeGroups, product.compatibleProfiles])

  return {
    hasVariants,
    attributeGroups,
    attributeKeys,
    selectedAttributes,
    selectedVariant,
    displayPrice,
    handleSelectAttribute,
    glassAttrKey,
    profileAttrKey,
    compatibleGlassList,
    compatibleProfileList
  }
}
