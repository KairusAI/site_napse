import { Link } from 'react-router-dom'
import { Mail, HelpCircle, Shield, Lock, Instagram, Linkedin, Youtube } from 'lucide-react'
import { site } from '@/config/site'

const linkItems = [
  { label: 'Ecossistema', to: '/#ecossistema' as const },
  { label: 'Ver planos', to: '/#planos' as const },
  { label: 'Depoimentos', to: '/#depoimentos' as const },
  { label: 'Contato', to: '/#contato' as const },
]

type SupportRow =
  | { label: string; Icon: typeof Mail; href: string }
  | { label: string; Icon: typeof HelpCircle; to: string }

const supportItems: SupportRow[] = [
  { label: 'E-mail', href: import.meta.env.VITE_GMAIL_URL, Icon: Mail },
  { label: 'FAQ', to: '/#faq', Icon: HelpCircle },
]

const termsItems = [
  { label: 'Termos de uso', to: '/termos-de-uso' as const },
  { label: 'Política de privacidade', to: '/politica-de-privacidade' as const },
]

export function Footer() {
  const { instagram, linkedin, youtube } = site.social
  const hasSocial = Boolean(instagram || linkedin || youtube)

  return (
    <footer className="relative bg-[#080808] text-neutral-300 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full opacity-40 blur-[100px]"
        style={{ background: 'radial-gradient(circle, hsl(var(--nat-blue) / 0.5) 0%, transparent 70%)' }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/assets/image_8.png)' }}
      />

      <div
        className="absolute left-0 right-0 top-0 pointer-events-none"
        style={{
          height: '0.5px',
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 20%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)',
        }}
      />

      <div className="section-y-tight section-shell relative z-10">
        <div className="mb-10">
          <Link to="/" className="inline-flex shrink-0" aria-label="NAPSE - início">
            <img
              src="/assets/NAPSE-LogotipoPadrao.svg"
              alt="NAPSE"
              className="h-9 w-auto brightness-0 invert"
            />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Navegação
            </p>
            <ul className="space-y-3">
              {linkItems.map(({ label, to }) => (
                <li key={`${label}-${to}`}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-300 transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Suporte
            </p>
            <ul className="space-y-3">
              {supportItems.map((row) => (
                <li key={row.label}>
                  {'href' in row ? (
                    <a
                      href={row.href}
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-primary"
                    >
                      <row.Icon className="h-4 w-4 shrink-0 opacity-70" />
                      {row.label}
                    </a>
                  ) : (
                    <Link
                      to={row.to}
                      className="inline-flex items-center gap-2 text-sm text-neutral-300 transition-colors hover:text-primary"
                    >
                      <row.Icon className="h-4 w-4 shrink-0 opacity-70" />
                      {row.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Legal
            </p>
            <ul className="space-y-3">
              {termsItems.map(({ label, to }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="text-sm text-neutral-300 transition-colors hover:text-primary"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex flex-row sm:flex-col gap-3 mt-3">
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Shield className="h-4 w-4 shrink-0 text-nat-green/90" />
                <span className="text-xs font-medium text-neutral-400">LGPD</span>
              </div>
              <div className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <Lock className="h-4 w-4 shrink-0 text-nat-blue/90" />
                <span className="text-xs font-medium text-neutral-400">SSL</span>
              </div>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-2 lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
              Redes e pagamento
            </p>
            {hasSocial && (
              <ul className="mb-4 flex flex-wrap items-center gap-2">
                {instagram && (
                  <li>
                    <a
                      href={instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:text-primary"
                      aria-label="Instagram NAPSE"
                    >
                      <Instagram className="h-5 w-5" />
                    </a>
                  </li>
                )}
                {linkedin && (
                  <li>
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:text-primary"
                      aria-label="LinkedIn NAPSE"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </li>
                )}
                {youtube && (
                  <li>
                    <a
                      href={youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:text-primary"
                      aria-label="YouTube NAPSE"
                    >
                      <Youtube className="h-5 w-5" />
                    </a>
                  </li>
                )}
              </ul>
            )}
            <p className="text-xs leading-relaxed text-neutral-500">
              <span className="text-neutral-400">Formas de pagamento: </span>
              Pix, cartão e condições comerciais são alinhadas no contato com o time, conforme plano e perfil da
              clínica.
            </p>
          </div>
        </div>
      </div>

      <div
        className="relative z-10 border-t border-white/5"
        style={{ boxShadow: '0 -1px 0 0 rgba(255,255,255,0.03)' }}
      >
        <div className="mx-auto max-w-site px-4 sm:px-6 py-5">
          <div className="flex flex-col gap-4 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
            <p className="text-xs text-neutral-500">
              © 2026 NAPSE. Todos os direitos reservados.
            </p>
            <a
              href="https://www.kairus.group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center opacity-50 transition-opacity duration-500 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#080808] rounded-md"
              aria-label="Kairus (abre em nova aba)"
              title="Kairus"
            >
              <img
                src="/assets/kairus.png"
                alt="Kairus"
                className="h-24 w-auto"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
