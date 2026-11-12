import { launch, BASE, OUT } from './lib.mjs'
const b = await launch()
const p = await b.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } }
const toastIs = async m => (await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요' || (console.log('no toast', m), false)
const clickText = async t => { const h = await p.evaluateHandle(t => [...document.querySelectorAll('button,a')].find(b => b.textContent.trim() === t), t); await h.click(); await wait(150) }
await p.goto(base + '/mypage', { waitUntil: 'networkidle0' }); await p.screenshot({ path: OUT + '/my.png' })
ok((await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))).join() === '마이페이지', 'tab active')
const t = await p.evaluate(() => document.body.innerText)
for (const x of ['김땡땡님', '오늘도 맛있는 하루 보내세요', '내 취향 알려주기', '나이대', '좋아하는 음식', '싫어하는 음식', '매운 정도', '찜한 레시피', '냉장고 연동 관리', '알림 설정', '공지사항', '커뮤니티', '로그아웃']) ok(t.includes(x), 'text ' + x)
// 범위 밖 진입점은 토스트, 화면 이동 없음
for (const label of ['냉장고 연동 관리', '커뮤니티', '내 취향 알려주기']) {
  await wait(2100); const h = await p.evaluateHandle(l => [...document.querySelectorAll('main button')].find(b => b.textContent.includes(l)), label); await h.click(); await wait(150)
  ok(await toastIs(label) && path() === '/mypage', label + ' -> toast, stays')
}
await wait(2100); await p.click('button[aria-label="설정"]'); await wait(150); ok(await toastIs('gear'), 'gear toast')
await wait(2100); const prof = await p.evaluateHandle(() => [...document.querySelectorAll('main button')].find(b => b.textContent.includes('김땡땡님'))); await prof.click(); await wait(150); ok(await toastIs('profile') && path() === '/mypage', 'profile row toast')
// 화면 이동 메뉴
for (const [label, to] of [['찜한 레시피', '/mypage/favorites'], ['알림 설정', '/mypage/notifications'], ['공지사항', '/mypage/notices']]) {
  await p.goto(base + '/mypage', { waitUntil: 'networkidle0' }); await clickText(label); ok(path() === to, `${label} -> ${to} (${path()})`)
}
// 로그아웃 팝업: 취소 / 바깥 / Esc / 예
await p.goto(base + '/mypage', { waitUntil: 'networkidle0' }); await clickText('로그아웃'); ok(!!(await p.$('[role=dialog]')), 'dialog opens'); await p.screenshot({ path: OUT + '/my-dlg.png' })
ok((await p.$eval('[role=dialog]', e => e.innerText)).includes('로그아웃을 진행할까요?'), 'dialog text')
await clickText('취소'); ok(!(await p.$('[role=dialog]')) && path() === '/mypage', 'cancel closes')
await clickText('로그아웃'); await p.mouse.click(200, 60); await wait(150); ok(!(await p.$('[role=dialog]')) && path() === '/mypage', 'outside click cancels')
await clickText('로그아웃'); await p.keyboard.press('Escape'); await wait(150); ok(!(await p.$('[role=dialog]')), 'Esc cancels')
await clickText('로그아웃'); await clickText('예'); ok(path() === '/login', 'yes -> /login ' + path())
await p.goBack(); await wait(200); ok(path() !== '/mypage', 'back after logout does not return to mypage (replace) ' + path())
// 홈 팝업의 [연동하러 가기]도 안내만
const c = await b.createBrowserContext(); const q = await c.newPage(); await q.setViewport({ width: 408, height: 880 }); await q.goto(base + '/', { waitUntil: 'networkidle0' })
const go = await q.evaluateHandle(() => [...document.querySelectorAll('button')].find(b => b.textContent.trim() === '연동하러 가기')); await go.click(); await wait(150)
ok((await q.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요' && !(await q.$('[role=dialog]')) && new URL(q.url()).pathname === '/', 'home popup 연동하러 가기 -> toast')
console.log(fail ? fail + ' failures' : 'ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
