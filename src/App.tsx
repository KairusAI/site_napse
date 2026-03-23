import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
import { TermosDeServico } from '@/pages/TermosDeServico'
import { PoliticaPrivacidade } from '@/pages/PoliticaPrivacidade'

function HomePage() {
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/termos-de-uso" element={<TermosDeServico />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
