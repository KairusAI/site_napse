import { useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { DURATION, EASE_OUT, viewportOnce } from '@/lib/motion'

interface Integration {
  id: string
  brand: string
  title: string
  description: string
  iconBg: string
  iconColor: string
  brandColor: string
  cardTone: string
  borderAccent: string
  featured?: boolean
  Icon: string
}

const integrations: Integration[] = [
  {
    id: 'whatsapp',
    brand: 'WhatsApp',
    title: 'Chat direto com o paciente',
    description: 'Em breve: Todas as conversas do WhatsApp conectadas em um unico lugar, com agente de IA para responder perguntas e agendar consultas.',
    iconBg: 'bg-[#25D366]',
    iconColor: 'text-white',
    brandColor: 'text-[#25D366]',
    cardTone: 'bg-[#25D366]/[0.05] border-[#25D366]/40',
    borderAccent: 'border-l-[#25D366]',
    featured: true,
    Icon: '/assets/icons/whatsapp.png',
  },
  {
    id: 'google-calendar',
    brand: 'Google Calendar',
    title: 'Agenda Unificada',
    description: 'Seu Google Calendar sincronizado com a clínica, tudo em um unico lugar.',
    iconBg: 'bg-[#E8F0FE]',
    iconColor: 'text-[#4285F4]',
    brandColor: 'text-[#4285F4]',
    cardTone: 'bg-[#4285F4]/[0.05] border-[#4285F4]/35',
    borderAccent: 'border-l-[#4285F4]',
    Icon: '/assets/icons/calendar.png',
  },
  {
    id: 'gmail',
    brand: 'Gmail',
    title: 'E-mail Integrado',
    description: 'Todas as conversas do Gmail conectadas em um unico lugar, com agente de IA para responder emails automaticamente.',
    iconBg: 'bg-white ring-1 ring-[#EA4335]/20',
    iconColor: 'text-[#EA4335]',
    brandColor: 'text-[#EA4335]',
    cardTone: 'bg-[#EA4335]/[0.05] border-[#EA4335]/30',
    borderAccent: 'border-l-[#EA4335]',
    Icon: '/assets/icons/gmail.png',
  },
  {
    id: 'instagram',
    brand: 'Instagram',
    title: 'Presença Digital',
    description: 'Sua conta do Instagram conectada, para criacao de conteudo com agente de IA, com postagem automatica e agendamento de posts, e metricas claras sobre sua rede social.',
    iconBg: 'bg-white ring-1 ring-[#6228D7]/20',
    iconColor: 'text-white',
    brandColor: 'text-[#E1306C]',
    cardTone: 'bg-[#E1306C]/[0.05] border-[#E1306C]/30',
    borderAccent: 'border-l-[#E1306C]',
    Icon: '/assets/icons/instagram.png',
  },
  {
    id: 'asaas',
    brand: 'Asaas',
    title: 'Cobranças Automáticas',
    description: 'Em breve: boletos, cartões e antecipação de recebíveis integrados com Asaas.',
    iconBg: 'bg-[#1D4ED8]',
    iconColor: 'text-white',
    brandColor: 'text-[#1D4ED8]',
    cardTone: 'bg-[#1D4ED8]/[0.05] border-[#1D4ED8]/30',
    borderAccent: 'border-l-[#1D4ED8]',
    Icon: '/assets/icons/asaas-white.svg',
  },
  {
    id: 'memed',
    brand: 'Memed',
    title: 'Prescrição Digital',
    description: 'Prescrição digital com Memed. Use toda a gama de funcionalidades da plataforma de prescrição digital.',
    iconBg: 'bg-[#1D4ED8]/20',
    iconColor: 'text-white',
    brandColor: 'text-[#1D4ED8]',
    cardTone: 'bg-[#1D4ED8]/[0.05] border-[#1D4ED8]/30',
    borderAccent: 'border-l-[#1D4ED8]',
    Icon: '/assets/icons/memed.png',
  },
  {
    id: 'vidaas',
    brand: 'VIDaaS',
    title: 'Assinatura Digital Integrada',
    description: 'Emita receitas, atestados e pedidos de exames com a integração oficial do VIDaaS. Assine tudo eletronicamente com validade legal (ICPBrasil) e envie diretamente ao paciente, tudo sem sair da Napse.',
    iconBg: 'bg-[#1D4ED8]/10 ring-1 ring-[#1D4ED8]/20',
    iconColor: 'text-[#1D4ED8]',
    brandColor: 'text-[#1D4ED8]',
    cardTone: 'bg-[#1D4ED8]/[0.05] border-[#1D4ED8]/30',
    borderAccent: 'border-l-[#1D4ED8]',
    featured: true,
    Icon: '/assets/icons/vidaas.png',
  }
]

export function IntegrationsBentoGrid() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, viewportOnce)
  const reduce = useReducedMotion()
  const inView = isInView || Boolean(reduce)

  const containerVariants = useMemo(
    () => ({
      hidden: { opacity: 0 },
      visible: (i: number) => ({
        opacity: 1,
        transition: {
          staggerChildren: reduce ? 0 : 0.12,
          delayChildren: reduce ? 0 : 0.08 * i,
        },
      }),
    }),
    [reduce]
  )

  const itemVariants = useMemo(
    () => ({
      hidden: { opacity: 0, y: reduce ? 0 : 24 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { duration: reduce ? 0.01 : DURATION.short, ease: EASE_OUT },
      },
    }),
    [reduce]
  )

  return (
    <section
      ref={ref}
      id="integracoes"
      className="section-y bg-white"
    >
      <div className="section-shell">
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-12 xl:gap-16 lg:items-start">
          {/* Coluna esquerda (60%): título + cards */}
          <div>
            <motion.div
              className="text-center lg:text-left mb-8 lg:mb-10"
              initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: reduce ? 0.01 : DURATION.short, ease: EASE_OUT }}
            >
              <p className="section-kicker text-nat-blue mb-3">
                Conecte tudo
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
                Integre a Napse aos aplicativos que sua clínica já usa
              </h2>
              <p className="mt-4 max-w-2xl text-sm sm:text-base leading-relaxed text-neutral-600">
                E sua equipe passa a operar em um fluxo centralizado, mais previsível e com controle e confiança.
              </p>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={0}
            >
              {integrations.map((integration, index) => (
                <motion.div
                  key={integration.id}
                  variants={itemVariants}
                  className={integration.featured ? 'sm:col-span-2' : ''}
                >
                  <IntegrationCard integration={integration} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Imagem integrações — mobile */}
          <motion.div
            className="mt-8 flex items-center justify-center lg:hidden"
            initial={{ opacity: 0, y: reduce ? 0 : 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.6, delay: reduce ? 0 : 0.2, ease: EASE_OUT }}
          >
            <img
              src="/assets/imagem_integracoes.png"
              alt="Integrações NAPSE"
              className="w-full max-w-sm object-contain sm:max-w-md"
            />
          </motion.div>

          {/* Coluna direita: imagem integrações — desktop */}
          <motion.div
            className="hidden lg:flex mt-12 lg:mt-0 lg:sticky lg:top-24 items-center justify-center overflow-hidden min-h-[400px] lg:min-h-[900px]"
            initial={{ opacity: 0, x: reduce ? 0 : 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.6, delay: reduce ? 0 : 0.15, ease: EASE_OUT }}
          >
            <img
              src="/assets/imagem_integracoes.png"
              alt="Integrações NAPSE - WhatsApp, Gmail, Google Calendar, Instagram e Asaas conectados ao hub"
              className="h-full object-contain drop-shadow-lg"
              style={{ minHeight: '100%', transform: 'scale(1.8)' }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function IntegrationCard({
  integration,
}: {
  integration: Integration
  index: number
}) {
  const reduce = useReducedMotion()
  const Icon = integration.Icon
  const isFeatured = integration.featured

  return (
    <motion.div
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-l-4 bg-white
        shadow-sm transition-all duration-300 hover:-translate-y-1
        ${isFeatured ? 'p-4 sm:p-5 lg:p-6' : 'p-4 sm:p-6 lg:p-8'}
        ${integration.cardTone}
        ${integration.borderAccent}`}
      whileHover={reduce ? undefined : { y: -6, transition: { duration: 0.2 } }}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4 mb-4">
            <motion.div
              className={`inline-flex items-center justify-center rounded-2xl ${isFeatured ? 'h-14 w-14' : 'h-12 w-12'} ${integration.iconBg} ${integration.iconColor}`}
              whileHover={reduce ? undefined : { scale: 1.08, y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
            <img src={Icon} alt={integration.brand} className={`${isFeatured ? 'w-12 h-12' : 'w-11 h-11'} object-contain`} />
          </motion.div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${integration.brandColor}`}>
            {integration.brand}
          </span>
        </div>

        <h3 className={`font-semibold text-neutral-900 mb-2 ${isFeatured ? 'text-xl lg:text-2xl' : 'text-lg'}`}>
          {integration.title}
        </h3>
        <p className={`text-neutral-600 leading-relaxed flex-1 ${isFeatured ? 'text-base' : 'text-sm'}`}>
          {integration.description}
        </p>
      </div>
    </motion.div>
  )
}
