import { useLenis as useLenisContext } from 'lenis/react'
import { getPrefersReducedMotion } from '@/hooks/useReducedMotion'

export interface LenisScrollOptions {
  duration?: number
  lerp?: number
  smoothWheel?: boolean
  syncTouch?: boolean
}

const defaultOptions: LenisScrollOptions = {
  duration: 1.2,
  lerp: 0.08,
  smoothWheel: true,
  syncTouch: true,
}

/**
 * Hook para acessar a instância do Lenis (quando usado dentro de ReactLenis).
 * Use para scroll programático ou callbacks de scroll.
 */
export function useLenis(
  callback?: (params: { scroll: number; limit: number; velocity: number; progress: number; direction: number }) => void,
  deps: React.DependencyList = []
) {
  return useLenisContext(callback, [...deps])
}

/**
 * Opções padrão do Lenis para uso no ReactLenis.
 */
export function getDefaultLenisOptions(): LenisScrollOptions {
  if (getPrefersReducedMotion()) {
    return {
      duration: 0,
      lerp: 1,
      smoothWheel: false,
      syncTouch: false,
    }
  }

  return { ...defaultOptions }
}

export { ReactLenis } from 'lenis/react'
