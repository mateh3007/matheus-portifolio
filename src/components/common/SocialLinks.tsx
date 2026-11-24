import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { profile } from '../../data/profile'
import { GithubIcon, LinkedinIcon } from '../ui/BrandIcons'

export function SocialLinks({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  const items = [
    profile.linkedin && { key: 'linkedin', href: profile.linkedin, label: 'LinkedIn', icon: <LinkedinIcon /> , ext: true },
    profile.github && { key: 'github', href: profile.github, label: 'GitHub', icon: <GithubIcon />, ext: true },
    profile.email && { key: 'email', href: `mailto:${profile.email}`, label: t('contact.email'), icon: <Mail size={20} aria-hidden />, ext: false },
  ].filter(Boolean) as { key: string; href: string; label: string; icon: React.ReactNode; ext: boolean }[]

  return (
    <ul aria-label={t('a11y.social')} className={`m-0 flex list-none items-center gap-1 p-0 ${className}`}>
      {items.map((i) => (
        <li key={i.key}>
          <a
            href={i.href}
            aria-label={i.label}
            title={i.label}
            {...(i.ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            className="grid size-11 place-items-center rounded-full text-fg3 transition-colors hover:text-accent2"
          >
            {i.icon}
          </a>
        </li>
      ))}
    </ul>
  )
}
