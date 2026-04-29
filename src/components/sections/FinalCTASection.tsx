import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { DURATION, EASE_OUT } from '@/lib/motion'
import { ArrowRight, CreditCard, Sparkles, X } from 'lucide-react'

export function FinalCTASection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()
  const inView = isInView || Boolean(reduce)

  return (
    <section
      ref={ref}
      id="cta-final"
      className="section-y-tight relative overflow-hidden"
    >
      {/* Fundo da seção: tom diferente para diferenciar */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-100/90 via-neutral-50 to-white" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse 70% 60% at 80% 20%, hsl(var(--primary) / 0.08), transparent 50%)',
        }}
      />

      {/* Imagem à direita (posicionada, não altera o layout – como na FAQ) */}
      <motion.div
        className="pointer-events-none absolute right-0 top-[12%] z-0 hidden -translate-y-1/2 lg:block xl:right-2 2xl:right-4"
        initial={{ opacity: 0, x: reduce ? 0 : 28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: reduce ? 0.01 : 0.5, ease: EASE_OUT }}
      >
        <img
          src="/assets/imagem_cta2.webp"
          alt="Mascote NAPSE convidando para começar"
          className="max-h-[260px] w-auto object-contain sm:max-h-[280px] xl:max-h-[320px] 2xl:max-h-[340px]"
          style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))' }}
        />
      </motion.div>

      <div className="section-shell relative z-10">
        {/* Wrapper do card: borda em gradiente + glow no hover */}
        <motion.div
          className="group/card relative mr-auto max-w-3xl"
          initial={{ opacity: 0, y: reduce ? 0 : 24, scale: reduce ? 1 : 0.98 }}
          animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: reduce ? 0.01 : DURATION.short, ease: EASE_OUT }}
        >
          {/* Glow atrás do card (aparece no hover) */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-[2rem] blur-2xl opacity-0 transition-opacity duration-300 group-hover/card:opacity-70"
            style={{
              backgroundImage:
                'linear-gradient(135deg, hsl(var(--primary) / 0.4), hsl(var(--nat-blue) / 0.4))',
            }}
            aria-hidden
          />

          {/* Borda em gradiente */}
          <div
            className="relative rounded-3xl p-[1px] transition-shadow duration-300 group-hover/card:shadow-[0_30px_60px_-15px_hsl(var(--primary)_/_0.45)]"
            style={{
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.35) 0%, hsl(var(--primary) / 0.5) 50%, hsl(var(--nat-blue) / 0.45) 100%)',
            }}
          >
            {/* Card interno */}
            <div className="relative overflow-hidden rounded-[calc(1.5rem-1px)] bg-[image:var(--gradient-brand)] p-6 sm:p-10 lg:p-12 xl:p-16 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25),0_20px_60px_-15px_hsl(var(--primary)_/_0.35),inset_0_1px_0_rgba(255,255,255,0.2),inset_0_-20px_20px_-10px_rgba(0,0,0,0.12)] backdrop-blur-xl">
              {/* Overlay de luz (radial) */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-60"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 50% at 20% 30%, rgba(255,255,255,0.18), transparent 55%)',
                }}
              />
              {/* Reflexo no canto superior direito */}
              <div
                className="pointer-events-none absolute top-0 right-0 w-1/2 h-1/2 rounded-bl-[100%] opacity-[0.07]"
                style={{
                  background: 'radial-gradient(ellipse 100% 100% at 100% 0%, rgba(255,255,255,0.9), transparent 60%)',
                }}
              />
              {/* Noise sutil */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[calc(1.5rem-1px)] opacity-[0.04] mix-blend-overlay"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
              />
              <div className="relative z-10 flex flex-col gap-6 max-w-xl">
                {/* Label acima do título */}
                <motion.div
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/95 backdrop-blur-sm transition-colors duration-200 hover:border-white/40 hover:bg-white/15"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Sparkles className="h-4 w-4 shrink-0 text-white/90" aria-hidden />
                  <span>Experimente a NAPSE</span>
                </motion.div>

                <motion.h2
                  className="text-2xl font-bold tracking-tight text-white sm:text-4xl lg:text-[2.5rem] leading-tight"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  Pronto para focar no que você faz de melhor?
                </motion.h2>
                <motion.p
                  className="text-base sm:text-lg text-white/90 leading-relaxed"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  14 dias grátis. Sem cartão. Comece em minutos.
                </motion.p>

                <motion.div
                  className="flex flex-col items-center lg:items-start gap-6"
                  initial={{ opacity: 0, y: 12 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  <motion.a
                    href="#contato"
                    className="group/btn relative inline-flex w-fit items-center justify-center gap-2 sm:gap-3 overflow-hidden rounded-xl bg-white px-6 py-3.5 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold text-primary shadow-[0_4px_20px_-4px_rgba(0,0,0,0.2)] transition-shadow duration-200 hover:ring-2 hover:ring-white/30 hover:ring-offset-2 hover:ring-offset-[hsl(var(--primary))] focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[hsl(var(--primary))]"
                    whileHover={{ scale: 1.02, y: -2, boxShadow: '0 12px 32px -8px hsl(var(--primary) / 0.5)' }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="relative z-10">Começar Agora</span>
                    <ArrowRight className="relative z-10 h-6 w-6 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-500 ease-out" aria-hidden />
                  </motion.a>

                  <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-sm">
                      <CreditCard className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                      Sem cartão
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium text-white/95 backdrop-blur-sm">
                      <X className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                      Cancele quando quiser
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
