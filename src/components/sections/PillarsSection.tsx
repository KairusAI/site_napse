import { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/hooks/useLenis'
import { useReducedMotionPreference } from '@/hooks/useReducedMotion'
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

gsap.registerPlugin(ScrollTrigger)

interface PillarFeature {
  icon: LucideIcon
  label: string
}

interface Pillar {
  id: string
  title: string
  mascotName: string
  agentName: string
  subtitle: string
  description: string
  accentColor: string
  heroIcon: LucideIcon
  mascotImage: string | null
  features: PillarFeature[]
}

const pillars: Pillar[] = [
  {
    id: 'marketing',
    title: 'Marketing',
    mascotName: 'Alcance',
    agentName: 'Napse Alcance',
    subtitle: 'Pacientes chegam com mais previsibilidade',
    description:
      'Conteudo educativo e comercial com IA para manter presenca digital sem sobrecarregar a equipe.',
    accentColor: 'hsl(262 83% 52%)',
    heroIcon: Megaphone,
    mascotImage: '/assets/mascote_marketing.png',
    features: [
      { icon: Megaphone, label: 'Posts com IA' },
      { icon: Target, label: 'Captacao local' },
      { icon: BarChart3, label: 'Metricas claras' },
      { icon: Share2, label: 'Redes sociais' },
    ],
  },
  {
    id: 'medico',
    title: 'Medico',
    mascotName: 'Clinico',
    agentName: 'Napse Clinico',
    subtitle: 'Consulta fluida com suporte inteligente',
    description:
      'Prontuario, prescricao e documentos em um unico fluxo para reduzir retrabalho sem perder controle clinico.',
    accentColor: 'hsl(239 84% 67%)',
    heroIcon: Stethoscope,
    mascotImage: '/assets/mascote_medico.png',
    features: [
      { icon: Stethoscope, label: 'Prontuario' },
      { icon: ClipboardList, label: 'Prescricao' },
      { icon: Calendar, label: 'Agenda clinica' },
      { icon: FileText, label: 'Documentos' },
    ],
  },
  {
    id: 'secretaria',
    title: 'Recepcao',
    mascotName: 'Atende',
    agentName: 'Napse Atende',
    subtitle: 'Menos faltas e mais organizacao diaria',
    description:
      'WhatsApp oficial, confirmacoes e agendamento em uma jornada simples para paciente e equipe.',
    accentColor: 'hsl(42 96% 50%)',
    heroIcon: Headphones,
    mascotImage: '/assets/mascote_secretaria.png',
    features: [
      { icon: Headphones, label: 'Atendimento' },
      { icon: Phone, label: 'WhatsApp API' },
      { icon: MessageSquare, label: 'Confirmacoes' },
      { icon: Clock, label: 'Rotina previsivel' },
    ],
  },
  {
    id: 'financeiro',
    title: 'Financeiro',
    mascotName: 'Fluxo',
    agentName: 'Napse Fluxo',
    subtitle: 'Controle economico sem planilhas soltas',
    description:
      'Tabela de precos, producao e relatorios para apoiar decisoes com base no que realmente acontece na clinica.',
    accentColor: 'hsl(142 76% 36%)',
    heroIcon: DollarSign,
    mascotImage: '/assets/mascote_financeiro.png',
    features: [
      { icon: DollarSign, label: 'Tabela de precos' },
      { icon: Receipt, label: 'Procedimentos' },
      { icon: TrendingUp, label: 'Relatorios' },
      { icon: PieChart, label: 'Ocupacao' },
    ],
  },
]

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressFillRef = useRef<HTMLDivElement>(null)
  const stageTitleRef = useRef<HTMLHeadingElement>(null)
  const stageAgentRef = useRef<HTMLParagraphElement>(null)
  const stageSubtitleRef = useRef<HTMLParagraphElement>(null)
  const stageDescriptionRef = useRef<HTMLParagraphElement>(null)
  const stageFeaturesRef = useRef<HTMLDivElement>(null)
  const stageImageRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const activeIndexRef = useRef(0)
  const previousIndexRef = useRef(0)
  const prefersReducedMotion = useReducedMotionPreference()

  useLenis(() => {
    ScrollTrigger.update()
  })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        if (prefersReducedMotion) {
          return undefined
        }

        if (progressFillRef.current) {
          gsap.set(progressFillRef.current, { scaleY: 0, transformOrigin: 'top center' })
        }

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=320%',
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (progressFillRef.current) {
              gsap.set(progressFillRef.current, { scaleY: self.progress })
            }

            const nextIndex = Math.min(
              pillars.length - 1,
              Math.floor(self.progress * pillars.length),
            )

            if (nextIndex !== activeIndexRef.current) {
              activeIndexRef.current = nextIndex
              setActiveIndex(nextIndex)
            }
          },
        })

        return () => {
          trigger.kill()
        }
      })

      return () => {
        mm.revert()
      }
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  )

  useEffect(() => {
    if (prefersReducedMotion) {
      previousIndexRef.current = activeIndex
      return
    }

    if (previousIndexRef.current === activeIndex) {
      return
    }

    const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } })

    const textNodes = [
      stageTitleRef.current,
      stageAgentRef.current,
      stageSubtitleRef.current,
      stageDescriptionRef.current,
    ].filter(Boolean)

    if (textNodes.length > 0) {
      timeline.fromTo(
        textNodes,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.42, stagger: 0.06 },
      )
    }

    if (stageFeaturesRef.current?.children.length) {
      timeline.fromTo(
        stageFeaturesRef.current.children,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.28, stagger: 0.05 },
        '-=0.2',
      )
    }

    if (stageImageRef.current) {
      timeline.fromTo(
        stageImageRef.current,
        { opacity: 0, y: 24, scale: 0.94 },
        { opacity: 1, y: 0, scale: 1, duration: 0.46, ease: 'power3.out' },
        '-=0.2',
      )
    }

    previousIndexRef.current = activeIndex

    return () => {
      timeline.kill()
    }
  }, [activeIndex, prefersReducedMotion])

  const activePillar = pillars[activeIndex]

  return (
    <section ref={sectionRef} id="ecossistema" className="bg-white">
      <div className="hidden h-screen px-6 py-7 lg:block">
        <div className="mx-auto flex h-full max-w-7xl flex-col">
          <div className="mb-6 text-center">
            <p className="section-kicker text-nat-blue">Roadmap de agentes</p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight text-neutral-900 lg:text-[3rem]">
              Acompanhe cada mascote guiando a operacao da sua clinica
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-neutral-600">
              Entenda o que cada agente é responsável por fazer na sua clinica, todo dia, sem sobrecarregar a equipe.
            </p>
          </div>

          <div className="grid min-h-0 flex-1 grid-cols-[1.05fr_0.95fr] gap-8">
            <article className="flex min-h-0 flex-col rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">

              <div className="mt-6">
                <h3
                  ref={stageTitleRef}
                  className="text-4xl font-bold tracking-tight text-neutral-900"
                >
                  {activePillar.title}
                </h3>
                <p
                  ref={stageAgentRef}
                  className="mt-2 text-sm font-semibold uppercase tracking-[0.14em]"
                  style={{ color: activePillar.accentColor }}
                >
                  {activePillar.agentName}
                </p>
                <p ref={stageSubtitleRef} className="mt-4 text-2xl font-semibold text-neutral-900">
                  {activePillar.subtitle}
                </p>
                <p
                  ref={stageDescriptionRef}
                  className="mt-3 max-w-xl text-base leading-relaxed text-neutral-600"
                >
                  {activePillar.description}
                </p>
              </div>

              <div
                ref={stageFeaturesRef}
                className="mt-6 grid max-w-xl grid-cols-2 gap-3"
              >
                {activePillar.features.map((feature) => (
                  <div
                    key={`${activePillar.id}-${feature.label}`}
                    className="flex items-center gap-3 rounded-2xl border border-neutral-200 bg-white p-3"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100">
                      <feature.icon
                        className="h-4 w-4"
                        style={{ color: activePillar.accentColor }}
                      />
                    </div>
                    <span className="text-sm font-medium text-neutral-700">{feature.label}</span>
                  </div>
                ))}
              </div>

              <div
                ref={stageImageRef}
                className="mt-auto flex min-h-0 items-end justify-center"
              >
                {activePillar.mascotImage ? (
                  <img
                    src={activePillar.mascotImage}
                    alt={`Mascote ${activePillar.mascotName}`}
                    className="max-h-[340px] w-auto object-contain drop-shadow-lg"
                  />
                ) : null}
              </div>
            </article>

            <aside className="relative rounded-3xl border border-neutral-200 bg-white p-8 shadow-sm">
              <div className="absolute bottom-8 left-[2rem] top-10 w-px bg-neutral-200" aria-hidden />
              <div
                ref={progressFillRef}
                className="absolute left-[2rem] top-10 h-[calc(100%-4.5rem)] w-px origin-top bg-neutral-400"
                aria-hidden
              />

              <div className="space-y-5">
                {pillars.map((pillar, index) => {
                  const isActive = index === activeIndex
                  const isVisited = index < activeIndex

                  return (
                    <div
                      key={pillar.id}
                      data-roadmap-step
                      className={`relative ml-6 rounded-2xl border p-4 transition-all duration-300 ${
                        isActive
                          ? 'bg-white shadow-sm'
                          : isVisited
                            ? 'bg-neutral-50'
                            : 'bg-white'
                      }`}
                      style={{
                        borderColor: isActive ? pillar.accentColor : '#e5e7eb',
                      }}
                    >
                      <div
                        className="absolute -left-[1.95rem] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 bg-white text-[11px] font-semibold"
                        style={{
                          borderColor: isActive || isVisited ? pillar.accentColor : '#d4d4d8',
                          color: isActive || isVisited ? pillar.accentColor : '#6b7280',
                        }}
                        aria-hidden
                      >
                        {index + 1}
                      </div>

                      <div className="flex items-center gap-3">
                        <div
                          className="flex h-9 w-9 items-center justify-center rounded-xl bg-neutral-100"
                          style={{ color: pillar.accentColor }}
                        >
                          <pillar.heroIcon className="h-5 w-5" strokeWidth={1.8} />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-neutral-900">
                            {pillar.mascotName}
                          </h3>
                        </div>
                      </div>

                      <p className="mt-3 text-sm font-medium text-neutral-800">{pillar.agentName}</p>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-600">{pillar.subtitle}</p>
                    </div>
                  )
                })}
              </div>
            </aside>
          </div>
        </div>
      </div>

      <div className="px-4 py-16 lg:hidden">
        <div className="text-center">
          <p className="section-kicker text-nat-blue">Roadmap de agentes</p>
          <h2 className="mt-3 text-2xl font-semibold text-neutral-900">
            Entenda o que cada agente é responsável por fazer na sua clinica
          </h2>
        </div>

        <div className="relative mt-10 space-y-5 pl-6">
          <div className="absolute bottom-0 left-2 top-0 w-px bg-neutral-200" aria-hidden />

          {pillars.map((pillar, index) => (
            <article
              key={pillar.id}
              className="relative rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div
                className="absolute -left-7 top-5 flex h-5 w-5 items-center justify-center rounded-full border-2 bg-white text-[10px] font-semibold"
                style={{ borderColor: pillar.accentColor, color: pillar.accentColor }}
                aria-hidden
              >
                {index + 1}
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-100"
                  style={{ color: pillar.accentColor }}
                >
                  <pillar.heroIcon className="h-5 w-5" strokeWidth={1.8} />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-neutral-900">{pillar.title}</h3>
                  <p className="text-xs font-medium uppercase tracking-[0.14em] text-neutral-500">
                    {pillar.agentName}
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm font-medium text-neutral-800">{pillar.subtitle}</p>
              <p className="mt-1 text-sm leading-relaxed text-neutral-600">{pillar.description}</p>

              {pillar.mascotImage ? (
                <div className="mt-4 rounded-2xl border border-neutral-200 bg-white p-2">
                  <img
                    src={pillar.mascotImage}
                    alt={`Mascote ${pillar.mascotName}`}
                    className="mx-auto h-40 w-auto object-contain"
                  />
                </div>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
