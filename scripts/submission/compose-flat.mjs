import puppeteer from 'puppeteer-core'
import fs from 'fs'

const SHOTS = '/tmp/atelier-submission'
const ASSETS = '/home/okoye/motionsites/submission-assets'
const W = 3840, H = 2560

const html = `<!doctype html><html><head><style>
  * { margin:0; padding:0; box-sizing:border-box }
  html,body { width:${W}px; height:${H}px; overflow:hidden }
  .bg { position:absolute; inset:0; width:100%; height:100%; object-fit:cover }
  .stage { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; padding-top:60px }
  .card { width:2960px; border-radius:28px; overflow:hidden;
    box-shadow: 0 160px 300px -80px rgba(25,20,15,.55), 0 60px 120px -50px rgba(25,20,15,.4), 0 0 0 2px rgba(0,0,0,.06); }
  .card img { display:block; width:100% }
</style></head><body>
  <img class="bg" src="${ASSETS}/bg-light.png">
  <div class="stage"><div class="card"><img src="${SHOTS}/c-sec-8.png"></div></div>
</body></html>`

fs.writeFileSync('/tmp/shot/04-flat.html', html)
const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium', headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })
await page.goto('file:///tmp/shot/04-flat.html', { waitUntil: 'networkidle0' })
await new Promise((r) => setTimeout(r, 500))
await page.screenshot({ path: `${ASSETS}/04-contact-editorial.png` })
await browser.close()
console.log('rendered 04-contact-editorial')
