import { motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'

const specialties = [
  'Cardiologia',
  'Pediatria',
  'Dermatologia',
  'Ortopedia',
  'Clínica Geral',
]

const proofCards = [
  {
    quote: 'Agora o WhatsApp faz a confirmação automaticamente e a recepção ganha fôlego na rotina.',
    author: 'Dra. Mariana Costa',
    role: 'Cardiologista',
  },
  {
    quote: 'Implementamos com apoio da equipe e ganhamos mais clareza sobre agenda, prontuário e operação.',
    author: 'Dr. Ricardo Mendes',
    role: 'Ortopedista',
  },
  {
    quote: 'O paciente agenda, confirma e a equipe acompanha tudo com menos retrabalho no dia a dia.',
    author: 'Dra. Fernanda Lima',
    role: 'Pediatra',
  },
]

export function TrustSection() {
  return (
    <section className="relative px-4 py-12 sm:py-14 lg:px-8 lg:py-16">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-[2rem] border border-neutral-200/80 bg-white/85 p-5 shadow-[0_24px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl sm:p-7 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple">
                Prova social e contexto
              </p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-neutral-900 sm:text-3xl lg:text-4xl">
                A NAPSE conversa com a realidade de quem atende pacientes todos os dias.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 sm:text-base">
                Reunimos sinais de confiança logo no início porque clínicas e consultórios decidem com base em referência, segurança e aderência real à rotina médica.
              </p>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-neutral-50/80 px-4 py-4 text-sm text-neutral-600 shadow-sm lg:max-w-xs">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4 fill-current" strokeWidth={0} />
                ))}
              </div>
              <p className="mt-3 font-medium text-neutral-800">
                Depoimentos distribuídos ao longo da página mostram como agenda, confirmação, prontuário e operação são percebidos na prática.
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

          <div className="mt-8 grid gap-4 lg:grid-cols-3">
            {proofCards.map((card, index) => (
              <motion.article
                key={card.author}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.45, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-neutral-200/80 bg-gradient-to-br from-white to-neutral-50 p-5 shadow-[0_10px_30px_rgba(15,23,42,0.05)]"
              >
                <Quote className="h-8 w-8 text-nat-purple/30" strokeWidth={1.5} />
                <p className="mt-4 text-sm leading-relaxed text-neutral-700 sm:text-base">{card.quote}</p>
                <div className="mt-5 border-t border-neutral-200 pt-4">
                  <p className="font-semibold text-neutral-900">{card.author}</p>
                  <p className="text-sm text-neutral-500">{card.role}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
