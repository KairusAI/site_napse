import { useRef, useState, useLayoutEffect, useCallback } from 'react'
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
    mascotName: 'Megafone',
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
    mascotName: 'Doutor',
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
    mascotName: 'Recepcionista',
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
    mascotName: 'Contador',
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

function DesktopPillarSlide({
  pillar,
  pillarIndex,
  activeIndex,
  onSelectPillar,
}: {
  pillar: Pillar
  pillarIndex: number
  activeIndex: number
  onSelectPillar: (index: number) => void
}) {
  const HeroIcon = pillar.heroIcon
  const activeColor = pillars[activeIndex]?.bgColor ?? pillar.bgColor

  return (
    <div
      className="grid h-full min-h-full shrink-0 snap-start snap-always grid-cols-[2fr_3fr]"
      data-pillar-index={pillarIndex}
    >
      <div className="flex flex-col items-center overflow-hidden bg-[#F5F5F5] p-6 pt-10">
        <h3
          className="shrink-0 text-3xl font-bold tracking-tight"
          style={{ color: pillar.bgColor }}
        >
          {pillar.mascotName}
        </h3>

        <div className="flex min-h-0 flex-1 items-center justify-center overflow-hidden">
          {pillar.mascotImage ? (
            <img
              src={pillar.mascotImage}
              alt={`Mascote ${pillar.title}`}
              className="h-full object-contain drop-shadow-lg"
              style={{ minHeight: '100%', transform: 'scale(1.6)' }}
            />
          ) : null}
        </div>

        <div className="mt-2 flex shrink-0 items-center justify-center gap-2.5 pb-4">
          {pillars.map((p, i) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelectPillar(i)}
              aria-label={`Ir para ${p.title}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple focus-visible:ring-offset-2 ${
                i === activeIndex ? 'w-6' : 'w-2.5 opacity-30 hover:opacity-50'
              }`}
              style={{ backgroundColor: i === activeIndex ? activeColor : '#999' }}
            />
          ))}
        </div>
      </div>

      <div
        className="relative flex flex-col justify-start p-12 pt-16"
        style={{ backgroundColor: pillar.bgColor }}
      >
        <div
          className="flex items-center justify-center rounded-full bg-white/15"
          style={{
            position: 'absolute',
            top: 24,
            right: 24,
            width: 56,
            height: 56,
            minWidth: 56,
            minHeight: 56,
            zIndex: 10,
          }}
        >
          <HeroIcon className="text-white" size={28} strokeWidth={1.5} />
        </div>
        <div className="mb-8">
          <h3 className="mb-10 text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {pillar.title}
          </h3>
          <h3 className="mb-3 text-3xl font-semibold text-white">{pillar.subtitle}</h3>
          <p className="max-w-lg text-lg leading-relaxed text-white/80">{pillar.description}</p>
        </div>

        <div className="grid max-w-lg grid-cols-2 gap-3">
          {pillar.features.map((f) => (
            <div
              key={`${pillar.id}-${f.label}`}
              className="flex items-center gap-3 rounded-xl bg-white/15 p-4 backdrop-blur-sm"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/20">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <span className="text-sm font-medium text-white">{f.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const bentoScrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollToPillarIndex = useCallback((index: number) => {
    const el = bentoScrollRef.current
    if (!el || index < 0 || index >= pillars.length) return
    const h = el.clientHeight
    if (h <= 0) return
    el.scrollTo({ top: index * h, behavior: 'smooth' })
  }, [])

  useLayoutEffect(() => {
    const root = bentoScrollRef.current
    if (!root || root.children.length === 0) return

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting && e.intersectionRatio >= 0.45)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!visible?.target) return
        const i = Number((visible.target as HTMLElement).dataset.pillarIndex)
        if (!Number.isNaN(i)) setActiveIndex(i)
      },
      { root, rootMargin: '0px', threshold: [0.45, 0.5, 0.55, 0.65, 0.8, 1] },
    )

    Array.from(root.children).forEach((ch) => io.observe(ch))
    return () => io.disconnect()
  }, [])

  const activePillar = pillars[activeIndex]

  return (
    <section ref={sectionRef} id="ecossistema" className="scroll-mt-20">
      {/* Desktop — scroll da troca de pilares só dentro do bento */}
      <div className="hidden lg:block px-6 py-16">
        <div className="mx-auto flex w-full max-w-[100rem] flex-col">
          <div className="mb-8 shrink-0 pb-2 pt-20 text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple">
              Pilares Napse
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-neutral-900 sm:text-5xl">
              Do consultório ao caixa — um ecossistema pensado para médicos
            </h2>
          </div>

          <div
            className="mx-auto mb-5 flex max-w-4xl shrink-0 flex-wrap justify-center gap-2 px-2"
            role="tablist"
            aria-label="Pilares do ecossistema"
          >
            {pillars.map((pillar, i) => (
              <button
                key={pillar.id}
                type="button"
                role="tab"
                aria-selected={i === activeIndex}
                id={`ecossistema-tab-${pillar.id}`}
                onClick={() => scrollToPillarIndex(i)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple focus-visible:ring-offset-2 ${
                  i === activeIndex
                    ? 'text-white shadow-md'
                    : 'bg-neutral-200/85 text-neutral-800 hover:bg-neutral-300/90'
                }`}
                style={i === activeIndex ? { backgroundColor: pillar.bgColor } : undefined}
              >
                {pillar.title}
              </button>
            ))}
          </div>

          <div
            ref={bentoScrollRef}
            data-lenis-prevent
            className="scrollbar-hide h-[min(36rem,calc(100dvh-12rem))] snap-y snap-mandatory overflow-y-auto overflow-x-hidden rounded-3xl shadow-xl scroll-smooth"
            role="tabpanel"
            aria-labelledby={`ecossistema-tab-${activePillar.id}`}
          >
            {pillars.map((pillar, i) => (
              <DesktopPillarSlide
                key={pillar.id}
                pillar={pillar}
                pillarIndex={i}
                activeIndex={activeIndex}
                onSelectPillar={scrollToPillarIndex}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile — cards empilhados */}
      <div className="px-4 py-16 lg:hidden">
        <div className="mb-10 text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple">
            Pilares Napse
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Do consultório ao caixa — um ecossistema pensado para médicos
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
                <div className="grid gap-2 grid-cols-4">
                  {pillar.features.map((f) => (
                    <div
                      key={f.label}
                      className="flex flex-col items-center gap-1 rounded-xl bg-white/20 p-2.5"
                    >
                      <f.icon className="h-4 w-4" />
                      <span className="text-center text-[10px] font-medium leading-tight">
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
