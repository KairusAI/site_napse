import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

const DASH_IMG = '/assets/dashboard_fundo.png'
const MOBILE_IMG = '/assets/print_mobile.png'

/** Sombras 3D — inline (Tailwind quebra múltiplas drop-shadow com rgba). */
const MOCK_SHADOW_PHONE =
  'drop-shadow(0 8px 16px rgba(15, 23, 42, 0.12)) drop-shadow(0 20px 40px rgba(15, 23, 42, 0.14))'
const MOCK_SHADOW_LAPTOP =
  'drop-shadow(0 8px 18px rgba(15, 23, 42, 0.12)) drop-shadow(0 22px 48px rgba(15, 23, 42, 0.15))'
const MOCK_SHADOW_REDUCED_PHONE =
  'drop-shadow(0 6px 14px rgba(15, 23, 42, 0.1)) drop-shadow(0 16px 32px rgba(15, 23, 42, 0.12))'
const MOCK_SHADOW_REDUCED_LAPTOP =
  'drop-shadow(0 8px 18px rgba(15, 23, 42, 0.1)) drop-shadow(0 18px 40px rgba(15, 23, 42, 0.12))'

const easeOut = [0.22, 1, 0.36, 1] as const

export function AppShowcaseSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' })
  const reduceMotion = useReducedMotion()

  return (
    <section
      ref={sectionRef}
      id="plataforma"
      className="relative overflow-hidden bg-[#f4f6f9]"
      aria-labelledby="app-showcase-heading"
    >
      <div className="relative z-10 mx-auto w-full max-w-[100rem] bg-gradient-to-b from-slate-200/25 via-transparent to-slate-200/20 px-4 pb-16 pt-12 sm:px-6 sm:pb-20 sm:pt-16 lg:px-6 lg:pb-24 lg:pt-20">
        <motion.div
          className="mx-auto mb-10 max-w-3xl text-center lg:max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.25, ease: easeOut }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple lg:mb-3">
            Plataforma
          </p>
          <h2
            id="app-showcase-heading"
            className="text-2xl font-semibold text-neutral-900 sm:text-5xl sm:font-bold sm:tracking-tight"
          >
            O mesmo painel no consultório e em qualquer lugar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-neutral-600">
            Interface pensada para o dia a dia da clínica — responsiva no celular e confortável no
            computador.
          </p>
        </motion.div>

        <div className="mx-auto -mt-1 flex max-w-5xl flex-row items-end justify-center gap-2 sm:gap-3 md:gap-4 lg:-mt-4 lg:max-w-6xl lg:items-center lg:gap-12 xl:gap-16">
          {/* Mockup celular — entra da esquerda + sobe */}
          <motion.div
            className="relative w-[min(88px,22vw)] shrink-0 sm:w-[min(120px,26vw)] md:w-[min(154px,32vw)] lg:w-[min(186px,60vw)] [perspective:960px]"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 48, scale: 0.9, x: -36, rotateZ: -2 }
            }
            animate={
              isInView
                ? reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1, x: 0, rotateZ: 0 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 48, scale: 0.9, x: -36, rotateZ: -2 }
            }
            transition={{
              duration: reduceMotion ? 0.8 : 1.7,
              delay: reduceMotion ? 0.15 : 0.38,
              ease: easeOut,
            }}
          >
            <div
              className={
                reduceMotion
                  ? 'relative'
                  : 'relative origin-bottom transform-gpu will-change-transform [transform:rotateY(10deg)_rotateX(4deg)] sm:[transform:rotateY(14deg)_rotateX(5deg)] md:[transform:rotateY(18deg)_rotateX(4deg)] lg:[transform:rotateY(22deg)_rotateX(4deg)]'
              }
              style={{
                filter: reduceMotion ? MOCK_SHADOW_REDUCED_PHONE : MOCK_SHADOW_PHONE,
              }}
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
                  src={MOBILE_IMG}
                  alt="Dashboard NAPSE em visualização mobile"
                  className="h-full w-full object-cover object-left-top"
                  loading="lazy"
                  decoding="async"
                />
              </div>
            </div>
          </motion.div>

          {/* Mockup notebook — entra da direita + sobe (delay maior) */}
          <motion.div
            className="relative min-w-0 flex-1 max-w-[min(252px,calc(100vw-7.5rem))] sm:max-w-[min(320px,calc(100vw-8rem))] md:max-w-[min(420px,calc(100vw-9rem))] [perspective:960px] lg:min-w-0 lg:flex-1 lg:max-w-[min(100%,720px)] lg:shrink-0"
            initial={
              reduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 48, scale: 0.9, x: 40, rotateZ: 2 }
            }
            animate={
              isInView
                ? reduceMotion
                  ? { opacity: 1 }
                  : { opacity: 1, y: 0, scale: 1, x: 0, rotateZ: 0 }
                : reduceMotion
                  ? { opacity: 0 }
                  : { opacity: 0, y: 48, scale: 0.9, x: 40, rotateZ: 2 }
            }
            transition={{
              duration: reduceMotion ? 0.8 : 1.7,
              delay: reduceMotion ? 0.32 : 0.68,
              ease: easeOut,
            }}
          >
            <div
              className={
                reduceMotion
                  ? 'relative'
                  : 'relative origin-bottom transform-gpu will-change-transform [transform:rotateY(-8deg)_rotateX(4deg)] sm:[transform:rotateY(-12deg)_rotateX(5deg)] md:[transform:rotateY(-16deg)_rotateX(4deg)] lg:[transform:rotateY(-20deg)_rotateX(4deg)]'
              }
              style={{
                filter: reduceMotion ? MOCK_SHADOW_REDUCED_LAPTOP : MOCK_SHADOW_LAPTOP,
              }}
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
          </motion.div>
        </div>
      </div>
    </section>
  )
}
