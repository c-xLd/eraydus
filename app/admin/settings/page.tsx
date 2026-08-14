import { SettingsClient } from './components/SettingsClient'
import { getSiteSettings } from './actions'

export const metadata = {
  title: 'Platform Ayarları | Erayduş Admin',
}

export default async function SettingsPage() {
  const { data, success } = await getSiteSettings()
  
  // Use DB data if available
  const initialSettings = success && data ? data : {}

  return <SettingsClient initialData={initialSettings} />
}
