import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { HeroSection, PillarsSection } from '@/components/sections'

function App() {
  return (
    <MainLayout>
      <Header />
      <main id="hero">
        <HeroSection />
      </main>
      <PillarsSection />
    </MainLayout>
  )
}

export default App
