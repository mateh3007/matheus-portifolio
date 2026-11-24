import { lazy, Suspense } from 'react'
import { LazyMotion, domAnimation } from 'motion/react'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { Hero } from '../components/sections/Hero'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import { useTranslation } from 'react-i18next'

// Below-the-fold content ships as a separate chunk so the hero paints sooner.
const loadBelowFold = () => import('./BelowFold')
const BelowFold = lazy(loadBelowFold)

export default function App() {
  const { t } = useTranslation()
  useDocumentMeta()
  return (
    <LazyMotion features={domAnimation} strict>
      <a href="#about" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-white">
        {t('a11y.skip')}
      </a>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={<div style={{ minHeight: '100svh' }} aria-hidden />}>
          <BelowFold />
        </Suspense>
      </main>
      <Footer />
    </LazyMotion>
  )
}
