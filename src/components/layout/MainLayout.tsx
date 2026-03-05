import { ReactNode, useEffect } from 'react'
import { ReactLenis, getDefaultLenisOptions } from '@/hooks/useLenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const lenisOptions = getDefaultLenisOptions()

  useEffect(() => {
    gsap.ticker.lagSmoothing(0)
  }, [])

  return (
    <ReactLenis
      root
      options={lenisOptions}
      className="min-h-screen"
    >
      <div className="min-h-screen flex flex-col overflow-x-hidden">
        {children}
      </div>
    </ReactLenis>
  )
}
