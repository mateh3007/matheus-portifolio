import { useTranslation } from 'react-i18next'
import { Reveal } from '../common/Reveal'
import { ResumeButton } from '../common/ResumeButton'
import { SectionHeading } from '../common/SectionHeading'

interface Step { year: string; title: string; text: string }

export function About() {
  const { t } = useTranslation()
  const paragraphs = t('about.paragraphs', { returnObjects: true }) as string[]
  const steps = t('about.path.steps', { returnObjects: true }) as Step[]
  const [first, ...rest] = paragraphs

  return (
    <section id="about" aria-labelledby="about-title" className="section theme-lift [--edge-t:#0a1525] [--edge-b:#0b1728]">
      <div className="wrap">
        <SectionHeading index="02" label={t('nav.about')} id="about-title" title={t('about.title')} />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[5fr_6fr] lg:gap-24">
          <div>
            <Reveal>
              <figure className="relative m-0 mb-12 w-full max-w-[16.5rem] lg:mb-14">
                <span aria-hidden className="absolute -bottom-3 -right-3 size-full rounded-2xl border border-accent/40" />
                <picture>
                  <source srcSet="/images/portrait.webp" type="image/webp" />
                  <img
                    src="/images/portrait.jpg"
                    alt={t('about.photoAlt')}
                    width={640}
                    height={640}
                    loading="lazy"
                    decoding="async"
                    className="relative aspect-[4/5] w-full rounded-2xl border border-line object-cover [object-position:50%_20%]"
                  />
                </picture>
              </figure>
            </Reveal>
            <Reveal>
              <p className="font-display text-[clamp(1.5rem,1.1rem+1.6vw,2.4rem)] font-light leading-[1.22] tracking-[-0.02em] text-fg">
                <span aria-hidden className="mr-1 text-accent2">“</span>
                {t('about.statement')}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-12 lg:mt-16">
                <p className="eyebrow mb-6">{t('about.path.label')}</p>
                <ol className="relative m-0 list-none p-0">
                  <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-line" />
                  {steps.map((s, i) => (
                    <li key={s.year} className="relative pb-7 pl-8 last:pb-0">
                      <span
                        aria-hidden
                        className={`absolute left-0 top-[0.55rem] size-[11px] rounded-full border bg-bg ${i === steps.length - 1 ? 'border-accent2 shadow-[0_0_0_4px_rgba(57,120,213,0.18)]' : 'border-fg3'}`}
                      />
                      <p className="mono m-0 text-[0.75rem] text-accent2">{s.year}</p>
                      <p className="m-0 mt-0.5 font-display text-base font-normal">{s.title}</p>
                      <p className="m-0 mt-1 text-sm text-fg2">{s.text}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>
          </div>

          <div className="max-w-[62ch]">
            <Reveal>
              <p className="m-0 text-[1.1875rem] leading-[1.65] text-fg sm:text-[1.3125rem]">{first}</p>
            </Reveal>
            <div className="mt-8 space-y-6">
              {rest.map((p, i) => (
                <Reveal key={i} delay={0.03}>
                  <p className="m-0 text-fg2">{p}</p>
                </Reveal>
              ))}
            </div>
            <Reveal delay={0.05}>
              <div className="mt-10 flex">
                <ResumeButton className="btn btn-primary" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
