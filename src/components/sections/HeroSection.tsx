import { motion } from 'framer-motion'

/**
 * Hero Section - texto à esquerda, imagem/vídeo como fundo à direita.
 * Foco em "Clínica em Harmonia".
 */
export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden lg:grid lg:grid-cols-2">
      {/* Coluna esquerda: texto */}
      <div className="relative z-10 flex flex-col justify-center px-6 py-24 lg:px-12 lg:py-32 xl:px-20">
        <div className="max-w-xl">
          <motion.h1
            className="text-4xl font-semibold tracking-tight text-neutral-900 sm:text-5xl lg:text-6xl"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            Clínica em <span className="text-nat-green">Harmonia</span>
          </motion.h1>
          <motion.p
            className="mt-6 text-lg text-neutral-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            Tudo que sua clínica precisa, integrado em um só lugar.
          </motion.p>
        </div>
      </div>

      {/* Coluna direita: vídeo dos mascotes (loop, sem som) */}
      <div className="relative flex min-h-[50vh] items-center justify-center lg:min-h-screen lg:justify-end lg:pr-0 lg:pl-4 xl:pl-8">
        <video
          src="/assets/VideoMascote_hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="h-full max-h-[85vh] w-auto max-w-[85vw] object-contain object-right lg:max-w-[55vw] lg:-translate-x-4 xl:-translate-x-2"
          aria-label="Mascotes Napse: Financeiro, Secretaria, Médico e Marketing"
        />
      </div>
    </section>
  )
}
