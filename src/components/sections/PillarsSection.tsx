import { useRef, useState, useEffect } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLenis } from '@/hooks/useLenis'
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
    subtitle: 'Atraia mais pacientes',
    description:
      'Gestão completa de campanhas, redes sociais e captação de leads. Transforme visitantes em pacientes fiéis.',
    bgColor: 'hsl(262, 83%, 52%)',
    bgLight: 'hsl(262, 60%, 92%)',
    heroIcon: Megaphone,
    mascotImage: null,
    features: [
      { icon: Megaphone, label: 'Campanhas' },
      { icon: Target, label: 'Captação' },
      { icon: BarChart3, label: 'Métricas' },
      { icon: Share2, label: 'Redes Sociais' },
    ],
  },
  {
    id: 'medico',
    title: 'Médico',
    subtitle: 'Foque no paciente',
    description:
      'Prontuário eletrônico inteligente, prescrição digital e telemedicina integrada. Tudo para otimizar seu atendimento.',
    bgColor: 'hsl(217, 91%, 50%)',
    bgLight: 'hsl(217, 70%, 92%)',
    heroIcon: Stethoscope,
    mascotImage: null,
    features: [
      { icon: Stethoscope, label: 'Prontuário' },
      { icon: ClipboardList, label: 'Prescrição' },
      { icon: Calendar, label: 'Agenda' },
      { icon: FileText, label: 'Laudos' },
    ],
  },
  {
    id: 'secretaria',
    title: 'Secretaria',
    subtitle: 'Recepção eficiente',
    description:
      'Agendamento automatizado, confirmação por WhatsApp e gestão de filas. Sua recepção nunca mais será a mesma.',
    bgColor: 'hsl(42, 96%, 50%)',
    bgLight: 'hsl(42, 90%, 92%)',
    heroIcon: Headphones,
    mascotImage: null,
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
    subtitle: 'Controle total',
    description:
      'Faturamento TISS, fluxo de caixa, relatórios gerenciais e glosas automatizadas. Sua saúde financeira em dia.',
    bgColor: 'hsl(142, 76%, 36%)',
    bgLight: 'hsl(142, 45%, 92%)',
    heroIcon: DollarSign,
    mascotImage: null,
    features: [
      { icon: DollarSign, label: 'Faturamento' },
      { icon: Receipt, label: 'TISS' },
      { icon: TrendingUp, label: 'Relatórios' },
      { icon: PieChart, label: 'Fluxo de Caixa' },
    ],
  },
]

export function PillarsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const leftColRef = useRef<HTMLDivElement>(null)
  const mascotRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const prevIndexRef = useRef(-1)

  useLenis(() => {
    ScrollTrigger.update()
  })

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 1024px)', () => {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const p = self.progress
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
    { scope: sectionRef },
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
        <div className="shrink-0 text-center mb-6 pt-16">
          <h2 className="text-3xl font-semibold text-neutral-900">
            Nosso Ecossistema
          </h2>
          <p className="mt-2 text-neutral-500">
            Quatro pilares, uma plataforma integrada.
          </p>
        </div>

        <div className="flex-1 min-h-0 rounded-3xl overflow-hidden grid grid-cols-[2fr_3fr] shadow-xl">
          {/* Coluna esquerda (40%) — fundo neutro, título + mascote */}
          <div className="bg-[#F5F5F5] flex flex-col items-center justify-center p-10">
            <div ref={mascotRef} className="flex flex-col items-center gap-6">
              <h3
                className="text-3xl font-bold tracking-tight"
                style={{ color: activePillar.bgColor }}
              >
                {activePillar.title}
              </h3>

              {activePillar.mascotImage ? (
                <img
                  src={activePillar.mascotImage}
                  alt={`Mascote ${activePillar.title}`}
                  className="w-56 h-56 object-contain drop-shadow-lg"
                />
              ) : (
                <div
                  className="w-48 h-48 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: activePillar.bgLight }}
                >
                  <activePillar.heroIcon
                    className="w-24 h-24"
                    style={{ color: activePillar.bgColor }}
                    strokeWidth={1.5}
                  />
                </div>
              )}
            </div>

            {/* Indicador de pilares */}
            <div className="flex gap-2.5 mt-8">
              {pillars.map((p, i) => (
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
            className="flex flex-col justify-center p-12"
            style={{ backgroundColor: pillars[0].bgColor }}
          >
            <div ref={textRef} className="mb-8">
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

      {/* Mobile — cards empilhados */}
      <div className="lg:hidden px-4 py-16">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-semibold text-neutral-900">
            Nosso Ecossistema
          </h2>
          <p className="mt-2 text-neutral-500">
            Quatro pilares, uma plataforma integrada.
          </p>
        </div>

        <div className="space-y-6">
          {pillars.map((pillar) => (
            <div
              key={pillar.id}
              className="rounded-2xl overflow-hidden shadow-md"
            >
              <div
                className="p-6 text-white"
                style={{ backgroundColor: pillar.bgColor }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <pillar.heroIcon className="w-8 h-8" />
                  <h3 className="text-xl font-semibold">{pillar.title}</h3>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {pillar.features.map((f) => (
                    <div
                      key={f.label}
                      className="rounded-xl bg-white/20 p-3 flex flex-col items-center gap-1"
                    >
                      <f.icon className="w-5 h-5" />
                      <span className="text-xs font-medium">{f.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-[#F5F5F5] p-6">
                <h4 className="text-lg font-semibold text-neutral-900 mb-2">
                  {pillar.subtitle}
                </h4>
                <p className="text-neutral-600">{pillar.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
