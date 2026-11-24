import { buildMailto, validateContact } from '../lib/validation'

describe('validateContact', () => {
  it('flags empty fields', () => {
    expect(Object.keys(validateContact({ name: '', email: '', message: '' })).sort()).toEqual(['email', 'message', 'name'])
  })
  it('flags invalid email and short message', () => {
    const e = validateContact({ name: 'A', email: 'nope', message: 'short' })
    expect(e.email).toMatch(/emailInvalid/)
    expect(e.message).toMatch(/messageShort/)
  })
  it('accepts valid input', () => {
    expect(validateContact({ name: 'Ana', email: 'ana@example.com', message: 'Hello there, nice site!' })).toEqual({})
  })
})

describe('buildMailto', () => {
  it('encodes subject and body', () => {
    const url = buildMailto('me@x.dev', 'Hi & bye', { name: 'Ana', email: 'a@b.co', message: 'Line one\nline two' })
    expect(url.startsWith('mailto:me@x.dev?subject=Hi%20%26%20bye')).toBe(true)
    expect(url).toContain('Line%20one%0Aline%20two')
  })
})
