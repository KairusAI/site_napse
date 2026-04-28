import { useRef, useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Megaphone,
  Target,
  BarChart3,
  Share2,
  Stethoscope,
  ClipboardList,
  Calendar,
  FileText,
  Headphones,
  Phone,
  MessageSquare,
  Clock,
  DollarSign,
  Receipt,
  TrendingUp,
  PieChart,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface PillarFeature {
  icon: LucideIcon
  label: string
}

interface Pillar {
  id: string
  title: string
  mascotName: string
  subtitle: string
  description: string
  bgColor: string
  bgLight: string
  heroIcon: LucideIcon
  mascotImage: string | null
  features: PillarFeature[]
}

const pillars: Pillar[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    mascotName: 'Pedro',
    subtitle: 'Pacientes que chegam sozinhos',
    description:
      'Legendas e posts educativos gerados por IA, no tom da sua especialidade. Você aprova antes de publicar. Menos tempo em redes, mais consultas agendadas.',
    bgColor: 'hsl(262, 83%, 52%)',
    bgLight: 'hsl(262, 60%, 92%)',
    heroIcon: Megaphone,
    mascotImage: '/assets/mascote_marketing.png',
    features: [
      { icon: Megaphone, label: 'Posts com IA' },
      { icon: Target, label: 'Captação' },
      { icon: BarChart3, label: 'Métricas' },
      { icon: Share2, label: 'Redes Sociais' },
    ],
  },
  {
    id: 'medico',
    title: 'Médico',
    mascotName: 'Eric',
    subtitle: 'Você no comando, a IA no apoio',
    description:
      'Prontuário eletrônico, prescrição digital (Memed) e assistente por chat. A IA sugere e executa — você confirma. Nada sai sem sua aprovação.',
    bgColor: 'hsl(217, 91%, 50%)',
    bgLight: 'hsl(217, 70%, 92%)',
    heroIcon: Stethoscope,
    mascotImage: '/assets/mascote_medico.png',
    features: [
      { icon: Stethoscope, label: 'Prontuário' },
      { icon: ClipboardList, label: 'Prescrição' },
      { icon: Calendar, label: 'Agenda' },
      { icon: FileText, label: 'Documentos' },
    ],
  },
  {
    id: 'secretaria',
    title: 'Secretaria',
    mascotName: 'Terezinha',
    subtitle: 'Menos faltas, mais cadeiras cheias',
    description:
      'WhatsApp integrado (API oficial), link de agendamento para o paciente escolher horário sozinho e confirmações por mensagem. A recepção roda sem você precisar lembrar.',
    bgColor: 'hsl(42, 96%, 50%)',
    bgLight: 'hsl(42, 90%, 92%)',
    heroIcon: Headphones,
    mascotImage: '/assets/mascote_secretaria.png',
    features: [
      { icon: Headphones, label: 'Atendimento' },
      { icon: Phone, label: 'WhatsApp' },
      { icon: MessageSquare, label: 'Confirmação' },
      { icon: Clock, label: 'Agenda' },
    ],
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    mascotName: 'Ricardo',
    subtitle: 'O que entra, o que sai — na palma da mão',
    description:
      'Tabela de preços e procedimentos, relatórios de produção e ocupação. Visão clara da saúde financeira da clínica. Menos planilhas, mais decisão.',
    bgColor: 'hsl(142, 76%, 36%)',
    bgLight: 'hsl(142, 45%, 92%)',
    heroIcon: DollarSign,
    mascotImage: '/assets/mascote_financeiro.png',
    features: [
      { icon: DollarSign, label: 'Tabela de Preços' },
      { icon: Receipt, label: 'Procedimentos' },
      { icon: TrendingUp, label: 'Relatórios' },
      { icon: PieChart, label: 'Produção e Ocupação' },
    ],
  },
]

/** Duração de cada tab antes de avançar automaticamente (desktop). */
const TAB_AUTO_ADVANCE_MS = 7000

