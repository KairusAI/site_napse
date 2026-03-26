import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { useReducedMotionPreference } from '@/hooks/useReducedMotion'

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
}

/* Só anima Y: fade no glass/blur causa escurecimento na entrada */
const itemVariants = {
  hidden: { y: 24 },
  visible: {
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(ref, {
    once: true,
    margin: '0px 0px -120px',
  })
  const [displayValue, setDisplayValue] = useState(0)
  const prefersReducedMotion = useReducedMotionPreference()

  useEffect(() => {
    if (!isInView) return

    if (prefersReducedMotion) {
      setDisplayValue(stat.value)
      return
    }

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
  }, [isInView, prefersReducedMotion, stat.value])

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
      <motion.div className="w-full h-full max-w-xs rounded-3xl border border-neutral-200 bg-white px-6 py-8 shadow-sm transition-all duration-300 ease-out hover:-translate-y-1 sm:max-w-sm sm:px-8 sm:py-10">
        <span className="text-3xl leading-none font-extrabold tracking-tight text-nat-blue sm:text-5xl lg:text-7xl">
          {formattedValue}
        </span>
        <p className="mt-4 max-w-[18rem] text-sm font-medium text-slate-600 sm:text-base">
          {stat.label}
        </p>
      </motion.div>
    </motion.div>
  )
}

export function StatsSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, {
    once: true,
    margin: '-80px 0px',
  })

  return (
    <section
      ref={sectionRef}
      aria-labelledby="stats-heading"
      className="relative overflow-hidden bg-white px-4 py-20 sm:py-28 lg:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{ background: 'linear-gradient(135deg, hsl(262 83% 52% / 0.03), hsl(239 84% 67% / 0.02))' }}
        aria-hidden
      />
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full select-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <motion.path
          d="M 0 98 L 18 82 L 32 78 L 48 62 L 58 58 L 72 38 L 85 22 L 100 8"
          fill="none"
          stroke="hsl(var(--nat-blue))"
          strokeOpacity="0.14"
          strokeWidth="0.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{
            pathLength: {
              duration: 3.0,
              ease: [0.22, 1, 0.36, 1],
            },
          }}
        />
      </svg>

      <div className="relative z-10 mx-auto max-w-5xl lg:max-w-6xl">
        <motion.div
          className="mb-10 sm:mb-20 lg:mb-24 text-center"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker text-nat-blue mb-3">
            Impacto em números
          </p>
          <h2
            id="stats-heading"
            className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900"
          >
            Números que você sente no dia a dia
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm sm:text-base text-neutral-600">
            A conversa com nosso especialista ajuda a identificar onde a NAPSE reduz retrabalho, organiza a agenda e traz mais previsibilidade para a rotina da clínica.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
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

