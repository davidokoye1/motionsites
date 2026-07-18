import puppeteer from 'puppeteer-core'
import fs from 'fs'

const SHOTS = '/tmp/atelier-submission'
const ASSETS = '/home/okoye/motionsites/submission-assets'
const DEBUG = process.argv.includes('--debug')
const quads = JSON.parse(fs.readFileSync('/tmp/shot/quads.json', 'utf8'))

// inset quad slightly toward its centroid so a hint of bezel stays visible
function inset(quad, f = 0.012) {
  const cx = quad.reduce((s, p) => s + p[0], 0) / 4
  const cy = quad.reduce((s, p) => s + p[1], 0) / 4
  return quad.map(([x, y]) => [x + (cx - x) * f, y + (cy - y) * f])
}

const JOBS = [
  { name: '01-chair-hero', scene: `${ASSETS}/scene-chair.png`, shot: `${SHOTS}/c-hero.png`, quad: inset(quads['scene-chair']) },
  { name: '02-plinth-works', scene: `${ASSETS}/scene-plinth.png`, shot: `${SHOTS}/c-sec-2.png`, quad: inset(quads['scene-plinth']) },
  { name: '03-desk-dark', scene: `${ASSETS}/scene-desk.png`, shot: `${SHOTS}/c-sec-4.png`, quad: inset(quads['scene-desk']) },
]

const SCALE = 2.5 // 1536x1024 -> 3840x2560
const W = Math.round(1536 * SCALE), H = Math.round(1024 * SCALE)

const html = (job) => {
  const q = job.quad.map(([x, y]) => [x * SCALE, y * SCALE])
  return `<!doctype html><html><head><style>
  * { margin:0; padding:0 }
  html,body { width:${W}px; height:${H}px; overflow:hidden; background:#000 }
  .scene { position:absolute; inset:0; width:100%; height:100%; }
  #warp { position:absolute; left:0; top:0; transform-origin:0 0; overflow:hidden; border-radius:${5 * SCALE}px; }
  #warp img { display:block; width:100%; height:100%; }
  #glow { position:absolute; inset:0; background:linear-gradient(115deg, rgba(255,255,255,.06) 0%, rgba(255,255,255,.015) 40%, rgba(0,0,0,.05) 100%); }
  .dbg { position:absolute; width:8px; height:8px; margin:-4px 0 0 -4px; background:#f0f; border-radius:50%; z-index:10 }
</style></head><body>
  <img class="scene" src="${job.scene}">
  <div id="warp"><img src="${job.shot}"><div id="glow"></div></div>
  ${DEBUG ? q.map(([x, y]) => `<div class="dbg" style="left:${x}px;top:${y}px"></div>`).join('') : ''}
  <script>
  function adj(m){return [m[4]*m[8]-m[5]*m[7], m[2]*m[7]-m[1]*m[8], m[1]*m[5]-m[2]*m[4], m[5]*m[6]-m[3]*m[8], m[0]*m[8]-m[2]*m[6], m[2]*m[3]-m[0]*m[5], m[3]*m[7]-m[4]*m[6], m[1]*m[6]-m[0]*m[7], m[0]*m[4]-m[1]*m[3]]}
  function mul(a,b){const c=[];for(let i=0;i<3;i++)for(let j=0;j<3;j++){let s=0;for(let k=0;k<3;k++)s+=a[3*i+k]*b[3*k+j];c[3*i+j]=s}return c}
  function mulv(m,v){return [m[0]*v[0]+m[1]*v[1]+m[2]*v[2], m[3]*v[0]+m[4]*v[1]+m[5]*v[2], m[6]*v[0]+m[7]*v[1]+m[8]*v[2]]}
  function basis(p){
    const m=[p[0][0],p[1][0],p[2][0], p[0][1],p[1][1],p[2][1], 1,1,1]
    const v=mulv(adj(m),[p[3][0],p[3][1],1])
    return mul(m,[v[0],0,0, 0,v[1],0, 0,0,v[2]])
  }
  function h2h(from,to){ return mul(basis(to), adj(basis(from))) }
  const quad=${JSON.stringify(q)}
  const w=1440, h=900
  const warp=document.getElementById('warp')
  warp.style.width=w+'px'; warp.style.height=h+'px'
  const t=h2h([[0,0],[w,0],[w,h],[0,h]], quad)
  for(let i=0;i<9;i++) t[i]/=t[8]
  const M=[t[0],t[3],0,t[6], t[1],t[4],0,t[7], 0,0,1,0, t[2],t[5],0,t[8]]
  warp.style.transform='matrix3d('+M.join(',')+')'
  </script>
</body></html>`
}

const browser = await puppeteer.launch({
  executablePath: '/usr/bin/chromium',
  headless: 'new',
  args: ['--no-sandbox', '--disable-gpu', '--hide-scrollbars', '--allow-file-access-from-files'],
})
const page = await browser.newPage()
await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 })

for (const job of JOBS) {
  const f = `/tmp/shot/${job.name}.html`
  fs.writeFileSync(f, html(job))
  await page.goto(`file://${f}`, { waitUntil: 'networkidle0' })
  await new Promise((r) => setTimeout(r, 600))
  const out = DEBUG ? `${SHOTS}/dbg-${job.name}.png` : `${ASSETS}/${job.name}.png`
  await page.screenshot({ path: out })
  console.log('rendered', out)
}
await browser.close()
