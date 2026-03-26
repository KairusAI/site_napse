import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, Sparkles } from 'lucide-react'
import { useReducedMotionPreference } from '@/hooks/useReducedMotion'

const SCROLL_INDICATOR_OFFSET = 80 // altura aproximada do header para scroll suave

type ScrollIndicatorProps = {
  targetId?: string
}

function ScrollIndicator({ targetId = 'ecossistema' }: ScrollIndicatorProps) {
  const scrollToTarget = () => {
    const nextSection = document.getElementById(targetId)
    if (nextSection) {
      const elementPosition = nextSection.getBoundingClientRect().top + window.scrollY
      const offsetPosition = elementPosition - SCROLL_INDICATOR_OFFSET
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
    }
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
        className="text-xs text-neutral-500/70 uppercase tracking-[0.2em]"
        animate={{ y: [0, 6, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut', delay: 2 }}
      >
        Scroll
      </motion.span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-neutral-400/30 bg-white/45 flex items-start justify-center pt-2"
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
  const prefersReducedMotion = useReducedMotionPreference()

  return (
    <section className="relative min-h-[92vh] overflow-hidden bg-white lg:grid lg:grid-cols-[1.03fr_0.97fr]">

      <div className="relative z-10 flex flex-col justify-center px-5 pt-24 pb-8 sm:px-6 sm:py-16 lg:px-12 lg:py-24 xl:px-20">
        <div className="mx-auto w-full max-w-2xl lg:mx-0">
          <motion.div
            className="surface-card inline-flex items-center gap-2.5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <Sparkles className="h-3.5 w-3.5 text-nat-blue" strokeWidth={2} />
            <span>Ecossistema para clínicas com agentes de IA</span>
          </motion.div>
          <motion.h1
            className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-[3.35rem] lg:leading-[1.05]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Gestão clínica com IA em um só lugar, com uma jornada que seu time entende no primeiro olhar.
          </motion.h1>
          <motion.p
            className="mt-5 text-base sm:text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Agenda, prontuário, confirmações e rotina financeira conectados para reduzir retrabalho e dar mais clareza à operação da clínica.
          </motion.p>
          <motion.p
            className="mt-5 inline-flex max-w-max rounded-full border border-nat-blue/20 bg-nat-blue/10 px-4 py-2 text-sm font-semibold text-nat-blue"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Para clínicas que querem menos faltas e menos improviso na rotina.
          </motion.p>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href="#contato"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl bg-brand-gradient px-7 py-4 text-base font-semibold text-white shadow-brand focus:outline-none focus:ring-2 focus:ring-nat-blue focus:ring-offset-2"
              whileHover={{ scale: 1.02, boxShadow: '0 14px 34px -10px hsl(217 91% 50% / 0.5)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Falar com um especialista</span>
              <ArrowRight className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" aria-hidden />
            </motion.a>
            <a
              href="#demonstracao"
              className="surface-card inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-semibold text-neutral-800 transition-colors hover:border-nat-blue/30 hover:text-nat-blue focus:outline-none focus:ring-2 focus:ring-nat-blue/20 focus:ring-offset-2"
            >
              <PlayCircle className="h-5 w-5" strokeWidth={1.8} />
              Ver demonstração
            </a>
          </motion.div>
          <motion.p
            className="mt-4 max-w-lg text-sm text-neutral-500"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            Sem compromisso inicial. Primeiro entendemos sua operação.
          </motion.p>
        </div>
      </div>

      <div className="relative flex min-h-[44vh] items-center justify-center px-4 pb-10 pt-2 sm:px-6 lg:min-h-[92vh] lg:justify-end lg:px-8 lg:pb-0">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-[60rem] lg:max-w-[60rem]"
        >
              <video
                src="/assets/VideoMascote_hero.mp4"
                autoPlay={!prefersReducedMotion}
                muted
                loop={!prefersReducedMotion}
                playsInline
                controls={prefersReducedMotion}
                className="relative z-10 mt-3 mx-auto h-full max-h-[72vh] w-auto max-w-full rounded-3xl object-contain"
                aria-label="Mascotes Napse: Financeiro, Secretaria, Médico e Marketing"
              />
        </motion.div>
      </div>

      {!prefersReducedMotion ? <ScrollIndicator targetId="ecossistema" /> : null}
    </section>
  )
}
