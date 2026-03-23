import { motion } from 'framer-motion'
import { ArrowRight, CalendarClock, MessagesSquare, LayoutDashboard } from 'lucide-react'

const steps = [
  {
    title: 'Centralize a operação',
    description: 'Agenda, prontuário, marketing e financeiro deixam de ficar espalhados entre planilhas, WhatsApp e ferramentas desconectadas.',
    Icon: LayoutDashboard,
  },
  {
    title: 'Automatize a rotina crítica',
    description: 'Confirmações, lembretes e fluxos operacionais saem do improviso e passam a seguir uma lógica consistente para a equipe.',
    Icon: MessagesSquare,
  },
  {
    title: 'Ganhe previsibilidade diária',
    description: 'Sua clínica acompanha agenda, ocupação e produtividade com mais clareza para decidir com menos atrito.',
    Icon: CalendarClock,
  },
]

export function ProductDemoSection() {
  return (
    <section id="demonstracao" className="relative overflow-hidden bg-gradient-to-b from-white to-neutral-50/80 px-4 py-20 lg:px-8 lg:py-24">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_65%_55%_at_70%_15%,rgba(59,130,246,0.08),transparent_55%)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-blue">
              Demonstração da proposta
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Em poucos segundos, o visitante entende como a operação passa a fluir.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-neutral-600">
              Mesmo antes de uma demonstração comercial, a landing precisa mostrar que a NAPSE organiza as áreas mais sensíveis da clínica e reduz a sensação de caos operacional.
            </p>

            <div className="mt-8 space-y-4">
              {steps.map(({ title, description, Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-neutral-200/80 bg-white/85 p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-nat-blue/10 text-nat-blue">
                      <Icon className="h-5 w-5" strokeWidth={1.8} />
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-neutral-900">{title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-neutral-600">{description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <a
              href="#contato"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-nat-blue transition-colors hover:text-nat-purple"
            >
              Solicitar uma demonstração consultiva
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[2rem] border border-neutral-200/80 bg-white p-4 shadow-[0_24px_60px_rgba(15,23,42,0.1)]"
          >
            <div className="rounded-[1.5rem] border border-neutral-200 bg-neutral-50 p-3 sm:p-4">
              <div className="flex items-center gap-2 border-b border-neutral-200 pb-3">
                <span className="h-3 w-3 rounded-full bg-rose-300" />
                <span className="h-3 w-3 rounded-full bg-amber-300" />
                <span className="h-3 w-3 rounded-full bg-emerald-300" />
                <p className="ml-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
                  Vista de operação integrada
                </p>
              </div>
              <img
                src="/assets/imagem_integracoes.png"
                alt="Visual da operação integrada da NAPSE com agenda, comunicação e rotinas clínicas conectadas"
                className="mt-4 w-full rounded-[1.25rem] object-cover shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
