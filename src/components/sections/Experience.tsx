import { useTranslation } from 'react-i18next'
import { experience } from '../../data/experience'
import { Reveal } from '../common/Reveal'
import { SectionHeading } from '../common/SectionHeading'

export function Experience() {
  const { t } = useTranslation()
  return (
    <section id="experience" aria-labelledby="experience-title" className="section bg-bg2">
      <div className="wrap">
        <SectionHeading index="03" label={t('nav.experience')} id="experience-title" title={t('experience.title')} description={t('experience.description')} />

        <ol className="relative m-0 mt-16 grid list-none gap-12 p-0 md:mt-24 md:grid-cols-4 md:gap-8">
          <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-line md:bottom-auto md:left-0 md:right-0 md:top-[5px] md:h-px md:w-auto" />
          {experience.map((e, i) => (
            <li key={e.id} className="relative pl-9 md:pl-0 md:pt-12">
              <span
                aria-hidden
                className={`absolute left-0 top-[0.45rem] size-[11px] rounded-full border md:top-0 ${e.current ? 'border-accent2 bg-accent shadow-[0_0_0_5px_rgba(57,120,213,0.2)]' : 'border-fg3 bg-bg2'}`}
              />
              <Reveal delay={i * 0.08}>
                <p className="mono m-0 flex items-center gap-3 text-[0.75rem] text-fg3">
                  <span>0{i + 1}</span>
                  {e.current && <span className="rounded-full border border-accent/50 px-2.5 py-0.5 text-[0.6875rem] tracking-wider text-accent2 uppercase">{t('experience.current')}</span>}
                </p>
                {e.logo && (
                  <div className="mt-5 flex h-10 items-center">
                    <img src={e.logo} alt="" aria-hidden loading="lazy" className="max-h-9 w-auto max-w-[10.5rem]" />
                  </div>
                )}
                <h3 className="mt-4 mb-0 font-display text-[clamp(1.75rem,1.3rem+1.4vw,2.5rem)] font-light tracking-[-0.03em] leading-none">{e.url ? (
                    <a href={e.url} target="_blank" rel="noopener noreferrer" className="text-inherit no-underline transition-colors hover:text-accent2">
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </h3>
                {e.context && (
                  <p className="m-0 mt-3 text-fg2">
                    <span className="sr-only">{t('experience.contextLabel')}: </span>
                    {e.context}
                  </p>
                )}
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
