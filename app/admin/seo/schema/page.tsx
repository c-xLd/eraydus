import { getSeoSettings } from '@/features/seo/actions'
import SchemaClient from './SchemaClient'

export const metadata = {
  title: 'Schema (JSON-LD) | Erayduş SEO',
}

export default async function SchemaPage() {
  const settings = await getSeoSettings()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-light text-gray-900 tracking-tight">Structured Data (Schema)</h1>
          <p className="text-sm text-gray-500 mt-1">Google Rich Snippets için JSON-LD konfigürasyonları.</p>
        </div>
      </div>

      <SchemaClient initialData={settings?.schema_settings || {}} />
    </div>
  )
}
