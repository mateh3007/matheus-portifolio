import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useRef, type PointerEvent } from 'react'
import { useTranslation } from 'react-i18next'
import { experience } from '../../data/experience'

const ease = [0.22, 1, 0.36, 1] as const
/** Most recent first. Each card sits at a different depth for the parallax and a different horizontal offset. */
const cards = [...experience].reverse()
const OFFSETS = ['0rem', '2.25rem', '0.75rem', '2.75rem']
const DEPTH = [1, 0.7, 0.45, 0.25]

/** Real content as the hero visual: the companies behind the work, newest on top, drifting gently. */
export function HeroTrajectory() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const root = useRef<HTMLDivElement>(null)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduce || e.pointerType === 'touch' || !root.current) return
    const r = root.current.getBoundingClientRect()
    root.current.style.setProperty('--mx', String(((e.clientX - r.left) / r.width - 0.5) * 2))
    root.current.style.setProperty('--my', String(((e.clientY - r.top) / r.height - 0.5) * 2))
  }
  const onLeave = () => {
    root.current?.style.setProperty('--mx', '0')
    root.current?.style.setProperty('--my', '0')
  }

  return (
    <div ref={root} onPointerMove={onMove} onPointerLeave={onLeave} className="relative py-6" style={{ ['--mx' as string]: 0, ['--my' as string]: 0 }}>
      {/* soft halo behind the stack */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-1/2 h-[80%] -translate-y-1/2 rounded-full blur-3xl" style={{ background: 'radial-gradient(closest-side, rgba(57,120,213,0.22), transparent)' }} />
      {/* connecting line with a light travelling down it */}
      <span aria-hidden className="absolute bottom-10 left-8 top-10 w-px bg-gradient-to-b from-transparent via-line to-transparent">
        <span className="trail-dot absolute -left-[3px] size-[7px] rounded-full bg-accent2 shadow-[0_0_12px_2px_rgba(120,169,245,0.7)]" />
      </span>

      <ol aria-label={t('hero.companiesLabel')} className="relative m-0 flex list-none flex-col gap-4 p-0">
        {cards.map((c, i) => (
          <m.li
            key={c.id}
            initial={reduce ? false : { opacity: 0, y: 26, x: -12 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 + i * 0.12, ease }}
            style={{ marginLeft: OFFSETS[i] }}
            className="will-change-transform"
          >
            <div
              className="parallax"
              style={{ ['--depth' as string]: DEPTH[i] }}
            >
              <div className="layer-bob flex items-center gap-5 rounded-2xl border border-line bg-surface/90 px-5 py-4 shadow-[0_18px_40px_-22px_rgba(0,0,0,0.8)] backdrop-blur-sm" style={{ animationDelay: `${-i * 2.1}s` }}>
                <span className="flex h-10 w-[7.25rem] shrink-0 items-center">
                  {c.logo ? <img src={c.logo} alt="" aria-hidden width={116} height={40} className="max-h-8 w-auto max-w-full object-contain" /> : null}
                </span>
                <span aria-hidden className="h-8 w-px shrink-0 bg-line" />
                <span className="min-w-0">
                  <span className="flex items-center gap-2">
                    <span className="font-display text-[1.0625rem] font-light leading-tight tracking-tight">{c.company}</span>
                    {c.current && (
                      <span className="mono inline-flex items-center gap-1.5 rounded-full border border-accent/50 px-2 py-0.5 text-[0.625rem] tracking-wider text-accent2 uppercase">
                        <span aria-hidden className="relative flex size-1.5">
                          <span className="absolute inset-0 rounded-full bg-accent2" style={{ animation: 'live 2.4s ease-out infinite' }} />
                          <span className="relative size-1.5 rounded-full bg-accent2" />
                        </span>
                        {t('experience.current')}
                      </span>
                    )}
                  </span>
                  {c.context && <span className="mt-0.5 block truncate text-sm text-fg3">{c.context}</span>}
                </span>
              </div>
            </div>
          </m.li>
        ))}
      </ol>
    </div>
  )
}
