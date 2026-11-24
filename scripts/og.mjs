import { chromium } from '@playwright/test'
import { resolve } from 'node:path'
const b = await chromium.launch()
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
await p.goto('file://' + resolve('scripts/og.html'))
await p.waitForTimeout(500)
await p.screenshot({ path: 'public/images/og.png' })
await b.close()
