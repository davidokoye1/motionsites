import puppeteer from 'puppeteer-core'
import fs from 'fs'

// Find a scroll position where the dark "process" section fills the viewport,
// then capture it as c-process-dark.png. Also probe darkness at candidates.
const URL = 'https://favorite-version-319460.framer.app'
const OUT = '/tmp/atelier-submission'

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 })
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 2000))
await page.addStyleTag({
  content: `#__framer-editorbar-container, #__framer-badge-container, .__framer-badge,
    [data-framer-badge], a[href*="framer.com"][href*="via"] { display:none !important; }`,
})

// force all lazy content in
const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 800) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 150))
}

// find dark sections: sample the page background color at intervals
const bands = await page.evaluate(() => {
  const out = []
  const els = [...document.querySelectorAll('section, div')]
  for (const el of els) {
    const r = el.getBoundingClientRect ? el.getBoundingClientRect() : null
    if (!r || r.height < 400 || r.width < 1200) continue
    const bg = getComputedStyle(el).backgroundColor
    const m = bg.match(/rgba?\((\d+), (\d+), (\d+)/)
    if (!m) continue
    const lum = (+m[1] + +m[2] + +m[3]) / 3
    if (lum < 40) out.push({ top: r.top + window.scrollY, h: r.height, bg })
  }
  return out
})
console.log('dark bands:', JSON.stringify(bands, null, 1))

for (const [i, b] of bands.entries()) {
  if (b.h < 900) continue
  const y = Math.round(b.top + (b.h - 900) / 2)
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 1200))
  await page.screenshot({ path: `${OUT}/c-dark-${i}.png` })
  console.log('captured', `c-dark-${i}.png`, 'at y', y, 'bandH', Math.round(b.h))
}
await browser.close()
