import { AnimatePresence, useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useRef, useState, type KeyboardEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { technologies } from '../../data/technologies'
import type { TechKind } from '../../types'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

const KIND_ORDER: TechKind[] = ['language', 'framework', 'platform', 'concept', 'discipline']

export function Expertise() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const [activeIdx, setActiveIdx] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const cat = technologies[activeIdx]!

  const onKey = (e: KeyboardEvent) => {
    const n = technologies.length
    let next: number
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = (activeIdx + 1) % n
    else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = (activeIdx - 1 + n) % n
    else if (e.key === 'Home') next = 0
    else if (e.key === 'End') next = n - 1
    else return
    e.preventDefault()
    setActiveIdx(next)
    tabs.current[next]?.focus()
  }

  const groups = KIND_ORDER.map((k) => ({ kind: k, items: cat.items.filter((i) => i.kind === k) })).filter((g) => g.items.length)

  return (
    <section id="expertise" aria-labelledby="expertise-title" className="section theme-lift [--edge-t:#0b1728] [--edge-b:#0b1728]">
      <div className="wrap">
        <SectionHeading index="04" label={t('nav.expertise')} id="expertise-title" title={t('expertise.title')} description={t('expertise.description')} />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-20">
          <Reveal>
            <div role="tablist" aria-orientation="vertical" aria-label={t('expertise.title')} onKeyDown={onKey} className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1 lg:gap-0">
              {technologies.map((c, i) => {
                const on = i === activeIdx
                return (
                  <button
                    key={c.id}
                    ref={(el) => { tabs.current[i] = el }}
                    role="tab"
                    id={`tab-${c.id}`}
                    aria-selected={on}
                    aria-controls="expertise-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActiveIdx(i)}
                    className={`group flex min-h-14 cursor-pointer items-baseline gap-4 rounded-lg border px-4 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5 ${
                      on ? 'border-accent/60 bg-surface/60 lg:bg-transparent' : 'border-line bg-transparent hover:border-fg3 lg:hover:border-line'
                    }`}
                  >
                    <span className={`mono text-xs transition-colors ${on ? 'text-accent2' : 'text-fg3'}`}>0{i + 1}</span>
                    <span className={`font-display text-[1.0625rem] tracking-tight transition-all lg:text-[1.5rem] lg:font-light ${on ? 'text-fg lg:translate-x-1' : 'text-fg2 group-hover:text-fg'}`}>
                      {t(`expertise.categories.${c.id}.title`)}
                    </span>
                  </button>
                )
              })}
            </div>
            <p className="mono mt-6 text-[0.75rem] text-fg3">{t('expertise.note')}</p>
          </Reveal>

          <div role="tabpanel" id="expertise-panel" aria-labelledby={`tab-${cat.id}`} tabIndex={0} className="min-h-[22rem] rounded-2xl border border-line bg-gradient-to-b from-surface/50 to-transparent p-6 sm:p-9">
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={cat.id}
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="m-0 font-display text-[clamp(1.5rem,1.2rem+1vw,2rem)] font-light tracking-tight">{t(`expertise.categories.${cat.id}.title`)}</h3>
                <p className="mt-2 mb-0 max-w-[48ch] text-fg2">{t(`expertise.categories.${cat.id}.summary`)}</p>

                <div className="mt-8 space-y-6">
                  {groups.map((g) => (
                    <div key={g.kind} className="grid gap-2 sm:grid-cols-[10.5rem_1fr] sm:gap-6">
                      <h4 className="mono m-0 pt-1 text-[0.6875rem] font-normal tracking-wider text-fg3 uppercase">{t(`expertise.kinds.${g.kind}`)}</h4>
                      <ul className="m-0 flex list-none flex-wrap gap-2 p-0">
                        {g.items.map((it) => (
                          <li key={it.name} className="rounded-md border border-line bg-bg/40 px-3 py-1.5 text-[0.9375rem] text-fg transition-colors hover:border-accent/60 hover:text-accent2">
                            {it.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </m.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
