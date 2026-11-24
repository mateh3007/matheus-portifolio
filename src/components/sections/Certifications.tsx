import { ArrowUpRight, Award, Cloud, GraduationCap, Layers, Network } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { certifications } from '../../data/certifications'
import type { Certification } from '../../types'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const ICONS = { cloud: Cloud, layers: Layers, network: Network, graduation: GraduationCap } as const

function Thumb({ c }: { c: Certification }) {
  const Icon = (c.icon && ICONS[c.icon]) || Award
  return (
    <span aria-hidden className="grid size-14 shrink-0 place-items-center overflow-hidden rounded-xl border border-line bg-surface">
      {c.image ? <img src={c.image} alt="" width={56} height={56} loading="lazy" className="size-full object-contain p-1.5" /> : <Icon size={22} className="text-accent2" />}
    </span>
  )
}

function Group({ title, items }: { title: string; items: Certification[] }) {
  const { t } = useTranslation()
  if (items.length === 0) return null
  return (
    <div className="mt-14 first:mt-14">
      <Reveal>
        <h3 className="mono m-0 flex items-center gap-4 text-[0.75rem] font-normal tracking-widest text-fg3 uppercase">
          <span>{title}</span>
          <span aria-hidden className="h-px flex-1 bg-line" />
        </h3>
      </Reveal>
      <ul className="m-0 mt-6 grid list-none gap-px overflow-hidden rounded-xl border border-line bg-line p-0 md:grid-cols-2">
        {items.map((c) => {
          const name = t(`certifications.items.${c.id}.name`, { defaultValue: c.name })
          const issuer = t(`certifications.items.${c.id}.issuer`, { defaultValue: c.issuer ?? '' })
          return (
            <li key={c.id} className="flex items-start gap-5 bg-bg2 p-6 sm:p-7">
              <Thumb c={c} />
              <div className="min-w-0">
                <p className="m-0 font-display text-lg leading-snug font-normal">{name}</p>
                {issuer && <p className="m-0 mt-1 text-sm text-fg2">{issuer}</p>}
                {(c.hours || c.credentialId) && (
                  <p className="mono m-0 mt-3 text-xs break-all text-fg3">
                    {c.hours && t('certifications.hours', { count: c.hours })}
                    {c.hours && c.credentialId && ' · '}
                    {c.credentialId && <>ID {c.credentialId}</>}
                  </p>
                )}
                {c.verificationUrl && (
                  <a href={c.verificationUrl} target="_blank" rel="noopener noreferrer" className="link mt-3 inline-flex items-center gap-1 text-sm">
                    {t('certifications.verify')} <ArrowUpRight size={14} aria-hidden />
                  </a>
                )}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export function Certifications() {
  const { t } = useTranslation()
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="section bg-bg2">
      <div className="wrap">
        <SectionHeading index="05" label={t('nav.certifications')} id="certifications-title" title={t('certifications.title')} description={t('certifications.description')} />
        <Group title={t('certifications.completed')} items={certifications.filter((c) => c.status === 'completed')} />
        <Group title={t('certifications.inProgress')} items={certifications.filter((c) => c.status === 'in-progress')} />
      </div>
    </section>
  )
}
