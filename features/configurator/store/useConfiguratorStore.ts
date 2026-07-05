import { create } from 'zustand'

export type ConfiguratorState = {
  currentStep: number
  layout: string | null
  collection: string | null
  model: string | null
  width: number
  height: number
  glassType: string | null
  glassThickness: string | null
  profileColor: string | null
  doorSystem: string | null
  openingDirection: string | null
  handleSelection: string | null
  accessories: string[]
  installation: string | null
  warranty: string | null
  
  // Actions
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateField: (field: keyof Omit<ConfiguratorState, 'setStep' | 'nextStep' | 'prevStep' | 'updateField' | 'calculatePrice'>, value: any) => void
  calculatePrice: () => number
}

export const useConfiguratorStore = create<ConfiguratorState>((set, get) => ({
  currentStep: 1,
  layout: null,
  collection: null,
  model: null,
  width: 100,
  height: 200,
  glassType: null,
  glassThickness: null,
  profileColor: null,
  doorSystem: null,
  openingDirection: null,
  handleSelection: null,
  accessories: [],
  installation: null,
  warranty: null,

  setStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ currentStep: Math.min(state.currentStep + 1, 14) })),
  prevStep: () => set((state) => ({ currentStep: Math.max(state.currentStep - 1, 1) })),
  updateField: (field, value) => set({ [field]: value }),
  
  calculatePrice: () => {
    const state = get()
    let base = 5000 // Base price in TRY
    
    // Add logic based on selections
    if (state.collection === 'luxury') base += 3000
    if (state.glassType === 'smoke') base += 1000
    if (state.profileColor === 'gold') base += 1500
    
    // Add size modifier
    base += (state.width * state.height) * 0.1
    
    return Math.round(base)
  }
}))
