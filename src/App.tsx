import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { lazy, Suspense } from 'react'
import {
  HeroSection,
  PillarsSection,
} from '@/components/sections'

const IntegrationsBentoGrid = lazy(() => import('@/components/sections').then(m => ({ default: m.IntegrationsBentoGrid })))
const AppShowcaseSection = lazy(() => import('@/components/sections').then(m => ({ default: m.AppShowcaseSection })))
const SupportOnboardingSection = lazy(() => import('@/components/sections').then(m => ({ default: m.SupportOnboardingSection })))
const StatsSection = lazy(() => import('@/components/sections').then(m => ({ default: m.StatsSection })))
const PricingSection = lazy(() => import('@/components/sections').then(m => ({ default: m.PricingSection })))
const TestimonialsSection = lazy(() => import('@/components/sections').then(m => ({ default: m.TestimonialsSection })))
const FAQSection = lazy(() => import('@/components/sections').then(m => ({ default: m.FAQSection })))
const FinalCTASection = lazy(() => import('@/components/sections').then(m => ({ default: m.FinalCTASection })))
const ContactSection = lazy(() => import('@/components/sections').then(m => ({ default: m.ContactSection })))
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
        <Suspense fallback={<div className="min-h-screen bg-[#F8FAFC]" />}>
          <IntegrationsBentoGrid />
          <AppShowcaseSection />
          <SupportOnboardingSection />
          <StatsSection />
          <PricingSection />
          <TestimonialsSection />
          <FAQSection />
          <ContactSection />
          <FinalCTASection />
        </Suspense>
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
