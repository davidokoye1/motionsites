import puppeteer from 'puppeteer-core'

const URL = 'https://favorite-version-319460.framer.app'
const OUT = '/tmp/atelier-submission/showcase-raw.webm'

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--force-device-scale-factor=1'],
})
const page = await browser.newPage()
await page.setViewport({ width: 1920, height: 1080 })
await page.goto(URL, { waitUntil: 'networkidle0', timeout: 60000 })
await new Promise((r) => setTimeout(r, 2000))

const hideChrome = () => page.addStyleTag({
  content: `#__framer-editorbar-container, #__framer-badge-container, .__framer-badge,
    [data-framer-badge], a[href*="framer.com"][href*="via"] { display:none !important; }
    * { cursor: none !important; }`,
}).catch(() => {})
await hideChrome()

// preload all images
const height = await page.evaluate(() => document.body.scrollHeight)
for (let y = 0; y < height; y += 900) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y)
  await new Promise((r) => setTimeout(r, 150))
}
await page.evaluate(() => window.scrollTo(0, 0))
await new Promise((r) => setTimeout(r, 1800))

const glide = (y, ms) => page.evaluate(({ y, ms }) => new Promise((res) => {
  const start = window.scrollY, delta = y - start, t0 = performance.now()
  const ease = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2
  const step = (now) => {
    const p = Math.min(1, (now - t0) / ms)
    window.scrollTo(0, start + delta * ease(p))
    p < 1 ? requestAnimationFrame(step) : res()
  }
  requestAnimationFrame(step)
}), { y, ms })

const pause = (ms) => new Promise((r) => setTimeout(r, ms))
const moveTo = (x, y, steps = 30) => page.mouse.move(x, y, { steps })

const recorder = await page.screencast({ path: OUT })
await pause(2000)

// 1. open menu overlay, let it breathe, close
const menuBtn = await page.evaluate(() => {
  const els = [...document.querySelectorAll('div,button,a')]
  const el = els.find((e) => (e.textContent || '').trim() === 'Menu' && e.getBoundingClientRect().top < 120)
  if (!el) return null
  const r = el.getBoundingClientRect()
  return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
})
if (menuBtn) {
  await moveTo(menuBtn.x, menuBtn.y, 30)
  await pause(400)
  await page.mouse.click(menuBtn.x, menuBtn.y)
  await pause(1600)
  // hover a couple of index links while the overlay is open
  await moveTo(170, 285, 30)
  await pause(700)
  await moveTo(115, 350, 20)
  await pause(700)
  // close via the round X button top-right
  const closeBtn = await page.evaluate(() => {
    for (const [x, y] of [[1868, 44], [1860, 50], [1880, 40]]) {
      const el = document.elementFromPoint(x, y)
      if (el) {
        const r = (el.closest('div[data-framer-name], button, a') || el).getBoundingClientRect()
        if (r.width < 120) return { x: r.x + r.width / 2, y: r.y + r.height / 2 }
      }
    }
    return { x: 1868, y: 44 }
  })
  await moveTo(closeBtn.x, closeBtn.y, 30)
  await pause(300)
  await page.mouse.click(closeBtn.x, closeBtn.y)
  await pause(1200)
  await page.keyboard.press('Escape').catch(() => {})
  await pause(600)
  // hard verification: overlay locked scroll means scrollY stays 0
  await page.evaluate(() => window.scrollTo(0, 40))
  await pause(300)
  const scrolled = await page.evaluate(() => window.scrollY)
  console.log('post-menu scrollY check:', scrolled)
  await page.evaluate(() => window.scrollTo(0, 0))
  await pause(600)
}

// 2. glide through home page with section pauses
const H = await page.evaluate(() => document.body.scrollHeight)
const stops = [0.11, 0.22, 0.34, 0.47, 0.60, 0.72, 0.85, 1.0]
for (const s of stops) {
  await glide(Math.round((H - 1080) * s), 2000)
  await pause(1000)
}

// 3. back up to works grid, hover two cards
await glide(Math.round((H - 1080) * 0.16), 2000)
await pause(900)
// find visible project detail links
const cards = await page.evaluate(() => {
  const out = []
  document.querySelectorAll('a[href*="/projects/"]').forEach((a) => {
    const r = a.getBoundingClientRect()
    if (r.width > 200 && r.height > 150 && r.top > 60 && r.top < 900) {
      out.push({ x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width })
    }
  })
  return out
})
console.log('visible cards:', cards.length)
if (cards.length >= 2) {
  await moveTo(cards[0].x, cards[0].y, 40)
  await pause(1300)
  await moveTo(cards[1].x, cards[1].y, 35)
  await pause(1300)
}
const target = cards[1] || cards[0] || { x: 960, y: 540 }

// 4. click into a project detail page
const nav = page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 30000 }).catch(() => null)
await page.mouse.click(target.x, target.y)
await nav
await hideChrome()
await pause(1800)
console.log('detail url:', page.url())

// 5. scroll the detail page
const H2 = await page.evaluate(() => document.body.scrollHeight)
await glide(Math.round(Math.min(H2 - 1080, 1800)), 2400)
await pause(1000)
await glide(Math.round(Math.min(H2 - 1080, 3600)), 2400)
await pause(1000)
await glide(Math.round(Math.min(H2 - 1080, 5600)), 2400)
await pause(1600)

await recorder.stop()
await browser.close()
console.log('recorded', OUT)
