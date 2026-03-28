import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const DASH_IMG = '/assets/dashboard_fundo.png'

export function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="plataforma"
      className="relative overflow-hidden bg-[#fcfcfc]"
      aria-labelledby="app-showcase-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[100rem] px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-6 lg:pb-24 lg:pt-20">
        <motion.div
          className="mx-auto mb-6 max-w-3xl text-center lg:mb-8 lg:max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-blue lg:mb-3">
            Plataforma
          </p>
          <h2
            id="app-showcase-heading"
            className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight"
          >
            O mesmo painel no consultório e em qualquer lugar
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 lg:mt-4 lg:text-base">
            Interface pensada para o dia a dia da clínica — responsiva no celular e confortável no
            computador.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto -mt-1 flex max-w-5xl flex-row items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:-mt-4 lg:max-w-6xl lg:items-center lg:gap-12 xl:gap-16"
          initial={{ opacity: 0, y: 28 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Mockup celular — rotateY positivo: “vira” para o centro (direita) */}
          <div className="relative w-[min(88px,22vw)] shrink-0 sm:w-[min(120px,26vw)] md:w-[min(154px,32vw)] lg:w-[min(186px,60vw)] [perspective:960px]">
            <div
              className={
                reduceMotion
                  ? 'relative drop-shadow-[0_12px_28px_-8px_rgba(15,23,42,0.35)] sm:drop-shadow-[0_20px_40px_-10px_rgba(15,23,42,0.35)]'
                  : 'relative origin-bottom transform-gpu will-change-transform drop-shadow-[0_16px_32px_-10px_rgba(15,23,42,0.4)] sm:drop-shadow-[0_28px_48px_-14px_rgba(15,23,42,0.42)] [transform:rotateY(10deg)_rotateX(4deg)] sm:[transform:rotateY(14deg)_rotateX(5deg)] md:[transform:rotateY(18deg)_rotateX(4deg)] lg:[transform:rotateY(22deg)_rotateX(4deg)]'
              }
            >
              <div
                className="relative aspect-[9/19.5] overflow-hidden rounded-[1.1rem] border-[4px] border-neutral-800 bg-neutral-800 shadow-inner sm:rounded-[1.5rem] sm:border-[6px] lg:rounded-[1.875rem] lg:border-[8px]"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.06)' }}
              >
                <div
                  className="absolute left-1/2 top-1 z-10 h-2.5 w-10 -translate-x-1/2 rounded-full bg-neutral-900/90 sm:top-1.5 sm:h-3.5 sm:w-14 lg:h-4 lg:w-[4.25rem]"
                  aria-hidden
                />
                <img
                  src={DASH_IMG}
                  alt="Dashboard NAPSE em visualização mobile"
                  className="h-full w-full object-cover object-left-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </div>

          {/* Mockup notebook — rotateY negativo: “vira” para o centro (esquerda) */}
          <div className="relative min-w-0 flex-1 max-w-[min(252px,calc(100vw-7.5rem))] sm:max-w-[min(320px,calc(100vw-8rem))] md:max-w-[min(420px,calc(100vw-9rem))] [perspective:960px] lg:min-w-0 lg:flex-1 lg:max-w-[min(100%,720px)] lg:shrink-0">
            <div
              className={
                reduceMotion
                  ? 'relative drop-shadow-[0_16px_36px_-12px_rgba(15,23,42,0.36)] sm:drop-shadow-[0_28px_56px_-16px_rgba(15,23,42,0.38)]'
                  : 'relative origin-bottom transform-gpu will-change-transform drop-shadow-[0_20px_40px_-14px_rgba(15,23,42,0.42)] sm:drop-shadow-[0_36px_60px_-18px_rgba(15,23,42,0.44)] [transform:rotateY(-8deg)_rotateX(4deg)] sm:[transform:rotateY(-12deg)_rotateX(5deg)] md:[transform:rotateY(-16deg)_rotateX(4deg)] lg:[transform:rotateY(-20deg)_rotateX(4deg)]'
              }
            >
              <div className="rounded-t-lg bg-gradient-to-b from-neutral-700 to-neutral-800 px-2 pb-1.5 pt-2 shadow-lg sm:rounded-t-xl sm:px-4 sm:pb-2 sm:pt-2.5 lg:px-5 lg:pt-3">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-400/90 sm:h-2.5 sm:w-2.5" aria-hidden />
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400/90 sm:h-2.5 sm:w-2.5" aria-hidden />
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400/90 sm:h-2.5 sm:w-2.5" aria-hidden />
                </div>
              </div>
              <div className="overflow-hidden rounded-b-md border border-t-0 border-neutral-700 bg-neutral-800 p-1 shadow-xl sm:rounded-b-lg sm:p-1.5 lg:p-2">
                <div className="overflow-hidden rounded-sm bg-neutral-900/40 ring-1 ring-white/10 sm:rounded-md">
                  <img
                    src={DASH_IMG}
                    alt="Dashboard NAPSE em visualização desktop"
                    className="w-full object-cover object-top"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <div
                className="mx-auto mt-0 h-1.5 w-[72%] rounded-b-md bg-gradient-to-b from-neutral-600 to-neutral-700 shadow-md sm:h-2 sm:rounded-b-lg lg:h-2.5 lg:w-[68%]"
                aria-hidden
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
