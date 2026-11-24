import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { siteUrl } from '../data/profile'

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  document.head.querySelector(selector)?.setAttribute(attr, value)
}

/** Keeps <html lang>, title, description and Open Graph in sync with the active language. */
export function useDocumentMeta() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t('meta.title')
    setMeta('meta[name="description"]', 'content', t('meta.description'))
    setMeta('meta[property="og:title"]', 'content', t('meta.title'))
    setMeta('meta[property="og:description"]', 'content', t('meta.description'))
    setMeta('meta[property="og:locale"]', 'content', t('meta.ogLocale'))
    setMeta('meta[name="twitter:title"]', 'content', t('meta.title'))
    setMeta('meta[name="twitter:description"]', 'content', t('meta.description'))
    setMeta('link[rel="canonical"]', 'href', siteUrl + '/')
  }, [lang, t])
}
