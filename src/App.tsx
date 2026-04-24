import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import {
  HeroSection,
  PillarsSection,
  IntegrationsBentoGrid,
  AppShowcaseSection,
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
      <div className="flex w-full flex-col">
        <main id="hero">
          <HeroSection />
        </main>
        <PillarsSection />
        <IntegrationsBentoGrid />
        <AppShowcaseSection />
        <SupportOnboardingSection />
        <StatsSection />
        <PricingSection />
        <TestimonialsSection />
        <FAQSection />
        <ContactSection />
        <FinalCTASection />
      </div>
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
        <Route path="/termos-de-servico" element={<TermosDeServico />} />
        <Route path="/politica-de-privacidade" element={<PoliticaPrivacidade />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
