import type { ExperienceEntry } from '../types'

// Order: earliest → current. No dates, no titles (intentionally).
export const experience: ExperienceEntry[] = [
  { id: 'mgetech', company: 'MGETech', logo: '/images/logos/mgetech.png' },
  { id: 'nexus', company: 'Nexus', context: 'ALE Santa Catarina', logo: '/images/logos/ale.svg', url: 'https://aletech.com.br/' },
  { id: 'vilt', company: 'VILT', context: 'Porto Seguro', logo: '/images/logos/porto.svg', url: 'https://www.portoseguro.com.br/' },
  { id: 'loomi', company: 'Loomi', context: 'CX Bloom', current: true, logo: '/images/logos/bloom.svg', url: 'https://bloom.ia.br/' },
]
