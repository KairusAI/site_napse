import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Mail, Send, CheckCircle } from 'lucide-react'

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
      className="relative overflow-hidden py-20 sm:py-24 lg:py-32"
    >
      {/* Fundo com gradiente suave — evita flat white */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-neutral-50/60 to-white" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, rgba(99,102,241,0.08), transparent 60%)`,
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple mb-3">
            Fale conosco
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 mb-4">
            Comece sua jornada com a NAPSE
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 max-w-2xl mx-auto">
            Preencha o formulário ou entre em contato direto. Nossa equipe responde em até 24 horas.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Formulário */}
          <div className="rounded-2xl border border-neutral-200/90 bg-white/90 backdrop-blur-xl p-6 sm:p-8 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 rounded-full bg-nat-green/15 flex items-center justify-center mb-4">
                  <CheckCircle className="w-8 h-8 text-nat-green" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                  Mensagem enviada!
                </h3>
                <p className="text-neutral-600">
                  Entraremos em contato em até 24 horas.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-purple focus:ring-2 focus:ring-nat-purple/20 focus:outline-none transition-colors"
                    placeholder="Seu nome"
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
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-purple focus:ring-2 focus:ring-nat-purple/20 focus:outline-none transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-nat-purple focus:ring-2 focus:ring-nat-purple/20 focus:outline-none transition-colors resize-none"
                    placeholder="Conte um pouco sobre sua clínica e o que você busca..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-nat-purple px-6 py-4 text-base font-semibold text-white shadow-[0_4px_20px_-4px_hsl(262_83%_52%_/_0.5)] transition-all hover:shadow-[0_8px_28px_-4px_hsl(262_83%_52%_/_0.5)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-nat-purple focus:ring-offset-2"
                >
                  <Send className="w-5 h-5" />
                  Enviar mensagem
                </button>
              </form>
            )}
          </div>

          {/* Contato direto */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-neutral-200/80 bg-white/70 backdrop-blur-sm p-6 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                Ou fale direto conosco
              </h3>
              <div className="space-y-4">
                <a
                  href="https://wa.me/5511999999999"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 transition-all hover:border-nat-green/50 hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-xl bg-nat-green/10 flex items-center justify-center group-hover:bg-nat-green/20 transition-colors">
                    <MessageCircle className="w-6 h-6 text-nat-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">WhatsApp</p>
                    <p className="text-sm text-neutral-600">Resposta rápida</p>
                  </div>
                </a>
                <a
                  href="mailto:contato@napse.com.br"
                  className="flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 transition-all hover:border-nat-purple/50 hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-xl bg-nat-purple/10 flex items-center justify-center group-hover:bg-nat-purple/20 transition-colors">
                    <Mail className="w-6 h-6 text-nat-purple" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">E-mail</p>
                    <p className="text-sm text-neutral-600">contato@napse.com.br</p>
                  </div>
                </a>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              Sem compromisso. Nossa equipe está pronta para ajudar sua clínica a dar o próximo passo.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
