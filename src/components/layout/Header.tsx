import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { LineChart, Plug, Headphones, BadgeDollarSign, MessageCircle } from 'lucide-react'

const navItems = [
  { id: 'ecossistema', label: 'Ecossistema', href: '#ecossistema', Icon: LineChart },
  { id: 'integracoes', label: 'Integrações', href: '#integracoes', Icon: Plug },
  { id: 'suporte', label: 'Suporte', href: '#suporte', Icon: Headphones },
  { id: 'planos', label: 'Planos', href: '#planos', Icon: BadgeDollarSign },
  { id: 'depoimentos', label: 'Depoimentos', href: '#depoimentos', Icon: MessageCircle },
] as const

type NavItemId = (typeof navItems)[number]['id']

export function Header() {
  const [activeId, setActiveId] = useState<NavItemId>('ecossistema')
  const [isScrolled, setIsScrolled] = useState(false)

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

  const handleNavClick = (event: React.MouseEvent<HTMLAnchorElement>, id: NavItemId, href: string) => {
    event.preventDefault()
    setActiveId(id)

    const targetId = href.replace('#', '')
    const element = document.getElementById(targetId)
    if (!element) return

    const headerOffset = 72
    const elementPosition = element.getBoundingClientRect().top + window.scrollY
    const offsetPosition = elementPosition - headerOffset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        <motion.a
          href="#hero"
          onClick={(event) => {
            event.preventDefault()
            scrollToHero()
          }}
          className="flex items-center shrink-0"
          initial={{ opacity: 0, x: -8 }}
          animate={isScrolled ? { opacity: 0, x: -8 } : { opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
          aria-label="Napse - início"
        >
          <img
            src="/assets/NAPSE-LogotipoPadrao.svg"
            alt="Napse"
            className="h-8 w-auto"
          />
        </motion.a>

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

        <div className="hidden sm:block w-[80px]" />
      </div>
    </header>
  )
}
