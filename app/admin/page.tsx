import { getDashboardData } from '@/features/dashboard/actions'
import DashboardHeader from './components/dashboard/DashboardHeader'
import GlobalSiteStatus from './components/dashboard/GlobalSiteStatus'
import ExecutiveSummary from './components/dashboard/ExecutiveSummary'
import WhatsAppIntelligence from './components/dashboard/WhatsAppIntelligence'
import AttentionCenter from './components/dashboard/AttentionCenter'
import TrafficIntelligence from './components/dashboard/TrafficIntelligence'
import { Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

export const metadata = {
  title: 'Admin Paneli | Erayduş Admin',
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      <Skeleton className="h-[100px] w-full rounded-lg" />
      <Skeleton className="h-[200px] w-full rounded-lg" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Skeleton className="h-[300px] rounded-lg" />
        <Skeleton className="h-[300px] rounded-lg" />
      </div>
    </div>
  )
}

async function DashboardContent({ searchParams }: { searchParams: { days?: string } }) {
  const days = searchParams?.days ? parseInt(searchParams.days, 10) : 30
  const dashboardData = await getDashboardData(days)

  return (
    <div className="space-y-6">
      <GlobalSiteStatus health={dashboardData.health} />

      <ExecutiveSummary summary={dashboardData.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AttentionCenter items={dashboardData.attention} />
        <div className="space-y-6">
          <WhatsAppIntelligence data={dashboardData.whatsapp} />
          <TrafficIntelligence data={dashboardData.traffic} />
        </div>
      </div>
    </div>
  )
}

export default async function AdminDashboardPage(props: { searchParams: Promise<{ days?: string }> }) {
  const searchParams = await props.searchParams
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <DashboardHeader />

      <Suspense fallback={<DashboardSkeleton />}>
        <DashboardContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
