import { getSeoSettings } from '@/features/seo/actions'
import SettingsClient from './SettingsClient'

export const metadata = {
  title: 'SEO Settings & Templates | Erayduş',
}

export default async function SeoSettingsPage() {
  const settings = await getSeoSettings()
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900 tracking-tight">SEO Settings & Templates</h1>
          <p className="text-sm text-gray-500 mt-1">Global SEO ayarları, Robots.txt yönetimi ve Dinamik Şablonlar</p>
        </div>
      </div>

      <SettingsClient initialData={settings} />
    </div>
  )
}
