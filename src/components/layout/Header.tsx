import { motion } from 'framer-motion'

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <motion.span
          className="text-xl font-semibold text-neutral-900"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          Napse
        </motion.span>
        <nav className="hidden sm:flex items-center gap-8 text-sm text-neutral-600">
          <a href="#hero" className="hover:text-neutral-900 transition-colors">Início</a>
          <a href="#funcionalidades" className="hover:text-neutral-900 transition-colors">Funcionalidades</a>
          <a href="#contato" className="hover:text-neutral-900 transition-colors">Contato</a>
        </nav>
      </div>
    </header>
  )
}
