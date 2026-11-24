import { chromium } from '@playwright/test'
const [,, tag='a', lang='en', ...widths] = process.argv
const out = process.env.OUT
const sizes = (widths.length ? widths : ['1440']).map(Number)
const b = await chromium.launch()
for (const w of sizes) {
  const ctx = await b.newContext({ viewport: { width: w, height: w < 600 ? 800 : 900 }, deviceScaleFactor: 1, reducedMotion: 'reduce' })
  await ctx.addInitScript((l) => localStorage.setItem('mr-lang', l), lang)
  const p = await ctx.newPage()
  const errs = []
  p.on('console', m => m.type() === 'error' && errs.push(m.text()))
  p.on('pageerror', e => errs.push(String(e)))
  await p.goto('http://localhost:4173/')
  await p.waitForTimeout(600)
  const ov = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth)
  console.log(w, 'overflow', ov, 'errors', errs)
  for (const id of ['home','about','experience','expertise','certifications','projects','contact']) {
    await p.evaluate((i) => document.getElementById(i).scrollIntoView(), id)
    await p.waitForTimeout(250)
    await p.screenshot({ path: `${out}/${tag}-${lang}-${w}-${id}.png` })
  }
  await ctx.close()
}
await b.close()
