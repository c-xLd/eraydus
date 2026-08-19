import { getAIUsageSummary } from '@/lib/ai-usage'
import AiSettingsClient from './AiSettingsClient'

export const metadata = {
  title: 'AI & Limit Ayarları | Erayduş Admin'
}

export default async function AiSettingsPage() {
  const summary = await getAIUsageSummary()

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-6">
      <AiSettingsClient initialSummary={summary} />
    </div>
  )
}
