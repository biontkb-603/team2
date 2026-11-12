import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
const body = () => p.evaluate(() => document.body.innerText)
await p.goto(base + '/recommend', { waitUntil: 'networkidle0' }); await p.click('a[href="/recommend/tuna-mayo"]'); await wait(200)
ok(path() === '/recommend/tuna-mayo', 'list -> detail'); await p.screenshot({ path: OUT + '/dt.png' })
ok(await p.$('nav[aria-label="하단 탭"]') === null, 'no tab bar')
let t = await body()
for (const x of ['참치마요 덮밥', '15분', '쉬움', '1인분', '지금 보유한 재료로 만들 수 있어요', '필요한 재료', '밥', '1공기', '참치캔', '마요네즈', '2큰술', '1/2대', '레시피', '재료 정보', '참치캔의 기름을 쪽 빼고 그릇에 담아요.', '요리 시작하기']) ok(t.includes(x), 'text ' + x)
ok((await p.$$eval('ol li', l => l.length)) === 5, 'steps 5')
ok(await p.$eval('button[aria-label^="찜"]', e => e.getAttribute('aria-pressed')) === 'true', 'tuna is favorite')
await p.click('button[aria-label="찜 해제"]'); ok(await p.$eval('button[aria-label="찜하기"]', e => e.getAttribute('aria-pressed')) === 'false', 'heart toggles')
const tab = async n => { const h = await p.evaluateHandle(n => [...document.querySelectorAll('[role=tab]')].find(b => b.textContent === n), n); await h.click(); await wait(100) }
await tab('재료 정보'); ok(!(await p.$('ol')) && (await p.$$eval('main ul.divide-y li', l => l.length)) === 5, 'info tab list'); await tab('레시피'); ok(!!(await p.$('ol')), 'back to recipe tab')
await p.click('button[aria-label="뒤로 가기"]'); await wait(200); ok(path() === '/recommend', 'back -> recommend')
await p.goto(base + '/recommend/potato-cream-soup', { waitUntil: 'networkidle0' }); t = await body(); ok(t.includes('재료가 1개 부족해요') && !t.includes('만들 수 있어요'), 'missing banner')
await p.goto(base + '/recommend/nope', { waitUntil: 'networkidle0' }); ok(path() === '/recommend', 'unknown id -> /recommend')
await p.goto(base + '/recommend/tuna-mayo', { waitUntil: 'networkidle0' })
const go = await p.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '요리 시작하기')); await go.click(); await wait(150)
ok((await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요', 'start toast')
await p.goto(base + '/recommend/tuna-mayo', { waitUntil: 'networkidle0' }); await p.click('button[aria-label="뒤로 가기"]'); await wait(200); ok(path() === '/recommend', 'direct open back')
// 짧은 화면(360x640)에서 끝까지 내려도 고정 버튼이 마지막 단계를 가리지 않는다
await p.setViewport({ width: 360, height: 640 }); await p.goto(base + '/recommend/tuna-mayo', { waitUntil: 'networkidle0' })
await p.evaluate(() => { const m = document.querySelector('main'); m.scrollTop = m.scrollHeight }); await wait(100)
const r = await p.evaluate(() => ({ last: [...document.querySelectorAll('ol li')].at(-1).getBoundingClientRect().bottom, btn: [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '요리 시작하기').getBoundingClientRect().top }))
ok(r.last <= r.btn, `last step (${r.last}) above button (${r.btn})`)
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
