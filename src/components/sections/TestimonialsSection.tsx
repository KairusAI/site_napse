import { useMemo, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Star } from 'lucide-react'

type Layout = 'horizontal' | 'horizontal-narrow' | 'horizontal-tall' | 'vertical' | 'vertical-tall' | 'large'

type CardStyle = 'default' | 'photo-large' | 'stars-top' | 'stars-bottom' | 'photo-right'

type Testimonial = {
  id: string
  name: string
  role: string
  specialtyColor: 'nat-purple' | 'nat-green' | 'nat-blue' | 'nat-yellow'
  quote: string
  layout: Layout
  cardStyle?: CardStyle
  rating?: number
  /** Override do avatar. Use `null` para não renderizar foto (mostra iniciais). */
  avatarSrc?: string | null
}

const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Dra. Mariana Costa',
    role: 'Cardiologista',
    specialtyColor: 'nat-purple',
    quote: 'Antes eu perdia tempo ligando para confirmar consulta. Agora o WhatsApp faz isso sozinho. Reduziu no-show e minha recepcionista respira.',
    layout: 'horizontal-narrow',
    cardStyle: 'photo-large',
    rating: 5,
  },
  {
    id: '2',
    name: 'Dr. Ricardo Mendes',
    role: 'Ortopedista',
    specialtyColor: 'nat-green',
    quote: 'Implementamos em uma semana. A equipe da NAPSE migrou nossos dados e nos treinou. Zero estresse.',
    layout: 'vertical-tall',
    cardStyle: 'stars-top',
    rating: 5,
  },
  {
    id: '3',
    name: 'Dra. Fernanda Lima',
    role: 'Pediatra',
    specialtyColor: 'nat-blue',
    quote: 'Do agendamento ao faturamento, tudo em um lugar. O paciente agenda pelo link, confirma pelo WhatsApp e eu foco no atendimento.',
    layout: 'large',
    cardStyle: 'photo-large',
    rating: 5,
  },
  {
    id: '4',
    name: 'Dr. André Souza',
    role: 'Clínico Geral',
    specialtyColor: 'nat-yellow',
    quote: 'Finalmente enxergo o faturamento real da clínica. Relatórios que fazem sentido, sem planilha.',
    layout: 'vertical',
    cardStyle: 'stars-bottom',
    rating: 5,
  },
  {
    id: '5',
    name: 'Dra. Patrícia Rocha',
    role: 'Dermatologista',
    specialtyColor: 'nat-purple',
    quote: 'Os posts com IA economizam horas. Eu só reviso e publico. Mais pacientes chegando pelo Instagram.',
    layout: 'horizontal-narrow',
    cardStyle: 'photo-right',
    rating: 5,
  },
  {
    id: '5b',
    name: 'Dr. Lucas Teixeira',
    role: 'Anestesiologista',
    specialtyColor: 'nat-blue',
    quote: 'Agenda e prontuário conversando entre si. Menos retrabalho, mais fluidez no consultório.',
    layout: 'horizontal-narrow',
    cardStyle: 'default',
    rating: 5,
  },
  {
    id: '6',
    name: 'Dr. Bruno Alves',
    role: 'Gastroenterologista',
    specialtyColor: 'nat-green',
    quote: 'Começamos pequenos e fomos crescendo. O plano acompanhou. Suporte que realmente resolve.',
    layout: 'horizontal-tall',
    cardStyle: 'default',
    rating: 5,
  },
  {
    id: '7',
    name: 'Dra. Camila Nascimento',
    role: 'Endocrinologista',
    specialtyColor: 'nat-blue',
    quote: 'Relatórios claros e suporte que responde. Parece que foram feitos pensando em quem atende paciente.',
    layout: 'vertical',
    cardStyle: 'stars-top',
    rating: 5,
  },
  {
    id: '8',
    name: 'Dra. Gyovanna Vieira',
    role: 'Neurologista',
    specialtyColor: 'nat-purple',
    quote: 'A IA sugere, eu aprovo. Prontuário e receita mais rápidos. O controle continua sendo meu.',
    layout: 'horizontal',
    cardStyle: 'photo-right',
    rating: 5,
    avatarSrc: '/assets/testimonials/7.jpg',
  },
  {
    id: '9',
    name: 'Dra. Larissa Martins',
    role: 'Ginecologista',
    specialtyColor: 'nat-yellow',
    quote: 'Confirmação automática mudou tudo. Cadeiras vazias viraram consultas. A recepção agradece.',
    layout: 'vertical',
    cardStyle: 'stars-bottom',
    rating: 5,
  },
]

