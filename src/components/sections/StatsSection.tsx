import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, animate } from 'framer-motion'
import { DURATION, EASE_OUT } from '@/lib/motion'

type StatItem = {
  id: string
  label: string
  value: number
  prefix?: string
  suffix?: string
}

const stats: StatItem[] = [
  {
    id: 'productivity',
    label: 'Ganho de produtividade reportado',
    value: 45,
    prefix: '+',
    suffix: '%',
  },
  {
    id: 'no-show',
    label: 'Menos faltas com confirmação automática',
    value: 30,
    prefix: '-',
    suffix: '%',
  },
  {
    id: 'time-saving',
    label: 'Horas economizadas por mês em burocracia',
    value: 15,
    suffix: 'h',
  },
  {
    id: 'security',
    label: 'Segurança e conformidade LGPD',
    value: 100,
    suffix: '%',
  },
]

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -120px',
  })
  const reduce = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  const itemVariants = useMemo(
    () => ({
      hidden: { y: reduce ? 0 : 24 },
      visible: {
        y: 0,
        transition: {
          duration: reduce ? 0.01 : 0.5,
          ease: EASE_OUT,
        },
      },
    }),
    [reduce]
  )

  useEffect(() => {
    if (reduce) {
      setDisplayValue(stat.value)
      return
    }
    if (!isInView) return

    const controls = animate(0, stat.value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: (latest) => {
        setDisplayValue(latest)
      },
    })

    return () => {
      controls.stop()
    }
  }, [isInView, stat.value, reduce])

  const formattedValue = `${stat.prefix ?? ''}${Math.round(displayValue)}${stat.suffix ?? ''}`
  const isLast = index === stats.length - 1

  return (
    <motion.div
      ref={ref}
      variants={itemVariants}
      className={`flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 py-4 lg:py-0 overflow-visible ${
        !isLast ? 'lg:border-r lg:border-slate-100' : ''
      }`}
    >
      <div className="relative w-full h-full max-w-xs sm:max-w-sm group isolate">
        {/* Iluminação atrás do card — fora da animação, sempre visível */}
        <div
          className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-nat-purple/30 via-nat-blue/25 to-nat-purple/30 blur-2xl group-hover:from-nat-purple/40 group-hover:via-nat-blue/35 group-hover:to-nat-purple/40 transition-all duration-500 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden
        />
        {/* Liquid glass card — só o card anima */}
        <motion.div
          className="relative w-full h-full rounded-3xl bg-white/25 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] px-6 py-8 sm:px-8 sm:py-10 flex flex-col items-center justify-center transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-white/35 hover:border-white/80 hover:shadow-[0_24px_64px_rgba(99,102,241,0.12),inset_0_1px_0_rgba(255,255,255,0.9)]"
          style={{ zIndex: 1 }}
        >
          <span className="text-3xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-none bg-gradient-to-r from-nat-purple to-nat-blue bg-clip-text text-transparent">
            {formattedValue}
          </span>
          <p className="mt-4 text-sm sm:text-base text-slate-600 font-medium max-w-[18rem]">
            {stat.label}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px 0px',
  })
  const reduce = useReducedMotion()
  const effectiveInView = isInView || Boolean(reduce)

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          duration: reduce ? 0.01 : 0.4,
          when: 'beforeChildren' as const,
          staggerChildren: reduce ? 0 : 0.1,
        },
      },
    }),
    [reduce]
  )

  return (
    <section
      ref={sectionRef}
      id="stats"
      aria-labelledby="stats-heading"
      className="section-y relative scroll-mt-24 overflow-hidden bg-white"
    >
      {/* Gradiente mesh sutil — depth sem flat fill (Awwwards trend) */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: 'linear-gradient(135deg, hsl(262 83% 52% / 0.03), hsl(217 91% 50% / 0.02))' }}
        aria-hidden
      />
      {/* Linha tipo gráfico no fundo — animação de desenho do início ao fim */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M 0 98 L 18 82 L 32 78 L 48 62 L 58 58 L 72 38 L 85 22 L 100 8"
          fill="none"
          stroke="hsl(var(--nat-purple))"
          strokeOpacity="0.14"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: reduce ? 1 : 0 }}
          animate={effectiveInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            pathLength: {
              duration: reduce ? 0.01 : DURATION.path,
              ease: EASE_OUT,
            },
          }}
        />
      </svg>

      <div className="section-shell relative z-10">
        <motion.div
          className="mb-10 text-center sm:mb-20 lg:mb-24"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={effectiveInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: reduce ? 0.01 : 0.7, ease: EASE_OUT }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple lg:mb-3">
            Impacto em números
          </p>
          <h2
            id="stats-heading"
            className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight"
          >
            Números que você sente no dia a dia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600 lg:mt-5">
            <a
              href="#plataforma"
              className="font-semibold text-nat-purple underline-offset-2 transition-colors hover:underline"
            >
              Veja na prática na plataforma
            </a>{' '}
            como esses resultados saem do relatório e entram no fluxo do consultório.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={effectiveInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 gap-4 sm:gap-y-10 lg:grid-cols-4 lg:gap-y-0 overflow-visible"
        >
          {stats.map((stat, index) => (
            <StatCard key={stat.id} stat={stat} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  )
}

