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

type NavItemDef = { label: string; href: string; Icon: LucideIcon; linkTitle?: string }

const NAV: Record<NavItemId, NavItemDef> = {
  ecossistema: { label: 'Ecossistema', href: '#ecossistema', Icon: LineChart },
  integracoes: { label: 'Integrações', href: '#integracoes', Icon: Plug },
  plataforma: { label: 'Plataforma', href: '#plataforma', Icon: LayoutDashboard },
  suporte: {
    label: 'Suporte',
    linkTitle: 'Onboarding e suporte',
    href: '#suporte',
    Icon: Headphones,
  },
  stats: { label: 'Resultados', linkTitle: 'Impacto em números', href: '#stats', Icon: BarChart3 },
  planos: { label: 'Planos', linkTitle: 'Ver planos', href: '#planos', Icon: BadgeDollarSign },
  depoimentos: { label: 'Depoimentos', href: '#depoimentos', Icon: MessageCircle },
  faq: { label: 'FAQ', linkTitle: 'Dúvidas frequentes', href: '#faq', Icon: HelpCircle },
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

/** Ordem da navegação = ordem das secções na página. */
const PRIMARY_NAV: readonly NavItemId[] = SCROLL_SPY_ORDER

/** Itens extra só no menu “Mais no site” (móvel); vazio = tudo em PRIMARY_NAV. */
const MORE_NAV: readonly NavItemId[] = []

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
    const mq = window.matchMedia('(min-width: 1024px)')
    const onMq = () => {
      if (mq.matches) {
        setMobileMenuOpen(false)
        setOpenMobileMore(false)
      }
    }
    mq.addEventListener('change', onMq)
    return () => mq.removeEventListener('change', onMq)
  }, [])

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
        title={item.linkTitle ?? item.label}
        onClick={(event) => handleNavClick(event, id)}
        className={`flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left text-base font-medium transition-colors ${
          isActive ? 'bg-primary/10 text-primary' : 'text-neutral-800 hover:bg-neutral-100/80'
        }`}
      >
        <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : 'text-neutral-400'}`} strokeWidth={1.8} />
        {item.label}
      </a>
    )
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 overflow-visible transition-[margin] duration-300 ease-out ${
          isScrolled ? 'mt-3' : 'mt-6'
        }`}
      >
        <div
          className={`lg:hidden absolute inset-0 bg-white/70 border-b border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl transition-[height] duration-300 ${
            isScrolled ? 'h-14' : 'h-16'
          }`}
        />

        <div
          className={`relative mx-auto flex w-full min-w-0 max-w-site items-center justify-between gap-2 overflow-visible px-4 sm:gap-3 sm:px-5 lg:grid lg:min-w-0 lg:grid-cols-[minmax(0,auto)_minmax(0,1fr)_minmax(0,auto)] lg:items-center lg:gap-x-3 xl:gap-x-6 lg:px-6 transition-[height] duration-300 ease-out ${
            isScrolled ? 'h-14 lg:h-14' : 'h-16 lg:h-16'
          }`}
        >
          <div className="flex min-w-0 items-center lg:min-h-0 lg:justify-self-start lg:pl-0 lg:pr-1">
            <motion.a
              href="#hero"
              onClick={(event) => {
                event.preventDefault()
                scrollToHero()
              }}
              className="hidden h-8 items-center lg:flex"
              initial={{ opacity: 0, x: -6 }}
              animate={isScrolled ? { opacity: 0, x: -6, pointerEvents: 'none' } : { opacity: 1, x: 0, pointerEvents: 'auto' }}
              transition={{ duration: 0.3 }}
              aria-label="Napse - início"
            >
              <img src="/assets/NAPSE-LogotipoPadrao.svg" alt="Napse" className="h-6 w-auto xl:h-12" />
            </motion.a>
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault()
                scrollToHero()
              }}
              className="flex h-7 shrink-0 items-center lg:hidden"
              aria-label="Napse - início"
            >
              <img src="/assets/NAPSE-LogotipoPadrao.svg" alt="Napse" className="h-7 w-auto sm:h-8" />
            </a>
          </div>

          <nav
            className="hidden min-w-0 w-full max-w-full justify-self-stretch overflow-visible lg:flex lg:justify-center"
            aria-label="Navegação principal"
          >
            <div className="scrollbar-hide flex w-full min-w-0 max-w-full justify-center overflow-x-auto overflow-y-visible overscroll-x-contain py-0 [-ms-overflow-style:none] [scrollbar-width:none]">
                <div
                  className={`relative inline-flex w-max min-w-0 shrink-0 flex-nowrap items-center font-medium ${
                    isScrolled
                      ? 'h-fit gap-0.5 rounded-full border border-white/80 bg-white/80 py-0.5 text-sm shadow-[0_8px_28px_rgba(15,23,42,0.08)] backdrop-blur-sm pl-1 pr-1 sm:pl-1 sm:pr-1.5'
                      : 'h-10 min-h-8 gap-0.5 px-1 py-0 text-base sm:gap-0.5 sm:px-1.5 sm:text-lg lg:text-xl bg-transparent'
                  }`}
                >
                  {isScrolled && (
                    <motion.button
                      type="button"
                      initial={{ opacity: 0, x: -6, scale: 0.98 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="mr-0.5 flex shrink-0 items-center rounded-l-full py-0.5 pl-1 pr-0.5 sm:mr-1 sm:pl-1.5"
                      onClick={scrollToHero}
                      aria-label="Voltar para o início"
                    >
                      <img
                        src="/assets/NAPSE-LogotipoPadrao.svg"
                        alt="Napse"
                        className="h-7 w-auto sm:h-8"
                      />
                    </motion.button>
                  )}

                {PRIMARY_NAV.map((id) => {
                  const item = NAV[id]
                  const isActive = activeId === id
                  return (
                    <div
                      key={id}
                      className={`relative flex h-full shrink-0 items-center justify-center px-0.5 ${
                        isScrolled
                          ? 'min-h-8 max-w-[min(5.75rem,22vw)] sm:max-w-[min(6.5rem,18vw)] lg:max-w-none'
                          : 'min-h-9 max-w-[min(6.5rem,24vw)] sm:max-w-[min(7.25rem,20vw)] lg:max-w-none'
                      }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="header-bubble"
                          className="absolute inset-y-0.5 left-0 right-0 rounded-full bg-gradient-to-r from-primary to-primary/85 shadow-[0_4px_16px_hsl(var(--primary)_/_0.35)]"
                          transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                        />
                      )}
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, id)}
                        className={`relative z-10 inline-flex min-w-0 max-w-full items-center justify-center overflow-hidden text-ellipsis whitespace-nowrap rounded-full font-medium transition-colors duration-200 ${
                          isScrolled
                            ? 'h-8 min-h-8 px-1.5 text-[11px] sm:px-2 sm:text-xs lg:px-2.5 lg:text-sm'
                            : 'h-9 min-h-9 px-1 text-xs sm:px-2 sm:text-sm lg:px-2.5 lg:text-base xl:px-3 xl:text-lg'
                        } ${isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900'}`}
                        title={item.linkTitle ?? item.label}
                      >
                        <span className="truncate">{item.label}</span>
                      </a>
                    </div>
                  )
                })}
                </div>
            </div>
          </nav>

          <div className="flex shrink-0 items-center gap-1.5 sm:gap-2 lg:ml-0 lg:min-w-0 lg:justify-self-end lg:pl-2 xl:pl-3">
            <a
              href="#contato"
              onClick={(e) => {
                e.preventDefault()
                scrollToContact()
              }}
              className={`hidden shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground shadow-[0_4px_14px_-2px_hsl(var(--primary)_/_0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_6px_20px_-2px_hsl(var(--primary)_/_0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 sm:inline-flex max-lg:max-w-[min(100%,10.5rem)] max-lg:truncate max-lg:px-2.5 ${
                isScrolled
                  ? 'h-8 min-h-8 text-[11px] sm:px-3 sm:text-xs lg:px-3.5 xl:text-sm'
                  : 'h-9 min-h-10 text-[11px] sm:px-3 sm:text-xs sm:py-2 lg:px-4 lg:py-2.5 xl:text-sm'
              }`}
              title="Falar com especialista"
            >
              Falar com especialista
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/90 bg-white/80 shadow-md backdrop-blur-xl lg:hidden"
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
            className="fixed inset-0 z-40 lg:hidden"
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
              className={`absolute left-4 right-4 max-h-[calc(100dvh-5.5rem)] overflow-y-auto rounded-2xl border border-white/80 bg-white/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl ${
                isScrolled ? 'top-[4.25rem]' : 'top-[5.5rem]'
              }`}
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
                {MORE_NAV.length > 0 && (
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
                                  isActive ? 'bg-primary/10 text-primary' : 'text-neutral-700'
                                }`}
                              >
                                <Icon
                                  className={`h-5 w-5 shrink-0 ${isActive ? 'text-primary' : 'text-neutral-400'}`}
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
                )}
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
                  className="flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3.5 text-base font-semibold text-primary-foreground shadow-[0_4px_14px_-2px_hsl(var(--primary)_/_0.4)]"
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
