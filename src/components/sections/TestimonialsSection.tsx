import { useRef } from 'react'
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
  'nat-purple': 'shadow-none',
  'nat-green': 'shadow-none',
  'nat-blue': 'shadow-none',
  'nat-yellow': 'shadow-none',
}

const ringClasses: Record<Testimonial['specialtyColor'], string> = {
  'nat-purple': 'ring-2 ring-nat-purple/40',
  'nat-green': 'ring-2 ring-nat-green/40',
  'nat-blue': 'ring-2 ring-nat-blue/40',
  'nat-yellow': 'ring-2 ring-nat-yellow/40',
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
  const glow = glowClasses[testimonial.specialtyColor]
  const ring = ringClasses[testimonial.specialtyColor]
  const isLarge = testimonial.layout === 'large' || testimonial.layout === 'horizontal-tall'
  const style = testimonial.cardStyle ?? 'default'
  const starSize = style === 'stars-top' || style === 'stars-bottom' ? 'lg' : 'md'

  const quoteClass = isLarge ? 'text-lg sm:text-xl' : 'text-sm sm:text-base'

  const Avatar = ({ size = 'md' }: { size?: 'md' | 'lg' | 'xl' }) => (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full bg-neutral-200 font-semibold text-neutral-600 ${ring} ${glow} ${
        size === 'xl' ? 'h-20 w-20 sm:h-24 sm:w-24 text-2xl sm:text-3xl' : size === 'lg' ? 'h-16 w-16 sm:h-20 sm:w-20 text-xl sm:text-2xl' : 'h-12 w-12 text-lg'
      }`}
      title={testimonial.role}
    >
      {testimonial.name
        .split(' ')
        .filter((part) => !/^Dr\.?a?\.?$/i.test(part.trim()))
        .map((n) => n[0])
        .slice(0, 2)
        .join('')}
    </div>
  )

  const renderContent = () => {
    if (style === 'stars-top') {
      const isTallCard = testimonial.layout === 'vertical-tall'
      return (
        <>
          {testimonial.rating != null && (
            <div className={isTallCard ? 'mb-3 mt-6 sm:mt-8' : 'mb-3'}>
              <StarsRow rating={testimonial.rating} size={starSize} />
            </div>
          )}
          <p className={`flex-1 text-neutral-700 ${quoteClass} leading-relaxed`}>{testimonial.quote}</p>
          <div className="mt-4 flex items-center gap-3">
            <Avatar />
            <div>
              <p className="font-semibold text-neutral-900">{testimonial.name}</p>
              <p className="text-sm text-neutral-500">{testimonial.role}</p>
            </div>
          </div>
        </>
      )
    }
    if (style === 'stars-bottom') {
      const isNarrowCard = testimonial.layout === 'vertical' || testimonial.layout === 'horizontal-narrow'
      return (
        <>
          <p className={`text-neutral-700 ${quoteClass} leading-relaxed`}>{testimonial.quote}</p>
          <div className={`mt-4 flex gap-3 ${isNarrowCard ? 'flex-col' : 'items-center justify-between'}`}>
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <Avatar />
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
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
            <p className={`text-neutral-700 ${quoteClass} leading-relaxed`}>{testimonial.quote}</p>
            <div className="mt-4 flex items-center justify-between gap-4">
              <div>
                <p className="font-semibold text-neutral-900">{testimonial.name}</p>
                <p className="text-sm text-neutral-500">{testimonial.role}</p>
                {testimonial.rating != null && (
                  <div className="mt-1">
                    <StarsRow rating={testimonial.rating} size={starSize} />
                  </div>
                )}
              </div>
              <Avatar size="lg" />
            </div>
          </div>
        </>
      )
    }
    if (style === 'photo-large') {
      const isBigCard = testimonial.layout === 'large'
      return (
        <>
          <div className={`flex items-start ${isBigCard ? 'mt-8 sm:mt-12 gap-5 sm:gap-6' : 'gap-4'}`}>
            <Avatar size={isBigCard ? 'xl' : 'lg'} />
            <div className="min-w-0 flex-1">
              <p className={isBigCard ? 'text-xl sm:text-2xl font-semibold text-neutral-900' : 'font-semibold text-neutral-900'}>{testimonial.name}</p>
              <p className={isBigCard ? 'text-base sm:text-lg text-neutral-500' : 'text-sm text-neutral-500'}>{testimonial.role}</p>
              {testimonial.rating != null && (
                <div className={isBigCard ? 'mt-2' : 'mt-1'}>
                  <StarsRow rating={testimonial.rating} size={isBigCard ? 'lg' : starSize} />
                </div>
              )}
            </div>
          </div>
          <p className={`flex-1 text-neutral-700 ${quoteClass} leading-relaxed ${isBigCard ? 'mt-5 sm:mt-6' : 'mt-4'}`}>
            {testimonial.quote}
          </p>
        </>
      )
    }
    const isTallCard = testimonial.layout === 'horizontal-tall'
    return (
      <>
        <div className={`flex items-start ${isTallCard ? 'mt-8 sm:mt-12 gap-5 sm:gap-6' : 'gap-4'}`}>
          <Avatar size={isTallCard ? 'xl' : undefined} />
          <div className="min-w-0 flex-1">
            <p className={isTallCard ? 'text-xl sm:text-2xl font-semibold text-neutral-900' : 'font-semibold text-neutral-900'}>{testimonial.name}</p>
            <p className={isTallCard ? 'text-base sm:text-lg text-neutral-500' : 'text-sm text-neutral-500'}>{testimonial.role}</p>
            {testimonial.rating != null && (
              <div className={isTallCard ? 'mt-2' : 'mt-1'}>
                <StarsRow rating={testimonial.rating} size={isTallCard ? 'lg' : starSize} />
              </div>
            )}
          </div>
        </div>
        <p className={`flex-1 text-neutral-700 ${quoteClass} leading-relaxed ${isTallCard ? 'mt-5 sm:mt-6' : 'mt-4'}`}>
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
        className={`relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm ${isLarge ? 'p-5 sm:p-6 lg:p-8' : 'p-4 sm:p-5 lg:p-6'} ${!['vertical-tall', 'horizontal-tall', 'large'].includes(testimonial.layout) ? 'lg:max-h-[220px]' : ''}`}
        style={{ borderWidth: '0.5px' }}
      >
      {/* Aspas gigantes translúcidas no fundo */}
      <span
        className="pointer-events-none absolute left-2 top-2 text-[6rem] sm:text-[7rem] font-serif leading-none text-neutral-300/30 select-none"
        aria-hidden
      >
        “
      </span>
      <span
        className="pointer-events-none absolute bottom-2 right-2 text-[6rem] sm:text-[7rem] font-serif leading-none text-neutral-300/30 select-none"
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
  const glow = glowClasses[testimonial.specialtyColor]
  const ring = ringClasses[testimonial.specialtyColor]

  return (
    <article
      className="relative h-full overflow-hidden rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
      style={{ borderWidth: '0.5px' }}
    >
      <span
        className="pointer-events-none absolute left-2 top-2 text-[5rem] font-serif leading-none text-neutral-300/30 select-none"
        aria-hidden
      >
        "
      </span>

      <div className="relative z-10 flex h-full flex-col">
        {testimonial.rating != null && (
          <div className="mb-3">
            <StarsRow rating={testimonial.rating} size="sm" />
          </div>
        )}
        <p className="flex-1 text-sm text-neutral-700 leading-relaxed">{testimonial.quote}</p>
        <div className="mt-4 flex items-center gap-3">
          <div
            className={`flex shrink-0 items-center justify-center rounded-full bg-neutral-200 font-semibold text-neutral-600 h-10 w-10 text-sm ${ring} ${glow}`}
          >
            {testimonial.name
              .split(' ')
              .filter((part) => !/^Dr\.?a?\.?$/i.test(part.trim()))
              .map((n) => n[0])
              .slice(0, 2)
              .join('')}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-neutral-900 truncate">{testimonial.name}</p>
            <p className="text-xs text-neutral-500">{testimonial.role}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      ref={ref}
      id="depoimentos"
      className="relative overflow-x-hidden overflow-y-visible bg-white py-16 sm:py-24 lg:py-32"
    >
      {/* Título centralizado com largura contida */}
      <div className="relative px-4 mx-auto max-w-5xl">
        <motion.div
          className="mb-8 sm:mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="section-kicker text-nat-blue mb-2">
            Depoimentos
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900">
            Médicos que já sentem a diferença
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto">
            Histórias de clínicas que ganharam mais controle operacional e menos fricção no dia a dia.
          </p>
        </motion.div>
      </div>

      {/* Mobile: carrossel horizontal com snap */}
      <div className="relative w-full lg:hidden">
        <p className="px-6 pb-3 text-xs font-medium uppercase tracking-[0.16em] text-neutral-500">
          Arraste para ver mais histórias
        </p>

        <div className="flex gap-4 overflow-x-auto px-6 pb-4 snap-x snap-mandatory scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="w-[260px] sm:w-[280px] flex-shrink-0 snap-center">
              <MobileTestimonialCard testimonial={testimonial} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop: bento grid com fade nas laterais */}
      <div className="relative w-full min-w-0 max-w-full overflow-x-hidden hidden lg:block">
        <div className="grid grid-cols-6 gap-4 auto-rows-[minmax(140px,auto)] px-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
