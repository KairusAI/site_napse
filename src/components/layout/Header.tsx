import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { LineChart, Plug, Headphones, BadgeDollarSign, MessageCircle, HelpCircle, Menu, X } from 'lucide-react'

const navItems = [
  { id: 'ecossistema', label: 'Ecossistema', href: '#ecossistema', Icon: LineChart },
  { id: 'integracoes', label: 'Integrações', href: '#integracoes', Icon: Plug },
  { id: 'suporte', label: 'Suporte', href: '#suporte', Icon: Headphones },
  { id: 'planos', label: 'Planos', href: '#planos', Icon: BadgeDollarSign },
  { id: 'depoimentos', label: 'Depoimentos', href: '#depoimentos', Icon: MessageCircle },
  { id: 'faq', label: 'FAQ', href: '#faq', Icon: HelpCircle },
] as const

type NavItemId = (typeof navItems)[number]['id']

export function Header() {
  const [activeId, setActiveId] = useState<NavItemId>('ecossistema')
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const scrollToHero = () => {
    const element = document.getElementById('hero')
    if (!element) return

    const headerOffset = 72
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (!element) return
    const headerOffset = 72
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: NavItemId, href: string) => {
    event.preventDefault()
    setActiveId(id)
    setMobileMenuOpen(false)
    scrollToSection(href.replace('#', ''))
  }

  const scrollToContact = () => {
    const element = document.getElementById('contato')
    if (!element) return
    const headerOffset = 72
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerOffset
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Scroll-spy: atualiza a pílula conforme a seção visível
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id)
    const headerOffset = 120 // px a partir do topo da viewport para considerar "ativo"

    const updateActiveSection = () => {
      const scrollY = window.scrollY
      let current: NavItemId | null = null

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i]
        const el = document.getElementById(id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        const top = rect.top + scrollY
        // Seção está "ativa" quando seu topo passou da linha (headerOffset do viewport)
        if (scrollY + headerOffset >= top) {
          current = id as NavItemId
          break
        }
      }

      setActiveId((prev) => (current ?? (scrollY < 100 ? 'ecossistema' : prev)))
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    return () => window.removeEventListener('scroll', updateActiveSection)
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Barra glass mobile */}
        <div className="sm:hidden absolute inset-0 h-16 bg-white/70 border-b border-white/80 shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-xl" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Logo desktop: some ao scrollar */}
          <motion.a
            href="#hero"
            onClick={(event) => {
              event.preventDefault()
              scrollToHero()
            }}
            className="hidden sm:flex items-center shrink-0"
            initial={{ opacity: 0, x: -8 }}
            animate={isScrolled ? { opacity: 0, x: -8, pointerEvents: 'none' as const } : { opacity: 1, x: 0, pointerEvents: 'auto' as const }}
            transition={{ duration: 0.35 }}
            aria-label="Napse - início"
          >
            <img
              src="/assets/NAPSE-LogotipoPadrao.svg"
              alt="Napse"
              className="h-8 w-auto"
            />
          </motion.a>

          {/* Logo mobile: sempre visível */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); scrollToHero() }}
            className="sm:hidden flex items-center shrink-0"
            aria-label="Napse - início"
          >
            <img
              src="/assets/NAPSE-LogotipoPadrao.svg"
              alt="Napse"
              className="h-7 w-auto"
            />
          </a>

          {/* Nav desktop */}
          <nav className="hidden sm:flex flex-1 justify-center">
            <div className="relative inline-flex items-center rounded-full bg-white/70 border border-white/80 shadow-[0_10px_35px_rgba(15,23,42,0.12)] px-2 py-1 backdrop-blur-xl">
              <motion.div
                initial={false}
                animate={isScrolled ? { width: 'auto', opacity: 1, marginRight: 6 } : { width: 0, opacity: 0, marginRight: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden flex items-center cursor-pointer"
                onClick={scrollToHero}
                aria-label="Voltar para o início"
              >
                <img
                  src="/assets/NAPSE-LogotipoPadrao.svg"
                  alt="Napse"
                  className="h-5 w-auto mr-2"
                />
              </motion.div>

              {navItems.map((item) => {
                const isActive = activeId === item.id
                const Icon = item.Icon

                return (
                  <div key={item.id} className="relative px-0.5">
                    {isActive && (
                      <motion.div
                        layoutId="header-bubble"
                        className="absolute inset-0 rounded-full bg-gradient-to-r from-nat-purple to-nat-purple/85 shadow-[0_12px_40px_rgba(88,28,135,0.55)]"
                        transition={{ type: 'spring', stiffness: 360, damping: 26 }}
                      />
                    )}
                    <a
                      href={item.href}
                      onClick={(event) => handleNavClick(event, item.id, item.href)}
                      className={`relative z-10 flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-200 ${
                        isActive ? 'text-white' : 'text-neutral-600 hover:text-neutral-900'
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 ${
                          isActive ? 'text-white' : 'text-nat-purple/80'
                        }`}
                        strokeWidth={1.8}
                      />
                      <span>{item.label}</span>
                    </a>
                  </div>
                )
              })}
            </div>
          </nav>

          {/* CTA desktop */}
          <a
            href="#contato"
            onClick={(e) => {
              e.preventDefault()
              scrollToContact()
            }}
            className="hidden sm:inline-flex shrink-0 items-center justify-center rounded-full bg-nat-purple px-4 py-2.5 text-sm font-semibold text-white shadow-[0_4px_14px_-2px_rgba(99,102,241,0.4)] transition-all duration-200 hover:shadow-[0_6px_20px_-2px_rgba(99,102,241,0.5)] hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple focus-visible:ring-offset-2"
          >
            Começar agora
          </a>

          {/* Botão hamburguer mobile */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="sm:hidden relative z-50 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 border border-white/90 shadow-md backdrop-blur-xl"
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
      </header>

      {/* Menu mobile overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 sm:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
            <motion.nav
              className="absolute top-16 right-4 left-4 rounded-2xl border border-white/80 bg-white/95 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.15)] backdrop-blur-xl"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <ul className="flex flex-col gap-1">
                {navItems.map((item) => {
                  const isActive = activeId === item.id
                  const Icon = item.Icon
                  return (
                    <li key={item.id}>
                      <a
                        href={item.href}
                        onClick={(event) => handleNavClick(event, item.id, item.href)}
                        className={`flex items-center gap-3 rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                          isActive
                            ? 'bg-nat-purple/10 text-nat-purple'
                            : 'text-neutral-700 hover:bg-neutral-100'
                        }`}
                      >
                        <Icon className={`h-5 w-5 shrink-0 ${isActive ? 'text-nat-purple' : 'text-neutral-400'}`} strokeWidth={1.8} />
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
              <div className="mt-4 pt-4 border-t border-neutral-200/80">
                <a
                  href="#contato"
                  onClick={(e) => {
                    e.preventDefault()
                    setMobileMenuOpen(false)
                    scrollToContact()
                  }}
                  className="flex w-full items-center justify-center rounded-xl bg-nat-purple px-5 py-3.5 text-base font-semibold text-white shadow-[0_4px_14px_-2px_rgba(99,102,241,0.4)]"
                >
                  Começar agora
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
