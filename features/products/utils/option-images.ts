const GLASS_IMAGE_MAP: Record<string, string> = {
  seffaf: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/seffaf.jpeg',
  clear: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/seffaf.jpeg',
  fume: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/fume.jpeg',
  'fume-siyah': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/fume.jpeg',
  smoke: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/fume.jpeg',
  bronz: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/bronz.jpeg',
  bronze: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/bronz.jpeg',
  aynali: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/aynali.jpeg',
  mirror: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/aynali.jpeg',
  kumlama: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/kumlamali.jpeg',
  kumlamali: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/kumlamali.jpeg',
  fluted: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/kumlamali.jpeg',
  frosted: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/kumlamali.jpeg',
  'buz-mat': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/buzlu.jpeg',
  buzlu: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/kumlama-models/cam-models/buzlu.jpeg',
}

const PROFILE_IMAGE_MAP: Record<string, string> = {
  siyah: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/siyah.jpeg',
  black: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/siyah.jpeg',
  'mat-siyah': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/siyah.jpeg',
  'firca-parlak': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/firca-parlak.jpeg',
  chrome: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/firca-parlak.jpeg',
  'parlak-krom': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/firca-parlak.jpeg',
  krom: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/firca-parlak.jpeg',
  gold: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/gold.jpeg',
  altin: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/gold.jpeg',
  'fircalanmis-altin': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/gold.jpeg',
  beyaz: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/beyaz.jpeg',
  white: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/beyaz.jpeg',
  'mat-beyaz': 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/beyaz.jpeg',
  bronz: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/gold.jpeg',
  bronze: 'https://xzxutzjzjdyjheivdxdl.supabase.co/storage/v1/object/public/uploads/profil-colors/gold.jpeg',
}

export function getGlassImageUrl(id: string, name?: string): string {
  const normalizedId = id.toLowerCase().trim()
  if (GLASS_IMAGE_MAP[normalizedId]) return GLASS_IMAGE_MAP[normalizedId]

  if (name) {
    const normalizedName = name.toLowerCase()
    if (normalizedName.includes('şeffaf') || normalizedName.includes('seffaf')) return GLASS_IMAGE_MAP.seffaf
    if (normalizedName.includes('füme') || normalizedName.includes('fume') || normalizedName.includes('siyah')) return GLASS_IMAGE_MAP.fume
    if (normalizedName.includes('bronz')) return GLASS_IMAGE_MAP.bronz
    if (normalizedName.includes('ayna')) return GLASS_IMAGE_MAP.aynali
    if (normalizedName.includes('kumlama') || normalizedName.includes('oluklu') || normalizedName.includes('fluted')) return GLASS_IMAGE_MAP.kumlama
    if (normalizedName.includes('buz')) return GLASS_IMAGE_MAP.buzlu
  }

  return GLASS_IMAGE_MAP.seffaf
}

export function getProfileImageUrl(id: string, name?: string): string {
  const normalizedId = id.toLowerCase().trim()
  if (PROFILE_IMAGE_MAP[normalizedId]) return PROFILE_IMAGE_MAP[normalizedId]

  if (name) {
    const normalizedName = name.toLowerCase()
    if (normalizedName.includes('siyah')) return PROFILE_IMAGE_MAP.siyah
    if (normalizedName.includes('krom') || normalizedName.includes('fırça') || normalizedName.includes('firca') || normalizedName.includes('parlak')) return PROFILE_IMAGE_MAP.chrome
    if (normalizedName.includes('altın') || normalizedName.includes('altin') || normalizedName.includes('gold')) return PROFILE_IMAGE_MAP.gold
    if (normalizedName.includes('beyaz')) return PROFILE_IMAGE_MAP.beyaz
    if (normalizedName.includes('bronz')) return PROFILE_IMAGE_MAP.gold
  }

  return PROFILE_IMAGE_MAP.siyah
}
