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
    <section id="demonstracao" className="bg-white px-4 py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:gap-12">
          <div>
            <p className="section-kicker text-nat-blue">
              Demonstração da NAPSE
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-900 sm:text-4xl lg:text-5xl">
              Agende, prontuário, marketing, financeiro e confirmações conectados para reduzir retrabalho e dar mais clareza à operação da clínica.
            </h2>

            <div className="mt-8 space-y-4">
              {steps.map(({ title, description, Icon }) => (
                <div
                  key={title}
                  className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm"
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
        </div>
      </div>
    </section>
  )
}
