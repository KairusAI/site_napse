import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { Database, Users, Headphones } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const onboardingCards: Array<{
  id: string
  title: string
  description: string
  Icon: LucideIcon
  color: 'purple' | 'green' | 'blue'
  gradient: string
  glow: string
  iconClass: string
}> = [
  {
    id: '1',
    title: 'Onboarding Guiado',
    description: 'Tour passo a passo pelo sistema. Em minutos você já sabe onde está cada coisa.',
    Icon: Database,
    color: 'purple',
    gradient: 'from-nat-purple/10 via-white/95 to-white',
    glow: '0 0 40px 12px hsl(262 83% 52% / 0.12), 0 0 80px 24px hsl(262 83% 52% / 0.06)',
    iconClass: 'text-nat-purple',
  },
  {
    id: '2',
    title: 'Migração dos Dados',
    description: 'Agenda, cadastros e histórico. Nossa equipe migra tudo — você não perde nada.',
    Icon: Users,
    color: 'green',
    gradient: 'from-nat-green/10 via-white/95 to-white',
    glow: '0 0 40px 12px hsl(142 76% 36% / 0.12), 0 0 80px 24px hsl(142 76% 36% / 0.06)',
    iconClass: 'text-nat-green',
  },
  {
    id: '3',
    title: 'Suporte Humano',
    description: 'Chat, e-mail e telefone. Dúvida? Resposta em até 24h, sem robô.',
    Icon: Headphones,
    color: 'blue',
    gradient: 'from-nat-blue/10 via-white/95 to-white',
    glow: '0 0 40px 12px hsl(217 91% 50% / 0.12), 0 0 80px 24px hsl(217 91% 50% / 0.06)',
    iconClass: 'text-nat-blue',
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: 'beforeChildren',
      staggerChildren: 0.12,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function HexagonPattern() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.25]" aria-hidden>
      <svg className="absolute -right-20 -top-10 w-[400px] h-[400px]" viewBox="0 0 200 200" fill="none" strokeWidth="0.5">
        {[...Array(5)].map((_, i) =>
          [...Array(5)].map((_, j) => (
            <polygon
              key={`${i}-${j}`}
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              transform={`translate(${i * 55},${j * 55}) scale(0.35)`}
              className="stroke-slate-200"
            />
          ))
        )}
      </svg>
      <svg className="absolute right-1/4 top-1/2 w-[280px] h-[280px]" viewBox="0 0 200 200" fill="none" strokeWidth="0.5">
        {[...Array(4)].map((_, i) =>
          [...Array(4)].map((_, j) => (
            <polygon
              key={`b-${i}-${j}`}
              points="50,5 95,27.5 95,72.5 50,95 5,72.5 5,27.5"
              transform={`translate(${i * 52},${j * 52}) scale(0.3)`}
              className="stroke-slate-200"
            />
          ))
        )}
      </svg>
    </div>
  )
}

export function SupportOnboardingSection() {
  const cardsGridRef = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const cards = cardsGridRef.current?.querySelectorAll('[data-support-card]')
      if (!cards?.length) return

      gsap.fromTo(
        cards,
        {
          opacity: 0,
          y: 32,
          scale: 0.94,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsGridRef.current,
            start: 'top 85%',
            end: 'top 55%',
            toggleActions: 'play none none none',
          },
        }
      )
    },
    { scope: cardsGridRef, dependencies: [] }
  )

  return (
    <section
      id="suporte"
      className="relative overflow-hidden px-4 py-20 lg:py-32 bg-[#F8FAFC]"
    >
      <HexagonPattern />

      <div className="relative max-w-6xl lg:max-w-7xl mx-auto">
        <div className="relative lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-20 lg:items-stretch">
          {/* Coluna esquerda: título + mascote */}
          <motion.div
            className="relative lg:min-h-[620px]"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -120px' }}
          >
            <motion.p
              variants={itemVariants}
              className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-3"
            >
              Suporte e Onboarding
            </motion.p>

            <motion.h2
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
            >
              Implementação em dias, não em meses.
            </motion.h2>

            {/* Imagem mascote — mobile (centralizada) */}
            <motion.div
              className="flex justify-center mt-2 mb-4 lg:hidden"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              viewport={{ once: true, margin: '0px 0px -80px' }}
            >
              <img
                src="/assets/imagem_onboarding.png"
                alt="Mascote NAPSE comemorando o onboarding no computador"
                className="w-full max-w-lg sm:max-w-xl drop-shadow-2xl"
              />
            </motion.div>

            {/* Imagem mascote — desktop (absoluta) */}
            <motion.div
              className="pointer-events-none absolute -bottom-14 -left-[22rem] w-[920px] hidden lg:block xl:-left-[28rem]"
              variants={itemVariants}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              viewport={{ once: true, margin: '0px 0px -120px' }}
            >
              <img
                src="/assets/imagem_onboarding.png"
                alt="Mascote NAPSE comemorando o onboarding no computador"
                className="w-full h-auto drop-shadow-2xl"
              />
            </motion.div>
          </motion.div>

          {/* Coluna direita: cards Premium Glass */}
          <motion.div
            className="mt-10 lg:mt-0 relative z-10 flex flex-col justify-center lg:h-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -120px' }}
          >
            <motion.div
              initial={{ x: -48, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true, margin: '-80px 0px' }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              className="mb-8 sm:mb-14 lg:mb-20 max-w-xl rounded-r-2xl border-l-4 border-nat-purple bg-white/70 backdrop-blur-sm py-4 sm:py-5 pl-5 sm:pl-6 pr-4 sm:pr-5 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]"
            >
              <p className="text-base sm:text-lg lg:text-xl text-neutral-700 leading-relaxed sm:leading-loose tracking-tight font-medium text-balance">
                Do treinamento à migração dos dados, nossa equipe guia sua clínica em cada etapa.{' '}
                <span className="text-neutral-900 font-semibold">
                  Você não precisa ser expert em sistema — só em cuidar de pacientes.
                </span>
              </p>
            </motion.div>
            <div
              ref={cardsGridRef}
              className="grid grid-cols-1 items-stretch sm:grid-cols-3 gap-5 lg:gap-6"
            >
              {onboardingCards.map((card) => (
                <div
                  key={card.id}
                  className="flex h-full min-h-0 transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 cursor-default"
                >
                  <div
                    data-support-card
                    className={`relative flex h-full min-h-0 w-full flex-col rounded-3xl bg-gradient-to-b ${card.gradient} backdrop-blur-md border border-white/40 p-6 lg:p-8 text-center overflow-hidden opacity-0 transition-shadow duration-300 hover:shadow-xl hover:border-white/60`}
                    style={{ boxShadow: card.glow }}
                  >
                    <card.Icon
                      className={`mx-auto mb-4 w-12 h-12 shrink-0 lg:w-14 lg:h-14 ${card.iconClass}`}
                      strokeWidth={1.5}
                    />
                    <h3 className="mb-2 shrink-0 text-base font-bold text-neutral-900 lg:text-lg">
                      {card.title}
                    </h3>
                    <p className="flex-1 text-sm font-medium leading-relaxed text-neutral-600">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

