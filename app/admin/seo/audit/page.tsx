import { runAdvancedSeoAudit } from '@/features/seo/audit'
import SeoHealthOverview from '../components/SeoHealthOverview'
import SeoIssueCenter from '../components/SeoIssueCenter'

export const metadata = {
  title: 'SEO Audit | Erayduş',
}

export default async function SeoAuditPage() {
  const report = await runAdvancedSeoAudit()
  return (
    <div className="space-y-6">
      <SeoHealthOverview report={report} />
      <SeoIssueCenter issues={report.issues} />
    </div>
  )
}
