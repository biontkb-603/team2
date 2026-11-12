import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
const rows = () => p.$$eval('main ul li', l => l.map(e => e.innerText.replace(/\s+/g, ' ').trim()))
await p.goto(base + '/fridge', { waitUntil: 'networkidle0' })
await p.screenshot({ path: OUT + '/ls.png' })
const chips = await p.$$eval('[role=group] button', l => l.map(e => e.textContent.trim())); ok(chips.join('|') === '전체 12|냉장 7|냉동 3|실온 2', 'chips ' + chips)
let r = await rows(); ok(r.length === 12, 'all rows ' + r.length)
ok(r.slice(0, 7).join('|') === '대 대파 1단 · 냉장 D-1|두 두부 1모 · 냉장 D-2|우 우유 1L · 냉장 D-3|계 계란 10구 · 냉장 D-9|애 애호박 1개 · 냉장 D-6|당 당근 2개 · 냉장 D-12|김 김치 500g · 냉장 D-30', 'first 7 rows ' + r.slice(0, 7))
ok(await p.$('nav[aria-label="하단 탭"]') !== null, 'tab bar shown')
ok((await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))).join() === '냉장고', 'fridge tab active')
// 탭 필터
for (const [name, n] of [['냉장', 7], ['냉동', 3], ['실온', 2]]) {
  const h = await p.evaluateHandle(t => [...document.querySelectorAll('[role=group] button')].find(b => b.textContent.startsWith(t)), name); await h.click(); await wait(100)
  r = await rows(); ok(r.length === n && r.every(x => x.includes('· ' + name)), `${name} filter ${r.length}`)
  ok(await h.evaluate(e => e.getAttribute('aria-pressed')) === 'true', name + ' selected')
}
// 하단 버튼: 스크롤 위치 무관하게 보이고, 끝까지 내려도 마지막 행을 가리지 않는다
const h = await p.evaluateHandle(() => [...document.querySelectorAll('[role=group] button')].find(b => b.textContent.startsWith('전체'))); await h.click(); await wait(100)
const btnRect = async () => p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(b => b.textContent.includes('식재료 추가')); const r = b.getBoundingClientRect(); return { top: r.top, bottom: r.bottom } })
const tabTop = await p.$eval('nav[aria-label="하단 탭"]', e => e.getBoundingClientRect().top)
let br = await btnRect(); ok(br.bottom <= tabTop && br.top > 0, 'button above tab bar at top ' + JSON.stringify(br))
await p.evaluate(() => { const m = document.querySelector('main'); m.scrollTop = m.scrollHeight }); await wait(100)
br = await btnRect(); const lastRow = await p.evaluate(() => { const l = [...document.querySelectorAll('main ul li')].at(-1).getBoundingClientRect(); return l.bottom })
ok(br.bottom <= tabTop, 'button above tab after scroll'); ok(lastRow <= br.top, `last row (${lastRow}) not covered by button (${br.top})`)
await p.evaluate(() => { document.querySelector('main').scrollTop = 0 })
await p.click('button[aria-label="식재료 검색"]'); await wait(150); ok((await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요', 'search toast')
const add = await p.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.includes('식재료 추가'))); await add.click(); await wait(200); ok(path() === '/fridge/add', 'add -> /fridge/add')
await p.goto(base + '/fridge', { waitUntil: 'networkidle0' }); await p.click('button[aria-label="뒤로 가기"]'); await wait(200); ok(path() === '/fridge/status', 'back -> status')
await p.goto(base + '/fridge/status', { waitUntil: 'networkidle0' })
const go = await p.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '식재료 목록 보기')); await go.click(); await wait(200); ok(path() === '/fridge', 'status -> list')
await p.setViewport({ width: 360, height: 640 }); await p.goto(base + '/fridge', { waitUntil: 'networkidle0' })
ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no horizontal overflow at 360')
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
