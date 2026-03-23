import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, PlayCircle, ShieldCheck } from 'lucide-react'
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
  const prefersReducedMotion = useReducedMotionPreference()

  return (
    <section className="relative min-h-[85vh] overflow-hidden lg:grid lg:grid-cols-2">
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
      <div className="relative z-10 flex flex-col justify-center px-5 pt-20 pb-6 sm:px-6 sm:py-16 lg:px-12 lg:py-20 xl:px-20">
        <div className="max-w-xl ml-4 sm:ml-8 lg:ml-16 xl:ml-24">
          <motion.div
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600 shadow-sm"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-amber-500">★★★★★</span>
            <span>Usado por clínicas e consultórios</span>
          </motion.div>
          <motion.h1
            className="mt-5 text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Gestão clínica com IA em um só lugar.
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Agenda, prontuário, confirmações e rotina financeira conectados para reduzir retrabalho e dar mais clareza à operação da clínica.
          </motion.p>
          <motion.p
            className="mt-4 inline-flex max-w-max rounded-full border border-nat-blue/15 bg-nat-blue/5 px-4 py-2 text-sm font-medium text-nat-blue"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            Para clínicas que querem menos faltas e menos improviso na rotina.
          </motion.p>
          <motion.div
            className="mt-6 flex flex-wrap gap-3 text-sm text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="rounded-full border border-neutral-200 bg-white/80 px-4 py-2 shadow-sm">
              Sem planilhas soltas
            </span>
            <span className="rounded-full border border-neutral-200 bg-white/80 px-4 py-2 shadow-sm">
              Confirmações automáticas
            </span>
            <span className="rounded-full border border-neutral-200 bg-white/80 px-4 py-2 shadow-sm">
              Agenda integrada
            </span>
          </motion.div>
          <motion.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href="#contato"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-nat-purple px-7 py-4 text-base font-semibold text-white shadow-[0_4px_20px_-4px_hsl(262_83%_52%_/_0.5)] focus:outline-none focus:ring-2 focus:ring-nat-purple focus:ring-offset-2"
              whileHover={{ scale: 1.03, boxShadow: '0 12px 32px -8px hsl(262 83% 52% / 0.45)' }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative z-10">Falar com um especialista</span>
              <ArrowRight className="relative z-10 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5" />
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out" aria-hidden />
            </motion.a>
            <a
              href="#demonstracao"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white/90 px-6 py-4 text-base font-semibold text-neutral-800 shadow-sm transition-colors hover:border-nat-blue/30 hover:text-nat-blue focus:outline-none focus:ring-2 focus:ring-nat-blue/20 focus:ring-offset-2"
            >
              <PlayCircle className="h-5 w-5" strokeWidth={1.8} />
              Ver demonstração
            </a>
          </motion.div>
          <motion.div
            className="mt-4 flex flex-wrap gap-3 text-sm text-neutral-600"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/85 px-4 py-2 shadow-sm">
              <ShieldCheck className="h-4 w-4 text-nat-blue" strokeWidth={1.8} />
              Conforme LGPD
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/85 px-4 py-2 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-nat-green" strokeWidth={1.8} />
              Suporte em português
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white/85 px-4 py-2 shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-nat-green" strokeWidth={1.8} />
              Sem compromisso inicial
            </span>
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

      {/* Coluna direita: vídeo dos mascotes (loop, sem som) */}
      <div className="relative flex min-h-[25vh] sm:min-h-[40vh] items-center justify-center lg:min-h-[85vh] lg:justify-end lg:pr-6 lg:pl-4 xl:pl-8">
        <div className="relative w-full max-w-[42rem]">
          <div className="absolute inset-x-4 top-8 hidden rounded-[2rem] border border-neutral-200/80 bg-white/90 p-4 shadow-[0_24px_70px_rgba(15,23,42,0.12)] backdrop-blur-sm lg:block">
            <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
              <span className="h-3 w-3 rounded-full bg-rose-300" />
              <span className="h-3 w-3 rounded-full bg-amber-300" />
              <span className="h-3 w-3 rounded-full bg-emerald-300" />
              <p className="ml-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                Napse em operação
              </p>
            </div>
            <img
              src="/assets/imagem_integracoes.png"
              alt="Visual do sistema da NAPSE com integrações e operação clínica conectada"
              className="mt-4 w-full rounded-[1.5rem] object-cover"
            />
          </div>
          <video
            src="/assets/VideoMascote_hero.mp4"
            autoPlay={!prefersReducedMotion}
            muted
            loop={!prefersReducedMotion}
            playsInline
            controls={prefersReducedMotion}
            className="relative z-10 ml-auto h-full max-h-[85vh] w-auto max-w-[70vw] object-contain object-right lg:max-w-[24rem] xl:max-w-[26rem]"
            aria-label="Mascotes Napse: Financeiro, Secretaria, Médico e Marketing"
          />
        </div>
      </div>

      {!prefersReducedMotion ? <ScrollIndicator targetId="ecossistema" /> : null}
    </section>
  )
}
