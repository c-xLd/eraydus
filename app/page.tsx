import { HeroSection } from '@/features/homepage/components/HeroSection'
import { StatementSection } from '@/features/homepage/components/StatementSection'
import { ProductShowcase } from '@/features/homepage/components/ProductShowcase'
import { ConfiguratorPreview } from '@/features/homepage/components/ConfiguratorPreview'

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      <HeroSection />
      <StatementSection />
      <ProductShowcase />
      <ConfiguratorPreview />
    </div>
  )
}
