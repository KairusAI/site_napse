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
      '14 dias de acesso completo, sem cartão de crédito. Teste agenda, prontuário, confirmações e relatórios. Se precisar de mais tempo para avaliar, nossa equipe pode estender.',
  },
  {
    id: '2',
    question: 'Posso migrar meus dados de outro sistema?',
    answer:
      'Sim. Migramos agendas, cadastros de pacientes e histórico. O processo é guiado pela nossa equipe — você não precisa fazer nada sozinho.',
  },
  {
    id: '3',
    question: 'Funciona para consultório solo?',
    answer:
      'Sim. O plano Essencial foi feito para quem está começando ou tem equipe pequena. Você paga pelo que usa e pode evoluir quando a clínica crescer.',
  },
  {
    id: '4',
    question: 'Como é o suporte?',
    answer:
      'Chat, e-mail e telefone em horário comercial. Resposta em até 24h. Nos planos Crescimento e Escala, há prioridade e acompanhamento dedicado.',
  },
  {
    id: '5',
    question: 'Meus dados ficam seguros?',
    answer:
      'Sim. Infraestrutura em nuvem, criptografia e conformidade com LGPD. Backup automático. Acesso apenas por quem você autorizar.',
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
          ? 'rounded-xl border border-neutral-200 bg-neutral-50 my-1 mx-2 sm:mx-3 px-2 sm:px-3 py-1'
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
        className={`relative w-full flex items-center justify-between gap-4 py-4 sm:py-5 pl-5 pr-5 sm:pl-6 sm:pr-6 text-left rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-blue/40 focus-visible:ring-offset-2 ${
          isOpen ? 'bg-transparent' : 'hover:bg-white/50'
        }`}
      >
        <span
          className={`font-semibold text-neutral-900 pr-2 transition-colors ${
            isOpen ? 'text-nat-blue' : ''
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex shrink-0 w-8 h-8 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-nat-blue text-white' : 'bg-nat-blue/15 text-nat-blue'
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
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/assets/imagem_faq.png"
          alt="Mascote NAPSE ajudando com dúvidas frequentes"
          className="max-h-[480px] w-auto object-contain xl:max-h-[560px]"
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker text-nat-blue mb-2">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Dúvidas comuns
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-xl mx-auto">
            Respostas diretas para as principais dúvidas antes de falar com nosso especialista.
          </p>
        </motion.div>

        <motion.div
          className="max-w-3xl ml-auto overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          {faqData.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.55,
                delay: 0.35 + index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <FaqAccordionItem
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.p
          className="mt-14 text-center text-base sm:text-lg text-neutral-600"
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          Não encontrou sua dúvida?{' '}
          <a
            href="#contato"
            className="font-semibold text-nat-blue hover:underline focus:outline-none focus-visible:underline"
          >
            Fale com um especialista
          </a>
        </motion.p>
      </div>
    </section>
  )
}
