import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Check } from 'lucide-react'

type BillingPeriod = 'monthly' | 'yearly'

type Plan = {
  id: string
  name: string
  description: string
  monthlyPrice: number
  yearlyPrice: number
  highlight?: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'start',
    name: 'Essencial',
    description: 'Para consultório solo ou clínica pequena que quer sair do papel e da planilha.',
    monthlyPrice: 297,
    yearlyPrice: 297 * 10, // 2 meses de desconto
    features: [
      'Agenda online para equipe reduzida',
      'Confirmação automática de consultas',
      'Relatórios essenciais de produção',
    ],
  },
  {
    id: 'growth',
    name: 'Crescimento',
    description: 'Para clínicas com vários médicos que precisam de visão completa.',
    monthlyPrice: 497,
    yearlyPrice: 497 * 10,
    highlight: true,
    features: [
      'Agenda por profissional e por especialidade',
      'Fluxo completo de confirmação e controle de no-show',
      'Dashboards de faturamento e ocupação',
      'Suporte prioritário NAPSE',
    ],
  },
  {
    id: 'scale',
    name: 'Escala',
    description: 'Para grupos, redes e clínicas com múltiplas unidades.',
    monthlyPrice: 897,
    yearlyPrice: 897 * 10,
    features: [
      'Múltiplas unidades e centros de custo',
      'Integrações avançadas (ERP, billing, BI)',
      'Customer Success dedicado à sua operação',
    ],
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function formatPrice(value: number) {
  return value.toLocaleString('pt-BR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
}

/** Contagem animada entre valores ao trocar mensal/anual (mesmo padrão da seção de KPIs). */
function AnimatedPlanPrice({ value, staggerIndex = 0 }: { value: number; staggerIndex?: number }) {
  const displayRef = useRef(value)
  const [display, setDisplay] = useState(value)

  useEffect(() => {
    const controls = animate(displayRef.current, value, {
      duration: 1.2,
      delay: staggerIndex * 0.06,
      ease: 'easeOut',
      onUpdate: (latest) => {
        displayRef.current = latest
        setDisplay(latest)
      },
    })
    return () => controls.stop()
  }, [value, staggerIndex])

  return (
    <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 tabular-nums">
      R$ {formatPrice(Math.round(display))}
    </span>
  )
}

function BillingToggle({
  billing,
  onChange,
}: {
  billing: BillingPeriod
  onChange: (value: BillingPeriod) => void
}) {
  const isYearly = billing === 'yearly'

  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-3 sm:gap-5 rounded-3xl sm:rounded-full bg-white/80 border border-white/90 px-4 py-3 sm:px-3.5 sm:py-2.5 shadow-[0_18px_55px_rgba(15,23,42,0.16)] backdrop-blur-xl">
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="text-sm sm:text-base font-semibold text-neutral-500">Cobrança</span>
        <div
          role="group"
          aria-label="Período de cobrança"
          className="relative inline-flex items-center rounded-full bg-neutral-100/80 px-2 py-2 text-sm font-medium"
        >
          <motion.div
            className="absolute top-0.5 bottom-0.5 left-0 w-1/2 rounded-full bg-gradient-to-r from-nat-green to-nat-green/70 shadow-[0_10px_30px_rgba(22,163,74,0.35)]"
            initial={false}
            animate={{ x: isYearly ? '100%' : '0%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          />
          <button
            type="button"
            className={`relative z-10 px-3 py-0.5 transition-colors rounded-full ${
              billing === 'monthly' ? 'text-white' : 'text-neutral-500'
            }`}
            onClick={() => onChange('monthly')}
            aria-pressed={billing === 'monthly'}
          >
            Mensal
          </button>
          <button
            type="button"
            className={`relative z-10 px-3 py-0.5 transition-colors rounded-full ${
              billing === 'yearly' ? 'text-white' : 'text-neutral-500'
            }`}
            onClick={() => onChange('yearly')}
            aria-pressed={billing === 'yearly'}
          >
            Anual
          </button>
        </div>
      </div>
      <span className="text-xs sm:text-sm font-semibold text-emerald-600 bg-emerald-50/90 border border-emerald-100 rounded-full px-3 py-1">
        2 meses grátis no anual
      </span>
    </div>
  )
}

function CheckBadge() {
  return (
    <div className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_8px_22px_rgba(16,185,129,0.4)]">
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/80 to-emerald-100/60" />
      <Check className="relative z-10 h-3.5 w-3.5 text-emerald-700" strokeWidth={2.4} />
    </div>
  )
}

export function PricingSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px 0px',
  })
  const [billing, setBilling] = useState<BillingPeriod>('monthly')

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50 px-4 py-16 sm:py-24 lg:px-6 lg:py-32"
    >
      {/* Glow de fundo suave */}
      <div className="pointer-events-none absolute inset-x-0 top-[-8rem] mx-auto h-[380px] max-w-4xl rounded-full bg-gradient-to-b from-nat-green/14 via-nat-green/6 to-transparent blur-3xl" />

      <div className="relative mx-auto w-full max-w-[100rem]">
        <motion.div
          className="mb-10 text-center lg:pt-20"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-green lg:mb-3">
            Planos NAPSE
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight">
            Investimento que paga em tempo e tranquilidade.
          </h2>
          <div className="mt-4 flex justify-center lg:mt-6">
            <BillingToggle billing={billing} onChange={setBilling} />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="relative"
        >
          {/* Cards de preço – grid original em 3 colunas no desktop */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8 lg:mr-auto">
            {plans.map((plan, planIndex) => {
              const price =
                billing === 'monthly'
                  ? plan.monthlyPrice
                  : plan.yearlyPrice

              const isHighlight = plan.highlight

              const cardInner = (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className={`relative flex h-full flex-col rounded-3xl bg-white/12 px-6 py-7 sm:px-8 sm:py-9 backdrop-blur-xl border ${
                    isHighlight ? 'border-white/60' : 'border-white/50'
                  } shadow-[0_18px_60px_rgba(15,23,42,0.12)]`}
                >
                  {isHighlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="inline-flex items-center rounded-full bg-gradient-to-r from-nat-green to-nat-green/70 px-3 py-1 text-[11px] font-semibold text-white shadow-[0_12px_30px_rgba(22,163,74,0.45)]">
                        Mais escolhido
                      </div>
                    </div>
                  )}

                  <div className="mb-4">
                    <h3 className="text-base sm:text-lg font-semibold text-neutral-900">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">
                      {plan.description}
                    </p>
                  </div>

                  <div className="mb-6 flex items-baseline gap-2">
                    <AnimatedPlanPrice value={price} staggerIndex={planIndex} />
                    <motion.span
                      key={billing}
                      className="text-xs sm:text-sm text-neutral-500"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      / {billing === 'monthly' ? 'mês' : 'ano'}
                    </motion.span>
                  </div>

                  <button
                    type="button"
                    className="relative mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-nat-green to-nat-green/70 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(22,163,74,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-green focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span className="relative z-10">
                      Falar com especialista
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/25 via-transparent to-white/20 opacity-0 transition-opacity duration-200 hover:opacity-40" />
                  </button>

                  <ul className="mt-6 space-y-3 text-sm text-neutral-700">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <CheckBadge />
                        <span className="pt-[2px]">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )

              if (isHighlight) {
                return (
                  <div
                    key={plan.id}
                    className="relative rounded-[1.9rem] bg-gradient-to-br from-nat-green/40 via-nat-green/20 to-nat-green/50 p-[1.5px]"
                  >
                    {cardInner}
                  </div>
                )
              }

              return (
                <div key={plan.id} className="relative rounded-[1.9rem] bg-white/40 p-[1.5px]">
                  {cardInner}
                </div>
              )
            })}
          </div>

          {/* Mascote financeiro — mobile */}
          <div className="mt-8 flex justify-center lg:hidden">
            <img
              src="/assets/imagem_preços.png"
              alt="Mascote financeiro NAPSE flutuando com balão"
              className="max-h-[220px] sm:max-h-[280px] w-auto drop-shadow-2xl select-none"
            />
          </div>

          {/* Mascote financeiro — desktop */}
          <div className="pointer-events-none hidden lg:flex absolute inset-y-4 right-[-620px] items-center justify-center">
            <img
              src="/assets/imagem_preços.png"
              alt="Mascote financeiro NAPSE flutuando com balão"
              className="max-h-[440px] lg:max-h-[520px] w-auto drop-shadow-2xl select-none"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

