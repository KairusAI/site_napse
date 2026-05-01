/**
 * Tokens partilhados (Framer Motion) — duração, ease e ritmo de stagger alinhados entre secções.
 */
export const EASE_OUT = [0.22, 1, 0.36, 1] as const

export const DURATION = {
  section: 0.65,
  short: 0.45,
  path: 3.0,
} as const

/** Entre itens de grelha / listas (4–6 itens; total de atraso < ~0,5s). */
export const STAGGER = 0.04

export const viewportOnceTight = { once: true, margin: '-60px' as const }
export const viewportOnce = { once: true, margin: '-80px' as const }
export const viewportOnceLoose = { once: true, margin: '0px 0px -120px' as const }
