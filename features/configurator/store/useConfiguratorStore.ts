import { create } from 'zustand'
import { createClient } from '@/services/supabase/client'

export type ConfiguratorState = {
  currentStep: number
  layout: string | null
  collection: string | null
  model: string | null
  width: number
  height: number
  depth: number
  glassType: string | null
  glassThickness: string | null
  profileColor: string | null
  doorSystem: string | null
  openingDirection: string | null
  handleSelection: string | null
  accessories: string[]
  installation: string | null
  warranty: string | null
  
  baseProducts: any[]
  isFetchingProducts: boolean

  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateField: (field: string, value: any) => void
  toggleAccessory: (id: string) => void
  calculatePrice: () => number
  getDeliveryEstimate: () => string
  getCompletedSteps: () => number[]
  fetchBaseProducts: () => Promise<void>
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 1,
  layout: null,
  collection: null,
  model: null,
  width: 120,
  height: 200,
  depth: 90,
  glassType: null,
  glassThickness: null,
  profileColor: null,
  doorSystem: null,
  openingDirection: null,
  handleSelection: null,
  accessories: [],
  installation: null,
  warranty: null,

  baseProducts: [],
  isFetchingProducts: false,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((s) => ({ currentStep: Math.min(s.currentStep + 1, 14) })),
  prevStep: () => set((s) => ({ currentStep: Math.max(s.currentStep - 1, 1) })),
  updateField: (field, value) => set({ [field]: value }),
  
  toggleAccessory: (id) => {
    const { accessories } = get()
    if (accessories.includes(id)) {
      set({ accessories: accessories.filter(a => a !== id) })
    } else {
      set({ accessories: [...accessories, id] })
    }
  },

  fetchBaseProducts: async () => {
    set({ isFetchingProducts: true })
    try {
      const supabase = createClient()
      const { data } = await supabase.from('products').select('*').eq('status', 'active')
      if (data) {
        set({ baseProducts: data })
      }
    } catch (e) {
      console.error(e)
    } finally {
      set({ isFetchingProducts: false })
    }
  },

  calculatePrice: () => {
    const s = get()
    let total = 0

    // Dinamik Ürün Fiyatlandırması (Admin'den gelir)
    const product = s.baseProducts.find(p => p.category === s.layout && p.series === s.collection)
    if (product && product.price) {
      total += product.price
    }

    // Size modifier (per m²)
    const area = (s.width / 100) * (s.height / 100)
    total += area * 2800

    // Glass type add-ons (Global rules)
    if (s.glassType === 'smoke') total += 1200
    if (s.glassType === 'bronze') total += 1500
    if (s.glassType === 'fluted') total += 2000
    if (s.glassType === 'frosted') total += 800

    // Glass thickness
    if (s.glassThickness === '6mm') total += 800

    // Profile
    if (s.profileColor === 'gold') total += 2200
    if (s.profileColor === 'gunmetal') total += 1500

    // Door system
    if (s.doorSystem === 'pivot') total += 1200
    if (s.doorSystem === 'walkin') total += 800

    // Accessories
    const accPrices: Record<string, number> = {
      nano: 750, towel: 450, shelf: 600, led: 1200, softclose: 900, magnetic: 350
    }
    s.accessories.forEach(a => { total += accPrices[a] || 0 })

    // Installation
    if (s.installation === 'professional') total += 2500
    if (s.installation === 'premium') total += 4500

    // Warranty
    if (s.warranty === '5year') total += 1500
    if (s.warranty === '10year') total += 3500

    return Math.round(total)
  },

  getDeliveryEstimate: () => {
    const s = get()
    let days = 14 // base production
    if (s.collection === 'luxury') days += 5
    if (s.glassType === 'fluted') days += 3
    if (s.installation === 'premium') days -= 2
    return `${days}-${days + 5} iş günü`
  },

  getCompletedSteps: () => {
    const s = get()
    const completed: number[] = []
    if (s.layout) completed.push(1)
    if (s.collection) completed.push(2)
    if (s.model) completed.push(3)
    if (s.width && s.height) completed.push(4)
    if (s.glassType) completed.push(5)
    if (s.glassThickness) completed.push(6)
    if (s.profileColor) completed.push(7)
    if (s.doorSystem) completed.push(8)
    if (s.openingDirection) completed.push(9)
    if (s.handleSelection) completed.push(10)
    completed.push(11) // accessories always "complete" (optional)
    if (s.installation) completed.push(12)
    if (s.warranty) completed.push(13)
    return completed
  },
}))
