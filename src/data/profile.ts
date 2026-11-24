import type { Profile } from '../types'

/**
 * Single source of truth for public contact details.
 * Leave a field empty to hide it everywhere in the UI.
 * Values can also be injected at build time via VITE_* env vars.
 */
export const profile: Profile = {
  name: 'Matheus Reis',
  email: import.meta.env.VITE_CONTACT_EMAIL ?? '',
  linkedin: import.meta.env.VITE_LINKEDIN_URL ?? '',
  phone: import.meta.env.VITE_CONTACT_PHONE ?? '',
  github: 'https://github.com/mateh3007',
  showAvailability: false,
  programmingSince: 2021,
}

export const siteUrl: string = import.meta.env.VITE_SITE_URL ?? 'https://example.com'
