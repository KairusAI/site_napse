/**
 * Configuração pública do site (variáveis VITE_* no .env).
 * Não coloque segredos aqui — tudo em Vite é exposto ao cliente.
 */

const rawPhone = (import.meta.env.VITE_WHATSAPP_PHONE ?? '').replace(/\D/g, '')

const defaultWhatsappMessage =
  import.meta.env.VITE_WHATSAPP_DEFAULT_MESSAGE ??
  'Olá! Gostaria de falar com um especialista da NAPSE.'

export const site = {
  whatsappPhone: rawPhone || null,
  whatsappDefaultMessage: defaultWhatsappMessage,
  businessHours: import.meta.env.VITE_BUSINESS_HOURS ?? 'Segunda a sexta, 8h às 18h (horário de Brasília).',
  social: {
    instagram: (import.meta.env.VITE_INSTAGRAM_URL ?? '').trim() || null,
    linkedin: (import.meta.env.VITE_LINKEDIN_URL ?? '').trim() || null,
    youtube: (import.meta.env.VITE_YOUTUBE_URL ?? '').trim() || null,
  },
} as const

/**
 * URL wa.me com mensagem opcional (concatena à mensagem padrão da env).
 * Retorna null se não houver telefone configurado.
 */
export function getWhatsAppUrl(optionalExtra?: string): string | null {
  if (!site.whatsappPhone) return null
  const text = optionalExtra
    ? `${site.whatsappDefaultMessage}\n\n${optionalExtra}`.trim()
    : site.whatsappDefaultMessage
  return `https://wa.me/${site.whatsappPhone}?text=${encodeURIComponent(text)}`
}