/** Card único: esquerda clara + mascote | direita cor do pilar + texto + 4 “botões” de recurso */
function DesktopServiceCard({ pillar }: { pillar: Pillar }) {
  const HeroIcon = pillar.heroIcon
  const minH = 'min-h-[min(52dvh,26rem)]'

  return (
    <div className={`overflow-hidden rounded-3xl shadow-xl ring-1 ring-black/[0.06] ${minH}`}>
      <div className={`grid h-full ${minH} grid-cols-[2fr_3fr]`}>
        {/* Lado esquerdo do card — fundo claro + mascote */}
        <div className="flex flex-col items-center overflow-hidden bg-[#F5F5F5] p-5 pt-7">
          <h3
            className="shrink-0 text-2xl font-bold tracking-tight sm:text-3xl"
            style={{ color: pillar.bgColor }}
          >
            {pillar.mascotName}
          </h3>

          <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden py-2">
            {pillar.mascotImage ? (
              <img
                src={pillar.mascotImage}
                alt={`Mascote ${pillar.title}`}
                className="max-h-full w-auto object-contain drop-shadow-lg"
                style={{ transform: 'scale(1.35)' }}
              />
            ) : null}
          </div>
        </div>

        {/* Lado direito do card — cor vibrante + conteúdo */}
        <div
          className="relative flex flex-col justify-start p-6 pt-10 sm:p-8 sm:pt-11"
          style={{ backgroundColor: pillar.bgColor }}
        >
          <div
            className="flex items-center justify-center rounded-full bg-white/15"
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              width: 48,
              height: 48,
              minWidth: 48,
              minHeight: 48,
              zIndex: 10,
            }}
          >
            <HeroIcon className="text-white" size={24} strokeWidth={1.5} />
          </div>

          <div className="mb-5">
            <h3 className="mb-4 text-2xl font-bold tracking-tight text-white sm:mb-5 sm:text-3xl lg:text-4xl">
              {pillar.title}
            </h3>
            <p className="mb-2 text-lg font-semibold text-white sm:text-xl">{pillar.subtitle}</p>
            <p className="max-w-lg text-sm leading-relaxed text-white/85 sm:text-base">
              {pillar.description}
            </p>
          </div>

          <div className="grid max-w-lg grid-cols-2 gap-2 sm:gap-2.5">
            {pillar.features.map((f) => (
              <div
                key={`${pillar.id}-${f.label}`}
                className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/15 p-3 shadow-sm backdrop-blur-sm transition-[transform,box-shadow] duration-200 hover:bg-white/20 hover:shadow-md sm:gap-3 sm:p-3.5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/20 sm:h-10 sm:w-10">
                  <f.icon className="h-4 w-4 text-white sm:h-5 sm:w-5" />
                </div>
                <span className="text-xs font-medium text-white sm:text-sm">{f.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [tabProgress, setTabProgress] = useState(0)
  const navPausedRef = useRef(false)
  const timerRef = useRef({
    start: 0,
    pauseAccum: 0,
    pauseStart: null as number | null,
    raf: 0,
  })

  const activePillar = pillars[activeIndex]

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setTabProgress(0)
      return
    }

    const t = timerRef.current
    t.start = performance.now()
    t.pauseAccum = 0
    t.pauseStart = null
    setTabProgress(0)

    const tick = (now: number) => {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setTabProgress(0)
        return
      }

      if (navPausedRef.current) {
        if (t.pauseStart === null) t.pauseStart = now
        t.raf = requestAnimationFrame(tick)
        return
      }
      if (t.pauseStart !== null) {
        t.pauseAccum += now - t.pauseStart
        t.pauseStart = null
      }

      const elapsed = now - t.start - t.pauseAccum
      const p = Math.min(1, elapsed / TAB_AUTO_ADVANCE_MS)
      setTabProgress(p)

      if (p >= 1) {
        setActiveIndex((i) => (i + 1) % pillars.length)
        return
      }
      t.raf = requestAnimationFrame(tick)
    }

    t.raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(t.raf)
  }, [activeIndex])

  return (
    <section
      ref={sectionRef}
      id="ecossistema"
      className="section-y relative scroll-mt-20 before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-neutral-200/70 before:to-transparent"
    >
      {/* Desktop — 30% tabs | 70% card */}
      <div className="section-shell hidden lg:block">
        <div className="mb-10 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple">
              Pilares Napse
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Software médico completo: Napse, do consultório ao financeiro
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600">
              Selecione um serviço na lista para ver os detalhes.
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[3fr_7fr] lg:gap-10 xl:gap-12">
            {/* Coluna esquerda ~30% — lista vertical (tabs) */}
            <div
              className="lg:sticky lg:top-28"
              onMouseEnter={() => {
                navPausedRef.current = true
              }}
              onMouseLeave={() => {
                navPausedRef.current = false
              }}
            >
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple">
                Serviços
              </p>
              <div className="flex flex-col gap-1" role="tablist" aria-label="Serviços do ecossistema">
                {pillars.map((pillar, i) => {
                  const isActive = i === activeIndex
                  return (
                      <button
                        key={pillar.id}
                        type="button"
                        role="tab"
                        aria-selected={isActive}
                        aria-controls="ecossistema-tabpanel"
                        id={`ecossistema-tab-${pillar.id}`}
                        onClick={() => setActiveIndex(i)}
                        className={`relative w-full overflow-hidden rounded-xl border-2 px-4 py-4 text-left text-base font-semibold transition-[color,box-shadow] duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple focus-visible:ring-offset-2 sm:py-5 sm:text-lg ${
                          isActive
                            ? 'border-transparent text-white shadow-lg'
                            : 'border-transparent bg-neutral-100 text-neutral-700 hover:bg-neutral-200/90'
                        }`}
                        style={
                          isActive
                            ? {
                                backgroundColor: pillar.bgColor,
                                boxShadow: '0 14px 36px -10px rgba(15, 23, 42, 0.28)',
                              }
                            : undefined
                        }
                      >
                        {isActive && (
                          <span
                            className="pointer-events-none absolute inset-y-0 left-0 rounded-xl bg-gradient-to-r from-white/40 via-white/25 to-white/10"
                            style={{
                              width: `${tabProgress * 100}%`,
                              transition: 'none',
                            }}
                            aria-hidden="true"
                          />
                        )}
                        <span className="relative z-10">{pillar.title}</span>
                      </button>
                  )
                })}
              </div>
            </div>

            {/* Coluna direita ~70% — painel do serviço ativo */}
            <div
              id="ecossistema-tabpanel"
              role="tabpanel"
              aria-labelledby={`ecossistema-tab-${activePillar.id}`}
              aria-live="polite"
              className="min-w-0"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePillar.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <DesktopServiceCard pillar={activePillar} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      {/* Mobile — cards empilhados */}
      <div className="section-shell lg:hidden">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple">
            Pilares Napse
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Software médico completo: Napse, do consultório ao financeiro
          </h2>
        </div>

        <div className="space-y-6">
          {pillars.map((pillar) => (
            <div key={pillar.id} className="overflow-hidden rounded-2xl shadow-md">
              <div className="p-5 text-white" style={{ backgroundColor: pillar.bgColor }}>
                <div className="mb-3 flex items-center gap-3">
                  <pillar.heroIcon className="h-7 w-7" />
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                </div>
                <p className="mb-4 text-sm leading-relaxed text-white/80">
                  {pillar.subtitle} — {pillar.description}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pillar.features.map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/20 p-2.5"
                    >
                      <f.icon className="h-4 w-4 shrink-0" />
                      <span className="text-center text-xs font-medium leading-snug sm:text-[13px]">
                        {f.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {pillar.mascotImage && (
                <div className="flex items-center justify-center bg-[#F5F5F5] py-4">
                  <img
                    src={pillar.mascotImage}
                    alt={`Mascote ${pillar.title}`}
                    className={`w-auto object-contain drop-shadow-md ${pillar.id === 'marketing' ? 'h-44' : 'h-32'}`}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
