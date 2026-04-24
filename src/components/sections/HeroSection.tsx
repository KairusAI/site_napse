import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { DURATION, EASE_OUT } from '@/lib/motion'

const SCROLL_INDICATOR_OFFSET = 80 // altura aproximada do header para scroll suave

type ScrollIndicatorProps = {
  targetId?: string
}

function ScrollIndicator({ targetId = 'ecossistema' }: ScrollIndicatorProps) {
  const reduce = useReducedMotion()
  const scrollToTarget = () => {
    const nextSection = document.getElementById(targetId)
    if (nextSection) {
      const elementPosition = nextSection.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - SCROLL_INDICATOR_OFFSET
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
  }

  if (reduce) {
    return (
      <div
        className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer select-none opacity-70"
        onClick={scrollToTarget}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') scrollToTarget()
        }}
        role="button"
        tabIndex={0}
      >
        <span className="text-xs text-neutral-500/60 uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-neutral-400/30 flex items-start justify-center pt-2">
          <div className="w-2 h-2 rounded-full bg-nat-purple" />
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 cursor-pointer select-none"
      onClick={scrollToTarget}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.2 }}
    >
      <motion.span
        className="text-xs text-neutral-500/60 uppercase tracking-[0.2em]"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 2 }}
      >
        Scroll
      </motion.span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-neutral-400/30 flex items-start justify-center pt-2"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 2 }}
      >
        <motion.div
          className="w-2 h-2 rounded-full bg-nat-purple"
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  )
}

/**
 * Hero Section - texto à esquerda, imagem/vídeo como fundo à direita.
 * Foco em inteligência e ecossistema para clínicas.
 */
export function HeroSection() {
  const reduce = useReducedMotion()
  return (
    <section className="relative min-h-[85vh] overflow-hidden lg:grid lg:grid-cols-2 mt-6">
      {/* Textura sutil — evita flat white (Awwwards trend) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />
      {/* Gradiente suave — depth sem purple-on-white genérico */}
      <div
        className="pointer-events-none absolute -right-1/4 -top-1/4 w-[80vw] h-[80vw] rounded-full opacity-30 blur-[80px]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)' }}
        aria-hidden
      />
      {/* Coluna esquerda: texto */}
      <div className="relative z-10 flex flex-col justify-center px-4 pt-20 pb-8 sm:px-6 sm:py-16 sm:pb-10 lg:px-8 lg:py-20">
        <div className="max-w-xl">
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.6, ease: EASE_OUT }}
          >
            Menos burocracia. <span className="text-nat-purple">Mais tempo</span> para o que importa.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Agenda, prontuário eletrônico, prescrição digital e marketing com IA em um só lugar. O copiloto que sua clínica precisava — você aprova, a IA executa.
          </motion.p>
          <motion.p
            className="mt-4 text-sm font-medium text-neutral-500"
            initial={{ opacity: 0, y: reduce ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : 0.6, delay: reduce ? 0 : 0.18, ease: EASE_OUT }}
          >
            Equipes clínicas em todo o Brasil usam a NAPSE para ganhar produtividade e manter a conformidade.
          </motion.p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-neutral-200/80 py-3 sm:gap-x-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Integra com</span>
            <div className="flex flex-wrap items-center gap-4 sm:gap-5 opacity-90" aria-label="Logos de integrações">
              <img src="/assets/icons/memed.png" alt="Memed" className="h-6 w-auto sm:h-7 object-contain" height={28} />
              <img src="/assets/icons/vidaas.png" alt="vidaas" className="h-6 w-auto sm:h-7 object-contain" height={28} />
              <img src="/assets/icons/calendar.png" alt="Agenda" className="h-6 w-auto sm:h-7 object-contain" height={28} />
              <img src="/assets/icons/whatsapp.png" alt="WhatsApp" className="h-6 w-auto sm:h-7 object-contain" height={28} />
              <img src="/assets/icons/gmail.png" alt="Gmail" className="h-6 w-auto sm:h-7 object-contain" height={28} />
              <img src="/assets/icons/instagram.png" alt="Instagram" className="h-6 w-auto sm:h-7 object-contain" height={28} />
            </div>
          </div>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0.01 : DURATION.short, delay: reduce ? 0 : 0.22, ease: EASE_OUT }}
          >
            <motion.a
              href="#contato"
              className="group relative inline-flex w-full min-w-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-nat-purple px-7 py-3.5 text-center text-base font-semibold text-white shadow-[0_4px_20px_-4px_hsl(262_83%_52%_/_0.5)] focus:outline-none focus:ring-2 focus:ring-nat-purple focus:ring-offset-2 sm:w-auto"
              whileHover={reduce ? undefined : { scale: 1.03, boxShadow: '0 12px 32px -8px hsl(262 83% 52% / 0.45)' }}
              whileTap={reduce ? undefined : { scale: 0.98 }}
            >
              <span className="relative z-10">Falar com especialista</span>
              <ArrowRight className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"
                aria-hidden
              />
            </motion.a>
            <a
              href="#planos"
              className="inline-flex w-full min-w-0 items-center justify-center rounded-xl border-2 border-neutral-300/90 bg-white/80 px-7 py-3.5 text-center text-base font-semibold text-neutral-800 shadow-sm backdrop-blur-sm transition-colors hover:border-nat-purple/50 hover:text-nat-purple focus:outline-none focus:ring-2 focus:ring-nat-purple/40 focus:ring-offset-2 sm:w-auto"
            >
              Ver planos
            </a>
          </motion.div>
        </div>
      </div>

      {/* Coluna direita: vídeo dos mascotes (loop, sem som) */}
      <div className="relative flex min-h-[25vh] sm:min-h-[40vh] items-center justify-center lg:min-h-[85vh] lg:justify-end lg:pr-0 lg:pl-4 xl:pl-8">
        <video
          src="/assets/VideoMascote_hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full max-h-[85vh] w-auto max-w-[85vw] object-contain object-right lg:max-w-[55vw] lg:-translate-x-4 xl:-translate-x-2"
          aria-label="Mascotes Napse: Financeiro, Secretaria, Médico e Marketing"
        />
      </div>

      <ScrollIndicator targetId="ecossistema" />
    </section>
  )
}
