import { headers } from 'next/headers'
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { GlobalFAQAccordion } from "@/components/seo/GlobalFAQAccordion"
import { AdminEditProvider } from '@/features/content/components/AdminEditProvider'
import { getGeneralSettings } from '@/lib/data/settings'
import { MaintenanceScreen } from '@/components/layout/MaintenanceScreen'
import { SettingsProvider } from '@/components/providers/SettingsProvider'
import { LiveVisitorTracker } from "@/components/public/LiveVisitorTracker"
import { LiveChatWidget } from "@/components/public/LiveChatWidget"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getGeneralSettings()
  
  const headersList = await headers()
  const ip = headersList.get('x-forwarded-for') || '127.0.0.1'
  const city = headersList.get('x-vercel-ip-city')
  const country = headersList.get('x-vercel-ip-country')
  
  let location = 'Bilinmiyor'
  if (city && country) {
    location = `${decodeURIComponent(city)}, ${country}`
  } else if (country) {
    location = country
  }

  if (settings.maintenanceMode) {
    return (
      <main className="flex-1 flex flex-col">
        <MaintenanceScreen />
      </main>
    )
  }

  return (
    <SettingsProvider settings={settings}>
      <AdminEditProvider>
        <LiveVisitorTracker ip={ip} location={location} />
        <LiveChatWidget />
        <Header />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <GlobalFAQAccordion />
        <Footer />
      </AdminEditProvider>
    </SettingsProvider>
  )
}
