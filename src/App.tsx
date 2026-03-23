import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  HeroSection,
  TrustSection,
  ProductDemoSection,
  PillarsSection,
  IntegrationsBentoGrid,
  SupportOnboardingSection,
  StatsSection,
  PricingSection,
  TestimonialsSection,
  SecuritySection,
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
      <TrustSection />
      <ProductDemoSection />
      <PillarsSection />
      <IntegrationsBentoGrid />
      <SupportOnboardingSection />
      <StatsSection />
      <TestimonialsSection />
      <SecuritySection />
      <PricingSection />
      <FAQSection />
      <FinalCTASection />
      <ContactSection />
      <Footer />
    </MainLayout>
  )
}

export default App
