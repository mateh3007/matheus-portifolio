import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

const FILES = { 'pt-BR': '/cv/Matheus-Reis-CV-pt-BR.pdf', en: '/cv/Matheus-Reis-CV-en.pdf' } as const

/** CV in the visitor's language, plus whether that PDF really exists (a missing file would fall back to index.html). */
export function useResume(): { url: string; name: string; available: boolean } {
  const { i18n } = useTranslation()
  const url = i18n.language.toLowerCase().startsWith('pt') ? FILES['pt-BR'] : FILES.en
  const [ok, setOk] = useState<string | null>(null)
  useEffect(() => {
    let live = true
    fetch(url, { method: 'HEAD' })
      .then((r) => live && setOk(r.ok && (r.headers.get('content-type') ?? '').includes('pdf') ? url : null))
      .catch(() => live && setOk(null))
    return () => {
      live = false
    }
  }, [url])
  return { url, name: url.split('/').pop() ?? 'CV.pdf', available: ok === url }
}