const layoutClasses: Record<Layout, string> = {
  horizontal: 'lg:col-span-2 lg:row-span-1',
  'horizontal-narrow': 'lg:col-span-1 lg:row-span-1',
  'horizontal-tall': 'lg:col-span-2 lg:row-span-2',
  vertical: 'lg:col-span-1 lg:row-span-1',
  'vertical-tall': 'lg:col-span-1 lg:row-span-2',
  large: 'lg:col-span-2 lg:row-span-2',
}

const glowClasses: Record<Testimonial['specialtyColor'], string> = {
  'nat-purple': 'shadow-[0_0_24px_rgba(139,92,246,0.35)]',
  'nat-green': 'shadow-[0_0_24px_rgba(34,197,94,0.35)]',
  'nat-blue': 'shadow-[0_0_24px_rgba(59,130,246,0.35)]',
  'nat-yellow': 'shadow-[0_0_24px_rgba(234,179,8,0.35)]',
}

const ringClasses: Record<Testimonial['specialtyColor'], string> = {
  'nat-purple': 'ring-2 ring-nat-purple/40',
  'nat-green': 'ring-2 ring-nat-green/40',
  'nat-blue': 'ring-2 ring-nat-blue/40',
  'nat-yellow': 'ring-2 ring-nat-yellow/40',
}

function initialsFromName(name: string) {
  return name
    .split(' ')
    .filter((part) => !/^Dr\.?a?\.?$/i.test(part.trim()))
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
}

function TestimonialAvatar({
  testimonial,
  size = 'md',
}: {
  testimonial: Testimonial
  size?: 'sm' | 'md' | 'lg' | 'xl'
}) {
  const [photoFailed, setPhotoFailed] = useState(false)
  const ring = ringClasses[testimonial.specialtyColor]
  const glow = glowClasses[testimonial.specialtyColor]
  const src = testimonial.avatarSrc ?? `/assets/testimonials/${testimonial.id}.jpg`
  const initials = initialsFromName(testimonial.name)
  const showPhoto = testimonial.avatarSrc !== null && !photoFailed

  const frame =
    size === 'xl'
      ? 'h-16 w-16 sm:h-20 sm:w-20'
      : size === 'lg'
        ? 'h-14 w-14 sm:h-16 sm:w-16'
        : size === 'sm'
          ? 'h-9 w-9'
          : 'h-11 w-11'

  const textSize =
    size === 'xl'
      ? 'text-xl sm:text-2xl'
      : size === 'lg'
        ? 'text-lg sm:text-xl'
        : size === 'sm'
          ? 'text-xs'
          : 'text-base'

  return (
    <div
      className={`relative flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-neutral-200 font-semibold text-neutral-600 ${ring} ${glow} ${frame}`}
      title={testimonial.role}
    >
      {showPhoto && (
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="lazy"
          decoding="async"
          onError={() => setPhotoFailed(true)}
        />
      )}
      {!showPhoto && <span className={`relative z-10 ${textSize}`}>{initials || '?'}</span>}
    </div>
  )
}

