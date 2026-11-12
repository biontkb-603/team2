import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
const names = sel => p.$$eval(sel, l => l.map(e => e.innerText.replace(/\s+/g, ' ').trim()))
await p.goto(base + '/recommend', { waitUntil: 'networkidle0' }); await p.screenshot({ path: OUT + '/rc.png' })
ok((await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))).join() === '추천', 'recommend tab active')
ok((await p.$$eval('[role=group] button', l => l.map(e => e.textContent))).join('|') === '전체|보유 재료로 가능|유통기한 임박 재료', 'chips')
ok((await names('section[aria-label="오늘의 추천"] li a')).join('|') === '참치마요 덮밥 보유 재료로 가능|두부김치 두부 임박 재료 사용', 'today cards')
const now = await names('section[aria-label="지금 만들기 좋은 요리"] li a')
ok(now.join('|') === '대파 계란볶음밥 10분 · 대파 임박 재료 사용 재료 충분|두부 애호박찌개 25분 · 두부 임박 재료 사용 재료 충분|감자 크림수프 30분 · 우유 임박 재료 사용 재료 1개 부족|계란말이 15분 · 보유 재료로 가능 재료 충분', 'rows: ' + now.join('|'))
const heart = () => p.$$eval('section[aria-label="오늘의 추천"] button[aria-pressed]', l => l.map(e => e.getAttribute('aria-pressed')))
ok((await heart()).join() === 'true,false', 'hearts initial ' + await heart())
await p.click('button[aria-label="두부김치 찜하기"]'); await p.click('button[aria-label="참치마요 덮밥 찜 해제"]'); ok((await heart()).join() === 'false,true', 'hearts toggled ' + await heart())
ok(path() === '/recommend', 'heart does not navigate')
const chip = async t => { const h = await p.evaluateHandle(t => [...document.querySelectorAll('[role=group] button')].find(b => b.textContent === t), t); await h.click(); await wait(100) }
await chip('보유 재료로 가능'); ok((await names('section li a')).length === 2 + 3 && !(await p.evaluate(() => document.body.innerText)).includes('감자 크림수프'), 'filter 보유 재료')
await chip('유통기한 임박 재료'); const t2 = await names('section li a'); ok(t2.length === 1 + 3 && !t2.join().includes('계란말이') && !t2.join().includes('참치마요'), 'filter 임박: ' + t2.length)
await chip('전체')
await p.click('a[href="/recommend/tuna-mayo"]'); await wait(150); ok(path() === '/recommend/tuna-mayo', 'card -> detail')
await p.goBack(); await wait(150)
await p.click('button[aria-label="레시피 검색"]'); await wait(150); ok((await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요', 'search toast')
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
