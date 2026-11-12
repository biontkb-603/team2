import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
await p.goto(base + '/mypage', { waitUntil: 'networkidle0' })
const m = await p.evaluateHandle(() => [...document.querySelectorAll('a')].find(a => a.textContent.trim() === '찜한 레시피')); await m.click(); await wait(200)
ok(path() === '/mypage/favorites', 'menu -> favorites'); await p.screenshot({ path: OUT + '/fv.png' })
ok((await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))).join() === '마이페이지', 'mypage tab active')
let t = await p.evaluate(() => document.body.innerText)
for (const x of ['찜한 레시피', '총 1개', '참치마요 덮밥', '15분 · 보유 재료로 가능', '재료 충분']) ok(t.includes(x), 'text ' + x)
await p.click('a[href="/recommend/tuna-mayo"]'); await wait(150); ok(path() === '/recommend/tuna-mayo', 'card -> detail'); await p.goBack(); await wait(150)
await p.click('button[aria-label="참치마요 덮밥 찜 해제"]'); await wait(100); t = await p.evaluate(() => document.body.innerText)
ok(t.includes('총 0개') && t.includes('아직 찜한 레시피가 없어요.'), 'unfavorite -> empty state')
await p.click('button[aria-label="뒤로 가기"]'); await wait(200); ok(path() === '/mypage', 'back -> mypage')
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
