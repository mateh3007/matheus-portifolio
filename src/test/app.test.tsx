import { act, render, screen, within } from '@testing-library/react'
import '../i18n'
import i18n from '../i18n'
import App from '../app/App'

beforeAll(() => {
  window.IntersectionObserver = class { observe() {} unobserve() {} disconnect() {} takeRecords() { return [] } root = null; rootMargin = ''; thresholds = [] } as unknown as typeof IntersectionObserver
  window.HTMLDialogElement.prototype.showModal ||= function () { this.open = true }
})

describe('App', () => {
  it('renders all sections and switches language without reload', async () => {
    render(<App />)
    await screen.findByRole('tablist')
    for (const id of ['home', 'about', 'experience', 'expertise', 'certifications', 'projects', 'contact']) {
      expect(document.getElementById(id)).toBeInTheDocument()
    }
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Engineering systems.')
    await act(() => i18n.changeLanguage('pt-BR'))
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Engenharia de sistemas.')
    expect(document.documentElement.lang).toBe('pt-BR')
    expect(screen.getByRole('heading', { name: 'Vamos construir algo relevante.' })).toBeInTheDocument()
    await act(() => i18n.changeLanguage('en'))
  })

  it('shows six expertise tabs', async () => {
    render(<App />)
    const tabs = within(await screen.findByRole('tablist')).getAllByRole('tab')
    expect(tabs).toHaveLength(6)
  })
})
