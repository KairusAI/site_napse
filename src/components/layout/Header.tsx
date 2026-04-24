import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LineChart,
  Plug,
  LayoutDashboard,
  Headphones,
  BarChart3,
  BadgeDollarSign,
  MessageCircle,
  HelpCircle,
  Mail,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useLenis } from '@/hooks/useLenis'

type NavItemId =
  | 'ecossistema'
  | 'integracoes'
  | 'plataforma'
  | 'suporte'
  | 'stats'
  | 'planos'
  | 'depoimentos'
  | 'faq'
  | 'contato'

const NAV: Record<
  NavItemId,
  { label: string; href: string; Icon: LucideIcon }
> = {
  ecossistema: { label: 'Ecossistema', href: '#ecossistema', Icon: LineChart },
  integracoes: { label: 'Integrações', href: '#integracoes', Icon: Plug },
  plataforma: { label: 'Plataforma', href: '#plataforma', Icon: LayoutDashboard },
  suporte: { label: 'Onboarding e suporte', href: '#suporte', Icon: Headphones },
  stats: { label: 'Resultados', href: '#stats', Icon: BarChart3 },
  planos: { label: 'Ver planos', href: '#planos', Icon: BadgeDollarSign },
  depoimentos: { label: 'Depoimentos', href: '#depoimentos', Icon: MessageCircle },
  faq: { label: 'Dúvidas (FAQ)', href: '#faq', Icon: HelpCircle },
  contato: { label: 'Contato', href: '#contato', Icon: Mail },
}

/** Ordem da página: usada só pelo scroll spy. */
const SCROLL_SPY_ORDER: readonly NavItemId[] = [
  'ecossistema',
  'integracoes',
  'plataforma',
  'suporte',
  'stats',
  'planos',
  'depoimentos',
  'faq',
  'contato',
]

/** Topo: poucos rótulos legíveis; o resto em “Mais” (móvel) e no rodapé. */
const PRIMARY_NAV: readonly NavItemId[] = [
  'ecossistema',
  'integracoes',
  'planos',
  'depoimentos',
  'contato',
] as const

const MORE_NAV: readonly NavItemId[] = ['plataforma', 'suporte', 'stats', 'faq'] as const

const HEADER_SCROLL_OFFSET = 72
const SCROLL_SPY_VIEW_TOP = 120

