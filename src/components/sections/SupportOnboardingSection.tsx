import { motion } from 'framer-motion'
import { Database, Users, Headphones } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

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
    title: 'Conheça o Sistema',
    description: 'Nosso onboarding guiado mostra todas as features essenciais.',
    Icon: Database,
    color: 'purple',
    gradient: 'from-nat-purple/10 via-white/95 to-white',
    glow: '0 0 40px 12px hsl(262 83% 52% / 0.12), 0 0 80px 24px hsl(262 83% 52% / 0.06)',
    iconClass: 'text-nat-purple',
  },
  {
    id: '2',
    title: 'Configure sua Equipe',
    description: 'Ajuste a sua equipe em cada detalhe que precisar.',
    Icon: Users,
    color: 'green',
    gradient: 'from-nat-green/10 via-white/95 to-white',
    glow: '0 0 40px 12px hsl(142 76% 36% / 0.12), 0 0 80px 24px hsl(142 76% 36% / 0.06)',
    iconClass: 'text-nat-green',
  },
  {
    id: '3',
    title: 'Suporte Sempre Pronto',
    description: 'Conte com nossa equipe para qualquer dúvida ou imprevisto.',
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
  return (
    <section
      id="suporte"
      className="relative overflow-hidden px-4 py-20 lg:py-32 bg-[#F8FAFC]"
    >
      <HexagonPattern />

      <div className="relative max-w-6xl lg:max-w-7xl mx-auto">
        <div className="relative lg:grid lg:grid-cols-[2fr_3fr] lg:gap-16 xl:gap-20 lg:items-stretch">
          {/* Coluna esquerda: título + parágrafo + mascote */}
          <motion.div
            className="relative min-h-[420px] sm:min-h-[480px] lg:min-h-[620px]"
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
              className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-6"
            >
              Implementação simples. Suporte sempre à mão.
            </motion.h2>

            {/* Imagem de onboarding no canto inferior esquerdo */}
            <motion.div
              className="pointer-events-none absolute -bottom-10 -left-48 sm:-bottom-12 sm:-left-44 lg:-bottom-14 lg:-left-56 w-[600px] sm:w-[720px] lg:w-[920px]"
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
            <motion.p
              variants={itemVariants}
              className="text-lg lg:text-xl text-neutral-600 mb-6 max-w-xl leading-relaxed tracking-tight font-medium text-balance"
            >
              Do treinamento à migração dos dados, nossa equipe guia sua clínica em cada etapa. Você
              não precisa ser expert em sistema — só em cuidar de pacientes.
            </motion.p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 lg:gap-6">
              {onboardingCards.map((card, index) => (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-24px' }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className={`relative rounded-3xl bg-gradient-to-b ${card.gradient} backdrop-blur-md border border-white/40 p-6 lg:p-8 text-center overflow-hidden`}
                  style={{ boxShadow: card.glow }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

