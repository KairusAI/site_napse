import { Star } from 'lucide-react'

const specialties = [
  'Cardiologia',
  'Pediatria',
  'Dermatologia',
  'Ortopedia',
  'Clínica Geral',
]

export function TrustSection() {
  return (
    <section className="bg-white px-4 py-12 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-neutral-200 bg-white p-5 shadow-sm sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="section-kicker text-nat-blue">
                NAPSE em operação
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                Quem vive a rotina da clínica confirma: menos atrito, mais previsibilidade.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Antes de tomar uma decisão, o decisor precisa da confiança. A NAPSE entrega a segurança de que a clínica está em boas mãos, com um sistema altamente integrado e seguro.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 px-4 py-4 text-sm text-neutral-600 shadow-sm lg:max-w-xs">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 font-medium text-neutral-800">
                O unico sistema que conecta agenda, prontuário, marketing, financeiro, criacao de prontuario com assinatura digital em um unico lugar.
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <span
                key={specialty}
                className="rounded-full border border-neutral-200 bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-neutral-600 shadow-sm"
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
