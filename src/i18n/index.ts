import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import ptBR from './locales/pt-BR/translation.json'
import type { Locale } from '../types'

export const SUPPORTED: readonly Locale[] = ['en', 'pt-BR']
export const STORAGE_KEY = 'mr-lang'

function readStored(): Locale | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY)
    return v === 'en' || v === 'pt-BR' ? v : null
  } catch {
    return null
  }
}

/** saved preference → browser language (if supported) → English */
export function detectLocale(): Locale {
  const stored = readStored()
  if (stored) return stored
  const nav = typeof navigator !== 'undefined' ? navigator.languages?.[0] ?? navigator.language : ''
  if (nav?.toLowerCase().startsWith('pt')) return 'pt-BR'
  return 'en'
}

export function persistLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* storage unavailable: preference lasts for the session only */
  }
}

// Resources are bundled and init is synchronous → no flash of untranslated content.
void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, 'pt-BR': { translation: ptBR } },
  lng: detectLocale(),
  fallbackLng: 'en',
  returnObjects: true,
  interpolation: { escapeValue: false },
  initAsync: false,
})

export default i18n
