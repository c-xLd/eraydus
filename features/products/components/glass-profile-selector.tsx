'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'
import { getGlassImageUrl, getProfileImageUrl } from '@/features/products/utils/option-images'

export interface GlassOption {
  id: string
  name: string
  color_class?: string
  description?: string
}

export interface ProfileOption {
  id: string
  name: string
  hex_color?: string
}

interface GlassProfileSelectorProps {
  glassOptions: GlassOption[]
  profileOptions: ProfileOption[]
}

export function GlassProfileSelector({ glassOptions, profileOptions }: GlassProfileSelectorProps) {
  const [selectedGlass, setSelectedGlass] = useState<string | null>(glassOptions.length > 0 ? glassOptions[0].id : null)
  const [selectedProfile, setSelectedProfile] = useState<string | null>(profileOptions.length > 0 ? profileOptions[0].id : null)

  return (
    <div className="space-y-8 py-6 border-y border-border">
      {glassOptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground uppercase">Cam Seçenekleri</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {glassOptions.map((glass) => {
              const isSelected = selectedGlass === glass.id
              const imageUrl = getGlassImageUrl(glass.id, glass.name)

              return (
                <button
                  key={glass.id}
                  onClick={() => setSelectedGlass(glass.id)}
                  className={cn(
                    "relative flex flex-col items-start text-left p-3 rounded-xl border transition-all overflow-hidden group",
                    isSelected 
                      ? "border-champagne bg-champagne/5 ring-1 ring-champagne" 
                      : "border-border hover:border-foreground/30"
                  )}
                >
                  <div className="relative w-full h-16 rounded-lg mb-3 overflow-hidden border border-border/40 bg-neutral-100">
                    <Image
                      src={imageUrl}
                      alt={glass.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-medium text-sm block">{glass.name}</span>
                  {glass.description && (
                    <span className="text-xs text-muted-foreground mt-1 line-clamp-2">{glass.description}</span>
                  )}
                  
                  {isSelected && (
                    <div className="absolute top-2 right-2 p-1 bg-black text-white rounded-full">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {profileOptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground uppercase">Profil Rengi</h3>
          <div className="flex flex-wrap gap-4">
            {profileOptions.map((profile) => {
              const isSelected = selectedProfile === profile.id
              const imageUrl = getProfileImageUrl(profile.id, profile.name)

              return (
                <button
                  key={profile.id}
                  onClick={() => setSelectedProfile(profile.id)}
                  className={cn(
                    "relative w-14 h-14 rounded-xl transition-all flex items-center justify-center group overflow-hidden border",
                    isSelected 
                      ? "ring-2 ring-offset-2 ring-black border-black" 
                      : "border-border hover:border-foreground/50 hover:scale-105"
                  )}
                  title={profile.name}
                >
                  <Image
                    src={imageUrl}
                    alt={profile.name}
                    fill
                    className="object-cover"
                  />
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  )}
                  
                  {/* Tooltip */}
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                    {profile.name}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
