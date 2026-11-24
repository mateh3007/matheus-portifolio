import { Menu, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useReducedMotion } from 'motion/react'
import * as m from 'motion/react-m'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useScrolled } from '../../hooks/useScrolled'
import { SECTIONS } from '../../lib/sections'
import { LanguageSwitcher } from './LanguageSwitcher'

export function Navbar() {
  const { t } = useTranslation()
  const scrolled = useScrolled()
  const active = useActiveSection(SECTIONS)
  const [open, setOpen] = useState(false)
  const reduce = useReducedMotion()
  const toggleRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  const items = SECTIONS.filter((s) => s !== 'home')

  return (
    <m.header
      initial={reduce ? false : { opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-line bg-bg/90 backdrop-blur-md' : 'border-transparent bg-transparent'
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#home" className="font-display text-[0.95rem] font-medium tracking-tight whitespace-nowrap no-underline" aria-label="Matheus Reis — Home">
          Matheus<span className="text-accent2"> Reis</span>
        </a>

        <nav aria-label={t('a11y.mainNav')} className="hidden items-center gap-1 lg:flex">
          {items.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              aria-current={active === id ? 'true' : undefined}
              className={`relative rounded px-3 py-2 text-[0.875rem] no-underline transition-colors ${active === id ? 'text-fg' : 'text-fg2 hover:text-fg'}`}
            >
              {t(`nav.${id}`)}
              {active === id && <span aria-hidden className="absolute inset-x-3 -bottom-0.5 h-px bg-accent2" />}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <a href="#contact" className="btn btn-ghost hidden !min-h-9 !px-4 !text-[0.8125rem] lg:inline-flex">
            {t('nav.cta')}
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="grid size-11 cursor-pointer place-items-center rounded-full text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('a11y.closeMenu') : t('a11y.openMenu')}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-menu" aria-label={t('a11y.mainNav')} className="wrap h-[calc(100dvh-4rem)] overflow-y-auto pb-10 pt-4 lg:hidden">
          <ul className="m-0 list-none p-0">
            {items.map((id, i) => (
              <li key={id} className="border-b border-line">
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  aria-current={active === id ? 'true' : undefined}
                  className={`flex items-baseline gap-4 py-5 font-display text-2xl font-light no-underline ${active === id ? 'text-accent2' : 'text-fg'}`}
                >
                  <span className="mono text-xs text-fg3">0{i + 2}</span>
                  {t(`nav.${id}`)}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={() => setOpen(false)} className="btn btn-primary mt-8 w-full justify-center">
            {t('nav.cta')}
          </a>
        </nav>
      )}
    </m.header>
  )
}
