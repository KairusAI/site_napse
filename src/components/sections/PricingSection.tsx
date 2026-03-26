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

function BillingToggle({
  billing,
  onChange,
}: {
  billing: BillingPeriod
  onChange: (value: BillingPeriod) => void
}) {
  const isYearly = billing === 'yearly'

  return (
    <div className="inline-flex flex-col items-center gap-3 rounded-3xl border border-neutral-200 bg-white px-4 py-3 shadow-sm sm:flex-row sm:gap-5 sm:rounded-full sm:px-3.5 sm:py-2.5">
      <div className="flex items-center gap-3 sm:gap-5">
        <span className="text-sm sm:text-base font-semibold text-neutral-500">Cobrança</span>
        <div
          role="group"
          aria-label="Período de cobrança"
          className="relative inline-flex items-center rounded-full bg-neutral-100/80 px-2 py-2 text-sm font-medium"
        >
          <motion.div
            className="absolute top-0.5 bottom-0.5 left-0 w-1/2 rounded-full bg-brand-gradient shadow-brand"
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
      <span className="text-xs sm:text-sm font-semibold text-indigo-600 bg-indigo-50/90 border border-indigo-100 rounded-full px-3 py-1">
        2 meses grátis no anual
      </span>
    </div>
  )
}

function CheckBadge() {
  return (
    <div className="relative inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-300 to-indigo-500 shadow-[0_10px_24px_rgba(99,102,241,0.35)]">
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-white/85 to-blue-50/70" />
      <Check className="relative z-10 h-3.5 w-3.5 text-indigo-700" strokeWidth={2.4} />
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
      className="bg-white px-4 py-16 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl lg:max-w-6xl">
        <motion.div
          className="mb-12 text-center space-y-4"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker text-nat-blue mb-1">
            Planos NAPSE
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Planos para entender o melhor encaixe da sua operação.
          </h2>
          <p className="mx-auto max-w-2xl text-sm sm:text-base text-neutral-600">
            Use os planos como referência inicial. Nosso especialista entende o momento da sua clínica e indica o caminho mais aderente para a sua equipe.
          </p>
          <div className="mt-6">
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
                  className={`relative flex h-full flex-col rounded-3xl border bg-white px-6 py-7 shadow-sm sm:px-8 sm:py-9 ${
                    isHighlight ? 'border-nat-blue/50' : 'border-neutral-200'
                  }`}
                >
                  {isHighlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="inline-flex items-center rounded-full bg-brand-gradient px-3 py-1 text-[11px] font-semibold text-white shadow-brand">
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

                  <a
                    href="#contato"
                    className="relative mt-auto inline-flex w-full items-center justify-center rounded-2xl bg-brand-gradient px-4 py-3 text-sm font-semibold text-white shadow-brand transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-blue focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    <span className="relative z-10">
                      Entrar na lista de espera
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/18 via-transparent to-white/12 opacity-0 transition-opacity duration-200 hover:opacity-40" />
                  </a>

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
                    className="relative rounded-[1.9rem] bg-nat-blue/40 p-[1.5px]"
                  >
                    {cardInner}
                  </div>
                )
              }

              return (
                <div key={plan.id} className="relative rounded-[1.9rem] bg-white/55 p-[1.5px]">
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
        <p className="mt-8 text-center text-sm text-neutral-500">
          Nao existe checkout automatico nesta etapa. Primeiro entendemos seu contexto e indicamos o plano ideal para a sua clinica.
        </p>
      </div>
    </section>
  )
}

