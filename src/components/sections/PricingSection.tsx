import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
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
    description: 'Para clínicas que estão iniciando a organização digital.',
    monthlyPrice: 297,
    yearlyPrice: 297 * 10, // 2 meses de desconto
    features: [
      'Agenda online para equipe reduzida',
      'Confirmação de consultas básica',
      'Relatórios essenciais de produção',
    ],
  },
  {
    id: 'growth',
    name: 'Crescimento',
    description: 'Ideal para clínicas em expansão e com múltiplos profissionais.',
    monthlyPrice: 497,
    yearlyPrice: 497 * 10,
    highlight: true,
    features: [
      'Agenda avançada por profissional',
      'Fluxo completo de confirmação e no-show',
      'Dashboards de faturamento e ocupação',
      'Suporte prioritário NAPSE',
    ],
  },
  {
    id: 'scale',
    name: 'Escala',
    description: 'Para grupos e redes com alto volume operacional.',
    monthlyPrice: 897,
    yearlyPrice: 897 * 10,
    features: [
      'Múltiplas unidades e centros de custo',
      'Integrações avançadas (ERP, billing, BI)',
      'Acompanhamento dedicado de Customer Success',
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

function BillingToggle({
  billing,
  onChange,
}: {
  billing: BillingPeriod
  onChange: (value: BillingPeriod) => void
}) {
  const isYearly = billing === 'yearly'

  return (
    <div className="inline-flex items-center gap-3 rounded-full bg-white/60 border border-white/80 px-1.5 py-1 shadow-[0_10px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl">
      <span className="text-xs font-medium text-neutral-500">Cobrança</span>
      <button
        type="button"
        className="relative inline-flex items-center rounded-full bg-neutral-100/60 px-1 py-1 text-xs font-medium"
        aria-label="Alternar entre mensal e anual"
      >
        <motion.div
          className="absolute top-0.5 bottom-0.5 w-1/2 rounded-full bg-gradient-to-r from-nat-purple to-nat-blue shadow-[0_10px_30px_rgba(79,70,229,0.35)]"
          initial={false}
          animate={{ x: isYearly ? '100%' : '0%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        />
        <span
          className={`relative z-10 px-3 py-0.5 transition-colors ${
            billing === 'monthly' ? 'text-white' : 'text-neutral-500'
          }`}
          onClick={() => onChange('monthly')}
        >
          Mensal
        </span>
        <span
          className={`relative z-10 px-3 py-0.5 transition-colors ${
            billing === 'yearly' ? 'text-white' : 'text-neutral-500'
          }`}
          onClick={() => onChange('yearly')}
        >
          Anual
        </span>
      </button>
      <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50/80 border border-emerald-100 rounded-full px-2 py-0.5">
        2 meses grátis no anual
      </span>
    </div>
  )
}

function CheckBadge() {
  return (
    <div className="relative inline-flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500 shadow-[0_8px_22px_rgba(16,185,129,0.4)]">
      <div className="absolute inset-[2px] rounded-full bg-gradient-to-br from-white/80 to-emerald-100/60" />
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
      className="relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50 px-4 py-24 sm:py-28 lg:py-32"
    >
      {/* Glow de fundo suave */}
      <div className="pointer-events-none absolute inset-x-0 top-[-8rem] mx-auto h-[380px] max-w-4xl rounded-full bg-gradient-to-b from-nat-purple/12 via-nat-blue/6 to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-5xl lg:max-w-6xl">
        <motion.div
          className="mb-12 text-center space-y-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-1">
            Planos NAPSE
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Planos que crescem com a sua clínica.
          </h2>
          <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Escolha a melhor opção para o seu momento atual. Você pode evoluir de plano conforme a clínica cresce.
          </p>
          <div className="mt-4">
            <BillingToggle billing={billing} onChange={setBilling} />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8"
        >
          {plans.map((plan) => {
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
                    <div className="inline-flex items-center rounded-full bg-gradient-to-r from-nat-purple to-nat-blue px-3 py-1 text-[11px] font-semibold text-white shadow-[0_12px_30px_rgba(88,28,135,0.45)]">
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
                  <span className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
                    R$ {formatPrice(price)}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-500">
                    / {billing === 'monthly' ? 'mês' : 'ano'}
                  </span>
                </div>

                <button
                  type="button"
                  className="relative mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-nat-purple to-nat-blue px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(88,28,135,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
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
                  className="relative rounded-[1.9rem] bg-gradient-to-br from-nat-purple/55 via-nat-blue/55 to-nat-purple/70 p-[1.5px]"
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
        </motion.div>
      </div>
    </section>
  )
}

