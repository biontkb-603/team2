import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
const sw = () => p.$$eval('[role=switch]', l => Object.fromEntries(l.map(e => [e.getAttribute('aria-label'), e.getAttribute('aria-checked') === 'true' ? 'on' : 'off'])))
await p.goto(base + '/mypage', { waitUntil: 'networkidle0' })
const m = await p.evaluateHandle(() => [...document.querySelectorAll('a')].find(a => a.textContent.trim() === '알림 설정')); await m.click(); await wait(200)
ok(path() === '/mypage/notifications', 'menu -> notifications'); await p.screenshot({ path: OUT + '/nt.png' })
ok(await p.$('nav[aria-label="하단 탭"]') === null, 'no tab bar')
let s = await sw()
const expected = { '전체 알림': 'on', '유통기한 임박': 'on', '식재료 부족': 'on', '오늘의 추천 요리': 'on', '가격 변동': 'off', '공지사항': 'on', '이벤트 · 혜택': 'off' }
ok(JSON.stringify(s) === JSON.stringify(expected), 'defaults ' + JSON.stringify(s))
await p.click('[role=switch][aria-label="가격 변동"]'); await p.click('[role=switch][aria-label="유통기한 임박"]'); s = await sw()
ok(s['가격 변동'] === 'on' && s['유통기한 임박'] === 'off', 'item toggles')
await p.click('[role=switch][aria-label="전체 알림"]'); s = await sw()
ok(s['전체 알림'] === 'off' && Object.entries(s).filter(([k]) => k !== '전체 알림').every(([, v]) => v === 'off'), 'all off -> items off ' + JSON.stringify(s))
ok(await p.$$eval('[role=switch]:not([aria-label="전체 알림"])', l => l.every(e => e.disabled)), 'items disabled when all off')
await p.click('[role=switch][aria-label="전체 알림"]'); s = await sw()
ok(s['전체 알림'] === 'on' && s['가격 변동'] === 'on' && s['유통기한 임박'] === 'off', 'all on restores individual values ' + JSON.stringify(s))
const t = await p.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.includes('알림 받을 시간'))); await t.click(); await wait(150)
ok((await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요', 'time row toast')
await p.click('button[aria-label="뒤로 가기"]'); await wait(200); ok(path() === '/mypage', 'back -> mypage')
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
