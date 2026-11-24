export type Locale = 'en' | 'pt-BR'

export interface Profile {
  name: string
  /** Public URLs/addresses. Empty string = not configured → hidden in the UI. */
  email: string
  linkedin: string
  /** Digits only with country code (e.g. 5584981758371). Used for the WhatsApp link. */
  phone: string
  github: string
  /** Show the availability indicator in the hero. Must reflect reality. */
  showAvailability: boolean
  programmingSince: number
}

export interface ExperienceEntry {
  id: string
  company: string
  /** Client / product context, shown as a secondary line. Not a job title. */
  context?: string
  current?: boolean
  /** Path under /public. Rendered monochrome-light to suit the dark theme. */
  logo?: string
  /** Public website of the company/product. */
  url?: string
}

export type TechKind = 'language' | 'framework' | 'platform' | 'concept' | 'discipline'

export interface TechItem {
  name: string
  kind: TechKind
}

export interface TechCategory {
  id: 'backend' | 'ai' | 'architecture' | 'cloud' | 'data' | 'quality'
  items: TechItem[]
}

export interface Certification {
  id: string
  name: string
  issuer?: string
  status: 'completed' | 'in-progress'
  /** Course workload in hours (optional) */
  hours?: number
  credentialId?: string
  verificationUrl?: string
  /** Path under /public. */
  image?: string
  /** Fallback glyph when there is no image. */
  icon?: 'cloud' | 'layers' | 'network' | 'graduation'
}

export type ProjectKind = 'professional' | 'personal' | 'experimental'

export interface Project {
  id: string
  kind: ProjectKind
  technologies: string[]
  logo?: string
  /** Display width (px) tuned per logo aspect ratio. */
  logoWidth?: number
  repoUrl?: string
  liveUrl?: string
}
