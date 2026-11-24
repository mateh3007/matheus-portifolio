import { ArrowRight } from 'lucide-react'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { ResumeButton } from '../common/ResumeButton'
import { SocialLinks } from '../common/SocialLinks'
import { HeroTrajectory } from './HeroTrajectory'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { t } = useTranslation()
  const reduce = useReducedMotion()
  const lines = [t('hero.line1'), t('hero.line2'), t('hero.line3')]
  const pillars = t('hero.pillars', { returnObjects: true }) as string[]

  const rise = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay: i * 0.08, ease },
  })

  return (
    <section id="home" aria-labelledby="hero-title" className="grain relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 lg:pt-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(60% 55% at 78% 45%, rgba(57,120,213,0.12), transparent 70%), linear-gradient(180deg, #07111f, #0b1728 140%)' }}
      />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-6">
        <div>
          <m.p {...rise(0)} className="eyebrow">
            <span aria-hidden className="h-px w-8 bg-accent" />
            <span className="uppercase tracking-[0.18em] text-fg2">{t('hero.label')}</span>
          </m.p>

          <h1 id="hero-title" className="h-display h-hero mt-6">
            {lines.map((l, i) => (
              <m.span key={i} {...rise(i + 1)} className={`block ${i === 1 ? 'text-fg' : i === 2 ? 'text-accent2' : 'text-fg'}`}>
                {l}
              </m.span>
            ))}
          </h1>

          <m.p {...rise(4)} className="lead mt-8 text-[1.0625rem] sm:text-lg">
            {t('hero.description')}
          </m.p>

          <m.div {...rise(5)} className="mt-9 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn btn-primary">
              {t('hero.primary')} <ArrowRight size={18} className="arrow" aria-hidden />
            </a>
            <a href="#contact" className="btn btn-ghost">
              {t('hero.secondary')}
            </a>
            <ResumeButton />
          </m.div>

          <m.div {...rise(6)} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <SocialLinks className="-ml-3" />
            {profile.showAvailability && (
              <p className="mono m-0 flex items-center gap-2 text-xs text-fg2">
                <span className="relative flex size-2">
                  <span className="absolute inset-0 rounded-full bg-accent2" style={{ animation: 'live 2.4s ease-out infinite' }} />
                  <span className="relative size-2 rounded-full bg-accent2" />
                </span>
                {t('hero.availability')}
              </p>
            )}
          </m.div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem] lg:max-w-none">
          <HeroTrajectory />
          <ul className="mono m-0 flex list-none justify-center gap-5 p-0 text-[0.6875rem] tracking-widest text-fg3 uppercase lg:justify-end lg:pr-6">
            {pillars.map((p, i) => (
              <li key={p} className="flex items-center gap-2">
                <span className="text-accent2">0{i + 1}</span>
                {p}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <a href="#about" aria-label={t('a11y.scrollDown')} className="mono absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[0.6875rem] tracking-widest text-fg3 uppercase no-underline md:flex">
        {t('hero.scroll')}
        <span aria-hidden className="h-8 w-px bg-line">
          <span className="block h-full w-px bg-accent2" style={{ animation: 'scrollcue 2.4s var(--ease) infinite' }} />
        </span>
      </a>
    </section>
  )
}
