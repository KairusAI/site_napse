import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion, animate } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { getWhatsAppUrl } from '@/config/site'
import { DURATION, EASE_OUT, STAGGER } from '@/lib/motion'

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

/** Opção B: 3 planos públicos + Enterprise (fora do toggle mensal/anual). */
const plans: Plan[] = [
  {
    id: 'essencial-solo',
    name: 'Essencial Solo',
    description:
      'Consultório solo que quer prontuário, agenda e IA leve — sem pagar por canais que ainda não usa.',
    monthlyPrice: 229,
    yearlyPrice: 2290,
    features: [
      '1 profissional ativo e até 2 usuários de apoio incluídos',
      'Pacientes, prontuário, agenda, formulários e links públicos',
      'Documentos, MEMED e financeiro básico',
      'IA leve para documentos e apoio interno',
      'WhatsApp oficial, inbox de redes e CRM: upgrade nos planos superiores',
    ],
  },
  {
    id: 'starter-clinico',
    name: 'Starter Clínico',
    description:
      'Clínica pequena ou dupla de profissionais — equipe e métricas sem omnichannel completo.',
    monthlyPrice: 349,
    yearlyPrice: 3490,
    highlight: true,
    features: [
      '2 profissionais ativos e até 4 usuários de apoio incluídos',
      'Tudo do Essencial Solo, mais equipe básica e métricas operacionais',
      'Maior franquia de IA clínica',
      'Ideal para sair do papel e coordenar mais de um profissional',
    ],
  },
  {
    id: 'growth-omnichannel',
    name: 'Growth Omnichannel',
    description:
      'Clínica com atendimento centralizado: WhatsApp, e-mail e Instagram viram canal de conversão.',
    monthlyPrice: 849,
    yearlyPrice: 8490,
    features: [
      '5 profissionais ativos e até 10 usuários de apoio incluídos',
      'Tudo do Starter, mais WhatsApp oficial, Gmail e Instagram inbox',
      'CRM de leads, automações e agentes de IA por canal',
      '1 número WhatsApp incluso',
    ],
  },
]

const enterprisePlan = {
  id: 'enterprise',
  name: 'Enterprise',
  description:
    'Multiunidade, operação complexa ou necessidade custom — acima de 15 profissionais ativos e franquia de apoio sob medida.',
  features: [
    'Profissionais ativos e usuários de apoio: escopo sob consulta',
    'Integrações, governança e rollout alinhados à sua operação',
    'Sucesso do cliente e precificação dedicados',
  ],
} as const

function scrollToContactSection() {
  const el = document.getElementById('contato')
  if (!el) return
  const headerOffset = 72
  const top = el.getBoundingClientRect().top + window.scrollY - headerOffset
  window.scrollTo({ top, behavior: 'smooth' })
}

