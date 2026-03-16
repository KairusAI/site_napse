import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

interface Integration {
  id: string
  brand: string
  title: string
  description: string
  iconBg: string
  iconColor: string
  borderAccent: string
  featured?: boolean
  Icon: React.ComponentType<{ className?: string }>
}

const integrations: Integration[] = [
  {
    id: 'instagram',
    brand: 'Instagram',
    title: 'Presença Digital',
    description: 'Sua captação e mensagens diretas em um só lugar. Menos apps abertos, mais pacientes qualificados.',
    iconBg: 'bg-nat-purple-muted',
    iconColor: 'text-nat-purple',
    borderAccent: 'border-l-nat-purple',
    featured: true,
    Icon: InstagramIcon,
  },
  {
    id: 'asaas',
    brand: 'Asaas',
    title: 'Cobranças Automáticas',
    description: 'Boletos, cartões e antecipação de recebíveis integrados. Receba no prazo, sem cobrança manual.',
    iconBg: 'bg-nat-green-muted',
    iconColor: 'text-nat-green',
    borderAccent: 'border-l-nat-green',
    Icon: AsaasIcon,
  },
  {
    id: 'google-calendar',
    brand: 'Google Calendar',
    title: 'Agenda Unificada',
    description: 'Seu Google Calendar sincronizado com a clínica. Uma agenda, todos os compromissos.',
    iconBg: 'bg-nat-blue-muted',
    iconColor: 'text-nat-blue',
    borderAccent: 'border-l-nat-blue',
    Icon: GoogleCalendarIcon,
  },
  {
    id: 'whatsapp',
    brand: 'WhatsApp',
    title: 'Confirmação no WhatsApp',
    description: 'Lembretes e confirmações automáticas. O paciente agenda e confirma sem ligar para a recepção.',
    iconBg: 'bg-nat-yellow-muted',
    iconColor: 'text-nat-yellow',
    borderAccent: 'border-l-nat-yellow',
    Icon: WhatsAppIcon,
  },
  {
    id: 'gmail',
    brand: 'Gmail',
    title: 'Alertas Críticos',
    description: 'Exames, avisos e resultados importantes direto na sua caixa. Nada perde no meio do caminho.',
    iconBg: 'bg-neutral-100',
    iconColor: 'text-neutral-600',
    borderAccent: 'border-l-neutral-400',
    Icon: GmailIcon,
  },
]

function WhatsAppIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function AsaasIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" />
    </svg>
  )
}

function InstagramIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  )
}

function GoogleCalendarIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className}>
      <path fill="#4285F4" d="M18 4h-1V2h-2v2H9V2H7v2H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H6V10h12v8zm0-10H6V6h12v2z" />
    </svg>
  )
}

function GmailIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M24 4.5v15c0 .83-.67 1.5-1.5 1.5H1.5C.67 21 0 20.33 0 19.5v-15c0-.83.67-1.5 1.5-1.5h21c.83 0 1.5.67 1.5 1.5zM12 12L2.4 6.6C2.16 6.46 2 6.24 2 6s.16-.46.4-.6L12 0l9.6 5.4c.24.14.4.36.4.6s-.16.46-.4.6L12 12zM2 18V8.5l10 5.5 10-5.5V18H2z" />
    </svg>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: (i: number) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 * i },
  }),
}

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

export function IntegrationsBentoGrid() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="integracoes"
      className="relative px-4 py-20 lg:py-28 lg:px-8 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-50/80 to-white pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-nat-purple/[0.03] rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-[100rem] mx-auto">
        <div className="lg:grid lg:grid-cols-[3fr_2fr] lg:gap-12 xl:gap-16 lg:items-start">
          {/* Coluna esquerda (60%): título + cards */}
          <div>
            <motion.div
              className="text-center lg:text-left mb-8 lg:mb-10"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-3">
                Conecte tudo
              </p>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
                Conecte o que você já usa
              </h2>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 sm:grid-cols-3 gap-3 lg:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
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
            className="mt-4 -mb-8 flex items-center justify-center overflow-hidden lg:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/assets/imagem_integracoes.png"
              alt="Integrações NAPSE"
              className="w-full max-w-sm sm:max-w-md object-contain drop-shadow-lg rounded-2xl"
            />
          </motion.div>

          {/* Coluna direita: imagem integrações — desktop */}
          <motion.div
            className="hidden lg:flex mt-12 lg:mt-0 lg:sticky lg:top-24 items-center justify-center overflow-hidden min-h-[400px] lg:min-h-[560px]"
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src="/assets/imagem_integracoes.png"
              alt="Integrações NAPSE - WhatsApp, Gmail, Google Calendar, Instagram e Asaas conectados ao hub"
              className="h-full object-contain drop-shadow-lg rounded-2xl"
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
  const Icon = integration.Icon
  const isFeatured = integration.featured

  return (
    <motion.div
      className={`group relative flex flex-col rounded-2xl border border-l-4 border-neutral-200 bg-white
        shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden
        ${isFeatured ? 'p-4 sm:p-5 lg:p-6' : 'p-4 sm:p-6 lg:p-8'}
        ${integration.borderAccent}`}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-neutral-50 to-transparent rounded-bl-full opacity-80" />

      <div className="relative flex flex-col h-full">
        <div className="flex items-start justify-between gap-4 mb-4">
          <motion.div
            className={`inline-flex items-center justify-center rounded-2xl ${isFeatured ? 'w-14 h-14' : 'w-12 h-12'} ${integration.iconBg} ${integration.iconColor}`}
            whileHover={{ scale: 1.08, y: -3 }}
            transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          >
            <Icon className={isFeatured ? 'w-7 h-7' : 'w-6 h-6'} />
          </motion.div>
          <span className={`text-xs font-semibold uppercase tracking-wider ${integration.iconColor}`}>
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
