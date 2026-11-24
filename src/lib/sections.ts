export const SECTIONS = ['home', 'about', 'experience', 'expertise', 'certifications', 'projects', 'contact'] as const
export type SectionId = (typeof SECTIONS)[number]
