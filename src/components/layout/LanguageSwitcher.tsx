import { useTranslation } from 'react-i18next'
import { persistLocale } from '../../i18n'
import type { Locale } from '../../types'

const OPTIONS: { code: Locale; short: string; name: string }[] = [
  { code: 'en', short: 'EN', name: 'English' },
  { code: 'pt-BR', short: 'PT', name: 'Português' },
]

export function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const change = (code: Locale) => {
    void i18n.changeLanguage(code)
    persistLocale(code)
  }
  return (
    <div role="group" aria-label={t('a11y.language')} className="mono flex items-center text-[0.75rem] tracking-wider">
      {OPTIONS.map((o, i) => {
        const active = i18n.language === o.code
        return (
          <span key={o.code} className="flex items-center">
            {i > 0 && <span aria-hidden className="text-line px-0.5">|</span>}
            <button
              type="button"
              lang={o.code}
              aria-pressed={active}
              aria-label={t('a11y.switchTo', { language: o.name })}
              onClick={() => change(o.code)}
              className={`min-h-9 min-w-9 cursor-pointer rounded px-1.5 transition-colors ${active ? 'text-accent2' : 'text-fg3 hover:text-fg'}`}
            >
              {o.short}
            </button>
          </span>
        )
      })}
    </div>
  )
}
