import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Mail, Send, CheckCircle } from 'lucide-react'

const challengeOptions = [
  'Organizar agenda e confirmações',
  'Centralizar prontuário e operação',
  'Melhorar financeiro e relatórios',
  'Ganhar previsibilidade comercial',
  'Entender o melhor setup para a clínica',
]

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section
      ref={ref}
      id="contato"
      className="bg-white py-20 sm:py-24 lg:py-32"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker text-nat-blue mb-3">
            Fale com um especialista
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Vamos entender a operação da sua clínica
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-3xl mx-auto">
            Preencha o formulário com o contexto da sua operação. Nossa equipe analisa as
            informações e entra em contato com você para orientar os próximos passos.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-[1.25fr_0.95fr] gap-8 lg:gap-12 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-nat-green/15 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-nat-green" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Recebemos seu contato
                </h3>
                <p className="max-w-md text-neutral-600">
                  Nosso time vai analisar os detalhes enviados e entrar em contato com você.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Nome completo
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                       className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="clinic" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Nome da clínica
                    </label>
                    <input
                      id="clinic"
                      name="clinic"
                      type="text"
                      required
                       className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors"
                      placeholder="Nome da clínica"
                    />
                  </div>
                  <div>
                    <label htmlFor="whatsapp" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      autoComplete="tel"
                      required
                       className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                       className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-[1fr_220px]">
                  <div>
                    <label htmlFor="challenge" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Principal desafio hoje
                    </label>
                    <select
                      id="challenge"
                      name="challenge"
                      required
                      defaultValue=""
                       className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors"
                    >
                      <option value="" disabled>
                        Selecione uma opção
                      </option>
                      {challengeOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="doctors" className="block text-sm font-medium text-neutral-700 mb-1.5">
                      Quantidade de médicos
                    </label>
                    <input
                      id="doctors"
                      name="doctors"
                      type="text"
                      required
                       className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors"
                      placeholder="Ex: 3 a 5"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Conte um pouco sobre sua operação
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                     className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-blue focus:ring-2 focus:ring-nat-blue/20 focus:outline-none transition-colors resize-none"
                    placeholder="Ex: hoje usamos planilha e WhatsApp para confirmar agenda, queremos centralizar atendimento, prontuário e financeiro."
                  />
                </div>

                <div className="rounded-2xl border border-nat-blue/10 bg-nat-blue/5 px-4 py-3 text-sm text-neutral-600">
                  Este formulário é o principal ponto de contato comercial da landing. Depois você pode substituir manualmente o destino por um form externo, sem mudar a narrativa da página.
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-gradient px-6 py-4 text-base font-semibold text-white shadow-brand transition-all hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-nat-blue focus:ring-offset-2"
                >
                  <Send className="w-5 h-5" />
                  Falar com um especialista
                </button>
              </form>
            )}
          </div>

          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="mb-3 inline-flex rounded-full bg-nat-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-nat-green">
                Fluxo comercial
              </p>
              <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                O que acontece depois do envio
              </h3>
              <div className="space-y-3 text-sm text-neutral-600">
                <p>1. Recebemos o contexto da sua clínica e avaliamos o momento da operação.</p>
                <p>2. Nosso time organiza o encaminhamento comercial com o sócio responsável.</p>
                <p>3. Entramos em contato para aprofundar prioridades, estrutura e melhor aderência do produto.</p>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Canais de apoio
              </h3>
              <div className="space-y-4">
                <a
                  href="#contato"
                  className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-nat-blue/50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-nat-blue/10 transition-colors group-hover:bg-nat-blue/20">
                    <MessageCircle className="w-6 h-6 text-nat-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">WhatsApp comercial</p>
                    <p className="text-sm text-neutral-600">Direcionado a partir do formulário</p>
                  </div>
                </a>
                <a
                  href="#contato"
                  className="group flex items-center gap-4 rounded-xl border border-neutral-200 bg-white p-4 transition-all hover:border-nat-blue/50 hover:shadow-md"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-nat-blue/10 transition-colors group-hover:bg-nat-blue/20">
                    <Mail className="w-6 h-6 text-nat-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Contato consultivo</p>
                    <p className="text-sm text-neutral-600">Análise guiada da operação e próximos passos</p>
                  </div>
                </a>
              </div>
            </div>

            <p className="text-sm text-neutral-500">
              Sem compromisso inicial. O foco aqui é entender o seu contexto e abrir a conversa comercial certa.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
