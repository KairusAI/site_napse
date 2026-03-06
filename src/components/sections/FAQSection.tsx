import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

type FaqItem = {
  id: string
  question: string
  answer: string
}

const faqData: FaqItem[] = [
  {
    id: '1',
    question: 'Como funciona o período de teste?',
    answer:
      'Você tem 14 dias para testar a NAPSE com acesso completo. Não pedimos cartão de crédito. Se precisar de mais tempo, nossa equipe pode estender conforme o seu processo de avaliação.',
  },
  {
    id: '2',
    question: 'Posso migrar meus dados de outro sistema?',
    answer:
      'Sim. Oferecemos suporte à migração de agendas, cadastros e histórico. O processo é guiado pela nossa equipe para garantir que nada se perca.',
  },
  {
    id: '3',
    question: 'A NAPSE é adequada para clínicas pequenas?',
    answer:
      'Sim. Nossos planos começam para equipes enxutas e escalam conforme você cresce. Você paga pelo que usa e pode evoluir de plano a qualquer momento.',
  },
  {
    id: '4',
    question: 'Como é o suporte técnico?',
    answer:
      'Suporte por chat, e-mail e telefone em horário comercial. Nos planos superiores, há prioridade e acompanhamento dedicado para implementação e dúvidas.',
  },
  {
    id: '5',
    question: 'Os dados da clínica ficam seguros?',
    answer:
      'Sim. Utilizamos infraestrutura em nuvem com criptografia e práticas alinhadas à LGPD. Seus dados são backupados e acessíveis apenas por quem você autorizar.',
  },
]

function FaqAccordionItem({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem
  isOpen: boolean
  onToggle: () => void
}) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onToggle()
    }
  }

  return (
    <div
      className={`border-b border-neutral-200/80 last:border-b-0 transition-all duration-300 ${
        isOpen
          ? 'rounded-xl bg-white/50 backdrop-blur-md shadow-[0_0_32px_rgba(139,92,246,0.2),0_0_12px_rgba(139,92,246,0.1)] border border-white/70 my-1 mx-2 sm:mx-3 px-2 sm:px-3 py-1'
          : ''
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${item.id}`}
        id={`faq-question-${item.id}`}
        className={`relative w-full flex items-center justify-between gap-4 py-4 sm:py-5 pl-5 pr-5 sm:pl-6 sm:pr-6 text-left rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-purple/40 focus-visible:ring-offset-2 ${
          isOpen ? 'bg-transparent' : 'hover:bg-white/50'
        }`}
      >
        <span
          className={`font-semibold text-neutral-900 pr-2 transition-colors ${
            isOpen ? 'text-nat-purple' : ''
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex shrink-0 w-8 h-8 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-nat-purple text-white' : 'bg-nat-purple/15 text-nat-purple'
          }`}
          aria-hidden
        >
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            {isOpen ? (
              <Minus className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            )}
          </motion.span>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${item.id}`}
            role="region"
            aria-labelledby={`faq-question-${item.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 sm:px-6 sm:pb-5 max-h-[280px] overflow-y-auto">
              <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">{item.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function FAQSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id ?? null)

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      ref={ref}
      id="faq"
      className="relative overflow-x-hidden py-24 sm:py-28 lg:py-32"
    >
      <div className="pointer-events-none absolute inset-0 bg-white" />

      {/* Imagem à esquerda (posicionada, não altera o layout) */}
      <motion.div
        className="pointer-events-none absolute left-0 top-[28%] z-0 hidden -translate-y-1/2 lg:block"
        initial={{ opacity: 0, x: -10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/assets/imagem_faq.png"
          alt=""
          className="max-h-[480px] w-auto object-contain xl:max-h-[560px]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-2">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Perguntas frequentes
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
            Tire suas dúvidas sobre a NAPSE e nossa forma de trabalhar.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl ml-auto rounded-2xl border-2 border-neutral-200/90 bg-white/80 bg-gradient-to-br from-white via-neutral-50/80 to-nat-purple/5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_10px_24px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl overflow-hidden"
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          {faqData.map((item) => (
            <FaqAccordionItem
              key={item.id}
              item={item}
              isOpen={openId === item.id}
              onToggle={() => handleToggle(item.id)}
            />
          ))}
        </motion.div>

        <motion.p
          className="mt-14 text-center text-base sm:text-lg text-neutral-600"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Não encontrou sua dúvida?{' '}
          <a
            href="#contato"
            className="font-semibold text-nat-purple hover:underline focus:outline-none focus-visible:underline"
          >
            Fale conosco
          </a>
        </motion.p>
      </div>
    </section>
  )
}
