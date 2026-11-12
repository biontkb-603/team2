import { launch, BASE, OUT } from './lib.mjs'
import { readFileSync } from 'node:fs'
const src = readFileSync(new URL('../src/screens.ts', import.meta.url), 'utf8')
const screens = [...src.matchAll(/no: '([^']+)', path: '([^']+)', title: '([^']+)', tab: (true|false)(?:, back: '([^']+)')?/g)]
  .map(m => ({ no: m[1], path: m[2].replace(':id', 'tuna-mayo'), tab: m[4] === 'true', back: m[5] }))
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE
let fail = 0
const ok = (c, msg) => { if (!c) { fail++; console.log('FAIL', msg) } }
const errs = []; p.on('pageerror', e => errs.push(String(e)))
console.log('screens:', screens.length)
for (const s of screens) {
  await p.goto(base + s.path, { waitUntil: 'networkidle0' })
  const tab = await p.$('nav[aria-label="하단 탭"]') !== null
  ok(tab === s.tab, `${s.no} ${s.path} tab=${tab} expected ${s.tab}`)
  const hasBack = await p.$('button[aria-label="뒤로 가기"]') !== null
  ok(hasBack === !!s.back, `${s.no} back button=${hasBack} expected ${!!s.back}`)
  if (s.back) { // 주소로 바로 연 경우: fallback 경로로 이동
    await p.click('button[aria-label="뒤로 가기"]'); await new Promise(r => setTimeout(r, 200))
    ok(new URL(p.url()).pathname === s.back, `${s.path} direct back -> ${new URL(p.url()).pathname}, expected ${s.back}`)
  }
}
// 앱 안에서 이동한 경우: 이전 화면으로
await p.goto(base + '/_screens', { waitUntil: 'networkidle0' })
await p.click('a[href="/fridge/add"]'); await new Promise(r => setTimeout(r, 200))
await p.click('button[aria-label="뒤로 가기"]'); await new Promise(r => setTimeout(r, 200))
ok(new URL(p.url()).pathname === '/_screens', 'in-app back -> ' + p.url())
// 탭 이동과 강조
await p.goto(base + '/mypage/favorites', { waitUntil: 'networkidle0' })
const active = await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))
ok(active.length === 1 && active[0] === '마이페이지', 'favorites active tab: ' + active)
await p.goto(base + '/fridge', { waitUntil: 'networkidle0' })
const a2 = await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))
ok(a2.length === 1 && a2[0] === '냉장고', 'fridge active tab: ' + a2)
await p.click('nav a[href="/shopping"]'); await new Promise(r => setTimeout(r, 200))
ok(new URL(p.url()).pathname === '/shopping', 'tab click')
ok(errs.length === 0, 'page errors: ' + errs.join('|'))
await p.goto(base + '/nope', { waitUntil: 'networkidle0' }); ok(new URL(p.url()).pathname === '/', 'unknown -> /')
await p.goto(base + '/fridge/add', { waitUntil: 'networkidle0' })
await p.screenshot({ path: OUT + '/add.png' })
await p.goto(base + '/_screens', { waitUntil: 'networkidle0' })
await p.screenshot({ path: OUT + '/index.png' })
console.log(fail ? `${fail} failures` : 'ALL PASS')
process.exitCode = fail ? 1 : 0; await b.close()
