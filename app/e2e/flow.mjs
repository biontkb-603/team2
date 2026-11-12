import { launch, BASE } from './lib.mjs'
const b = await launch()
const ctx = await b.createBrowserContext(); const p = await ctx.newPage(); await p.setViewport({ width: 408, height: 880 })
const base = BASE, wait = ms => new Promise(r => setTimeout(r, ms)), path = () => new URL(p.url()).pathname
let fail = 0; const ok = (c, m) => { if (!c) { fail++; console.log('FAIL', m) } else console.log('ok  ', m) }
const text = async t => { const h = await p.evaluateHandle(t => [...document.querySelectorAll('button,a')].find(b => b.textContent.trim() === t), t); await h.click(); await wait(180) }
const tab = async t => { const h = await p.evaluateHandle(t => [...document.querySelectorAll('nav a')].find(b => b.textContent.trim() === t), t); await h.click(); await wait(180) }
await p.goto(base + '/login', { waitUntil: 'networkidle0' })
await text('회원가입'); ok(path() === '/signup', '로그인 → 회원가입')
await text('다음'); ok(path() === '/signup/account', '회원가입 1단계 → 2단계')
await text('완료하기'); ok(path() === '/', '가입 완료 → 홈')
ok(!!(await p.$('[role=dialog]')), '홈: 냉장고 연동 팝업'); await text('그만 보기'); ok(!(await p.$('[role=dialog]')), '팝업 닫기')
await p.click('a[href="/fridge/status"]'); await wait(150); ok(path() === '/fridge/status', '홈 → 냉장고 현황')
await text('식재료 목록 보기'); ok(path() === '/fridge', '현황 → 식재료 목록')
await text('냉동 3'); ok((await p.$$eval('main ul li', l => l.length)) === 3, '냉동 탭 3개')
await p.evaluate(() => [...document.querySelectorAll('button')].find(b => b.textContent.includes('식재료 추가')).click()); await wait(180); ok(path() === '/fridge/add', '목록 → 식재료 추가')
await text('사진으로 등록'); ok(path() === '/fridge/add/photo', '직접 입력 → 사진 등록 탭')
await p.click('button[aria-label="뒤로 가기"]'); await wait(180); ok(path() === '/fridge', '뒤로 가기 → 목록')
await tab('추천'); ok(path() === '/recommend', '탭: 추천')
await p.click('a[href="/recommend/tuna-mayo"]'); await wait(180); ok(path() === '/recommend/tuna-mayo', '추천 → 레시피 상세')
await p.click('button[aria-label="뒤로 가기"]'); await wait(180)
await tab('장보기'); ok(path() === '/shopping', '탭: 장보기')
await tab('마이페이지'); ok(path() === '/mypage', '탭: 마이페이지')
await text('찜한 레시피'); ok(path() === '/mypage/favorites', '마이페이지 → 찜한 레시피')
ok((await p.$$eval('nav a', as => as.filter(a => a.className.includes('text-primary')).map(a => a.textContent))).join() === '마이페이지', '찜한 레시피에서 마이페이지 탭 강조')
await p.click('button[aria-label="뒤로 가기"]'); await wait(180)
await text('알림 설정'); ok(path() === '/mypage/notifications', '마이페이지 → 알림 설정'); await p.click('button[aria-label="뒤로 가기"]'); await wait(180)
await text('공지사항'); ok(path() === '/mypage/notices', '마이페이지 → 공지사항'); await p.click('button[aria-label="뒤로 가기"]'); await wait(180)
await text('로그아웃'); await text('예'); ok(path() === '/login', '로그아웃 → 로그인')
// 범위 밖 진입점이 모두 안내만 띄우는지
await p.goto(base + '/mypage', { waitUntil: 'networkidle0' })
for (const l of ['냉장고 연동 관리', '커뮤니티']) { await wait(2100); await text(l); ok((await p.$eval('[role=status]', e => e.textContent)) === '곧 지원 예정이에요' && path() === '/mypage', l + ' → 곧 지원 예정') }
console.log(fail ? fail + ' failures' : 'FLOW ALL PASS'); process.exitCode = fail ? 1 : 0; await b.close()
