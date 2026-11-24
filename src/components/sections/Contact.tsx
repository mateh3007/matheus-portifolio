import { ArrowUpRight, Mail, Phone } from 'lucide-react'
import { useId, useState, type FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { buildMailto, validateContact, type ContactErrors, type ContactValues } from '../../lib/validation'
import { Reveal } from '../common/Reveal'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

type Status = 'idle' | 'sending' | 'success' | 'error'

export function Contact() {
  const { t } = useTranslation()
  const links = [
    profile.email && { k: 'email', label: t('contact.email'), value: profile.email, href: `mailto:${profile.email}`, icon: <Mail size={18} aria-hidden />, ext: false },
    profile.phone && { k: 'phone', label: 'WhatsApp', value: profile.phone.replace(/^55(\d{2})(\d{5})(\d{4})$/, '+55 $1 $2-$3'), href: `https://wa.me/${profile.phone}`, icon: <Phone size={18} aria-hidden />, ext: true },
    profile.linkedin && { k: 'linkedin', label: 'LinkedIn', value: 'linkedin.com', href: profile.linkedin, icon: <LinkedinIcon width={18} height={18} />, ext: true },
    profile.github && { k: 'github', label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github, icon: <GithubIcon width={18} height={18} />, ext: true },
  ].filter(Boolean) as { k: string; label: string; value: string; href: string; icon: React.ReactNode; ext: boolean }[]

  return (
    <section id="contact" aria-labelledby="contact-title" className="section theme-lift [--edge-b:#0b1728] overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(50% 60% at 15% 100%, rgba(57,120,213,0.12), transparent 70%)' }} />
      <div className="wrap relative">
        <Reveal>
          <p className="eyebrow">
            <span className="idx">07</span>
            <span aria-hidden className="h-px w-8 bg-line" />
            <span>{t('nav.contact')}</span>
          </p>
        </Reveal>
        <Reveal delay={0.06} as="h2" className="h-display mt-6 max-w-[16ch] text-[clamp(2.4rem,1.2rem+5.4vw,5.5rem)] text-balance">
          <span id="contact-title">{t('contact.title')}</span>
        </Reveal>
        <Reveal delay={0.12}>
          <p className="lead mt-8">{t('contact.description')}</p>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <Reveal>
            {links.length ? (
              <ul className="m-0 list-none border-t border-line p-0">
                {links.map((l) => (
                  <li key={l.k} className="border-b border-line">
                    <a href={l.href} {...(l.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex min-h-16 items-center gap-4 py-4 no-underline transition-colors hover:text-accent2">
                      <span className="text-fg3 transition-colors group-hover:text-accent2">{l.icon}</span>
                      <span className="flex flex-col">
                        <span className="mono text-[0.6875rem] tracking-wider text-fg3 uppercase">{l.label}</span>
                        <span className="break-all text-[1.0625rem]">{l.value}</span>
                      </span>
                      <ArrowUpRight size={18} aria-hidden className="ml-auto text-fg3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent2" />
                    </a>
                  </li>
                ))}
              </ul>
            ) : null}
            {!profile.email && <p className="mt-6 text-fg2">{t('contact.emptyState')}</p>}
          </Reveal>

          {profile.email && (
            <Reveal delay={0.08}>
              <ContactForm to={profile.email} />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactForm({ to }: { to: string }) {
  const { t } = useTranslation()
  const uid = useId()
  const [values, setValues] = useState<ContactValues>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<ContactErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [trap, setTrap] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (trap) return // honeypot: bots fill hidden fields
    const errs = validateContact(values)
    setErrors(errs)
    if (Object.keys(errs).length) {
      document.getElementById(`${uid}-${Object.keys(errs)[0]}`)?.focus()
      return
    }
    setStatus('sending')
    try {
      const subject = t('contact.form.subject', { name: values.name.trim() })
      window.location.href = buildMailto(to, subject, values)
      window.setTimeout(() => setStatus('success'), 600)
    } catch {
      setStatus('error')
    }
  }

  const field = (name: keyof ContactValues, label: string, props: React.InputHTMLAttributes<HTMLInputElement> = {}, area = false) => {
    const id = `${uid}-${name}`
    const err = errors[name]
    const cls = `block w-full rounded-lg border bg-bg2 px-4 py-3 text-fg outline-none transition-colors placeholder:text-fg3 focus:border-accent2 ${err ? 'border-danger' : 'border-line'}`
    const common = {
      id,
      name,
      value: values[name],
      onChange: (e: React.ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => setValues((v) => ({ ...v, [name]: e.target.value })),
      'aria-invalid': err ? true : undefined,
      'aria-describedby': err ? `${id}-err` : undefined,
      className: cls,
    }
    return (
      <div>
        <label htmlFor={id} className="mono mb-2 block text-[0.6875rem] tracking-wider text-fg2 uppercase">{label}</label>
        {area ? <textarea rows={5} {...common} className={`${cls} resize-y`} /> : <input {...props} {...common} />}
        {err && <p id={`${id}-err`} className="m-0 mt-2 text-sm text-danger-fg">{t(err)}</p>}
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      {field('name', t('contact.form.name'), { type: 'text', autoComplete: 'name' })}
      {field('email', t('contact.form.email'), { type: 'email', autoComplete: 'email' })}
      {field('message', t('contact.form.message'), {}, true)}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>Website<input tabIndex={-1} autoComplete="off" value={trap} onChange={(e) => setTrap(e.target.value)} /></label>
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary disabled:opacity-60">
          {status === 'sending' ? t('contact.form.sending') : t('contact.form.send')}
        </button>
        <span className="text-sm text-fg3">{t('contact.form.note')}</span>
      </div>
      <div role="status" aria-live="polite" className="min-h-6 text-sm">
        {status === 'success' && <p className="m-0 text-accent2">{t('contact.form.success', { email: to })}</p>}
        {status === 'error' && <p className="m-0 text-danger-fg">{t('contact.form.error', { email: to })}</p>}
      </div>
    </form>
  )
}
