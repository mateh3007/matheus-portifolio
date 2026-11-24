export interface ContactValues { name: string; email: string; message: string }
export type ContactErrors = Partial<Record<keyof ContactValues, string>>

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

/** Returns translation keys for each invalid field. */
export function validateContact(v: ContactValues): ContactErrors {
  const e: ContactErrors = {}
  if (!v.name.trim()) e.name = 'contact.form.validation.nameRequired'
  if (!v.email.trim()) e.email = 'contact.form.validation.emailRequired'
  else if (!EMAIL_RE.test(v.email.trim())) e.email = 'contact.form.validation.emailInvalid'
  if (!v.message.trim()) e.message = 'contact.form.validation.messageRequired'
  else if (v.message.trim().length < 10) e.message = 'contact.form.validation.messageShort'
  return e
}

export function buildMailto(to: string, subject: string, v: ContactValues): string {
  const body = `${v.message.trim()}\n\n— ${v.name.trim()} (${v.email.trim()})`
  return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}
