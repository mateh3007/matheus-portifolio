import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const WIDTHS = [360, 390, 430, 768, 1024, 1280, 1440, 1920]

for (const w of WIDTHS) {
  test(`no horizontal overflow or console errors @${w}`, async ({ page }) => {
    const errors: string[] = []
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()))
    page.on('pageerror', (e) => errors.push(String(e)))
    await page.setViewportSize({ width: w, height: 900 })
    for (const lang of ['en', 'pt-BR']) {
      await page.addInitScript((l) => localStorage.setItem('mr-lang', l), lang)
      await page.goto('/')
      await page.waitForLoadState('networkidle')
      const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth)
      expect(over, `${lang} overflow`).toBeLessThanOrEqual(0)
    }
    expect(errors).toEqual([])
  })
}

test('language switch persists across reloads and updates metadata', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engineering systems.')
  await page.getByRole('button', { name: /Português/ }).click()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engenharia de sistemas.')
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt-BR')
  await expect(page).toHaveTitle(/Arquitetura e IA/)
  await page.reload()
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Engenharia de sistemas.')
})

test('browser language fallback is English when unsupported', async ({ browser }) => {
  const ctx = await browser.newContext({ locale: 'fr-FR' })
  const page = await ctx.newPage()
  await page.goto('/')
  await expect(page.locator('html')).toHaveAttribute('lang', 'en')
  await ctx.close()
})

test('anchor navigation reaches each section and marks it active', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.locator('#projects').waitFor({ state: 'attached' })
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
  await expect(page.locator('#projects')).toBeInViewport()
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'true')
})

test('mobile menu opens, navigates, closes with Escape', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 800 })
  await page.goto('/')
  await page.locator('#experience').waitFor({ state: 'attached' })
  const toggle = page.getByRole('button', { name: 'Open menu' })
  await toggle.click()
  await expect(page.locator('#mobile-menu')).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.locator('#mobile-menu')).toBeHidden()
  await page.getByRole('button', { name: 'Open menu' }).click()
  await page.locator('#mobile-menu').getByRole('link', { name: 'Experience' }).click()
  await expect(page.locator('#mobile-menu')).toBeHidden()
  await expect(page.locator('#experience')).toBeInViewport()
})

test('expertise tabs work with keyboard', async ({ page }) => {
  await page.goto('/')
  const first = page.getByRole('tab', { name: /Backend Engineering/ })
  await first.focus()
  await page.keyboard.press('ArrowDown')
  await expect(page.getByRole('tab', { name: /AI Engineering/ })).toHaveAttribute('aria-selected', 'true')
  await expect(page.getByRole('tabpanel')).toContainText('Model Context Protocol (MCP)')
})

test('project case study dialog opens and closes returning focus', async ({ page }) => {
  await page.goto('/')
  const opener = page.getByRole('button', { name: /View case study/ }).first()
  await opener.scrollIntoViewIfNeeded()
  await opener.click()
  const dlg = page.getByRole('dialog')
  await expect(dlg).toBeVisible()
  await expect(dlg).toContainText('NestJS')
  await page.keyboard.press('Escape')
  await expect(dlg).toBeHidden()
  await expect(opener).toBeFocused()
})

test('certifications lists completed and in-progress groups', async ({ page }) => {
  await page.goto('/')
  const sec = page.locator('#certifications')
  await expect(sec).toContainText('Completed')
  await expect(sec).toContainText('In progress')
  await expect(sec).toContainText('Introdução à IA')
  await expect(sec).toContainText('System Design')
})

for (const [flag, code, other, file, label] of [
  ['EN', 'en', 'pt-BR', 'Matheus-Reis-CV-en.pdf', 'Download CV'],
  ['PT', 'pt-BR', 'en', 'Matheus-Reis-CV-pt-BR.pdf', 'Baixar currículo'],
] as const) {
  test(`CV download follows the selected language (${flag})`, async ({ page }) => {
    await page.goto('/')
    // Switch away first so the test proves the flag drives the file, not the default.
    await page.locator(`button[lang="${other}"]`).click()
    await page.locator(`button[lang="${code}"]`).click()
    await expect(page.locator('html')).toHaveAttribute('lang', code)
    const btn = page.locator('a[download]').first()
    await expect(btn).toHaveText(new RegExp(label))
    await expect(btn).toHaveAttribute('href', `/cv/${file}`)
    const [dl] = await Promise.all([page.waitForEvent('download'), btn.click()])
    expect(dl.suggestedFilename()).toBe(file)
  })
}

for (const lang of ['en', 'pt-BR']) {
  test(`axe: no serious/critical violations (${lang})`, async ({ page }) => {
    await page.addInitScript((l) => localStorage.setItem('mr-lang', l), lang)
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    const res = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze()
    const bad = res.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical')
    expect(bad.map((v) => `${v.id}: ${v.nodes.map((n) => n.target.join(' ')).slice(0, 3).join(' | ')}`)).toEqual([])
  })
}
