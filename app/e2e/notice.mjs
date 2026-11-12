import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
await p.goto(base + '/mypage', { waitUntil: 'networkidle0' })
const m = await p.evaluateHandle(() => [...document.querySelectorAll('a')].find(a => a.textContent.trim() === '공지사항')); await m.click(); await wait(200)
ok(path() === '/mypage/notices', 'menu -> notices'); await p.screenshot({ path: OUT + '/nc.png' })
ok(await p.$('nav[aria-label="하단 탭"]') === null, 'no tab bar')
let t = await p.evaluate(() => document.body.innerText)
for (const x of ['NEW', '커뮤니티 기능이 새로 생겼어요!', '26년 10월 16일']) ok(t.includes(x), 'text ' + x)
ok(!t.includes('마냉이에 커뮤니티가 생겼어요'), 'collapsed at first')
await p.click('button[aria-expanded]'); await wait(100); t = await p.evaluate(() => document.body.innerText)
ok(t.includes('마냉이에 커뮤니티가 생겼어요') && (await p.$eval('button[aria-expanded]', e => e.getAttribute('aria-expanded'))) === 'true', 'expands')
await p.click('button[aria-expanded]'); await wait(100); ok(!(await p.evaluate(() => document.body.innerText)).includes('마냉이에 커뮤니티가 생겼어요'), 'collapses')
await p.click('button[aria-label="뒤로 가기"]'); await wait(200); ok(path() === '/mypage', 'back -> mypage')
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