function StarsRow({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeClass = size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-6 w-6' : 'h-5 w-5'
  const gapClass = size === 'lg' ? 'gap-1' : 'gap-0.5'
  return (
    <div className={`flex ${gapClass} text-amber-500`} aria-label={`${rating} estrelas`}>
      {Array.from({ length: rating }).map((_, i) => (
        <Star key={i} className={`${sizeClass} fill-current`} strokeWidth={0} />
      ))}
    </div>
  )
}

function TestimonialCard({
  testimonial,
  index,
}: {
  testimonial: Testimonial
  index: number
}) {
  const layout = layoutClasses[testimonial.layout]
  const isLarge = testimonial.layout === 'large' || testimonial.layout === 'horizontal-tall'
  const style = testimonial.cardStyle ?? 'default'
  const starSize = style === 'stars-top' || style === 'stars-bottom' ? 'lg' : 'md'

  const quoteClass = isLarge ? 'text-base sm:text-lg' : 'text-sm sm:text-[0.9375rem]'

  const renderContent = () => {
    if (style === 'stars-top') {
      const isTallCard = testimonial.layout === 'vertical-tall'
      return (
        <>
          {testimonial.rating != null && (
            <div className={isTallCard ? 'mb-1.5 mt-3 sm:mt-4' : 'mb-1.5'}>
              <StarsRow rating={testimonial.rating} size={starSize} />
            </div>
          )}
          <p className={`flex-1 text-neutral-700 ${quoteClass} leading-snug sm:leading-relaxed`}>{testimonial.quote}</p>
          <div className="mt-2 flex items-center gap-2">
            <TestimonialAvatar testimonial={testimonial} />
            <div>
              <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
              <p className="text-xs text-neutral-500">{testimonial.role}</p>
            </div>
          </div>
        </>
      )
    }
    if (style === 'stars-bottom') {
      const isNarrowCard = testimonial.layout === 'vertical' || testimonial.layout === 'horizontal-narrow'
      return (
        <>
          <p className={`text-neutral-700 ${quoteClass} leading-snug sm:leading-relaxed`}>{testimonial.quote}</p>
          <div className={`mt-2 flex gap-2 ${isNarrowCard ? 'flex-col' : 'items-center justify-between'}`}>
            <div className="flex min-w-0 flex-1 items-center gap-2">
              <TestimonialAvatar testimonial={testimonial} />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-xs text-neutral-500">{testimonial.role}</p>
              </div>
            </div>
            {testimonial.rating != null && (
              <div className={isNarrowCard ? 'flex shrink-0' : ''}>
                <StarsRow rating={testimonial.rating} size={starSize} />
              </div>
            )}
          </div>
        </>
      )
    }
    if (style === 'photo-right') {
      return (
        <>
          <div className="flex flex-1 flex-col">
            <p className={`text-neutral-700 ${quoteClass} leading-snug sm:leading-relaxed`}>{testimonial.quote}</p>
            <div className="mt-2 flex items-center justify-between gap-2">
              <div>
                <p className="text-sm font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-xs text-neutral-500">{testimonial.role}</p>
                {testimonial.rating != null && (
                  <div className="mt-1">
                    <StarsRow rating={testimonial.rating} size={starSize} />
                  </div>
                )}
              </div>
              <TestimonialAvatar testimonial={testimonial} size="lg" />
            </div>
          </div>
        </>
      )
    }
    if (style === 'photo-large') {
      const isBigCard = testimonial.layout === 'large'
      return (
        <>
          <div className={`flex items-start ${isBigCard ? 'mt-3 gap-3 sm:mt-5 sm:gap-4' : 'gap-2'}`}>
            <TestimonialAvatar testimonial={testimonial} size={isBigCard ? 'xl' : 'lg'} />
            <div className="min-w-0 flex-1">
              <p className={isBigCard ? 'text-lg font-semibold text-neutral-900 sm:text-xl' : 'text-sm font-semibold text-neutral-900'}>{testimonial.name}</p>
              <p className={isBigCard ? 'text-sm text-neutral-500 sm:text-base' : 'text-xs text-neutral-500'}>{testimonial.role}</p>
              {testimonial.rating != null && (
                <div className={isBigCard ? 'mt-1' : 'mt-0.5'}>
                  <StarsRow rating={testimonial.rating} size={isBigCard ? 'lg' : starSize} />
                </div>
              )}
            </div>
          </div>
          <p className={`flex-1 text-neutral-700 ${quoteClass} leading-snug sm:leading-relaxed ${isBigCard ? 'mt-2 sm:mt-3' : 'mt-2'}`}>
            {testimonial.quote}
          </p>
        </>
      )
    }
    const isTallCard = testimonial.layout === 'horizontal-tall'
    return (
      <>
        <div className={`flex items-start ${isTallCard ? 'mt-3 gap-3 sm:mt-5 sm:gap-4' : 'gap-2'}`}>
          <TestimonialAvatar testimonial={testimonial} size={isTallCard ? 'xl' : 'md'} />
          <div className="min-w-0 flex-1">
            <p className={isTallCard ? 'text-lg font-semibold text-neutral-900 sm:text-xl' : 'text-sm font-semibold text-neutral-900'}>{testimonial.name}</p>
            <p className={isTallCard ? 'text-sm text-neutral-500 sm:text-base' : 'text-xs text-neutral-500'}>{testimonial.role}</p>
            {testimonial.rating != null && (
              <div className={isTallCard ? 'mt-1' : 'mt-0.5'}>
                <StarsRow rating={testimonial.rating} size={isTallCard ? 'lg' : starSize} />
              </div>
            )}
          </div>
        </div>
        <p className={`flex-1 text-neutral-700 ${quoteClass} leading-snug sm:leading-relaxed ${isTallCard ? 'mt-2 sm:mt-3' : 'mt-2'}`}>
          {testimonial.quote}
        </p>
      </>
    )
  }

  return (
    <motion.div
      className={layout}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <article
        className={`relative h-full overflow-hidden rounded-xl border border-white/90 bg-white/50 bg-gradient-to-br from-white/60 via-white/45 to-nat-purple/10 shadow-[0_8px_32px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] ${isLarge ? 'p-3 sm:p-4 lg:p-5' : 'p-2.5 sm:p-3 lg:p-4'} ${!['vertical-tall', 'horizontal-tall', 'large'].includes(testimonial.layout) ? 'lg:max-h-[162px]' : ''}`}
        style={{ borderWidth: '0.5px' }}
      >
      {/* Aspas gigantes translúcidas no fundo */}
      <span
        className="pointer-events-none absolute left-1 top-1 text-[3.25rem] font-serif leading-none text-neutral-300/30 select-none sm:left-1.5 sm:top-1.5 sm:text-[3.75rem] lg:text-[4.25rem]"
        aria-hidden
      >
        “
      </span>
      <span
        className="pointer-events-none absolute bottom-1 right-1 text-[3.25rem] font-serif leading-none text-neutral-300/30 select-none sm:bottom-1.5 sm:right-1.5 sm:text-[3.75rem] lg:text-[4.25rem]"
        aria-hidden
      >
        "
      </span>

      <div className="relative z-10 flex h-full flex-col">{renderContent()}</div>
      </article>
    </motion.div>
  )
}

function MobileTestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article
      className="relative h-full overflow-hidden rounded-xl border border-white/90 bg-white/50 bg-gradient-to-br from-white/60 via-white/45 to-nat-purple/10 shadow-[0_8px_32px_rgba(15,23,42,0.08),inset_0_1px_0_rgba(255,255,255,0.9)] p-3"
      style={{ borderWidth: '0.5px' }}
    >
      <span
        className="pointer-events-none absolute left-1 top-1 text-[3rem] font-serif leading-none text-neutral-300/30 select-none sm:left-1.5 sm:top-1.5 sm:text-[3.25rem]"
        aria-hidden
      >
        "
      </span>

      <div className="relative z-10 flex h-full flex-col">
        {testimonial.rating != null && (
          <div className="mb-1.5">
            <StarsRow rating={testimonial.rating} size="sm" />
          </div>
        )}
        <p className="flex-1 text-xs text-neutral-700 leading-snug sm:text-sm sm:leading-relaxed">{testimonial.quote}</p>
        <div className="mt-2 flex items-center gap-2">
          <TestimonialAvatar testimonial={testimonial} size="sm" />
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-neutral-900 sm:text-sm">{testimonial.name}</p>
            <p className="text-[0.65rem] text-neutral-500 sm:text-xs">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const [specialtyFilter, setSpecialtyFilter] = useState<string | 'all'>('all')

  const specialtyOptions = useMemo(() => {
    const set = new Set(testimonials.map((t) => t.role))
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'pt-BR'))
  }, [])

  const filteredTestimonials = useMemo(
    () =>
      specialtyFilter === 'all'
        ? testimonials
        : testimonials.filter((t) => t.role === specialtyFilter),
    [specialtyFilter]
  )

  return (
    <section
      ref={ref}
      id="depoimentos"
      className="section-y relative overflow-x-hidden overflow-y-visible"
    >
      {/* Fundo com tom para o glass destacar */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-100/80 via-neutral-50 to-neutral-100/80" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_30%,rgba(139,92,246,0.12),transparent_50%)]" />

      {/* Título — mesmo ritmo visual que PillarsSection (#ecossistema) */}
      <div className="section-shell relative">
        <motion.div
          className="mb-10 text-center lg:pt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-nat-purple lg:mb-3">
            Depoimentos
          </p>
          <h2 className="text-2xl font-semibold text-neutral-900 lg:text-5xl lg:font-bold lg:tracking-tight">
            Médicos que já sentem a diferença
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-neutral-600 lg:mt-4">
            Depoimentos reais de quem trocou burocracia por mais tempo no consultório.
          </p>
          <div
            className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2"
            role="group"
            aria-label="Filtrar por especialidade"
          >
            <button
              type="button"
              onClick={() => setSpecialtyFilter('all')}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                specialtyFilter === 'all'
                  ? 'border-nat-purple bg-nat-purple/10 text-nat-purple'
                  : 'border-neutral-200 bg-white/80 text-neutral-600 hover:border-nat-purple/30'
              }`}
            >
              Todas
            </button>
            {specialtyOptions.map((label) => (
              <button
                key={label}
                type="button"
                onClick={() => setSpecialtyFilter(label)}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors sm:text-sm ${
                  specialtyFilter === label
                    ? 'border-nat-purple bg-nat-purple/10 text-nat-purple'
                    : 'border-neutral-200 bg-white/80 text-neutral-600 hover:border-nat-purple/30'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Mobile: carrossel horizontal com snap */}
      <div className="relative w-full lg:hidden">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-8 sm:w-16 bg-gradient-to-r from-white to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-8 sm:w-16 bg-gradient-to-l from-white to-transparent"
          aria-hidden
        />

        <div className="flex gap-2 overflow-x-auto px-4 pb-2 snap-x snap-mandatory scrollbar-hide sm:gap-3 sm:px-5 sm:pb-2.5" style={{ WebkitOverflowScrolling: 'touch' }}>
          {filteredTestimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-[220px] shrink-0 snap-center sm:w-[240px]">
              <MobileTestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: bento grid com fade nas laterais */}
      <div className="relative w-full min-w-0 max-w-full overflow-x-hidden hidden lg:block">
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-0 z-20 w-52 bg-gradient-to-r from-white via-white/70 to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute right-0 top-0 bottom-0 z-20 w-52 bg-gradient-to-l from-white via-white/70 to-transparent"
          aria-hidden
        />

        <div className="grid grid-cols-6 gap-2 auto-rows-[minmax(100px,auto)] px-3 sm:px-5">
          {filteredTestimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
