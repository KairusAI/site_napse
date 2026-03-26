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
  iconClass: string
}> = [
  {
    id: '1',
    title: 'Onboarding Guiado',
    description: 'Tour passo a passo pelo sistema. Em minutos você já sabe onde está cada coisa.',
    Icon: Database,
    iconClass: 'text-nat-blue',
  },
  {
    id: '2',
    title: 'Migração dos Dados',
    description: 'Agenda, cadastros e histórico. Nossa equipe migra tudo — você não perde nada.',
    Icon: Users,
    iconClass: 'text-nat-blue',
  },
  {
    id: '3',
    title: 'Suporte Humano',
    description: 'Chat, e-mail e telefone. Dúvida? Resposta em até 24h, sem robô.',
    Icon: Headphones,
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
      className="bg-white px-4 py-20 lg:py-32"
    >
      <div className="max-w-6xl lg:max-w-7xl mx-auto">
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
              className="section-kicker text-nat-blue mb-3"
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
              className="pointer-events-none absolute -bottom-14 -left-56 w-[920px] hidden lg:block"
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
              className="mb-8 sm:mb-14 lg:mb-20 max-w-xl rounded-r-2xl border-l-4 border-nat-blue bg-neutral-50 py-4 sm:py-5 pl-5 sm:pl-6 pr-4 sm:pr-5 shadow-sm"
            >
              <p className="text-base sm:text-lg lg:text-xl text-neutral-700 leading-relaxed sm:leading-loose tracking-tight font-medium text-balance">
                Do treinamento à migração dos dados, nossa equipe guia sua clínica em cada etapa.{' '}
                <span className="text-neutral-900 font-semibold">
                  Você não precisa ser expert em sistema — só em cuidar de pacientes.
                </span>
              </p>
            </motion.div>
            <div ref={cardsGridRef} className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {onboardingCards.map((card) => (
                <div
                  key={card.id}
                  className="transition-transform duration-300 ease-out hover:scale-[1.02] hover:-translate-y-1 cursor-default"
                >
                  <div
                    data-support-card
                    className="relative rounded-3xl border border-neutral-200 bg-white p-6 text-center opacity-0 shadow-sm transition-shadow duration-300 hover:shadow-md lg:p-8"
                  >
                    <card.Icon
                      className={`mx-auto mb-4 w-12 h-12 lg:w-14 lg:h-14 ${card.iconClass}`}
                      strokeWidth={1.5}
                    />
                    <h3 className="text-base lg:text-lg font-bold text-neutral-900 mb-2">
                      {card.title}
                    </h3>
                    <p className="text-sm text-neutral-600 leading-relaxed font-medium">
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

