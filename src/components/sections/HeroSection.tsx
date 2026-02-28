import { motion } from 'framer-motion'

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
      className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer select-none"
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
  return (
    <section className="relative min-h-[85vh] overflow-hidden lg:grid lg:grid-cols-2">
      {/* Coluna esquerda: texto */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-16 lg:px-12 lg:py-20 xl:px-20">
        <div className="max-w-xl ml-8 lg:ml-16 xl:ml-24">
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            A <span className="text-mascote-cycle">inteligência</span> que faltava para a sua clínica.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Um ecossistema completo, do marketing ao faturamento. Deixe os especialistas cuidarem do operacional enquanto você foca no paciente.
          </motion.p>
          <motion.a
            href="#contato"
            className="mt-8 inline-flex items-center justify-center rounded-lg bg-nat-purple px-6 py-3.5 text-base font-semibold text-white shadow-md transition hover:bg-nat-purple/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-nat-purple focus:ring-offset-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            Começar agora
          </motion.a>
        </div>
      </div>

      {/* Coluna direita: vídeo dos mascotes (loop, sem som) */}
      <div className="relative flex min-h-[40vh] items-center justify-center lg:min-h-[85vh] lg:justify-end lg:pr-0 lg:pl-4 xl:pl-8">
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
