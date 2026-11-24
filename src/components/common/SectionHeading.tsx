import type { ReactNode } from 'react'
import { Reveal } from './Reveal'

interface Props {
  index: string
  label: string
  id: string
  title: ReactNode
  description?: string
  className?: string
}

export function SectionHeading({ index, label, id, title, description, className = '' }: Props) {
  return (
    <header className={`max-w-3xl ${className}`}>
      <Reveal>
        <p className="eyebrow">
          <span className="idx">{index}</span>
          <span aria-hidden className="h-px w-8 bg-line" />
          <span>{label}</span>
        </p>
      </Reveal>
      <Reveal delay={0.06} as="h2" className="h-section mt-5">
        <span id={id}>{title}</span>
      </Reveal>
      {description && (
        <Reveal delay={0.12}>
          <p className="lead mt-5">{description}</p>
        </Reveal>
      )}
    </header>
  )
}
