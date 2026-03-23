import { MessageCircle, Mail, HelpCircle, Shield, Lock, Instagram, Linkedin } from 'lucide-react'

function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault()
  const hero = document.getElementById('hero')
  if (hero) {
    hero.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { label: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
]

const linkItems = [
  { label: 'Funcionalidades', href: '#ecossistema' },
  { label: 'Planos', href: '#planos' },
  { label: 'Depoimentos', href: '#depoimentos' },
]

const supportItems = [
  { label: 'WhatsApp', href: 'https://wa.me/5511999999999', Icon: MessageCircle },
  { label: 'E-mail', href: 'mailto:contato@napse.com.br', Icon: Mail },
  { label: 'FAQ', href: '#faq', Icon: HelpCircle },
]

const termsItems = [
  { label: 'Termos de uso', href: '/termos-de-uso' },
  { label: 'Política de privacidade', href: '/politica-de-privacidade' },
]

export function Footer() {
  return (
    <footer className="relative bg-[#080808] text-neutral-300 overflow-hidden">
      {/* Blurry Glow - Roxo (canto superior esquerdo) */}
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.5) 0%, transparent 70%)' }}
      />
      {/* Blurry Glow - Azul (canto inferior direito) */}
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5) 0%, transparent 70%)' }}
      />

      {/* Textura: malha de linhas (image_8.png) - 5% opacidade */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/image_8.png)' }}
      />

      {/* Divisor superior: linha ultra-fina 0.5px com gradiente que some nas pontas */}
      <div
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: '0.5px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 py-14 lg:py-16">
        {/* Logo + Redes sociais na mesma linha */}
        <div className="flex items-center justify-between mb-10">
          <a href="/" onClick={scrollToTop} className="inline-flex shrink-0" aria-label="NAPSE - início">
            <img
              src="/assets/NAPSE-LogotipoPadrao.svg"
              alt="NAPSE"
              className="h-9 w-auto brightness-0 invert"
            />
          </a>
          <div className="flex items-center gap-3">
            {socialLinks.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white/80 transition-colors hover:border-[#6366f1]/50 hover:bg-[#6366f1]/20 hover:text-white"
                aria-label={label}
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Navegação, Suporte e Segurança */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
          {/* Navegação */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Navegação
            </p>
            <ul className="space-y-3">
              {linkItems.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-300 transition-colors hover:text-[#6366f1]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Suporte */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Suporte
            </p>
            <ul className="space-y-3">
              {supportItems.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-[#6366f1]"
                  >
                    <Icon className="h-4 w-4 shrink-0 opacity-70" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Segurança */}
          <div className="col-span-2 sm:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Segurança
            </p>
            <ul className="space-y-3">
              {termsItems.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-sm text-neutral-300 transition-colors hover:text-[#6366f1]"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="flex flex-row sm:flex-col gap-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Shield className="h-4 w-4 shrink-0 text-emerald-400/90" />
                <span className="text-xs font-medium text-neutral-400">LGPD Compliant</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Lock className="h-4 w-4 shrink-0 text-sky-400/90" />
                <span className="text-xs font-medium text-neutral-400">SSL Secure</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className="relative z-10 border-t border-white/5"
        style={{
          boxShadow: '0 -1px 0 0 rgba(255,255,255,0.03)',
        }}
      >
        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-5">
          <p className="text-center text-xs text-neutral-500">
            © 2026 NAPSE. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