function planCtaHref(planName: string): string {
  return getWhatsAppUrl(`Tenho interesse no plano ${planName} (NAPSE) para minha clínica.`) ?? '#contato'
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
    <span className="text-2xl font-bold tracking-tight text-neutral-900 tabular-nums sm:text-3xl lg:text-3xl xl:text-4xl">
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
          className="relative flex min-w-[11.5rem] rounded-full bg-neutral-100/80 p-1 text-sm font-medium sm:min-w-[12.5rem]"
        >
          <motion.div
            className="pointer-events-none absolute left-1 top-1 bottom-1 w-[calc(50%-4px)] rounded-full bg-gradient-to-r from-nat-green to-nat-green/70 shadow-[0_10px_30px_rgba(22,163,74,0.35)]"
            initial={false}
            animate={{ x: isYearly ? '100%' : 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          />
          <button
            type="button"
            className={`relative z-10 flex-1 px-3 py-1 text-center transition-colors rounded-full ${
              billing === 'monthly' ? 'text-white' : 'text-neutral-500'
            }`}
            onClick={() => onChange('monthly')}
            aria-pressed={billing === 'monthly'}
          >
            Mensal
          </button>
          <button
            type="button"
            className={`relative z-10 flex-1 px-3 py-1 text-center transition-colors rounded-full ${
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

export function PricingSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px 0px',
  })
  const reduce = useReducedMotion()
  const effectiveInView = isInView || Boolean(reduce)

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 28 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduce ? 0.01 : DURATION.section,
          ease: EASE_OUT,
          when: 'beforeChildren' as const,
          staggerChildren: reduce ? 0 : Math.max(0.12, STAGGER * 2.5),
        },
      },
    }),
    [reduce]
  )

  const cardVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: {
          duration: reduce ? 0.01 : 0.55,
          ease: EASE_OUT,
        },
      },
    }),
    [reduce]
  )
  const [billing, setBilling] = useState<BillingPeriod>('monthly')
  /** Plano expandido no mobile (< lg); no desktop o conteúdo completo fica sempre visível. */
  const [expandedPlanId, setExpandedPlanId] = useState<string | null>(null)

  return (
    <section
      ref={sectionRef}
      id="planos"
      className="section-y relative bg-gradient-to-b from-neutral-50 via-white to-neutral-50 before:absolute before:left-0 before:right-0 before:top-0 before:z-10 before:h-px before:bg-gradient-to-r before:from-transparent before:via-neutral-200/70 before:to-transparent"
    >
      {/* Glow de fundo suave */}
      <div className="pointer-events-none absolute inset-x-0 top-[-8rem] mx-auto h-[380px] max-w-4xl rounded-full bg-gradient-to-b from-nat-green/14 via-nat-green/6 to-transparent blur-3xl" />

      <div className="section-shell relative">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={effectiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduce ? 0.01 : DURATION.section, ease: EASE_OUT }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-green lg:mb-3">
            Planos NAPSE
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight">
            Preço da Napse: Investimento em gestão médica que se paga.
          </h2>
          <div className="mt-4 flex justify-center lg:mt-6">
            <BillingToggle billing={billing} onChange={setBilling} />
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={effectiveInView ? 'visible' : 'hidden'}
          className="relative"
        >
          <div className="grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-4 lg:gap-5 xl:gap-6">
            {plans.map((plan, planIndex) => {
              const price =
                billing === 'monthly'
                  ? plan.monthlyPrice
                  : plan.yearlyPrice
              const ctaHref = planCtaHref(plan.name)
              const ctaIsExternal = ctaHref.startsWith('http')

              const isHighlight = plan.highlight
              const isOpen = expandedPlanId === plan.id
              const detailsId = `planos-detalhes-${plan.id}`

              const cardInner = (
                <motion.div
                  variants={cardVariants}
                  whileHover={{ y: -8 }}
                  className={`relative flex h-full flex-col rounded-3xl bg-white/12 px-4 py-4 backdrop-blur-xl border sm:px-5 sm:py-5 lg:px-8 lg:py-9 ${
                    isHighlight ? 'border-white/60' : 'border-white/50'
                  } shadow-[0_18px_60px_rgba(15,23,42,0.12)]`}
                >
                  {isHighlight && (
                    <div className="absolute -top-3 left-1/2 hidden -translate-x-1/2 lg:block lg:-top-4">
                      <div className="inline-flex flex-col items-center rounded-full bg-gradient-to-r from-nat-green to-nat-green/70 px-3 py-1 text-center shadow-[0_12px_30px_rgba(22,163,75,0.45)]">
                        <span className="text-[11px] font-semibold leading-tight text-white">Mais escolhido</span>
                        <span className="text-[10px] font-medium text-white/90">Melhor custo-benefício</span>
                      </div>
                    </div>
                  )}

                  {/* Mobile: cabeçalho compacto + expandir */}
                  <button
                    type="button"
                    className="flex w-full items-start gap-3 rounded-xl text-left outline-none transition-colors hover:bg-white/5 focus-visible:ring-2 focus-visible:ring-nat-green/50 lg:hidden"
                    aria-expanded={isOpen}
                    aria-controls={detailsId}
                    id={`planos-trigger-${plan.id}`}
                    onClick={() =>
                      setExpandedPlanId((prev) => (prev === plan.id ? null : plan.id))
                    }
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-base font-semibold text-neutral-900">
                          {plan.name}
                        </h3>
                        {isHighlight && (
                          <span className="inline-flex flex-col items-start rounded-full bg-gradient-to-r from-nat-green to-nat-green/70 px-2 py-0.5 text-[10px] font-semibold text-white shadow-sm leading-tight">
                            <span>Mais escolhido</span>
                            <span className="text-[9px] font-medium text-white/90">Custo-benefício</span>
                          </span>
                        )}
                      </div>
                      <div className="mt-1 flex flex-wrap items-baseline gap-1.5">
                        <AnimatedPlanPrice value={price} staggerIndex={planIndex} />
                        <motion.span
                          key={billing}
                          className="text-xs text-neutral-500"
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        >
                          / {billing === 'monthly' ? 'mês' : 'ano'}
                        </motion.span>
                      </div>
                      <p className="mt-1.5 line-clamp-2 text-xs text-neutral-500">
                        {plan.description}
                      </p>
                    </div>
                    <ChevronDown
                      className={`mt-0.5 h-5 w-5 shrink-0 text-neutral-500 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden
                    />
                  </button>

                  {/* Desktop: título + descrição + preço */}
                  <div className="mb-4 hidden lg:block">
                    <h3 className="text-base font-semibold text-neutral-900 sm:text-lg">
                      {plan.name}
                    </h3>
                    <p className="mt-1 text-sm text-neutral-500">{plan.description}</p>
                  </div>

                  <div className="mb-6 hidden items-baseline gap-2 lg:flex">
                    <AnimatedPlanPrice value={price} staggerIndex={planIndex} />
                    <motion.span
                      key={billing}
                      className="text-xs text-neutral-500 sm:text-sm"
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      / {billing === 'monthly' ? 'mês' : 'ano'}
                    </motion.span>
                  </div>

                  {/* Detalhes: acordeão no mobile; sempre visível no desktop */}
                  <div
                    id={detailsId}
                    role="region"
                    aria-label={`${plan.name}: benefícios e contato`}
                    className={isOpen ? 'block' : 'hidden lg:block'}
                  >
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key={`${plan.id}-resumo`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden lg:hidden"
                        >
                          <p className="border-t border-white/20 pt-3 text-sm text-neutral-600">
                            {plan.description}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className={isOpen ? 'lg:mt-0' : 'max-lg:hidden'}>
                      <a
                        href={ctaHref}
                        target={ctaIsExternal ? '_blank' : undefined}
                        rel={ctaIsExternal ? 'noopener noreferrer' : undefined}
                        className="group relative mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-gradient-to-r from-nat-green to-nat-green/70 px-4 py-2.5 text-sm font-semibold text-white shadow-[0_10px_35px_rgba(22,163,74,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-green focus-visible:ring-offset-2 focus-visible:ring-offset-transparent lg:mt-auto lg:py-3"
                      >
                        <span className="relative z-10">Começar com este plano</span>
                        <span className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-white/25 via-transparent to-white/20 opacity-0 transition-opacity duration-200 group-hover:opacity-40" />
                      </a>

                      <ul className="mt-4 space-y-2.5 text-sm leading-snug text-neutral-600 lg:mt-6 lg:space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2.5">
                            <Check
                              className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600"
                              strokeWidth={2.4}
                              aria-hidden
                            />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )

              if (isHighlight) {
                return (
                  <div
                    key={plan.id}
                    className="relative rounded-[1.35rem] bg-gradient-to-br from-nat-green/40 via-nat-green/20 to-nat-green/50 p-[1.5px] lg:rounded-[1.9rem]"
                  >
                    {cardInner}
                  </div>
                )
              }

              return (
                <div
                  key={plan.id}
                  className="relative rounded-[1.35rem] bg-white/40 p-[1.5px] lg:rounded-[1.9rem]"
                >
                  {cardInner}
                </div>
              )
            })}

            {/* Enterprise — quarto card (mesmo design escuro) */}
            <div className="relative h-full min-h-0 rounded-[1.35rem] bg-gradient-to-br from-neutral-800/90 via-neutral-900 to-neutral-950 p-[1.5px] shadow-[0_18px_60px_rgba(15,23,42,0.2)] lg:rounded-[1.9rem]">
              <motion.div
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="flex h-full min-h-[280px] flex-col rounded-[1.3rem] bg-gradient-to-br from-neutral-900/95 to-neutral-950 px-4 py-4 text-white sm:px-5 sm:py-5 lg:min-h-0 lg:rounded-[1.85rem] lg:px-5 lg:py-7 xl:px-6 xl:py-8"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60 sm:text-xs">
                  On demand
                </p>
                <h3 className="mt-1 text-base font-semibold tracking-tight sm:text-lg">{enterprisePlan.name}</h3>
                <p className="mt-2 text-xs leading-relaxed text-white/75 sm:text-sm">{enterprisePlan.description}</p>

                <div className="mt-4">
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-white/50">Investimento</p>
                  <p className="text-xl font-bold tracking-tight sm:text-2xl lg:text-xl xl:text-2xl">Sob consulta</p>
                </div>

                <button
                  type="button"
                  onClick={scrollToContactSection}
                  className="mt-4 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-lg transition-transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 lg:py-3"
                >
                  Falar com vendas
                </button>

                <ul className="mt-4 flex-1 space-y-2 text-xs text-white/85 sm:text-sm lg:space-y-2.5">
                  {enterprisePlan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400 sm:h-4 sm:w-4" strokeWidth={2.4} />
                      <span className="pt-[1px] leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>

          <p className="mt-2 text-center text-xs text-neutral-500 lg:hidden">
            Toque no plano para ver benefícios e detalhes
          </p>
        </motion.div>
      </div>
    </section>
  )
}

