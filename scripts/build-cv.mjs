// Builds ATS-friendly CV PDFs (single column, real text, standard headings, no tables/images/icons).
// Usage: npm run cv   →  public/cv/Matheus-Reis-CV-{pt-BR,en}.pdf
import { chromium } from '@playwright/test'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { cv, person } from './cv/content.mjs'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const font = (pkg, f) => pathToFileURL(path.join(root, 'node_modules/@fontsource', pkg, 'files', f)).href
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;')

const css = `
/* Static (non-variable) fonts: Chromium embeds these as real TrueType with real space glyphs, so text extracts cleanly. */
@font-face { font-family: 'Sora'; src: url('${font('sora', 'sora-latin-400-normal.woff2')}'); font-weight: 400; }
@font-face { font-family: 'Sora'; src: url('${font('sora', 'sora-latin-600-normal.woff2')}'); font-weight: 600; }
@font-face { font-family: 'Instrument Sans'; src: url('${font('instrument-sans', 'instrument-sans-latin-400-normal.woff2')}'); font-weight: 400; }
@font-face { font-family: 'Instrument Sans'; src: url('${font('instrument-sans', 'instrument-sans-latin-500-normal.woff2')}'); font-weight: 500; }
@font-face { font-family: 'Instrument Sans'; src: url('${font('instrument-sans', 'instrument-sans-latin-700-normal.woff2')}'); font-weight: 700; }
@page { size: A4; margin: 13mm 15mm 13mm 15mm; }
* { box-sizing: border-box; }
body { margin: 0; font-family: 'Instrument Sans', Arial, sans-serif; font-size: 9.6pt; line-height: 1.42; color: #1a2433; }
h1 { font-family: 'Sora', Arial, sans-serif; font-weight: 600; font-size: 23pt; letter-spacing: -0.02em; line-height: 1.1; margin: 0; color: #0b1728; }
.title { font-family: 'Sora', Arial, sans-serif; font-weight: 400; font-size: 10.6pt; color: #2f67bd; margin: 4pt 0 0; }
.contact { margin: 7pt 0 0; color: #3b4a60; font-size: 9pt; }
.contact span + span::before { content: '  |  '; color: #9aa8bb; }
h2 { font-family: 'Sora', Arial, sans-serif; font-weight: 600; font-size: 9.4pt; letter-spacing: 0.09em; text-transform: uppercase; color: #0b1728;
     margin: 13pt 0 6pt; padding-bottom: 3pt; border-bottom: 1.4pt solid #2f67bd; }
p { margin: 0; }
.job { margin-top: 8pt; break-inside: avoid-page; }
.job:first-of-type { margin-top: 0; }
.row { display: flex; justify-content: space-between; align-items: baseline; gap: 12pt; }
.company { font-weight: 700; font-size: 10.4pt; color: #0b1728; }
.meta { color: #3b4a60; font-size: 9pt; white-space: nowrap; }
.role { color: #2f67bd; font-weight: 500; }
ul { margin: 3pt 0 0; padding: 0; list-style: none; }
/* Bullet as real text so parsers see where each item starts. */
li { margin: 0 0 1.8pt; padding-left: 11pt; position: relative; }
li::before { content: '\\2022'; position: absolute; left: 1pt; }
a { color: inherit; text-decoration: none; }
.skill { margin: 0 0 2.4pt; } .skill b { color: #0b1728; font-weight: 700; }
.edu { break-inside: avoid; }
`

const render = (c) => `<!doctype html><html lang="${c.lang}"><head><meta charset="utf-8"><title>${esc(person.name)} - CV</title><style>${css}</style></head><body>
<header>
  <h1>${esc(person.name)}</h1>
  <p class="title">${esc(c.title)}</p>
  <p class="contact"><span>${esc(person.phone)}</span><span><a href="mailto:${esc(person.email)}">${esc(person.email)}</a></span><span><a href="https://${esc(person.linkedin)}">${esc(person.linkedin)}</a></span><span><a href="https://${esc(person.github)}">${esc(person.github)}</a></span></p>
</header>
<section><h2>${c.h.summary}</h2><p>${esc(c.summary)}</p></section>
<section><h2>${c.h.experience}</h2>
${c.jobs.map((j) => `<div class="job"><div class="row"><span class="company">${esc(j.company)}</span><span class="meta">${esc(j.period)}</span></div>
<div class="row"><span class="role">${esc(j.role)}</span><span class="meta">${esc(j.place)}</span></div>
<ul>${j.bullets.map((b) => `<li>${esc(b)}</li>`).join('')}</ul></div>`).join('\n')}
</section>
<section><h2>${c.h.skills}</h2>${c.skills.map(([k, v]) => `<p class="skill"><b>${esc(k)}:</b> ${esc(v)}</p>`).join('')}</section>
<section class="edu"><h2>${c.h.education}</h2>${c.education.map((e) => `<div class="row"><span><b>${esc(e.school)}</b>, ${esc(e.course)}</span><span class="meta">${esc(e.period)}</span></div>`).join('')}</section>
<section><h2>${c.h.certs}</h2><ul>${c.certs.map((x) => `<li>${esc(x)}</li>`).join('')}</ul></section>
<section><h2>${c.h.languages}</h2><p>${c.languages.map(esc).join('  |  ')}</p></section>
</body></html>`

const out = path.join(root, 'public/cv')
fs.mkdirSync(out, { recursive: true })
const browser = await chromium.launch()
for (const c of Object.values(cv)) {
  const page = await browser.newPage()
  const html = path.join(root, 'scripts/cv', `.tmp-${c.lang}.html`)
  fs.writeFileSync(html, render(c))
  await page.goto(pathToFileURL(html).href)
  await page.evaluate(() => document.fonts.ready)
  await page.pdf({ path: path.join(out, c.file), format: 'A4', printBackground: true, preferCSSPageSize: true, tagged: true, outline: true })
  fs.rmSync(html)
  await page.close()
  console.log('built', c.file)
}
await browser.close()
