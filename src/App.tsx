import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import {
  HeroSection,
  PillarsSection,
  IntegrationsBentoGrid,
  SupportOnboardingSection,
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
    </MainLayout>
  )
}

export default App
