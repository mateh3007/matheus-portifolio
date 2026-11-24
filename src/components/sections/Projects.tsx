import { ArrowLeft, ArrowRight, ArrowUpRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { projects } from '../../data/projects'
import type { Project } from '../../types'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const OPTIONAL_FIELDS = ['problem', 'challenge', 'approach', 'decisions', 'contribution', 'results'] as const

export function Projects() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState<string | null>(null)
  const opener = useRef<HTMLElement | null>(null)
  const open = projects.find((p) => p.id === openId) ?? null

  const show = (id: string, el: HTMLElement) => {
    opener.current = el
    setOpenId(id)
  }
  const close = () => {
    setOpenId(null)
    opener.current?.focus()
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className="section">
      <div className="wrap">
        <SectionHeading index="06" label={t('nav.projects')} id="projects-title" title={t('projects.title')} description={t('projects.description')} />
        <Carousel onOpen={show} />
        <p className="mono mt-10 text-[0.75rem] text-fg3">{t('projects.confidential')}</p>
      </div>
      {open && <ProjectDialog project={open} onClose={close} />}
    </section>
  )
}

/** Horizontal, scroll-snapping row of project cards. Arrows appear only when there is more than fits. */
function Carousel({ onOpen }: { onOpen: (id: string, el: HTMLElement) => void }) {
  const { t } = useTranslation()
  const track = useRef<HTMLUListElement>(null)
  const [edge, setEdge] = useState({ start: true, end: true, overflow: false })

  const measure = useCallback(() => {
    const el = track.current
    if (!el) return
    setEdge({ overflow: el.scrollWidth - el.clientWidth > 4, start: el.scrollLeft <= 4, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4 })
  }, [])

  useEffect(() => {
    measure()
    const el = track.current
    if (!el) return
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', measure)
      return () => window.removeEventListener('resize', measure)
    }
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [measure])

  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    const card = el.querySelector('li')
    const step = (card?.getBoundingClientRect().width ?? el.clientWidth * 0.8) + 24
    el.scrollBy({ left: dir * step, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
  }

  return (
    <div className="mt-12 lg:mt-16">
      {edge.overflow && (
        <div className="mb-5 flex items-center justify-end gap-2">
          <button type="button" onClick={() => go(-1)} disabled={edge.start} aria-label={t('projects.prev')} className="arrow-btn">
            <ArrowLeft size={18} aria-hidden />
          </button>
          <button type="button" onClick={() => go(1)} disabled={edge.end} aria-label={t('projects.next')} className="arrow-btn">
            <ArrowRight size={18} aria-hidden />
          </button>
        </div>
      )}
      <ul
        ref={track}
        onScroll={measure}
        tabIndex={0}
        aria-label={t('projects.listLabel')}
        className="no-scrollbar m-0 -mx-[var(--gutter)] flex list-none snap-x snap-mandatory gap-6 overflow-x-auto scroll-px-[var(--gutter)] px-[var(--gutter)] pb-4 pt-1"
      >
        {projects.map((p, i) => (
          <li key={p.id} className="w-[84vw] shrink-0 snap-start sm:w-[calc((100%-1.5rem)/2)] lg:w-[calc((100%-3rem)/3)]">
            <Reveal delay={i * 0.06} className="h-full">
              <ProjectCard project={p} index={i} onOpen={onOpen} />
            </Reveal>
          </li>
        ))}
      </ul>
    </div>
  )
}

function KindBadge({ kind }: { kind: Project['kind'] }) {
  const { t } = useTranslation()
  return (
    <span className="mono rounded-full border border-line px-2.5 py-0.5 text-[0.6875rem] tracking-wider text-fg2 uppercase">{t(`projects.kinds.${kind}`)}</span>
  )
}

function ProjectCard({ project: p, index, onOpen }: { project: Project; index: number; onOpen: (id: string, el: HTMLElement) => void }) {
  const { t } = useTranslation()
  const k = `projects.items.${p.id}`
  return (
    <article aria-labelledby={`p-${p.id}`} className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-bg2 transition-[border-color,transform] duration-500 ease-[var(--ease)] hover:-translate-y-1 hover:border-accent/60 focus-within:border-accent/60">
      <div className="relative grid aspect-[16/10] place-items-center" style={{ background: 'radial-gradient(70% 80% at 50% 40%, #1b3250 0%, #0B1728 100%)' }}>
        {p.logo ? (
          <img src={p.logo} alt="" aria-hidden loading="lazy" style={{ width: `min(${(p.logoWidth ?? 120) * 1.5}px, 58%)` }} className="block h-auto max-h-[42%] object-contain transition-transform duration-[900ms] ease-[var(--ease)] group-hover:scale-105" />
        ) : (
          <span aria-hidden className="font-display text-3xl font-light tracking-[-0.03em] text-fg">{t(`${k}.name`)}</span>
        )}
        <span className="mono absolute left-4 top-3.5 text-[0.6875rem] tracking-widest text-fg3">0{index + 1}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-3">
          <KindBadge kind={p.kind} />
          <span className="mono text-[0.75rem] text-fg3">{t(`${k}.org`)}</span>
        </div>
        <h3 id={`p-${p.id}`} className="mt-4 mb-0 font-display text-[1.6rem] font-light leading-[1.1] tracking-[-0.03em]">
          {t(`${k}.name`)}
        </h3>
        <p className="mt-3 mb-0 text-[0.95rem] text-fg2">{t(`${k}.summary`)}</p>
        <ul className="mono m-0 mt-5 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-[0.6875rem] text-fg3">
          {p.technologies.slice(0, 4).map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
        {/* Stretched button: the whole card opens the case study, with one focusable control. */}
        <button
          type="button"
          onClick={(e) => onOpen(p.id, e.currentTarget)}
          className="link mt-auto inline-flex w-fit cursor-pointer items-center gap-2 border-0 bg-transparent p-0 pt-7 font-[inherit] text-[0.9375rem] after:absolute after:inset-0 after:content-['']"
        >
          {t('projects.viewCase')}
          <span className="sr-only">: {t(`${k}.name`)}</span>
          <ArrowUpRight size={16} aria-hidden />
        </button>
      </div>
    </article>
  )
}

function ProjectDialog({ project: p, onClose }: { project: Project; onClose: () => void }) {
  const { t, i18n } = useTranslation()
  const ref = useRef<HTMLDialogElement>(null)
  const k = `projects.items.${p.id}`

  useEffect(() => {
    const d = ref.current
    if (d && !d.open) d.showModal()
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  const focus = t(`${k}.focus`, { returnObjects: true }) as string[]
  const extra = OPTIONAL_FIELDS.filter((f) => i18n.exists(`${k}.${f}`))

  return (
    <dialog
      ref={ref}
      aria-labelledby="dlg-title"
      onClose={onClose}
      onClick={(e) => e.target === ref.current && ref.current?.close()}
      className="m-auto max-h-[90dvh] w-[min(46rem,calc(100vw-1.5rem))] overflow-y-auto rounded-2xl border border-line bg-surface p-0 text-fg backdrop:bg-[rgba(4,9,17,0.78)]"
    >
      <div className="p-6 sm:p-10">
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <KindBadge kind={p.kind} />
            <span className="mono text-xs text-fg3">{t(`${k}.org`)}</span>
          </div>
          <button type="button" autoFocus onClick={() => ref.current?.close()} aria-label={t('a11y.closeDialog')} className="-m-2 grid size-11 cursor-pointer place-items-center rounded-full border-0 bg-transparent text-fg2 hover:text-fg">
            <X size={22} aria-hidden />
          </button>
        </div>

        {p.logo && <img src={p.logo} alt="" aria-hidden style={{ width: p.logoWidth }} className="mt-6 block h-auto max-h-8 object-contain" />}
        <h3 id="dlg-title" className="mt-4 mb-0 font-display text-3xl font-light tracking-tight sm:text-4xl">{t(`${k}.name`)}</h3>

        <dl className="m-0 mt-8 space-y-8">
          <Field label={t('projects.fields.context')}>
            <p className="m-0 text-fg2">{t(`${k}.context`)}</p>
          </Field>
          <Field label={t('projects.fields.focus')}>
            <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
              {focus.map((f) => (
                <li key={f} className="rounded-md border border-line bg-bg/40 px-3 py-1.5 text-[0.9rem]">{f}</li>
              ))}
            </ul>
          </Field>
          {extra.map((f) => (
            <Field key={f} label={t(`projects.fields.${f}`)}>
              <p className="m-0 text-fg2">{t(`${k}.${f}`)}</p>
            </Field>
          ))}
          <Field label={t('projects.fields.technologies')}>
            <ul className="mono m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-[0.8125rem] text-accent2">
              {p.technologies.map((tech) => (
                <li key={tech}>{tech}</li>
              ))}
            </ul>
          </Field>
        </dl>

        {(p.repoUrl || p.liveUrl) && (
          <div className="mt-8 flex flex-wrap gap-5">
            {p.repoUrl && <a className="link inline-flex items-center gap-1" href={p.repoUrl} target="_blank" rel="noopener noreferrer">{t('projects.repo')} <ArrowUpRight size={15} aria-hidden /></a>}
            {p.liveUrl && <a className="link inline-flex items-center gap-1" href={p.liveUrl} target="_blank" rel="noopener noreferrer">{t('projects.live')} <ArrowUpRight size={15} aria-hidden /></a>}
          </div>
        )}

        {extra.length === 0 && <p className="mt-10 mb-0 border-t border-line pt-5 text-sm text-fg3">{t('projects.pending')}</p>}
      </div>
    </dialog>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="mono mb-2 text-[0.6875rem] tracking-wider text-fg3 uppercase">{label}</dt>
      <dd className="m-0">{children}</dd>
    </div>
  )
}
