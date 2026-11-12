import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms))
const path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
await p.goto(base + '/login', { waitUntil: 'networkidle0' })
await p.screenshot({ path: OUT + '/login.png' })
ok(await p.evaluate(() => document.documentElement.scrollHeight <= innerHeight), 'page scrolls at 408x880')
ok(await p.$('nav[aria-label="하단 탭"]') === null, 'no tab bar')
const toastText = async () => p.$eval('[role=status]', e => e.textContent)
for (const sel of ['button[aria-label="언어 설정"]']) { await p.click(sel); await wait(150); ok(await toastText() === '곧 지원 예정이에요', 'globe toast') }
for (const t of ['아이디 찾기', '비밀번호 찾기']) {
  await wait(2100)
  const h = await p.evaluateHandle(t => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === t), t)
  await h.click(); await wait(150); ok(await toastText() === '곧 지원 예정이에요', t + ' toast'); ok(path() === '/login', t + ' stays')
}
await p.click('a[href="/signup"]'); await wait(150); ok(path() === '/signup', 'signup link')
await p.goBack(); await wait(150)
await p.type('input[type=text]', 'gdragonlove'); await p.keyboard.press('Enter'); await wait(200); ok(path() === '/', 'enter submits -> /')
await p.goto(base + '/login', { waitUntil: 'networkidle0' })
await p.click('button[aria-label="네이버로 로그인"]'); await wait(200); ok(path() === '/', 'sns -> /')
await p.goto(base + '/login', { waitUntil: 'networkidle0' })
const h = await p.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '로그인')); await h.click(); await wait(200); ok(path() === '/', 'login btn -> /')
// 작은 폭/높이에서도 잘리지 않고 스크롤 되는지
await p.setViewport({ width: 360, height: 640 }); await p.goto(base + '/login', { waitUntil: 'networkidle0' })
await p.screenshot({ path: OUT + '/login-small.png' })
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
