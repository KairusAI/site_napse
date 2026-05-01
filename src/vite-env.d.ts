/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP_PHONE?: string
  readonly VITE_WHATSAPP_DEFAULT_MESSAGE?: string
  readonly VITE_BUSINESS_HOURS?: string
  readonly VITE_INSTAGRAM_URL?: string
  readonly VITE_LINKEDIN_URL?: string
  readonly VITE_YOUTUBE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
