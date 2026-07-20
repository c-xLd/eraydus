import { SettingsClient } from './components/SettingsClient'
import { getSiteSettings } from './actions'
import { globalSeoData } from '@/lib/data/seo'

export const metadata = {
  title: 'Platform Ayarları | Erayduş Admin',
}

export default async function SettingsPage() {
  const { data, success } = await getSiteSettings()
  
  // Use DB data if available, otherwise fallback to static data
  const initialSettings = success && data ? data : globalSeoData

  return <SettingsClient initialData={initialSettings} />
}
