import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import type { ElementType, ReactNode } from 'react'

interface Props {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  as?: 'div' | 'li' | 'p' | 'h2' | 'h3'
}

/** One-shot scroll reveal: opacity + small translate only. Disabled for reduced motion. */
export function Reveal({ children, delay = 0, y = 22, className, as = 'div' }: Props) {
  const reduce = useReducedMotion()
  const Tag = m[as] as ElementType
  return (
    <Tag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
