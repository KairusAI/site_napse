import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { DURATION, EASE_OUT } from '@/lib/motion'
import { Mail, Send, CheckCircle, HelpCircle, MessageCircle } from 'lucide-react'
import { getWhatsAppUrl, site } from '@/config/site'

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const inView = isInView || Boolean(reduce)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const whatsappHref = getWhatsAppUrl('Quero falar com um especialista sobre a NAPSE para minha clínica.')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrorMessage(null)
    if (isSubmitting) return

    const form = e.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()

    if (!name || !email || !message) {
      setErrorMessage('Preencha nome, e-mail e mensagem.')
      return
    }

    setIsSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })

      const payload = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string; details?: string; status?: number }
        | null

      if (!res.ok || !payload?.ok) {
        const parts: string[] = ['Não foi possível enviar agora.']
        if (payload?.error === 'MISSING_RESEND_API_KEY') {
          parts.push('Configuração do servidor pendente (RESEND_API_KEY).')
        } else if (payload?.error) {
          parts.push(`Erro: ${payload.error}.`)
        } else {
          parts.push(`Erro HTTP ${res.status}.`)
        }
        parts.push('Tente novamente ou use o e-mail abaixo.')
        setErrorMessage(parts.join(' '))
        return
      }

      setSubmitted(true)
      form.reset()
    } catch {
      setErrorMessage('Não foi possível enviar agora. Tente novamente ou use o e-mail abaixo.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      ref={ref}
      id="contato"
      className="section-y relative overflow-hidden"
    >
      {/* Fundo com gradiente suave — evita flat white */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-neutral-50/60 to-white" />
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: `radial-gradient(ellipse 60% 50% at 50% 0%, hsl(var(--primary) / 0.08), transparent 60%)`,
        }}
      />

      <div className="section-shell relative z-10">
        <motion.div
          className="mb-10 text-center"
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0.01 : DURATION.short, ease: EASE_OUT }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-primary lg:mb-3">
            Fale conosco
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight">
            Fale com um especialista
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 lg:mt-4">
            Conte sobre sua clínica. Por e-mail, respondemos em até 24h em dias úteis — sem compromisso.
            {whatsappHref && (
              <>
                {' '}
                No WhatsApp, atendemos em horário comercial: {site.businessHours}
              </>
            )}
          </p>
        </motion.div>

        <motion.div
          className="mx-auto grid max-w-4xl grid-cols-1 items-start gap-8 lg:grid-cols-2 lg:gap-12"
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: reduce ? 0.01 : DURATION.short, delay: reduce ? 0 : 0.12, ease: EASE_OUT }}
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
                <p className="rounded-xl border border-neutral-200/80 bg-neutral-50/80 px-3 py-2.5 text-xs leading-relaxed text-neutral-600">
                  Ao enviar, você concorda com a{' '}
                  <Link to="/politica-de-privacidade" className="font-medium text-primary underline-offset-2 hover:underline">
                    Política de Privacidade
                  </Link>
                  .
                </p>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-neutral-700 mb-1.5">
                    Nome completo
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
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
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors"
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
                    className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3 text-neutral-900 placeholder:text-neutral-400 focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none transition-colors resize-none"
                    placeholder="Ex: consultório com 2 médicos, quero migrar da planilha, preciso de faturamento TISS..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-4 text-base font-semibold text-primary-foreground shadow-[0_4px_20px_-4px_hsl(var(--primary)_/_0.5)] transition-all hover:shadow-[0_8px_28px_-4px_hsl(var(--primary)_/_0.5)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:opacity-70 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                >
                  <Send className="w-5 h-5" />
                  {isSubmitting ? 'Enviando…' : 'Enviar mensagem'}
                </button>
                {errorMessage && (
                  <p className="text-sm text-red-600" role="alert">
                    {errorMessage}
                  </p>
                )}
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
                  href={import.meta.env.VITE_GMAIL_URL}
                  className="flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 transition-all hover:border-primary/50 hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">E-mail</p>
                    <p className="text-sm text-neutral-600">{import.meta.env.VITE_GMAIL_URL}</p>
                  </div>
                </a>
                {whatsappHref && (
                  <a
                    href={whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 transition-all hover:border-emerald-500/50 hover:shadow-md group"
                  >
                    <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
                      <MessageCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-neutral-900">Falar com especialista no WhatsApp</p>
                      <p className="text-sm text-neutral-600">
                        {site.businessHours} Primeira resposta em até 24h em dias úteis.
                      </p>
                    </div>
                  </a>
                )}
                <Link
                  to="/#faq"
                  className="flex items-center gap-4 rounded-xl border border-neutral-200/80 bg-white p-4 transition-all hover:border-nat-blue/50 hover:shadow-md group"
                >
                  <div className="w-12 h-12 rounded-xl bg-nat-blue/10 flex items-center justify-center group-hover:bg-nat-blue/20 transition-colors">
                    <HelpCircle className="w-6 h-6 text-nat-blue" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">Dúvidas frequentes</p>
                    <p className="text-sm text-neutral-600">Respostas sobre planos e uso</p>
                  </div>
                </Link>
              </div>
            </div>
            <p className="text-sm text-neutral-500">
              Sem compromisso. Tire dúvidas, peça uma demonstração ou comece seu teste grátis.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
