import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { SocialLinks } from '../common/SocialLinks'

export function Footer() {
  const { t } = useTranslation()
  return (
    <footer className="border-t border-line bg-bg2">
      <div className="wrap flex flex-col gap-8 py-12 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="m-0 font-display text-lg font-light tracking-tight">{profile.name}</p>
          <p className="mono m-0 mt-1 text-xs text-fg3">{t('footer.role')}</p>
        </div>
        <SocialLinks className="-ml-3 md:ml-0" />
        <div className="text-sm text-fg3">
          <p className="m-0">© {new Date().getFullYear()} {profile.name}. {t('footer.rights')}</p>
          <p className="m-0 mt-1">
            <a href="#home" className="link text-fg2">{t('a11y.backToTop')} ↑</a>
          </p>
        </div>
      </div>
    </footer>
  )
}
