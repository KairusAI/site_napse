import { ReactNode } from 'react'
import { ReactLenis, getDefaultLenisOptions } from '@/hooks/useLenis'

interface MainLayoutProps {
  children: ReactNode
}

export function MainLayout({ children }: MainLayoutProps) {
  const lenisOptions = getDefaultLenisOptions()

  return (
    <ReactLenis root options={lenisOptions} className="min-h-screen">
      <div className="min-h-screen flex flex-col">
        {children}
      </div>
    </ReactLenis>
  )
}
