'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface GlassOption {
  id: string
  name: string
  color_class: string
  description?: string
}

export interface ProfileOption {
  id: string
  name: string
  hex_color: string
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
            {glassOptions.map((glass) => (
              <button
                key={glass.id}
                onClick={() => setSelectedGlass(glass.id)}
                className={cn(
                  "relative flex flex-col items-start text-left p-3 rounded-xl border transition-all overflow-hidden group",
                  selectedGlass === glass.id 
                    ? "border-champagne bg-champagne/5" 
                    : "border-border hover:border-foreground/30"
                )}
              >
                <div className={cn("w-full h-12 rounded-lg mb-3 opacity-80", glass.color_class)} />
                <span className="font-medium text-sm block">{glass.name}</span>
                {glass.description && (
                  <span className="text-xs text-muted-foreground mt-1 line-clamp-2">{glass.description}</span>
                )}
                
                {selectedGlass === glass.id && (
                  <div className="absolute top-2 right-2 p-1 bg-champagne text-primary rounded-full">
                    <Check className="w-3 h-3" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {profileOptions.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-mono tracking-wider text-muted-foreground uppercase">Profil Rengi</h3>
          <div className="flex flex-wrap gap-4">
            {profileOptions.map((profile) => (
              <button
                key={profile.id}
                onClick={() => setSelectedProfile(profile.id)}
                className={cn(
                  "relative w-12 h-12 rounded-full transition-all flex items-center justify-center group",
                  selectedProfile === profile.id 
                    ? "ring-2 ring-offset-2 ring-champagne ring-offset-background" 
                    : "ring-1 ring-border hover:ring-foreground/50 hover:scale-105"
                )}
                style={{ backgroundColor: profile.hex_color }}
                title={profile.name}
              >
                {selectedProfile === profile.id && (
                  <Check className={cn(
                    "w-5 h-5",
                    // Simple logic to make check icon visible depending on background darkness
                    // In a real app, you might want to check the actual luminance
                    profile.hex_color.toLowerCase() === '#ffffff' ? "text-black" : "text-white"
                  )} />
                )}
                
                {/* Tooltip */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-foreground text-background text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  {profile.name}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