export function Header() {
  const lenis = useLenis()
  const [activeId, setActiveId] = useState<NavItemId>('ecossistema')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openMobileMore, setOpenMobileMore] = useState(false)
  const activeIdRef = useRef<NavItemId>(activeId)
  activeIdRef.current = activeId

  const scrollToTarget = useCallback(
    (element: HTMLElement | null) => {
      if (!element) return
      if (lenis) {
        lenis.scrollTo(element, { offset: -HEADER_SCROLL_OFFSET, duration: 1 })
      } else {
        const top = element.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET
        window.scrollTo({ top, behavior: 'smooth' })
      }
    },
    [lenis]
  )

  const scrollToHero = useCallback(() => {
    scrollToTarget(document.getElementById('hero'))
  }, [scrollToTarget])

  const scrollToSection = useCallback(
    (id: string) => {
      scrollToTarget(document.getElementById(id))
    },
    [scrollToTarget]
  )

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: NavItemId) => {
    event.preventDefault()
    setActiveId(id)
    setMobileMenuOpen(false)
    setOpenMobileMore(false)
    scrollToSection(id)
  }

  const scrollToContact = useCallback(() => {
    setActiveId('contato')
    scrollToTarget(document.getElementById('contato'))
  }, [scrollToTarget])

  useLenis(
    (l) => {
      if (!l) return
      const scrollY = l.scroll
      const scrolled = scrollY > 40
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev))

      let current: NavItemId | null = null
      for (let i = SCROLL_SPY_ORDER.length - 1; i >= 0; i--) {
        const id = SCROLL_SPY_ORDER[i]!
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= SCROLL_SPY_VIEW_TOP) {
          current = id
          break
        }
      }
      const next = current ?? (scrollY < 100 ? 'ecossistema' : activeIdRef.current)
      setActiveId((prev) => (prev !== next ? next : prev))
    },
    []
  )

  useEffect(() => {
    if (lenis) return
    const onScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 40)
      let current: NavItemId | null = null
      for (let i = SCROLL_SPY_ORDER.length - 1; i >= 0; i--) {
        const id = SCROLL_SPY_ORDER[i]!
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= SCROLL_SPY_VIEW_TOP) {
          current = id
          break
        }
      }
      const next = current ?? (scrollY < 100 ? 'ecossistema' : activeIdRef.current)
      setActiveId((prev) => (prev !== next ? next : prev))
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [lenis])

  const renderNavLink = (id: NavItemId) => {
    const item = NAV[id]
    const isActive = activeId === id
    const Icon = item.Icon
    return (
      <a
        href={item.href}
        onClick={(event) => handleNavClick(event, id)}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors ${
          isActive ? 'bg-nat-purple/10 text-nat-purple' : 'text-neutral-800 hover:bg-neutral-100/80'
        }`}
      >
        <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-nat-purple' : 'text-neutral-400'}`} strokeWidth={1.8} />
        {item.label}
      </a>
    )
  }

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 overflow-visible mt-6">
        <div className="sm:hidden absolute inset-0 h-16 bg-white/70 border-b border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl" />

        <div className="relative mx-auto flex h-16 w-full min-w-0 max-w-site items-center overflow-visible px-4 max-sm:justify-between sm:grid sm:h-16 sm:min-w-0 sm:grid-cols-[minmax(0,1fr)_minmax(0,auto)_minmax(0,1fr)] sm:items-center sm:gap-x-5 md:gap-x-7 sm:px-5 lg:px-6">
          <div className="flex min-w-0 items-center sm:min-h-0 sm:justify-self-start sm:pl-0 sm:pr-1">
            <motion.a
              href="#hero"
              onClick={(event) => {
                event.preventDefault()
                scrollToHero()
              }}
              className="hidden h-8 items-center sm:flex"
              initial={{ opacity: 0, x: -6 }}
              animate={isScrolled ? { opacity: 0, x: -6, pointerEvents: 'none' } : { opacity: 1, x: 0, pointerEvents: 'auto' }}
              transition={{ duration: 0.3 }}
              aria-label="Napse - início"
            >
              <img src="/assets/NAPSE-LogotipoPadrao.svg" alt="Napse" className="h-6 w-auto lg:h-12" />
            </motion.a>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToHero()
              }}
              className="flex h-7 shrink-0 items-center sm:hidden"
              aria-label="Napse - início"
            >
              <img src="/assets/NAPSE-LogotipoPadrao.svg" alt="Napse" className="h-7 w-auto" />
            </a>
          </div>

          <nav
            className="hidden min-w-0 overflow-visible sm:flex sm:min-w-0 sm:max-w-[min(100%,92vw)] sm:justify-self-center"
            aria-label="Navegação principal"
          >
            <div className="flex w-full min-w-0 max-w-full justify-center overflow-visible py-0.5">
                <div
                  className={`relative inline-flex w-max min-w-0 max-w-full flex-nowrap items-center overflow-visible text-xl font-medium ${
                    isScrolled
                      ? 'h-fit gap-1.5 rounded-full border border-white/80 bg-white/80 shadow-[0_10px_35px_rgba(15,23,42,0.1)] backdrop-blur-sm sm:max-w-full sm:pl-1.5 sm:pr-2 '
                      : 'h-10 min-h-8 gap-0.5 px-1.5 py-0 sm:gap-0.5 bg-transparent'
                  }`}
                >
                  {isScrolled && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, x: -6, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="mr-6 flex h-fit shrink-0 items-center p-8"
                      onClick={scrollToHero}
                      aria-label="Voltar para o início"
                    >
                      <img
                        src="/assets/NAPSE-LogotipoPadrao.svg"
                        alt="Napse"
                        className="h-12 w-auto sm:h-13"
                      />
                    </motion.button>
                  )}

                {PRIMARY_NAV.map((id) => {
                  const item = NAV[id]
                  const isActive = activeId === id
                  return (
                    <div
                      key={id}
                      className="relative flex h-full min-h-9 max-w-[min(8.5rem,28vw)] items-center justify-center px-0.5 sm:max-w-none"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="header-bubble"
                          className="absolute inset-y-0.5 left-0 right-0 rounded-full bg-gradient-to-r from-nat-purple to-nat-purple/85 shadow-[0_6px_20px_rgba(88,28,135,0.4)] p-4"
                          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                        />
                      )}
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, id)}
                        className={`relative z-10 inline-flex h-9 min-h-9 min-w-0 max-w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full px-1.5 text-sm font-medium transition-colors duration-200 sm:px-2.5 sm:text-base md:px-3 md:text-lg ${
                          isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900'
                        }`}
                        title={item.label}
                      >
                        <span className="truncate">{item.label}</span>
                      </a>
                    </div>
                  )
                })}
                </div>
            </div>
          </nav>

          <div className="ml-auto flex shrink-0 items-center sm:ml-0 sm:min-w-0 sm:justify-self-end sm:pl-2 md:pl-3">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                scrollToContact()
              }}
              className="hidden h-9 shrink-0 items-center justify-center rounded-full bg-nat-purple px-3.5 text-xs font-semibold text-white shadow-[0_4px_14px_-2px_rgba(99,102,241,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-2px_rgba(99,102,241,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple focus-visible:ring-offset-2 sm:inline-flex sm:min-h-10 sm:px-4 sm:py-2.5 sm:text-sm"
            >
              Falar com especialista
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-md backdrop-blur-xl sm:hidden"
              aria-label={mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'}
            >
            <AnimatePresence mode="wait" initial={false}>
              {mobileMenuOpen ? (
                <motion.span
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5 text-neutral-700" />
                </motion.span>
              ) : (
                <motion.span
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5 text-neutral-700" />
                </motion.span>
              )}
            </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              className="absolute left-4 right-4 top-16 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              aria-label="Menu móvel"
            >
              <ul className="flex flex-col gap-1">
                {PRIMARY_NAV.map((id) => (
                  <li key={id} className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white/50">
                    {renderNavLink(id)}
                  </li>
                ))}
                <li className="overflow-hidden rounded-xl border border-neutral-200/80 bg-white/50">
                  <button
                    type="button"
                    onClick={() => setOpenMobileMore((p) => !p)}
                    className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-base font-semibold text-neutral-900"
                    aria-expanded={openMobileMore}
                  >
                    Mais no site
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-neutral-500 transition-transform ${
                        openMobileMore ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {openMobileMore && (
                    <ul className="space-y-0.5 border-t border-neutral-200/60 px-2 py-2">
                      {MORE_NAV.map((id) => {
                        const item = NAV[id]
                        const isActive = activeId === id
                        const Icon = item.Icon
                        return (
                          <li key={id}>
                            <a
                              href={item.href}
                              onClick={(event) => handleNavClick(event, id)}
                              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                                isActive ? 'bg-nat-purple/10 text-nat-purple' : 'text-neutral-700'
                              }`}
                            >
                              <Icon
                                className={`h-5 w-5 shrink-0 ${isActive ? 'text-nat-purple' : 'text-neutral-400'}`}
                                strokeWidth={1.8}
                              />
                              {item.label}
                            </a>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </li>
              </ul>
              <div className="mt-4 border-t border-neutral-200/80 pt-4">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    setOpenMobileMore(false)
                    setActiveId('contato')
                    scrollToTarget(document.getElementById('contato'))
                  }}
                  className="flex w-full items-center justify-center rounded-xl bg-nat-purple px-5 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_-2px_rgba(99,102,241,0.4)]"
                >
                  Falar com especialista
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
