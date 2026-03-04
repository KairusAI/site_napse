import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import {
  HeroSection,
  PillarsSection,
  IntegrationsBentoGrid,
  SupportOnboardingSection,
  StatsSection,
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
    </MainLayout>
  )
}

export default App
