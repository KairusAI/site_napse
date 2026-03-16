import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  HeroSection,
  PillarsSection,
  IntegrationsBentoGrid,
  SupportOnboardingSection,
  StatsSection,
  PricingSection,
  TestimonialsSection,
  FAQSection,
  FinalCTASection,
  ContactSection,
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
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <FinalCTASection />
      <Footer />
    </MainLayout>
  )
}

export default App
