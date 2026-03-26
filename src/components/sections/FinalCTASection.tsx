import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, ClipboardList, Sparkles, Users } from 'lucide-react'

export function FinalCTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      ref={ref}
      id="cta-final"
      className="relative overflow-hidden bg-white py-16 sm:py-20 lg:py-24"
    >
      <motion.div
        className="pointer-events-none absolute right-0 top-[12%] z-0 hidden -translate-y-1/2 lg:block"
        initial={{ opacity: 0, x: 10 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <img
          src="/assets/imagem_cta2.png"
          alt="Mascote NAPSE convidando para começar"
          className="max-h-[420px] w-auto object-contain xl:max-h-[500px]"
          style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}
        />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          className="relative mr-auto max-w-3xl rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:p-10 lg:p-12"
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex max-w-xl flex-col gap-6">
            <motion.div
              className="inline-flex w-fit items-center gap-2 rounded-full border border-nat-blue/20 bg-nat-blue/10 px-4 py-1.5 text-sm font-medium text-nat-blue"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <Sparkles className="h-4 w-4 shrink-0" aria-hidden />
              <span>Experimente a NAPSE</span>
            </motion.div>

            <motion.h2
              className="text-2xl font-bold leading-tight tracking-tight text-neutral-900 sm:text-4xl lg:text-[2.5rem]"
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              Vamos descobrir o melhor caminho para a sua clínica?
            </motion.h2>
            <motion.p
              className="text-base leading-relaxed text-neutral-600 sm:text-lg"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              Antes de qualquer decisão, entendemos sua operação, prioridades e momento de crescimento para indicar como a NAPSE pode ajudar.
            </motion.p>

            <motion.div
              className="flex flex-col items-center gap-6 lg:items-start"
              initial={{ opacity: 0, y: 12 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href="#contato"
                className="group/btn relative inline-flex w-fit items-center justify-center gap-2 overflow-hidden rounded-xl bg-brand-gradient px-6 py-3.5 text-base font-semibold text-white shadow-brand transition-all duration-200 hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-nat-blue focus-visible:ring-offset-2 sm:gap-3 sm:px-10 sm:py-5 sm:text-lg"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <span className="relative z-10">Falar com um especialista</span>
                <ArrowRight className="relative z-10 h-6 w-6 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
              </motion.a>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                  <ClipboardList className="h-4 w-4 shrink-0" aria-hidden />
                  Formulário consultivo
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-100 px-4 py-2 text-sm font-medium text-neutral-700">
                  <Users className="h-4 w-4 shrink-0" aria-hidden />
                  Contato comercial humanizado
                </span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
