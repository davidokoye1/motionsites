import puppeteer from 'puppeteer-core'
import fs from 'fs'

const URL = 'https://favorite-version-319460.framer.app'
const OUT = '/tmp/atelier-submission'
fs.mkdirSync(OUT, { recursive: true })

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

const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 800) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 200))
}
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 1500))
await page.screenshot({ path: `${OUT}/c-hero.png` })

const steps = 8
for (let i = 1; i <= steps; i++) {
  const y = Math.round(((height - 900) / steps) * i)
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 900))
  await page.screenshot({ path: `${OUT}/c-sec-${i}.png` })
}

await browser.close()
console.log('done')
