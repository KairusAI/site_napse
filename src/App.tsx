import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import {
  HeroSection,
  PillarsSection,
  IntegrationsBentoGrid,
  SupportOnboardingSection,
  StatsSection,
  PricingSection,
} from '@/components/sections'

function App() {
  return (
    <MainLayout>
      <Header />
      <main id="hero">
        <HeroSection />
      </main>
      <PillarsSection />
      <IntegrationsBentoGrid />
      <SupportOnboardingSection />
      <StatsSection />
      <PricingSection />
    </MainLayout>
  )
}

export default App
