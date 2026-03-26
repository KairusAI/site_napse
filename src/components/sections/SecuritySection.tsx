import { Lock, Shield, Database, FileCheck2 } from 'lucide-react'

const securityPoints = [
  {
    title: 'Conformidade LGPD visível',
    description: 'A landing passa a tratar segurança como parte da proposta de valor, não como nota de rodapé escondida.',
    Icon: Shield,
  },
  {
    title: 'Criptografia e controle de acesso',
    description: 'Deixe claro que os fluxos da clínica exigem proteção, rastreabilidade e acesso organizado por equipe.',
    Icon: Lock,
  },
  {
    title: 'Backups e continuidade operacional',
    description: 'Reforce que a operação não pode parar e que a clínica precisa de previsibilidade para seus dados críticos.',
    Icon: Database,
  },
  {
    title: 'Políticas claras para implantação',
    description: 'Durante a conversa comercial, mostre como segurança, responsabilidade e rotina são tratadas desde o onboarding.',
    Icon: FileCheck2,
  },
]

export function SecuritySection() {
  return (
    <section className="bg-white px-4 py-20 text-neutral-900 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="section-kicker text-nat-blue">
            Segurança e confiança
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Em saúde, a confiança começa quando LGPD e segurança aparecem antes da objeção.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-neutral-600 sm:text-lg">
            Dados clínicos são sensíveis. Por isso, a experiência da landing precisa mostrar logo de cara que a conversa com a NAPSE considera proteção, responsabilidade operacional e continuidade desde o primeiro contato.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {securityPoints.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-nat-blue/10 text-nat-blue">
                <Icon className="h-5 w-5" strokeWidth={1.8} />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-neutral-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-neutral-600">{description}</p>
            </article>
          ))}
        </div>

      </div>
    </section>
  )
}
