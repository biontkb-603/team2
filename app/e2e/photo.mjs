import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
const click = async t => { const h = await p.evaluateHandle(t => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === t), t); await h.click(); await wait(150) }
await p.goto(base + '/fridge/add', { waitUntil: 'networkidle0' }); await click('사진으로 등록')
ok(path() === '/fridge/add/photo', 'tab -> photo'); await p.screenshot({ path: OUT + '/ph.png' })
ok(await p.$('nav[aria-label="하단 탭"]') === null, 'no tab bar')
ok((await p.$$eval('button[aria-pressed=true]', l => l.map(e => e.textContent.trim()))).join() === '사진으로 등록', 'photo tab selected')
for (const t of ['사진 촬영하기', '앨범에서 선택하기']) { await wait(2100); await click(t); ok((await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요', t + ' toast'); ok(path() === '/fridge/add/photo', t + ' stays') }
await click('직접 입력'); ok(path() === '/fridge/add', 'tab back to manual')
await p.setViewport({ width: 360, height: 640 }); await p.goto(base + '/fridge/add/photo', { waitUntil: 'networkidle0' })
ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no overflow at 360')
const r = await p.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '앨범에서 선택하기').getBoundingClientRect().bottom); console.log('360x640 album button bottom', r)
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
