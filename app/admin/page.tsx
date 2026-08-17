import { getDashboardData } from '@/features/dashboard/actions'
import DashboardHeader from './components/dashboard/DashboardHeader'
import BusinessOverview from './components/dashboard/BusinessOverview'
import QuoteFunnel from './components/dashboard/QuoteFunnel'
import ProductQuality from './components/dashboard/ProductQuality'
import RecentActivityWidget from './components/dashboard/RecentActivityWidget'
import IntegrationStatus from './components/dashboard/IntegrationStatus'

export const metadata = {
  title: 'Kontrol Merkezi | Erayduş Admin',
}

export default async function AdminDashboardPage() {
  const dashboardData = await getDashboardData(30) // Last 30 days default

  return (
    <div className="space-y-6">
      <DashboardHeader />
      
      <BusinessOverview data={dashboardData} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <QuoteFunnel quotes={dashboardData.quotes} />
        <ProductQuality products={dashboardData.products} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <IntegrationStatus />
        </div>
        <div className="lg:col-span-1">
          <RecentActivityWidget activities={dashboardData.activities} />
        </div>
      </div>
    </div>
  )
}
