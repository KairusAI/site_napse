import { MainLayout } from '@/components/layout/MainLayout'
import { Header } from '@/components/layout/Header'
import { HeroSection } from '@/components/sections'

function App() {
  return (
    <MainLayout>
      <Header />
      <main id="hero">
        <HeroSection />
        {/* Seções dos mascotes e Bento Grid serão adicionadas aqui */}
      </main>
    </MainLayout>
  )
}

export default App
