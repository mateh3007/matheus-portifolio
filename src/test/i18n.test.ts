import en from '../i18n/locales/en/translation.json'
import pt from '../i18n/locales/pt-BR/translation.json'
import { projects } from '../data/projects'
import { technologies } from '../data/technologies'
import { experience } from '../data/experience'

function keys(o: unknown, prefix = ''): string[] {
  if (Array.isArray(o)) return o.flatMap((v, i) => keys(v, `${prefix}[${i}]`))
  if (o && typeof o === 'object') return Object.entries(o).flatMap(([k, v]) => keys(v, prefix ? `${prefix}.${k}` : k))
  return [prefix]
}

describe('translations', () => {
  it('EN and PT-BR expose exactly the same keys', () => {
    expect(keys(pt).sort()).toEqual(keys(en).sort())
  })
  it('has no empty strings', () => {
    const empty = (o: unknown): boolean => (typeof o === 'string' ? o.trim() === '' : o && typeof o === 'object' ? Object.values(o).some(empty) : false)
    expect(empty(en)).toBe(false)
    expect(empty(pt)).toBe(false)
  })
  it('every project has text in both languages', () => {
    for (const p of projects) {
      expect(en.projects.items).toHaveProperty(p.id)
      expect(pt.projects.items).toHaveProperty(p.id)
    }
  })
  it('every technology category is translated', () => {
    for (const c of technologies) {
      expect(en.expertise.categories).toHaveProperty(c.id)
      expect(pt.expertise.categories).toHaveProperty(c.id)
    }
  })
})

describe('content integrity', () => {
  it('has exactly six technology categories', () => expect(technologies).toHaveLength(6))
  it('lists the four companies in order, with no dates or titles', () => {
    expect(experience.map((e) => e.company)).toEqual(['MGETech', 'Nexus', 'VILT', 'Loomi'])
    expect(experience.filter((e) => e.current).map((e) => e.company)).toEqual(['Loomi'])
    for (const e of experience) expect(Object.keys(e).sort()).not.toContain('date')
  })
  it('mentions 2021 as the start of the journey', () => {
    expect(en.about.paragraphs[1]).toContain('2021')
    expect(pt.about.paragraphs[1]).toContain('2021')
  })
})
