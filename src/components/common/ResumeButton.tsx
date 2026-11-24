import { Download } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useResume } from '../../hooks/useResume'

/** Downloads the CV in the current language. Renders nothing until the PDF exists in /public/cv. */
export function ResumeButton({ className = 'btn btn-ghost' }: { className?: string }) {
  const { t } = useTranslation()
  const { url, name, available } = useResume()
  if (!available) return null
  return (
    <a href={url} download={name} className={className}>
      <Download size={17} aria-hidden /> {t('resume.download')}
    </a>
  )
}
