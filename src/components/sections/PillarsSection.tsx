import { useRef, useState, useEffect } from 'react'
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
  title: string // Nome do serviço (ex: Marketing) — exibido na parte colorida
  mascotName: string // Nome do mascote — exibido na parte esquerda
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

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const mascotRef = useRef<HTMLDivElement>(null)
  const mascotImageRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(-1)
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

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=125%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
            // Cada pilar = 25% do scroll (mesma distância para todos).
            let idx: number
            if (p >= 0.75) idx = 3
            else if (p >= 0.5) idx = 2
            else if (p >= 0.25) idx = 1
            else idx = 0
            setActiveIndex(idx)
          },
        })
      })
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion] },
  )

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return
    const isFirst = prevIndexRef.current === -1
    prevIndexRef.current = activeIndex

    const pillar = pillars[activeIndex]

    if (leftColRef.current) {
      gsap.set(leftColRef.current, { backgroundColor: pillar.bgColor })
    }

    if (isFirst) return

    if (mascotRef.current) {
      gsap.fromTo(
        mascotRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      )
    }

    if (mascotImageRef.current) {
      gsap.fromTo(
        mascotImageRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' },
      )
    }

    if (textRef.current) {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
      )
    }

    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current.children,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.4)',
        },
      )
    }
  }, [activeIndex])

  const activePillar = pillars[activeIndex]

  return (
    <section ref={sectionRef} id="ecossistema">
      {/* Desktop — pinned bento box */}
      <div className="hidden lg:flex h-screen flex-col px-6 py-6">
        <div className="max-w-[100rem] w-full mx-auto flex-1 flex flex-col min-h-0">
          <div className="shrink-0 text-center mb-8 pt-20 pb-2">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-3">
              Pilares Napse
            </p>
            <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900">
              Do consultório ao caixa — um ecossistema pensado para médicos
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base text-neutral-600">
              Cada frente da sua operação ganha clareza, automação e acompanhamento humano para evoluir sem travar a rotina da equipe.
            </p>
          </div>

          <div className="flex-1 min-h-0 rounded-3xl overflow-hidden grid grid-cols-[2fr_3fr] shadow-xl">
          {/* Coluna esquerda (40%) — fundo neutro, título + mascote */}
          <div className="bg-[#F5F5F5] flex flex-col items-center overflow-hidden p-6 pt-10">
            <h3
              ref={mascotRef}
              className="text-3xl font-bold tracking-tight shrink-0"
              style={{ color: activePillar.bgColor }}
            >
              {activePillar.mascotName}
            </h3>

            <div
              ref={mascotImageRef}
              className="flex-1 min-h-0 flex items-center justify-center overflow-hidden"
            >
              {activePillar.mascotImage ? (
                <img
                  src={activePillar.mascotImage}
                  alt={`Mascote ${activePillar.title}`}
                  className="h-full object-contain drop-shadow-lg"
                  style={{ minHeight: '100%', transform: 'scale(1.6)' }}
                />
              ) : null}
            </div>

            {/* Indicador de pilares */}
            <div className="flex gap-2.5 mt-2 shrink-0 pb-4">
              {pillars.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6' : 'w-2.5 opacity-30'
                  }`}
                  style={{ backgroundColor: i === activeIndex ? activePillar.bgColor : '#999' }}
                />
              ))}
            </div>
          </div>

          {/* Coluna direita (60%) — fundo colorido, texto + cards */}
          <div
            ref={leftColRef}
            className="relative flex flex-col justify-start pt-16 p-12"
            style={{ backgroundColor: pillars[0].bgColor }}
          >
            <div
              className="flex items-center justify-center rounded-full bg-white/15"
              style={{ position: 'absolute', top: 24, right: 24, width: 56, height: 56, minWidth: 56, minHeight: 56, zIndex: 10 }}
            >
              <activePillar.heroIcon
                className="text-white"
                size={28}
                strokeWidth={1.5}
              />
            </div>
            <div ref={textRef} className="mb-8">
              <h3 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-10">
                {activePillar.title}
              </h3>
              <h3 className="text-3xl font-semibold text-white mb-3">
                {activePillar.subtitle}
              </h3>
              <p className="text-lg text-white/80 leading-relaxed max-w-lg">
                {activePillar.description}
              </p>
            </div>

            <div
              ref={featuresRef}
              className="grid grid-cols-2 gap-3 max-w-lg"
            >
              {activePillar.features.map((f) => (
                <div
                  key={`${activePillar.id}-${f.label}`}
                  className="rounded-xl bg-white/15 backdrop-blur-sm p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center shrink-0">
                    <f.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white">
                    {f.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
        </div>
      </div>

      {/* Mobile — cards empilhados */}
      <div className="lg:hidden px-4 py-16">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-2">
            Pilares Napse
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900">
            Do consultório ao caixa — um ecossistema pensado para médicos
          </h2>
        </div>

        <div className="space-y-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <div
                className="p-5 text-white"
                style={{ backgroundColor: pillar.bgColor }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <pillar.heroIcon className="w-7 h-7" />
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed mb-4">
                  {pillar.subtitle} — {pillar.description}
                </p>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {pillar.features.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-xl bg-white/20 p-2.5 flex flex-col items-center gap-1"
                    >
                      <f.icon className="w-4 h-4" />
                      <span className="text-xs font-medium leading-tight text-center">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {pillar.mascotImage && (
                <div className="bg-[#F5F5F5] flex items-center justify-center py-4">
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
