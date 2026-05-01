import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import { getWhatsAppUrl } from '@/config/site'
import { EASE_OUT, STAGGER } from '@/lib/motion'

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
  {
    id: '6',
    question: 'Preciso ter experiência com sistemas de gestão?',
    answer:
      'Não. A interface foi desenhada para o dia a dia de clínicas, com onboarding guiado e suporte em português. A curva de aprendizado em geral leva de poucos dias a poucas semanas, conforme o tamanho do time e os fluxos de trabalho da sua clínica.',
  },
  {
    id: '7',
    question: 'A NAPSE gera comprovantes e documentação para faturamento/convênio?',
    answer:
      'O produto acompanha o fluxo clínico, documentação e faturamento conforme a configuração da sua operação e as integrações disponíveis. Na demonstração, nossa equipe conecta a conversa com o que sua clínica de fato precisa emitir: TISS, particular, convênio, etc. Em caso de dúvida específica, podemos alinhar integrações e módulos.',
  },
  {
    id: '8',
    question: 'O suporte é humano ou só chatbot?',
    answer:
      'Há atendimento humano por e-mail, chat e canais oficiais em horário comercial, com prioridade e canais adicionais nos planos Crescimento e Escala, conforme contrato. A ideia é você não ficar sozinho na operação: migração, dúvida de fluxo, integrações — tudo isso com time NAPSE.',
  },
  {
    id: '9',
    question: 'Posso cancelar ou mudar de plano se a clínica crescer ou encolher?',
    answer:
      'Sim, os planos foram pensados para acompanhar sua operação. Trocar de plano, adicionar profissionais e unidades é algo que tratamos de forma comercial/operacional, sem surpresa no contrato — os detalhes concretos ficam nos documentos oficiais e o time de vendas explica antes da assinatura.',
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
  const reduce = useReducedMotion()
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
          ? 'rounded-xl bg-white/50 backdrop-blur-md shadow-[0_0_32px_hsl(var(--primary)_/_0.2),0_0_12px_hsl(var(--primary)_/_0.1)] border border-white/70 my-1 mx-2 sm:mx-3 px-2 sm:px-3 py-1'
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
        className={`relative w-full flex items-center justify-between gap-4 py-4 sm:py-5 pl-5 pr-5 sm:pl-6 sm:pr-6 text-left rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 ${
          isOpen ? 'bg-transparent' : 'hover:bg-white/50'
        }`}
      >
        <span
          className={`font-semibold text-neutral-900 pr-2 transition-colors ${
            isOpen ? 'text-primary' : ''
          }`}
        >
          {item.question}
        </span>
        <span
          className={`flex shrink-0 w-8 h-8 items-center justify-center rounded-full transition-colors ${
            isOpen ? 'bg-primary text-primary-foreground' : 'bg-primary/15 text-primary'
          }`}
          aria-hidden
        >
          <motion.span
            initial={false}
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: reduce ? 0.01 : 0.25, ease: EASE_OUT }}
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
            transition={{ duration: reduce ? 0.01 : 0.3, ease: EASE_OUT }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-4 sm:px-6 sm:pb-5 max-h-[min(40vh,360px)] overflow-y-auto">
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
  const reduce = useReducedMotion()
  const inView = isInView || Boolean(reduce)
  const [openId, setOpenId] = useState<string | null>(faqData[0]?.id ?? null)
  const whatsappFaqHref = getWhatsAppUrl('Tenho uma dúvida após ler o FAQ — podem me ajudar?')
  const whatsappFaqIsExternal = Boolean(whatsappFaqHref?.startsWith('http'))

  const handleToggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id))
  }

  return (
    <section
      ref={ref}
      id="faq"
      className="section-y relative overflow-x-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-white" />

      {/* Imagem à esquerda (posicionada, não altera o layout) */}
      <motion.div
        className="pointer-events-none absolute -left-10 top-[28%] z-0 hidden -translate-y-1/2 lg:block xl:-left-16 2xl:-left-20"
        initial={{ opacity: 0, x: reduce ? 0 : -24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduce ? 0.01 : 0.85, ease: EASE_OUT }}
      >
        <img
          src="/assets/imagem_faq.webp"
          alt="Mascote NAPSE ajudando com dúvidas frequentes"
          className="max-h-[480px] w-auto object-contain xl:max-h-[560px]"
        />
      </motion.div>

      <div className="section-shell relative z-10">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: reduce ? 0.01 : 0.85, ease: EASE_OUT }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary lg:mb-3">
            FAQ
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight">
            Dúvidas comuns
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 lg:mt-4">
            Respostas diretas sobre teste, migração, planos e segurança.
          </p>
        </motion.div>

        {/* Mesma caixa horizontal: centro do acordeão e do CTA coincidem */}
        <div className="mx-auto w-full max-w-3xl lg:ml-auto lg:mr-16 xl:mr-24 2xl:mr-32">
          <motion.div
            className="w-full rounded-2xl border-2 border-neutral-200/90 bg-white/80 bg-gradient-to-br from-white via-neutral-50/80 to-primary/5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.06),0_10px_24px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] backdrop-blur-xl overflow-hidden"
            initial={{ opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.8, delay: reduce ? 0 : 0.2, ease: EASE_OUT }}
          >
            {faqData.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: reduce ? 0 : 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: reduce ? 0.01 : 0.55,
                  delay: reduce ? 0 : 0.35 + index * STAGGER * 1.75,
                  ease: EASE_OUT,
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
            className="mt-14 w-full text-center text-base text-neutral-600 sm:text-lg"
            initial={{ opacity: 0, y: reduce ? 0 : 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: reduce ? 0.01 : 0.6, delay: reduce ? 0 : 0.7, ease: EASE_OUT }}
          >
            Não encontrou sua dúvida?{' '}
            <a
              href="#contato"
              className="font-semibold text-primary hover:underline focus:outline-none focus-visible:underline"
            >
              Fale conosco
            </a>
            {whatsappFaqHref && (
              <>
                ,{' '}
                <a
                  href={whatsappFaqHref}
                  target={whatsappFaqIsExternal ? '_blank' : undefined}
                  rel={whatsappFaqIsExternal ? 'noopener noreferrer' : undefined}
                  className="font-semibold text-primary hover:underline focus:outline-none focus-visible:underline"
                >
                  prefere o WhatsApp
                </a>
              </>
            )}
            .
          </motion.p>
        </div>
      </div>
    </section>
  )
}
